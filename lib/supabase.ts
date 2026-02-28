import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * ブラウザ/サーバーコンポーネント共用のSupabaseクライアント
 * 公開データ（サービス / FAQ / 記事 / 料金）の読み取りに使用
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
