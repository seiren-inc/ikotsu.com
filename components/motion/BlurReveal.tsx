'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * BlurReveal — 画像やセクションのblur→クリア表示
 * doc-58: Section 5 画像モーション設計
 * blur 8px → 0, opacity 0 → 1, duration 0.6s
 */
interface BlurRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

export default function BlurReveal({
  children,
  className = '',
  delay = 0,
  once = true,
}: BlurRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-40px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
