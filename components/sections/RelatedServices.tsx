'use client';

import FadeIn from '@/components/motion/FadeIn';
import StaggerChildren, { StaggerItem } from '@/components/motion/StaggerChildren';
import styles from './RelatedServices.module.css';

const RELATED_LINKS = [
  {
    title: '散骨クルーズ',
    desc: '東京湾・相模湾での海洋散骨',
    href: 'https://sankotsu-cruise.com',
  },
  {
    title: 'お墓探しナビ',
    desc: '全国の霊園・墓地検索',
    href: 'https://ohaka-navi.com',
  },
  {
    title: 'お墓じまいナビ',
    desc: '暮石撤去から手続きまで一括',
    href: 'https://ohaka-jimai.com',
  },
  {
    title: '遺骨ダイヤモンド',
    desc: '遺骨から人工ダイヤモンド製作',
    href: 'https://ikotsu-diamond.com',
  },
] as const;

export default function RelatedServices() {
  return (
    <section className={`section ${styles.section}`} aria-label="関連サービス">
      <div className="container">
        <FadeIn direction="up">
          <div className="section__header">
            <span className="section__label">Related Services</span>
            <h2 className="section__title">清蓮グループ 関連サービス</h2>
          </div>
        </FadeIn>

        <StaggerChildren staggerDelay={0.05} className={styles.grid}>
          {RELATED_LINKS.map(link => (
            <StaggerItem key={link.title}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
              >
                <div className={styles.cardInfo}>
                  <h3 className={styles.cardTitle}>{link.title}</h3>
                  <p className={styles.cardDesc}>{link.desc}</p>
                </div>
                <div className={styles.cardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 5H15M15 5V15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
