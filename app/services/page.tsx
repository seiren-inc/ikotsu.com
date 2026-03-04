import type { Metadata } from 'next';
import FadeIn from '@/components/motion/FadeIn';
import StaggerChildren, { StaggerItem } from '@/components/motion/StaggerChildren';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import FAQPreview from '@/components/sections/FAQPreview';
import { JsonLd, generateBreadcrumbSchema } from '@/lib/schema/jsonld';
import styles from './service.module.css';

export const metadata: Metadata = {
  title: '専門サービス一覧｜粉骨・洗骨の専門機関 Ikotsu Lab',
  description: 'Ikotsu Labの提供する専門処理サービス（粉骨・洗骨・出張引取り等）の一覧と比較表。散骨・手元供養・改葬など、目的に合わせた最適なプランと料金をご確認いただけます。',
  alternates: {
    canonical: '/services',
  },
};

const SERVICES_OVERVIEW = [
  {
    slug: 'powdered',
    title: '粉骨（パウダー化）',
    purpose: '散骨・改葬・手元供養のため',
    price: '30,000円〜',
    duration: '3〜5営業日',
    features: ['六価クロム還元処理', 'UV殺菌・乾燥', '専用真空パック'],
    image: '/images/process-grinding.png',
  },
  {
    slug: 'cleaning',
    title: '洗骨（専用洗浄）',
    purpose: 'お墓からの取り出し・カビ除去',
    price: '30,000円〜',
    duration: '5〜7営業日',
    features: ['超音波洗浄', '専用薬液処理', '完全乾燥'],
    image: '/images/process-washing.png',
  },
  {
    slug: 'carrying',
    title: '出張・搬送',
    purpose: 'ご自宅や霊園からの安全な運搬',
    price: '10,000円〜（地域別）',
    duration: 'ご希望日時ご相談',
    features: ['専門スタッフ対応', '専用車両', '全国47都道府県対応'],
    image: '/images/hero-facility.png',
  },
  {
    slug: 'takeout',
    title: 'お引取り',
    purpose: '遠方・来社困難な方向け',
    price: '10,000円〜',
    duration: '最短即日手配',
    features: ['専用梱包キット送付', 'ゆうパック対応', '到着後即時報告'],
    image: '/images/hero-facility.png',
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema([
        { name: 'トップ', href: '/' },
        { name: 'サービス一覧', href: '/services' }
      ])} />

      {/* Hero */}
      <section className={styles.hero} aria-label="サービス一覧 ヒーロー領域">
        <div className="container container--narrow">
          <FadeIn direction="up">
            <h1 className={styles.heroTitle}>専門サービス一覧</h1>
            <p className={styles.heroDescription}>
              遺骨の状態やご利用目的（散骨・手元供養・改葬など）に合わせて、
              最適な専門処理をご提供します。
              全工程で品質・透明性・適正価格をお約束します。
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section" aria-label="サービス比較表">
        <div className="container">
          <FadeIn direction="up">
            <h2 className={styles.sectionTitle}>サービス比較・一覧</h2>
            
            <div className={styles.tableWrapper}>
              <table className={styles.comparisonTable}>
                <thead>
                  <tr>
                    <th>サービス名</th>
                    <th>主な目的・用途</th>
                    <th>目安費用（税込）</th>
                    <th>所要日数</th>
                    <th>詳細</th>
                  </tr>
                </thead>
                <tbody>
                  {SERVICES_OVERVIEW.map((service) => (
                    <tr key={service.slug}>
                      <td className={styles.tdTitle}>{service.title}</td>
                      <td>{service.purpose}</td>
                      <td className={styles.tdPrice}>{service.price}</td>
                      <td>{service.duration}</td>
                      <td>
                        <Link href={`/services/${service.slug}`} className={styles.tableLink}>
                          詳細を見る →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Cards List */}
      <section className="section section--alt" aria-label="各サービスの詳細導線">
        <div className="container">
          <StaggerChildren className={styles.cardsGrid} staggerDelay={0.1}>
            {SERVICES_OVERVIEW.map((service) => (
              <StaggerItem key={service.slug}>
                <div className={styles.serviceCard}>
                  <div className={styles.cardImageWrapper}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={600}
                      height={400}
                      className={styles.cardImage}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{service.title}</h3>
                    <p className={styles.cardPurpose}>【推奨】{service.purpose}</p>
                    <ul className={styles.cardFeatures}>
                      {service.features.map(feature => (
                        <li key={feature}>✓ {feature}</li>
                      ))}
                    </ul>
                    <div className={styles.cardFooter}>
                      <div className={styles.cardPriceWrapper}>
                        <span className={styles.cardPriceLabel}>目安:</span>
                        <span className={styles.cardPriceTarget}>{service.price}</span>
                      </div>
                      <Button href={`/services/${service.slug}`} variant="primary">
                        サービス詳細を見る
                      </Button>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Shared FAQ */}
      <FAQPreview />

      {/* Bottom CTA */}
      <section className="section" aria-label="お問い合わせ">
        <div className="container container--narrow text-center">
          <FadeIn direction="up">
            <h2 className={styles.ctaTitle}>どのサービスを選べばよいか迷ったら</h2>
            <p className={styles.ctaDesc}>
              ご遺骨の現状をお伺いし、最適なプランとお見積りをご案内いたします。
              まずはお気軽にご相談ください。
            </p>
            <div className={styles.ctaActions}>
              <Button href="/diagnosis" variant="secondary" size="lg">
                30秒のAI診断から始める
              </Button>
              <Button href="/contact" variant="primary" size="lg">
                無料相談・お見積り
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
