'use client';

import { useEffect, useRef } from 'react';

/**
 * GSAP ScrollTrigger を使ったフェードアップアニメーション
 * - 動的 import で SSR 安全
 * - useEffect 内でインスタンス化
 * - アンマウント時に ScrollTrigger をリバート
 */
export function useGSAPFadeUp(
  selector: string,
  options: {
    y?: number;
    duration?: number;
    stagger?: number;
    start?: string;
  } = {}
) {
  const { y = 32, duration = 0.7, stagger = 0.12, start = 'top 85%' } = options;

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null;

    async function init() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.from(selector, {
          y,
          opacity: 0,
          duration,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: selector,
            start,
            toggleActions: 'play none none none',
          },
        });
      });
    }

    init();

    return () => {
      ctx?.revert();
    };
  }, [selector, y, duration, stagger, start]);
}

/**
 * GSAP ScrollTrigger パララックスエフェクト
 */
export function useGSAPParallax(
  ref: React.RefObject<HTMLElement | null>,
  { speed = 0.15 }: { speed?: number } = {}
) {
  useEffect(() => {
    if (!ref.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null;

    async function init() {
      if (!ref.current) return;
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      const el = ref.current;
      ctx = gsap.context(() => {
        gsap.to(el, {
          yPercent: speed * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }

    init();

    return () => {
      ctx?.revert();
    };
  }, [ref, speed]);
}
