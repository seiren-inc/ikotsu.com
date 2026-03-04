import FadeIn from '@/components/motion/FadeIn';
import Button from '@/components/ui/Button';
import styles from './DiagnosisTeaser.module.css';

export default function DiagnosisTeaser() {
  return (
    <section className={styles.section} aria-label="AI診断">
      <div className="container container--narrow">
        <FadeIn direction="up">
          <div className={styles.card}>
            <div className={styles.content}>
              <span className={styles.badge}>AI診断</span>
              <h2 className={styles.title}>
                最適なサービスを<br />30秒で診断
              </h2>
              <p className={styles.description}>
                遺骨の状態やご希望にあわせて、
                最適なサービスプランをAIが提案します。
                4つの質問に答えるだけで、目安費用もわかります。
              </p>
              <div className={styles.steps}>
                <div className={styles.step}>
                  <span className={styles.stepNum}>1</span>
                  <span>遺骨の状態</span>
                </div>
                <div className={styles.stepArrow} aria-hidden="true">→</div>
                <div className={styles.step}>
                  <span className={styles.stepNum}>2</span>
                  <span>ご希望の処理</span>
                </div>
                <div className={styles.stepArrow} aria-hidden="true">→</div>
                <div className={styles.step}>
                  <span className={styles.stepNum}>3</span>
                  <span>保管予定</span>
                </div>
                <div className={styles.stepArrow} aria-hidden="true">→</div>
                <div className={styles.step}>
                  <span className={styles.stepNum}>4</span>
                  <span>結果表示</span>
                </div>
              </div>
              <Button href="/diagnosis" variant="primary" size="lg">
                無料で診断する
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
