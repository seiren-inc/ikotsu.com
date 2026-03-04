import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import TrustStrip from '@/components/sections/TrustStrip';
import ServiceCards from '@/components/sections/ServiceCards';
import ProcessTimeline from '@/components/sections/ProcessTimeline';
import PricePreview from '@/components/sections/PricePreview';
import DiagnosisTeaser from '@/components/sections/DiagnosisTeaser';
import CaseAuthority from '@/components/sections/CaseAuthority';
import GuideHub from '@/components/sections/GuideHub';
import CorporateCTA from '@/components/sections/CorporateCTA';
import FAQPreview from '@/components/sections/FAQPreview';
import RelatedServices from '@/components/sections/RelatedServices';
import { JsonLd, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema/jsonld';

export const metadata: Metadata = {
  title: 'Ikotsu.com｜粉骨・洗骨の専門機関',
  description:
    '粉骨・洗骨の専門機関 Ikotsu.com（遺骨.com）。工程公開・料金透明・全国対応。散骨・改葬・保存のための遺骨前処理を専門機関品質で提供します。',
  alternates: {
    canonical: '/',
  },
};

const TOP_FAQS = [
  { question: '粉骨とは何ですか？', answer: '粉骨とは、遺骨を専用の機械で細かいパウダー状に砕く処理のことです。散骨・改葬・手元供養など、さまざまな用途に対応するための前処理として行われます。' },
  { question: '粉骨の費用はいくらですか？', answer: '一般的な目安は30,000円〜です。遺骨の量や状態、追加オプションにより変動します。' },
  { question: '洗骨は必要ですか？', answer: 'カビや湿気による変色・汚れがある場合に推奨されます。' },
  { question: '遠方ですが利用できますか？', answer: '全国47都道府県に対応しています。専用の梱包キットをお送りし、ご郵送いただく方法と、出張引取りの方法がございます。' },
  { question: '処理にかかる日数は？', answer: '目安として粉骨は3〜5営業日、洗骨は5〜7営業日です。' },
  { question: '遺骨の一部だけの処理は可能ですか？', answer: '可能です。手元供養用に一部を残し、残りを粉骨するなど、ご希望に応じた対応が可能です。' },
  { question: '法人での依頼は可能ですか？', answer: '寺院・納骨堂・霊園・葬儀社など、法人のお客様からのご依頼を多数お受けしています。' },
  { question: '追加料金は発生しますか？', answer: 'お見積り時にご案内した料金以外の追加費用は原則発生しません。' },
  { question: '粉骨後の遺骨はどのように返送されますか？', answer: '専用の密封容器に収め、エアキャップと専用箱で丁寧に梱包して返送いたします。' },
  { question: '散骨は代行してもらえますか？', answer: '粉骨処理は当社にて行います。散骨については、グループサービスの「散骨クルーズ」をご紹介しています。' },
];

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <ServiceCards />
      <ProcessTimeline />
      <PricePreview />
      <DiagnosisTeaser />
      <CaseAuthority />
      <GuideHub />
      <CorporateCTA />
      <FAQPreview />
      <RelatedServices />

      {/* Structured Data */}
      <JsonLd data={generateBreadcrumbSchema([{ name: 'トップ', href: '/' }])} />
      <JsonLd data={generateFAQSchema(TOP_FAQS)} />
    </>
  );
}
