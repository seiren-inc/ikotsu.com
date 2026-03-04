import type { Metadata } from 'next';
import ScrollReveal from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { JsonLd, generateBreadcrumbSchema } from '@/lib/schema/jsonld';

export const metadata: Metadata = {
  title: 'プライバシーポリシー・特定商取引法 | Ikotsu Lab',
  description: 'Ikotsu Labのプライバシーポリシーおよび特定商取引法に基づく表記。',
  alternates: { canonical: '/legal' },
  robots: { index: false, follow: false },
};

export default function LegalPage() {
  return (
    <>
      <section style={{
        background: 'var(--bg-secondary)',
        padding: 'var(--space-20) 0 var(--space-12)',
        borderBottom: '1px solid var(--border-light)',
      }}>
        <div className="container">
          <ScrollReveal>
            <h1 style={{
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--text-primary)',
            }}>法的情報</h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container">
        <Breadcrumb items={[
          { name: 'トップ', href: '/' },
          { name: '法的情報', href: '/legal' },
        ]} />
      </div>

      <section className="section">
        <div className="container container--narrow">
          <ScrollReveal>
            {/* Privacy Policy */}
            <div style={{ marginBottom: 'var(--space-16)' }}>
              <h2 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-6)',
                paddingBottom: 'var(--space-3)',
                borderBottom: '2px solid var(--border-light)',
              }}>プライバシーポリシー</h2>
              {[
                {
                  heading: '個人情報の取得について',
                  body: '当サービスでは、お問い合わせフォームを通じてお名前・メールアドレス・電話番号等の個人情報を取得します。',
                },
                {
                  heading: '個人情報の利用目的',
                  body: '取得した個人情報は、ご相談内容への回答・見積もりの作成・サービスのご案内のためにのみ使用します。第三者への提供・販売は一切行いません。',
                },
                {
                  heading: '個人情報の管理',
                  body: 'お預かりした個人情報は、適切なセキュリティ対策を講じた環境で管理します。不要になった個人情報は速やかに削除します。',
                },
                {
                  heading: '個人情報の開示・訂正・削除',
                  body: 'ご本人から個人情報の開示・訂正・削除のご要望があった場合は、合理的な範囲で速やかに対応します。ご連絡はinfo@ikotsu-lab.comまでお願いします。',
                },
                {
                  heading: 'Cookieの使用',
                  body: '当サービスではGoogle Analyticsを使用しています。Cookieを通じてアクセス情報を収集しますが、個人を特定する情報は含まれません。',
                },
              ].map((section) => (
                <div key={section.heading} style={{ marginBottom: 'var(--space-6)' }}>
                  <h3 style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-semibold)',
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--space-2)',
                  }}>{section.heading}</h3>
                  <p style={{
                    fontSize: 'var(--text-base)',
                    color: 'var(--text-secondary)',
                    lineHeight: 'var(--leading-relaxed)',
                  }}>{section.body}</p>
                </div>
              ))}
            </div>

            {/* 特定商取引法 */}
            <div>
              <h2 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-6)',
                paddingBottom: 'var(--space-3)',
                borderBottom: '2px solid var(--border-light)',
              }}>特定商取引法に基づく表記</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {[
                    { label: '販売事業者', value: '株式会社清蓮（Seiren Inc.）' },
                    { label: '代表責任者', value: '（代表者名）' },
                    { label: '住所', value: '神奈川県横浜市中区（詳細住所）※請求のあった場合に遅滞なく開示' },
                    { label: '電話番号', value: '0120-000-000（平日 9:00〜18:00）' },
                    { label: 'メール', value: 'info@ikotsu-lab.com' },
                    { label: '販売価格', value: '各サービスの料金ページに記載の通り（税込）' },
                    { label: 'お支払い方法', value: '銀行振込（詳細はお申込み時にご案内します）' },
                    { label: 'サービス提供時期', value: 'お申込み・ご入金確認後、別途ご連絡する日程で実施' },
                    { label: 'キャンセル・返品', value: '処理開始前のキャンセルは受付可。処理完了後のキャンセル・返品は対応不可。' },
                    { label: '特別な販売条件', value: '特になし' },
                  ].map((row) => (
                    <tr key={row.label} style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <th style={{
                        width: '160px',
                        padding: 'var(--space-4) var(--space-5)',
                        textAlign: 'left',
                        fontWeight: 'var(--font-semibold)',
                        color: 'var(--text-primary)',
                        background: 'var(--bg-secondary)',
                        verticalAlign: 'top',
                        fontSize: 'var(--text-sm)',
                      }}>{row.label}</th>
                      <td style={{
                        padding: 'var(--space-4) var(--space-5)',
                        color: 'var(--text-secondary)',
                        fontSize: 'var(--text-sm)',
                        lineHeight: 'var(--leading-relaxed)',
                      }}>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <JsonLd data={generateBreadcrumbSchema([
        { name: 'トップ', href: '/' },
        { name: '法的情報', href: '/legal' },
      ])} />
    </>
  );
}
