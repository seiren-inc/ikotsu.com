'use client';

import FadeIn from '@/components/motion/FadeIn';
import StaggerChildren, { StaggerItem } from '@/components/motion/StaggerChildren';
import Image from 'next/image';
import styles from './CaseAuthority.module.css';

const AUTHORITIES = [
  {
    title: '行政からの認可・届出',
    description: '専門機関としての要件を満たし、必要なすべての届出を完了して運営しています。コンプライアンスを徹底し、適正な処理をお約束します。',
    icon: '🏛️',
  },
  {
    title: '最新の専用設備',
    description: '家庭用ミキサー等ではなく、遺骨処理専用の大型粉骨機と超音波洗浄設備を導入。異物混入を防ぎ、均一で美しいパウダー状に仕上げます。',
    icon: '⚙️',
  },
  {
    title: '徹底した個室個別処理',
    description: 'お預かりしたご遺骨は、1柱ごとに完全に独立したブースで処理。他の方のご遺骨と混ざることは絶対にありません。',
    icon: '🔒',
  },
];

export default function CaseAuthority() {
  return (
    <section className={`section ${styles.section}`} aria-label="実績と信頼">
      <div className="container">
        <FadeIn direction="up">
          <div className="section__header">
            <span className="section__label">Authority</span>
            <h2 className="section__title">専門機関としての責任と品質</h2>
            <p className="section__description">
              私たちが選ばれる理由。それは「遺骨を扱う重み」を理解した設備と運用体制にあります。
            </p>
          </div>
        </FadeIn>

        <div className={styles.content}>
          <div className={styles.imageSide}>
            <FadeIn delay={0.1}>
              <div className={styles.imageGrid}>
                <Image
                  src="/images/hero-facility.png"
                  alt="最新の専用設備"
                  width={300}
                  height={400}
                  className={styles.imageMain}
                />
                <div className={styles.imageSubGroup}>
                  <Image
                    src="/images/process-grinding.png"
                    alt="個別処理ブース"
                    width={200}
                    height={190}
                    className={styles.imageSub}
                  />
                  <Image
                    src="/images/process-washing.png"
                    alt="洗浄工程"
                    width={200}
                    height={190}
                    className={styles.imageSub}
                  />
                </div>
              </div>
            </FadeIn>
          </div>

          <div className={styles.textSide}>
            <StaggerChildren staggerDelay={0.1}>
              {AUTHORITIES.map((item) => (
                <StaggerItem key={item.title}>
                  <div className={styles.feature}>
                    <div className={styles.featureIcon}>{item.icon}</div>
                    <div className={styles.featureBody}>
                      <h3 className={styles.featureTitle}>{item.title}</h3>
                      <p className={styles.featureDesc}>{item.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </div>
    </section>
  );
}
