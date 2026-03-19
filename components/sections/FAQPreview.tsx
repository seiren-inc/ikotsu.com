import FadeIn from '@/components/motion/FadeIn';
import Accordion from '@/components/ui/Accordion';
import styles from './FAQPreview.module.css';

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  faqs?: FAQItem[];
}

export default function FAQPreview({ faqs = [] }: Props) {
  // DBからのデータがない場合のフォールバック（画面を崩さないため）
  const displayFaqs = faqs.length > 0 ? faqs : [
    {
      question: '粉骨とは何ですか？',
      answer: '粉骨とは、遺骨を専用の機械で細かいパウダー状に砕く処理のことです。散骨・改葬・手元供養など、さまざまな用途に対応するための前処理として行われます。',
    }
  ];

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
          <Accordion items={displayFaqs.map(item => ({
            question: item.question,
            answer: <p>{item.answer}</p>,
          }))} />
        </FadeIn>
      </div>
    </section>
  );
}
