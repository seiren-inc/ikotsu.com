import type { Metadata } from 'next';
import FadeIn from '@/components/motion/FadeIn';
import StaggerChildren, { StaggerItem } from '@/components/motion/StaggerChildren';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Accordion from '@/components/ui/Accordion';
import Breadcrumb from '@/components/ui/Breadcrumb';
import SummaryBlock from '@/components/ui/SummaryBlock';
import { JsonLd, generateBreadcrumbSchema, generateServiceSchema, generateFAQSchema, generateHowToSchema } from '@/lib/schema/jsonld';
import { prisma } from '@/lib/prisma';
import styles from './cleaning.module.css';

export const metadata: Metadata = {
  title: '洗骨サービスの除染工程・品質仕様と料金|遺骨.com',
  description: '洗骨サービス。シンプル（6,600円〜）・スタンダード（8,800円〜）・土泥除去（18,600円〜）の3プラン。カビ除去・六価クロム除去・害虫除去・各工程を明示。全国対応。',
  alternates: { canonical: '/services/cleaning' },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: '遺骨.com｜粉骨・洗骨の専門機関',
    images: [{
      url: `/og?title=洗骨サービスの工程・六価クロム除去・料金&label=サービス`,
      width: 1200,
      height: 630,
      alt: '洗骨サービスの工程・六価クロム除去・料金',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`/og?title=洗骨サービスの工程・六価クロム除去・料金&label=サービス`],
  },
};

const CLEANING_PROCESS_STEPS = [
  { step: '01', title: '状態の精密確認', desc: 'カビの種類や汚損の程度、ご遺骨の脆さ（もろさ）を確認し、最適な洗浄液の配合を決定します。', image: '/images/process-washing.png' },
  { step: '02', title: '予備洗浄・ブラッシング', desc: '付着した大きな汚れや土などを、ハケや専用ブラシを用いて手作業で丁寧に落とします。', image: '/images/process-washing.png' },
  { step: '03', title: '専用液による超音波洗浄', desc: '専用の洗浄液に浸し、超音波洗浄機で骨の内部に根を張ったカビや長年の汚れを浮き上がらせて除去します。', image: '/images/process-washing.png' },
  { step: '04', title: 'すすぎ・中和処理', desc: 'きれいな純水で何度もすすぎを行い、洗浄液を完全に落としきります。', image: '/images/process-washing.png' },
  { step: '05', title: '完全乾燥・UV殺菌', desc: 'カビの再発を防ぐため、専用乾燥機で数日かけて骨の芯まで完全に水分を飛ばし、強力なUVランプで殺菌します。', image: '/images/process-washing.png' },
  { step: '06', title: 'ご返送（または粉骨へ）', desc: '清潔な状態に復元したご遺骨を真空パックでお返しするか、そのまま粉骨処理（セットプラン）へ移行します。', image: '/images/process-washing.png' },
];

const SUMMARY_ITEMS = [
  { label: '除去対象', value: 'カビ・害虫・六価クロム・土泥・異物' },
  { label: '価格帯', value: '6,600円〜（シンプル）/ 8,800円〜（スタンダード）/ 18,600円〜（土泥除去）' },
  { label: '標準納期', value: '5〜7日（シンプル・スタンダード）/ 7〜10日（土泥除去）' },
  { label: '選択基準', value: '汚れのみ→シンプル / カビ・六価クロム→スタンダード / 土泥大量→土泥除去プラン' },
  { label: '依頼方法', value: '郵送 / 出張お引取り / 法人一括委託' },
];

export default async function CleaningPage() {
  let rawFaqs: Array<{ question: string; answer: string }> = [];
  try {
    const fetched = await prisma.ikotsuFaqItem.findMany({
      where: { category: 'cleaning', page_slug: '/services/cleaning', is_published: true },
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
  // 取得できない場合のフォールバック
  if (faqsForUI.length === 0) {
    faqsForUI.push({ question: '六価クロムは全プランで除去されますか？', answer: <p>スタンダード以上のプランに含まれます。</p> });
    rawFaqs.push({ question: '六価クロムは全プランで除去されますか？', answer: 'スタンダード以上のプランに含まれます。' });
  }

  return (
    <>
      <div className="container" style={{ paddingTop: 'var(--space-6)' }}>
        <Breadcrumb items={[
          { name: 'トップ', href: '/' },
          { name: 'サービス一覧', href: '/services' },
          { name: '洗骨（専用洗浄）', href: '/services/cleaning' },
        ]} />
      </div>

      {/* Hero */}
      <section className={styles.hero} aria-label="洗骨サービス ヒーロー領域">
        <div className="container">
          <div className={styles.heroLayout}>
            <FadeIn direction="left" className={styles.heroText}>
              <span className={styles.badge}>除染スペック・工程を明示</span>
              <h1 className={styles.heroTitle}>洗骨サービスの<br/><span className={styles.heroTitleSub}>除染工程・品質仕様と料金</span></h1>
              <p className={styles.heroLead}>
                遺骨の状態（表面汚れ / カビ・六価クロム / 土泥大量）によって<br />
                適切なプランが異なります。<br />
                工程・納期・料金を増載に公開しています。
              </p>
              <SummaryBlock items={SUMMARY_ITEMS} />
              <div className={styles.heroActions}>
                <Button href="/contact" variant="primary" size="lg">無料相談・状態確認</Button>
                <Button href="/pricing" variant="secondary" size="lg">料金詳細を見る</Button>
              </div>
            </FadeIn>
            <FadeIn direction="right" className={styles.heroImageWrap}>
              <Image 
                src="/images/process-washing.png" 
                alt="洗骨専用設備" 
                layout="fill"
                objectFit="cover"
                className={styles.heroImage}
                priority
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Plan Types & Selection Criteria */}
      <section className="section section--alt" aria-label="洗骨プランと選択基準">
        <div className="container">
          <FadeIn direction="up" className="text-center">
            <h2 className="section__title">洗骨プランと工程の選択基準</h2>
            <p className="section__description">
              遺骨の状態によって必要な工程数・所要日数・除去対象が異なります。状態を確認してプランを選択してください。
            </p>
          </FadeIn>
          
          <div className={styles.causesGrid}>
            <FadeIn direction="up" delay={0.1} className={styles.causeCard}>
              <h3 className={styles.causeTitle}>シンプル洗浄（表面汚れのみ）</h3>
              <p className={styles.causeDesc}>工程: 水流洗浄 → 乾燥。所要日数: 5〜7日。<br /><strong>選択基準</strong>: 自宅保管の遺骨・表面の軽微な汚れのみ。六価クロム除去工程は含まれない。料金: 6,600円〜11,000円。</p>
            </FadeIn>
            <FadeIn direction="up" delay={0.2} className={styles.causeCard}>
              <h3 className={styles.causeTitle}>スタンダード洗浄（カビ・六価クロム対応）</h3>
              <p className={styles.causeDesc}>工程: 洗浄 → カビ除去 → 除菌・害虫除去 → 六価クロム除去 → 異物除去 → 乾燥。所要日数: 5〜7日。<br /><strong>選択基準</strong>: カビ・変色・害虫・六価クロムが懸念される場合。料金: 8,800円〜14,300円。</p>
            </FadeIn>
            <FadeIn direction="up" delay={0.3} className={styles.causeCard}>
              <h3 className={styles.causeTitle}>土泥除去・洗浄プラン</h3>
              <p className={styles.causeDesc}>工程: 土泥除去 → 洗浄 → カビ除去 → 除菌 → 六価クロム除去 → 異物除去 → 乾燥。所要日数: 7〜10日。<br /><strong>選択基準</strong>: 土泥が大量に付着している場合。料金: 18,600円〜25,300円。</p>
            </FadeIn>
          </div>

          <FadeIn direction="up" delay={0.4} className={styles.setPlanBanner}>
            <div className={styles.setPlanContent}>
              <span className={styles.setPlanLabel}>RECOMMENDED</span>
              <h3 className={styles.setPlanTitle}>カビのある状態での「粉骨」は危険です</h3>
              <p className={styles.setPlanDesc}>
                カビが付着したまま粉骨機にかけると、カビの胞子が微細なパウダー全体に混入し大繁殖の恐れがあります（健康被害のリスクも）。
                Ikotsu.comでは、衛生と安全のため<strong>「洗骨＋粉骨のセットプラン」</strong>を強く推奨しています。
              </p>
            </div>
            <div className={styles.setPlanAction}>
              <Button href="/pricing" variant="primary">セットプランの料金を見る</Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Process Gallery */}
      <section className="section" aria-label="洗骨の工程">
        <div className="container">
          <FadeIn direction="up" className={`text-center ${styles.processHeaderMargin}`}>
            <h2 className="section__title">安心の6工程｜写真付き作業報告書</h2>
            <p className="section__description">
              デリケートなご遺骨を傷つけないよう、手作業と超音波を使い分けて丁寧に洗浄します。<br />
              処理完了後は写真付きの「作業報告書」をご返送時に同封してお渡しします。
            </p>
          </FadeIn>

          <StaggerChildren className={styles.processGrid} staggerDelay={0.1}>
            {CLEANING_PROCESS_STEPS.map((step) => (
              <StaggerItem key={step.step} className={styles.processCard}>
                <div className={styles.processImageWrapper}>
                  <span className={styles.stepBadge}>STEP {step.step}</span>
                  <Image src={step.image} alt={step.title} layout="fill" objectFit="cover" className={styles.processImage} />
                </div>
                <div className={styles.processContent}>
                  <h3 className={styles.processTitle}>{step.title}</h3>
                  <p className={styles.processDesc}>{step.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--alt" aria-label="よくあるご質問">
        <div className="container container--narrow">
          <FadeIn direction="up">
            <div className="section__header">
              <span className="section__label">FAQ</span>
              <h2 className="section__title">洗骨サービスのよくある質問|六価クロム・プラン選択・法人委託</h2>
            </div>
            <Accordion items={faqsForUI} />
          </FadeIn>
        </div>
      </section>

      {/* Related Services */}
      <section className="section" aria-label="関連サービス">
        <div className="container">
          <FadeIn direction="up">
            <h2 className="section__title text-center">その他のサービス</h2>
          </FadeIn>
          <StaggerChildren className={styles.relatedGrid} staggerDelay={0.1}>
            <StaggerItem key="/services/powdered">
              <a href="/services/powdered" className={styles.relatedCard}>
                <span className={styles.relatedLabel}>Service</span>
                <p className={styles.relatedTitle}>粉骨（パウダー化）</p>
                <p className={styles.relatedPrice}>30,000円〜</p>
              </a>
            </StaggerItem>
            <StaggerItem key="/services/carrying">
              <a href="/services/carrying" className={styles.relatedCard}>
                <span className={styles.relatedLabel}>Service</span>
                <p className={styles.relatedTitle}>出張・搬送</p>
                <p className={styles.relatedPrice}>10,000円〜</p>
              </a>
            </StaggerItem>
            <StaggerItem key="/services/takeout">
              <a href="/services/takeout" className={styles.relatedCard}>
                <span className={styles.relatedLabel}>Service</span>
                <p className={styles.relatedTitle}>お引取り</p>
                <p className={styles.relatedPrice}>10,000円〜</p>
              </a>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </section>

      {/* Structured Data */}
      <JsonLd data={generateBreadcrumbSchema([
        { name: 'トップ', href: '/' },
        { name: 'サービス一覧', href: '/services' },
        { name: '洗骨サービス', href: '/services/cleaning' },
      ])} />
      <JsonLd data={generateServiceSchema({
        name: '洗骨サービスの除染工程・品質仕様と料金',
        description: 'カビ・六価クロム・土泥・異物の除去。シンプル/スタンダード/土泥除去の3プランと工程数・所要日数・料金を明示。',
        url: '/services/cleaning',
      })} />
      <JsonLd data={generateFAQSchema(rawFaqs.map(f => ({ question: f.question, answer: typeof f.answer === 'string' ? f.answer : '詳細はページ内をご覧ください。' })))} />
      <JsonLd data={generateHowToSchema({
        name: '洗骨の工程（スタンダード洗浄）',
        description: 'カビ・六価クロム・異物を除去する洗骨標準工程。5〜7日で完了。',
        totalTime: 'P7D',
        steps: [
          { name: '洗浄', text: '水流および専用洗浄液で遺骨を洗浄する。' },
          { name: 'カビ除去', text: '骨の表面・内部のカビを専用剤で除去する。' },
          { name: '除菌・害虫除去', text: '専用副剤で除菌処理を行い、害虫を除去する。' },
          { name: '六価クロム除去', text: '専用副剤で六価クロムを除去し、確認手順で完了を検証する。' },
          { name: '異物除去', text: '残存する異物を除去する。' },
          { name: '乾燥', text: '専用機器で骨の芯まで完全に乾燥させる。' },
        ],
      })} />
    </>
  );
}
