import FadeIn from '@/components/motion/FadeIn';
import StaggerChildren, { StaggerItem } from '@/components/motion/StaggerChildren';
import Link from 'next/link';
import styles from './GuideHub.module.css';

const GUIDE_ARTICLES = [
  { slug: 'what-is-powdered-bone', title: '粉骨とは？意味・目的・方法をわかりやすく解説', category: 'process' },
  { slug: 'bone-cleaning-guide', title: '洗骨が必要なケースと具体的な工程', category: 'process' },
  { slug: 'scattering-legal', title: '散骨に関する法律と注意点', category: 'legal' },
  { slug: 'mold-prevention', title: '遺骨のカビ対策と保管方法', category: 'storage' },
  { slug: 'reburial-process', title: '改葬の手続きと流れ', category: 'legal' },
  { slug: 'cost-comparison', title: '粉骨の費用相場と選び方', category: 'cost' },
] as const;

const CATEGORY_LABELS: Record<string, string> = {
  process: '工程',
  legal: '法律',
  storage: '保管',
  cost: '費用',
};

export default function GuideHub() {
  return (
    <section className="section section--alt" aria-label="ガイド記事">
      <div className="container">
        <FadeIn direction="up">
          <div className="section__header">
            <span className="section__label">Guide</span>
            <h2 className="section__title">知っておきたい基礎知識</h2>
            <p className="section__description">
              粉骨・洗骨・散骨に関する正しい知識を、専門機関の視点でわかりやすく解説します。
            </p>
          </div>
        </FadeIn>
        <StaggerChildren className={styles.grid} staggerDelay={0.05}>
          {GUIDE_ARTICLES.map((article) => (
            <StaggerItem key={article.slug}>
              <Link href={`/guide/${article.slug}`} className={styles.card}>
                <span className={styles.category}>
                  {CATEGORY_LABELS[article.category]}
                </span>
                <h3 className={styles.title}>{article.title}</h3>
                <span className={styles.readMore}>
                  記事を読む →
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
        <FadeIn direction="up" delay={0.2}>
          <div className={styles.moreLink}>
            <Link href="/guide" className={styles.viewAll}>
              ガイド一覧を見る →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
