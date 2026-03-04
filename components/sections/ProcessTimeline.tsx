'use client';

import FadeIn from '@/components/motion/FadeIn';
import LineDrawTimeline from '@/components/motion/LineDrawTimeline';

const STEPS = [
  {
    title: 'お問い合わせ',
    description: 'お電話・フォームからお気軽にご相談いただけます。ご状況をお伺いし、最適なプランをご案内いたします。',
  },
  {
    title: 'お預かり・搬送',
    description: '全国対応の出張引取り、またはご郵送にてお送りいただけます。専用梱包キットもご用意可能です。',
  },
  {
    title: '状態確認・ご報告',
    description: '到着後、遺骨の状態を確認し写真でご報告。追加処理が必要な場合は事前にお見積りをお出しします。',
  },
  {
    title: '専門処理',
    description: '粉骨・洗骨などご依頼に応じた処理を専門設備で実施。工程ごとに記録を残します。',
  },
  {
    title: 'ご返送・お引渡し',
    description: '処理完了後、専用容器に収めて丁寧にご返送。処理前後の状態を記録したレポートもお送りします。',
  },
] as const;

export default function ProcessTimeline() {
  return (
    <section className="section section--alt" aria-label="ご利用の流れ">
      <div className="container container--narrow">
        <FadeIn>
          <div className="section__header">
            <span className="section__label">Process</span>
            <h2 className="section__title">ご利用の流れ</h2>
            <p className="section__description">
              お問い合わせからお引渡しまで、全工程を透明にご案内いたします。
            </p>
          </div>
        </FadeIn>
        
        <LineDrawTimeline steps={[...STEPS]} />
      </div>
    </section>
  );
}
