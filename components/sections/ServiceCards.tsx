import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/motion/FadeIn';
import StaggerChildren, { StaggerItem } from '@/components/motion/StaggerChildren';
import BlurReveal from '@/components/motion/BlurReveal';
import styles from './ServiceCards.module.css';

const SERVICES = [
  {
    slug: 'powdered',
    title: '粉骨',
    description: '遺骨を細かく砕く専門処理。散骨・改葬・保存に対応。',
    image: '/images/process-grinding.png',
    price: '30,000円〜（目安）',
  },
  {
    slug: 'cleaning',
    title: '洗骨',
    description: 'カビ・汚れの除去と専門洗浄。衛生管理を徹底。',
    image: '/images/process-washing.png',
    price: '30,000円〜（目安）',
  },
  {
    slug: 'carrying',
    title: '出張・搬送',
    description: '全国対応の出張引取り・搬送サービス。',
    image: '/images/hero-facility.png',
    price: '10,000円〜（目安）',
  },
  {
    slug: 'takeout',
    title: 'お引取り',
    description: '遠方・高齢の方向けの遺骨お引取りサービス。',
    image: '/images/hero-facility.png',
    price: '10,000円〜（目安）',
  },
] as const;

export default function ServiceCards() {
  return (
    <section className="section" aria-label="サービス一覧">
      <div className="container">
        <FadeIn>
          <div className="section__header">
            <span className="section__label">Services</span>
            <h2 className="section__title">専門サービス</h2>
            <p className="section__description">
              遺骨の状態・ご希望に応じた最適な処理を、専門機関品質でご提供します。
            </p>
          </div>
        </FadeIn>
        <StaggerChildren className={styles.grid} staggerDelay={0.1}>
          {SERVICES.map((service) => (
            <StaggerItem key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className={styles.card}
                aria-label={`${service.title}の詳細を見る`}
              >
                <div className={styles.imageWrapper}>
                  <BlurReveal>
                    <Image
                      src={service.image}
                      alt={`${service.title}の処理工程`}
                      width={400}
                      height={280}
                      className={styles.image}
                    />
                  </BlurReveal>
                </div>
                <div className={styles.body}>
                  <h3 className={styles.title}>{service.title}</h3>
                  <p className={styles.description}>{service.description}</p>
                  <span className={styles.price}>{service.price}</span>
                  <span className={styles.link}>
                    詳しく見る
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
