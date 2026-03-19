import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import TrustStrip from '@/components/sections/TrustStrip';
import ServiceCards from '@/components/sections/ServiceCards';
import ProcessTimeline from '@/components/sections/ProcessTimeline';
import PricePreview from '@/components/sections/PricePreview';
import DiagnosisTeaser from '@/components/sections/DiagnosisTeaser';
import CaseAuthority from '@/components/sections/CaseAuthority';
import Testimonials from '@/components/sections/Testimonials';
import GuideHub from '@/components/sections/GuideHub';
import CorporateCTA from '@/components/sections/CorporateCTA';
import FAQPreview from '@/components/sections/FAQPreview';
import RelatedServices from '@/components/sections/RelatedServices';
import { JsonLd, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema/jsonld';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: '遺骨.com｜粉骨・洗骨の専門機関',
  description:
    '粉骨・洗骨の専門機関 遺骨.com。写真報告書付き・料金透明・全国対応。散骨・改葬・保存のための遺骨前処理を専門機関品質で提供します。',
  alternates: {
    canonical: '/',
  },
};

export default async function Home() {
  // DBからトップページ用FAQを取得
  let rawFaqs: Array<{ question: string; answer: string }> = [];
  try {
    const fetched = await prisma.ikotsuFaqItem.findMany({
      where: { category: 'general', page_slug: '/', is_published: true },
      select: { question: true, answer: true },
      orderBy: { sort_order: 'asc' }
    });
    if (fetched && fetched.length > 0) {
      rawFaqs = fetched;
    }
  } catch (err) {
    // 開発環境や未反映時のフォールバック用に握りつぶす
  }

  const faqs = rawFaqs;

  return (
    <>
      <HeroSection />
      <TrustStrip />
      <ServiceCards />
      <ProcessTimeline />
      <PricePreview />
      <DiagnosisTeaser />
      <CaseAuthority />
      <Testimonials />
      <GuideHub />
      <CorporateCTA />
      <FAQPreview faqs={faqs} />
      <RelatedServices />

      {/* Structured Data */}
      <JsonLd data={generateBreadcrumbSchema([{ name: 'トップ', href: '/' }])} />
      <JsonLd data={generateFAQSchema(faqs)} />
    </>
  );
}
