# 高度モーション・アニメーション実装仕様書

**Project:** Ikotsu.com Advanced Motion & Animation Implementation Specification
**Layer:** Motion Engineering / 最先端アニメーション実装設計
**Version:** 1.0
**Purpose:** モダンで洗練された印象を与えつつ、パフォーマンスを落とさない高度アニメーション仕様を確定する

---

## 1. 設計思想

**目的：** 視覚的な高級感 / 専門性の演出 / ユーザー没入感 / CV率向上
**原則：** 軽量 / 上品 / 意味のある動き / パフォーマンス優先
アニメーションは装飾ではない。情報理解を助けるもの。

---

## 2. 技術方針

**使用技術：** CSS transform / CSS opacity / IntersectionObserver / Scroll-driven animation / 軽量モーションライブラリ
**GPU最適化：** translate / scale / opacityのみ使用
**禁止：** heightアニメーション多用 / left/top変更 / 重いcanvas常時描画 / 常時動画背景

---

## 3. ページ別アニメーション設計

### 3.1 Hero Motion

- **テキスト：** 行ごとに分割フェード / 軽いslide-up / 0.08秒ずつ遅延
- **画像：** ゆるいパララックス / scale 1.02 → 1
- **CTA：** 微弱浮遊 / hoverで軽い発光

### 3.2 Trust Strip

- **数値：** カウントアップ（スクロールトリガー）
- **アイコン：** line-drawアニメーション

### 3.3 Service Cards

- **hover：** scale 1.03 / shadow増加 / 画像zoom 1.05
- **カード出現：** stagger fade-in

### 3.4 Process Timeline

- **スクロール連動：** 縦線が伸びる / 現在ステップが強調
- **ステップ切替：** fade + slide

### 3.5 FAQ

- **アコーディオン：** height auto / opacity / rotateアイコン（スムーズに）

### 3.6 画像ギャラリー

横スクロールスナップ / スワイプ対応 / フェードイン表示

### 3.7 法人ページ

課題→解決：左右スライド切替 / 分割レイアウトで対比演出

---

## 4. 高度モーション機能

### 4.1 Scroll Reveal System

セクション単位：opacity 0→1 / translateY 40px→0（ビューポート進入時のみ実行）

### 4.2 Parallax System

Hero限定。背景を微弱移動。スクロール速度の0.2倍。**過度禁止。**

### 4.3 Micro Interaction System

- **ボタン：** hover時微小浮上 / active時押し込み
- **フォーム：** フォーカス時ラベル縮小移動
- **入力成功：** チェックマークフェード表示

### 4.4 Line Draw Animation

工程図やタイムラインで使用。stroke-dashoffset利用。**専門性演出。**

---

## 5. 画像モーション設計

**表示時：** blur 8px→0 / opacity 0→1 / duration 0.6s
**Gallery：** hover時拡大 / キャプションフェード表示

---

## 6. パフォーマンス制御

Lazy Load必須 / 画像圧縮 / LCP最適化 / アニメーションは初回のみ
**CLS発生禁止。**

---

## 7. Reduced Motion設計

`prefers-reduced-motion: reduce` → パララックス無効 / カウントアップ無効 / fadeのみ残す

---

## 8. モバイル最適化

パララックス無効 / 重いstagger最小化 / タッチ優先 / スムーズスクロール確保

---

## 9. トランジション規格

`duration.fast` / `duration.normal` / `duration.slow`
ease-out中心。バネアニメは限定的に。

---

## 10. 禁止事項

常時背景動画 / 派手な3D回転 / 高速点滅 / 過度なバウンス / 重いcanvas常時

---

## 11. 受入基準

- Lighthouseスコア大幅低下なし
- モバイルで60fps近く維持
- Reduced Motionで安全動作
- アニメーションが上品

---

## 12. 最終目標

最先端だが、うるさくない。**洗練された、専門機関らしい動き。**
