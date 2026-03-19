'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import styles from './HeroSection.module.css';

const ParticleCanvas = dynamic(() => import('@/components/motion/ParticleCanvas'), { ssr: false });

type Tab = 'individual' | 'corporate';

const HERO_CONTENT = {
  individual: {
    badge: '粉骨・洗骨の専門機関',
    title: ['遺骨を、', '工程公開品質で。'],
    accentWord: '工程公開品質',
    description: '全工程・チェックポイントを開示し、\n写真付き報告書で品質を証明します。\n散骨・改葬・保存の前処理を全国対応。',
    badges: ['全工程を公開', '写真報告書付き', '追加費用なし'],
    primaryCta: { label: '無料相談する', href: '/contact' },
    secondaryCta: { label: '工程・料金を確認', href: '/process' },
    particleColor: '#4a7db5',
  },
  corporate: {
    badge: '法人一括委託専用',
    title: ['法人委託を、', 'SLA明示で。'],
    accentWord: 'SLA明示',
    description: '受領書・処理完了報告書・インボイス対応\n月次請求書を発行。NDA締結対応。\n寺院・霊園・葬儀社から月次一括受注。',
    badges: ['SLA明示', 'インボイス対応', 'NDA締結可'],
    primaryCta: { label: '法人相談・資料請求', href: '/for-corporate' },
    secondaryCta: { label: '委託フロー・SLAを確認', href: '/corporate/flow' },
    particleColor: '#4a6fa5',
  },
} as const;

export default function HeroSection() {
  const [tab, setTab] = useState<Tab>('individual');
  const [visible, setVisible] = useState(true);
  const content = HERO_CONTENT[tab];
  const prevTab = useRef<Tab>('individual');

  const handleTabChange = (next: Tab) => {
    if (next === tab) return;
    setVisible(false);
    setTimeout(() => {
      setTab(next);
      prevTab.current = next;
      setVisible(true);
    }, 160);
  };

  // GSAP ScrollTrigger でヒーロー外コンテンツをフェードアップ
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null;
    async function initGSAP() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from('[data-hero-animate]', {
          y: 28,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.15,
        });
      });
    }
    initGSAP();
    return () => { ctx?.revert(); };
  }, [tab]);

  return (
    <section className={styles.hero} aria-label="メインビジュアル">
      {/* Three.js パーティクル背景 */}
      <div className={styles.particleLayer} aria-hidden="true">
        <ParticleCanvas
          count={60}
          color={content.particleColor}
          maxRadius={1.8}
          speed={0.18}
        />
      </div>

      <div className={`container ${styles.heroInner}`}>
        {/* Text Side */}
        <div className={styles.textSide}>

          <div className={styles.tabGroup} role="tablist" aria-label="お客様の種別" data-hero-animate>
            <button
              id="tab-individual"
              role="tab"
              aria-selected={tab === 'individual'}
              aria-controls="hero-tabpanel"
              tabIndex={tab === 'individual' ? 0 : -1}
              className={`${styles.tabBtn} ${tab === 'individual' ? styles['tabBtn--active'] : ''}`}
              onClick={() => handleTabChange('individual')}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                  e.preventDefault();
                  document.getElementById('tab-corporate')?.focus();
                  handleTabChange('corporate');
                }
              }}
            >
              個人のお客様
            </button>
            <button
              id="tab-corporate"
              role="tab"
              aria-selected={tab === 'corporate'}
              aria-controls="hero-tabpanel"
              tabIndex={tab === 'corporate' ? 0 : -1}
              className={`${styles.tabBtn} ${tab === 'corporate' ? styles['tabBtnCorp--active'] : ''}`}
              onClick={() => handleTabChange('corporate')}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                  e.preventDefault();
                  document.getElementById('tab-individual')?.focus();
                  handleTabChange('individual');
                }
              }}
            >
              法人・寺院・霊園
            </button>
          </div>

          {/* Content（タブ切り替え時にフェード） */}
          <div 
            id="hero-tabpanel"
            role="tabpanel"
            aria-labelledby={`tab-${tab}`}
            className={`${styles.contentWrap} ${visible ? styles['contentWrap--visible'] : styles['contentWrap--hidden']}`}
          >
            <span className={styles.label} data-hero-animate>{content.badge}</span>

            <h1 className={styles.title} data-hero-animate>
              {content.title[0]}<br />
              <span className={styles.titleAccent}>{content.accentWord}</span>
              {content.title[1].replace(content.accentWord, '')}
            </h1>

            <p className={styles.description} data-hero-animate>
              {content.description.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </p>

            <div className={styles.actions} data-hero-animate>
              <Button href={content.primaryCta.href} variant="primary" size="lg">
                {content.primaryCta.label}
              </Button>
              <Button href={content.secondaryCta.href} variant="secondary" size="lg">
                {content.secondaryCta.label}
              </Button>
            </div>

            <div className={styles.badges} data-hero-animate>
              {content.badges.map((b) => (
                <div key={b} className={`${styles.badge} ${tab === 'corporate' ? styles.badgeCorp : ''}`}>
                  <span className={styles.badgeIcon}>✓</span>
                  <span className={styles.badgeText}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div className={styles.imageSide} data-hero-animate>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/hero-facility.png"
              alt="Ikotsu.com 専門施設内観 - 清潔で最新設備を備えた処理環境"
              width={640}
              height={640}
              priority
              className={styles.heroImage}
            />
            <div className={styles.imageOverlay} />
            {tab === 'corporate' && (
              <div className={styles.corpImageBadge}>
                <span>法人専任窓口</span>
                <strong>SLA・NDA・インボイス対応</strong>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.bgGradient} aria-hidden="true" />
    </section>
  );
}
