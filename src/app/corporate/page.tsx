import type { Metadata } from 'next';
import FadeIn from '@/components/motion/FadeIn';
import StaggerChildren, { StaggerItem } from '@/components/motion/StaggerChildren';
import Button from '@/components/ui/Button';
import Breadcrumb from '@/components/ui/Breadcrumb';
import SummaryBlock from '@/components/ui/SummaryBlock';
import Accordion from '@/components/ui/Accordion';
import {
  JsonLd,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/lib/schema/jsonld';
import styles from './corporate.module.css';

export const metadata: Metadata = {
  title: '法人向け遺骨処理の委託フロー・料金・SLA|遺骨.com 法人窓口',
  description:
    '寺院・霊園・葬儀社・納骨堂向けの粉骨・洗骨一括委託。受領書・処理完了報告書・月次請求書（インボイス対応）を発行。SLA明示。法人専任担当が窓口を一本化します。',
  alternates: { canonical: '/corporate' },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: '遺骨.com｜粉骨・洗骨の専門機関',
    images: [{
      url: `/og?title=法人・寺院・霊園向け粉骨洗骨の委託窓口&label=法人向け`,
      width: 1200,
      height: 630,
      alt: '法人・寺院・霊園向け粉骨洗骨の委託窓口',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`/og?title=法人・寺院・霊園向け粉骨洗骨の委託窓口&label=法人向け`],
  },
};

const SUMMARY_ITEMS = [
  { label: '対象', value: '寺院 / 霊園 / 葬儀社 / 納骨堂 / 散骨業者 / 行政・福祉機関' },
  { label: '処理内容', value: '粉骨 / 洗骨 / 洗骨+粉骨セット / 搬送手配' },
  { label: '発行書類', value: '受領書・処理完了報告書・月次請求書（インボイス対応）' },
  { label: 'SLA', value: '受領確認: 当日 / 処理開始: 翌営業日 / 完了報告: 処理完了後24時間以内' },
  { label: '料金体系', value: '法人卸価格（要問い合わせ）/ 月次一括請求対応' },
];

const SERVICES = [
  {
    id: 'powdered',
    title: '粉骨（一括委託）',
    desc: 'スタンダード / 墓から / 土付きの3グレードに対応。月次一括受領・月次報告書・月次請求。法人名義の粉骨証明書を発行可能。',
    link: '/services/powdered',
  },
  {
    id: 'cleaning',
    title: '洗骨（除染委託）',
    desc: 'カビ・六価クロム・土泥除去の3プランに対応。法人から預かった遺骨の除染を標準工程で実施し、状態報告書を発行。',
    link: '/services/cleaning',
  },
  {
    id: 'set',
    title: '洗骨+粉骨セット（ワンストップ）',
    desc: '墓からの遺骨・長期保管遺骨に推奨。洗骨→粉骨の全11工程を一貫管理。月次一括処理に対応。',
    link: '/services/washing-and-pulverization',
  },
  {
    id: 'flow',
    title: '委託の流れ・SLA',
    desc: '問い合わせ→ NDA→ テスト処理→ 継続運用の流れと、各ステップのSLA（所要日数・報告タイミング）を明示しています。',
    link: '/corporate/flow',
  },
];

const FAQS = [
  {
    question: 'インボイス対応の請求書を発行できますか？',
    answer: (
      <p>
        はい。適格請求書（インボイス）対応の月次請求書を発行します。法人番号・登録番号を記載します。
        請求書形式（PDF）でメール送付します。
      </p>
    ),
  },
  {
    question: 'NDA（秘密保持契約）はありますか？',
    answer: (
      <p>
        テスト処理着手前に NDA を締結します。ご依頼件数・法人名・エンドユーザー情報は第三者への開示を一切行いません。
        NDA のひな形をご用意しており、貴社書式への対応も可能です。
      </p>
    ),
  },
  {
    question: '月の件数に変動がある場合はどう対応しますか？',
    answer: (
      <p>
        月次の変動に応じたフレキシブルな受注に対応します。月初に当月予定件数を共有いただければ、設備・人員を確保します。
        急増の場合は1営業日前までにご連絡ください。
      </p>
    ),
  },
  {
    question: '受領書・処理完了報告書の形式を教えてください',
    answer: (
      <p>
        受領書: 受領日・管理番号・件数・遺骨の状態を記載したPDF。
        処理完了報告書: 全件の管理番号・処理工程・完了日・担当者名・写真（任意）を記載。
        いずれも電子署名対応を検討中。
      </p>
    ),
  },
  {
    question: '搬送（集荷・配送）も委託できますか？',
    answer: (
      <p>
        施設への定期集荷に対応しています（関東圏は即日調整可・他県は要相談）。
        入出荷の管理を含め、搬送スケジュールを専任担当が調整します。
      </p>
    ),
  },
];

export default function CorporatePage() {
  return (
    <>
      <div className="container" style={{ paddingTop: 'var(--space-6)' }}>
        <Breadcrumb
          items={[
            { name: 'トップ', href: '/' },
            { name: '法人窓口', href: '/corporate' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className={styles.hero} aria-label="法人窓口 ヒーロー領域">
        <div className="container">
          <FadeIn direction="up">
            <span className={styles.badge}>BtoB / 法人一括委託専用</span>
            <h1 className={styles.heroTitle}>
              法人向け遺骨処理の<br />
              委託フロー・料金・SLA
            </h1>
            <p className={styles.heroLead}>
              寺院・霊園・葬儀社・納骨堂などの法人から<br />
              粉骨・洗骨の一括委託を受け付けています。<br />
              受領書・完了報告書・インボイス対応請求書を発行し、<br />
              専任担当が窓口を一本化します。
            </p>
            <SummaryBlock items={SUMMARY_ITEMS} variant="corporate" />
            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', marginTop: 'var(--space-6)' }}>
              <Button href="#contact-form" variant="primary" size="lg">法人相談・料金表を請求</Button>
              <Button href="/corporate/flow" variant="secondary" size="lg">委託フロー・SLAを確認</Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services */}
      <section className="section" aria-label="法人向けサービス一覧">
        <div className="container">
          <FadeIn direction="up">
            <div className="section__header">
              <h2 className="section__title">法人向けサービスと委託フロー</h2>
            </div>
          </FadeIn>
          <StaggerChildren
            className={styles.serviceGrid}
            staggerDelay={0.08}
          >
            {SERVICES.map((s) => (
              <StaggerItem key={s.id} className={styles.serviceCard}>
                <h3 className={styles.serviceTitle}>{s.title}</h3>
                <p className={styles.serviceDesc}>{s.desc}</p>
                <a href={s.link} className={styles.serviceLink}>詳細を確認 →</a>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Issues */}
      <section className="section section--alt" aria-label="法人の課題と解決">
        <div className="container">
          <FadeIn direction="up">
            <div className="section__header">
              <h2 className="section__title">法人が抱える課題と遺骨.comの対応</h2>
            </div>
          </FadeIn>
          <div className={styles.issueGrid}>
            <FadeIn direction="left" className={styles.issueCard}>
              <h3 className={styles.issueTitle}>よくある課題</h3>
              <ul className={styles.issueList}>
                <li>件数が月次で変動し、自社スタッフだけでは処理が追いつかない</li>
                <li>処理後の状態を証明する書類がなく、以来者への説明材料に欠ける</li>
                <li>外注先の請求書形式がバラバラで経理処理に手間がかかる</li>
                <li>窓口が複数あり、管理コストが増大している</li>
                <li>年に数件しかない土付き遺骨や六価クロム対応に困っている</li>
              </ul>
            </FadeIn>
            <FadeIn direction="right" className={styles.issueCardAlt}>
              <h3 className={styles.issueTitleAlt}>遺骨.comの対応</h3>
              <ul className={styles.issueListAlt}>
                <li><strong>月次変動に対応</strong>: フレキシブル受注・月初件数共有で設備確保</li>
                <li><strong>全件に処理完了報告書</strong>: 写真・管理番号・工程記録をPDFで発行</li>
                <li><strong>インボイス対応の月次請求書</strong>: PDF メール送付・法人番号記載</li>
                <li><strong>専任担当が窓口を一本化</strong>: 問い合わせ・搬送・報告を一括管理</li>
                <li><strong>全グレードに対応</strong>: スタンダード/墓から/土付き/六価クロムが全て処理可能</li>
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" aria-label="法人向けよくある質問" id="contact-form">
        <div className="container container--narrow">
          <FadeIn direction="up">
            <div className="section__header">
              <span className="section__label">FAQ</span>
              <h2 className="section__title">法人委託のよくある質問|請求書・NDA・月次変動・SLA</h2>
            </div>
            <Accordion items={FAQS} />
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--alt" aria-label="法人相談フォーム">
        <div className="container container--narrow text-center">
          <FadeIn direction="up">
            <h2 className="section__title">法人相談・料金表のご請求</h2>
            <p className="section__description" style={{ marginTop: 'var(--space-4)' }}>
              法人向け特別料金表（一般非公開）・サービス案内資料をご希望の方、<br />
              またはNDA締結・テスト処理のご相談はフォームからご連絡ください。<br />
              専任担当が1〜2営業日以内にご連絡します。
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', marginTop: 'var(--space-8)', flexWrap: 'wrap' }}>
              <Button href="/for-corporate" variant="primary" size="lg">法人相談フォームへ</Button>
              <Button href="/corporate/flow" variant="secondary" size="lg">委託フロー・SLAを確認</Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Structured Data */}
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: 'トップ', href: '/' },
          { name: '法人窓口', href: '/corporate' },
        ])}
      />
      <JsonLd
        data={generateFAQSchema(
          FAQS.map((f) => ({
            question: f.question,
            answer: '詳細はページ内をご覧ください。',
          }))
        )}
      />
    </>
  );
}
