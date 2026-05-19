'use client';

import { useReducedMotion } from 'framer-motion';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './BentoServices.module.css';

const SERVICES = [
  {
    id: 'powdered',
    size: 'large',
    label: '粉骨（パウダー化）',
    tagline: '散骨・改葬・手元供養のための標準処理',
    price: '30,000円〜',
    duration: '3〜5営業日',
    features: ['六価クロム還元処理', 'UV殺菌・乾燥', '専用真空パック（1個）', '写真付き完了報告書'],
    href: '/services/powdered',
    accentColor: '#DB833B',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 4C16 4 8 12 8 19C8 23.418 11.582 27 16 27C20.418 27 24 23.418 24 19C24 12 16 4 16 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 28H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="16" cy="19" r="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: 'cleaning',
    size: 'medium',
    label: '洗骨（専用洗浄）',
    tagline: 'お墓からの取り出し・カビ除去',
    price: '30,000円〜',
    duration: '5〜7営業日',
    features: ['超音波洗浄', '専用薬液処理', '完全乾燥'],
    href: '/services/cleaning',
    accentColor: '#DE7234',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M7 14C7 10.134 10.134 7 14 7C17.866 7 21 10.134 21 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M4 17H24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 17V21C7 22.105 7.895 23 9 23H19C20.105 23 21 22.105 21 21V17" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M11 7V5M14 6V4M17 7V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'carrying',
    size: 'medium',
    label: '出張・搬送',
    tagline: 'ご自宅や霊園からの安全な運搬',
    price: '10,000円〜（地域別）',
    duration: 'ご希望日時ご相談',
    features: ['専門スタッフ対応', '専用車両', '全国47都道府県対応'],
    href: '/services/carrying',
    accentColor: '#AF7749',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="2" y="10" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M20 14H24L26 18V22H20V14Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="7" cy="22" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="21" cy="22" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 10V7C6 5.895 6.895 5 8 5H14C15.105 5 16 5.895 16 7V10" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: 'takeout',
    size: 'small',
    label: 'お引取り',
    tagline: '遠方・来社困難な方向け',
    price: '10,000円〜',
    duration: '最短即日手配',
    features: ['専用梱包キット送付', 'ゆうパック対応', '到着後即時報告'],
    href: '/services/takeout',
    accentColor: '#C47030',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="5" y="8" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 8V6C10 4.895 10.895 4 12 4H16C17.105 4 18 4.895 18 6V8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 14H23" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 14V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'ohakajimai',
    size: 'wide',
    label: 'お墓じまい・骨壺取出し・行政手続き代行',
    tagline: '改葬許可申請をワンストップで対応',
    price: 'お見積り',
    duration: 'ご相談のうえ対応',
    features: ['骨壺取出し作業', '改葬許可申請代行', '行政書類一括対応', '全国対応'],
    href: '/contact',
    accentColor: '#8A5530',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 3L4 8V14C4 19.55 8.4 24.74 14 26C19.6 24.74 24 19.55 24 14V8L14 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 14L13 17L18 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
] as const;

export default function BentoServices() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section section--alt" aria-label="コア・サービス一覧">
      <div className="container container--wide">
        <motion.div
          className="section__header"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section__label">Services</span>
          <h2 className="section__title">専門サービス一覧</h2>
          <p className="section__description">
            遺骨の状態やご利用目的に合わせて、最適な専門処理をご提供します。
            全工程で品質・透明性・適正価格をお約束します。
          </p>
        </motion.div>

        <div className={styles.bento}>
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              className={`${styles.bentoItem} ${styles[`bentoItem--${service.size}`]}`}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={service.href}
                className={styles.card}
                style={{ '--bento-accent': service.accentColor } as React.CSSProperties}
                aria-label={`${service.label}の詳細を見る`}
              >
                {/* アクセントライン */}
                <div className={styles.accentBar} />

                {/* ヘッダー */}
                <div className={styles.cardHeader}>
                  <span
                    className={styles.iconWrap}
                    style={{ color: service.accentColor }}
                  >
                    {service.icon}
                  </span>
                  <div className={styles.headerText}>
                    <h3 className={styles.serviceTitle}>{service.label}</h3>
                    <p className={styles.serviceTagline}>{service.tagline}</p>
                  </div>
                </div>

                {/* 価格・期間 */}
                <div className={styles.meta}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>目安費用</span>
                    <span
                      className={styles.metaValue}
                      style={{ color: service.accentColor }}
                    >
                      {service.price}
                    </span>
                  </div>
                  <div className={styles.metaDivider} />
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>所要日数</span>
                    <span className={styles.metaValueDark}>{service.duration}</span>
                  </div>
                </div>

                {/* 機能リスト */}
                <ul className={styles.featureList}>
                  {service.features.map((f) => (
                    <li key={f} className={styles.featureItem}>
                      <span
                        className={styles.featureCheck}
                        style={{ color: service.accentColor }}
                        aria-hidden="true"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7L5.5 10.5L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* リンク */}
                <div className={styles.cardFooter}>
                  <span
                    className={styles.linkText}
                    style={{ color: service.accentColor }}
                  >
                    詳細を見る
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className={styles.linkArrow}>
                      <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
