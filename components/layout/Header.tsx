'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import styles from './Header.module.css';

const NAV_ITEMS = [
  {
    label: 'サービス',
    href: '/services',
    dropdown: [
      { label: '粉骨', href: '/services/powdered', description: '遺骨を細かく砕く専門処理' },
      { label: '洗骨', href: '/services/cleaning', description: 'カビ・汚れの除去と洗浄' },
      { label: '出張・搬送', href: '/services/carrying', description: '全国対応の出張引取り' },
      { label: 'お引取り', href: '/services/takeout', description: '遠方・高齢の方向け' },
    ],
  },
  { label: '法人の方へ', href: '/for-corporate' },
  { label: 'ガイド', href: '/guide' },
  { label: '料金目安', href: '/pricing' },
  { label: '会社情報', href: '/company' },
  { label: 'お問い合わせ', href: '/contact' },
] as const;

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const handleDropdownEnter = useCallback((label: string) => {
    setActiveDropdown(label);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles['header--scrolled'] : ''}`}
      role="banner"
    >
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="Ikotsu.com トップページへ">
          <span className={styles.logoMark}>Ikotsu</span>
          <span className={styles.logoAccent}>Lab</span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav} aria-label="メインナビゲーション">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li
                key={item.label}
                className={styles.navItem}
                onMouseEnter={
                  'dropdown' in item ? () => handleDropdownEnter(item.label) : undefined
                }
                onMouseLeave={'dropdown' in item ? handleDropdownLeave : undefined}
              >
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${isActive(item.href) ? styles['navLink--active'] : ''}`}
                  aria-haspopup={'dropdown' in item ? 'true' : undefined}
                  aria-expanded={
                    'dropdown' in item ? activeDropdown === item.label : undefined
                  }
                >
                  {item.label}
                  {'dropdown' in item && (
                    <svg
                      className={styles.chevron}
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 5L6 8L9 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </Link>

                {'dropdown' in item && activeDropdown === item.label && (
                  <div className={styles.dropdown} role="menu">
                    <div className={styles.dropdownInner}>
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={styles.dropdownItem}
                          role="menuitem"
                        >
                          <span className={styles.dropdownLabel}>{sub.label}</span>
                          <span className={styles.dropdownDesc}>{sub.description}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <div className={styles.headerCta}>
          <Button href="/contact" variant="primary" size="sm">
            無料相談
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`${styles.burger} ${isMobileOpen ? styles['burger--open'] : ''}`}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={isMobileOpen}
        >
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${isMobileOpen ? styles['mobileMenu--open'] : ''}`}
        aria-hidden={!isMobileOpen}
      >
        <nav aria-label="モバイルナビゲーション">
          <ul className={styles.mobileNavList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className={styles.mobileNavItem}>
                <Link
                  href={item.href}
                  className={`${styles.mobileNavLink} ${isActive(item.href) ? styles['mobileNavLink--active'] : ''}`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {'dropdown' in item && (
                  <ul className={styles.mobileSubList}>
                    {item.dropdown.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          className={styles.mobileSubLink}
                          onClick={() => setIsMobileOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className={styles.mobileCta}>
            <Button href="/contact" variant="primary" size="lg" className={styles.mobileCtaBtn}>
              無料相談
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
