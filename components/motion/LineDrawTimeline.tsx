'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

/**
 * LineDrawTimeline — スクロール連動で縦線が伸びるタイムライン
 * doc-58: Section 3.4 Process Timeline / Section 4.4 Line Draw Animation
 * stroke-dashoffset利用
 */
interface LineDrawTimelineProps {
  /** タイムラインのステップ */
  steps: {
    title: string;
    description: string;
    content?: ReactNode;
  }[];
  className?: string;
}

export default function LineDrawTimeline({
  steps,
  className = '',
}: LineDrawTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.6', 'end 0.8'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} className={className} style={{ position: 'relative' }}>
      {/* 背景のグレーライン */}
      <div
        style={{
          position: 'absolute',
          left: 20,
          top: 0,
          bottom: 0,
          width: 2,
          backgroundColor: 'var(--border-light)',
        }}
      />
      {/* スクロール連動でアクセントカラーが伸びるライン */}
      <motion.div
        style={{
          position: 'absolute',
          left: 20,
          top: 0,
          width: 2,
          height: lineHeight,
          backgroundColor: 'var(--accent-primary)',
          transformOrigin: 'top',
        }}
      />

      {/* ステップ群 */}
      <div style={{ position: 'relative' }}>
        {steps.map((step, index) => (
          <TimelineStep key={index} step={step} index={index} />
        ))}
      </div>
    </div>
  );
}

function TimelineStep({
  step,
  index,
}: {
  step: { title: string; description: string; content?: ReactNode };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        display: 'flex',
        gap: 'var(--space-6)',
        paddingBottom: 'var(--space-10)',
        paddingLeft: 48,
        position: 'relative',
      }}
    >
      {/* ドット */}
      <div
        style={{
          position: 'absolute',
          left: 14,
          top: 4,
          width: 14,
          height: 14,
          borderRadius: '50%',
          backgroundColor: 'var(--accent-primary)',
          border: '3px solid var(--bg-elevated)',
          boxShadow: 'var(--shadow-sm)',
          zIndex: 1,
        }}
      />

      <div style={{ flex: 1 }}>
        <h3
          style={{
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--font-semibold)',
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-2)',
          }}
        >
          {step.title}
        </h3>
        <p
          style={{
            fontSize: 'var(--text-base)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--leading-normal)',
          }}
        >
          {step.description}
        </p>
        {step.content && (
          <div style={{ marginTop: 'var(--space-4)' }}>{step.content}</div>
        )}
      </div>
    </motion.div>
  );
}
