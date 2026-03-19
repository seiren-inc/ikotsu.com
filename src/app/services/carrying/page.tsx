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
import styles from './carrying.module.css';

export const metadata: Metadata = {
  title: '出張・搬送サービスの料金算出基準と対応条件|遺骨.com',
  description:
    '遺骨の出張引取り・搬送サービス。自社拠点（戸塚 IC 付近）からの距離・道路料・実走時間で料金を算出。複数体対応・法人専任車両対応。関東近郊10,000円〜。',
  alternates: { canonical: '/services/carrying' },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: '遺骨.com｜粉骨・洗骨の専門機関',
    images: [{
      url: `/og?title=出張・搬送サービスの料金算出基準と対応条件&label=サービス`,
      width: 1200,
      height: 630,
      alt: '出張・搬送サービスの料金算出基準と対応条件',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`/og?title=出張・搬送サービスの料金算出基準と対応条件&label=サービス`],
  },
};

const CARRYING_STEPS = [
  { num: '01', title: 'ご相談・エリア確認', desc: 'お迎え先の住所をお伺いし、料金のお見積りと訪問可能な日時を調整します。' },
  { num: '02', title: 'スタッフ訪問・梱包', desc: 'お約束の日時に担当スタッフがご自宅等に直接伺い、専用のクッション材を用いて安全にお遺骨を梱包します。' },
  { num: '03', title: '専用車両にて自社搬送', desc: '振動を最小限に抑えるため、専用車両にて自社施設（ラボ）まで大切に搬送いたします。' },
  { num: '04', title: '到着報告・処理開始', desc: '施設に安全に到着した事をご報告し、そのまま粉骨や洗骨といったご依頼の処理へ移行します。' },
];

const SUMMARY_ITEMS = [
  { label: '料金算出基準', value: '自社拠点（戸塚 IC 付近）からの距離・実走時間・道路料で算出' },
  { label: '対応エリア', value: '全国47都道府県（一部離島・山間部は要相談）' },
  { label: '料金目安', value: '関東: 10,000円〜 / 関東甲信越・東海: 15,000円〜 / 関西・北陸: 30,000円〜' },
  { label: '複数体対応', value: '車両積載限度内は追加料金なし（超大量は別途見積）' },
  { label: '依頼方法', value: '個人 / 法人・寺院・霊園一括対応' },
];

export default async function CarryingPage() {
  let rawFaqs: Array<{ question: string; answer: string }> = [];
  try {
    const fetched = await prisma.ikotsuFaqItem.findMany({
      where: { category: 'carrying', page_slug: '/services/carrying', is_published: true },
      select: { question: true, answer: true },
      orderBy: { sort_order: 'asc' }
    });
    if (fetched && fetched.length > 0) {
      rawFaqs = fetched;
    }
  } catch (err) {
    // 開発環境や未反映時のフォールバック用に握りつぶす
  }
  const faqsForUI = rawFaqs.map(f => ({
    question: f.question,
    answer: <p>{f.answer}</p>
  }));
  
  if (faqsForUI.length === 0) {
    faqsForUI.push({ question: '料金は何を基準に算出されますか？', answer: <p>戸塚 ICからお迎え先までの距離・実走時間・利用路線の道路料をもとに算出します。</p> });
    rawFaqs.push({ question: '料金は何を基準に算出されますか？', answer: '戸塚 ICからお迎え先までの距離・実走時間・利用路線の道路料をもとに算出します。' });
  }

  return (
    <>
      <div className="container" style={{ paddingTop: 'var(--space-6)' }}>
        <Breadcrumb items={[
          { name: 'トップ', href: '/' },
          { name: 'サービス一覧', href: '/services' },
          { name: '出張・搬送', href: '/services/carrying' },
        ]} />
      </div>

      {/* Hero */}
      <section className={styles.hero} aria-label="出張搬送サービス ヒーロー領域">
        <div className="container">
          <div className={styles.heroLayout}>
            <FadeIn direction="left" className={styles.heroText}>
              <span className={styles.badge}>距離・道路料・実走時間で料金を算出</span>
              <h1 className={styles.heroTitle}>出張・搬送サービスの<br/><span className={styles.heroTitleSub}>料金算出基準・対応条件</span></h1>
              <p className={styles.heroLead}>
                自社拠点（戸塚 IC 付近）からの距離と道路料金をもとに<br />
                お見積りを事前発行します。<br />
                複数体対応・法人専任車両対応。
              </p>
              <SummaryBlock items={SUMMARY_ITEMS} />
              <div className={styles.heroActions}>
                <Button href="/contact" variant="primary" size="lg">出張の無料お見積り</Button>
              </div>
            </FadeIn>
            <FadeIn direction="right" className={styles.heroImageWrap}>
              <Image 
                src="/images/hero-facility.png" 
                alt="専用車両による搬送" 
                layout="fill"
                objectFit="cover"
                className={styles.heroImage}
                priority
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Target Audience / Issues */}
      <section className="section section--alt" aria-label="こんなお悩みに">
        <div className="container">
          <FadeIn direction="up" className="text-center">
            <h2 className="section__title">こんな状況でご活用いただいています</h2>
          </FadeIn>
          <div className={styles.issuesGrid}>
            <FadeIn direction="up" delay={0.1} className={styles.issueCard}>
              <div className={styles.issueIcon}>🚗</div>
              <h3 className={styles.issueTitle}>車がない・運転できない</h3>
              <p className={styles.issueDesc}>ご高齢で運転免許を返納された方や、お車をお持ちでない方でもご自宅で待つだけで安全にお預けいただけます。</p>
            </FadeIn>
            <FadeIn direction="up" delay={0.2} className={styles.issueCard}>
              <div className={styles.issueIcon}>🏺</div>
              <h3 className={styles.issueTitle}>複数体あり持ち運べない</h3>
              <p className={styles.issueDesc}>墓じまいなどで取り出した複数の骨壺はかなりの重量になります。一度にまとめて引き取り搬送が可能です。</p>
            </FadeIn>
            <FadeIn direction="up" delay={0.3} className={styles.issueCard}>
              <div className={styles.issueIcon}>📦</div>
              <h3 className={styles.issueTitle}>自分で梱包するのが不安</h3>
              <p className={styles.issueDesc}>お遺骨を宅配便（ゆうパック）に委ねることに心理的抵抗がある方や、ご自身での梱包作業に不安がある方にお選びいただいています。</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Area Map / Pricing UI */}
      <section className="section" aria-label="エリア別料金マップ">
        <div className="container">
          <FadeIn direction="up">
            <h2 className={styles.sectionTitleCenter}>エリア別 お見積り目安</h2>
            <p className={styles.sectionDescCenter}>
              Ikotsu.comのラボ（関東圏）からの距離に応じて算出します。正確な料金は事前の無料見積りにて一円単位で確定し、当日の追加請求などは一切ございません。
            </p>
          </FadeIn>

          <div className={styles.pricingTableWrap}>
            <table className={styles.pricingTable}>
              <thead>
                <tr>
                  <th>対象エリア</th>
                  <th>出張・搬送料金（片道目安）</th>
                  <th>備考</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.tdArea}>関東（東京・埼玉・千葉・神奈川）</td>
                  <td className={styles.tdPrice}>10,000円 〜 15,000円</td>
                  <td className={styles.tdNote}>迅速な日程調整が可能です。</td>
                </tr>
                <tr>
                  <td className={styles.tdArea}>関東甲信越・南東北・東海</td>
                  <td className={styles.tdPrice}>15,000円 〜 30,000円</td>
                  <td className={styles.tdNote}></td>
                </tr>
                <tr>
                  <td className={styles.tdArea}>関西・北陸</td>
                  <td className={styles.tdPrice}>30,000円 〜 50,000円</td>
                  <td className={styles.tdNote}></td>
                </tr>
                <tr>
                  <td className={styles.tdArea}>北海道・中国・四国・九州・沖縄</td>
                  <td className={styles.tdPrice}>個別お見積り</td>
                  <td className={styles.tdNote}>交通費実費等を加算、または郵送お引取りをご提案</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={styles.tableCaption}>※高速道路料金および各種パーキング料金は上記に含まれます。<br/>※粉骨や洗骨といった実作業にかかる料金は別途となります。</p>
        </div>
      </section>

      {/* Flow Steps */}
      <section className="section section--alt" aria-label="出張引取りの流れ">
        <div className="container">
          <FadeIn direction="up" className={`text-center ${styles.processHeaderMargin}`}>
            <span className="section__label">Process</span>
            <h2 className="section__title">ご依頼の流れ</h2>
          </FadeIn>
          <StaggerChildren className={styles.stepsGrid} staggerDelay={0.1}>
            {CARRYING_STEPS.map((step) => (
              <StaggerItem key={step.num} className={styles.stepCard}>
                <span className={styles.stepNumber}>{step.num}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" aria-label="よくあるご質問">
        <div className="container container--narrow">
          <FadeIn direction="up">
            <div className="section__header">
              <span className="section__label">FAQ</span>
              <h2 className="section__title">出張・搬送のよくある質問|料金計算・複数体・法人対応</h2>
            </div>
            <Accordion items={faqsForUI} />
          </FadeIn>
        </div>
      </section>

      {/* Related Services */}
      <section className="section section--alt" aria-label="関連サービス">
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
            <StaggerItem key="/services/cleaning">
              <a href="/services/cleaning" className={styles.relatedCard}>
                <span className={styles.relatedLabel}>Service</span>
                <p className={styles.relatedTitle}>洗骨（専用洗浄）</p>
                <p className={styles.relatedPrice}>30,000円〜</p>
              </a>
            </StaggerItem>
            <StaggerItem key="/services/takeout">
              <a href="/services/takeout" className={styles.relatedCard}>
                <span className={styles.relatedLabel}>Service</span>
                <p className={styles.relatedTitle}>お引取り（郵送）</p>
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
        { name: '出張・搬送', href: '/services/carrying' },
      ])} />
      <JsonLd data={generateServiceSchema({
        name: '出張・搬送サービスの料金算出基準と対応条件',
        description: '戸塚ICからの距離・道路料・実走時間で料金を算出。複数体対応・法人専任車両対応。関東近郊10,000円〜。',
        url: '/services/carrying',
      })} />
      <JsonLd data={generateFAQSchema(rawFaqs.map(f => ({ question: f.question, answer: typeof f.answer === 'string' ? f.answer : '詳細はページ内をご覧ください。' })))} />
      <JsonLd data={generateHowToSchema({
        name: '出張引取りの流れ',
        description: '専任スタッフが直接訪問し、骨壺を安全に搬送するフロー。',
        steps: [
          { name: '相談・エリア確認', text: 'お迎え先の住所と希望日時を確認し、無料見積りを発行する。' },
          { name: 'スタッフ訪問・梱包', text: '専任スタッフが訪問し、専用クッション材で安全に梱包する。' },
          { name: '専用車両で搬送', text: '振動を最小限に抑えた専用車両で自社施設へ搬送する。' },
          { name: '到着報告・処理開始', text: '到着を報告し、粉骨・洗骨処理へ移行する。' },
        ],
      })} />
    </>
  );
}
