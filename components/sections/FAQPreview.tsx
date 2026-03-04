import FadeIn from '@/components/motion/FadeIn';
import Accordion from '@/components/ui/Accordion';
import styles from './FAQPreview.module.css';

const FAQ_ITEMS = [
  {
    question: '粉骨とは何ですか？',
    answer: '粉骨とは、遺骨を専用の機械で細かいパウダー状に砕く処理のことです。散骨・改葬・手元供養など、さまざまな用途に対応するための前処理として行われます。',
  },
  {
    question: '粉骨の費用はいくらですか？',
    answer: '一般的な目安は30,000円〜です。遺骨の量や状態、追加オプションにより変動します。詳細はお問い合わせいただくか、料金目安ページをご確認ください。',
  },
  {
    question: '洗骨は必要ですか？',
    answer: 'カビや湿気による変色・汚れがある場合に推奨されます。長期保管された遺骨や、湿気の多い環境で保管されていた場合は洗骨をお勧めしています。',
  },
  {
    question: '遠方ですが利用できますか？',
    answer: '全国47都道府県に対応しています。専用の梱包キットをお送りし、ご郵送いただく方法と、出張引取りの方法がございます。',
  },
  {
    question: '処理にかかる日数は？',
    answer: '状態にもよりますが、目安として粉骨は3〜5営業日、洗骨は5〜7営業日です。到着後に状態を確認し、具体的な日程をご連絡いたします。',
  },
  {
    question: '遺骨の一部だけの処理は可能ですか？',
    answer: '可能です。手元供養用に一部を残し、残りを粉骨するなど、ご希望に応じた対応が可能です。事前にご相談ください。',
  },
  {
    question: '法人での依頼は可能ですか？',
    answer: '寺院・納骨堂・霊園・葬儀社など、法人のお客様からのご依頼を多数お受けしています。専用窓口がございますので、法人ページよりお問い合わせください。',
  },
  {
    question: '追加料金は発生しますか？',
    answer: 'お見積り時にご案内した料金以外の追加費用は原則発生しません。ただし、状態確認後に追加処理が必要な場合は、必ず事前にご連絡・ご了承をいただいてから実施します。',
  },
  {
    question: '粉骨後の遺骨はどのように返送されますか？',
    answer: '専用の密封容器に収め、エアキャップと専用箱で丁寧に梱包して返送いたします。処理前後の記録レポートも同封します。',
  },
  {
    question: '散骨は代行してもらえますか？',
    answer: '粉骨処理は当社にて行います。散骨については、グループサービスの「散骨クルーズ」をご紹介しています。散骨に適した粒度での粉骨も対応可能です。',
  },
] as const;

export default function FAQPreview() {
  return (
    <section className="section" aria-label="よくあるご質問">
      <div className="container container--narrow">
        <FadeIn direction="up">
          <div className="section__header">
            <span className="section__label">FAQ</span>
            <h2 className="section__title">よくあるご質問</h2>
            <p className="section__description">
              お客様からよくいただくご質問をまとめました。
            </p>
          </div>
        </FadeIn>
        <FadeIn direction="up" delay={0.1}>
          <Accordion items={FAQ_ITEMS.map(item => ({
            question: item.question,
            answer: <p>{item.answer}</p>,
          }))} />
        </FadeIn>
      </div>
    </section>
  );
}
