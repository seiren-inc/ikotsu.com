'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { trackDiagnosisComplete } from '@/lib/analytics/gtag';
import styles from './AIDiagnosis.module.css';

type BoneCondition = 'good' | 'mold' | 'wet' | 'damaged';
type FuturePlan = 'scatter' | 'reburial' | 'storage' | 'diamond';
type StoragePeriod = 'under_1y' | '1_5y' | '5_10y' | 'over_10y';
type AnxietyType = 'cost' | 'process' | 'legal' | 'religious';

interface Answers {
  bone_condition: BoneCondition | null;
  future_plan: FuturePlan | null;
  storage_period: StoragePeriod | null;
  anxiety_type: AnxietyType | null;
}

interface Recommendation {
  service: string;
  title: string;
  reason: string;
  href: string;
  price: string;
}

const STEPS = [
  {
    key: 'bone_condition' as const,
    question: '遺骨の現在の状態は？',
    options: [
      { value: 'good' as BoneCondition, label: '良好', desc: '変色・においなし' },
      { value: 'mold' as BoneCondition, label: 'カビあり', desc: 'カビや変色が見られる' },
      { value: 'wet' as BoneCondition, label: '湿気あり', desc: '湿気・においが気になる' },
      { value: 'damaged' as BoneCondition, label: '著しく損傷', desc: '欠損・土汚れなど' },
    ],
  },
  {
    key: 'future_plan' as const,
    question: '今後どのようにしたいですか？',
    options: [
      { value: 'scatter' as FuturePlan, label: '散骨したい', desc: '海洋・山林散骨を検討中' },
      { value: 'reburial' as FuturePlan, label: '改葬・移転したい', desc: 'お墓や納骨堂の移転' },
      { value: 'storage' as FuturePlan, label: '手元供養したい', desc: '自宅などで保管' },
      { value: 'diamond' as FuturePlan, label: 'ダイヤモンド葬など', desc: '特殊な方法を検討中' },
    ],
  },
  {
    key: 'storage_period' as const,
    question: '処理まで保管が必要な期間は？',
    options: [
      { value: 'under_1y' as StoragePeriod, label: '1年以内', desc: 'できるだけ早く処理したい' },
      { value: '1_5y' as StoragePeriod, label: '1〜5年', desc: '時期を見て依頼する予定' },
      { value: '5_10y' as StoragePeriod, label: '5〜10年', desc: 'まだ先の話' },
      { value: 'over_10y' as StoragePeriod, label: '10年以上', desc: '長期保管を考えている' },
    ],
  },
  {
    key: 'anxiety_type' as const,
    question: '一番気になることは？',
    options: [
      { value: 'cost' as AnxietyType, label: '費用', desc: 'いくらかかるか不安' },
      { value: 'process' as AnxietyType, label: '処理内容', desc: 'どのように処理されるか' },
      { value: 'legal' as AnxietyType, label: '法律・宗教', desc: '問題がないか確認したい' },
      { value: 'religious' as AnxietyType, label: '宗教的な観点', desc: '宗教・信仰への影響' },
    ],
  },
];

function recommend(answers: Answers): Recommendation {
  const { bone_condition, future_plan } = answers;

  const needsCleaning = bone_condition === 'mold' || bone_condition === 'wet' || bone_condition === 'damaged';

  if (future_plan === 'scatter') {
    if (needsCleaning) {
      return {
        service: 'cleaning+powdered',
        title: '洗骨 → 粉骨',
        reason: '遺骨の状態に汚損が見られるため、まず洗骨で清潔にしてから散骨に適した粒度で粉骨することをお勧めします。',
        href: '/contact',
        price: '55,000円〜（税込・目安）',
      };
    }
    return {
      service: 'powdered',
      title: '粉骨',
      reason: '散骨には粉骨（2mm以下）が必要です。遺骨の状態は良好なため、粉骨処理をお勧めします。',
      href: '/services/powdered',
      price: '30,000円〜（税込・目安）',
    };
  }

  if (future_plan === 'reburial') {
    if (needsCleaning) {
      return {
        service: 'cleaning',
        title: '洗骨',
        reason: '改葬・移転前に遺骨を清潔な状態に整えることをお勧めします。状態によっては粉骨とのセット依頼も可能です。',
        href: '/services/cleaning',
        price: '30,000円〜（税込・目安）',
      };
    }
    return {
      service: 'takeout',
      title: 'お引取り・搬送',
      reason: '改葬先への搬送サービスをご利用ください。遺骨の状態は良好のため、搬送のみの対応が可能です。',
      href: '/services/takeout',
      price: '10,000円〜（税込・目安）',
    };
  }

  if (needsCleaning) {
    return {
      service: 'cleaning',
      title: '洗骨',
      reason: '手元供養・長期保管の前に、カビ・汚れを除去することをお勧めします。清潔な状態にしてから保管することで安心です。',
      href: '/services/cleaning',
      price: '30,000円〜（税込・目安）',
    };
  }

  return {
    service: 'contact',
    title: '無料相談',
    reason: 'ご状況に合わせた最適なプランをお伝えするため、まずは無料相談をお勧めします。',
    href: '/contact',
    price: '無料',
  };
}

export default function AIDiagnosis() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    bone_condition: null,
    future_plan: null,
    storage_period: null,
    anxiety_type: null,
  });
  const [result, setResult] = useState<Recommendation | null>(null);
  const [logSaved, setLogSaved] = useState(false);

  const currentStep = STEPS[step];
  const progress = ((step) / STEPS.length) * 100;

  async function handleSelect(value: string) {
    const newAnswers = { ...answers, [currentStep.key]: value };
    setAnswers(newAnswers);

    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      // 最終ステップ
      const rec = recommend(newAnswers as Answers);
      setResult(rec);

      // ログ保存（失敗しても無視）
      if (!logSaved) {
        setLogSaved(true);
        await supabase.from('diagnosis_logs').insert({
          session_id: crypto.randomUUID(),
          bone_condition: newAnswers.bone_condition,
          future_plan: newAnswers.future_plan,
          storage_period: newAnswers.storage_period,
          anxiety_type: newAnswers.anxiety_type,
          recommended_service: rec.service,
        }).then(() => {});
        trackDiagnosisComplete(rec.service);
      }
    }
  }

  function handleBack() {
    if (step > 0) setStep(step - 1);
  }

  function handleReset() {
    setStep(0);
    setAnswers({ bone_condition: null, future_plan: null, storage_period: null, anxiety_type: null });
    setResult(null);
    setLogSaved(false);
  }

  if (result) {
    return (
      <div className={styles.card}>
        <div className={styles.resultHeader}>
          <span className={styles.resultBadge}>診断結果</span>
          <h2 className={styles.resultTitle}>おすすめのサービス</h2>
        </div>
        <div className={styles.resultService}>
          <p className={styles.resultServiceTitle}>{result.title}</p>
          <p className={styles.resultServicePrice}>{result.price}</p>
        </div>
        <p className={styles.resultReason}>{result.reason}</p>
        <div className={styles.resultActions}>
          <a href={result.href} className={styles.resultCta}>
            {result.service === 'contact' ? '無料相談する' : `${result.title}の詳細を見る`} →
          </a>
          <a href="/contact" className={styles.resultCtaSecondary}>無料相談する</a>
        </div>
        <button onClick={handleReset} className={styles.resetBtn}>もう一度診断する</button>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      {/* Progress */}
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>
      <p className={styles.stepCount}>
        質問 {step + 1} / {STEPS.length}
      </p>

      {/* Question */}
      <h2 className={styles.question}>{currentStep.question}</h2>

      {/* Options */}
      <div className={styles.options}>
        {currentStep.options.map((opt) => (
          <button
            key={opt.value}
            className={styles.option}
            onClick={() => handleSelect(opt.value)}
          >
            <span className={styles.optionLabel}>{opt.label}</span>
            <span className={styles.optionDesc}>{opt.desc}</span>
          </button>
        ))}
      </div>

      {step > 0 && (
        <button onClick={handleBack} className={styles.backBtn}>← 前の質問に戻る</button>
      )}
    </div>
  );
}
