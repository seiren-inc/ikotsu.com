'use client';

import { useEffect, useRef } from 'react';

let lenisInstance: import('lenis').default | null = null;

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let Lenis: typeof import('lenis').default;

    async function init() {
      const mod = await import('lenis');
      Lenis = mod.default;

      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenisInstance?.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      }

      rafRef.current = requestAnimationFrame(raf);
    }

    init();

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}

/** Lenis インスタンスを外部から取得する */
export function getLenis() {
  return lenisInstance;
}
