import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/motion/FadeIn';
import styles from './thanks.module.css';

export const metadata: Metadata = {
  title: 'お問い合わせを受け付けました | 遺骨.com',
  description: 'お問い合わせありがとうございます。2営業日以内にご連絡いたします。',
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <section className={styles.page}>
      <FadeIn direction="up" className={styles.card}>
        {/* Icon */}
        <div className={styles.iconWrap} aria-hidden="true">
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <circle cx="26" cy="26" r="26" fill="var(--color-primary)" opacity="0.12" />
            <path
              d="M16 26L22 32L36 18"
              stroke="var(--color-primary)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className={styles.title}>お問い合わせを<br />受け付けました</h1>
        <p className={styles.lead}>
          ご連絡いただきありがとうございます。<br />
          <strong>2営業日以内</strong>にご入力のメールアドレスまたはお電話にてご返信いたします。
        </p>

        {/* Info Box */}
        <div className={styles.infoBox}>
          <p className={styles.infoTitle}>お急ぎの場合はお電話ください</p>
          <a href="tel:0800-888-8788" className={styles.tel}>
            0800-888-8788
            <span className={styles.telSmall}>（フリーコール）</span>
          </a>
          <p className={styles.telSub}>受付時間：10:00〜18:00（土日祝対応可）</p>
        </div>

        {/* LINE Friend Add */}
        <div className={styles.lineBox}>
          <p className={styles.lineTitle}>💬 LINEでも相談できます</p>
          <p className={styles.lineText2}>公式LINEアカウントを友だち追加すると、チャット形式でお気軽にご相談いただけます。</p>
          <a
            href="https://line.me/R/ti/p/@956lieqb"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LINE公式アカウントを友だち追加する"
          >
            <Image
              src="/Line_add.jpg"
              alt="LINE 友だち追加"
              width={200}
              height={60}
              style={{ borderRadius: '8px', display: 'block' }}
            />
          </a>
        </div>

        {/* Google Review Prompt */}
        {/* ▼ GoogleビジネスプロフィールのレビューURLが確定したら href を設定してください */}
        <div className={styles.reviewBox}>
          <p className={styles.reviewTitle}>✦ ご利用後はぜひ口コミをお寄せください</p>
          <p className={styles.reviewText}>
            お客様の声は、同じようにお悩みの方への大きな助けになります。
            よろしければ、Googleのクチコミにご感想をお書きいただけると幸いです。
          </p>
          {/* TODO: href を実際のGoogleレビューURLに差し替えてください */}
          <a
            href="#google-review-url"
            className={styles.reviewBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M18.17 9.09H10.2v2.72h4.58c-.64 2.24-2.73 3.82-4.58 3.82a5 5 0 0 1 0-10c1.3 0 2.48.5 3.37 1.32l1.93-1.93A8 8 0 1 0 10.2 18c4.42 0 8-3.58 8-8 0-.31-.02-.62-.04-.91z" fill="#4285F4"/>
            </svg>
            Googleクチコミを書く
          </a>
        </div>

        {/* Back Link */}
        <div className={styles.backLinks}>
          <Link href="/" className={styles.backBtn}>トップページへ戻る</Link>
          <Link href="/guide" className={styles.backBtnSub}>遺骨.comのガイドを読む</Link>
        </div>
      </FadeIn>
    </section>
  );
}
