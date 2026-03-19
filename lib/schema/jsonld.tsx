import { SITE_URL } from '@/lib/seo/metadata';

/* ── Organization ── */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '遺骨.com',
    alternateName: '遺骨.com',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    description: '粉骨・洗骨の専門機関。写真報告書付き・料金透明・全国対応。',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '戸塚町4170 高橋ビル1F',
      addressLocality: '横浜市戸塚区',
      addressRegion: '神奈川県',
      postalCode: '244-0003',
      addressCountry: 'JP',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+81-800-888-8788',
      contactType: 'customer service',
      availableLanguage: 'Japanese',
    },
    parentOrganization: {
      '@type': 'Organization',
      name: '株式会社清蓮',
      url: 'https://seiren-corp.com',
    },
  };
}

/* ── LocalBusiness ── */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: '遺骨.com',
    url: SITE_URL,
    telephone: '0800-888-8788',
    email: 'info@ikotsu.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '戸塚町4170 高橋ビル1F',
      addressLocality: '横浜市戸塚区',
      addressRegion: '神奈川県',
      postalCode: '244-0003',
      addressCountry: 'JP',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 35.4437,
      longitude: 139.6380,
    },
    openingHours: 'Mo-Sa 09:00-18:00',
    priceRange: '¥¥',
  };
}

/* ── BreadcrumbList ── */
export function generateBreadcrumbSchema(
  items: { name: string; href: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

/* ── FAQPage ── */
export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/* ── Service ── */
export function generateServiceSchema(params: {
  name: string;
  description: string;
  url: string;
  provider?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    description: params.description,
    url: `${SITE_URL}${params.url}`,
    provider: {
      '@type': 'Organization',
      name: params.provider || '遺骨.com',
    },
    areaServed: {
      '@type': 'Country',
      name: 'JP',
    },
  };
}

/* ── Article ── */
export function generateArticleSchema(params: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  author?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.title,
    description: params.description,
    url: `${SITE_URL}${params.url}`,
    datePublished: params.datePublished,
    dateModified: params.dateModified,
    author: {
      '@type': 'Organization',
      name: params.author || '遺骨.com',
    },
    publisher: {
      '@type': 'Organization',
      name: '遺骨.com',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    ...(params.image ? { image: params.image } : {}),
  };
}

/* ── HowTo ── */
export function generateHowToSchema(params: {
  name: string;
  description: string;
  totalTime?: string; // ISO 8601 duration e.g. "P7D"
  steps: { name: string; text: string; image?: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: params.name,
    description: params.description,
    ...(params.totalTime ? { totalTime: params.totalTime } : {}),
    step: params.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.image ? { image: s.image } : {}),
    })),
  };
}

/* ── JSON-LD Script ── */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
