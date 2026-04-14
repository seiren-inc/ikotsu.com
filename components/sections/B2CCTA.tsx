import FadeIn from '@/components/motion/FadeIn';
import Button from '@/components/ui/Button';
import styles from './B2CCTA.module.css';

export default function B2CCTA() {
  return (
    <section className={`section ${styles.section}`} aria-label="お問い合わせ">
      <div className="container">
        <FadeIn direction="up">
          <div className={styles.inner}>
            <div className={styles.content}>
              <span className="section__label">Contact</span>
              <h2 className={styles.title}>
                大切なご遺骨の処理、<br />
                プロにお任せください
              </h2>
              <p className={styles.description}>
                「散骨をしたい」「お墓を整理したい」「身近に供養したい」<br />
                どのようなお悩みも専門スタッフが中立の立場でお答えします。
                ご相談・お見積りは完全無料です。
              </p>
              
              <div className={styles.actions}>
                <Button href="/contact" variant="primary" size="lg" className={styles.mainBtn}>
                  <span className={styles.btnContent}>
                    <span className={styles.btnLabel}>無料相談・お見積り</span>
                    <span className={styles.btnSub}>24時間受付・最短1分入力</span>
                  </span>
                </Button>
                
                <div className={styles.secondaryActions}>
                  <a href="tel:08008888788" className={styles.phoneLink}>
                    <span className={styles.phoneIcon}>📞</span>
                    <span className={styles.phoneLabel}>0800-888-8788</span>
                  </a>
                  <Link href="https://line.me/R/ti/p/@956lieqb" className={styles.lineLink}>
                    <span className={styles.lineIcon}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 2C5.582 2 2 5.145 2 9.013c0 2.44 1.378 4.59 3.47 5.918-.15.542-.55 1.958-.63 2.261-.1.375.137.37.287.27.118-.078 1.875-1.27 2.636-1.785.736.107 1.486.165 2.237.165 4.418 0 8-3.145 8-7.013C18 5.145 14.418 2 10 2z" />
                      </svg>
                    </span>
                    <span className={styles.lineLabel}>LINE相談</span>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className={styles.trustStrip}>
              <div className={styles.trustItem}>
                <span className={styles.trustCheck}>✓</span>
                写真付き報告書
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustCheck}>✓</span>
                追加費用なし
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustCheck}>✓</span>
                全国対応
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

import Link from 'next/link';
