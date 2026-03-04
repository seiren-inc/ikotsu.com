'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

/**
 * ParallaxSection — Hero限定の微弱パララックス効果
 * doc-58: Section 4.2 Parallax System
 * スクロール速度の0.2倍、Hero限定、過度禁止
 */
interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  /** パララックスの強さ（デフォルト0.2） */
  speed?: number;
}

export default function ParallaxSection({
  children,
  className = '',
  speed = 0.2,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden', position: 'relative' }}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
