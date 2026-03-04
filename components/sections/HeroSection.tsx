'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/motion/FadeIn';
import ParallaxSection from '@/components/motion/ParallaxSection';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero} aria-label="メインビジュアル">
      <div className={`container ${styles.heroInner}`}>
        {/* Text Side */}
        <div className={styles.textSide}>
          <FadeIn direction="up" delay={0}>
            <span className={styles.label}>粉骨・洗骨の専門機関</span>
          </FadeIn>
          <FadeIn direction="up" delay={0.08}>
            <h1 className={styles.title}>
              遺骨を、<br />
              <span className={styles.titleAccent}>専門機関品質</span>で。
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={0.16}>
            <p className={styles.description}>
              工程公開・料金透明・全国対応。<br />
              散骨・改葬・保存のための遺骨前処理を、<br />
              安心と信頼の専門機関がお受けします。
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.24}>
            <div className={styles.actions}>
              <Button href="/contact" variant="primary" size="lg">
                無料相談する
              </Button>
              <Button href="/pricing" variant="secondary" size="lg">
                料金目安を見る
              </Button>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.32}>
            <div className={styles.badges}>
              <div className={styles.badge}>
                <span className={styles.badgeIcon}>✓</span>
                <span className={styles.badgeText}>全工程公開</span>
              </div>
              <div className={styles.badge}>
                <span className={styles.badgeIcon}>✓</span>
                <span className={styles.badgeText}>追加料金なし</span>
              </div>
              <div className={styles.badge}>
                <span className={styles.badgeIcon}>✓</span>
                <span className={styles.badgeText}>全国対応</span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Image Side */}
        <div className={styles.imageSide}>
          <ParallaxSection speed={0.05} className={styles.imageWrapper}>
            <Image
              src="/images/hero-facility.png"
              alt="Ikotsu.com 専門施設内観 - 清潔で最新設備を備えた処理環境"
              width={640}
              height={640}
              priority
              className={styles.heroImage}
            />
            <div className={styles.imageOverlay} />
          </ParallaxSection>
        </div>
      </div>

      {/* Background gradient */}
      <div className={styles.bgGradient} aria-hidden="true" />
    </section>
  );
}
