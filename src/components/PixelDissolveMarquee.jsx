import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

// Rasterize only these small decorative cards, once per resize/font load.
// The moving fragments then retain the actual icon and lettering of each card.
async function cardTexture(card, scale) {
  const bounds = card.getBoundingClientRect();
  const texture = document.createElement('canvas');
  texture.width = Math.ceil(bounds.width * scale);
  texture.height = Math.ceil(bounds.height * scale);
  const ctx = texture.getContext('2d');
  ctx.scale(scale, scale);
  const style = getComputedStyle(card);
  const fill = ctx.createLinearGradient(0, 0, bounds.width, bounds.height);
  fill.addColorStop(0, '#091725');
  fill.addColorStop(1, '#05080d');
  ctx.fillStyle = fill;
  ctx.strokeStyle = style.borderColor;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(0.5, 0.5, bounds.width - 1, bounds.height - 1, parseFloat(style.borderRadius));
  ctx.fill();
  ctx.stroke();

  const icon = card.querySelector('svg');
  const iconBounds = icon.getBoundingClientRect();
  const iconCopy = icon.cloneNode(true);
  iconCopy.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  iconCopy.setAttribute('stroke', getComputedStyle(icon).color);
  iconCopy.setAttribute('width', iconBounds.width);
  iconCopy.setAttribute('height', iconBounds.height);
  const image = new Image();
  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(iconCopy.outerHTML)}`;
  await image.decode();
  ctx.drawImage(image, iconBounds.left - bounds.left, iconBounds.top - bounds.top, iconBounds.width, iconBounds.height);

  const label = card.querySelector('span');
  const labelOrigin = card.getBoundingClientRect();
  const labelStyle = getComputedStyle(label);
  ctx.font = `${labelStyle.fontWeight} ${labelStyle.fontSize} ${labelStyle.fontFamily}`;
  ctx.fillStyle = labelStyle.color;
  ctx.textBaseline = 'middle';
  const text = label.firstChild;
  const range = document.createRange();
  for (let index = 0; index < text.length; index += 1) {
    range.setStart(text, index);
    range.setEnd(text, index + 1);
    const rect = range.getBoundingClientRect();
    const character = labelStyle.textTransform === 'uppercase' ? text.textContent[index].toUpperCase() : text.textContent[index];
    ctx.fillText(character, rect.left - labelOrigin.left, rect.top - labelOrigin.top + rect.height / 2);
  }
  return { texture, width: bounds.width, height: bounds.height };
}

const noise = (column, row, card) => {
  const value = Math.sin(column * 127.1 + row * 311.7 + card * 74.7) * 43758.5453;
  return value - Math.floor(value);
};

export default function PixelDissolveMarquee({ children }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return undefined;
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;
    const cards = [...root.querySelectorAll('.cohort-visual-card')];
    const track = root.querySelector('.cohort-benefits-marquee__track');
    const cardCount = cards.length / 2;
    let textures = [];
    let generation = 0;
    let frame = 0;
    let visible = false;
    let disposed = false;
    let width = 0;
    let height = 0;
    let scale = 1;

    async function resize() {
      const version = ++generation;
      root.classList.remove('cohort-benefits-marquee--pixels');
      await document.fonts.ready;
      if (disposed || version !== generation) return;
      scale = Math.min(devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.ceil(width * scale);
      canvas.height = Math.ceil(height * scale);
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      try {
        const next = await Promise.all(cards.slice(0, cardCount).map(card => cardTexture(card, scale)));
        if (disposed || version !== generation) return;
        textures = next;
        root.classList.add('cohort-benefits-marquee--pixels');
      } catch {
        // Retain the normal fade if a texture cannot be decoded.
        textures = [];
      }
    }

    function draw() {
      frame = 0;
      if (disposed || !visible || document.hidden) return;
      ctx.clearRect(0, 0, width, height);
      const origin = root.getBoundingClientRect();
      const cell = width < 110 ? 6 : 8;
      cards.forEach((card, index) => {
        const sprite = textures[index % cardCount];
        if (!sprite) return;
        const bounds = card.getBoundingClientRect();
        const left = bounds.left - origin.left;
        if (left >= width || left + sprite.width <= 0) return;
        const top = bounds.top - origin.top;
        const firstColumn = Math.max(0, Math.floor(-left / cell));
        const lastColumn = Math.min(Math.ceil(sprite.width / cell), Math.ceil((width - left) / cell));
        for (let column = firstColumn; column < lastColumn; column += 1) {
          const x = left + column * cell;
          const progress = Math.max(0, Math.min(1, (width - x) / width));
          for (let row = 0; row < Math.ceil(sprite.height / cell); row += 1) {
            const seed = noise(column, row, index % cardCount);
            const breakup = progress * progress;
            if (progress > 0.35 + seed * 0.65) continue;
            const shrink = 1 - breakup * (0.45 + seed * 0.35);
            const driftX = breakup * (16 + seed * 38);
            const driftY = breakup * (seed - 0.5) * 140;
            const sourceWidth = Math.min(cell, sprite.width - column * cell);
            const sourceHeight = Math.min(cell, sprite.height - row * cell);
            ctx.globalAlpha = (1 - progress ** 1.7) * (0.8 + seed * 0.2);
            ctx.drawImage(sprite.texture,
              column * cell * scale, row * cell * scale, sourceWidth * scale, sourceHeight * scale,
              x - driftX, top + row * cell + driftY, sourceWidth * shrink, sourceHeight * shrink);
          }
        }
      });
      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    }

    function syncPlayback() {
      const active = visible && !document.hidden;
      track.style.animationPlayState = active ? 'running' : 'paused';
      if (active && !frame) frame = requestAnimationFrame(draw);
      if (!active) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    const observer = new ResizeObserver(resize);
    observer.observe(root);
    intersection.observe(root);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      root.classList.remove('cohort-benefits-marquee--pixels');
      track.style.animationPlayState = '';
    };
  }, [reducedMotion]);

  return (
    <div className="cohort-benefits-marquee" ref={rootRef} aria-hidden="true">
      <div className="cohort-benefits-marquee__window">{children}</div>
      <canvas className="cohort-benefits-marquee__pixels" ref={canvasRef} />
    </div>
  );
}
