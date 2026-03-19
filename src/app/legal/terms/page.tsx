import type { Metadata } from 'next';
import { JsonLd, generateBreadcrumbSchema } from '@/lib/schema/jsonld';
import ScrollReveal from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/ui/Breadcrumb';
import styles from '@/components/layout/legal.module.css';

export const metadata: Metadata = {
  title: '利用規約 | Ikotsu.com｜粉骨・洗骨の専門機関',
  description: 'Ikotsu.comのサービス利用規約。ご遺骨のお預かり、処理に関する合意事項や免責事項について定めています。',
  alternates: { canonical: '/legal/terms' },
};

export default function TermsPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'トップ', href: '/' },
    { name: '利用規約', href: '/legal/terms' },
  ]);

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <ScrollReveal>
            <h1 className={styles.title}>利用規約</h1>
            <p className={styles.text}>本サービスのご利用に関する合意事項</p>
          </ScrollReveal>
        </div>
      </section>

      <div className="container" style={{ paddingTop: 'var(--space-8)' }}>
        <Breadcrumb items={[
          { name: 'トップ', href: '/' },
          { name: '利用規約', href: '/legal/terms' },
        ]} />
      </div>

      <section className={styles.content}>
        <div className="container container--narrow">
          <ScrollReveal>
            <div className={styles.section}>
              <h2 className={styles.heading}>第1条（目的と適用）</h2>
              <p className={styles.text}>
                本規約は、Ikotsu.com（以下「当機関」といいます）が提供する粉骨、洗骨、その他ご遺骨に関連する一切のサービス（以下「本サービス」といいます）の提供条件及び、当機関とお客様との間の権利義務関係を定めるものです。
                お客様は、本サービスを利用することにより、本規約の全ての記載内容に同意したものとみなされます。
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className={styles.section}>
              <h2 className={styles.heading}>第2条（サービスのお申し込みと契約の成立）</h2>
              <ul className={styles.list}>
                <li className={styles.listItem}>お申し込みは、当機関が指定するフォーム、書面、または電子メールによる手続をもって行われます。</li>
                <li className={styles.listItem}>当機関がお客様からのお申し込みを受領し、作業の承諾を通知した時点で、本サービスの利用契約が成立するものとします。</li>
                <li className={styles.listItem}>お申し込みにあたり、ご遺骨の身元確認書類（埋葬許可証、改葬許可証など）および申込者の身分証明書の提示を必須とします。これらが確認できない場合、サービスを提供することはできません。</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className={styles.section}>
              <h2 className={styles.heading}>第3条（ご遺骨の取り扱いと所有権）</h2>
              <ul className={styles.list}>
                <li className={styles.listItem}>当機関は、お預かりしたご遺骨を最大の敬意をもって取り扱い、紛失・損壊の防止に努めます。</li>
                <li className={styles.listItem}>ご依頼いただくご遺骨は、申込者が適法に祭祀を主宰する権限を有しているものに限ります。万一、第三者との間に親族間トラブルや法的紛争が生じた場合、当機関は一切の責任を負いません。</li>
                <li className={styles.listItem}>粉骨・洗骨処理といった性質上、作業後のご遺骨を元の状態（骨塊）に戻すことはできません。この点をご理解の上でお申し込みください。</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className={styles.section}>
              <h2 className={styles.heading}>第4条（料金および支払方法）</h2>
              <p className={styles.text}>
                本サービスの利用料金は、別途当機関が定める料金表によります。
                お支払いは、当機関が指定する方法（銀行振込、クレジットカード決済等）により、指定期日までに行っていただくものとします。
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className={styles.section}>
              <h2 className={styles.heading}>第5条（免責事項）</h2>
              <ul className={styles.list}>
                <li className={styles.listItem}>天災地変、火災、運送中の事故など、当機関の責に帰すことができない事由によりご遺骨の滅失・毀損が生じた場合、当機関はその損害賠償責任を負わないものとします。</li>
                <li className={styles.listItem}>お預かりしたご遺骨に、お申し込み時に申告のなかった著しい汚染、有害物質の付着、あるいは違法な内容物が含まれていた場合、当機関の判断で作業を中止し、返却することがあります。</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className={styles.section}>
              <h2 className={styles.heading}>第6条（キャンセル・返品）</h2>
              <p className={styles.text}>
                本サービスの性質上、処理作業を開始した後のキャンセルおよび返品はお受けできません。
                作業開始前（ご遺骨到着・検閲前）に限り、キャンセルのお申し出を受け付けますが、送付にかかった費用などはお客様のご負担となります。
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className={styles.section}>
              <h2 className={styles.heading}>第7条（規約の変更）</h2>
              <p className={styles.text}>
                当機関は、必要と判断した場合には、お客様に通知することなくいつでも本規約を変更することができるものとします。
                変更後の規約は、本ウェブサイト上に掲示した時点から効力を生じるものとします。
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <JsonLd data={breadcrumb} />
    </>
  );
}
