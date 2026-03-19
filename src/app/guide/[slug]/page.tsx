import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/motion/FadeIn';
import StaggerChildren, { StaggerItem } from '@/components/motion/StaggerChildren';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { JsonLd, generateBreadcrumbSchema, generateArticleSchema } from '@/lib/schema/jsonld';
import { prisma } from '@/lib/prisma';
import { GUIDE_ARTICLES } from '../page';
import styles from '../page.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Static Build 時に必要な slug をすべて取得
  try {
    const data = await prisma.ikotsuSeoArticle.findMany({
      where: { is_published: true },
      select: { slug: true }
    });
    if (data && data.length > 0) {
      return data.map((a) => ({ slug: a.slug }));
    }
  } catch (err) {
    // ignore
  }
  return GUIDE_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  // DBからメタデータを取得
  let data = null;
  let error = null;
  try {
    data = await prisma.ikotsuSeoArticle.findUnique({
      where: { slug },
      select: { title: true, meta_description: true }
    });
    if (!data) error = new Error('not found');
  } catch (err) {
    error = err;
  }

  let title = '';
  let description = '';

  if (!error && data) {
    title = data.title;
    description = data.meta_description || '';
  } else {
    // フォールバック
    const article = GUIDE_ARTICLES.find((a) => a.slug === slug);
    if (!article) return {};
    title = article.title;
    description = article.description;
  }

  return {
    title: `${title} | 遺骨.com｜粉骨・洗骨の専門機関`,
    description: description,
    alternates: { canonical: `/guide/${slug}` },
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  process: '工程',
  legal: '法律',
  storage: '保管',
  cost: '費用',
};

// シンプルなMarkdown→HTMLの変換（見出し・リスト・テーブル・段落のみ）
function renderContent(content: string): string {
  return content
    // テーブル
    .replace(/^\| (.+) \|$/gm, (row) => {
      const cells = row.slice(1, -1).split(' | ').map((c) => c.trim());
      const isHeader = cells.every((c) => c && !c.includes('---'));
      if (isHeader && content.indexOf(row) < content.indexOf('|---|')) {
        return `<tr>${cells.map((c) => `<th>${c}</th>`).join('')}</tr>`;
      }
      return `<tr>${cells.map((c) => `<td>${c}</td>`).join('')}</tr>`;
    })
    .replace(/(<tr>[\s\S]*?<\/tr>)\n(<tr>[\s\S]*?<\/tr>)/g, (_m, a, b) => {
      if (a.includes('<th>')) return `<thead>${a}</thead><tbody>${b}`;
      return `${a}${b}`;
    })
    .replace(/(<tbody>[\s\S]*?)(?=\n\n|$)/g, '$1</tbody>')
    .replace(/((?:<thead>[\s\S]*?<\/tbody>))/g, '<table>$1</table>')
    // 見出し
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    // リスト
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>)\n(?=<li>)/g, '$1')
    .replace(/((?:<li>[\s\S]*?<\/li>\n?)+)/g, (m) =>
      m.includes('</li>\n') ? `<ul>${m}</ul>` : `<ul>${m}</ul>`
    )
    // 段落
    .replace(/^(?!<[hulo]|<table|$)(.+)$/gm, '<p>$1</p>')
    // 空行
    .replace(/\n{2,}/g, '\n');
}

export default async function GuideArticlePage({ params }: Props) {
  const { slug } = await params;
  
  // 1. DBから該当記事を取得
  let data = null;
  let error = null;
  try {
    data = await prisma.ikotsuSeoArticle.findUnique({
      where: { slug, is_published: true }
    });
    if (!data) error = new Error('not found');
  } catch(err) {
    error = err;
  }

  let article;
  if (!error && data) {
    article = {
      slug: data.slug,
      title: data.title,
      category: data.category,
      description: data.meta_description,
      readTime: data.read_time,
      content: data.content_text,
      author: data.author || '遺骨.com 編集部',
      publishedAt: data.published_at
    };
  } else {
    // フォールバック
    const fbArticle = GUIDE_ARTICLES.find((a) => a.slug === slug);
    if (!fbArticle) notFound();
    article = { ...fbArticle, author: '遺骨.com 編集部', publishedAt: '2026-03-05' };
  }

  // 関連記事 (DBから上位3件を取得、現在の記事を除く)
  let relatedData = null;
  try {
    relatedData = await prisma.ikotsuSeoArticle.findMany({
      where: {
        slug: { not: slug },
        is_published: true
      },
      select: { slug: true, title: true, category: true, meta_description: true, read_time: true },
      take: 3
    });
  } catch (err) {
    // ignore
  }

  const related = relatedData && relatedData.length > 0 
    ? relatedData.map(r => ({
        slug: r.slug,
        title: r.title,
        category: r.category,
        description: r.meta_description,
        readTime: r.read_time
      }))
    : GUIDE_ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);

  const htmlContent = renderContent(article.content || '');

  return (
    <>
      <article>
        {/* Article Header */}
        <header className={styles.articleHeader}>
          <div className="container">
            <div className={styles.articleHeaderInner}>
              <Breadcrumb items={[
                { name: 'トップ', href: '/' },
                { name: 'ガイド・基礎知識', href: '/guide' },
                { name: article.title, href: `/guide/${slug}` },
              ]} />

              <FadeIn direction="up" className={styles.marginTop8}>
                <span className={styles.articleHeaderCategory}>
                  {CATEGORY_LABELS[article.category]}
                </span>
                <h1 className={styles.articleHeaderTitle}>{article.title}</h1>
                <div className={styles.articleHeaderMeta}>
                  <span>🕒 読了目安：{article.readTime}</span>
                  <span>✒️ {article.author}</span>
                </div>
              </FadeIn>
            </div>
          </div>
        </header>

        {/* Body */}
        <section className="section" style={{ paddingTop: 'var(--space-12)' }}>
          <div className="container container--narrow">
            
            <FadeIn direction="up">
              {/* GEO / Abstract Block */}
              <div className={styles.articleAbstract} style={{
                background: 'var(--bg-secondary)',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                borderLeft: '4px solid var(--accent-primary)',
                marginBottom: 'var(--space-10)'
              }}>
                <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-3)' }}>この記事の要約</h2>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
                  {article.description} 当ページでは、専門機関である Ikotsu.com の視点から、正確で法規制やトラブル防止に配慮した解説を行います。
                </p>
              </div>

              {/* Main Content */}
              <div
                className={styles.articleBody}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </FadeIn>

            {/* Author / Supervisor Info */}
            <FadeIn direction="up" className={styles.marginTop16}>
              <div style={{
                display: 'flex', gap: 'var(--space-6)', background: 'var(--bg-elevated)', border: '1px solid var(--border-light)', padding: 'var(--space-8)', borderRadius: 'var(--radius-xl)'
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>監修・執筆：遺骨.com 編集部</h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
                    遺骨.com（株式会社清蓮）は、散骨・改葬に関わる法規制および関連法令を遵守し、年間多数の粉骨・洗骨処理を行う専門機関です。遺骨というデリケートな対象を扱うプロフェッショナルとして、正確で透明性の高い情報発信に努めています。
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* CTA */}
            <FadeIn direction="up">
              <div className={styles.articleCta}>
                <h2 className={styles.articleCtaTitle}>ご相談・無料見積もり</h2>
                <p className={styles.articleCtaText}>
                  記事の内容についてご不明な点や、ご自身の状況に合わせた対応方法のご相談はお気軽にどうぞ。
                </p>
                <Link href="/contact" className={styles.articleCtaBtn}>無料で相談する →</Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </article>

      {/* Related Articles */}
      <section className="section section--alt">
        <div className="container">
          <FadeIn direction="up" className={`text-center ${styles.sectionHeaderMargin12}`}>
            <span className="section__label">Related</span>
            <h2 className="section__title">関連記事</h2>
          </FadeIn>
          
          <StaggerChildren className={styles.articleGrid} staggerDelay={0.05}>
            {related.map((r) => (
              <StaggerItem key={r.slug}>
                <Link href={`/guide/${r.slug}`} className={styles.articleCard}>
                  <div className={styles.articleMeta}>
                    <span className={styles.articleCategory}>{CATEGORY_LABELS[r.category]}</span>
                    <span className={styles.articleReadTime}>読了目安 {r.readTime}</span>
                  </div>
                  <h3 className={styles.articleTitle}>{r.title}</h3>
                  <p className={styles.articleDesc}>{r.description}</p>
                  <span className={styles.articleLink}>
                    記事を読む
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={styles.articleLinkIcon}>
                      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <JsonLd data={generateBreadcrumbSchema([
        { name: 'トップ', href: '/' },
        { name: 'ガイド・基礎知識', href: '/guide' },
        { name: article.title, href: `/guide/${slug}` },
      ])} />
      <JsonLd data={generateArticleSchema({
        title: article.title,
        description: article.description || '',
        url: `/guide/${slug}`,
        datePublished: article.publishedAt ? new Date(article.publishedAt).toISOString().split('T')[0] : '2026-03-05',
        dateModified: article.publishedAt ? new Date(article.publishedAt).toISOString().split('T')[0] : '2026-03-05',
      })} />
    </>
  );
}
