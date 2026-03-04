#!/usr/bin/env node
/**
 * supabase/seed_runner.mjs
 * Supabase REST API 経由で seed.sql を実行するスクリプト
 */
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = 'https://kafbtwvtejfhxdrrqqsj.supabase.co';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY is not set');
  process.exit(1);
}

const seedSql = readFileSync(resolve(__dirname, 'seed.sql'), 'utf8');

// コメント除去・複数文を分割して順番に実行
const statements = seedSql
  .replace(/--.*$/gm, '')           // 行コメント除去
  .split(/;\s*\n/)                   // セミコロン+改行で分割
  .map((s) => s.trim())
  .filter((s) => s.length > 0);

console.log(`Executing ${statements.length} SQL statements...`);

for (const stmt of statements) {
  const sql = stmt + ';';
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ query: sql }),
  });

  // REST API の /rpc は任意SQLを実行できないのでPostgREST Admin エンドポイントを試す
  break;
}

// PostgREST Admin API でSQLを直接実行
// SupabaseはSQL実行のため /pg/query (管理API) が必要
// 代わりにsupabase-js の rpc を使う
const { createClient } = await import('@supabase/supabase-js');
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// INSERT文を個別に実行（rpc経由でsqlは実行できないのでJSで直接INSERT）
console.log('Seeding service_catalog...');

const { data: existing } = await supabase.from('service_catalog').select('slug');
const existingSlugs = (existing || []).map((r) => r.slug);
console.log('Existing slugs:', existingSlugs);

const services = [
  {
    slug: 'powdered',
    name: '粉骨',
    description: '遺骨を専用機械でパウダー状に砕く処理。散骨・改葬・手元供養などの前処理として行われます。',
    base_price: 30000,
    sort_order: 1,
  },
  {
    slug: 'cleaning',
    name: '洗骨',
    description: 'カビ・汚れ・変色した遺骨を専門洗浄する処理。長期保管や湿気による劣化に対応。',
    base_price: 30000,
    sort_order: 2,
  },
  {
    slug: 'carrying',
    name: '出張・搬送',
    description: '全国どこへでも専任スタッフが伺い、遺骨を専用梱包材でお預かりします。',
    base_price: 10000,
    sort_order: 3,
  },
  {
    slug: 'takeout',
    name: 'お引取り',
    description: '専用梱包キットをお送りし、着払い郵送でお預かりするサービス。全国対応・梱包キット無料。',
    base_price: 10000,
    sort_order: 4,
  },
];

for (const svc of services) {
  if (existingSlugs.includes(svc.slug)) {
    console.log(`  SKIP: ${svc.slug} (already exists)`);
    continue;
  }
  const { error } = await supabase.from('service_catalog').insert(svc);
  if (error) {
    console.error(`  FAIL: ${svc.slug}:`, error.message);
  } else {
    console.log(`  OK: ${svc.slug}`);
  }
}

// price_rules
console.log('Seeding price_rules...');

const { data: catalogData } = await supabase.from('service_catalog').select('id,slug');
const catalogMap = Object.fromEntries((catalogData || []).map((r) => [r.slug, r.id]));

const sizeRules = [
  { label: '少量（骨壷1/3程度）', price_amount: 0, sort_order: 1 },
  { label: '通常（骨壷1/2程度）', price_amount: 5000, sort_order: 2 },
  { label: '多め（骨壷いっぱい）', price_amount: 10000, sort_order: 3 },
  { label: '大量（複数骨壷）', price_amount: 20000, sort_order: 4 },
];

const conditionRules = [
  { label: '良好（変色・においなし）', price_amount: 0, sort_order: 1 },
  { label: 'カビあり', price_amount: 5000, sort_order: 2 },
  { label: '湿気あり', price_amount: 3000, sort_order: 3 },
  { label: '著しく損傷（欠損・土汚れ等）', price_amount: 8000, sort_order: 4 },
];

// 既存price_rulesのチェック
const { data: existingRules } = await supabase.from('price_rules').select('service_id,rule_type,label');
const existingSet = new Set((existingRules || []).map((r) => `${r.service_id}:${r.rule_type}:${r.label}`));

for (const [slug, rules, type] of [
  ['powdered', sizeRules, 'size'],
  ['powdered', conditionRules, 'condition'],
  ['cleaning', sizeRules, 'size'],
]) {
  const serviceId = catalogMap[slug];
  if (!serviceId) { console.log(`  SKIP: no service_id for ${slug}`); continue; }

  for (const rule of rules) {
    const key = `${serviceId}:${type}:${rule.label}`;
    if (existingSet.has(key)) { console.log(`  SKIP rule: ${rule.label}`); continue; }

    const { error } = await supabase.from('price_rules').insert({
      service_id: serviceId,
      rule_type: type,
      label: rule.label,
      price_amount: rule.price_amount,
      sort_order: rule.sort_order,
    });
    if (error) {
      console.error(`  FAIL rule: ${rule.label}:`, error.message);
    } else {
      console.log(`  OK rule: [${slug}/${type}] ${rule.label}`);
    }
  }
}

console.log('\nSeed complete!');
