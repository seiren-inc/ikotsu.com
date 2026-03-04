import Link from 'next/link';
import styles from './Footer.module.css';

const FOOTER_LINKS = {
  services: {
    title: 'サービス',
    links: [
      { label: '粉骨', href: '/services/powdered' },
      { label: '洗骨', href: '/services/cleaning' },
      { label: '出張・搬送', href: '/services/carrying' },
      { label: 'お引取り', href: '/services/takeout' },
      { label: '料金目安', href: '/pricing' },
    ],
  },
  corporate: {
    title: '法人の方へ',
    links: [
      { label: '法人サービス', href: '/for-corporate' },
    ],
  },
  guide: {
    title: 'ガイド',
    links: [
      { label: 'ガイド一覧', href: '/guide' },
    ],
  },
  legal: {
    title: '法的表記',
    links: [
      { label: '利用規約', href: '/legal/terms' },
      { label: 'プライバシーポリシー', href: '/legal/privacy' },
      { label: '特定商取引法に基づく表記', href: '/legal/tokushoho' },
    ],
  },
  company: {
    title: '会社情報',
    links: [
      { label: '会社概要', href: '/company' },
      { label: 'お問い合わせ', href: '/contact' },
    ],
  },
  related: {
    title: '関連サービス',
    links: [
      { label: '散骨クルーズ', href: 'https://sankotsu-cruise.com', external: true },
      { label: 'お墓探しナビ', href: 'https://ohaka-navi.com', external: true },
      { label: 'お墓じまいナビ', href: 'https://ohaka-jimai.com', external: true },
      { label: '遺骨ダイヤモンドアドバイザー', href: 'https://ikotsu-diamond.com', external: true },
      { label: '終活コンシェルジュ', href: 'https://shukatsu-concierge.com', external: true },
      { label: '清蓮コーポレート', href: 'https://seiren-corp.com', external: true },
    ],
  },
} as const;

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        {/* Top Section */}
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo} aria-label="Ikotsu.com トップページ">
              <span className={styles.logoMark}>Ikotsu</span>
              <span className={styles.logoAccent}>Lab</span>
            </Link>
            <p className={styles.tagline}>
              粉骨・洗骨の専門機関
            </p>
            <p className={styles.brandDescription}>
              工程公開・料金透明・全国対応。
              <br />
              遺骨の前処理を専門機関品質で。
            </p>
          </div>

          {/* Link Columns */}
          <div className={styles.columns}>
            {Object.values(FOOTER_LINKS).map((section) => (
              <div key={section.title} className={styles.column}>
                <h3 className={styles.columnTitle}>{section.title}</h3>
                <ul className={styles.columnList}>
                  {section.links.map((link) => (
                    <li key={link.href}>
                      {'external' in link && link.external ? (
                        <a
                          href={link.href}
                          className={styles.columnLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                          <svg
                            className={styles.externalIcon}
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M9 3L3 9M9 3H5M9 3V7"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      ) : (
                        <Link href={link.href} className={styles.columnLink}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottom}>
          <div className={styles.companyInfo}>
            <p>運営：株式会社清蓮</p>
            <p>〒231-0000 神奈川県横浜市中区（詳細住所）</p>
            <p>
              TEL：<a href="tel:0120-000-000">0120-000-000</a>
              {' '}／ MAIL：<a href="mailto:info@ikotsu.com">info@ikotsu.com</a>
            </p>
          </div>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Ikotsu.com / 株式会社清蓮. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
