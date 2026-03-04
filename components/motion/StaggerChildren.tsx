'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * StaggerChildren — 子要素を順番にフェードインさせるコンテナ
 * doc-58: Section 3.3 Card stagger fade-in
 */
interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  /** 子要素間の遅延（秒） */
  staggerDelay?: number;
  /** ビューポートに入ったら再生 */
  once?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: (staggerDelay: number) => ({
    transition: {
      staggerChildren: staggerDelay,
    },
  }),
};

export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function StaggerChildren({
  children,
  className = '',
  staggerDelay = 0.1,
  once = true,
}: StaggerChildrenProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-40px' }}
      custom={staggerDelay}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem — StaggerChildrenの直下に配置する個別子要素
 */
export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
}
