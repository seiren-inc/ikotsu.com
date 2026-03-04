import type { Metadata } from 'next';
import FadeIn from '@/components/motion/FadeIn';
import StaggerChildren, { StaggerItem } from '@/components/motion/StaggerChildren';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Accordion from '@/components/ui/Accordion';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { JsonLd, generateBreadcrumbSchema, generateServiceSchema } from '@/lib/schema/jsonld';
import styles from './takeout.module.css';

export const metadata: Metadata = {
  title: 'ご遺骨のお引取り（ご郵送）サービス｜全国対応｜Ikotsu Lab',
  description: '送料無料（着払い）で全国どこからでもご遺骨の「粉骨」や「洗骨」をご依頼いただけるスマートなお引取りサービス。専用の無料梱包キットをお送りするため、手ぶらで簡単・安全にお手続きが完結します。',
  alternates: { canonical: '/services/takeout' },
};

const TAKEOUT_STEPS = [
  { num: '01', title: 'お申込み・梱包キット受取', desc: 'Web申込み後、数日以内に「専用梱包キット」と「着払い伝票」「梱包手順書」をご自宅へ無料でお届けします。' },
  { num: '02', title: 'ご自身で安全に梱包', desc: 'わかりやすい手順書に沿って、お骨壺をクッション材で包み、専用段ボールにしっかりと封入してください。' },
  { num: '03', title: '郵便局へ集荷依頼・発送', desc: '日本郵便（ゆうパック）の集荷サービスを利用すれば、ご自宅から一歩も出ずに着払いで安全に発送できます。' },
  { num: '04', title: '到着確認・処理のご報告', desc: 'Ikotsu Labのラボに到着後、破損等の有無を確認してすぐにご連絡。そのまま粉骨等のご依頼処理を開始します。' },
];

const FAQS = [
  { question: '遺骨を郵送して法律上問題ありませんか？', answer: <p>はい、全く問題ありません。国内においてご遺骨を配送できるのは現在「日本郵便（ゆうパック）」のみとなっており、Ikotsu Labも日本郵便の公式ルールにしたがって安全な郵送お引取りサービスを提供しております。</p> },
  { question: '梱包キットには何が含まれていますか？', answer: <p>お骨壺や桐箱がぴったり収まり、輸送中の衝撃を吸収する「専用強化段ボール」のほか、「緩衝材（気泡緩衝材・クッションペーパー）」「ガムテープ」「記入済みの着払い伝票」「写真付き梱包マニュアル」がすべて入っています。お客様ご自身でご用意いただくものは一切ありません。</p> },
  { question: '送料はこちらで負担するのでしょうか？', answer: <p>いいえ、お客様からラボへの発送につきましては「着払い伝票」をご用意しておりますので送料は無料です。なお、処理完了後のご遺骨の「返送料」のみ、基本料金（粉骨等）とは別途で地域ごとの実費を頂戴しております。</p> },
  { question: '骨壺の中に水が溜まっているのですが…', answer: <p>お墓（カロート）に安置されていたお骨壺によく見られる現象です。郵送中に水が漏れると他の荷物を汚損する恐れがあるため、梱包キットに同封されている「吸水シート」や「密封用ビニール袋」を用いて水漏れ対策をしていただく手順をご案内しております。</p> },
];

const RELATED = [
  { href: '/services/powdered', title: '粉骨（パウダー化）', price: '30,000円〜', label: 'Service' },
  { href: '/services/cleaning', title: '洗骨（専用洗浄）', price: '30,000円〜', label: 'Service' },
  { href: '/services/carrying', title: '出張・搬送（お迎え）', price: '10,000円〜', label: 'Service' },
];

export default function TakeoutPage() {
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
              <span className={styles.badge}>完全無料の専用梱包キット付き</span>
              <h1 className={styles.heroTitle}>お引取り<br/><span className={styles.heroTitleSub}>（ご郵送による受付）</span></h1>
              <p className={styles.heroLead}>
                全国どこからでも着払いで送るだけ。<br />
                お店に足を運ぶ必要も、段ボールを探す必要もありません。<br />
                日本郵便（ゆうパック）の公式ルールに則り、<br />安全確実にラボまでお届けするスマートなご依頼方法です。
              </p>
              <div className={styles.heroSummary}>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>お引取りサービス利用料</span>
                  <span className={styles.summaryValue}><span className={styles.priceHighlight}>無料</span><span className={styles.priceSmall}>（送料着払い）</span></span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>対応エリア</span>
                  <span className={styles.summaryValue}>全国47都道府県</span>
                </div>
              </div>
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
            <h2 className={styles.sectionTitleCenter}>手ぶらで完了する「無料の梱包キット」</h2>
            <p className={styles.sectionDescCenter}>
              ご遺骨を安全に輸送するためには、骨壺にあったサイズの頑丈な段ボールと十分な緩衝材が不可欠です。Ikotsu Labでは、破損リスクをゼロに近づける「専用梱包キット」をご自宅まで無料でお届けしています。
            </p>
          </FadeIn>
          
          <div className={styles.kitGrid}>
            <FadeIn direction="up" delay={0.1} className={styles.kitCard}>
              <h3 className={styles.kitTitle}>📦 すべて揃ったオールインワン</h3>
              <p className={styles.kitDesc}>専用強化段ボール、各種緩衝材、ガムテープまで同梱。お客様がホームセンターなどで準備するものは何もありません。</p>
            </FadeIn>
            <FadeIn direction="up" delay={0.2} className={styles.kitCard}>
              <h3 className={styles.kitTitle}>📋 記入不要の着払い伝票</h3>
              <p className={styles.kitDesc}>ラボの住所やお客様の情報が印字済みの「ゆうパック着払い伝票」が入っています。箱に貼るだけで準備完了です。</p>
            </FadeIn>
            <FadeIn direction="up" delay={0.3} className={styles.kitCard}>
              <h3 className={styles.kitTitle}>📖 写真付き梱包マニュアル</h3>
              <p className={styles.kitDesc}>初めての方でも絶対に失敗しない、写真付きの詳細な梱包手順書を同封しています。水漏れ対策の指示書もございます。</p>
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
              <h2 className="section__title">お引取り（ご郵送）に関するよくあるご質問</h2>
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
        { name: 'お引取り（ご郵送）', href: '/services/takeout' },
      ])} />
      <JsonLd data={generateServiceSchema({
        name: 'お引取り（ご郵送受付）サービス',
        description: '全国対応の遺骨郵送受付サービス。専用の無料梱包キットを用いて着払いで発送できるため、遠方や外出が難しい方でも安心してご依頼いただけます。',
        url: 'https://ikotsu-lab.example.com/services/takeout',
      })} />
    </>
  );
}
