import type { Metadata } from 'next';
import { JsonLd, generateBreadcrumbSchema } from '@/lib/schema/jsonld';
import ScrollReveal from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/ui/Breadcrumb';
import styles from '@/components/layout/legal.module.css';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | Ikotsu Lab｜粉骨・洗骨の専門機関',
  description: 'Ikotsu Labのプライバシーポリシー。お客様の氏名、連絡先など、個人情報の取り扱いと保護に関する方針を明記しています。',
  alternates: { canonical: '/legal/privacy' },
};

export default function PrivacyPolicyPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'トップ', href: '/' },
    { name: 'プライバシーポリシー', href: '/legal/privacy' },
  ]);

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <ScrollReveal>
            <h1 className={styles.title}>プライバシーポリシー</h1>
            <p className={styles.text}>個人情報の取り扱いに関する方針</p>
          </ScrollReveal>
        </div>
      </section>

      <div className="container" style={{ paddingTop: 'var(--space-8)' }}>
        <Breadcrumb items={[
          { name: 'トップ', href: '/' },
          { name: 'プライバシーポリシー', href: '/legal/privacy' },
        ]} />
      </div>

      <section className={styles.content}>
        <div className="container container--narrow">
          <ScrollReveal>
            <div className={styles.section}>
              <h2 className={styles.heading}>第1条（基本方針）</h2>
              <p className={styles.text}>
                Ikotsu Lab（以下「当機関」といいます）は、お客様の個人情報の重要性を深く認識し、その保護を事業運営上の最重要事項の一つとして位置付けています。当機関は、個人情報の保護に関する法律（以下「個人情報保護法」といいます）およびその他の関連法令、ガイドライン等を遵守し、お客様からお預かりした個人情報を適正に取り扱います。
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className={styles.section}>
              <h2 className={styles.heading}>第2条（取得する個人情報）</h2>
              <p className={styles.text}>
                当機関は、本サービスの提供にあたり、以下の個人情報を適法かつ公正な手段によって取得します。
              </p>
              <ul className={styles.list}>
                <li className={styles.listItem}>氏名、住所、電話番号、メールアドレス等のお客様の連絡先に関する情報</li>
                <li className={styles.listItem}>お預かりする故人様の氏名、ご関係等の情報（埋葬許可証等の公的書類に含まれるもの）</li>
                <li className={styles.listItem}>お問い合わせ内容、ご相談内容、当機関ウェブサイトの利用履歴に関する情報</li>
                <li className={styles.listItem}>お取引に関する決済手段等の情報</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className={styles.section}>
              <h2 className={styles.heading}>第3条（個人情報の利用目的）</h2>
              <p className={styles.text}>
                当機関は、取得した個人情報を以下の目的の範囲内で利用いたします。ご本人の同意がある場合、または法令に基づく場合を除き、これ以外の目的で個人情報を利用することはありません。
              </p>
              <ul className={styles.list}>
                <li className={styles.listItem}>本サービスの提供、運営、およびそれに付随する事務手続き（ご遺骨の引取、発送等）のため</li>
                <li className={styles.listItem}>お客様からのお問い合わせ、ご相談に対する回答やご連絡のため</li>
                <li className={styles.listItem}>サービス内容の確認、書類（処理レポート等）の発行および送付のため</li>
                <li className={styles.listItem}>ご利用料金の請求、支払い確認等の決済関連業務のため</li>
                <li className={styles.listItem}>本サービスの品質向上、改善、および新しいサービスを企画・開発するための調査・分析のため</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className={styles.section}>
              <h2 className={styles.heading}>第4条（個人情報の第三者提供）</h2>
              <p className={styles.text}>
                当機関は、次に掲げる場合を除いて、あらかじめお客様のご同意を得ることなく、第三者に個人情報を提供することはありません。
              </p>
              <ul className={styles.list}>
                <li className={styles.listItem}>法令に基づく場合（警察、裁判所等の公的機関から正当な理由による開示要求があった場合を含みます）</li>
                <li className={styles.listItem}>人の生命、身体または財産の保護のために必要がある場合であって、ご本人の同意を得ることが困難であるとき</li>
                <li className={styles.listItem}>利用目的の達成に必要な範囲内において、決済代行会社や配送業者などの信頼できる業務委託先に対し、個人情報の取り扱いの全部または一部を委託する場合（この場合、当機関は委託先に対して適切な監督を行います）</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className={styles.section}>
              <h2 className={styles.heading}>第5条（個人情報の安全管理）</h2>
              <p className={styles.text}>
                当機関は、お預かりした個人情報の漏洩、滅失、または毀損を防止するため、必要かつ適切な物理的、技術的、および組織的な安全管理措置を講じます。特に、ご遺骨に関する情報等、機微な情報を扱うにあたっては、従業員教育を徹底し、情報の厳重な保護に努めます。
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className={styles.section}>
              <h2 className={styles.heading}>第6条（クッキー等の利用について）</h2>
              <p className={styles.text}>
                当機関のウェブサイトでは、利用状況の把握やサービス向上のため、クッキー（Cookie）および類似する技術（アクセス解析ツール等）を利用する場合があります。これらにより取得される情報は匿名化されており、お客様個人を特定するものではありません。ブラウザの設定によりクッキーの受け取りを拒否することも可能ですが、その場合、ウェブサイトの一部機能がご利用いただけなくなることがあります。
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className={styles.section}>
              <h2 className={styles.heading}>第7条（個人情報の開示・訂正・削除等）</h2>
              <p className={styles.text}>
                お客様がご自身の個人情報の開示、内容の訂正、追加、削除、利用停止等をご希望される場合には、当機関の定める手続きにより、ご本人であることを確認させていただいた上で、法令の定めに従い、遅滞なく誠実に対応いたします。
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className={styles.section}>
              <h2 className={styles.heading}>第8条（プライバシーポリシーの変更）</h2>
              <p className={styles.text}>
                当機関は、個人情報の取り扱いに関する運用状況を適宜見直し、継続的な改善に努めます。そのため、必要に応じて本プライバシーポリシーの内容を変更することがあります。重要な変更がある場合には、当ウェブサイト上にてわかりやすい形でお知らせいたします。
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className={styles.section}>
              <h2 className={styles.heading}>第9条（お問い合わせ窓口）</h2>
              <p className={styles.text}>
                本プライバシーポリシーおよび当機関の個人情報の取り扱いに関するご質問、ご意見、各種ご請求につきましては、以下の窓口までお問い合わせください。<br /><br />
                <strong>Ikotsu Lab 個人情報お問い合わせ窓口</strong><br />
                Email: info@ikotsu-lab.com
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <JsonLd data={breadcrumb} />
    </>
  );
}
