import type { Metadata } from 'next';
import ScrollReveal from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { JsonLd, generateBreadcrumbSchema } from '@/lib/schema/jsonld';
import styles from '@/components/layout/legal.module.css';

export const metadata: Metadata = {
  title: '会社情報・運営方針 | Ikotsu Lab｜粉骨・洗骨の専門機関',
  description: 'Ikotsu Labを運営する会社情報。遺骨の取り扱いにおける専門機関としての運営方針、所在地などの企業概要をご覧いただけます。',
  alternates: { canonical: '/company' },
};

const COMPANY_INFO = [
  { label: '運営会社 / 屋号', value: '株式会社清蓮（Seiren Inc.） / Ikotsu Lab（遺骨ラボ）' },
  { label: '代表者', value: '（代表者名）' },
  { label: '設立', value: '（設立年月）' },
  { label: '所在地', value: '〒231-0000 神奈川県横浜市中区（詳細住所）\n※ご持込によるお預かりは事前ご予約制となっております。' },
  { label: '電話番号', value: '0120-000-000（受付時間：10:00 - 18:00 / 土日祝対応可能）' },
  { label: '事業内容', value: '・ご遺骨の粉骨・洗浄・乾燥処理\n・出張お引取りおよび搬送サービス\n・海洋散骨・手元供養品のご案内\n・寺院・葬儀社向けBtoB粉骨洗浄サービス' },
  { label: '主要取引先', value: '全国の提携寺院、葬儀社、納骨堂運営法人 様' },
  { label: '顧問弁護士', value: '〇〇法律事務所' },
];

export default function CompanyPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'トップ', href: '/' },
    { name: '会社情報', href: '/company' },
  ]);

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <ScrollReveal>
            <h1 className={styles.title}>会社情報・運営方針</h1>
            <p className={styles.text}>専門機関としての責任と、ご遺族に寄り添う想い。</p>
          </ScrollReveal>
        </div>
      </section>

      <div className="container" style={{ paddingTop: 'var(--space-8)' }}>
        <Breadcrumb items={[
          { name: 'トップ', href: '/' },
          { name: '会社情報', href: '/company' },
        ]} />
      </div>

      <section className={styles.content}>
        <div className="container container--narrow">
          <ScrollReveal>
            <div className={styles.section}>
              <h2 className={styles.heading}>運営方針（ポリシー）</h2>
              <p className={styles.text}>
                Ikotsu Lab（遺骨ラボ）は、故人様のご遺骨を扱う専門機関として、透明性の高いサービス提供を約束します。
                料金体系の明瞭化だけでなく、すべての工程をご遺族にご確認いただける「処理レポート」の発行や、
                行政・法令に基づいた適正な処理を徹底しています。
              </p>
              <p className={styles.text}>
                私たちは単なる「作業」ではなく、次世代へご遺骨を繋ぐ、あるいは自然に還すための「大切な儀式の一部」としての責任を持って業務に取り組んでいます。
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className={styles.section}>
              <h2 className={styles.heading}>会社概要</h2>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <tbody>
                    {COMPANY_INFO.map((row) => (
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
