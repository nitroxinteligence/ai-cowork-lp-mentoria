#!/usr/bin/env python3

from __future__ import annotations

import argparse
import subprocess
import sys
from collections import defaultdict
from pathlib import Path

import numpy as np
from scipy import ndimage


def image_size(path: Path) -> tuple[int, int]:
    command = [
        "ffprobe",
        "-v",
        "error",
        "-select_streams",
        "v:0",
        "-show_entries",
        "stream=width,height",
        "-of",
        "csv=s=x:p=0",
        str(path),
    ]
    width, height = subprocess.check_output(command, text=True).strip().split("x")
    return int(width), int(height)


def alpha_mask(path: Path, width: int, height: int) -> np.ndarray:
    command = [
        "ffmpeg",
        "-v",
        "error",
        "-i",
        str(path),
        "-vf",
        "alphaextract",
        "-f",
        "rawvideo",
        "-pix_fmt",
        "gray",
        "-",
    ]
    raw = subprocess.check_output(command)
    alpha = np.frombuffer(raw, dtype=np.uint8).reshape(height, width)
    mask = ndimage.median_filter(alpha, size=11) >= 128
    return ndimage.binary_fill_holes(mask) & ~fill_internal_negative_spaces(mask)


def fill_internal_negative_spaces(mask: np.ndarray) -> np.ndarray:
    """Return holes so the orbital openings remain transparent after cleanup."""
    inverse_labels, _ = ndimage.label(~mask)
    border_labels = np.unique(
        np.concatenate(
            (
                inverse_labels[0, :],
                inverse_labels[-1, :],
                inverse_labels[:, 0],
                inverse_labels[:, -1],
            )
        )
    )
    outside = np.isin(inverse_labels, border_labels)
    return ~outside & ~mask


Point = tuple[int, int]
Edge = tuple[Point, Point]


def boundary_edges(mask: np.ndarray) -> list[Edge]:
    height, width = mask.shape
    edges: list[Edge] = []
    ys, xs = np.nonzero(mask)
    for y, x in zip(ys.tolist(), xs.tolist()):
        if y == 0 or not mask[y - 1, x]:
            edges.append(((x, y), (x + 1, y)))
        if x == width - 1 or not mask[y, x + 1]:
            edges.append(((x + 1, y), (x + 1, y + 1)))
        if y == height - 1 or not mask[y + 1, x]:
            edges.append(((x + 1, y + 1), (x, y + 1)))
        if x == 0 or not mask[y, x - 1]:
            edges.append(((x, y + 1), (x, y)))
    return edges


def turn_score(previous: Point, current: Point, candidate: Point) -> tuple[int, int]:
    incoming = (current[0] - previous[0], current[1] - previous[1])
    outgoing = (candidate[0] - current[0], candidate[1] - current[1])
    cross = incoming[0] * outgoing[1] - incoming[1] * outgoing[0]
    dot = incoming[0] * outgoing[0] + incoming[1] * outgoing[1]
    return cross, dot


def stitch_loops(edges: list[Edge]) -> list[list[Point]]:
    outgoing: dict[Point, list[Point]] = defaultdict(list)
    remaining: set[Edge] = set(edges)
    for start, end in edges:
        outgoing[start].append(end)

    loops: list[list[Point]] = []
    while remaining:
        first = next(iter(remaining))
        start, current = first
        previous = start
        loop = [start, current]
        remaining.remove(first)

        while current != start:
            candidates = [end for end in outgoing[current] if (current, end) in remaining]
            if not candidates:
                break
            candidate = max(candidates, key=lambda end: turn_score(previous, current, end))
            remaining.remove((current, candidate))
            previous, current = current, candidate
            loop.append(current)

        if len(loop) >= 16 and loop[-1] == loop[0]:
            loops.append(loop[:-1])
    return loops


def point_segment_distance(points: np.ndarray, start: np.ndarray, end: np.ndarray) -> np.ndarray:
    segment = end - start
    length_squared = float(np.dot(segment, segment))
    if length_squared == 0:
        return np.linalg.norm(points - start, axis=1)
    projection = np.clip(((points - start) @ segment) / length_squared, 0.0, 1.0)
    closest = start + projection[:, None] * segment
    return np.linalg.norm(points - closest, axis=1)


def simplify_open(points: np.ndarray, epsilon: float) -> np.ndarray:
    if len(points) <= 2:
        return points
    distances = point_segment_distance(points[1:-1], points[0], points[-1])
    if len(distances) == 0:
        return points[[0, -1]]
    index = int(np.argmax(distances)) + 1
    if distances[index - 1] <= epsilon:
        return points[[0, -1]]
    left = simplify_open(points[: index + 1], epsilon)
    right = simplify_open(points[index:], epsilon)
    return np.vstack((left[:-1], right))


def simplify_closed(loop: list[Point], epsilon: float) -> np.ndarray:
    points = np.asarray(loop, dtype=np.float64)
    anchor = points[0]
    split = int(np.argmax(np.linalg.norm(points - anchor, axis=1)))
    first = simplify_open(points[: split + 1], epsilon)
    second = simplify_open(np.vstack((points[split:], points[0])), epsilon)
    combined = np.vstack((first[:-1], second[:-1]))
    return combined


def is_sharp(previous: np.ndarray, current: np.ndarray, following: np.ndarray) -> bool:
    incoming = previous - current
    outgoing = following - current
    denominator = np.linalg.norm(incoming) * np.linalg.norm(outgoing)
    if denominator == 0:
        return False
    cosine = float(np.clip(np.dot(incoming, outgoing) / denominator, -1.0, 1.0))
    angle = float(np.degrees(np.arccos(cosine)))
    return angle < 70.0


def smooth_path(loop: np.ndarray) -> str:
    count = len(loop)
    start = (loop[-1] + loop[0]) / 2.0
    commands = [f"M {start[0]:.2f} {start[1]:.2f}"]
    for index, current in enumerate(loop):
        previous = loop[index - 1]
        following = loop[(index + 1) % count]
        midpoint = (current + following) / 2.0
        if is_sharp(previous, current, following):
            commands.append(f"L {current[0]:.2f} {current[1]:.2f}")
            commands.append(f"L {midpoint[0]:.2f} {midpoint[1]:.2f}")
        else:
            commands.append(
                f"Q {current[0]:.2f} {current[1]:.2f} {midpoint[0]:.2f} {midpoint[1]:.2f}"
            )
    commands.append("Z")
    return " ".join(commands)


def svg_document(loops: list[np.ndarray], width: int, height: int) -> str:
    path_parts: list[str] = []
    for loop in loops:
        path_parts.append(smooth_path(loop))
    path_data = " ".join(path_parts)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">
  <title id="title">AI COWORK symbol</title>
  <desc id="desc">Monochromatic vector trace of the approved AI COWORK symbol.</desc>
  <path fill="#176FD1" fill-rule="evenodd" d="{path_data}"/>
</svg>
'''


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("input", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--epsilon", type=float, default=2.75)
    args = parser.parse_args()

    width, height = image_size(args.input)
    mask = alpha_mask(args.input, width, height)
    loops = stitch_loops(boundary_edges(mask))
    simplified = [simplify_closed(loop, args.epsilon) for loop in loops]
    simplified = [loop for loop in simplified if len(loop) >= 3]
    if not simplified:
        raise RuntimeError("No closed contours found in approved symbol mask")
    args.output.write_text(svg_document(simplified, width, height), encoding="utf-8")
    print(f"wrote {args.output} with {len(simplified)} contours")
    return 0


if __name__ == "__main__":
    sys.setrecursionlimit(10000)
    raise SystemExit(main())
