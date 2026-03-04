import type { Metadata } from 'next';
import FadeIn from '@/components/motion/FadeIn';
import StaggerChildren, { StaggerItem } from '@/components/motion/StaggerChildren';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Accordion from '@/components/ui/Accordion';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { JsonLd, generateBreadcrumbSchema, generateServiceSchema } from '@/lib/schema/jsonld';
import styles from './cleaning.module.css';

export const metadata: Metadata = {
  title: '洗骨（専用洗浄）サービス｜カビや汚れの専門処理｜Ikotsu.com',
  description: 'カビ・汚れ・変色した遺骨を専用洗浄液で丁寧に洗い流す「洗骨」サービス。長期保管や湿気による劣化に対応し、完全乾燥とUV殺菌で清潔な状態に復元します。全国対応・30,000円〜。粉骨とのセット依頼も可能。',
  alternates: { canonical: '/services/cleaning' },
};

const CLEANING_PROCESS_STEPS = [
  { step: '01', title: '状態の精密確認', desc: 'カビの種類や汚損の程度、ご遺骨の脆さ（もろさ）を確認し、最適な洗浄液の配合を決定します。', image: '/images/process-washing.png' },
  { step: '02', title: '予備洗浄・ブラッシング', desc: '付着した大きな汚れや土などを、ハケや専用ブラシを用いて手作業で丁寧に落とします。', image: '/images/process-washing.png' },
  { step: '03', title: '専用液による超音波洗浄', desc: '専用の洗浄液に浸し、超音波洗浄機で骨の内部に根を張ったカビや長年の汚れを浮き上がらせて除去します。', image: '/images/process-washing.png' },
  { step: '04', title: 'すすぎ・中和処理', desc: 'きれいな純水で何度もすすぎを行い、洗浄液を完全に落としきります。', image: '/images/process-washing.png' },
  { step: '05', title: '完全乾燥・UV殺菌', desc: 'カビの再発を防ぐため、専用乾燥機で数日かけて骨の芯まで完全に水分を飛ばし、強力なUVランプで殺菌します。', image: '/images/process-washing.png' },
  { step: '06', title: 'ご返送（または粉骨へ）', desc: '清潔な状態に復元したご遺骨を真空パックでお返しするか、そのまま粉骨処理（セットプラン）へ移行します。', image: '/images/process-washing.png' },
];

const FAQS = [
  { question: '洗骨とは何ですか？', answer: <p>洗骨とは、お墓やご自宅で長期間保管されていたご遺骨に付着した「カビ」「泥・土汚れ」「変色」などを専用の洗浄液と超音波で丁寧に除去し、清潔な状態に戻す処理のことです。</p> },
  { question: 'なぜカビが生えるのですか？', answer: <p>ご遺骨は多孔質（小さな穴が無数にある構造）のため、空気中の水分を非常に吸い込みやすい性質があります。特に密閉性の高い現代の住宅や、温度差の激しいお墓のカロート（納骨室）内では結露が発生しやすく、骨壺内部の高湿度がカビの温床となります。</p> },
  { question: '洗骨の費用はいくらですか？', answer: <p>基本の洗骨処理は30,000円〜（税込）となります。泥汚れが極めて激しい場合などを除き、原則としてお見積り後の追加料金は発生しません。粉骨と同時にご依頼いただく「洗骨＋粉骨プラン（60,000円〜）」が一番人気です。</p> },
  { question: 'どんな状態でも洗骨できますか？', answer: <p>多くの場合は対応可能ですが、経年劣化によりご遺骨が「触るだけで崩れてしまう泥状」になっている場合は、洗浄によってお骨そのものが溶けて消失してしまうリスクがあるため、そのまま乾燥・殺菌のみをご提案することがあります。</p> },
  { question: '洗骨にかかる期間はどのくらいですか？', answer: <p>カビや汚れの除去作業に加え、その後の「完全乾燥」に最も時間を用います。骨の内部までしっかり乾燥させないと再びカビが発生するため、お預かりからご返送まで通常「5〜7営業日」の期間をいただいております。</p> },
];

const RELATED = [
  { href: '/services/powdered', title: '粉骨（パウダー化）', price: '30,000円〜', label: 'Service' },
  { href: '/services/carrying', title: '出張・搬送', price: '10,000円〜', label: 'Service' },
  { href: '/services/takeout', title: 'お引取り', price: '10,000円〜', label: 'Service' },
];

export default function CleaningPage() {
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
              <span className={styles.badge}>長期保管・お墓からの取り出しに</span>
              <h1 className={styles.heroTitle}>洗骨<br/><span className={styles.heroTitleSub}>（専用洗浄）</span></h1>
              <p className={styles.heroLead}>
                カビ・汚れ・変色を除去し、清潔な状態に。<br />
                長年の汚れを超音波洗浄で落とし、<br />
                完全乾燥と殺菌で衛生的に復元します。
              </p>
              <div className={styles.heroSummary}>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>料金目安</span>
                  <span className={styles.summaryValue}><span className={styles.priceHighlight}>30,000</span>円〜</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>所要日数</span>
                  <span className={styles.summaryValue}>約5〜7営業日</span>
                </div>
              </div>
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

      {/* Mold Causes & Suggestion */}
      <section className="section section--alt" aria-label="遺骨のカビの原因と対策">
        <div className="container">
          <FadeIn direction="up" className="text-center">
            <h2 className="section__title">遺骨にカビが生える原因</h2>
            <p className="section__description">
              「骨壺を開けたら緑や黒のカビが生えていた」というご相談が急増しています。
            </p>
          </FadeIn>
          
          <div className={styles.causesGrid}>
            <FadeIn direction="up" delay={0.1} className={styles.causeCard}>
              <h3 className={styles.causeTitle}>原因1：骨壺内の「結露」</h3>
              <p className={styles.causeDesc}>お墓の内部（カロート）は温度変化が激しく、外気との差で骨壺内に結露が発生。底に水が溜まり、カビの手助けとなります。</p>
            </FadeIn>
            <FadeIn direction="up" delay={0.2} className={styles.causeCard}>
              <h3 className={styles.causeTitle}>原因2：吸水しやすい「多孔質」</h3>
              <p className={styles.causeDesc}>ご遺骨は小さな無数の穴が空いている「多孔質」です。周囲の湿気をスポンジのように吸い込んでしまい、表面だけでなく内部まで浸透します。</p>
            </FadeIn>
            <FadeIn direction="up" delay={0.3} className={styles.causeCard}>
              <h3 className={styles.causeTitle}>原因3：住宅の「高気密化」</h3>
              <p className={styles.causeDesc}>近年増えている自宅での手元供養でも、現代の高気密な住宅環境とエアコンによる温度差が、骨壺内に予期せぬ湿気をもたらします。</p>
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
            <h2 className="section__title">完全公開・安心の6工程</h2>
            <p className="section__description">
              デリケートなご遺骨を傷つけないよう、手作業と超音波を使い分けて丁寧に洗浄します。
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
              <h2 className="section__title">洗骨に関するよくあるご質問</h2>
            </div>
            <Accordion items={FAQS} />
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
        { name: '洗骨（専用洗浄）', href: '/services/cleaning' },
      ])} />
      <JsonLd data={generateServiceSchema({
        name: '洗骨（専用洗浄）サービス',
        description: 'カビ・汚れ・変色した遺骨を専門洗浄液と超音波で丁寧に洗い流すサービス。長期保管や湿気による劣化に対応し、完全乾燥とUV殺菌で清潔な状態に復元します。',
        url: 'https://ikotsu.example.com/services/cleaning',
      })} />
    </>
  );
}
