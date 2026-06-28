// Past-exam reference listening questions.
//
// This file is dynamically imported AFTER password verification (see
// pastExamAuth.js). It is therefore not bundled into the main JS chunk
// and only fetched when a verified user lands on the past-exam panel.
//
// IMPORTANT: These reproduce real past-exam items. Option order and the
// `answer` index are kept EXACTLY as they appear on the real exam — do
// NOT run balance-answers.mjs over this file. Accuracy to the original
// is the whole point.
//
// Passages are TTS scripts (single-narrator here). Numbers are spelled
// out for natural Google TTS playback. Two-speaker dialogues would use
// MAN: / WOMAN: markers (none needed in this L2 batch).
//
// Each entry shape matches listening-complete.js:
//   { level, topic, passage, question, options[4], answer (0-3), ex }
//
// ---------------------------------------------------------------------
// PENDING / MISSING (L2 batch):
//   • Audio "Dr. Green's office" (closed for bank holiday, reopens
//     tomorrow at eight thirty) — no QUESTION screenshot was provided,
//     so its stem/options/answer are unknown. Add once available.
// ---------------------------------------------------------------------

export const PAST_EXAM = [
  {
    level: 2,
    topic: "Police recruitment office — line busy",
    passage:
      "You have reached the police recruitment office. Our staff is busy at the moment. Please hold the line and someone will be with you shortly.",
    question: "According to this message...",
    options: [
      "the office is on line.",
      "no-one is free now.",
      "our staff is on hold.",
      "we are short of staff.",
    ],
    answer: 1,
    ex: "【正答】no-one is free now。 'Our staff is busy at the moment' = 今は誰も手が空いていない。'hold the line' は『電話を切らずに待つ』の意で、'our staff is on hold' (職員が保留中) とは別物 — ひっかけ。",
  },
  {
    level: 2,
    topic: "Embassy passport office — opening days",
    passage:
      "This is the South African Embassy passport office. We are open Monday, Wednesday, and Friday from nine to noon only. Thank you for calling.",
    question: "The Passport Office...",
    options: [
      "is open on alternate days.",
      "has special weekend hours.",
      "is open after lunch.",
      "is always closed until noon",
    ],
    answer: 0,
    ex: "【正答】is open on alternate days。 月・水・金 = 一日おき (alternate days)。'from nine to noon' は昼まで＝午後は閉まっているが、'is open after lunch' は逆。'closed until noon' も誤り (正午まで開いている)。",
  },
  {
    level: 2,
    topic: "Water company — report consumption",
    passage:
      "Westchester Water Company. To report your monthly water consumption, please dial your customer number, then wait for further instructions.",
    question: "The water company...",
    options: [
      "is considering charging new rates.",
      "uses an identification number for each client.",
      "is notifying its customers of changes.",
      "is waiting for your instructions.",
    ],
    answer: 1,
    ex: "【正答】uses an identification number for each client。 'dial your customer number' = 各顧客に固有の番号(=識別番号)がある。'wait for further instructions' は『あなたが』指示を待つ意味で、会社があなたの指示を待つ 'waiting for your instructions' は逆 — ひっかけ。",
  },
  {
    level: 2,
    topic: "News — riot police warning shots",
    passage:
      "A car carrying student activists crashed into a group of riot police on Wednesday, injuring nine people and causing the police to fire warning shots on the crowd. It was the second day of violence as protesters continued to demonstrate against a government assembly that is preparing election rules. Protesters claim the assembly is only using the promise of democratic change to maintain the old political order.",
    question: "According to this news item, riot police fired shots into the crowd to...",
    options: [
      "break up the protest.",
      "make the crowds even more angry.",
      "warn the protesters of danger.",
      "injure the 9 protesters.",
    ],
    answer: 2,
    ex: "【正答】warn the protesters of danger。 'warning shots' = 警告射撃なので『危険を警告するため』。負傷した9人は車の衝突によるもので射撃ではない — 'injure the 9' はひっかけ。",
  },
  {
    level: 2,
    topic: "Answering machine — reach at office",
    passage:
      "Hi. I'm sorry I can't come to the phone right now. If it's urgent, you can reach me at the office. Thanks.",
    question: "The caller...",
    options: [
      "can phone another number.",
      "must go directly to the office.",
      "can make sure it's urgent.",
      "can't be reached at work.",
    ],
    answer: 0,
    ex: "【正答】can phone another number。 'reach me at the office' = 職場の(別の)番号にかけられる。『職場に直接行け』(go directly) ではない。",
  },
  {
    level: 2,
    topic: "IRS — tax help appointment",
    passage:
      "This is the IRS. If you need assistance in completing your tax forms, please press three to arrange an appointment with one of our consultants. The deadline for tax returns is March thirty-first.",
    question: "This message states that...",
    options: [
      "tax forms must be mailed after March 31st.",
      "you do not require an appointment to get help.",
      "all taxpayers are required to pay for help.",
      "you can make an appointment immediately",
    ],
    answer: 3,
    ex: "【正答】you can make an appointment immediately。 'press three to arrange an appointment' = その場で予約できる。締切は3月31日『まで』であって『以降』ではない (A は誤り)。相談には予約が必要 (B は逆)。",
  },
  {
    level: 2,
    topic: "News — security zone handover",
    passage:
      "The move will effectively hand over control of the zone to the Colombian Revolutionary Armed Forces guerrilla group for at least ninety days. Colombian officials fear, however, that the rebels could take advantage of the security vacuum to smuggle drugs out of the region.",
    question: "According to the report, the move by police security forces will...",
    options: [
      "strengthen its own position.",
      "give control of the area to its opposition.",
      "prepare it for a massive military attack.",
      "not affect the balance of power in any way.",
    ],
    answer: 1,
    ex: "【正答】give control of the area to its opposition。 'hand over control of the zone to the ... guerrilla group' = 敵対勢力(ゲリラ)に支配を譲り渡す。自軍の立場強化 (A) とは逆。",
  },
  {
    level: 2,
    topic: "News — protest over assembly",
    passage:
      "A car carrying student activists crashed into a group of riot police on Wednesday, injuring nine people and causing the police to fire warning shots on the crowd. It was the second day of violence as protesters continued to demonstrate against a government assembly that is preparing election rules. Protesters claim the assembly is only using the promise of democratic change to maintain the old political order.",
    question: "The crowds were protesting about...",
    options: [
      "the government assembly's schedule.",
      "the false promise of democratic change.",
      "a problem for the new police chief.",
      "the organization of the police riot squad",
    ],
    answer: 1,
    ex: "【正答】the false promise of democratic change。 'using the promise of democratic change to maintain the old political order' = 民主的変化の約束は見せかけで旧体制維持が目的、という抗議。",
  },
  {
    level: 2,
    topic: "Vending machine — payment",
    passage:
      "Please insert two dollars in bills or coins. Do not proceed until you see the green light. Thank you.",
    question: "This message states that....",
    options: [
      "you may use a credit card for payment.",
      "you must ask for the green light.",
      "you must put money into the machine.",
      "you can use foreign coins.",
    ],
    answer: 2,
    ex: "【正答】you must put money into the machine。 'insert two dollars in bills or coins' = 紙幣か硬貨を投入する。green light は『出るまで待つ』合図で『要求する』ものではない (B はひっかけ)。",
  },
  {
    level: 2,
    topic: "Law office — Robert Ison away",
    passage:
      "This is Robert Ison. I'll be at the lawyers' convention all of next week. If you have any urgent questions, please contact my partner, Bill Friedman.",
    question: "Robert Eisen...",
    options: [
      "is a Columbia University graduate.",
      "is responsible for the Friedman cases.",
      "will be out of the office for a week.",
      "is holding a convention for his firm.",
    ],
    answer: 2,
    ex: "【正答】will be out of the office for a week。 'at the lawyers' convention all of next week' = 来週いっぱい不在。Bill Friedman は連絡先の同僚で『Friedman 案件の担当』ではない (B はひっかけ)。",
  },
  {
    level: 2,
    topic: "Qantas — flights cancelled",
    passage:
      "This is Qantas Airlines. Because of a ground staff strike, all our flights for today have been cancelled. Full service will resume at twelve o'clock midnight. For further information, please dial two.",
    question: "Qantas...",
    options: [
      "will be back in service tomorrow.",
      "will cancel all flights after midnight.",
      "wishes to go on strike at midnight.",
      "cannot help you further.",
    ],
    answer: 0,
    ex: "【正答】will be back in service tomorrow。 'Full service will resume at twelve o'clock midnight' = 深夜0時＝翌日から再開。ストライキをするのは地上職員であって Qantas 自身ではない (C は逆)。",
  },
  {
    level: 2,
    topic: "Tate Gallery — exhibition tickets",
    passage:
      "This is the Tate Gallery. This month's exhibition on French Impressionism will open on Thursday, July the sixth. We advise you to get tickets as soon as possible to avoid any disappointment.",
    question: "According to this message, the caller...",
    options: [
      "needs to become a member of the gallery.",
      "will be impressed by the exhibit.",
      "should book ahead for the exhibition.",
      "cannot avoid a disappointment.",
    ],
    answer: 2,
    ex: "【正答】should book ahead for the exhibition。 'get tickets as soon as possible to avoid any disappointment' = 早めに予約せよ。'cannot avoid disappointment' は逆 (早く取れば回避できる)。",
  },
  {
    level: 2,
    topic: "News — officials fear drug smuggling",
    passage:
      "The move will effectively hand over control of the zone to the Colombian Revolutionary Armed Forces guerrilla group for at least ninety days. Colombian officials fear, however, that the rebels could take advantage of the security vacuum to smuggle drugs out of the region.",
    question: "Officials fear that...",
    options: [
      "the public will sympathize with the rebels.",
      "there will be no advantage in a security vacuum.",
      "rebels will take drugs out of the area.",
      "the police force will secretly profit from drug trafficking",
    ],
    answer: 2,
    ex: "【正答】rebels will take drugs out of the area。 'smuggle drugs out of the region' = 地域から麻薬を密輸出する。'take advantage of the security vacuum' を 'no advantage' と取り違えさせる B はひっかけ。",
  },
  {
    level: 2,
    topic: "Disconnected number — operator",
    passage:
      "The number you have reached is temporarily disconnected. Please hang up and dial zero for operator assistance.",
    question: "This message states that...",
    options: [
      "the operator is temporarily unavailable.",
      "you can now be connected temporarily.",
      "you must phone the operator's assistant.",
      "you must dial another extension for help.",
    ],
    answer: 3,
    ex: "【正答】you must dial another extension for help。 'dial zero for operator assistance' = 別の番号(0)にかけ直す。一時的に切れているのは『番号(回線)』であってオペレーター自身ではない (A はひっかけ)。",
  },
  {
    level: 2,
    topic: "Phone message — Ian cancels",
    passage:
      "Anna, hi. This is Ian. I'm really sorry, but I can't meet you tonight for the movies. I'll talk to you later. Bye.",
    question: "Ian...",
    options: [
      "will talk to Anna at the movies.",
      "cannot meet Anna.",
      "is going to Anna's house.",
      "is not at home.",
    ],
    answer: 1,
    ex: "【正答】cannot meet Anna。 'I can't meet you tonight for the movies' = 今夜は会えない。'I'll talk to you later' は『後で電話で話す』で『映画館で話す』ではない (A はひっかけ)。",
  },
];
