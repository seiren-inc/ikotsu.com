import type { Metadata } from 'next';
import HeroTrust from '@/components/features/HeroTrust';
import TrustStrip from '@/components/sections/TrustStrip';
import SolutionNav from '@/components/features/SolutionNav';
import BentoServices from '@/components/features/BentoServices';
import ProcessTimeline from '@/components/sections/ProcessTimeline';
import PricePreview from '@/components/sections/PricePreview';
import ProductLineup from '@/components/features/ProductLineup';
import DiagnosisTeaser from '@/components/sections/DiagnosisTeaser';
import CaseAuthority from '@/components/sections/CaseAuthority';
import Testimonials from '@/components/sections/Testimonials';
import GuideHub from '@/components/sections/GuideHub';
import CorporateCTA from '@/components/sections/CorporateCTA';
import B2CCTA from '@/components/sections/B2CCTA';
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
      {/* ① トラスト・ヒーロー（流体モーフィング + 権威性バッジ） */}
      <HeroTrust />

      {/* ② 実績数値カウンター */}
      <TrustStrip />

      {/* ③ 目的別ソリューション */}
      <SolutionNav />

      {/* ④ コア・サービス一覧（Bento Grid） */}
      <BentoServices />

      {/* ⑤ 処理フロー */}
      <ProcessTimeline />

      {/* ⑥ 料金の目安 */}
      <PricePreview />

      {/* ⑦ 収骨製品・手元供養ラインナップ */}
      <ProductLineup />

      {/* ⑧ AI診断テザー */}
      <DiagnosisTeaser />

      {/* ⑨ 専門機関としての権威 */}
      <CaseAuthority />

      {/* ⑩ お客様の声 */}
      <Testimonials />

      {/* ⑪ ガイド記事ハブ */}
      <GuideHub />

      {/* ⑫ FAQ */}
      <FAQPreview faqs={faqs} />

      {/* ⑬ 個人向け最終CTA */}
      <B2CCTA />

      {/* ⑭ 法人向けCTA */}
      <CorporateCTA />

      {/* ⑭ 関連サービス */}
      <RelatedServices />

      {/* Structured Data */}
      <JsonLd data={generateBreadcrumbSchema([{ name: 'トップ', href: '/' }])} />
      <JsonLd data={generateFAQSchema(faqs)} />
    </>
  );
}
