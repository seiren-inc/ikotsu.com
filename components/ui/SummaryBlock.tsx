/**
 * SummaryBlock
 * ─────────────────────────────────────────────
 * 各ページ H1 直下に配置する「結論ブロック」。
 * GEO / AI サマリー向けに「対象・価格帯・納期・依頼方法」等を
 * 構造化された形式で提示する。
 *
 * 使い方:
 *   <SummaryBlock
 *     items={[
 *       { label: '対象', value: '火葬後の遺骨 / 墓からの遺骨' },
 *       { label: '価格帯', value: '8,800円〜（状態・サイズで変動）' },
 *       { label: '標準納期', value: '当日〜10日' },
 *       { label: '依頼方法', value: '郵送 / お引取り / 法人一括' },
 *     ]}
 *   />
 */
import styles from './SummaryBlock.module.css';

export type SummaryItem = {
  label: string;
  value: string;
};

type Props = {
  items: SummaryItem[];
  /** optional: "個人" | "法人" | undefined → スタイルのトーンを変える */
  variant?: 'individual' | 'corporate';
};

export default function SummaryBlock({ items, variant }: Props) {
  return (
    <dl
      className={`${styles.block} ${variant === 'corporate' ? styles['block--corporate'] : ''}`}
      aria-label="このページの概要"
    >
      {items.map(({ label, value }) => (
        <div key={label} className={styles.item}>
          <dt className={styles.label}>{label}</dt>
          <dd className={styles.value}>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
