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
import styles from './takeout.module.css';

export const metadata: Metadata = {
  title: '郵送お引取りの梱包仕様・送料根拠・受付条件|遺骨.com',
  description:
    '全国対応の遺骨郵送引取りサービス。専用強化段ボール・日本郵便ゆうパック着払い・写真付き梱包マニュアル付き。梱包仕様・送料の根拠・法的根拠（日本郵便対応）を明示。',
  alternates: { canonical: '/services/takeout' },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: '遺骨.com｜粉骨・洗骨の専門機関',
    images: [{
      url: `/og?title=郵送お引取りの梱包仕様・送料根拠・受付条件&label=サービス`,
      width: 1200,
      height: 630,
      alt: '郵送お引取りの梱包仕様・送料根拠・受付条件',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`/og?title=郵送お引取りの梱包仕様・送料根拠・受付条件&label=サービス`],
  },
};

const TAKEOUT_STEPS = [
  { num: '01', title: 'お申込み・梱包キット受取', desc: 'Web申込み後、数日以内に「専用梱包キット」と「着払い伝票」「梱包手順書」をご自宅へ無料でお届けします。' },
  { num: '02', title: 'ご自身で安全に梱包', desc: 'わかりやすい手順書に沿って、お骨壺をクッション材で包み、専用段ボールにしっかりと封入してください。' },
  { num: '03', title: '郵便局へ集荷依頼・発送', desc: '日本郵便（ゆうパック）の集荷サービスを利用すれば、ご自宅から一歩も出ずに着払いで安全に発送できます。' },
  { num: '04', title: '到着確認・処理のご報告', desc: 'Ikotsu.comのラボに到着後、破損等の有無を確認してすぐにご連絡。そのまま粉骨等のご依頼処理を開始します。' },
];

const SUMMARY_ITEMS = [
  { label: '梱包仕様', value: '専用強化段ボール + 気泡緩衝材 + クッションペーパー + 着払い伝票（印字済み）' },
  { label: '配送方法', value: '日本郵便 ゆうパック（遺骨を送れる唯一の宅配業者）' },
  { label: '往路送料', value: '着払い（お客様負担なし）' },
  { label: '復路送料', value: '実費（地域別・基本料金に含まれない）' },
  { label: '対応エリア', value: '全国47都道府県' },
  { label: '依頼方法', value: 'Webフォーム申込み後、梱包キットを発送' },
];

export default async function TakeoutPage() {
  let rawFaqs: Array<{ question: string; answer: string }> = [];
  try {
    const fetched = await prisma.ikotsuFaqItem.findMany({
      where: { category: 'takeout', page_slug: '/services/takeout', is_published: true },
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
    faqsForUI.push({ question: '遺骨を郵送できる法的根拠は何ですか？', answer: <p>日本郵便（ゆうパック）のみが対応しています。</p> });
    rawFaqs.push({ question: '遺骨を郵送できる法的根拠は何ですか？', answer: '日本郵便（ゆうパック）のみが対応しています。' });
  }

  return (
    <>
      <div className="container" style={{ paddingTop: 'var(--space-6)' }}>
        <Breadcrumb items={[
          { name: 'トップ', href: '/' },
          { name: 'サービス一覧', href: '/services' },
          { name: 'お引取り（ご郵送）', href: '/services/takeout' },
        ]} />
      </div>

      {/* Hero */}
      <section className={styles.hero} aria-label="お引取り（ご郵送）サービス ヒーロー領域">
        <div className="container">
          <div className={styles.heroLayout}>
            <FadeIn direction="left" className={styles.heroText}>
              <span className={styles.badge}>日本郵便ゆうパック着払い・専用強化段ボール付き</span>
              <h1 className={styles.heroTitle}>郵送お引取りの<br/><span className={styles.heroTitleSub}>梱包仕様・送料根拠・受付条件</span></h1>
              <p className={styles.heroLead}>
                全国どこからでも着払いで送るだけ。<br />
                日本郵便（ゆうパック）の公式ルールに準拠し、<br />梱包仕様・法的根拠・送料の根拠を明示します。
              </p>
              <SummaryBlock items={SUMMARY_ITEMS} />
              <div className={styles.heroActions}>
                <Button href="/contact" variant="primary" size="lg">梱包キットを無料で申し込む</Button>
              </div>
            </FadeIn>
            <FadeIn direction="right" className={styles.heroImageWrap}>
              <Image 
                src="/images/hero-facility.png" 
                alt="専用梱包キットと発送のイメージ" 
                layout="fill"
                objectFit="cover"
                className={styles.heroImage}
                priority
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Kit Features */}
      <section className="section section--alt" aria-label="専用梱包キットの特徴">
        <div className="container">
          <FadeIn direction="up">
            <h2 className={styles.sectionTitleCenter}>梱包仕様の詳細</h2>
            <p className={styles.sectionDescCenter}>
              ご遺骨を安全に輸送するには、骨壺サイズに合った頑丈な段ボールと十分な緩衝材が不可欠です。専用梱包キットに同梱されているもの全てをご案内します。
            </p>
          </FadeIn>
          
          <div className={styles.kitGrid}>
            <FadeIn direction="up" delay={0.1} className={styles.kitCard}>
              <h3 className={styles.kitTitle}>📦 専用強化段ボール</h3>
              <p className={styles.kitDesc}>骨壺サイズ（3〜8号）に対応した専用段ボール。輸送中の衝撃に耐える強度設計。お客様がホームセンターで購入する必要はありません。</p>
            </FadeIn>
            <FadeIn direction="up" delay={0.2} className={styles.kitCard}>
              <h3 className={styles.kitTitle}>📋 印字済み着払い伝票</h3>
              <p className={styles.kitDesc}>ラボの住所・お客様情報が印字済みの「ゆうパック着払い伝票」が入っています。箱に貼るだけで準備完了。往路送料はお客様負担なし。</p>
            </FadeIn>
            <FadeIn direction="up" delay={0.3} className={styles.kitCard}>
              <h3 className={styles.kitTitle}>📖 写真付き梱包マニュアル</h3>
              <p className={styles.kitDesc}>初めての方でも失敗しない写真付き手順書を同封。水漏れ対策（吸水シート・密封袋の使い方）の指示書も含まれます。</p>
            </FadeIn>
          </div>

          <FadeIn direction="up" delay={0.4} className={styles.kitBanner}>
            <div className={styles.kitBannerContent}>
              <span className={styles.kitBannerLabel}>自宅から一歩も出ずに発送</span>
              <h3 className={styles.kitBannerTitle}>郵便局の「集荷サービス」をご利用ください</h3>
              <p className={styles.kitBannerDesc}>
                重いお遺骨を抱えて郵便局やコンビニまで歩く必要はありません。
                日本郵便（ゆうパック）の無料集荷ダイヤルにお電話いただくだけで、配達員がご自宅の玄関まで集荷に伺います。
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Flow Steps */}
      <section className="section" aria-label="お引取りの流れ">
        <div className="container">
          <FadeIn direction="up" className={`text-center ${styles.processHeaderMargin}`}>
            <span className="section__label">Process</span>
            <h2 className="section__title">ご郵送（お引取り）の流れ</h2>
          </FadeIn>
          <StaggerChildren className={styles.stepsGrid} staggerDelay={0.1}>
            {TAKEOUT_STEPS.map((step) => (
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
      <section className="section section--alt" aria-label="よくあるご質問">
        <div className="container container--narrow">
          <FadeIn direction="up">
            <div className="section__header">
              <span className="section__label">FAQ</span>
              <h2 className="section__title">郵送お引取りのよくある質問|法的根拠・梱包仕様・送料・水漏れ</h2>
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
                <p className={styles.relatedTitle}>出張・搬送（お迎え）</p>
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
        { name: 'お引取り（ご郵送）', href: '/services/takeout' },
      ])} />
      <JsonLd data={generateServiceSchema({
        name: '郵送お引取りの梱包仕様・送料根拠・受付条件',
        description: '全国対応の遺骨郵送引取り。日本郵便ゆうパック着払い・専用強化段ボール付き。梱包仕様・法的根拠・送料根拠を明示。',
        url: '/services/takeout',
      })} />
      <JsonLd data={generateFAQSchema(rawFaqs.map(f => ({ question: f.question, answer: typeof f.answer === 'string' ? f.answer : '詳細はページ内をご覧ください。' })))} />
      <JsonLd data={generateHowToSchema({
        name: '郵送お引取りの流れ',
        description: '専用梱包キットを使って自宅から安全に遺骨を発送するフロー。',
        steps: [
          { name: '申込み・梱包キット受取', text: 'Web申込み後、専用梱包キット（段ボール・緩衝材・着払い伝票）が届く。' },
          { name: '梱包', text: '写真付きマニュアルに沿って骨壺をクッション材で包み、段ボールに封入する。' },
          { name: '郵便局へ集荷依頼・発送', text: 'ゆうパック集荷サービスで自宅から着払いで発送する。' },
          { name: '到着確認・処理開始', text: 'ラボ到着後に確認を報告し、粉骨・洗骨処理へ移行する。' },
        ],
      })} />
    </>
  );
}
