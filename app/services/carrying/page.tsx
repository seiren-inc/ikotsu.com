import type { Metadata } from 'next';
import FadeIn from '@/components/motion/FadeIn';
import StaggerChildren, { StaggerItem } from '@/components/motion/StaggerChildren';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Accordion from '@/components/ui/Accordion';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { JsonLd, generateBreadcrumbSchema, generateServiceSchema } from '@/lib/schema/jsonld';
import styles from './carrying.module.css';

export const metadata: Metadata = {
  title: 'ご遺骨の出張・搬送サービス｜全国対応｜Ikotsu.com',
  description: '重くて運びづらいご遺骨を、専任スタッフが直接お迎えにあがり、大切に自社施設まで搬送するサービスです。ご高齢の方や遠方にお住まいの方、お車がない方でも安心してご利用いただけます。全国47都道府県対応、10,000円〜。',
  alternates: { canonical: '/services/carrying' },
};

const CARRYING_STEPS = [
  { num: '01', title: 'ご相談・エリア確認', desc: 'お迎え先の住所をお伺いし、料金のお見積りと訪問可能な日時を調整します。' },
  { num: '02', title: 'スタッフ訪問・梱包', desc: 'お約束の日時に担当スタッフがご自宅等に直接伺い、専用のクッション材を用いて安全にお遺骨を梱包します。' },
  { num: '03', title: '専用車両にて自社搬送', desc: '振動を最小限に抑えるため、専用車両にて自社施設（ラボ）まで大切に搬送いたします。' },
  { num: '04', title: '到着報告・処理開始', desc: '施設に安全に到着した事をご報告し、そのまま粉骨や洗骨といったご依頼の処理へ移行します。' },
];

const FAQS = [
  { question: '全国どこへでも来てくれますか？', answer: <p>はい、全国47都道府県どちらへでも出張引取りに伺います。ただし、一部の離島や山間部については、交通費の実費やご訪問日時の制約等により、別途ご郵送での「お引取りサービス」をご提案させていただく場合がございます。</p> },
  { question: '出張費用はどのくらいかかりますか？', answer: <p> Ikotsu.comの施設（東京・埼玉周辺）を起点とする距離に応じて算出します。首都圏エリアであれば10,000円〜、その他の地域については20,000円〜のお見積りとなることが多いです。事前に無料でお見積りを出しますのでご安心ください。</p> },
  { question: '何体くらいまで対応できますか？', answer: <p>個人のお客様の場合、1体から複数体（ご先祖様のお墓じまい等）まで柔軟に対応可能です。車両に積載できる限り追加の搬送費用はかかりません。寺院や法人様からの数十体規模の搬送につきましても実績がございます。</p> },
  { question: 'そのまま粉骨をお願いできますか？', answer: <p>もちろんです。本サービスは「持ち込みが難しい方」のためのオプションサービスですので、お預かりしたご遺骨をそのまま自社施設にて「粉骨」や「洗骨」処理することが可能です。</p> },
];

const RELATED = [
  { href: '/services/powdered', title: '粉骨（パウダー化）', price: '30,000円〜', label: 'Service' },
  { href: '/services/cleaning', title: '洗骨（専用洗浄）', price: '30,000円〜', label: 'Service' },
  { href: '/services/takeout', title: 'お引取り（郵送）', price: '10,000円〜', label: 'Service' },
];

export default function CarryingPage() {
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
              <span className={styles.badge}>訪問距離に応じた明朗会計</span>
              <h1 className={styles.heroTitle}>出張・搬送<br/><span className={styles.heroTitleSub}>（訪問引取り）</span></h1>
              <p className={styles.heroLead}>
                重くて持ち運べない、移動手段がない。<br />
                大切なご遺骨を専任スタッフが直接ご自宅へ。<br />
                安全に専用車両でお預かりにあがります。
              </p>
              <div className={styles.heroSummary}>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>基本料金（関東近郊）</span>
                  <span className={styles.summaryValue}><span className={styles.priceHighlight}>10,000</span>円〜</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>対応エリア</span>
                  <span className={styles.summaryValue}>全国47都道府県</span>
                </div>
              </div>
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
              <h2 className="section__title">出張・搬送に関するよくあるご質問</h2>
            </div>
            <Accordion items={FAQS} />
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
            {RELATED.map((r) => (
              <StaggerItem key={r.href}>
                <a href={r.href} className={styles.relatedCard}>
                  <span className={styles.relatedLabel}>{r.label}</span>
                  <p className={styles.relatedTitle}>{r.title}</p>
                  <p className={styles.relatedPrice}>{r.price}</p>
                </a>
              </StaggerItem>
            ))}
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
        name: '出張・搬送（お迎え）サービス',
        description: '重くて運びづらいご遺骨を、専任スタッフが直接ご自宅までお迎えにあがり、大切に自社施設へ搬送するサービスです。全国対応。',
        url: 'https://ikotsu.example.com/services/carrying',
      })} />
    </>
  );
}
