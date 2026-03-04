'use client';

import CountUp from '@/components/motion/CountUp';
import FadeIn from '@/components/motion/FadeIn';
import styles from './TrustStrip.module.css';

const TRUST_ITEMS = [
  {
    value: 5000,
    suffix: '件+',
    label: '処理実績',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 3L17.09 9.26L24 10.27L19 15.14L20.18 22.02L14 18.77L7.82 22.02L9 15.14L4 10.27L10.91 9.26L14 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    value: 100,
    suffix: '%',
    label: '工程公開',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 24C19.523 24 24 19.523 24 14C24 8.477 19.523 4 14 4C8.477 4 4 8.477 4 14C4 19.523 8.477 24 14 24Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 14L13 17L18 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    value: 47,
    suffix: '都道府県',
    label: '全国対応',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 24C14 24 22 18 22 12C22 7.582 18.418 4 14 4C9.582 4 6 7.582 6 12C6 18 14 24 14 24Z" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="14" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    value: 200,
    suffix: '社+',
    label: '法人取引',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M5 24V8L13 4V24M13 12H22L24 14V24M9 10H9.01M9 14H9.01M9 18H9.01M17 16H17.01M17 20H17.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
] as const;

export default function TrustStrip() {
  return (
    <section className={styles.trustStrip} aria-label="実績・信頼指標">
      <div className="container">
        <FadeIn direction="up">
          <div className={styles.grid}>
            {TRUST_ITEMS.map((item, index) => (
              <div key={index} className={styles.item}>
                <span className={styles.icon}>{item.icon}</span>
                <div className={styles.content}>
                  <span className={styles.value}>
                    <CountUp end={item.value} suffix={item.suffix} />
                  </span>
                  <span className={styles.label}>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
