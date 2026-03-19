import type { Metadata } from 'next';
import FadeIn from '@/components/motion/FadeIn';
import StaggerChildren, { StaggerItem } from '@/components/motion/StaggerChildren';
import Button from '@/components/ui/Button';
import Accordion from '@/components/ui/Accordion';
import Breadcrumb from '@/components/ui/Breadcrumb';
import SummaryBlock from '@/components/ui/SummaryBlock';
import {
  JsonLd,
  generateBreadcrumbSchema,
  generateServiceSchema,
  generateFAQSchema,
  generateHowToSchema,
} from '@/lib/schema/jsonld';
import { prisma } from '@/lib/prisma';
import styles from '../powdered/powdered.module.css'; // 共有スタイル流用

export const metadata: Metadata = {
  title: '洗骨+粉骨セットプランの工程・品質基準と料金|遺骨.com',
  description:
    'お墓や長期保管の遺骨に対応。洗骨（カビ・六価クロム除去）→粉骨（2mm以下）をワンストップで実施。工程・品質チェック基準・所要日数・料金を明示。法人一括委託可。全国対応。',
  alternates: { canonical: '/services/washing-and-pulverization' },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: '遺骨.com｜粉骨・洗骨の専門機関',
    images: [{
      url: `/og?title=洗骨+粉骨セットプランの工程・料金・SLA&label=サービス`,
      width: 1200,
      height: 630,
      alt: '洗骨+粉骨セットプランの工程・料金・SLA',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`/og?title=洗骨+粉骨セットプランの工程・料金・SLA&label=サービス`],
  },
};

const SUMMARY_ITEMS = [
  { label: '対象', value: '墓からの遺骨 / 長期保管でカビがある遺骨' },
  { label: '工程数', value: '洗骨（6工程）→ 粉骨（5工程）の計11工程' },
  { label: '除去対象', value: 'カビ・六価クロム・害虫・土泥・異物 → パウダー化' },
  { label: '価格帯', value: '26,400円〜（サイズ・状態で変動）' },
  { label: '標準納期', value: '7〜12日（乾燥工程含む）' },
  { label: '依頼方法', value: '郵送 / 出張お引取り / 法人一括委託' },
];

const PROCESS_STEPS = [
  {
    phase: '洗骨フェーズ',
    steps: [
      { num: '01', title: '受領・状態確認', desc: '遺骨の状態（カビ種類・六価クロムの有無・土泥量）を確認し、管理番号を付与。' },
      { num: '02', title: '土泥・粗ゴミ除去（状態別）', desc: '土泥が大量に付着している場合は先行除去。状態に応じてプランを確定。' },
      { num: '03', title: '超音波洗浄', desc: '専用洗浄液と超音波で骨の内部まで洗浄。カビ・変色・害虫を除去。' },
      { num: '04', title: '六価クロム除去', desc: '専用副剤で六価クロムを無害化処理。確認手順で完了を検証。' },
      { num: '05', title: '完全乾燥', desc: '専用乾燥機で骨の芯まで完全乾燥（省略するとカビが再発する）。' },
      { num: '06', title: '洗骨チェック完了', desc: '乾燥後の状態・六価クロム除去・異物残存を確認。品質基準に達した段階で粉骨フェーズへ。' },
    ],
  },
  {
    phase: '粉骨フェーズ',
    steps: [
      { num: '07', title: '小石・不純物除去', desc: '洗骨後に残存する小石・金属類を手作業で除去。' },
      { num: '08', title: '専用粉骨機で処理', desc: '専用粉骨機で2mm以下のパウダー状に均一粉砕。' },
      { num: '09', title: '微粒子チェック', desc: '粒度・異物残存・目視品質を確認。' },
      { num: '10', title: '梱包・証明書同封', desc: '保存袋に収め、作業報告書または粉骨証明書を同封。' },
      { num: '11', title: '返送', desc: '専用梱包で丁寧に返送。到着後即時報告。' },
    ],
  },
];

export default async function WashingAndPulverizationPage() {
  let rawFaqs: Array<{ question: string; answer: string }> = [];
  try {
    const fetched = await prisma.ikotsuFaqItem.findMany({
      where: { category: 'set', page_slug: '/services/washing-and-pulverization', is_published: true },
      select: { question: true, answer: true },
      orderBy: { sort_order: 'asc' }
    });
    if (fetched && fetched.length > 0) {
      rawFaqs = fetched;
    }
  } catch (err) {
    //
  }
  const faqsForUI = rawFaqs.map(f => ({
    question: f.question,
    answer: <p>{f.answer}</p>
  }));
  
  if (faqsForUI.length === 0) {
    faqsForUI.push({ question: 'セットプランにすると割安ですか？', answer: <p>個別で依頼するより割安になる場合がほとんどです。</p> });
    rawFaqs.push({ question: 'セットプランにすると割安ですか？', answer: '個別で依頼するより割安になる場合がほとんどです。' });
  }

  return (
    <>
      <div className="container" style={{ paddingTop: 'var(--space-6)' }}>
        <Breadcrumb
          items={[
            { name: 'トップ', href: '/' },
            { name: 'サービス一覧', href: '/services' },
            { name: '洗骨+粉骨セットプラン', href: '/services/washing-and-pulverization' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className={styles.hero} aria-label="洗骨+粉骨セットプラン ヒーロー領域">
        <div className="container">
          <div className={styles.heroLayout}>
            <FadeIn direction="left" className={styles.heroText}>
              <span className={styles.badge}>カビ・六価クロム除去 → 2mm以下に粉砕</span>
              <h1 className={styles.heroTitle}>
                洗骨+粉骨<br />
                <span className={styles.heroTitleSub}>セットプランの工程・品質基準と料金</span>
              </h1>
              <p className={styles.heroLead}>
                お墓や長期保管の遺骨を対象に、<br />
                洗骨（除染）→ 粉骨（パウダー化）を<br />
                ワンストップで実施します。
              </p>
              <SummaryBlock items={SUMMARY_ITEMS} />
              <div className={styles.heroActions}>
                <Button href="/contact" variant="primary" size="lg">
                  無料相談・お見積り
                </Button>
                <Button href="/pricing" variant="secondary" size="lg">
                  料金詳細を見る
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why Set Plan */}
      <section className="section section--alt" aria-label="セットプランを選ぶ理由">
        <div className="container">
          <FadeIn direction="up">
            <div className="section__header">
              <span className="section__label">Why Set Plan</span>
              <h2 className="section__title">セットプランを選ぶ理由</h2>
            </div>
          </FadeIn>
          <StaggerChildren className={styles.featuresGrid} staggerDelay={0.1}>
            <StaggerItem className={styles.featureCard}>
              <div className={styles.featureIcon}>1</div>
              <h3 className={styles.featureTitle}>工程間の転送リスクがない</h3>
              <p className={styles.featureDesc}>
                洗骨を別業者・別タイミングで依頼すると、転送中の状態悪化や管理番号の混乱が起きるリスクがあります。
                セットプランは全工程を一貫管理するため、そのリスクがありません。
              </p>
            </StaggerItem>
            <StaggerItem className={styles.featureCard}>
              <div className={styles.featureIcon}>2</div>
              <h3 className={styles.featureTitle}>乾燥→粉骨を連続で実施</h3>
              <p className={styles.featureDesc}>
                洗骨後の完全乾燥が不十分なまま粉骨すると、内部からカビが発生します。
                セットプランでは乾燥完了をチェックしてから粉骨工程に移るため、品質を保証できます。
              </p>
            </StaggerItem>
            <StaggerItem className={styles.featureCard}>
              <div className={styles.featureIcon}>3</div>
              <h3 className={styles.featureTitle}>証明書に全工程を一括記載</h3>
              <p className={styles.featureDesc}>
                洗骨・六価クロム除去・乾燥・粉骨の全工程をひとつの証明書に記載します。
                法人が委託証明として活用できる形式でも発行可能です。
              </p>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </section>

      {/* Process */}
      <section className="section" aria-label="洗骨+粉骨の工程">
        <div className="container">
          <FadeIn direction="up" className="text-center">
            <h2 className="section__title">全11工程の品質チェック基準</h2>
            <p className="section__description">
              洗骨フェーズ（6工程）と粉骨フェーズ（5工程）に分けて管理します。<br />
              各工程にチェックポイントを設け、品質基準を満たしてから次工程に進みます。
            </p>
          </FadeIn>

          {PROCESS_STEPS.map((phase) => (
            <div key={phase.phase} style={{ marginTop: 'var(--space-12)' }}>
              <FadeIn direction="up">
                <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-6)', color: 'var(--color-primary, #1a6b5a)' }}>
                  {phase.phase}
                </h3>
              </FadeIn>
              <StaggerChildren className={styles.processGrid} staggerDelay={0.08}>
                {phase.steps.map((step) => (
                  <StaggerItem key={step.num} className={styles.processCard}>
                    <div className={styles.processContent}>
                      <span className={styles.stepBadge}>STEP {step.num}</span>
                      <h3 className={styles.processTitle}>{step.title}</h3>
                      <p className={styles.processDesc}>{step.desc}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--alt" aria-label="よくある質問">
        <div className="container container--narrow">
          <FadeIn direction="up">
            <div className="section__header">
              <span className="section__label">FAQ</span>
              <h2 className="section__title">洗骨+粉骨セットプランのよくある質問|工程・六価クロム・法人委託</h2>
            </div>
            <Accordion items={faqsForUI} />
          </FadeIn>
        </div>
      </section>

      {/* Related */}
      <section className="section" aria-label="関連サービス">
        <div className="container container--narrow text-center">
          <FadeIn direction="up">
            <h2 className="section__title">単体サービスも対応しています</h2>
            <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', marginTop: 'var(--space-8)', flexWrap: 'wrap' }}>
              <Button href="/services/powdered" variant="secondary">粉骨のみ</Button>
              <Button href="/services/cleaning" variant="secondary">洗骨のみ</Button>
              <Button href="/services/carrying" variant="secondary">出張・搬送</Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Structured Data */}
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: 'トップ', href: '/' },
          { name: 'サービス一覧', href: '/services' },
          { name: '洗骨+粉骨セットプラン', href: '/services/washing-and-pulverization' },
        ])}
      />
      <JsonLd
        data={generateServiceSchema({
          name: '洗骨+粉骨セットプランの工程・品質基準と料金',
          description:
            '洗骨（カビ・六価クロム除去）→粉骨（2mm以下）のワンストップ処理。11工程の品質チェック基準を明示。法人一括委託可。',
          url: '/services/washing-and-pulverization',
        })}
      />
      <JsonLd
        data={generateFAQSchema(
          rawFaqs.map((f) => ({
            question: f.question,
            answer: typeof f.answer === 'string' ? f.answer : '詳細はページ内をご覧ください。',
          }))
        )}
      />
      <JsonLd
        data={generateHowToSchema({
          name: '洗骨+粉骨セットプランの工程',
          description: '洗骨（除染）→粉骨（パウダー化）のワンストップ処理。7〜12日で完了。',
          totalTime: 'P12D',
          steps: [
            { name: '受領・状態確認', text: '遺骨の状態を確認し、管理番号を付与する。' },
            { name: '超音波洗浄', text: '専用洗浄液と超音波でカビ・害虫を除去する。' },
            { name: '六価クロム除去', text: '専用副剤で六価クロムを除去し、完了を検証する。' },
            { name: '完全乾燥', text: '専用機器で骨の芯まで完全乾燥させる。' },
            { name: '粉骨', text: '専用粉骨機で2mm以下のパウダー状に処理する。' },
            { name: '梱包・証明書同封', text: '保存袋に収め、作業報告書または粉骨証明書を同封して返送する。' },
          ],
        })}
      />
    </>
  );
}
