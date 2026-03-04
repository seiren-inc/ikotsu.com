export interface ICDistanceToll {
  id: string;
  name: string;
  distanceKm: number;
  tollOneWay: number; // 戸塚ICからの一般（非ETC）片道普通車の高速料金目安
}

// 神奈川・東京・埼玉・千葉・栃木・静岡 の主要ICをリストアップ（戸塚IC起点・目安）
export const HIGHWAY_ICS: ICDistanceToll[] = [
  // --- 神奈川県 ---
  { id: 'kanagawa_01', name: '【神奈川】保土ヶ谷IC周辺', distanceKm: 5.0, tollOneWay: 320 },
  { id: 'kanagawa_02', name: '【神奈川】横須賀・三浦方面（横須賀IC）', distanceKm: 27.3, tollOneWay: 930 }, // 画像「横須賀」参考: 930円等
  { id: 'kanagawa_03', name: '【神奈川】川崎・横浜北方面（京浜川崎IC）', distanceKm: 18.0, tollOneWay: 710 },
  { id: 'kanagawa_04', name: '【神奈川】海老名・厚木方面（厚木・圏央厚木IC）', distanceKm: 25.0, tollOneWay: 880 }, // 圏央道接続
  { id: 'kanagawa_05', name: '【神奈川】小田原方面（小田原西IC）', distanceKm: 45.0, tollOneWay: 1450 },
  { id: 'kanagawa_06', name: '【神奈川】相模原方面（相模原IC/圏央道）', distanceKm: 40.0, tollOneWay: 1550 },
  { id: 'kanagawa_07', name: '【神奈川】鎌倉・藤沢（高速不要）', distanceKm: 10.0, tollOneWay: 0 },

  // --- 東京都（首都高主要出入口） ---
  { id: 'tokyo_01', name: '【東京・首都高】世田谷方面（池尻）', distanceKm: 34.0, tollOneWay: 1400 }, // 第三京浜経由+首都高など目安
  { id: 'tokyo_02', name: '【東京・首都高】新宿方面（初台/新宿）', distanceKm: 38.0, tollOneWay: 1500 },
  { id: 'tokyo_03', name: '【東京・首都高】都心中心部（本町/霞が関）', distanceKm: 35.0, tollOneWay: 1640 }, // 横浜新道・横羽線・首都高最大(1320)等の合計目安
  { id: 'tokyo_04', name: '【東京・首都高】板橋方面（板橋本町）', distanceKm: 48.0, tollOneWay: 1640 },
  { id: 'tokyo_05', name: '【東京・首都高】品川・羽田方面（空港西）', distanceKm: 30.0, tollOneWay: 1300 },
  { id: 'tokyo_06', name: '【東京・首都高】足立・葛飾方面（四つ木/錦糸町）', distanceKm: 50.0, tollOneWay: 1640 },
  { id: 'tokyo_07', name: '【東京・一般】八王子・多摩方面（八王子IC周辺）', distanceKm: 55.0, tollOneWay: 1800 },

  // --- 埼玉県 ---
  { id: 'saitama_01', name: '【埼玉・首都高】さいたま市付近（浦和南/美女木）', distanceKm: 57.0, tollOneWay: 1640 }, // 画像の横浜港北→浦和南の例(1320＋横浜新道等)参考
  { id: 'saitama_02', name: '【埼玉】所沢・川越方面（所沢IC）', distanceKm: 60.0, tollOneWay: 2000 },
  { id: 'saitama_03', name: '【埼玉】越谷・草加方面（外環三郷西/新郷）', distanceKm: 70.0, tollOneWay: 2300 },
  { id: 'saitama_04', name: '【埼玉】熊谷・深谷方面（花園IC）', distanceKm: 110.0, tollOneWay: 3300 },

  // --- 千葉県 ---
  { id: 'chiba_01', name: '【千葉】千葉市付近（穴川IC）', distanceKm: 80.0, tollOneWay: 2600 },
  { id: 'chiba_02', name: '【千葉】船橋・市川方面（湾岸市川IC）', distanceKm: 60.0, tollOneWay: 1900 },
  { id: 'chiba_03', name: '【千葉】柏・松戸方面（柏IC）', distanceKm: 85.0, tollOneWay: 2800 },
  { id: 'chiba_04', name: '【千葉】木更津方面（木更津金田IC）', distanceKm: 65.0, tollOneWay: 2800 }, // アクアライン経由想定

  // --- 栃木県 ---
  { id: 'tochigi_01', name: '【栃木】宇都宮方面（宇都宮IC）', distanceKm: 155.0, tollOneWay: 4500 },
  { id: 'tochigi_02', name: '【栃木】小山・佐野方面（佐野藤岡IC）', distanceKm: 120.0, tollOneWay: 3600 },
  { id: 'tochigi_03', name: '【栃木】那須方面（那須IC）', distanceKm: 210.0, tollOneWay: 5800 },

  // --- 静岡県 ---
  { id: 'shizuoka_01', name: '【静岡】沼津・三島方面（沼津IC）', distanceKm: 85.0, tollOneWay: 2600 },
  { id: 'shizuoka_02', name: '【静岡】静岡市付近（静岡IC）', distanceKm: 140.0, tollOneWay: 4100 },
  { id: 'shizuoka_03', name: '【静岡】浜松方面（浜松IC）', distanceKm: 215.0, tollOneWay: 6000 },
  { id: 'shizuoka_04', name: '【静岡】御殿場方面（御殿場IC）', distanceKm: 65.0, tollOneWay: 2000 },
];
