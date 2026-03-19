import type { Metadata } from 'next';
import Image from 'next/image';
import ScrollReveal from '@/components/motion/ScrollReveal';
import ContactForm from '@/components/forms/ContactForm';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { JsonLd, generateBreadcrumbSchema } from '@/lib/schema/jsonld';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'お問い合わせ・無料相談 | Ikotsu.com｜粉骨・洗骨の専門機関',
  description:
    '粉骨・洗骨・出張搬送などのご相談はこちら。Ikotsu.comは無料相談受付中。フォーム・電話どちらでも対応。2営業日以内にご連絡します。',
  alternates: { canonical: '/contact' },
};

const CONTACT_POINTS = [
  {
    icon: '✉',
    title: 'フォームから相談',
    desc: '24時間受付。2営業日以内にメールでご連絡します。',
  },
  {
    icon: '☎',
    title: '電話で相談',
    desc: `0800-888-8788（フリーコール）/ 045-881-9952（代表）
受付時間：10:00～18:00（土日祈対応可）`,
  },
  {
    icon: '💬',
    title: 'LINEで相談',
    desc: '公式アカウントでチャット形式でお問い合わせいただけます。',
    href: 'https://line.me/R/ti/p/@956lieqb',
  },
  {
    icon: '✓',
    title: '相談は無料',
    desc: '料金・工程・日数をお伝えするだけの相談は費用不要です。',
  },
];

export default function ContactPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'トップ', href: '/' },
    { name: 'お問い合わせ', href: '/contact' },
  ]);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <ScrollReveal>
            <span className="section__label">Contact</span>
            <h1 className={styles.heroTitle}>お問い合わせ・無料相談</h1>
            <p className={styles.heroLead}>
              遺骨の状態・ご希望をお聞きして、最適なサービスと料金・日数をご案内します。
              相談のみのお問い合わせも歓迎です。
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container">
        <Breadcrumb items={[
          { name: 'トップ', href: '/' },
          { name: 'お問い合わせ', href: '/contact' },
        ]} />
      </div>

      {/* Contact Points */}
      <section className="section section--alt">
        <div className="container">
          <div className={styles.contactPoints}>
            {CONTACT_POINTS.map((pt, i) => (
              <ScrollReveal key={pt.title} delay={i * 80}>
                <div className={styles.contactPoint}>
                  <span className={styles.contactPointIcon} aria-hidden="true">{pt.icon}</span>
                  <p className={styles.contactPointTitle}>{pt.title}</p>
                  <p className={styles.contactPointDesc}>{pt.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* LINE Banner */}
      <section className="section" aria-label="LINE友だち追加">
        <div className="container container--narrow">
          <ScrollReveal>
            <div className={styles.lineSection}>
              <div className={styles.lineText}>
                <p className={styles.lineTitle}>LINEでも相談できます</p>
                <p className={styles.lineDesc}>
                  公式LINEアカウントを友だち追加すると、チャット形式でお気軽にご相談いただけます。
                </p>
              </div>
              <a
                href="https://line.me/R/ti/p/@956lieqb"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.lineImgLink}
                aria-label="LINE公式アカウントを友だち追加する"
              >
                <Image
                  src="/Line_add.jpg"
                  alt="LINE 友だち追加"
                  width={240}
                  height={72}
                  className={styles.lineImg}
                />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Form */}
      <section className="section">
        <div className="container container--narrow">
          <ScrollReveal>
            <div className="section__header">
              <span className="section__label">Form</span>
              <h2 className="section__title">お問い合わせフォーム</h2>
              <p className="section__description">
                必要事項をご入力のうえ、「送信する」ボタンを押してください。
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div className={styles.formWrapper}>
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Notes */}
      <section className="section section--alt">
        <div className="container container--narrow">
          <ScrollReveal>
            <div className={styles.notesBox}>
              <h2 className={styles.notesTitle}>ご注意・よくある確認事項</h2>
              <ul className={styles.notesList}>
                <li>ご相談内容は、弊社スタッフのみが確認します。第三者に開示することはありません。</li>
                <li>返信は受付から2営業日以内を目安にしています。順番にご対応しています。</li>
                <li>お急ぎの場合は、フリーコール（0800-888-8788）または045-881-9952にてご連絡ください。</li>
                <li>法人・寺院・葬儀社などの法人窓口は、
                  <a href="/for-corporate" className={styles.notesLink}>法人向けページ</a>
                  よりお問い合わせください。
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <JsonLd data={breadcrumb} />
    </>
  );
}
