import type { Metadata } from 'next';
import FadeIn from '@/components/motion/FadeIn';
import StaggerChildren, { StaggerItem } from '@/components/motion/StaggerChildren';
import Button from '@/components/ui/Button';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { JsonLd, generateBreadcrumbSchema, generateHowToSchema } from '@/lib/schema/jsonld';
import styles from './process.module.css';

export const metadata: Metadata = {
  title: '粉骨・洗骨の作業工程公開|品質チェック基準と証明書の内容|遺骨.com',
  description:
    '粉骨（5工程）・洗骨（6工程）・洗骨+粉骨セット（11工程）の全作業工程をステップ別に公開。各工程のチェックポイント・品質基準・六価クロム除去の確認手順・証明書の記載内容を明示します。',
  alternates: { canonical: '/process' },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: '遺骨.com｜粉骨・洗骨の専門機関',
    images: [{
      url: `/og?title=粉骨・洗骨の作業工程公開と品質チェック基準&label=工程公開`,
      width: 1200,
      height: 630,
      alt: '粉骨・洗骨の作業工程公開と品質チェック基準',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`/og?title=粉骨・洗骨の作業工程公開と品質チェック基準&label=工程公開`],
  },
};

const POWDERED_STEPS = [
  {
    num: '01',
    title: '受領・状態確認',
    check: '管理番号発行 / 遺骨の状態（乾燥度・カビ有無・異物混入）を確認',
    desc: '受領した遺骨に管理番号を付与します。乾燥・カビの有無・骨壺内の異物を確認し、適切なプランを決定します。',
  },
  {
    num: '02',
    title: '小石・不純物除去',
    check: '金属類・プラスチック・石礫の除去を手作業で確認',
    desc: '骨壺内の小石・金属製副葬品・プラスチック類を手作業で1点ずつ除去します。粉骨機の刃の保護と品質均一化のために必須の工程です。',
  },
  {
    num: '03',
    title: '専用粉骨機で処理',
    check: '2mm以下の均一パウダー化を目視確認 / 機内清掃を前件完了後に実施',
    desc: '専用粉骨機（1件ごとに完全清掃済み）で2mm以下のパウダー状に均一粉砕します。他の遺骨との混入を構造的に防ぎます。',
  },
  {
    num: '04',
    title: '微粒子チェック・品質確認',
    check: '粒度・色調・異物残存を目視確認 / 品質基準シートで検証',
    desc: '粉砕後のパウダーの粒度・色調・異物残存を目視と品質基準シートで確認します。基準を満たさない場合は再処理します。',
  },
  {
    num: '05',
    title: '梱包・証明書同封・返送',
    check: '保存袋の密封確認 / 証明書の内容確認（管理番号と一致）',
    desc: '専用密封保存袋に収め、エアキャップと専用箱で梱包。作業報告書または粉骨証明書を同封して返送します。',
  },
];

const CLEANING_STEPS = [
  {
    num: '01',
    title: '受領・状態確認',
    check: '管理番号発行 / カビ種類・六価クロム有無・土泥量を確認',
    desc: '受領した遺骨に管理番号を付与し、カビの種類・六価クロムの可能性・土泥付着量を確認してプランを確定します。',
  },
  {
    num: '02',
    title: '土泥・粗ゴミ除去（状態別）',
    check: '土泥の大量付着がある場合に先行除去を実施',
    desc: '土泥が大量に付着している場合は先行除去を行います（土付きプランのみ）。鑑識不要の遺骨では省略します。',
  },
  {
    num: '03',
    title: '超音波洗浄',
    check: 'カビ・変色・害虫の除去を目視確認',
    desc: '専用洗浄液と超音波で骨の内部まで洗浄します。カビ・変色・害虫を除去します。',
  },
  {
    num: '04',
    title: '六価クロム除去',
    check: '専用副剤の使用と除去完了の検証手順を実施',
    desc: '専用副剤で六価クロムを無害化処理します。確認手順（目視・副剤反応）で完了を検証し、証明書への記載に備えます。',
  },
  {
    num: '05',
    title: '完全乾燥',
    check: '骨の芯まで完全乾燥（温度・時間を管理）',
    desc: '専用乾燥機で骨の芯まで乾燥させます。不十分な乾燥は再カビ発生の原因になるため、温度と時間を管理します。',
  },
  {
    num: '06',
    title: '洗骨チェック完了・返送 or 粉骨フェーズへ',
    check: '乾燥度・六価クロム除去・異物残存の最終確認',
    desc: '乾燥後の状態・六価クロム除去・異物残存を最終確認します。洗骨のみの場合は梱包して返送。セットプランの場合は粉骨フェーズへ移行します。',
  },
];

const CERT_ITEMS = [
  { label: '管理番号', desc: '受領時に付与した固有番号（取り違え防止の根幹）' },
  { label: '依頼者氏名（法人名）', desc: '法人名義での発行にも対応' },
  { label: '作業日', desc: '粉骨・洗骨の実施日を記載' },
  { label: '工程グレード', desc: 'スタンダード / 墓から / 土付き のいずれか' },
  { label: '担当者名', desc: '作業を担当したスタッフの名前' },
  { label: '微粒子規格', desc: '2mm以下の均一パウダー化の確認' },
  { label: '六価クロム除去確認', desc: '洗骨・セットプランのみ記載。除去実施の確認内容を記録' },
];

export default function ProcessPage() {
  return (
    <>
      <div className="container" style={{ paddingTop: 'var(--space-6)' }}>
        <Breadcrumb
          items={[
            { name: 'トップ', href: '/' },
            { name: '作業工程公開', href: '/process' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className={styles.hero} aria-label="作業工程公開 ヒーロー領域">
        <div className="container">
          <FadeIn direction="up">
            <span className={styles.badge}>全工程・チェックポイント・証明書内容を公開</span>
            <h1 className={styles.heroTitle}>
              粉骨・洗骨の作業工程公開<br />
              <span className={styles.heroTitleSub}>品質チェック基準と証明書の内容</span>
            </h1>
            <p className={styles.heroLead}>
              粉骨（5工程）・洗骨（6工程）の全作業工程と、<br />
              各ステップのチェックポイントおよび品質基準を公開します。<br />
              「見えない作業」を根拠として依頼判断にお役立てください。
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', marginTop: 'var(--space-6)' }}>
              <Button href="/services/powdered" variant="primary" size="lg">粉骨の料金・詳細</Button>
              <Button href="/services/cleaning" variant="secondary" size="lg">洗骨の料金・詳細</Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Powdered Process */}
      <section className="section" aria-label="粉骨の作業工程">
        <div className="container">
          <FadeIn direction="up">
            <div className="section__header">
              <span className="section__label">粉骨 / 5 Steps</span>
              <h2 className="section__title">粉骨の作業工程とチェックポイント</h2>
              <p className="section__description">
                受領から返送まで5工程。各工程に品質チェックを設けています。
              </p>
            </div>
          </FadeIn>
          <StaggerChildren className={styles.processGrid} staggerDelay={0.07}>
            {POWDERED_STEPS.map((step) => (
              <StaggerItem key={step.num} className={styles.processCard}>
                <div className={styles.processNum}>STEP {step.num}</div>
                <h3 className={styles.processTitle}>{step.title}</h3>
                <p className={styles.processDesc}>{step.desc}</p>
                <div className={styles.checkBox}>
                  <span className={styles.checkLabel}>✔ チェック</span>
                  <p className={styles.checkText}>{step.check}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Cleaning Process */}
      <section className="section section--alt" aria-label="洗骨の作業工程">
        <div className="container">
          <FadeIn direction="up">
            <div className="section__header">
              <span className="section__label">洗骨 / 6 Steps</span>
              <h2 className="section__title">洗骨の作業工程とチェックポイント</h2>
              <p className="section__description">
                六価クロム除去・乾燥を含む6工程。洗骨+粉骨セットの場合は合計11工程になります。
              </p>
            </div>
          </FadeIn>
          <StaggerChildren className={styles.processGrid} staggerDelay={0.07}>
            {CLEANING_STEPS.map((step) => (
              <StaggerItem key={step.num} className={styles.processCard}>
                <div className={styles.processNum}>STEP {step.num}</div>
                <h3 className={styles.processTitle}>{step.title}</h3>
                <p className={styles.processDesc}>{step.desc}</p>
                <div className={styles.checkBox}>
                  <span className={styles.checkLabel}>✔ チェック</span>
                  <p className={styles.checkText}>{step.check}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Certificate */}
      <section className="section" aria-label="証明書の記載内容">
        <div className="container container--narrow">
          <FadeIn direction="up">
            <div className="section__header">
              <span className="section__label">Certificate</span>
              <h2 className="section__title">粉骨証明書・洗骨証明書の記載内容</h2>
              <p className="section__description">
                証明書（オプション 2,200円）には以下の項目を記載します。法人名義での発行にも対応しています。
              </p>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <div className={styles.certTable}>
              {CERT_ITEMS.map((item) => (
                <div key={item.label} className={styles.certRow}>
                  <span className={styles.certLabel}>{item.label}</span>
                  <span className={styles.certDesc}>{item.desc}</span>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <div style={{ marginTop: 'var(--space-8)', display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button href="/contact" variant="primary" size="lg">工程についてご相談</Button>
              <Button href="/guide/decision-flow" variant="secondary" size="lg">どのサービスを選ぶか判断フロー</Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Structured Data */}
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: 'トップ', href: '/' },
          { name: '作業工程公開', href: '/process' },
        ])}
      />
      <JsonLd
        data={generateHowToSchema({
          name: '粉骨の作業工程（全5工程）',
          description: '粉骨の受領〜返送までの5工程と各チェックポイント。',
          steps: POWDERED_STEPS.map((s) => ({ name: s.title, text: s.desc })),
        })}
      />
      <JsonLd
        data={generateHowToSchema({
          name: '洗骨の作業工程（全6工程）',
          description: '洗骨の受領〜返送（またはセットプランへの移行）までの6工程と各チェックポイント。',
          steps: CLEANING_STEPS.map((s) => ({ name: s.title, text: s.desc })),
        })}
      />
    </>
  );
}
