import type { MetadataRoute } from 'next';
import { GUIDE_ARTICLES } from './guide/page';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://ikotsu-lab.com';
  const now = new Date().toISOString();

  const coreRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/for-corporate`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/diagnosis`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/services/powdered`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/services/cleaning`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/services/carrying`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/services/takeout`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/guide`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${base}/company`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${base}/legal/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/legal/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/legal/tokushoho`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
  ];

  const guideRoutes: MetadataRoute.Sitemap = GUIDE_ARTICLES.map((article) => ({
    url: `${base}/guide/${article.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...coreRoutes, ...guideRoutes];
}
