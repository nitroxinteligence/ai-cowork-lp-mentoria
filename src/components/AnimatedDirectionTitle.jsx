import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

const FOCUS = 'NA EXECUÇÃO';
const GLYPHS = '01<>/[]{}#+*';

export default function AnimatedDirectionTitle() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.7 });
  const reducedMotion = useReducedMotion();
  const [decoded, setDecoded] = useState(FOCUS);

  useEffect(() => {
    const focus = ref.current.querySelector('.direction-title__focus');
    let disposed = false;
    const alignGradient = () => {
      if (disposed) return;
      focus.style.setProperty('--gradient-width', `${focus.offsetWidth}px`);
      focus.style.setProperty('--gradient-height', `${focus.offsetHeight}px`);
      focus.querySelectorAll('.direction-title__letter').forEach(letter => {
        letter.style.setProperty('--gradient-offset', `${letter.offsetLeft}px`);
      });
    };
    const observer = new ResizeObserver(alignGradient);
    observer.observe(focus);
    document.fonts.ready.then(alignGradient);
    return () => {
      disposed = true;
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!inView || reducedMotion) return undefined;
    let frame = 0;
    const started = performance.now();
    const timer = window.setInterval(() => {
      const elapsed = performance.now() - started;
      const progress = Math.max(0, Math.min(1, (elapsed - 650) / 950));
      setDecoded([...FOCUS].map((letter, index) => {
        if (letter === ' ' || progress >= (index + 1) / FOCUS.length) return letter;
        return GLYPHS[(index * 7 + frame) % GLYPHS.length];
      }).join(''));
      frame += 1;
      if (progress === 1) window.clearInterval(timer);
    }, 45);
    return () => window.clearInterval(timer);
  }, [inView, reducedMotion, FOCUS]);

  return (
    <h2 ref={ref} className={`direction-title${inView || reducedMotion ? ' direction-title--visible' : ''}`}
      aria-label="Sua experiência no comando Um time de IA na execução">
      <span className="direction-title__thought" aria-hidden="true">
        <span className="direction-title__row direction-title__row--first">
          <span className="direction-title__context">SUA EXPERIÊNCIA</span>
        </span>
        <span className="direction-title__row direction-title__row--second">
          <span className="direction-title__command">NO COMANDO</span>
        </span>
      </span>
      <svg className="direction-title__connector" viewBox="0 0 84 40" aria-hidden="true">
        <path d="M2 20H80M65 5L80 20L65 35" pathLength="1" />
      </svg>
      <span className="direction-title__thought direction-title__thought--execution" aria-hidden="true">
        <span className="direction-title__row direction-title__row--second">
          <span className="direction-title__context">UM TIME DE IA</span>
        </span>
        <span className="direction-title__focus">
          {[...FOCUS].map((letter, index) => (
            <span className="direction-title__letter" style={{ '--letter': index }} key={index}>
              <span className="direction-title__measure">{letter}</span>
              <span className="direction-title__glyph mesh-text">{reducedMotion ? letter : decoded[index]}</span>
            </span>
          ))}
        </span>
      </span>
    </h2>
  );
}
