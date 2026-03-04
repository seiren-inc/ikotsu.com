import type { Metadata } from 'next';
import FadeIn from '@/components/motion/FadeIn';
import StaggerChildren, { StaggerItem } from '@/components/motion/StaggerChildren';
import CorporateForm from '@/components/forms/CorporateForm';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';
import { JsonLd, generateBreadcrumbSchema } from '@/lib/schema/jsonld';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: '法人・寺院からの業務委託・ご依頼 | Ikotsu Lab',
  description: '寺院・納骨堂・霊園・葬儀社など法人様専門のご依頼窓口。月間まとめ処理・継続提携・業務委託に対応。守秘義務を徹底し、専任担当者がワンストップでサポートいたします。まずは無料でご相談・資料請求を。',
  alternates: { canonical: '/for-corporate' },
};

const MERITS = [
  { icon: '📋', title: '専任担当者がワンストップ対応', desc: '法人窓口専任スタッフが初回のお打ち合わせから処理完了、ご請求対応まで一貫してサポートします。' },
  { icon: '🔄', title: '継続・まとめ依頼に対応', desc: '月間件数に応じた専用の契約モデルをご提案。定期的な一括搬送・一括処理にも柔軟に対応可能です。' },
  { icon: '📄', title: '処理報告書の発行', desc: '全件について処理前後の写真を含む記録レポートを発行。貴院・貴社の管理書類として確実にご活用いただけます。' },
  { icon: '🔒', title: '徹底した情報管理と守秘義務', desc: 'ご依頼件数やエンドユーザー様の個人情報は厳重に管理。第三者への開示は一切行いません。' },
  { icon: '💰', title: '法人特別価格のご提示', desc: '月間の想定件数や業務フローの巻き取り範囲に応じた専用の料金体系をご用意いたします。見積もりは無料です。' },
  { icon: '🚚', title: '出張引取り・定期搬送', desc: '貴院やご指定の倉庫・施設への定期的な出張引取り・搬送も承ります。全国どこでも対応いたします。' },
];

const FLOW = [
  { num: '01', title: 'お問い合わせ・資料請求', desc: '本ページのフォームまたはお電話にてご連絡ください。まずはサービス資料のお渡しも可能です。' },
  { num: '02', title: '無料お打ち合わせ', desc: '想定される月間件数や現在の課題、希望される依頼形態をヒアリングし、最適なプランとお見積りをご提案します。' },
  { num: '03', title: 'ご契約・初回依頼テスト', desc: '秘密保持契約（NDA）等を含むご契約後、テストケースとして数件の初回依頼を実施し、品質をご確認いただきます。' },
  { num: '04', title: '継続運用・月次スキーム稼働', desc: '定期搬送や月次のご請求など、双方の業務負荷を最小限に抑えた継続的な運用スキームを稼働させます。' },
];

const CORP_TYPES = [
  { label: '寺院・霊園', desc: '境内の整理や改葬・墓じまいに伴う、大量の粉骨・洗骨処理の外部委託。' },
  { label: '納骨堂・樹木葬施設', desc: '限られた納骨スペースを有効活用するための、シンボルツリー下等への定期的な粉骨・埋葬準備。' },
  { label: '葬儀社・石材店', desc: '自社のお客様向けに提供する「散骨」「手元供養」「お墓のお引越し」プランの裏側としての粉骨・洗骨サービス組み込み。' },
  { label: 'その他（士業・行政等）', desc: '成年後見人としての遺骨処理手配や、行政等の公的機関からの無縁仏処理に伴うご相談など。' },
];

export default function ForCorporatePage() {
  return (
    <>
      <div className="container" style={{ paddingTop: 'var(--space-6)' }}>
        <Breadcrumb items={[
          { name: 'トップ', href: '/' },
          { name: '法人・寺院のご依頼', href: '/for-corporate' },
        ]} />
      </div>

      {/* Hero */}
      <section className={styles.hero} aria-label="法人専任窓口 ヒーロー領域">
        <div className="container">
          <FadeIn direction="up">
            <span className={styles.heroBadge}>BtoB / 法人・寺院専用窓口</span>
            <h1 className={styles.heroTitle}>確実な処理と厳格な情報管理で、<br />貴院・貴社の業務をバックアップ</h1>
            <p className={styles.heroLead}>
              安定した品質の粉骨・洗骨処理を、継続依頼・業務提携のスキームで提供いたします。<br />
              寺院、納骨堂、葬儀社をはじめとする多様な法人様における「ご遺骨の管理・処理」の課題を、専門機関である Ikotsu Lab がワンストップで解決します。
            </p>
            <div className={styles.heroActions}>
              <Button href="#contact" variant="primary" size="lg">法人相談・見積もり（無料）</Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Corporate Types */}
      <section className="section" aria-label="対象となる法人・施設">
        <div className="container">
          <FadeIn direction="up" className={`text-center ${styles.sectionHeaderMargin12}`}>
            <span className="section__label">For Whom</span>
            <h2 className="section__title">このような法人様・施設様にご利用いただいています</h2>
          </FadeIn>
          <StaggerChildren className={styles.corpTypeGrid} staggerDelay={0.1}>
            {CORP_TYPES.map((t) => (
              <StaggerItem key={t.label} className={styles.corpTypeCard}>
                <h3 className={styles.corpTypeLabel}>{t.label}</h3>
                <p className={styles.corpTypeDesc}>{t.desc}</p>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Challenges & Solutions (課題と解決) */}
      <section className={`section section--alt ${styles.solutionSection}`} aria-label="課題と解決">
        <div className="container">
          <FadeIn direction="up" className={`text-center ${styles.sectionHeaderMargin12}`}>
            <h2 className="section__title">法人が抱える遺骨処理の課題を解決</h2>
          </FadeIn>
          <div className={styles.solutionGrid}>
            <FadeIn direction="left" className={styles.solutionCard}>
              <div className={styles.solutionHeaderBad}>よくある課題</div>
              <ul className={styles.solutionList}>
                <li>毎月の件数変動が激しく、自社スタッフだけでは処理が追いつかない</li>
                <li>手作業での粉骨は時間と体力がかかり、業務効率が悪化している</li>
                <li>処理後の状態を証明する書類がなく、顧客への説明材料に欠ける</li>
                <li>外注先とのやり取り窓口が複数あり、管理コストが増大している</li>
              </ul>
            </FadeIn>
            <FadeIn direction="right" className={styles.solutionCardAlt}>
              <div className={styles.solutionHeaderGood}>Ikotsu Labの導入で</div>
              <ul className={styles.solutionListAlt}>
                <li><span className={styles.highlight}>月数十件〜の大型案件・一括処理</span>にも専用設備と人員で余裕をもって対応</li>
                <li>自社のリソースを本来のコア業務（顧客対応等）に集中できる</li>
                <li>全件<span className={styles.highlight}>写真付きの処理報告書</span>を発行し、そのままエンドユーザーへの報告に使える</li>
                <li>専任担当者が窓口を一本化。見積りから回収、処理、返送まで完結</li>
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Merits */}
      <section className="section" aria-label="法人窓口のメリット">
        <div className="container">
          <FadeIn direction="up" className={`text-center ${styles.sectionHeaderMargin12}`}>
            <span className="section__label">Merits</span>
            <h2 className="section__title">法人専用スキーム 6つの強み</h2>
          </FadeIn>
          <StaggerChildren className={styles.meritGrid} staggerDelay={0.05}>
            {MERITS.map((m) => (
              <StaggerItem key={m.title} className={styles.meritCard}>
                <span className={styles.meritIcon} aria-hidden="true">{m.icon}</span>
                <h3 className={styles.meritTitle}>{m.title}</h3>
                <p className={styles.meritDesc}>{m.desc}</p>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Flow */}
      <section className="section section--alt" aria-label="導入までの流れ">
        <div className="container">
          <FadeIn direction="up" className={`text-center ${styles.sectionHeaderMargin12}`}>
            <span className="section__label">Flow</span>
            <h2 className="section__title">ご契約・導入までの流れ</h2>
          </FadeIn>
          <StaggerChildren className={styles.flowGrid} staggerDelay={0.1}>
            {FLOW.map((step) => (
              <StaggerItem key={step.num} className={styles.flowStep}>
                <div className={styles.flowNum}>{step.num}</div>
                <h3 className={styles.flowTitle}>{step.title}</h3>
                <p className={styles.flowDesc}>{step.desc}</p>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Form Section */}
      <section id="contact" className="section" aria-label="お問い合わせ・資料請求フォーム">
        <div className="container container--narrow">
          <FadeIn direction="up" className={`text-center ${styles.sectionHeaderMargin10}`}>
            <span className="section__label">Contact & Document</span>
            <h2 className="section__title">法人専用お問い合わせ・資料請求</h2>
            <p className="section__description" style={{ marginTop: 'var(--space-4)' }}>
              サービス案内の資料（PDF）をご希望の方、または具体的なお見積り・ご相談をご希望の方は、<br />
              以下のフォームより必要事項をご入力ください。専任担当より1〜2営業日以内にご連絡いたします。
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <div className={styles.formWrapper}>
              <CorporateForm />
            </div>
          </FadeIn>
        </div>
      </section>

      <JsonLd data={generateBreadcrumbSchema([
        { name: 'トップ', href: '/' },
        { name: '法人・寺院のご依頼', href: '/for-corporate' },
      ])} />
    </>
  );
}
