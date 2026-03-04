import type { Metadata } from 'next';

interface GenerateMetadataParams {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noindex?: boolean;
}

const SITE_NAME = 'Ikotsu.com｜粉骨・洗骨の専門機関';
const SITE_URL = 'https://ikotsu.com';

export function generatePageMetadata({
  title,
  description,
  path,
  ogImage = '/images/og-default.jpg',
  noindex = false,
}: GenerateMetadataParams): Metadata {
  const fullTitle = path === '/' ? SITE_NAME : `${title}｜${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'ja_JP',
      type: path === '/' ? 'website' : 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

export { SITE_NAME, SITE_URL };
