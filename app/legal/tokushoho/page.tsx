import type { Metadata } from 'next';
import { JsonLd, generateBreadcrumbSchema } from '@/lib/schema/jsonld';
import ScrollReveal from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/ui/Breadcrumb';
import styles from '@/components/layout/legal.module.css';

export const metadata: Metadata = {
  title: '特定商取引法に基づく表記 | Ikotsu Lab｜粉骨・洗骨の専門機関',
  description: 'Ikotsu Labの特定商取引法に基づく表記。サービス提供事業者、支払方法、キャンセル等についての法的な重要事項を記載しています。',
  alternates: { canonical: '/legal/tokushoho' },
};

const TOKUSHOHO_INFO = [
  { label: '販売事業者名（屋号）', value: 'Ikotsu Lab（遺骨ラボ）' },
  { label: '運営会社', value: '株式会社清蓮（Seiren Inc.）' },
  { label: '代表責任者名', value: '代表取締役（代表者名）' },
  { label: '所在地', value: '〒231-0000\n神奈川県横浜市中区（詳細住所）' },
  { label: '電話番号', value: '0120-000-000（受付時間 10:00-18:00 土日祝対応可能）\n※サービスの性質上、お電話での対応を基本としております' },
  { label: 'メールアドレス', value: 'info@ikotsu-lab.com' },
  { label: '販売価格（役務対価）', value: '各サービスの料金ページに記載の金額となります。すべて税込み表示です。\n※お見積りにて個別にご提示する場合がございます。' },
  { label: '商品代金（役務対価）以外の必要料金', value: '・銀行振込の場合：振込手数料\n・ご遺骨の郵送をご希望される場合：発送にかかる送料はお客様負担（返送時の送料は基本料金に含まれる場合があります。詳しくは料金ページをご参照ください）' },
  { label: '支払方法および支払時期', value: '・銀行振込：請求書発行後、指定期日までにお支払いください。\n・クレジットカード決済：各カード会社の引き落とし日に準じます。' },
  { label: '役務または商品の引き渡し時期', value: 'ご遺骨をお預かりし、料金のお支払いが確認できた後、通常約10日〜2週間前後で処理を完了し、ご指定の住所へご返却いたします。（繁忙期や特殊な処理が必要な場合はお時間をいただくことがあります）' },
  { label: 'キャンセルおよび返品・不良品について', value: 'サービスの性質上、処理作業を開始した後のキャンセルおよび返品はお受けできません。\n処理作業前（ご遺骨到着・検閲前）であればキャンセルは可能ですが、発生した往復送料等の実費はお客様のご負担となります。' },
];

export default function TokushohoPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'トップ', href: '/' },
    { name: '特定商取引法に基づく表記', href: '/legal/tokushoho' },
  ]);

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <ScrollReveal>
            <h1 className={styles.title}>特定商取引法に基づく表記</h1>
            <p className={styles.text}>サービス提供に関する重要事項</p>
          </ScrollReveal>
        </div>
      </section>

      <div className="container" style={{ paddingTop: 'var(--space-8)' }}>
        <Breadcrumb items={[
          { name: 'トップ', href: '/' },
          { name: '特定商取引法に基づく表記', href: '/legal/tokushoho' },
        ]} />
      </div>

      <section className={styles.content}>
        <div className="container container--narrow">
          <ScrollReveal>
            <div className={styles.section}>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <tbody>
                    {TOKUSHOHO_INFO.map((row) => (
                      <tr key={row.label}>
                        <th>{row.label}</th>
                        <td style={{ whiteSpace: 'pre-wrap' }}>{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <JsonLd data={breadcrumb} />
    </>
  );
}
