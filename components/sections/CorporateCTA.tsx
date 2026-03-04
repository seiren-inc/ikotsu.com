import FadeIn from '@/components/motion/FadeIn';
import Button from '@/components/ui/Button';
import styles from './CorporateCTA.module.css';

const FEATURES = [
  { title: '大量処理対応', description: '月間50件以上の法人発注に対応' },
  { title: '品質管理レポート', description: '処理工程を記録した報告書を発行' },
  { title: '専用窓口', description: '法人担当による一貫対応' },
  { title: '柔軟な契約', description: '都度発注から年間契約まで対応' },
] as const;

export default function CorporateCTA() {
  return (
    <section className={`section ${styles.section}`} aria-label="法人向けサービス">
      <div className="container">
        <div className={styles.grid}>
          <FadeIn direction="left">
            <div className={styles.textSide}>
              <span className="section__label">For Corporate</span>
              <h2 className={styles.title}>
                法人のお客様へ
              </h2>
              <p className={styles.description}>
                寺院・納骨堂・霊園・葬儀社のパートナーとして、
                粉骨・洗骨の外部委託をお受けしています。
                品質管理・工程公開・柔軟な契約で、安心してお任せいただけます。
              </p>
              <div className={styles.features}>
                {FEATURES.map((feature) => (
                  <div key={feature.title} className={styles.feature}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={styles.featureIcon}>
                      <path d="M10 18C14.418 18 18 14.418 18 10C18 5.582 14.418 2 10 2C5.582 2 2 5.582 2 10C2 14.418 5.582 18 10 18Z" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div>
                      <span className={styles.featureTitle}>{feature.title}</span>
                      <span className={styles.featureDesc}>{feature.description}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.actions}>
                <Button href="/for-corporate" variant="primary" size="lg">
                  法人サービスを見る
                </Button>
                <Button href="/contact" variant="secondary" size="lg">
                  法人相談する
                </Button>
              </div>
            </div>
          </FadeIn>
          <FadeIn direction="right">
            <div className={styles.statsSide}>
              <div className={styles.statCard}>
                <span className={styles.statValue}>200+</span>
                <span className={styles.statLabel}>法人取引実績</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statValue}>99.8%</span>
                <span className={styles.statLabel}>継続率（目安）</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statValue}>3日〜</span>
                <span className={styles.statLabel}>最短納期</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
