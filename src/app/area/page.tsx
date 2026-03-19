import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/motion/FadeIn';
import StaggerChildren, { StaggerItem } from '@/components/motion/StaggerChildren';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';
import { JsonLd, generateBreadcrumbSchema } from '@/lib/schema/jsonld';
import styles from './area.module.css';

export const metadata: Metadata = {
  title: '全国対応エリア｜粉骨・洗骨の出張引取り・郵送受付｜遺骨.com',
  description: '遺骨.comは全国47都道府県から粉骨・洗骨のご依頼を承っています。郵送（着払い）または出張引取りにて対応。関東圏への直接持込みも可能です。',
  alternates: { canonical: '/area' },
};

const AREA_GROUPS = [
  {
    region: '北海道・東北',
    areas: ['北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県'],
    method: '郵送（ゆうパック・着払い）',
    note: '出張対応は要お見積り',
  },
  {
    region: '関東（出張対応 / 持込み可）',
    areas: ['東京都', '神奈川県', '埼玉県', '千葉県', '茨城県', '栃木県', '群馬県'],
    method: '郵送 / 出張引取り / 直接持込み',
    note: '出張費：10,000円〜（エリアにより変動）',
    highlight: true,
  },
  {
    region: '中部・北陸',
    areas: ['新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県'],
    method: '郵送（ゆうパック・着払い）',
    note: '出張対応は要お見積り',
  },
  {
    region: '近畿（関西）',
    areas: ['三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県'],
    method: '郵送（ゆうパック・着払い）',
    note: '出張対応は要お見積り',
  },
  {
    region: '中国・四国',
    areas: ['鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県'],
    method: '郵送（ゆうパック・着払い）',
    note: '出張対応は要お見積り',
  },
  {
    region: '九州・沖縄',
    areas: ['福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'],
    method: '郵送（ゆうパック・着払い）',
    note: '出張対応は個別お見積り',
  },
];

const HOW_TO_STEPS = [
  {
    step: '01',
    title: '無料梱包キットをご請求',
    desc: 'お問い合わせフォームよりご依頼いただくと、専用の梱包キット（段ボール・緩衝材・着払い伝票）をご自宅へ無料でお届けします。',
  },
  {
    step: '02',
    title: '骨壺を梱包・発送',
    desc: '手順書に沿ってお骨壺を安全に梱包し、同封の着払い伝票を使って最寄りの郵便局またはコンビニから発送。集荷も可能です。',
  },
  {
    step: '03',
    title: '到着連絡・処理開始',
    desc: '遺骨.comラボに到着次第、メールにてご連絡します。状態確認後、粉骨・洗骨等のご依頼処理を開始します。',
  },
  {
    step: '04',
    title: '処理完了・ご返送',
    desc: '処理完了後、写真付き「作業報告書」を同封してご指定のご住所へご返送します。',
  },
];

export default function AreaPage() {
  return (
    <>
      <div className="container" style={{ paddingTop: 'var(--space-6)' }}>
        <Breadcrumb items={[
          { name: 'トップ', href: '/' },
          { name: '全国対応エリア', href: '/area' },
        ]} />
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <FadeIn direction="up" className="text-center">
            <span className="section__label">Area</span>
            <h1 className={styles.heroTitle}>全国47都道府県<br />対応しています</h1>
            <p className={styles.heroLead}>
              郵送（ゆうパック着払い）または出張引取りにて、<br />
              どの地域からでも粉骨・洗骨のご依頼が可能です。<br />
              ご自身での持込みは横浜市戸塚区のラボへお越しください。
            </p>
            <div className={styles.heroActions}>
              <Button href="/contact" variant="primary" size="lg">無料梱包キットを申し込む</Button>
              <Button href="/services/carrying" variant="secondary" size="lg">出張引取りについて</Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Area Table */}
      <section className="section section--alt">
        <div className="container">
          <FadeIn direction="up" className="text-center">
            <h2 className="section__title">エリア別 対応方法</h2>
            <p className="section__description">
              関東圏は出張引取り・直接持込みも選択できます。その他エリアは郵送（着払い）でご対応します。
            </p>
          </FadeIn>
          <StaggerChildren className={styles.areaGrid} staggerDelay={0.07}>
            {AREA_GROUPS.map((group) => (
              <StaggerItem key={group.region} className={`${styles.areaCard} ${group.highlight ? styles.areaCardHighlight : ''}`}>
                {group.highlight && <span className={styles.highlightBadge}>直接持込み・出張可</span>}
                <h3 className={styles.areaRegion}>{group.region}</h3>
                <div className={styles.areaTags}>
                  {group.areas.map((a) => (
                    <span key={a} className={styles.areaTag}>{a}</span>
                  ))}
                </div>
                <div className={styles.areaMethod}>
                  <span className={styles.areaMethodLabel}>対応方法</span>
                  <span className={styles.areaMethodValue}>{group.method}</span>
                </div>
                <p className={styles.areaNoteText}>{group.note}</p>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* How to use */}
      <section className="section">
        <div className="container">
          <FadeIn direction="up" className="text-center">
            <span className="section__label">How to</span>
            <h2 className="section__title">郵送でのご依頼の流れ</h2>
          </FadeIn>
          <StaggerChildren className={styles.stepsGrid} staggerDelay={0.1}>
            {HOW_TO_STEPS.map((step) => (
              <StaggerItem key={step.step} className={styles.stepCard}>
                <span className={styles.stepNumber}>{step.step}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Notice */}
      <section className="section section--alt">
        <div className="container container--narrow">
          <FadeIn direction="up">
            <div className={styles.noticeBox}>
              <h3 className={styles.noticeTitle}>郵送に関するご注意</h3>
              <ul className={styles.noticeList}>
                <li>ご遺骨の郵送は「日本郵便（ゆうパック）」以外のサービスでは承ることができません。</li>
                <li>お預かりから返送までの間、ご遺骨は厳重に管理し、第三者への情報開示等は一切行いません。</li>
                <li>梱包キットの送付には通常3〜5営業日かかります。お急ぎの場合はお問い合わせください。</li>
                <li>返送料は地域ごとの実費（1,500円〜2,500円程度）を申し受けます。</li>
              </ul>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.2} className={styles.ctaWrap}>
            <Button href="/contact" variant="primary" size="lg">まずは無料相談・お見積り</Button>
          </FadeIn>
        </div>
      </section>

      <JsonLd data={generateBreadcrumbSchema([
        { name: 'トップ', href: '/' },
        { name: '全国対応エリア', href: '/area' },
      ])} />
    </>
  );
}
