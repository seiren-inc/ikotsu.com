import type { Metadata } from 'next';
import FadeIn from '@/components/motion/FadeIn';
import StaggerChildren, { StaggerItem } from '@/components/motion/StaggerChildren';
import Button from '@/components/ui/Button';
import Breadcrumb from '@/components/ui/Breadcrumb';
import SummaryBlock from '@/components/ui/SummaryBlock';
import { JsonLd, generateBreadcrumbSchema, generateHowToSchema } from '@/lib/schema/jsonld';
import { prisma } from '@/lib/prisma';
import styles from '../corporate.module.css';

export const metadata: Metadata = {
  title: '法人委託フロー・SLA・発行書類一覧|遺骨.com',
  description:
    '寺院・霊園・葬儀社向けの粉骨・洗骨一括委託フロー。問い合わせ→NDA→テスト→継続運用の4ステップとSLA（受領確認当日・完了報告24時間以内）を明示。受領書・処理完了報告書・インボイス請求書を発行。',
  alternates: { canonical: '/corporate/flow' },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: '遺骨.com｜粉骨・洗骨の専門機関',
    images: [{
      url: `/og?title=法人委託フロー・SLA・発行書類一覧&label=法人向け`,
      width: 1200,
      height: 630,
      alt: '法人委託フロー・SLA・発行書類一覧',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`/og?title=法人委託フロー・SLA・発行書類一覧&label=法人向け`],
  },
};

const SUMMARY_ITEMS = [
  { label: '導入ステップ', value: '問い合わせ → NDA → テスト処理 → 継続運用' },
  { label: '受領確認SLA', value: '受領日当日（受領書を発行）' },
  { label: '処理開始SLA', value: '受領翌営業日' },
  { label: '完了報告SLA', value: '処理完了後24時間以内（処理完了報告書を送付）' },
  { label: '請求タイミング', value: '月末締め・翌月初旬発行（インボイス対応）' },
  { label: '発行書類', value: '受領書 / 処理完了報告書 / 月次請求書（インボイス）' },
];

const FLOW_STEPS = [
  {
    num: '01',
    title: '問い合わせ・資料請求',
    sla: '受付後1〜2営業日以内に返信',
    desc: '法人専用フォームまたはお電話でご連絡ください。法人向け特別料金表・サービス案内資料（PDF）を送付します。',
    docs: [],
  },
  {
    num: '02',
    title: 'NDA締結・お打ち合わせ',
    sla: '締結後に詳細打合せ（オンライン可）',
    desc: '秘密保持契約を締結したうえで、月間想定件数・業務フロー・希望する依頼形態をヒアリングします。',
    docs: ['NDA（秘密保持契約書）'],
  },
  {
    num: '03',
    title: 'テスト処理（2〜5件）',
    sla: '処理完了後に報告書・証明書を提出',
    desc: '実際のご依頼を2〜5件受けてテスト運用を行います。品質・報告書の形式・連絡フローを確認していただきます。',
    docs: ['受領書', '処理完了報告書（写真付き）'],
  },
  {
    num: '04',
    title: '継続運用スキーム稼働',
    sla: '月次集計・月末締め・翌月初旬請求',
    desc: '月次での一括受領・一括処理・月次請求のスキームで継続運用。件数変動はフレキシブルに対応します。',
    docs: ['受領書（都度発行）', '処理完了報告書（都度発行）', '月次請求書（インボイス対応）'],
  },
];

export default async function CorporateFlowPage() {
  let rawDocs = null;
  try {
    rawDocs = await prisma.ikotsuDocument.findMany({
      where: { document_category: 'corporate_flow', is_published: true },
      select: { title: true, timing: true, description: true, format_type: true },
      orderBy: { sort_order: 'asc' },
    });
  } catch (err) {
    // 開発環境やリモートDB未反映時のフォールバック用に握りつぶす
  }

  const documentList = rawDocs && rawDocs.length > 0 ? rawDocs.map(r => ({
    name: r.title,
    timing: r.timing,
    content: r.description,
    format: r.format_type
  })) : [
    { name: '受領書', timing: '受領日当日', content: '受領日・管理番号・件数・遺骨の状態・担当者名', format: 'PDF（メール送付）' },
    { name: '処理完了報告書', timing: '処理完了後24時間以内', content: '管理番号・処理工程（グレード）・完了日・担当者名・処理前後写真（任意）', format: 'PDF（メール送付）' },
    { name: '粉骨証明書 / 洗骨証明書', timing: '処理完了後（オプション）', content: '管理番号・依頼者名（法人名可）・作業日・工程グレード・六価クロム除去確認・微粒子規格', format: 'PDF・郵送どちらも対応' },
    { name: '月次請求書', timing: '月末締め・翌月初旬', content: '件数・サービス種別・単価・合計・適格請求書番号', format: 'PDF（インボイス対応）' },
  ];

  return (
    <>
      <div className="container" style={{ paddingTop: 'var(--space-6)' }}>
        <Breadcrumb
          items={[
            { name: 'トップ', href: '/' },
            { name: '法人窓口', href: '/corporate' },
            { name: '委託フロー・SLA', href: '/corporate/flow' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className={styles.hero} aria-label="法人委託フロー ヒーロー領域">
        <div className="container">
          <FadeIn direction="up">
            <span className={styles.badge}>SLA明示 / 発行書類一覧</span>
            <h1 className={styles.heroTitle}>
              法人委託フロー・SLA・<br />発行書類一覧
            </h1>
            <p className={styles.heroLead}>
              問い合わせからNDA締結・テスト処理・継続運用まで、<br />
              各ステップのSLAと発行書類を明示しています。
            </p>
            <SummaryBlock items={SUMMARY_ITEMS} variant="corporate" />
          </FadeIn>
        </div>
      </section>

      {/* Flow */}
      <section className="section" aria-label="委託フロー">
        <div className="container">
          <FadeIn direction="up">
            <div className="section__header">
              <h2 className="section__title">委託導入の4ステップ</h2>
            </div>
          </FadeIn>
          <StaggerChildren className={styles.flowGrid} staggerDelay={0.1}>
            {FLOW_STEPS.map((step) => (
              <StaggerItem key={step.num} className={styles.flowCard}>
                <div className={styles.flowNum}>{step.num}</div>
                <div className={styles.flowContent}>
                  <h3 className={styles.flowTitle}>{step.title}</h3>
                  <p className={styles.flowSla}>SLA: {step.sla}</p>
                  <p className={styles.flowDesc}>{step.desc}</p>
                  {step.docs.length > 0 && (
                    <ul className={styles.flowDocs}>
                      {step.docs.map((d) => (
                        <li key={d}>📄 {d}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Document List */}
      <section className="section section--alt" aria-label="発行書類一覧">
        <div className="container">
          <FadeIn direction="up">
            <div className="section__header">
              <h2 className="section__title">発行書類一覧と記載内容</h2>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <div className={styles.tableWrapper}>
              <table className={styles.docTable}>
                <thead>
                  <tr>
                    <th>書類名</th>
                    <th>発行タイミング</th>
                    <th>記載内容</th>
                    <th>形式</th>
                  </tr>
                </thead>
                <tbody>
                  {documentList.map((doc) => (
                    <tr key={doc.name}>
                      <td><strong>{doc.name}</strong></td>
                      <td>{doc.timing}</td>
                      <td>{doc.content}</td>
                      <td>{doc.format}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="section" aria-label="法人相談">
        <div className="container container--narrow text-center">
          <FadeIn direction="up">
            <h2 className="section__title">まずはお問い合わせ・資料請求から</h2>
            <p className="section__description" style={{ marginTop: 'var(--space-4)' }}>
              法人向け特別料金表（一般非公開）およびサービス案内資料を無料でお送りします。<br />
              NDA締結・テスト処理のご相談も承ります。
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', marginTop: 'var(--space-8)', flexWrap: 'wrap' }}>
              <Button href="/for-corporate" variant="primary" size="lg">法人相談フォームへ</Button>
              <Button href="/corporate" variant="secondary" size="lg">法人窓口トップに戻る</Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Structured Data */}
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: 'トップ', href: '/' },
          { name: '法人窓口', href: '/corporate' },
          { name: '委託フロー・SLA', href: '/corporate/flow' },
        ])}
      />
      <JsonLd
        data={generateHowToSchema({
          name: '法人委託の導入フロー',
          description: '寺院・霊園・葬儀社が粉骨・洗骨を外部委託するための4ステップ。',
          steps: [
            { name: '問い合わせ・資料請求', text: '法人専用フォームから資料請求。1〜2営業日以内に返信。' },
            { name: 'NDA締結・お打ち合わせ', text: 'NDA締結後に月間件数・業務フローをヒアリング。' },
            { name: 'テスト処理', text: '2〜5件のテスト処理で品質・書類形式を確認。' },
            { name: '継続運用スキーム稼働', text: '月次一括受領・月次請求書発行で継続運用。' },
          ],
        })}
      />
    </>
  );
}
