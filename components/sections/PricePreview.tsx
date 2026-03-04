'use client';

import Link from 'next/link';
import FadeIn from '@/components/motion/FadeIn';
import CountUp from '@/components/motion/CountUp';
import styles from './PricePreview.module.css';

const PRICING_PLANS = [
  {
    title: '粉骨プラン（基本）',
    price: 30000,
    description: '散骨や手元供養向けに、専門機械でパウダー状に処理します。',
    features: ['状態確認・異物除去', '六価クロム還元処理', 'UV殺菌・乾燥', '専用真空パック（1個）'],
  },
  {
    title: '洗骨＋粉骨プラン',
    price: 60000,
    description: '汚れやカビがある遺骨を専用洗浄し、清潔な状態にしてから粉骨します。',
    features: ['基本粉骨プランの全工程', '超音波・専用薬液洗浄', '乾燥処理', '報告レポート'],
  },
] as const;

export default function PricePreview() {
  return (
    <section className="section" aria-label="料金の目安">
      <div className="container container--narrow">
        <FadeIn>
          <div className="section__header">
            <span className="section__label">Pricing</span>
            <h2 className="section__title">料金の目安</h2>
            <p className="section__description">
              お見積り後の追加料金は一切ありません。明確でわかりやすい料金体系をお約束します。
            </p>
          </div>
        </FadeIn>

        <div className={styles.grid}>
          {PRICING_PLANS.map((plan, index) => (
            <FadeIn key={plan.title} direction="up" delay={index * 0.1}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.planTitle}>{plan.title}</h3>
                  <div className={styles.priceWrap}>
                    <span className={styles.priceUnit}>目安 </span>
                    <span className={styles.priceValue}>
                      <CountUp end={plan.price} />
                    </span>
                    <span className={styles.priceCurrency}>円〜</span>
                    <span className={styles.priceTax}>（税込）</span>
                  </div>
                  <p className={styles.planDesc}>{plan.description}</p>
                </div>
                <div className={styles.cardBody}>
                  <ul className={styles.featureList}>
                    {plan.features.map(feature => (
                      <li key={feature} className={styles.featureItem}>
                        <svg className={styles.checkIcon} viewBox="0 0 20 20" fill="none" aria-hidden="true">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fill="currentColor"/>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className={styles.actions}>
            <Link href="/pricing" className={styles.linkButton}>
              詳しい料金表・オプションを見る →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
