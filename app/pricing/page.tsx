import type { Metadata } from 'next';
import { JsonLd, generateBreadcrumbSchema } from '@/lib/schema/jsonld';
import ScrollReveal from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PricingSimulator from './PricingSimulator';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: '料金目安 | Ikotsu Lab｜粉骨・洗骨の専門機関',
  description:
    '粉骨・洗骨・出張搬送・お引取りの料金目安一覧。Ikotsu Labは追加料金なし・事前見積もり無料。遺骨の量・状態・オプションを選んで費用をシミュレーションできます。',
  alternates: { canonical: '/pricing' },
};

/* シミュレータ用オプションデータ（参考） */
const SIZE_OPTIONS = [
  { value: 'small', label: '少量（2寸・3寸）', add: 0 },
  { value: 'medium', label: '標準（4寸・5寸）', add: 2200 },
  { value: 'large', label: '多め（6寸・7寸）', add: 4400 },
] as const;

const CONDITION_OPTIONS = [
  { value: 'good', label: '良好（室内保管）', add: 0 },
  { value: 'mold', label: 'カビ・湿気あり（お墓等）', add: 8800 },
  { value: 'mud', label: '土泥付き（土葬等）', add: 19800 },
] as const;

export default function PricingPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'トップ', href: '/' },
    { name: '料金一覧', href: '/pricing' },
  ]);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <ScrollReveal>
            <span className="section__label">Pricing</span>
            <h1 className={styles.heroTitle}>料金一覧</h1>
            <p className={styles.heroLead}>
              すべての料金は事前にご案内。追加費用なし・見積もり無料。<br />
              遺骨の量・状態・ご要望に応じた正確なお見積もりはお問い合わせください。
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container">
        <Breadcrumb items={[
          { name: 'トップ', href: '/' },
          { name: '料金一覧', href: '/pricing' },
        ]} />
      </div>

      {/* Detailed Pricing Tables */}
      <section className="section">
        <div className="container container--narrow">
          <ScrollReveal>
            <div className="section__header">
              <span className="section__label">Service Pricing</span>
              <h2 className="section__title">主要サービス料金詳細</h2>
              <p className="section__description">
                すべての金額は税込表示となります。
              </p>
            </div>
          </ScrollReveal>

          {/* 1. 粉骨サービス */}
          <ScrollReveal delay={50}>
            <div className={styles.pricingCategory}>
              <div className={styles.categoryHeader}>
                <h3 className={styles.categoryTitle}>粉骨サービス（遺骨をパウダー化）</h3>
              </div>
              <p className={styles.heroLead} style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-6)', marginLeft: 0 }}>
                ※粉骨には保存袋／海洋散骨用水溶紙袋が含まれるケースがあります（詳細は各プランページをご参照ください）。
              </p>
              
              <div className={styles.priceTableWrap}>
                <div className={styles.tableHeader}>
                  <h3>スタンダード粉骨（火葬後・室内保管の遺骨）</h3>
                </div>
                <table className={styles.priceTable}>
                  <tbody>
                    <tr><th>2寸・3寸</th><td>8,800円</td></tr>
                    <tr><th>4寸・5寸</th><td>11,000円</td></tr>
                    <tr><th>6寸・7寸</th><td>13,200円</td></tr>
                  </tbody>
                </table>
              </div>

              <div className={styles.priceTableWrap}>
                <div className={styles.tableHeader}>
                  <h3>墓に納骨されていた遺骨の粉骨</h3>
                </div>
                <table className={styles.priceTable}>
                  <tbody>
                    <tr><th>2寸・3寸</th><td>17,600円</td></tr>
                    <tr><th>4寸・5寸</th><td>19,800円</td></tr>
                    <tr><th>6寸・7寸</th><td>22,000円</td></tr>
                  </tbody>
                </table>
              </div>

              <div className={styles.priceTableWrap}>
                <div className={styles.tableHeader}>
                  <h3>土がついた遺骨の粉骨（例：土葬・泥付き）</h3>
                </div>
                <table className={styles.priceTable}>
                  <tbody>
                    <tr><th>2寸・3寸</th><td>28,600円</td></tr>
                    <tr><th>4寸・5寸</th><td>30,800円</td></tr>
                    <tr><th>5寸〜7寸</th><td>33,000円</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>

          {/* 2. 洗浄・乾燥サービス */}
          <ScrollReveal>
            <div className={styles.pricingCategory}>
              <div className={styles.categoryHeader}>
                <h3 className={styles.categoryTitle}>洗浄・乾燥サービス（単体）</h3>
              </div>
              
              <div className={styles.priceTableWrap}>
                <div className={styles.tableHeader}>
                  <h3>シンプル洗浄サービス</h3>
                </div>
                <table className={styles.priceTable}>
                  <tbody>
                    <tr><th>2寸・3寸</th><td>6,600円</td></tr>
                    <tr><th>4寸・5寸</th><td>8,800円</td></tr>
                    <tr><th>6寸・7寸</th><td>11,000円</td></tr>
                  </tbody>
                </table>
              </div>

              <div className={styles.priceTableWrap}>
                <div className={styles.tableHeader}>
                  <h3>スタンダード洗浄サービス（異物・カビ・菌除去・乾燥）</h3>
                </div>
                <table className={styles.priceTable}>
                  <tbody>
                    <tr><th>2寸・3寸</th><td>8,800円</td></tr>
                    <tr><th>4寸・5寸</th><td>12,100円</td></tr>
                    <tr><th>6寸・7寸</th><td>14,300円</td></tr>
                  </tbody>
                </table>
              </div>

              <div className={styles.priceTableWrap}>
                <div className={styles.tableHeader}>
                  <h3>土泥除去＋洗浄サービス</h3>
                </div>
                <table className={styles.priceTable}>
                  <tbody>
                    <tr><th>2寸・3寸</th><td>18,600円</td></tr>
                    <tr><th>4寸・5寸</th><td>23,100円</td></tr>
                    <tr><th>6寸・7寸</th><td>25,300円</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>

          {/* 3. 洗浄＋粉骨サービス（セット） */}
          <ScrollReveal>
            <div className={styles.pricingCategory}>
              <div className={styles.categoryHeader}>
                <h3 className={styles.categoryTitle}>洗浄＋粉骨サービス（セット割引）</h3>
              </div>
              
              <div className={styles.priceTableWrap}>
                <div className={styles.tableHeader}>
                  <h3>洗浄＋粉骨（標準）</h3>
                </div>
                <table className={styles.priceTable}>
                  <tbody>
                    <tr><th>2寸・3寸</th><td>15,400円</td></tr>
                    <tr><th>4寸・5寸</th><td>17,600円</td></tr>
                    <tr><th>6寸・7寸</th><td>19,800円</td></tr>
                  </tbody>
                </table>
              </div>

              <div className={styles.priceTableWrap}>
                <div className={styles.tableHeader}>
                  <h3>土泥除去＋洗浄＋粉骨（セット）</h3>
                </div>
                <table className={styles.priceTable}>
                  <tbody>
                    <tr><th>2寸・3寸</th><td>22,000円</td></tr>
                    <tr><th>4寸・5寸</th><td>26,400円</td></tr>
                    <tr><th>5寸〜7寸</th><td>29,600円</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>

          {/* 4. 遺骨お運びサービス */}
          <ScrollReveal>
            <div className={styles.pricingCategory}>
              <div className={styles.categoryHeader}>
                <h3 className={styles.categoryTitle}>遺骨お運びサービス（運搬）</h3>
              </div>
              <p className={styles.heroLead} style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-6)', marginLeft: 0 }}>
                料金は「走行距離ベース（当社→預かり→届け→当社） + 箱代 + 有料道路代など」から算出します。<br/>
                ※別途 有料道路料金・駐車料金が実費請求となるケースがあります。
              </p>
              
              <div className={styles.priceTableWrap}>
                <div className={styles.tableHeader}>
                  <h3>距離別標準運搬料金（出張費）</h3>
                </div>
                <table className={styles.priceTable}>
                  <tbody>
                    <tr><th>〜30㎞</th><td>3,300円</td></tr>
                    <tr><th>〜50㎞</th><td>5,500円</td></tr>
                    <tr><th>〜80㎞</th><td>8,800円</td></tr>
                    <tr><th>以降10㎞ごと</th><td>+1,100円</td></tr>
                  </tbody>
                </table>
              </div>

              <div className={styles.priceTableWrap}>
                <div className={styles.tableHeader}>
                  <h3>搬送用箱代</h3>
                </div>
                <table className={styles.priceTable}>
                  <tbody>
                    <tr><th>骨壺用専用箱</th><td>1,000円〜1,100円程度（目安）</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>

          {/* 5. 骨壺取り出しサービス */}
          <ScrollReveal>
            <div className={styles.pricingCategory}>
              <div className={styles.categoryHeader}>
                <h3 className={styles.categoryTitle}>骨壺取り出しサービス（現場対応）</h3>
              </div>
              <p className={styles.heroLead} style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-6)', marginLeft: 0 }}>
                ※合計金額は「走行距離 + 高速道路利用 + 出張費」の合算となります。
              </p>
              
              <div className={styles.priceTableWrap}>
                <div className={styles.tableHeader}>
                  <h3>基本作業料金</h3>
                </div>
                <table className={styles.priceTable}>
                  <tbody>
                    <tr><th>骨壺取り出しサービス</th><td>22,000円</td></tr>
                    <tr><th>骨壺専用木箱</th><td>1,650円</td></tr>
                    <tr><th>お骨の拾い出しサービス</th><td>88,000円</td></tr>
                    <tr><th>カロート石蓋接着サービス</th><td>22,000円</td></tr>
                  </tbody>
                </table>
              </div>

              <div className={styles.priceTableWrap}>
                <div className={styles.tableHeader}>
                  <h3>出張費（距離基準）</h3>
                </div>
                <table className={styles.priceTable}>
                  <tbody>
                    <tr><th>〜30㎞</th><td>3,300円</td></tr>
                    <tr><th>〜50㎞</th><td>5,500円</td></tr>
                    <tr><th>〜80㎞</th><td>8,800円</td></tr>
                    <tr><th>以降10㎞ごと</th><td>+1,100円</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>

          {/* 6. 出張粉骨サービス */}
          <ScrollReveal>
            <div className={styles.pricingCategory}>
              <div className={styles.categoryHeader}>
                <h3 className={styles.categoryTitle}>出張粉骨サービス（ご自宅訪問）</h3>
              </div>
              <p className={styles.heroLead} style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-6)', marginLeft: 0 }}>
                交通費（有料道路往復）は別途請求となります。埋葬状態の遺骨は現場では対応不可（洗浄・乾燥処理が必要となるため一度お預かりします）。
              </p>
              
              <div className={styles.priceTableWrap}>
                <div className={styles.tableHeader}>
                  <h3>出張費</h3>
                </div>
                <table className={styles.priceTable}>
                  <tbody>
                    <tr><th>〜30㎞</th><td>3,300円</td></tr>
                    <tr><th>〜50㎞</th><td>5,500円</td></tr>
                    <tr><th>〜80㎞</th><td>8,800円</td></tr>
                    <tr><th>以降10㎞ごと</th><td>+1,100円</td></tr>
                  </tbody>
                </table>
              </div>

              <div className={styles.priceTableWrap}>
                <div className={styles.tableHeader}>
                  <h3>粉骨料金（現場処理）</h3>
                </div>
                <table className={styles.priceTable}>
                  <tbody>
                    <tr><th>2寸・3寸</th><td>8,800円</td></tr>
                    <tr><th>4寸・5寸</th><td>11,000円</td></tr>
                    <tr><th>6寸・7寸</th><td>13,200円</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>

          {/* 7. 付随用品 */}
          <ScrollReveal>
            <div className={styles.pricingCategory}>
              <div className={styles.categoryHeader}>
                <h3 className={styles.categoryTitle}>付随用品料金（参考）</h3>
              </div>
              
              <div className={styles.priceTableWrap}>
                <table className={styles.priceTable}>
                  <tbody>
                    <tr><th>骨壺（標準）</th><td>6,600円〜</td></tr>
                    <tr><th>お骨袋＜フリル＞</th><td>6,600円</td></tr>
                    <tr><th>保存袋カバー（各種）</th><td>粉骨料金 + 6,600円</td></tr>
                    <tr><th>海洋散骨用水溶紙袋</th><td>3枚まで無料（標準付属）</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* Simulator */}
      <section className={`section section--alt ${styles.simulatorSection}`}>
        <div className="container container--narrow">
          <ScrollReveal>
            <div className="section__header">
              <span className="section__label">Simulator</span>
              <h2 className="section__title">見積シミュレーター</h2>
              <p className="section__description">
                提供している主要サービスの基本料金目安をシミュレーションできます。
                正確な実費や複数サービスの組み合わせについては、別途お問い合わせください。
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <PricingSimulator
              sizeOptions={[...SIZE_OPTIONS]}
              conditionOptions={[...CONDITION_OPTIONS]}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Notes */}
      <section className="section">
        <div className="container container--narrow">
          <ScrollReveal>
            <div className={styles.notesBox}>
              <h2 className={styles.notesTitle}>料金に関するご注意</h2>
              <ul className={styles.notesList}>
                <li>表示価格はすべて<strong>税込みの目安</strong>です。</li>
                <li>遺骨の量・状態・組み合わせるオプションにより変動します。</li>
                <li>出張・搬送に伴う有料道路や駐車場費用などは、実費でのご負担となる場合がございます。</li>
                <li>事前にご案内した御見積りの料金以外の追加費用は原則発生しません。作業前にすべてご案内し、ご納得いただいてからの開始となります。</li>
                <li>法人・寺院・葬儀社など継続依頼の場合は、別途BtoBお見積もりをご案内します。</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className={`section section--dark ${styles.ctaSection}`}>
        <div className="container">
          <ScrollReveal>
            <h2 className={styles.ctaTitle}>正確な料金はお見積もりください</h2>
            <p className={styles.ctaText}>遺骨の現状をお聞きし、料金・工程・日数を無料でご案内します。</p>
            <div className={styles.ctaActions}>
              <a href="/contact" className={styles.ctaBtnPrimary}>無料相談・お見積もり</a>
              <a href="tel:0120-000-000" className={styles.ctaBtnSecondary}>電話で相談する</a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <JsonLd data={breadcrumb} />
    </>
  );
}
