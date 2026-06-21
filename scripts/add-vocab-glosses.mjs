// One-shot: prepend a Japanese gloss to each vocab question's `ex` field.
// Maps full `question:` text → Japanese gloss for the term being tested.
// Re-running is safe: skips lines whose ex already starts with 【意味】.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const path = resolve(__dirname, '..', 'src', 'vocab-data.js');

const glosses = {
  // ===== L1 =====
  "A soldier is told to 'stand by'. What does this mean?": "待機する／そのまま待て",
  "What does 'FOB' stand for?": "前進作戦基地（FOB）",
  "What is a 'sitrep'?": "状況報告（SITREP）",
  "In NATO radio procedure, what does 'Roger' mean?": "了解・受信完了",
  "What is a 'checkpoint'?": "検問所",
  "What does 'personnel' mean?": "要員・人員",
  "What is a 'briefing'?": "説明会・ブリーフィング",
  "What does 'deploy' mean in military context?": "展開する・派遣する",
  "What is the 'mess hall'?": "食堂",
  "What does 'casualty' mean?": "死傷者",
  "What is 'MEDEVAC' short for?": "医療後送（メドエバック）",
  "What does 'chain of command' refer to?": "指揮系統",
  "What does 'in transit' mean?": "移動中・輸送中",
  "What is an 'objective' in military context?": "任務目標",
  "What does 'mandatory' mean?": "必須の・義務的な",
  "What does 'AWOL' stand for?": "無断離隊（AWOL）",
  "What is an 'NCO'?": "下士官（NCO）",
  "What does the order 'Dismissed!' mean at the end of a formation?": "解散！",
  "What is a 'rendezvous point'?": "集合地点・会同点（RV）",
  "What is a 'patrol' in military operations?": "哨戒（パトロール）",
  "What does 'ammunition' mean?": "弾薬",
  "What are 'barracks'?": "兵舎",
  "What is 'reveille' on a military base?": "起床ラッパ",
  "What does 'KIA' stand for?": "戦死（Killed in Action）",
  "What does 'extract' mean in the order 'extract the team'?": "救出・収容する",
  "What does 'POW' stand for?": "戦争捕虜（POW）",
  "What does 'requisition' mean in a supply context?": "支給要求・請求",
  "What is a 'salute' in military custom?": "敬礼",
  "What does 'uniform' mean?": "制服・軍服",
  "What does 'rank' mean in the military?": "階級",
  "What is a 'squad'?": "分隊",
  "What is a 'platoon'?": "小隊",
  "What is a 'company' in a military sense?": "中隊",
  "What is a 'battalion'?": "大隊",
  "What is a 'brigade'?": "旅団",
  "What does 'enlisted' mean?": "兵卒・下士官（非士官）",
  "What is a 'recruit'?": "新兵",
  "What does 'veteran' mean?": "退役軍人・ベテラン",
  "What does 'discharge' mean in personnel context?": "除隊",
  "What does 'leave' mean in military personnel terms?": "休暇",
  "What is 'drill' in military training?": "教練・訓練",
  "What is 'boot camp'?": "新兵訓練",
  "What is a 'dog tag'?": "認識票",
  "What does 'PT' stand for in the military?": "体力錬成（Physical Training）",
  "What is 'chow' in military slang?": "食事（俗語）",
  "What does 'duty' mean in military service?": "勤務・任務",
  "What is a 'roster'?": "勤務名簿・当番表",
  "What is a 'convoy'?": "車列・護送車隊",
  "What is a 'base' in the military sense?": "基地",
  "What does 'gear' mean in military usage?": "装備・装具",
  "What is a 'ration' in military supply?": "糧食・配給食",
  "What does 'supply' mean as a noun in logistics?": "補給物資",

  // ===== L2 =====
  "What does 'Rules of Engagement (ROE)' refer to?": "交戦規則（ROE）",
  "What does 'OPORD' stand for?": "作戦命令書（Operation Order）",
  "What is meant by 'escalation of force'?": "武力の段階的行使",
  "What does 'force protection' mean?": "部隊防護",
  "What does 'collateral damage' mean?": "巻き添え損害・付随被害",
  "What is 'logistics' in military operations?": "兵站・ロジスティクス",
  "What does 'reconnaissance' (recon) mean?": "偵察",
  "What is meant by 'imminent threat'?": "切迫した脅威",
  "What does 'adverse' mean?": "不利な・好ましくない",
  "What does 'comply' mean?": "順守する・従う",
  "What is a 'caveat' in NATO operations?": "国別制限事項・留保",
  "What does 'sustainment' mean in operations?": "持続的支援・継続維持",
  "What does 'mitigate' mean?": "軽減する・緩和する",
  "What does 'prerequisite' mean?": "前提条件",
  "What does 'perimeter' mean?": "外周・警戒線",
  "What is an 'ambush'?": "待ち伏せ",
  "What does 'surveillance' mean?": "監視",
  "What does 'doctrine' mean in a military context?": "ドクトリン・教義",
  "What does 'evacuation' mean?": "避難・後送",
  "What does 'fortify a position' mean?": "陣地を強化する・防御を固める",
  "What does it mean to 'neutralize' a threat?": "無力化する",
  "What is a 'liaison officer'?": "連絡幕僚・リエゾン将校",
  "What does 'enforce' mean?": "強制する・執行する",
  "What does 'provision' mean as a verb?": "補給する・調達する",
  "What does 'detain' mean?": "拘束する",
  "What is 'counterinsurgency' (COIN)?": "対反乱作戦（COIN）",
  "What does 'CASEVAC' stand for?": "戦傷後送（Casualty Evacuation）",
  "What does 'comprise' mean?": "〜から成る・構成する",
  "What does 'flank' mean in military operations?": "側面・ウィング",
  "What does 'take cover' mean?": "遮蔽を取る・伏せろ",
  "What does 'intercept' mean?": "迎撃する・傍受する",
  "What does 'infiltrate' mean?": "潜入する",
  "What does 'exfiltrate' mean?": "退出する・離脱する",
  "What does 'withdraw' mean in military operations?": "撤退する",
  "What does 'reinforce' mean?": "増援する・強化する",
  "What does 'engagement' mean in military context?": "交戦",
  "What does 'debrief' mean?": "事後報告・デブリーフ",
  "What does 'compliance' mean?": "順守・遵守",
  "What does 'breach' mean as a verb in operations?": "突破する・違反する",
  "What is a 'cordon' in security operations?": "包囲線・コードン",
  "What does 'envelop' mean in tactics?": "包囲する",
  "What does 'suppress' mean in combat?": "制圧する",
  "What does 'covert' mean?": "隠密の",
  "What does 'overt' mean?": "公然の・公開の",
  "What does 'clandestine' mean?": "秘密の・極秘の",
  "What does 'corroborate' mean?": "裏付ける・確証する",
  "What does 'allege' mean?": "（未確認で）主張する",
  "What does 'presume' mean?": "推定する・前提とする",
  "What does 'authorize' mean?": "許可する・認可する",
  "What does 'revoke' mean?": "取り消す・撤回する",
  "What does 'delegate' mean as a verb?": "委任する",
  "What does 'coordinate' mean in joint operations?": "調整する・連携する",
  "What does 'notify' mean?": "通知する",

  // ===== L3 =====
  "What is 'deterrence' in NATO strategy?": "抑止",
  "What does 'interoperability' mean in NATO doctrine?": "相互運用性",
  "What is a 'mandate' in peacekeeping?": "委任権限・授権",
  "What does 'asymmetric warfare' refer to?": "非対称戦",
  "What is 'situational awareness' (SA)?": "状況認識（SA）",
  "What does 'attribution' mean in cyber security?": "攻撃元の特定",
  "What does 'cohesion' mean in alliance context?": "結束・団結",
  "What does 'proportionate' mean in military response?": "均衡のとれた・比例した",
  "What is a 'contingency plan'?": "不測事態対処計画",
  "What does 'precedent' mean?": "先例・判例",
  "What does 'consensus' mean in NATO decision-making?": "コンセンサス・総意",
  "What does 'invoke' mean?": "発動する・援用する",
  "What does 'ambiguity' mean?": "曖昧さ",
  "What does 'paramount' mean?": "最重要の・至上の",
  "What does 'consolidate' mean in operations?": "強化・統合する",
  "What does 'coercion' mean in strategic context?": "強制・強要",
  "What does 'legitimacy' mean in international operations?": "正統性・合法性",
  "What does 'resilience' mean in NATO doctrine?": "強靭性・レジリエンス",
  "What does 'force posture' refer to?": "戦力態勢",
  "What is 'hybrid warfare'?": "ハイブリッド戦",
  "What does 'multilateral' mean?": "多国間の",
  "What does 'bilateral' mean in a diplomatic context?": "二国間の",
  "What does 'parity' mean in strategic balance?": "均衡・対等性",
  "What does 'unilateral' mean?": "単独の・一方的な",
  "What does 'proliferation' mean in WMD context?": "拡散",
  "What is a 'coalition' in military terms?": "連合・有志連合",
  "What are 'sanctions' in international policy?": "制裁",
  "What does 'de-escalate' mean in a crisis?": "緊張を緩和する",
  "What does 'preemptive' mean in strategic context?": "先制の",
  "What does 'retaliation' mean?": "報復",
  "What is 'brinkmanship' in strategic theory?": "瀬戸際政策",
  "What does 'containment' mean in foreign policy?": "封じ込め",
  "What does 'appeasement' mean?": "宥和（ゆうわ）政策",
  "What is 'détente' in international relations?": "デタント・緊張緩和",
  "What does 'rapprochement' mean?": "関係改善・再接近",
  "What does 'polarization' mean in geopolitics?": "二極化",
  "What does 'realignment' mean in alliances?": "再編・再構成",
  "What does 'recalibration' mean in policy?": "再調整",
  "What does 'constraint' mean in strategic context?": "制約",
  "What does 'leverage' mean as a noun in negotiation?": "影響力・てこ",
  "What does 'provisional' mean?": "暫定的な",
  "What does 'nominal' mean in usage like 'nominal control'?": "名目上の",
  "What does 'substantive' mean?": "実質的な",
  "What does 'articulate' mean as a verb?": "明確に述べる・表現する",
  "What does 'delineate' mean?": "明確に定義する・線を引く",
  "What does 'demarcate' mean?": "境界を定める",
  "What does 'convene' mean?": "招集する",
  "What does 'ratify' mean in treaty law?": "批准する",
  "What does 'enshrine' mean in policy context?": "明記する・定着させる",
  "What does 'promulgate' mean?": "公布する",
  "What is an 'accord' in international relations?": "協定・合意",
  "What is a 'communiqué' in diplomacy?": "共同声明・コミュニケ",
  "What is a 'dossier'?": "書類一式・ドシエ",

  // ===== L4 =====
  "What is 'strategic ambiguity' in defence policy?": "戦略的曖昧性",
  "What does 'burden sharing' mean in NATO?": "負担共有",
  "What does 'escalation dominance' mean?": "エスカレーション支配",
  "What does 'non-kinetic effect' mean?": "非運動的効果",
  "What does 'plausible deniability' mean?": "関与否認の余地",
  "What does 'predicated upon' mean?": "〜に基づいた",
  "What does 'inadvertent' mean?": "意図せざる・偶発的な",
  "What does 'centrifugal' mean in alliance context?": "求心力に反する・遠心の",
  "What does 'salience' mean?": "顕著性・重要性",
  "What does 'paradigmatic' mean?": "典型例となる・パラダイム的な",
  "What does 'asymmetry' mean?": "非対称性",
  "What does 'subordinated' mean?": "従属させられた",
  "What does 'preclude' mean?": "排除する・不可能にする",
  "What does 'compromise' mean as a verb in security context?": "（機密などを）危殆化する・損なう",
  "What does 'commensurate' mean?": "釣り合った・相応の",
  "What does 'attrition' mean in a military context?": "消耗（戦）",
  "What does 'cognizant of' mean?": "〜を認識して・〜を踏まえて",
  "What does 'extant' mean?": "現存する・現行の",
  "What does 'exigency' mean?": "緊急の必要・急場",
  "What does 'obviate' mean?": "不要にする・回避する",
  "What does 'concomitant' mean?": "付随する",
  "What does 'tacit' mean?": "暗黙の",
  "What does 'nascent' mean?": "黎明期の・発生したばかりの",
  "What does 'tantamount to' mean?": "〜に等しい・〜も同然",
  "What does 'underpin' mean?": "支える・土台となる",
  "What does 'ostensibly' mean?": "表向きは・見かけ上",
  "What is a 'corollary'?": "必然的帰結・当然の結果",
};

const src = readFileSync(path, 'utf8');
const lines = src.split('\n');

let matched = 0;
let alreadyGlossed = 0;
const unmatched = new Set(Object.keys(glosses));

const out = lines.map((line) => {
  const qm = line.match(/question:\s*"((?:[^"\\]|\\.)*)"/);
  if (!qm) return line;
  const qtext = qm[1];
  const gloss = glosses[qtext];
  if (!gloss) return line;
  unmatched.delete(qtext);
  // Skip if already prefixed
  if (/ex:\s*"【意味】/.test(line)) {
    alreadyGlossed++;
    return line;
  }
  matched++;
  return line.replace(/ex:\s*"/, `ex: "【意味】${gloss}。 `);
});

writeFileSync(path, out.join('\n'));

console.log(`Glossed ${matched} questions. Already glossed: ${alreadyGlossed}.`);
if (unmatched.size) {
  console.log(`\nUnmatched (${unmatched.size}):`);
  for (const q of unmatched) console.log(`  - ${q}`);
}
