'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { trackCtaClick } from '@/lib/analytics/gtag';
import styles from './FixedCTA.module.css';

const CTA_ITEMS = [
  {
    id: 'consult',
    label: '無料相談',
    href: '/contact',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M17 10C17 13.866 13.866 17 10 17C8.58 17 7.26 16.58 6.14 15.86L3 17L4.14 13.86C3.42 12.74 3 11.42 3 10C3 6.134 6.134 3 10 3C13.866 3 17 6.134 17 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'diagnosis',
    label: 'AI診断',
    href: '/diagnosis',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 3V17M3 10H17M6 6L14 14M14 6L6 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'corporate',
    label: '法人相談',
    href: '/for-corporate',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 17V5C3 4.448 3.448 4 4 4H10C10.552 4 11 4.448 11 5V17M11 8H16C16.552 8 17 8.448 17 9V17M7 7H7.01M7 10H7.01M7 13H7.01M14 11H14.01M14 14H14.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
] as const;

// FixedCTAを非表示にするページ（診断ページ内にCTAが内包されているため）
const HIDDEN_PATHS = ['/diagnosis'];

export default function FixedCTA() {
  const pathname = usePathname();

  if (HIDDEN_PATHS.includes(pathname)) return null;

  return (
    <div className={styles.fixedCta} role="complementary" aria-label="お問い合わせボタン">
      {CTA_ITEMS.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={`${styles.ctaButton} ${styles[`ctaButton--${item.id}`]}`}
          data-cta-type={item.id}
          onClick={() => {
            trackCtaClick(item.id, pathname);
          }}
        >
          <span className={styles.ctaIcon}>{item.icon}</span>
          <span className={styles.ctaLabel}>{item.label}</span>
        </Link>
      ))}
    </div>
  );
}

