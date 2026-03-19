'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './page.module.css';

interface SizeOption {
  value: string;
  label: string;
  add: number;
}

interface ConditionOption {
  value: string;
  label: string;
  add: number;
}

export interface ICDistanceToll {
  id: string;
  name: string;
  distanceKm: number;
  tollOneWay: number;
}

interface Props {
  sizeOptions: SizeOption[];
  conditionOptions: ConditionOption[];
  icOptions: ICDistanceToll[];
}

const SERVICE_BASE: Record<string, number> = {
  powdered: 8800,
  cleaning: 6600,
  carrying: 16500,
  takeout: 10000,
};

const SERVICE_LABELS: Record<string, string> = {
  powdered: '粉骨',
  cleaning: '洗骨',
  carrying: '出張・搬送',
  takeout: 'お引取り',
};

export default function PricingSimulator({ sizeOptions, conditionOptions, icOptions }: Props) {
  const [selectedService, setSelectedService] = useState<string>('powdered');
  const [selectedSize, setSelectedSize] = useState<string>('medium');
  const [selectedCondition, setSelectedCondition] = useState<string>('good');
  const [withCleaning, setWithCleaning] = useState(false);

  // 出張サービス関連
  const [useCarrying, setUseCarrying] = useState(false);
  const [selectedIC, setSelectedIC] = useState<string>(icOptions[0]?.id || 'unknown');

  // AI風UI用ステート
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);

  const filteredICs = icOptions.filter(ic => 
    searchQuery === '' || ic.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 6);

  const sizeAdd = sizeOptions.find((o) => o.value === selectedSize)?.add ?? 0;
  const conditionAdd = conditionOptions.find((o) => o.value === selectedCondition)?.add ?? 0;
  // 洗骨セット（標準）の場合はベース8800円に対して差額6600円（合計15400円）になるように調整
  const cleaningAdd = withCleaning && selectedService === 'powdered' ? 6600 : 0;
  const base = SERVICE_BASE[selectedService] ?? 0;

  // 出張費・高速代金の計算
  const icData = icOptions.find(ic => ic.id === selectedIC) || icOptions[0];
  const carryingFee = useCarrying ? Math.ceil(icData.distanceKm / 10) * 1000 : 0;
  const highwayToll = useCarrying ? (icData.tollOneWay * 2) : 0; // 往復

  const total = base + sizeAdd + conditionAdd + cleaningAdd + carryingFee + highwayToll;

  // デバウンスしてsimulation_logsへ保存（1.5秒後に変化がなければ保存）
  const logTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (logTimerRef.current) clearTimeout(logTimerRef.current);
    logTimerRef.current = setTimeout(() => {
      fetch('/api/logs/simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: crypto.randomUUID(),
          bone_size: selectedSize,
          bone_condition: selectedCondition,
          options: [...(withCleaning ? ['cleaning'] : []), ...(useCarrying ? ['carrying'] : [])],
          estimated_price: total,
          price_breakdown: {
            service: selectedService,
            base,
            size_add: sizeAdd,
            condition_add: conditionAdd,
            cleaning_add: cleaningAdd,
            carrying_fee: carryingFee,
            highway_toll: highwayToll,
            ic_name: useCarrying ? icData.name : null,
          },
        }),
      }).catch((err) => console.error('Simulation log fetch error:', err));
    }, 1500);
    return () => { if (logTimerRef.current) clearTimeout(logTimerRef.current); };
  }, [selectedService, selectedSize, selectedCondition, withCleaning, useCarrying, selectedIC, total, base, sizeAdd, conditionAdd, cleaningAdd, carryingFee, highwayToll, icData]);

  return (
    <div className={styles.simulator}>
      {/* Service */}
      <fieldset className={styles.simFieldset}>
        <legend className={styles.simLegend}>サービスを選択</legend>
        <div className={styles.simOptions}>
          {Object.entries(SERVICE_LABELS).map(([value, label]) => (
            <label key={value} className={`${styles.simOption} ${selectedService === value ? styles.simOptionActive : ''}`}>
              <input
                type="radio"
                name="service"
                value={value}
                checked={selectedService === value}
                onChange={() => { setSelectedService(value); setWithCleaning(false); }}
                className={styles.simRadio}
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Size */}
      <fieldset className={styles.simFieldset}>
        <legend className={styles.simLegend}>遺骨の量</legend>
        <div className={styles.simOptions}>
          {sizeOptions.map((opt) => (
            <label key={opt.value} className={`${styles.simOption} ${selectedSize === opt.value ? styles.simOptionActive : ''}`}>
              <input
                type="radio"
                name="size"
                value={opt.value}
                checked={selectedSize === opt.value}
                onChange={() => setSelectedSize(opt.value)}
                className={styles.simRadio}
              />
              <span>{opt.label}</span>
              {opt.add > 0 && <span className={styles.simAdd}>+¥{opt.add.toLocaleString()}</span>}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Condition */}
      <fieldset className={styles.simFieldset}>
        <legend className={styles.simLegend}>遺骨の状態</legend>
        <div className={styles.simOptions}>
          {conditionOptions.map((opt) => (
            <label key={opt.value} className={`${styles.simOption} ${selectedCondition === opt.value ? styles.simOptionActive : ''}`}>
              <input
                type="radio"
                name="condition"
                value={opt.value}
                checked={selectedCondition === opt.value}
                onChange={() => setSelectedCondition(opt.value)}
                className={styles.simRadio}
              />
              <span>{opt.label}</span>
              {opt.add > 0 && <span className={styles.simAdd}>+¥{opt.add.toLocaleString()}</span>}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Options */}
      <div className={styles.simFieldset}>
        <p className={styles.simLegend}>オプションサービス</p>
        
        {/* add cleaning */}
        {selectedService === 'powdered' && (
          <label className={`${styles.simOption} ${withCleaning ? styles.simOptionActive : ''}`} style={{ width: '100%', marginBottom: 'var(--space-3)' }}>
            <input
              type="checkbox"
              checked={withCleaning}
              onChange={() => setWithCleaning(!withCleaning)}
              className={styles.simRadio}
            />
            <span>洗骨をセットで依頼する</span>
            <span className={styles.simAdd}>目安 +¥6,600〜</span>
          </label>
        )}

        {/* add carrying */}
        <label className={`${styles.simOption} ${useCarrying ? styles.simOptionActive : ''}`} style={{ width: '100%' }}>
          <input
            type="checkbox"
            checked={useCarrying}
            onChange={() => setUseCarrying(!useCarrying)}
            className={styles.simRadio}
          />
          <span>ご遺骨の出張預かりサービスを利用する</span>
          <span className={styles.simAdd}></span>
        </label>

        {useCarrying && (
          <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-4)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)', fontSize: '15px', fontWeight: 'var(--font-semibold)', color: 'var(--primary-color)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>
              AIスマート出張見積
            </label>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)', lineHeight: 1.5 }}>
              お住まいの地域（市区町村やIC名）を入力すると、AIが最適なルートと出張費用を高速で自動解析します。
            </p>

            <div style={{ position: 'relative', zIndex: 10 }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <svg style={{ position: 'absolute', left: '12px', color: 'var(--text-secondary)' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <input
                  type="text"
                  placeholder="例：新宿、世田谷、川崎..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setDropdownOpen(true);
                  }}
                  onFocus={() => {
                     setDropdownOpen(true);
                     setIsResultOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '14px 14px 14px 40px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    fontSize: '15px',
                    backgroundColor: 'var(--bg-primary)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                  }}
                />
              </div>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute', top: '100%', left: 0, right: 0,
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      boxShadow: 'var(--shadow-md)',
                      marginTop: '4px',
                      maxHeight: '220px',
                      overflowY: 'auto'
                    }}
                  >
                    {filteredICs.length > 0 ? (
                      filteredICs.map(ic => (
                        <div
                          key={ic.id}
                          onClick={() => {
                            setSearchQuery(ic.name);
                            setSelectedIC(ic.id);
                            setDropdownOpen(false);
                            setIsCalculating(true);
                            setIsResultOpen(false);
                            
                            // 擬似的なAI解析アニメーション待機時間
                            setTimeout(() => {
                              setIsCalculating(false);
                              setIsResultOpen(true);
                            }, 1500);
                          }}
                          style={{
                            padding: '12px 16px',
                            cursor: 'pointer',
                            borderBottom: '1px solid var(--border-light)',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-secondary)')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                          <span style={{ color: 'var(--text-primary)' }}>{ic.name}</span>
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '16px', fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                        該当するエリアが見つかりません
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <AnimatePresence mode="wait">
              {isCalculating && (
                <motion.div
                  key="calculating"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ overflow: 'hidden', marginTop: '16px' }}
                >
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '16px',
                    backgroundColor: 'rgba(37, 99, 235, 0.05)',
                    border: '1px solid rgba(37, 99, 235, 0.2)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--primary-color)'
                  }}>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                    </motion.div>
                    <span style={{ fontSize: '14px', fontWeight: '500', letterSpacing: '0.02em' }}>AIが最適ルートと実費を解析しています...</span>
                  </div>
                </motion.div>
              )}

              {!isCalculating && isResultOpen && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{ overflow: 'hidden', marginTop: '16px' }}
                >
                  <div style={{
                    padding: '20px 16px',
                    backgroundColor: 'var(--bg-primary)',
                    borderLeft: '4px solid var(--primary-color)',
                    borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                    boxShadow: 'var(--shadow-md)'
                  }}>
                    <div style={{ fontSize: '12px', color: 'var(--primary-color)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                      AI解析完了
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>出張費（概算距離 {icData.distanceKm}km）</span>
                      <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>+¥{carryingFee.toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>高速代金（一般往復目安）</span>
                      <span style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>+¥{highwayToll.toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Result */}
      <div className={styles.simResult}>
        <div className={styles.simResultLabel}>費用目安（税込）</div>
        <div className={styles.simResultPrice}>
          ¥{total.toLocaleString()}
          <span className={styles.simResultUnit}>〜</span>
        </div>
        <p className={styles.simResultNote}>
          この金額はあくまで目安です。遺骨の状態を確認のうえ、ご指定の場所までの正確な交通費を含めた料金をお知らせします。
        </p>
        <a href="/contact" className={styles.simCta}>この条件で無料相談する →</a>
      </div>
    </div>
  );
}
