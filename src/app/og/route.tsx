import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

// label ごとのアクセントカラー
const ACCENT: Record<string, { from: string; to: string }> = {
  'サービス': { from: '#1a6b5a', to: '#2a9d8f' },
  '法人向け': { from: '#2d4a7a', to: '#4a6fa5' },
  '工程公開': { from: '#7b3f00', to: '#c07c3a' },
  'ガイド': { from: '#4a4a6a', to: '#7c7caa' },
  'default': { from: '#6c63ff', to: '#a78bfa' },
};

const FOOTER_BADGES: Record<string, string[]> = {
  'サービス': ['全国47都道府県対応', '写真付き報告書', '料金透明・追加請求なし'],
  '法人向け': ['SLA明示', 'インボイス対応', 'NDA締結可', '月次一括委託対応'],
  '工程公開': ['全工程・チェックポイント公開', '六価クロム除去確認', '証明書発行対応'],
  'ガイド': ['わかりやすく解説', '14記事以上', '個人・法人どちらも対応'],
  'default': ['全国47都道府県対応', '写真付き作業報告書', '料金透明・追加請求なし'],
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || '遺骨.com｜粉骨・洗骨の専門機関';
  const label = searchParams.get('label') || 'default';

  const accent = ACCENT[label] ?? ACCENT['default'];
  const badges = FOOTER_BADGES[label] ?? FOOTER_BADGES['default'];

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0f1117 0%, #1a1d2e 100%)',
          padding: '60px 72px',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 背景アクセント円 */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-200px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accent.from}33 0%, transparent 70%)`,
          }}
        />

        {/* ヘッダーバー */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
              borderRadius: '12px',
              padding: '10px 24px',
              fontSize: '22px',
              fontWeight: '900',
              color: '#fff',
              letterSpacing: '-0.02em',
            }}
          >
            遺骨.com
          </div>
          {label && label !== 'default' && (
            <div
              style={{
                border: `1px solid ${accent.to}66`,
                borderRadius: '999px',
                padding: '4px 16px',
                fontSize: '16px',
                color: accent.to,
                fontWeight: '600',
              }}
            >
              {label}
            </div>
          )}
        </div>

        {/* メインタイトル */}
        <div
          style={{
            fontSize: title.length > 28 ? '42px' : '54px',
            fontWeight: '900',
            color: '#fff',
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            maxWidth: '960px',
          }}
        >
          {title}
        </div>

        {/* フッターバッジ */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {badges.map((badge) => (
            <div
              key={badge}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '8px',
                padding: '8px 18px',
                fontSize: '15px',
                color: 'rgba(255,255,255,0.7)',
                fontWeight: '600',
              }}
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
