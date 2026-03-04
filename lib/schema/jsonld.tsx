import { SITE_URL } from '@/lib/seo/metadata';

/* ── Organization ── */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ikotsu.com（遺骨.com）',
    alternateName: '遺骨.com',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    description: '粉骨・洗骨の専門機関。工程公開・料金透明・全国対応。',
    address: {
      '@type': 'PostalAddress',
      addressLocality: '横浜市',
      addressRegion: '神奈川県',
      postalCode: '231-0000',
      addressCountry: 'JP',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+81-120-000-000',
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
    name: 'Ikotsu.com（遺骨.com）',
    url: SITE_URL,
    telephone: '0120-000-000',
    email: 'info@ikotsu.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '（詳細住所）',
      addressLocality: '横浜市中区',
      addressRegion: '神奈川県',
      postalCode: '231-0000',
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
      name: params.provider || 'Ikotsu.com（遺骨.com）',
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
      name: params.author || 'Ikotsu.com（遺骨.com）',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ikotsu.com（遺骨.com）',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    ...(params.image ? { image: params.image } : {}),
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
