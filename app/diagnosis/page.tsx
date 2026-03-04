import type { Metadata } from 'next';
import ScrollReveal from '@/components/motion/ScrollReveal';
import AIDiagnosis from '@/components/features/AIDiagnosis';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { JsonLd, generateBreadcrumbSchema } from '@/lib/schema/jsonld';

export const metadata: Metadata = {
  title: 'AI無料診断 — 最適なサービスを30秒で | Ikotsu.com',
  description:
    '遺骨の状態とご希望に合わせて、最適なサービスをAIが提案。4つの質問に答えるだけで粉骨・洗骨・搬送から最適プランをご案内します。',
  alternates: { canonical: '/diagnosis' },
};

export default function DiagnosisPage() {
  return (
    <>
      <section style={{
        background: 'linear-gradient(135deg, var(--bg-dark) 0%, var(--accent-secondary) 100%)',
        padding: 'var(--space-20) 0 var(--space-16)',
        color: 'var(--text-inverse)',
      }}>
        <div className="container">
          <ScrollReveal>
            <span className="section__label" style={{ color: 'var(--accent-gold)' }}>AI診断</span>
            <h1 style={{
              fontSize: 'var(--text-4xl)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--text-inverse)',
              marginTop: 'var(--space-3)',
              marginBottom: 'var(--space-4)',
            }}>
              最適なサービスを30秒で診断
            </h1>
            <p style={{
              fontSize: 'var(--text-lg)',
              color: 'rgba(255,255,255,0.78)',
              lineHeight: 'var(--leading-relaxed)',
              maxWidth: '540px',
            }}>
              遺骨の状態とご希望を4つの質問で確認し、最適なサービスをご案内します。
              相談・診断は無料です。
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container">
        <Breadcrumb items={[
          { name: 'トップ', href: '/' },
          { name: 'AI診断', href: '/diagnosis' },
        ]} />
      </div>

      <section id="diagnosis" className="section">
        <div className="container container--narrow">
          <ScrollReveal>
            <AIDiagnosis />
          </ScrollReveal>
        </div>
      </section>

      <JsonLd data={generateBreadcrumbSchema([
        { name: 'トップ', href: '/' },
        { name: 'AI診断', href: '/diagnosis' },
      ])} />
    </>
  );
}
