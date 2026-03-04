import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/motion/FadeIn';
import StaggerChildren, { StaggerItem } from '@/components/motion/StaggerChildren';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { JsonLd, generateBreadcrumbSchema } from '@/lib/schema/jsonld';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'ガイド・基礎知識 | Ikotsu.com',
  description:
    '粉骨・洗骨・散骨・改葬に関する基礎知識を専門機関の視点で解説。費用・法律・工程・保管方法など、安心して依頼するための情報を提供します。',
  alternates: { canonical: '/guide' },
};

export const GUIDE_ARTICLES = [
  {
    slug: 'what-is-powdered-bone',
    title: '粉骨とは？意味・目的・方法をわかりやすく解説',
    category: 'process',
    description: '粉骨の意味から目的・処理方法・費用相場まで、基礎から丁寧に解説します。',
    readTime: '5分',
    content: `
粉骨とは、遺骨を専用の機械で細かく砕き、パウダー状にする処理のことです。

## なぜ粉骨が必要なのか

散骨・改葬・手元供養などを行う際の前処理として利用されます。特に散骨（海洋散骨や山林散骨）を行う場合、法的に「粉骨した状態」であることが一般的に求められています。

## 粉骨の工程

1. 遺骨の状態確認
2. 専用粉砕機による粉骨処理（目的に応じた粒度）
3. 処理前後の記録（写真記録・レポート）
4. 専用密封容器への収納・返送

## 費用の目安

一般的な費用の目安は30,000円〜です。遺骨の量・状態・オプション（洗骨との同時依頼など）により変動します。

## 一部だけ粉骨することも可能

手元供養用に一部を残し、残りを粉骨するなど、ご要望に応じた柔軟な対応が可能です。
    `.trim(),
  },
  {
    slug: 'bone-cleaning-guide',
    title: '洗骨が必要なケースと具体的な工程',
    category: 'process',
    description: '洗骨が必要なケース・工程・費用・粉骨との違いを専門機関が解説。',
    readTime: '4分',
    content: `
洗骨とは、遺骨に付着したカビ・汚れ・変色などを専門的に洗浄する処理です。

## 洗骨が必要なケース

- 長期間保管されていた遺骨にカビが発生している
- 湿気の多い場所に保管されていた（変色・においがある）
- 土葬されていた遺骨を掘り出した
- 改葬・移転前に清潔な状態にしたい

## 洗骨の工程

1. 遺骨の状態確認・汚損程度の把握
2. 専門洗浄液を使用したカビ・汚れの除去
3. 十分な乾燥処理
4. 処理前後の記録（写真記録・レポート）
5. 返送

## 費用の目安

基本料金は30,000円〜（税込）です。汚損の程度・量により変動します。

## 粉骨とのセット依頼

洗骨と粉骨をセットでご依頼いただくことも可能です。
    `.trim(),
  },
  {
    slug: 'scattering-legal',
    title: '散骨に関する法律と注意点',
    category: 'legal',
    description: '海洋散骨・山林散骨に関する法律的な解釈・禁止エリア・粉骨の必要性を解説。',
    readTime: '6分',
    content: `
散骨（自然葬）は日本で法的に明確な規定はなく、「墓地・埋葬等に関する法律」には直接禁止規定がありません。ただし、一般的に認められているのは「節度ある散骨」です。

## 散骨の一般的な解釈

- 公共の場所・他者が迷惑と感じる場所への散骨は避ける
- 遺骨は粉骨（細かい粉状）にしてから散骨する
- 私有地への無断散骨は不法投棄となる可能性がある

## 粉骨が必要な理由

散骨を行う場合、「遺骨とわかる形状」のまま散布することは社会的に問題視されています。一般的に2mm以下に粉砕することが推奨されています。

## 海洋散骨で注意すること

- 人が遊泳・漁業を行う海域での散骨は避ける
- 一部の地域・港ではガイドラインが設けられている
- 国土交通省のガイドラインも参照すること

## 当社の対応

散骨に適した粒度での粉骨処理が可能です。ご用途をお知らせいただくと最適な粒度でご対応します。
    `.trim(),
  },
  {
    slug: 'mold-prevention',
    title: '遺骨のカビ対策と保管方法',
    category: 'storage',
    description: '遺骨にカビが発生する原因と対処法・正しい保管方法を専門機関が詳しく解説。',
    readTime: '5分',
    content: `
遺骨は適切に保管しないと、カビや変色が発生することがあります。

## カビが発生する主な原因

- 高湿度の場所（押し入れ・納戸・地下）での保管
- 骨壷のフタが完全に密閉されていない
- 温度変化の激しい場所での保管

## 正しい保管方法

1. **直射日光・高温多湿を避ける**：風通しの良い場所が理想的
2. **骨壷のフタをしっかり閉める**：開封後は特に注意
3. **乾燥剤を活用する**：骨壷の中に乾燥剤を入れることも有効
4. **定期的に状態を確認する**：年1回は状態をチェック

## カビが発生してしまったら

カビが発生した場合は洗骨で対処可能です。状態が悪化する前にご相談ください。
    `.trim(),
  },
  {
    slug: 'reburial-process',
    title: '改葬の手続きと流れ',
    category: 'legal',
    description: '改葬（お墓の引越し）に必要な手続き・費用・粉骨との関係を解説。',
    readTime: '7分',
    content: `
改葬とは、既存の墓地から遺骨を取り出し、別の場所に移す手続きです（「お墓の引越し」とも呼ばれます）。

## 改葬の一般的な流れ

1. 移転先（新しい墓地や納骨堂）を決める
2. 現在の墓地がある市区町村役場へ「改葬許可申請」を提出
3. 「改葬許可証」の交付を受ける
4. 遺骨を取り出す（掘り起こし）
5. 新しい場所へ納骨

## 粉骨が必要なケース

- 散骨や手元供養として新たに処理する場合
- 遺骨の量が多く、移転先の容量に合わせて調整が必要な場合

## 当社の対応

改葬に伴う粉骨・洗骨の前処理を承っています。状態確認から対応いたします。
    `.trim(),
  },
  {
    slug: 'cost-comparison',
    title: '粉骨の費用相場と選び方',
    category: 'cost',
    description: '粉骨サービスの費用相場・料金に含まれるもの・業者の選び方を解説。',
    readTime: '5分',
    content: `
粉骨サービスの費用は業者によって大きく異なります。相場と選び方のポイントを解説します。

## 費用の一般的な相場

| サービス内容 | 目安 |
|---|---|
| 粉骨（基本） | 25,000円〜35,000円 |
| 洗骨 | 25,000円〜35,000円 |
| 粉骨+洗骨セット | 50,000円〜60,000円 |
| 出張・梱包キット | 10,000円〜 |

## 費用に含まれるべきもの

- 粉骨処理費
- 処理後の専用容器代
- 返送費
- 処理レポート

## 業者選びのポイント

1. **透明な料金設定**：追加料金の有無を確認
2. **処理工程の公開**：写真記録・レポートを提供しているか
3. **専門設備**：専用粉砕機を保有しているか
4. **対応の丁寧さ**：問い合わせ時の対応を確認

## 安すぎる業者には注意

異常に安価な業者は、設備や衛生管理が不十分な場合があります。
    `.trim(),
  },
] as const;

const CATEGORY_LABELS: Record<string, string> = {
  process: '工程',
  legal: '法律',
  storage: '保管',
  cost: '費用',
};

const CATEGORIES = ['all', 'process', 'legal', 'storage', 'cost'] as const;

export default function GuidePage() {
  return (
    <>
      <div className="container" style={{ paddingTop: 'var(--space-6)' }}>
        <Breadcrumb items={[
          { name: 'トップ', href: '/' },
          { name: 'ガイド・基礎知識', href: '/guide' },
        ]} />
      </div>

      <section className={styles.hero}>
        <div className="container">
          <FadeIn direction="up">
            <span className="section__label">Guide</span>
            <h1 className={styles.heroTitle}>ガイド・基礎知識</h1>
            <p className={styles.heroLead}>
              粉骨・洗骨・散骨・改葬に関する正しい知識を、<br />専門機関の視点でわかりやすく解説します。
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <FadeIn direction="up" className={`text-center ${styles.sectionHeaderMargin12}`}>
            <h2 className="section__title">カテゴリーから探す</h2>
            <div className={styles.categoryNav}>
              {CATEGORIES.map((cat) => (
                <span key={cat} className={`${styles.categoryChip} ${cat === 'all' ? styles.categoryChipActive : ''}`}>
                  {cat === 'all' ? 'すべて' : CATEGORY_LABELS[cat]}
                </span>
              ))}
            </div>
          </FadeIn>

          <StaggerChildren className={styles.articleGrid} staggerDelay={0.05}>
            {GUIDE_ARTICLES.map((article) => (
              <StaggerItem key={article.slug}>
                <Link href={`/guide/${article.slug}`} className={styles.articleCard}>
                  <div className={styles.articleMeta}>
                    <span className={styles.articleCategory}>
                      {CATEGORY_LABELS[article.category]}
                    </span>
                    <span className={styles.articleReadTime}>読了目安 {article.readTime}</span>
                  </div>
                  <h3 className={styles.articleTitle}>{article.title}</h3>
                  <p className={styles.articleDesc}>{article.description}</p>
                  <span className={styles.articleLink}>
                    記事を読む
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={styles.articleLinkIcon}>
                      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <JsonLd data={generateBreadcrumbSchema([
        { name: 'トップ', href: '/' },
        { name: 'ガイド・基礎知識', href: '/guide' },
      ])} />
    </>
  );
}
