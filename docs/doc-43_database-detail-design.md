# データベース詳細設計書

**Project:** Ikotsu.com Database Detailed Design
**Layer:** Technical Architecture
**Version:** 1.0
**Purpose:** 診断・見積・法人管理・将来のマイページ化まで見据えたデータ構造の完全設計

---

## 1. 設計目的

サイトは集客装置。DBは資産。
**目的：** CVデータを蓄積 / 単価分析を可能にする / 法人LTVを把握 / 将来ポータル化に耐える
初期は軽量。構造は拡張前提。

---

## 2. 全体ER概念

```
Visitor → DiagnosisLog → SimulationLog → Inquiry → Order（将来） → CorporateAccount（将来）
```

ログは消さない。

---

## 3. DiagnosisLogテーブル

| カラム              | 説明             |
| ------------------- | ---------------- |
| id                  | 主キー           |
| session_id          | セッション識別子 |
| bone_condition      | 遺骨状態         |
| future_plan         | 供養予定         |
| storage_period      | 保管期間         |
| anxiety_type        | 不安内容         |
| recommended_service | 推奨サービス     |
| created_at          | 作成日時         |

目的：診断傾向分析 / CV率改善

---

## 4. SimulationLogテーブル

| カラム               | 説明             |
| -------------------- | ---------------- |
| id                   | 主キー           |
| session_id           | セッション識別子 |
| bone_size            | 骨壺サイズ       |
| bone_condition       | 遺骨状態         |
| options              | 選択オプション   |
| region               | 地域             |
| estimated_price      | 見積金額         |
| price_breakdown_json | 内訳JSON         |
| created_at           | 作成日時         |

目的：単価分析 / 価格改善 / オプション率分析

---

## 5. InquiryB2Cテーブル

| カラム                  | 説明                                               |
| ----------------------- | -------------------------------------------------- |
| id                      | 主キー                                             |
| name                    | 氏名                                               |
| phone                   | 電話番号                                           |
| email                   | メールアドレス                                     |
| address                 | 住所                                               |
| inquiry_type            | 問い合わせ種別                                     |
| related_simulation_id   | 関連シミュレーションID                             |
| related_diagnosis_id    | 関連診断ID                                         |
| message                 | メッセージ                                         |
| status                  | ステータス (new/contacted/quoted/converted/closed) |
| assigned_staff          | 担当者                                             |
| created_at / updated_at | 日時                                               |

---

## 6. InquiryB2Bテーブル

| カラム          | 説明                            |
| --------------- | ------------------------------- |
| id              | 主キー                          |
| corporate_name  | 法人名                          |
| contact_person  | 担当者名                        |
| position        | 役職                            |
| phone / email   | 連絡先                          |
| monthly_volume  | 月間件数                        |
| corporate_type  | 法人種別                        |
| requested_model | 希望提携モデル                  |
| message         | メッセージ                      |
| status          | ステータス                      |
| priority_flag   | 優先フラグ (high_volume/urgent) |
| created_at      | 作成日時                        |

---

## 7. CorporateAccount（将来拡張）

id / corporate_name / contract_type / monthly_volume / discount_rate / assigned_manager / created_at
法人ポータル前提。

---

## 8. Order（将来拡張）

id / customer_type / customer_id / service_type / price_final / options_json / status / payment_status / completed_at
将来請求連携可能構造。

---

## 9. Staffテーブル

id / name / role / email / permission_level (Admin/Staff/Viewer)

---

## 10. EventLogテーブル

id / event_type / related_id / ip_address / user_agent / created_at
目的：不正検知 / 分析

---

## 11. データ保存方針

BtoCログ 3年保存 / BtoBログ 5年保存 / 診断・シミュレーション 2年保存
**削除は論理削除。**

---

## 12. インデックス設計

created_at / status / monthly_volume / estimated_price（検索高速化）

---

## 13. 将来拡張性

マイページ追加可能 / 法人ログイン追加可能 / 支払い連携追加可能 / PDF見積自動生成可能
**スキーマ破壊を避ける。**

---

## 14. KPI活用

平均見積単価 / オプション率 / 法人比率 / CV率 / 診断→見積転換率
**データで勝つ。**

---

## 15. 最終目標

問い合わせを資産に変える。**Ikotsu.comをデータドリブン供養基盤へ。**
