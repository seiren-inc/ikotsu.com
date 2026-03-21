# UI/UX Global Rules Violation Report

- Project: ikotsu.com
- Generated: 2026-03-20T00:13:16.067Z
- Scope: UI files (106 files)
- Method: static analysis (regex-based heuristic)

## Critical

- なし

## High

- なし

## Medium

1. absolute指定が多い
- 判定理由: absolute系記述が 37 件。レスポンシブ再配置時に崩れやすい構造の可能性。
- 根拠:
- ikotsu.com/components/features/BentoServices.module.css:70 `position: absolute;`
- ikotsu.com/components/features/HeroTrust.module.css:24 `position: absolute;`
- ikotsu.com/components/features/HeroTrust.module.css:32 `position: absolute;`
- ikotsu.com/components/features/HeroTrust.module.css:91 `position: absolute;`
- ikotsu.com/components/features/HeroTrust.module.css:300 `position: absolute;`
- ikotsu.com/components/features/ProductLineup.module.css:33 `position: absolute;`

2. 行間不足の疑い
- 判定理由: line-height が詰まる指定を 32 件検出。可読性低下の可能性。
- 根拠:
- ikotsu.com/components/features/HeroTrust.module.css:135 `line-height: 1.35;`
- ikotsu.com/components/features/HeroTrust.module.css:289 `line-height: 1.3;`
- ikotsu.com/components/features/ProductLineup.module.css:129 `line-height: 1;`
- ikotsu.com/components/sections/HeroSection.module.css:103 `line-height: 1.2;`
- ikotsu.com/components/sections/HeroSection.module.css:118 `line-height: 1.85;`
- ikotsu.com/components/sections/HeroSection.module.css:217 `line-height: 1.5;`
- ikotsu.com/components/sections/PricePreview.module.css:49 `line-height: 1;`
- ikotsu.com/components/sections/Testimonials.module.css:57 `line-height: 1.8;`

## Low

- なし

## Notes

- このレポートは静的解析ベースのため、最終判断は実機表示（1920/1440/1024/768/430/390/375）で確認すること。
- Fixed要素・重なり・改行崩れは、実際のDOM/表示幅で再検証すること。
