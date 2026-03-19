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
import styles from './powdered.module.css';

export const metadata: Metadata = {
  title: '粉骨サービスの工程・品質仕様と料金|遺骨.com',
  description: '遺骨の状態（スタンダード・墓から・土付き）ごとの粉骨工程・品質チェック基準・所要日数・料金を掲載。粉骨証明書・法人一括対応可。全国対応。',
  alternates: { canonical: '/services/powdered' },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: '遺骨.com｜粉骨・洗骨の専門機関',
    images: [{
      url: `/og?title=粉骨サービスの工程・品質基準・料金&label=サービス`,
      width: 1200,
      height: 630,
      alt: '粉骨サービスの工程・品質基準・料金',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`/og?title=粉骨サービスの工程・品質基準・料金&label=サービス`],
  },
};

const POWDERED_PROCESS_STEPS = [
  { step: '01', title: '状態確認・異物除去', desc: 'お預かりしたご遺骨に含まれる金属類や不純物（棺の釘など）を丁寧に手作業で取り除きます。', image: '/images/process-grinding.png' },
  { step: '02', title: '六価クロム還元処理（無料標準）', desc: '火葬時に発生する有害物質「六価クロム」を専用の還元剤で無害化処理します。自然環境やご家族の健康を守ります。', image: '/images/process-grinding.png' },
  { step: '03', title: '乾燥・UV殺菌', desc: '粉骨前に専用機器で完全に乾燥させ、UV照射による殺菌を行います。長期間カビの発生を防ぐための重要な工程です。', image: '/images/process-grinding.png' },
  { step: '04', title: '専用粉骨機でのパウダー化', desc: '遺骨専用の大型粉骨機で、散骨規格に適合する2mm以下のサラサラな細かいパウダー状に均一に粉砕します。', image: '/images/process-grinding.png' },
  { step: '05', title: '真空パック・梱包', desc: '湿度から守るため専用のアルミ袋で真空パックし、桐箱やご指定の容器に納めます。', image: '/images/process-grinding.png' },
  { step: '06', title: 'ご返送・レポート提出', desc: '処理前後の状態を写真で記録した「作業報告書」を同封し、丁寧な梱包でご自宅へ返送いたします。', image: '/images/process-grinding.png' },
];

const SUMMARY_ITEMS = [
  { label: '対象', value: '火葬後の遺骨 / 墓からの遺骨 / 土付き遺骨' },
  { label: '価格帯', value: '8,800円〜（スタンダード）/ 17,600円〜（墓から）/ 28,600円〜（土付き）' },
  { label: '標準納期', value: 'スタンダード: 当日〜60分 / 墓から: 5〜7日 / 土付き: 7〜10日' },
  { label: '依頼方法', value: '郵送 / 出張お引取り / 法人一括委託' },
  { label: '証明書', value: '粉骨証明書発行対応（有料オプション）' },
  { label: '品質確認', value: '微粒子規格・六価クロム除去・異物除去を全工程でチェック' },
];

export default async function PowderedPage() {
  let rawFaqs: Array<{ question: string; answer: string }> = [];
  try {
    const fetched = await prisma.ikotsuFaqItem.findMany({
      where: { category: 'powdered', page_slug: '/services/powdered', is_published: true },
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
    faqsForUI.push({ question: '粉骨とは何ですか？', answer: <p>遺骨を専用機器でパウダー状にする処理です。</p> });
    rawFaqs.push({ question: '粉骨とは何ですか？', answer: '遺骨を専用機器でパウダー状にする処理です。' });
  }

  return (
    <>
      <div className="container" style={{ paddingTop: 'var(--space-6)' }}>
        <Breadcrumb items={[
          { name: 'トップ', href: '/' },
          { name: 'サービス一覧', href: '/services' },
          { name: '粉骨（パウダー化）', href: '/services/powdered' },
        ]} />
      </div>

      {/* Hero */}
      <section className={styles.hero} aria-label="粉骨サービス ヒーロー領域">
        <div className="container">
          <div className={styles.heroLayout}>
            <FadeIn direction="left" className={styles.heroText}>
              <span className={styles.badge}>工程公開・品質基準を明示</span>
              <h1 className={styles.heroTitle}>粉骨サービスの<br/><span className={styles.heroTitleSub}>工程・品質仕様と料金</span></h1>
              <p className={styles.heroLead}>
                遺骨の状態（スタンダード / 墓から / 土付き）ごとに<br />
                工程・所要日数・料金が異なります。<br />
                全工程を写真と仕様書で公開し、品質基準を明示します。
              </p>
              <SummaryBlock items={SUMMARY_ITEMS} />
              <div className={styles.heroActions}>
                <Button href="/contact" variant="primary" size="lg">無料相談・お見積り</Button>
                <Button href="/pricing" variant="secondary" size="lg">料金詳細を見る</Button>
              </div>
            </FadeIn>
            <FadeIn direction="right" className={styles.heroImageWrap}>
              <Image 
                src="/images/process-grinding.png" 
                alt="粉骨専用設備" 
                layout="fill"
                objectFit="cover"
                className={styles.heroImage}
                priority
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features & Granularity */}
      <section className="section section--alt" aria-label="粉骨の特徴">
        <div className="container">
          <FadeIn direction="up" className="text-center">
            <h2 className="section__title">粉骨工程の種類と選択基準</h2>
            <p className="section__description">
              遺骨の状態によって必要な工程数・所要日数・料金が異なります。依頼前に状態を確認して最適なプランを選択してください。
            </p>
          </FadeIn>
          
          <StaggerChildren className={styles.featuresGrid} staggerDelay={0.1}>
            <StaggerItem className={styles.featureCard}>
              <div className={styles.featureIcon}>1</div>
              <h3 className={styles.featureTitle}>スタンダード（火葬後の遺骨）</h3>
              <p className={styles.featureDesc}>
                工程: 火葬ゴミ除去 → 粉骨 → 微粒子チェック → 梱包。所要時間: 40〜60分。<br />
                自宅保管の遺骨・火葬直後の遺骨が対象。料金: 8,800円〜13,200円（サイズ別）。
              </p>
            </StaggerItem>
            <StaggerItem className={styles.featureCard}>
              <div className={styles.featureIcon}>2</div>
              <h3 className={styles.featureTitle}>墓からの遺骨プラン（洗浄+粉骨）</h3>
              <p className={styles.featureDesc}>
                工程: 洗浄 → 除菌 → 六価クロム除去 → 乾燥 → 粉骨。所要日数: 5〜7日。<br />
                六価クロム除去が標準工程に含まれる。料金: 17,600円〜22,000円（サイズ別）。
              </p>
            </StaggerItem>
            <StaggerItem className={styles.featureCard}>
              <div className={styles.featureIcon}>3</div>
              <h3 className={styles.featureTitle}>土付き遺骨プラン</h3>
              <p className={styles.featureDesc}>
                工程: 土泥除去 → 洗浄 → 除菌 → 六価クロム除去 → 乾燥 → 小石除去 → 粉骨。所要日数: 7〜10日。<br />
                料金: 28,600円〜33,000円（サイズ別）。
              </p>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </section>

      {/* Process Timeline Gallery */}
      <section className="section" aria-label="粉骨の工程">
        <div className="container">
          <FadeIn direction="up" className={`text-center ${styles.processHeaderMargin}`}>
            <h2 className="section__title">品質チェック基準</h2>
            <p className="section__description">
              全工程にチェックポイントを設定し、工程ごとの確認結果を記録しています。<br />
              処理完了後は写真付きの「作業報告書」または「粉骨証明書」を同封します。
            </p>
          </FadeIn>

          <StaggerChildren className={styles.processGrid} staggerDelay={0.1}>
            {POWDERED_PROCESS_STEPS.map((step) => (
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

      {/* Work Report Preview */}
      <section className="section" aria-label="作業報告書">
        <div className="container">
          <div className={styles.reportLayout}>
            <FadeIn direction="right" className={styles.reportImageWrap}>
              <Image
                src="/images/work-report-mockup.png"
                alt="粉骨完了後に届く作業報告書の見本"
                width={480}
                height={640}
                className={styles.reportImage}
              />
            </FadeIn>
            <FadeIn direction="left" className={styles.reportText}>
              <span className="section__label">Report</span>
              <h2 className={styles.reportTitle}>処理完了後に<br />「作業報告書」をお届けします</h2>
              <p className={styles.reportLead}>
                粉骨が完了したご遺骨をご返送する際、必ず<strong>写真付きの作業報告書</strong>を同封しています。
              </p>
              <ul className={styles.reportPoints}>
                <li>
                  <span className={styles.rPointIcon}>📷</span>
                  <span><strong>処理前・処理後の写真</strong>を両方掲載</span>
                </li>
                <li>
                  <span className={styles.rPointIcon}>✓</span>
                  <span>担当者名・作業完了日・管理番号を明記</span>
                </li>
                <li>
                  <span className={styles.rPointIcon}>✓</span>
                  <span>六価クロム還元処理・UV殺菌の実施確認欄</span>
                </li>
                <li>
                  <span className={styles.rPointIcon}>✓</span>
                  <span>A4判・郵送封筒に同封して返送</span>
                </li>
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>
      {/* Witnessing Service */}
      <section className="section section--alt" aria-label="立会サービス">
        <div className="container">
          <div className={styles.witnessingLayout}>
            <FadeIn direction="left" className={styles.witnessingText}>
              <span className="section__label">Witnessing</span>
              <h2 className={styles.witnessingTitle}>粉骨の立会サービス</h2>
              <p className={styles.witnessingLead}>
                粉骨処理は、ご希望の方に限り<strong>ご立会（見学）いただけます</strong>。
                処理の様子を直接ご確認いただくことで、安心してお任せいただける環境を整えています。
              </p>
              <ul className={styles.witnessingPoints}>
                <li>
                  <span className={styles.pointIcon}>✓</span>
                  <span>粉骨専用機器による処理の様子をご覧いただけます</span>
                </li>
                <li>
                  <span className={styles.pointIcon}>✓</span>
                  <span>完全に1件ずつ個別処理。混在は一切ありません</span>
                </li>
                <li>
                  <span className={styles.pointIcon}>✓</span>
                  <span>事前予約制・完全個室での対応</span>
                </li>
                <li>
                  <span className={styles.pointIcon}>⚠</span>
                  <span>作業場所・施設内部の写真撮影はご遠慮いただいています</span>
                </li>
              </ul>
              <div className={styles.witnessingMeta}>
                <div className={styles.witnessingMetaItem}>
                  <span className={styles.metaLabel}>立会費用</span>
                  <span className={styles.metaValue}>粉骨料金に含む（追加費用なし）</span>
                </div>
                <div className={styles.witnessingMetaItem}>
                  <span className={styles.metaLabel}>所要時間</span>
                  <span className={styles.metaValue}>40〜60分程度</span>
                </div>
                <div className={styles.witnessingMetaItem}>
                  <span className={styles.metaLabel}>対象</span>
                  <span className={styles.metaValue}>直接持込みのご依頼のみ（郵送・出張は対象外）</span>
                </div>
              </div>
              <Button href="/contact" variant="primary">立会を希望してお問い合わせ</Button>
            </FadeIn>
            <FadeIn direction="right" className={styles.witnessingImageWrap}>
              <Image
                src="/images/witnessing-room.png"
                alt="立会（見学）スペース - 清潔な個室環境"
                width={560}
                height={420}
                className={styles.witnessingImage}
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--alt" aria-label="よくあるご質問">
        <div className="container container--narrow">
          <FadeIn direction="up">
            <div className="section__header">
              <span className="section__label">FAQ</span>
              <h2 className="section__title">粉骨サービスのよくある質問|工程・品質・法人委託</h2>
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
            <StaggerItem key="/services/cleaning">
              <a href="/services/cleaning" className={styles.relatedCard}>
                <span className={styles.relatedLabel}>Service</span>
                <p className={styles.relatedTitle}>洗骨（専用洗浄）</p>
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
        { name: '粉骨サービス', href: '/services/powdered' },
      ])} />
      <JsonLd data={generateServiceSchema({
        name: '粉骨サービスの工程・品質仕様と料金',
        description: '遺骨の状態（スタンダード・墓から・土付き）ごとの工程・品質チェック基準・所要日数・料金を明示。粉骨証明書・法人一括対応可。',
        url: '/services/powdered',
      })} />
      <JsonLd data={generateFAQSchema(rawFaqs.map(f => ({ question: f.question, answer: typeof f.answer === 'string' ? f.answer : '詳細はページ内をご覧ください。' })))} />
      <JsonLd data={generateHowToSchema({
        name: '粉骨の工程（スタンダードプラン）',
        description: '火葬後の遺骨を対象とした粉骨工程。40〜60分で完了。',
        totalTime: 'PT1H',
        steps: [
          { name: '受領・検品', text: '受領した遺骨の状態を確認し、管理番号を付与する。' },
          { name: '火葬ゴミの除去', text: '金属類・不純物を手作業で除去する。' },
          { name: '粉骨', text: '専用粉骨機で2mm以下のパウダー状に処理する。' },
          { name: '微粒子チェック', text: '粒度・異物・六価クロム除去を確認する。' },
          { name: '梱包・証明書同封', text: '保存袋に収め、証明書を同封して返送準備を行う。' },
        ],
      })} />
    </>
  );
}
