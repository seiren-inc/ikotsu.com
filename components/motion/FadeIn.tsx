'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * FadeIn — 汎用のフェードインコンポーネント
 * doc-58: Section 4.1 Scroll Reveal System 強化版
 * Framer Motion版。既存ScrollRevealのFM互換版。
 */
interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  once?: boolean;
}

const directionMap = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
  none: {},
};

export default function FadeIn({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
  once = true,
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        ...directionMap[direction],
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
