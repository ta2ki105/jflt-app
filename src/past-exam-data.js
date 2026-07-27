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
// Passages are TTS scripts. Numbers are spelled out for natural Google
// TTS playback. Speaker turns use per-line markers so each voice plays
// separately (see AudioPlayer.parseTurns / voicePrefs.resolveVoice):
//   M1 / MAN   → male voice          F1 / WOMAN → female (narrator)
//   M2         → 2nd, distinct male  F2         → 2nd, distinct female
// A single-speaker passage needs no marker (plays in the default voice),
// but the L3 batch marks M1 anyway so the male voice is used explicitly.
// Stage directions (audience laughter, etc.) and the narrator's closing
// re-read of the question are stripped — the question shows on screen.
//
// Each entry shape matches listening-complete.js:
//   { level, topic, passage, question, options[4], answer (0-3), ex }
//
// This file mixes real-exam batches:
//   • L2 listening — single-narrator recorded messages/news
//   • L3 listening — interviews, briefings and two-person phone
//     dialogues (M1/M2/F1 markers). Two questions can share one
//     dialogue (police-prostitution No.33/34, traffic-accident No.31/32).
//   • L2 + L3 reading — short memos/ads/news passages, `category:
//     'reading'` (see below). Read silently, not TTS scripts; several
//     questions share one passage (Ocalan extradition, multinationals
//     lawsuit-shield law, Bangladesh arsenic, Hong Kong kidnapping,
//     Master Sgt Miles bombing, NEST nuclear device).
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
    starred: true, // confirmed to appear on the real exam
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

  // -------------------------------------------------------------------
  // L3 batch — interviews / briefings / two-person phone dialogues.
  // Speaker markers (M1/M2/F1) drive per-voice playback.
  // -------------------------------------------------------------------
  {
    level: 3,
    topic: "Pentagon briefing — QDR (No.27)",
    passage:
      "M1: I appreciate the opportunity to address the Council on Foreign Relations, this productive and influential body. The Council has many claims to fame, including its having been featured in a diverse set of innate conspiracy theories, figments of the fevers of both the left-wing and the right. I can now empathize. As one bugbear to another, I say it's good to be here with you. The policy organization, my office at the Pentagon, is now doing its part in the Quadrennial Defense Review, the QDR, which the Congress has mandated. The review requires organizations throughout the Defense Department to consider which capabilities we'll need in the coming years. The foundation of the QDR is a defense strategy which is nested within our National Security Strategy. So we've been obliged to think and rethink our most wide-ranging and basic ideas. It's a healthy practice to review the basics, to question the formulation of our national security aims and re-chew our policy assumptions. Stale thought makes for bad strategy.",
    question: "The speaker leads us to believe that he will discuss...",
    options: [
      "national security goals.",
      "conspiracy theories.",
      "bad strategy.",
      "Quadrennial Defense Review (QDR) procedures.",
    ],
    answer: 0,
    ex: "【正答】national security goals（国家安全保障の目標）。 'question the formulation of our national security aims' = 国家安全保障の目的を問い直す、が本題。QDR は手段として触れるだけ (D はひっかけ)、conspiracy theories と bad strategy は前振り・締めの一言にすぎない。",
  },
  {
    level: 3,
    topic: "Space tourism — risk (No.21)",
    starred: true, // confirmed to appear on the real exam
    passage:
      "F1: Based on the number of fatalities since man's space exploration began in nineteen sixty-one, what is the existing percentage chance of dying in a space-related activity? For example, training, actual flight, or re-entry.\nM1: That's an interesting question. The major distinction to make here is that most of the efforts I write about in this week's magazine are aimed at suborbital space, the region one hundred kilometers above the Earth where space is said to begin. There's no real boundary because the atmosphere gradually thins as you get higher. But at one hundred kilometers, you are avoiding most of the heating challenges of re-entry that pose a serious threat. The idea with most of these private companies is to develop reliable, reusable launching vehicles, similar to airplanes, to take tourists into suborbital space. There would still be one heck of a view and a gravity-less environment. Hence the idea is to generate a sustainable business around tourism that creates some excitement to fuel, in turn, the next generation of technologies for flight beyond the atmosphere.",
    question: "The man asserts that risk to space tourists can be minimized by...",
    options: [
      "increasing training.",
      "flying in suborbital space.",
      "better atmospheric research.",
      "the next generation of technologies.",
    ],
    answer: 1,
    ex: "【正答】flying in suborbital space（弾道飛行・サブオービタル）。 高度100kmの suborbital では 're-entry that pose a serious threat'（再突入の加熱リスク）を避けられる、と述べている。next generation of technologies (D) はツーリズムが生み出す将来の話で、リスク低減の手段ではない。",
  },
  {
    level: 3,
    topic: "Ford recall — ignition module (No.43)",
    starred: true, // confirmed to appear on the real exam
    passage:
      "M1: A state court judge here in Oakland, California, Judge Michael Ballachey, today told Ford that he is going to order them to recall an estimated two million cars in California. There are cars across three hundred models in California. They all carry what is called a thick film ignition module. The contention in this class-action lawsuit was that Ford mounted this module too close to the engine, that it would get hot and that the vehicles were prone to stalling. When you're doing fifty or sixty miles per hour down the freeway and your car stalls, you're in trouble, said the lawyers. But Ford contends all along that these vehicles are statistically no less safe, that the stall factor was no more significant than other vehicles with other ignition systems installed. Ford says it intends to appeal.",
    question: "In what way is the vehicle faulty?",
    options: [
      "it is slow to ignite.",
      "it lacks a module.",
      "a module overheats.",
      "it is slightly top-heavy.",
    ],
    answer: 2,
    ex: "【正答】a module overheats（モジュールがオーバーヒートする）。 'mounted this module too close to the engine, that it would get hot' = エンジンに近すぎて熱を持つ→失速。モジュールが『不足』(B) しているのではなく、位置が悪く過熱するのが欠陥。",
  },
  {
    level: 3,
    topic: "Global warming — speaker's view (No.39)",
    passage:
      "M1: I personally believe that there should be some slight warming, but I think the warming will be much less than the current models predict. Much less. And I think it will be barely detectable. Perhaps it will be detectable, perhaps not. And it certainly will not be consequential. That is, it won't make any difference to people. After all, we get climate changes by one hundred degrees Fahrenheit in some places on the Earth. So what difference does a one-degree change make over a hundred years?",
    question: "What does the speaker think about the predicted effects of global warming?",
    options: [
      "they are insignificant.",
      "they are being politicized.",
      "they are of some concern.",
      "they are highly alarming.",
    ],
    answer: 0,
    ex: "【正答】they are insignificant（些細なものである）。 'barely detectable ... will not be consequential ... won't make any difference to people' = ほとんど検知できず影響もない、と軽視している。'some concern' (C) や 'highly alarming' (D) は逆。",
  },
  {
    level: 3,
    topic: "Police call — prostitution complaint (No.34)",
    passage:
      "M1: Fourteenth Precinct, Sergeant O'Reilly speaking.\nM2: Uh look, I need to talk to somebody about what's going on in my building. Like, I think it's full of hookers.\nM1: Whoa, just hold on there. You mean there are prostitutes in your apartment building? Are they using the premises as a place of business?\nM2: Ha, let's just say that I see a lot of men coming in and out of that building at all times, and I don't think they're Jehovah's Witnesses.\nM1: Hmm, you'll have to have more concrete evidence than that if you wish to file a complaint.\nM2: Well, the women come in with different men all the time, then the men nearly always leave the building alone. Seems pretty obvious to me.\nM1: Okay, do you want to make an official complaint?\nM2: Actually, I'd preferred if some police officers just came down here and scared them a little bit. You know, if they were afraid, that might be enough to stop them without getting the law involved.\nM1: Okay, but frankly, I doubt it will work.\nM2: Why do you say that?\nM1: Because prostitution is such a lucrative business, it's not easy to scare these people.\nM2: I'd really like you to try though, and then maybe turn to heavier tactics afterwards.\nM1: Okay, just hold the line and I'll get all the particulars.\nM2: Thank you.",
    question: "The caller wishes to...",
    options: [
      "prosecute suspected prostitutes.",
      "change address because of the prostitution in his building.",
      "warn suspected prostitutes to stop their business.",
      "involve police in a cover-up.",
    ],
    answer: 2,
    ex: "【正答】warn suspected prostitutes to stop their business（警告して商売をやめさせる）。 通報者は 'scared them a little bit ... enough to stop them without getting the law involved' = 法的手続きなしに脅して商売をやめさせたい、と言っている。起訴 (A) は望んでいない。",
  },
  {
    level: 3,
    topic: "Police call — officer's view (No.33)",
    passage:
      "M1: Fourteenth Precinct, Sergeant O'Reilly speaking.\nM2: Uh look, I need to talk to somebody about what's going on in my building. Like, I think it's full of hookers.\nM1: Whoa, just hold on there. You mean there are prostitutes in your apartment building? Are they using the premises as a place of business?\nM2: Ha, let's just say that I see a lot of men coming in and out of that building at all times, and I don't think they're Jehovah's Witnesses.\nM1: Hmm, you'll have to have more concrete evidence than that if you wish to file a complaint.\nM2: Well, the women come in with different men all the time, then the men nearly always leave the building alone. Seems pretty obvious to me.\nM1: Okay, do you want to make an official complaint?\nM2: Actually, I'd preferred if some police officers just came down here and scared them a little bit. You know, if they were afraid, that might be enough to stop them without getting the law involved.\nM1: Okay, but frankly, I doubt it will work.\nM2: Why do you say that?\nM1: Because prostitution is such a lucrative business, it's not easy to scare these people.\nM2: I'd really like you to try though, and then maybe turn to heavier tactics afterwards.\nM1: Okay, just hold the line and I'll get all the particulars.\nM2: Thank you.",
    question: "The police officer...",
    options: [
      "thinks the caller's tactic will be unsuccessful.",
      "does not believe the caller is serious.",
      "already knows about the prostitution.",
      "accepts the idea of a cover-up.",
    ],
    answer: 0,
    ex: "【正答】thinks the caller's tactic will be unsuccessful（作戦はうまくいかないと考えている）。 'I doubt it will work ... prostitution is such a lucrative business, it's not easy to scare these people' = 儲かる商売なので脅しは効かない、と見ている。",
  },
  {
    level: 3,
    topic: "Emergency call — accident (No.32)",
    passage:
      "M1: Emergency, Captain Bromes speaking.\nM2: Yeah, look, I've just had an accident and I need some help and an ambulance, I think. But I don't know how badly they're injured and...\nM1: Okay, okay. Calm down, sir. Where exactly are you?\nM2: Well, I'm on Ocean Highway, about forty kilometers north of Sydney.\nM1: And how many vehicles are involved?\nM2: Just my vehicle. It's very foggy up here and I was doing about eighty when I saw something on the road ahead. I swerved to miss it and ended up going off the road. I rolled the car and now I'm stuck in a ditch.\nM1: Okay, listen. Keep the injured passengers covered and as warm as possible. We'll send an ambulance from North Sydney Hospital and contact a tow truck. They'll be there in about ten minutes. Just stay put.\nM2: Okay, thanks.",
    question: "The police officer has promised to send...",
    options: [
      "a helicopter ambulance.",
      "a police escort.",
      "a tow truck and ambulance.",
      "an ambulance and a mechanic.",
    ],
    answer: 2,
    ex: "【正答】a tow truck and ambulance（レッカー車と救急車）。 'We'll send an ambulance from North Sydney Hospital and contact a tow truck' = 救急車とレッカー車を手配する。整備士 (mechanic) やヘリは出てこない。",
  },
  {
    level: 3,
    topic: "Emergency call — driver's report (No.31)",
    passage:
      "M1: Emergency, Captain Bromes speaking.\nM2: Yeah, look, I've just had an accident and I need some help and an ambulance, I think. But I don't know how badly they're injured and...\nM1: Okay, okay. Calm down, sir. Where exactly are you?\nM2: Well, I'm on Ocean Highway, about forty kilometers north of Sydney.\nM1: And how many vehicles are involved?\nM2: Just my vehicle. It's very foggy up here and I was doing about eighty when I saw something on the road ahead. I swerved to miss it and ended up going off the road. I rolled the car and now I'm stuck in a ditch.\nM1: Okay, listen. Keep the injured passengers covered and as warm as possible. We'll send an ambulance from North Sydney Hospital and contact a tow truck. They'll be there in about ten minutes. Just stay put.\nM2: Okay, thanks.",
    question: "The driver has reported...",
    options: [
      "a stolen vehicle.",
      "a multiple-car crash.",
      "a traffic jam.",
      "a crashed vehicle with injured passengers.",
    ],
    answer: 3,
    ex: "【正答】a crashed vehicle with injured passengers（負傷者のいる車両事故）。 'I've just had an accident ... Just my vehicle ... I rolled the car' + 'injured passengers' = 自車単独の横転事故で負傷者あり。多重衝突 (B) ではなく 'just my vehicle'。",
  },
  {
    level: 3,
    topic: "Talk — deadliest animal (No.—)",
    passage:
      "M1: I came to Australia to study the deadliest animal in the world. Now, there may be some Australian audience members thinking, Strewth, science is finally recognizing the importance of the drop bears! But I'm not studying drop bears. Because around the world, by transmitting diseases like malaria and dengue fever, mosquitoes kill more than a million people every year, making them the deadliest animal on the planet. Now, in Australia, the most common mosquito-borne disease is Ross River virus, and it occurs at high rates in some areas but not others. My question is why? What is it about certain areas that makes them breed disease? If we can understand the environmental factors that contribute to disease transmission, then we can alter the environment or target our control efforts to prevent human infections. But to answer that question, I had to find out where the infected mosquitoes were in South Australia. And traditionally, testing mosquitoes for virus has always been difficult. So I used a new technique. It takes these cards, which are impregnated with virus-preserving chemicals, and coats them in honey. Mosquitoes will come to feed on the honey, and in the process, spit virus onto the card where it can later be detected. Now, no one had ever used this technique in a broad-scale virus survey before, so I had to adapt it.",
    question: "The speaker went to Australia to...",
    options: [
      "eradicate mosquitoes from Australia.",
      "experiment on humans to kill mosquitoes.",
      "study the most lethal creature on earth.",
      "finance a new genetic research.",
    ],
    answer: 2,
    ex: "【正答】study the most lethal creature on earth（地球上で最も致命的な生物を研究する）。 'I came to Australia to study the deadliest animal in the world' = 蚊（世界で最も多くの人を殺す動物）を研究しに来た。蚊の根絶 (A) や人体実験 (B) ではない。",
  },
  {
    level: 3,
    topic: "Albania — reception centers (No.45)",
    passage:
      "M1: The Italian government has addressed this issue with various Albanian authorities. At this time they are considering the idea of placing reception centers directly in Albania as a possible way to counteract illegal immigration into Italy. The areas being considered are in Northern Albania, near the mountainous border where Kosovars are fleeing from Serbian aggression into Albania. However, it would be very difficult to guarantee protection for any camps that would be set up in that region.",
    question: "The establishment of reception centers in Albania would...",
    options: [
      "possibly reduce the desperate situation of the refugees.",
      "facilitate entry into Italy.",
      "guarantee protection for anybody fleeing Yugoslavia.",
      "be economically beneficial to Albania.",
    ],
    answer: 0,
    ex: "【正答】possibly reduce the desperate situation of the refugees（難民の状況を軽減する可能性がある）。 収容センターは難民が逃れてくる北アルバニアに置かれ、'a possible way' と控えめに述べられる。'guarantee protection' (C) は 'very difficult to guarantee protection' で否定、イタリア入国を容易に (B) は逆。",
  },
  {
    level: 3,
    topic: "Albania — immigration problem (No.44)",
    passage:
      "M1: Gentlemen, good morning. Today I'd like to speak about the question of immigration into Italy from Albania across the Strait of Otranto. This has presently caused a large humanitarian problem and, as well, the Italian police force find it extremely difficult to check the identity and criminal records of those coming into the country. How can we better coordinate the resources available to us, both on Albanian and on Italian soil? Is there any way to stem the flow of this steady stream?",
    question: "The speaker thinks that...",
    options: [
      "the situation is difficult to control.",
      "Italian police should check identity in Albania.",
      "Albanian soil is not suitable for coordinating resources.",
      "the stream of people is coming to an end.",
    ],
    answer: 0,
    ex: "【正答】the situation is difficult to control（状況をコントロールするのは難しい）。 'a large humanitarian problem ... extremely difficult to check the identity ... Is there any way to stem the flow of this steady stream?' = 制御困難な状況を憂慮している。流れが終わりつつある (D) とは逆。",
  },

  // -------------------------------------------------------------------
  // READING batch (L2 + L3) — short memos/ads/news passages read
  // silently, not TTS scripts. `category: 'reading'` tells
  // PastExamPanel to show the passage immediately instead of hiding it
  // behind a "listen first" prompt, and to label the audio button
  // "read aloud" rather than "play" (see card.readAloud).
  //
  // Correct answers were not marked in the source screenshots and were
  // inferred here from the passage text; flag any that look off.
  //
  // PENDING: L2 "cassette advertisement" question below has only 2
  // answer options in the source material (should normally be 4) —
  // kept as-is rather than fabricating 2 more distractors. Replace
  // with the full 4-option version if/when available.
  // -------------------------------------------------------------------
  {
    level: 2,
    category: 'reading',
    topic: 'Memo — Major Forrest and target practice',
    passage:
      "Captain Miller,\nMajor Forrest called me to his office. Wants me to check the schedule for tomorrow's target practice. I'll try to finish the photocopying you wanted when I get back.\nW.O. Anderson",
    question: 'Major Forrest ...',
    options: [
      'requested the presence of W.O. Anderson.',
      'called his office for the schedule.',
      'needs to speak to Captain Miller.',
      'needs photocopies when he gets back.',
    ],
    answer: 0,
    ex: "【正答】requested the presence of W.O. Anderson。 'Major Forrest called me [Anderson] to his office' = フォレスト少佐がアンダーソンを自室に呼んだ。スケジュール確認は呼び出された後の指示内容であって電話でのやり取りではない (B)。ミラー大尉と話したいのはフォレスト少佐ではなくこのメモの受取人 (C)。コピーが必要なのはミラー大尉であってフォレスト少佐ではない (D)。",
  },
  {
    level: 2,
    category: 'reading',
    topic: 'News — loan sharking in Italy',
    passage:
      "According to recent figures, loan sharking has become one of Italy's booming businesses, employing more than 25,000 people. Loan sharks take in a third of their profits from about 120,000 retailers charging exorbitant interest rates. And although the number of filed complaints has dropped considerably in the last four years, loan sharking remains deeply rooted in the nation's social and economic fabric. The national retailers' association is therefore urging stringent enforcement of the current legislation which allows for the immediate confiscation of assets of convicted loan sharks. But, perhaps the best way to deter retailers from seeking illegal financing, experts say, is to make more funds available to businesses in difficulty.",
    question: 'According to this article ...',
    options: [
      'store merchants are the largest number of tax evaders.',
      'business people have recently increased their complaints.',
      'store merchants often become victims of illegal financiers.',
      'loan sharks attack waterfront businesses exclusively.',
    ],
    answer: 2,
    ex: '【正答】store merchants often become victims of illegal financiers。 小売業者は闇金融業者から法外な金利を取られる被害者。苦情件数はここ4年で「減少」しており増加ではない (B は逆)。脱税への言及はなく (A)、業種を港湾関連に限定する記述もない (D)。',
  },
  {
    level: 2,
    category: 'reading',
    topic: 'Advertisement — audio cassettes',
    passage:
      'FUGI AUDIO CASSETTE (Tape 90 minutes) 4.49 each. BUY 5 GET 1 FREE',
    question: 'This advertisement shows us that...',
    options: [
      'the cassettes cost less than five dollars.',
      'five cassettes last ninety minutes.',
    ],
    answer: 0,
    ex: "【正答】the cassettes cost less than five dollars。 1本4.49ドル＝5ドル未満。90分は1本あたりのテープ長であり『5本で90分』ではない (B)。",
  },
  {
    level: 2,
    category: 'reading',
    topic: 'News — Algiers bombing suspect arrested',
    passage:
      'ANTI-TERRORIST police units in Bologna have arrested an Algerian suspected of providing refuge, money and false documents to Algeria\'s Armed Islamic Group (AIG). Fetter Arched, 29, had "some kind of link" to the bombing of a market in Algiers last August 31, which killed 17 people. Investigators believe Mr. Arched gave assistance to members of the AIG claiming he also distributed propaganda sponsored by Osama bin Laden, the Saudi millionaire believed to have ordered the bombings of the U.S. Embassies in Tanzania and Kenya.',
    question: 'According to this news item, Arched ...',
    options: [
      'received help from the AIG to carry out his work.',
      'was partly responsible for a bombing in Algiers.',
      'is an outlawed member of the AIG.',
      'sponsored Osama bin Laden in his embassy attacks.',
    ],
    answer: 1,
    ex: "【正答】was partly responsible for a bombing in Algiers。 'had \"some kind of link\" to the bombing ... which killed 17 people' = 爆破事件への部分的な関与。援助はアーシェドがAIGに『与えた』側であり『受けた』のではない (A は逆)。AIGの構成員であるとまでは明言されていない (C)。ビンラディンから宣伝工作を委託された側であり、逆に彼を『後援』したわけではない (D)。",
  },
  {
    level: 2,
    category: 'reading',
    topic: 'Memo — informer transport route changed',
    passage:
      "Col. Stewart,\nFor security reasons, tomorrow's itinerary to transport our key police informer from the jailhouse to the courthouse has been changed. All units have been put on stand-by.\nWill stop by your office again before 14:00 to leave you a copy of the new route.\nMaj. Williams",
    question: 'This message states that ...',
    options: [
      'police informers are hazardous to transport at all times.',
      'the courthouse has been relocated along the new route.',
      'Maj. Williams will notify Col. Stewart of the revised itinerary.',
      'Col. Stewart needs a security clearance before 14:00.',
    ],
    answer: 2,
    ex: "【正答】Maj. Williams will notify Col. Stewart of the revised itinerary。 'Will stop by your office ... to leave you a copy of the new route' = ウィリアムズ少佐がスチュワート大佐に新ルートを伝える。変更されたのは移送ルートであり裁判所自体が移転したわけではない (B)。『常に』危険という一般化 (A) やセキュリティクリアランスへの言及 (D) は本文にない。",
  },
  {
    level: 2,
    category: 'reading',
    topic: 'Memo — report on extradition enforcement',
    passage:
      "Dear Don,\nPlease phone me regarding the report you'll be giving in Rome next week on the enforcement of international extradition requests. There are some points I'd like to clarify.\nGeneral Kyle",
    question: 'Don ...',
    options: [
      'is requesting the extradition of a notorious criminal.',
      'will be reporting on political asylum problems.',
      'wishes to enforce cooperation among Italian police.',
      "must explain some details of his report to his commander.",
    ],
    answer: 3,
    ex: "【正答】must explain some details of his report to his commander。 'There are some points I'd like to clarify' = 上官（カイル将軍）が報告内容の説明を求めている。報告テーマは国際引渡し請求の『取締り』であって政治亡命問題ではない (B)。ドン自身が誰かの引渡しを求めているわけではない (A)。",
  },
  {
    level: 2,
    category: 'reading',
    topic: 'Ticket — Merryland Amusement Park parking',
    passage:
      'WELCOME TO MERRYLAND AMUSEMENT PARK\nPARKING 6.00 $\nPLEASE LOCK THE VEHICLE AND MARK PARKING LOCATION BELOW\nSECTION: A-B-C-D-E-F-G-H- AISLE: 1-2-3-4-5-6-7-8-9-10-11-12-13-14',
    question: 'This is...',
    options: [
      'an entrance ticket to Merryland.',
      'a ticket for a car-park.',
      'a ticket for a fun-park.',
      'a ticket for a Merryland performance.',
    ],
    answer: 1,
    ex: '【正答】a ticket for a car-park。 駐車料金・施錠・駐車位置の記入指示という内容から車の駐車券。入園券 (A) や公演のチケット (D) ではない。遊園地自体のチケット (C) と紛らわしいが、これはあくまで『駐車』のための券。',
  },
  {
    level: 2,
    category: 'reading',
    topic: 'Notice — loss, theft or destruction of passport',
    passage:
      'LOSS, THEFT OR DESTRUCTION OF PASSPORT should be reported immediately to the local police authorities and to the Passport Services, Washington, D.C. 20520, or, if overseas, to the nearest American embassy or consulate. Your passport is a valuable citizenship and identity document. It should be carefully safeguarded.',
    question: 'You must go to the authorities if you...',
    options: [
      "haven't safeguarded your personal assets.",
      'are working in Washington D.C. or overseas.',
      'cannot keep your personal documents with you.',
      'misplace your passport or it is stolen or mutilated.',
    ],
    answer: 3,
    ex: "【正答】misplace your passport or it is stolen or mutilated。 'LOSS, THEFT OR DESTRUCTION' の言い換え。勤務地がワシントンD.C.か海外か (B) は届出条件ではなく届出先の違いにすぎない。",
  },
  {
    level: 2,
    category: 'reading',
    topic: 'News — Italy and the Ocalan extradition request',
    passage:
      'PRIME Minister promised on Monday that Italy would resist political pressure from Turkey to extradite a top Kurdish rebel leader, and would leave the decision to the Italian courts. Prime Minister said Italy would not be pressured or threatened. This is a democratic country that cannot be blackmailed by anyone, he added. Turkey has announced that it will soon present a formal extradition request for Abdullah Ocalan, the leader of the Kurdistan Workers\' Party, saying that Italy should not grant political asylum to a man whom it considers a murderer. Mr. Ocalan is the leader of an organization that has taken part in a 14 year old war in which more than 35,000 people have died. He is Turkey\'s most wanted man and also faces criminal charges in Germany.',
    question: 'Italy will ...',
    options: [
      'extradite Ocalan to Turkey.',
      "wait for the court's decision on Ocalan's status.",
      'grant political asylum to Ocalan.',
      'try Ocalan in an Italian court.',
    ],
    answer: 1,
    ex: "【正答】wait for the court's decision on Ocalan's status。 'would leave the decision to the Italian courts' がそのまま該当。トルコへの引渡し (A) や亡命の許可 (C) はまだ決定していない。",
  },
  {
    level: 2,
    category: 'reading',
    topic: 'Note — Hannah postpones a doctor appointment',
    passage:
      "Ian,\nOffice called - urgent problem\nNeed to represent client in court this morning.\nCan you please postpone my appointment with Dr. Eliot? I'll be back early this afternoon so we can do that shopping we talked about.\nSorry about lunch.\nHannah.",
    question: 'Hannah ...',
    options: [
      'has an appointment to represent the doctor.',
      'will go shopping after she sees the doctor.',
      'needs to change her appointment with Dr. Eliot.',
      'will meet Ian for lunch this afternoon.',
    ],
    answer: 2,
    ex: "【正答】needs to change her appointment with Dr. Eliot。 'Can you please postpone my appointment with Dr. Eliot?' がそのまま該当。ハンナは医師『を代理する』のではなく法廷でクライアントを代理する (A)。ランチは『ごめんなさい』と断っており、午後に会うのは買い物のためであってランチではない (D)。",
  },
  {
    level: 2,
    category: 'reading',
    topic: 'News — US-Mexico fast-track extradition program',
    passage:
      'Mexico and the United States have recently activated a bilateral program aimed at eliminating protracted extradition procedures and establishing a "fast-track" system of deportation and expulsion of criminals wanted on the other side of the border. Both governments have also announced the implementation of a monitoring program designed to avoid infiltration by narcotics dealers into anti-drug organizations. Finally, the police and military institutions of both countries will be able to share sensitive information directly.',
    question: 'According to this news item ...',
    options: [
      'the U.S. and Mexico have put into operation a plan that will allow them to speed up the processing of criminal matters.',
      'the Mexican and U.S. police have been exchanging sensitive information secretly for years.',
      'the new program could turn out to be an example of a "revolving door" system of justice.',
      'neither government is willing to monitor the infiltration of drug dealers into their country.',
    ],
    answer: 0,
    ex: "【正答】the U.S. and Mexico have put into operation a plan that will allow them to speed up the processing of criminal matters。 'eliminating protracted extradition procedures ... \"fast-track\" system' = 手続きの迅速化。情報共有は『直接』行うと新たに合意した話であり『何年も秘密裏に』行ってきたわけではない (B)。麻薬密売人の浸透を防ぐ監視プログラムを『導入した』のであり監視に消極的なのではない (D は逆)。",
  },
  {
    level: 2,
    category: 'reading',
    topic: "News — why Turkey wants Ocalan's extradition",
    passage:
      'PRIME Minister promised on Monday that Italy would resist political pressure from Turkey to extradite a top Kurdish rebel leader, and would leave the decision to the Italian courts. Prime Minister said Italy would not be pressured or threatened. This is a democratic country that cannot be blackmailed by anyone, he added. Turkey has announced that it will soon present a formal extradition request for Abdullah Ocalan, the leader of the Kurdistan Workers\' Party, saying that Italy should not grant political asylum to a man whom it considers a murderer. Mr. Ocalan is the leader of an organization that has taken part in a 14 year old war in which more than 35,000 people have died. He is Turkey\'s most wanted man and also faces criminal charges in Germany.',
    question: "Turkey wants Ocalan's extradition because ...",
    options: [
      'he is a suspected war criminal guilty of murder.',
      'he also faces charges in Germany.',
      'the Kurdistan Workers\' Party needs him.',
      "it disagrees with Italy's asylum rules.",
    ],
    answer: 0,
    ex: "【正答】he is a suspected war criminal guilty of murder。 'a man whom it considers a murderer' + 35,000人が死亡した紛争の指導者、という記述から。ドイツでの訴追 (B) は補足事実であって引渡しを求める直接の理由ではない。",
  },

  // -------------------------------------------------------------------
  // READING batch — Level 3
  // -------------------------------------------------------------------
  {
    level: 3,
    category: 'reading',
    topic: 'News — Maori-based restorative justice scheme',
    passage:
      'A POLICE force is working on a scheme to confront young offenders with their victims in a project based on a Maori concept of justice which requires offenders, in front of their own friends and family, to explain to the victim why they have committed the crime.',
    question: 'According to this news item, the plan ...',
    options: [
      'will be applied to all law breakers.',
      'foresees a public confession.',
      'is being designed for Maoris.',
      'illustrates the Maori legal system.',
    ],
    answer: 1,
    ex: "【正答】foresees a public confession。 'in front of their own friends and family, to explain ... why they have committed the crime' = 公衆の面前での告白に相当。対象は『若年犯罪者』でありすべての犯罪者ではない (A)。マオリの『概念』を応用した制度であって、マオリ人向け (C) やマオリの司法制度そのもの (D) を指すのではない。",
  },
  {
    level: 3,
    category: 'reading',
    topic: 'News — UK law shielding multinationals from lawsuits',
    passage:
      'Multinationals are to be given protection from legal action taken in Britain by Third World workers. In a letter sent to judges and senior barristers, Lord Irvine, the Lord Chancellor, said he wants to promote the new law because it would shield all English corporations from legal action in British courts brought by Third World workers who claim exploitation and irreversible damages. A change in the law is desirable in that it would prevent multinationals from moving their headquarters out of Britain and "protect" them from a flood of expensive claims. The move, however, is being attacked. Trade unions and opposition politicians feel such an action goes against the trend of global economic and social rights. If the British Government is so keen on protecting its own national interests at the expense of the rights of the Third World, then something has gone badly wrong. The decision seriously undermine Britain\'s ethnical foreign policy which most say has not been drawn up only for the benefit of its Foreign Office. Foreign policy must lie at the heart of all thinking in government departments, including the Department of Labor. Irvine\'s plans follow a Lords\' ruling issued last year which stated that a worker in Namibia was allowed to sue his employer, an English mining corporation, in a British court due to the lack of legal aid in Namibia. Nonetheless, the Government argues that if multinationals based in England are exposed to such actions in the English courts, these companies may no longer wish to operate in England. Lawyers acting for third world workers on the other hand point out that several British multinationals operate in Third World countries which lack even a rudimentary legal system, making it impossible for workers in poverty to seek justice in their own country. If multinationals exploit less stringent standards and injure people in the process, then they should be held accountable.',
    question: 'This article implies that the British Government ...',
    options: [
      'is ready to take legislative steps that protect its economic interests.',
      'is unwilling to protect its corporations from foreign legal action.',
      'is happy to sacrifice some of its corporations in the interest of benevolence.',
      'supports lawyers who argue cases in British courts in the name of justice.',
    ],
    answer: 0,
    ex: "【正答】is ready to take legislative steps that protect its economic interests。 多国籍企業を訴訟から守る新法を推進しようとしている＝経済的利益を守るための立法措置。企業を『守ろうとしない』(B) は逆。第三世界の労働者側で訴訟を起こす弁護士を『支持』しているわけではない (D)。",
  },
  {
    level: 3,
    category: 'reading',
    topic: 'News — Morocco toughens drug trafficking penalties',
    passage:
      'The Moroccan government will soon present parliament with a package of "very harsh" proposals aimed at punishing convicted drug traffickers. According to the bill, a trafficker could be sentenced to up to 30 years in jail instead of the 10 years currently in force and be fined the equivalent of nearly U.S. $100,000. The legislation, drawn up by the Drug Fight Coordination Unit would inflict the same punishment for money laundering. The new statute would put the burden of proof on the accused who would have to provide evidence to show that his assets were legally acquired.',
    question: 'This article tells us that ...',
    options: [
      'a person accused of a crime is innocent until proven guilty.',
      'the new legislation will apply more stringent measures.',
      'drug traffickers will have to pay an equivalent amount.',
      'drug traffickers can stay out of jail if they bribe the right people.',
    ],
    answer: 1,
    ex: '【正答】the new legislation will apply more stringent measures。 禁固刑を10年から30年に引き上げ、罰金約10万ドル、立証責任を被告側に転換、という内容全体を要約している。立証責任が被告側にある新制度は『推定無罪』の原則 (A) とはむしろ逆の方向。賄賂への言及はない (D)。',
  },
  {
    level: 3,
    category: 'reading',
    topic: 'News — kidnapping business in Hong Kong',
    passage:
      'KIDNAPPING has become a lucrative business in Hong Kong and the former British colony threatens to become a favourite playground for ambitious criminals. One criminal organization is believed to have been responsible for as many as four of the biggest kidnappings in the past two years. On one occasion, an organization returned its hostage to his family inside a refrigerator after being paid millions of dollars for his release. Police officers complain that the rich and famous who are targets of these criminals are seldom cooperative - sometimes they do not even report the crime for fear of getting killed. In addition, investigations are made even more difficult by the fact that it is now extremely easy to cross the border from China and a new wave of criminal immigrants has, in recent months, succeeded in entering Hong Kong. Some even succeeded in robbing the offices of the U.S. Consul!',
    question: 'Investigations are difficult because ...',
    options: [
      'hostages are often hidden on the Chinese mainland.',
      'the police are afraid of retaliation against themselves and their families.',
      'it is now very easy to travel to China.',
      'victims rarely want the police to be involved.',
    ],
    answer: 3,
    ex: "【正答】victims rarely want the police to be involved。 'seldom cooperative ... do not even report the crime for fear of getting killed' = 被害者自身が報復を恐れて非協力的。恐れているのは『警察』ではなく『被害者』(B は取り違え)。国境を越えやすいのは中国『から』であって中国『へ』ではない (C は方向が逆)。",
  },
  {
    level: 3,
    category: 'reading',
    topic: 'News — arsenic contamination in Bangladesh',
    passage:
      "Bangladesh is, according to some experts, in the middle of possibly the biggest mass poisoning in history. Dangerous levels of arsenic have been found in the ground water affecting millions of people as they drink from a vast system of tube wells. Most of these hand-operated pumps are 10 to 20 years old, which is about the time it takes the arsenic to do its lethal work, killing with one of several cancers. Approximately twenty-five years ago, the government together with Unicef and other aid groups persuaded villagers not to drink the disease-carrying pond water and instead helped them put pipes into underground springs. The naturally occurring arsenic that contaminated the subterranean sources was ignored. Today, the ulcers on the hands and feet of the people are signs of advanced arsenic poisoning and this poses the highest cancer risk ever, experts claim. Every day that people continue to drink the poisoned water will result in more deaths in the years to come. Unfortunately, there is no treatment for poisoning, and it is the cumulative dose that kills. Only if a person stops drinking the arsenic at an early enough stage can physical deterioration be arrested. While some experts say Unicef failed to do exhaustive testing when it helped build the tube well program in the 1970's, the fact remains that millions of lives were saved. Now, water is tested for arsenic content both before and after any new pump is installed.",
    question: 'According to this article ...',
    options: [
      'well pipes have a 25-year life span.',
      'arsenic kills the minute it enters your body.',
      'arsenic poisoning can be treated with antibiotics.',
      'arsenic kills over a long period of time.',
    ],
    answer: 3,
    ex: "【正答】arsenic kills over a long period of time。 'about the time it takes the arsenic to do its lethal work' + 'it is the cumulative dose that kills' = 蓄積して長期間かけて死に至らしめる。井戸の耐用年数が25年 (A) という記述はなく、25年は別の出来事（政府とユニセフの取り組み開始時期）の話。治療法は『存在しない』と明記 (C)。",
  },
  {
    level: 3,
    category: 'reading',
    topic: "News — Germany's foreign policy priorities",
    passage:
      "A ruling by a German court accusing Iran's leaders of having authorized a terrorist attack in a Berlin bar has brought anti-German demonstrators onto the streets of Teheran. At the same time, Turks are accusing Germany of suggesting that Turkey cannot join the EU because most of its people are Muslims. Neither Iran nor Turkey is as important to Germany as things like European integration, staying close to America and doing profitable trade with the world. But, just when Germany is trying to expand its foreign policy, it is not pleased to discover that its links with two large Muslim countries have been damaged.",
    question: 'Germany is most interested in ...',
    options: [
      'maintaining foreign relations and economic ties with other countries.',
      'promoting an aggressive free-trade policy.',
      'ensuring ties with other religions and social integration.',
      'keeping Turkey out of the EU.',
    ],
    answer: 0,
    ex: "【正答】maintaining foreign relations and economic ties with other countries。 'European integration, staying close to America and doing profitable trade with the world' がそのまま該当。トルコをEUから排除したい (D) というのはトルコ側の非難であってドイツ自身の関心事ではない。",
  },
  {
    level: 3,
    category: 'reading',
    topic: "News — Unicef's role in the Bangladesh arsenic crisis",
    passage:
      "Bangladesh is, according to some experts, in the middle of possibly the biggest mass poisoning in history. Dangerous levels of arsenic have been found in the ground water affecting millions of people as they drink from a vast system of tube wells. Most of these hand-operated pumps are 10 to 20 years old, which is about the time it takes the arsenic to do its lethal work, killing with one of several cancers. Approximately twenty-five years ago, the government together with Unicef and other aid groups persuaded villagers not to drink the disease-carrying pond water and instead helped them put pipes into underground springs. The naturally occurring arsenic that contaminated the subterranean sources was ignored. Today, the ulcers on the hands and feet of the people are signs of advanced arsenic poisoning and this poses the highest cancer risk ever, experts claim. Every day that people continue to drink the poisoned water will result in more deaths in the years to come. Unfortunately, there is no treatment for poisoning, and it is the cumulative dose that kills. Only if a person stops drinking the arsenic at an early enough stage can physical deterioration be arrested. While some experts say Unicef failed to do exhaustive testing when it helped build the tube well program in the 1970's, the fact remains that millions of lives were saved. Now, water is tested for arsenic content both before and after any new pump is installed.",
    question: 'This article states that Unicef ...',
    options: [
      'contaminated the water accidentally during testing.',
      'ignored warnings from local government authorities.',
      'may have been negligent in conducting preliminary testing.',
      'used underground sources to prevent treatment.',
    ],
    answer: 2,
    ex: "【正答】may have been negligent in conducting preliminary testing。 'Unicef failed to do exhaustive testing when it helped build the tube well program' がそのまま該当。ユニセフ自身が水を汚染したわけではなく、ヒ素は自然由来 (A)。地方自治体からの警告を無視した、という記述はない (B)。",
  },
  {
    level: 3,
    category: 'reading',
    topic: 'News — kidnapping trend in Hong Kong',
    passage:
      'KIDNAPPING has become a lucrative business in Hong Kong and the former British colony threatens to become a favourite playground for ambitious criminals. One criminal organization is believed to have been responsible for as many as four of the biggest kidnappings in the past two years. On one occasion, an organization returned its hostage to his family inside a refrigerator after being paid millions of dollars for his release. Police officers complain that the rich and famous who are targets of these criminals are seldom cooperative - sometimes they do not even report the crime for fear of getting killed. In addition, investigations are made even more difficult by the fact that it is now extremely easy to cross the border from China and a new wave of criminal immigrants has, in recent months, succeeded in entering Hong Kong. Some even succeeded in robbing the offices of the U.S. Consul!',
    question: 'In Hong Kong ...',
    options: [
      'Britain has threatened to close down big businesses.',
      'there have been four kidnappings in the last two years.',
      'kidnapping is now unfortunately on the rise.',
      'the Chinese Mafia has overtaken the consulate.',
    ],
    answer: 2,
    ex: "【正答】kidnapping is now unfortunately on the rise。 'KIDNAPPING has become a lucrative business ... threatens to become a favourite playground for ambitious criminals' から誘拐が増加傾向にあることが分かる。『4件』は一つの犯罪組織が関与したとされる件数であり (B)、香港全体の総数ではない。",
  },
  {
    level: 3,
    category: 'reading',
    topic: 'News — immigration reshaping Italian society',
    passage:
      'THE wave of immigration in Italy represents a decisive moment for Italian society as it approaches the new millennium and creates a new identity for itself. Over the past two decades Italy, previously known as a country with a high proportion of births and heavy emigration, has reduced that proportion and has absorbed more than a million legal and illegal immigrants who are giving a new face to Italian society and adding new dimensions to its future. The changes that are taking place in Italian culture due to this extensive multiracial and multicultural mix will probably be both radical and permanent. Years from now, these decades may be seen as the period when a new Italy was created. Italy can therefore serve as a laboratory for studying how to accommodate and promote racial ethnic diversity under new conditions.',
    question: 'The new immigrants ...',
    options: [
      'have some radical elements to sort out.',
      'have reduced the Italian birthrate considerably.',
      'are changing the contours of Italian society.',
      'are downgrading racial and ethnic diversity.',
    ],
    answer: 2,
    ex: "【正答】are changing the contours of Italian society。 'giving a new face to Italian society ... changes ... will probably be both radical and permanent' がそのまま該当。出生率低下 (B) はイタリア自身の従来からの傾向であり移民が引き起こしたものではない。移民は多様性を『高めて』おり『損なって』はいない (D は逆)。",
  },
  {
    level: 3,
    category: 'reading',
    topic: 'News — Italy as a model of social integration',
    passage:
      'THE wave of immigration in Italy represents a decisive moment for Italian society as it approaches the new millennium and creates a new identity for itself. Over the past two decades Italy, previously known as a country with a high proportion of births and heavy emigration, has reduced that proportion and has absorbed more than a million legal and illegal immigrants who are giving a new face to Italian society and adding new dimensions to its future. The changes that are taking place in Italian culture due to this extensive multiracial and multicultural mix will probably be both radical and permanent. Years from now, these decades may be seen as the period when a new Italy was created. Italy can therefore serve as a laboratory for studying how to accommodate and promote racial ethnic diversity under new conditions.',
    question: 'According to this article Italy ...',
    options: [
      'is safeguarding its ethnic purity at all costs.',
      'is a country filled with babies and lots of new faces.',
      'can be seen as an example of social integration.',
      'is remaining the same in spite of its ethnic diversity.',
    ],
    answer: 2,
    ex: "【正答】can be seen as an example of social integration。 'Italy can therefore serve as a laboratory for studying how to accommodate and promote racial ethnic diversity' がそのまま該当。『民族的純粋性を守っている』(A) とは正反対の内容。出生率は『低下』しており赤ちゃんで溢れているわけではない (B)。",
  },
  {
    level: 3,
    category: 'reading',
    topic: 'Narrative — bombing at a soldiers\' apartment building',
    passage:
      "Master Sergeant William Miles had just walked out of his room and was heading for the elevator when the bomb exploded. It nearly knocked him off the ground. The lights had gone off just when he noticed the whole side of the building was falling. He looked around and as he tried to care for the other victims, he realized in that very moment that some people were already dead. He could feel a lot of blood on his hands and he knew it couldn't be sweat because it was too thick. He had been badly cut on the thigh, face and arms and as he lay in his hospital bed that night all he could recall were the flying pieces of glass and wall. Shortly after the blast, shocked onlookers had filled the streets. One survivor thought it had been the end of the world as he watched the others cry and sit down, cupping their hands to their ears. Later that night, two short-haired men wearing jeans and T-shirts, apparently forensic experts, closely examined the ground in search of clues. The bomb, containing two and a half tons of explosives, had ripped off the front half of an eight-story apartment building that housed the American soldiers at the foreign air base. By daybreak the following morning, the streets surrounding the blast had been cordoned off by military security forces as the search for more bodies and survivors continued ...",
    question: 'According to this passage, Master Sergeant Miles ...',
    options: [
      'was cared for by the other victims.',
      'fell out of the side of the building.',
      'suffered facial and body injuries.',
      'had thick, sweaty palms.',
    ],
    answer: 2,
    ex: "【正答】suffered facial and body injuries。 'badly cut on the thigh, face and arms' がそのまま該当。彼自身が他の被害者を助けようとした側であり、助けられた側ではない (A は逆)。血は『汗にしては濃すぎる』と明記されており汗ではない (D)。",
  },
  {
    level: 3,
    category: 'reading',
    topic: 'Narrative — NEST team searches for a nuclear device',
    passage:
      'All anyone would need to lay waste to a medium-size city like New Orleans is 25 kg. of enriched uranium and the heart of the city would turn into radioactive dust. That is what the NEST team had to make sure would not happen. Agents at the downtown headquarters had been working frantically all morning since the phone call had come in. A man with a deep foreign accent had warned that a nuclear device had been planted in the downtown Hilton. It would be made to explode by remote control by noon unless two inmates detained in the Dallas maximum security prison were released. The Hilton had thirty-two floors and two thousand rooms. The agents had to get to work immediately. Nothing could be left to chance. At 9:30 a.m., hundreds of normally lab-bound nuclear scientists, FBI and CIA agents, dressed as inconspicuously as possible, had fanned out through the French Quarters carrying hidden radiation detectors in their briefcases. Helicopters equipped with spy cameras swooped overhead and rental vans packed with high-tech electronics roamed the streets. Halfway down a corridor, Agent Becky suddenly heard "the voice", an irritating robotic message transmitted from the suitcase to a wireless, button-sized beige receiver in her ear. "Gamma alarm four", the voice droned. That was a strong radiation signal. She glanced left at the room number on the next door and subtracted three from it. The detector\'s microcomputer took several seconds to analyze the radiation and calculate the strength, so the room door behind her must have been the one actually giving off the gamma rays. Becky and her partner never turned around or slowed their pace, lest they would attract attention from other guests. At the end of the corridor, they looked back nonchalantly, then ducked into the stairwell. Becky pulled out a small radio from her purse. "We have a hit", she whispered, and relayed the room number. The searchers had found the nuclear device, which had been emitting a harmless amount of radiation, in less than two hours.',
    question: 'Which of the following statements is TRUE?',
    options: [
      'The portable detector took some seconds to calculate radiation intensity.',
      'Becky had a hit on the radio and consequently relayed the room number.',
      'The searchers had been emitting very low amount of radiation.',
      'The nuclear device had been buried in a plant in the hotel corridor.',
    ],
    answer: 0,
    ex: "【正答】The portable detector took some seconds to calculate radiation intensity。 'The detector's microcomputer took several seconds to analyze the radiation and calculate the strength' がそのまま該当。放射線を発していたのは『核爆弾』であって『捜索隊』ではない (C は取り違え)。爆弾はホテルの一室にあったのであり『廊下に埋められていた』わけではない (D)。",
  },
  {
    level: 3,
    category: 'reading',
    topic: 'News — the multinationals lawsuit-shield law (true statement)',
    passage:
      'Multinationals are to be given protection from legal action taken in Britain by Third World workers. In a letter sent to judges and senior barristers, Lord Irvine, the Lord Chancellor, said he wants to promote the new law because it would shield all English corporations from legal action in British courts brought by Third World workers who claim exploitation and irreversible damages. A change in the law is desirable in that it would prevent multinationals from moving their headquarters out of Britain and "protect" them from a flood of expensive claims. The move, however, is being attacked. Trade unions and opposition politicians feel such an action goes against the trend of global economic and social rights. If the British Government is so keen on protecting its own national interests at the expense of the rights of the Third World, then something has gone badly wrong. The decision seriously undermine Britain\'s ethnical foreign policy which most say has not been drawn up only for the benefit of its Foreign Office. Foreign policy must lie at the heart of all thinking in government departments, including the Department of Labor. Irvine\'s plans follow a Lords\' ruling issued last year which stated that a worker in Namibia was allowed to sue his employer, an English mining corporation, in a British court due to the lack of legal aid in Namibia. Nonetheless, the Government argues that if multinationals based in England are exposed to such actions in the English courts, these companies may no longer wish to operate in England. Lawyers acting for third world workers on the other hand point out that several British multinationals operate in Third World countries which lack even a rudimentary legal system, making it impossible for workers in poverty to seek justice in their own country. If multinationals exploit less stringent standards and injure people in the process, then they should be held accountable.',
    question: 'Which one of the following statements is TRUE?',
    options: [
      'Lord Irvine welcomes the presence of British corporations so that they can be sued.',
      'Third World workers are forcing British multinationals out of their countries.',
      "Britain is willing to safeguard its national interests along with the rights of poor populations.",
      "The new law is being criticized because it greatly weakens British foreign policy.",
    ],
    answer: 3,
    ex: "【正答】The new law is being criticized because it greatly weakens British foreign policy。 'The decision seriously undermine Britain's ethnical foreign policy' がそのまま該当。アーヴィン卿は企業が『訴えられるよう』望んでいるのではなく逆に訴訟から『守ろう』としている (A は逆)。多国籍企業がイギリスから出て行きかねないという話であり、第三世界の国から追い出されているわけではない (B)。",
  },
  {
    level: 3,
    category: 'reading',
    topic: 'Narrative — the forensic experts at the bombing site',
    passage:
      "Master Sergeant William Miles had just walked out of his room and was heading for the elevator when the bomb exploded. It nearly knocked him off the ground. The lights had gone off just when he noticed the whole side of the building was falling. He looked around and as he tried to care for the other victims, he realized in that very moment that some people were already dead. He could feel a lot of blood on his hands and he knew it couldn't be sweat because it was too thick. He had been badly cut on the thigh, face and arms and as he lay in his hospital bed that night all he could recall were the flying pieces of glass and wall. Shortly after the blast, shocked onlookers had filled the streets. One survivor thought it had been the end of the world as he watched the others cry and sit down, cupping their hands to their ears. Later that night, two short-haired men wearing jeans and T-shirts, apparently forensic experts, closely examined the ground in search of clues. The bomb, containing two and a half tons of explosives, had ripped off the front half of an eight-story apartment building that housed the American soldiers at the foreign air base. By daybreak the following morning, the streets surrounding the blast had been cordoned off by military security forces as the search for more bodies and survivors continued ...",
    question: 'The forensic experts ...',
    options: [
      'dressed casually because they were off duty.',
      'thoroughly examined the explosion area for evidence.',
      'closely surrounded the streets of the blast.',
      'were housed at the air base along with the soldiers.',
    ],
    answer: 1,
    ex: "【正答】thoroughly examined the explosion area for evidence。 'closely examined the ground in search of clues' がそのまま該当。現場周辺の道路を封鎖したのは『軍の警備部隊』であり鑑識官ではない (C は取り違え)。私服だった理由が『非番だったから』とは明記されていない (A)。",
  },
  {
    level: 3,
    category: 'reading',
    topic: 'Narrative — locating the nuclear device (true statement)',
    passage:
      'All anyone would need to lay waste to a medium-size city like New Orleans is 25 kg. of enriched uranium and the heart of the city would turn into radioactive dust. That is what the NEST team had to make sure would not happen. Agents at the downtown headquarters had been working frantically all morning since the phone call had come in. A man with a deep foreign accent had warned that a nuclear device had been planted in the downtown Hilton. It would be made to explode by remote control by noon unless two inmates detained in the Dallas maximum security prison were released. The Hilton had thirty-two floors and two thousand rooms. The agents had to get to work immediately. Nothing could be left to chance. At 9:30 a.m., hundreds of normally lab-bound nuclear scientists, FBI and CIA agents, dressed as inconspicuously as possible, had fanned out through the French Quarters carrying hidden radiation detectors in their briefcases. Helicopters equipped with spy cameras swooped overhead and rental vans packed with high-tech electronics roamed the streets. Halfway down a corridor, Agent Becky suddenly heard "the voice", an irritating robotic message transmitted from the suitcase to a wireless, button-sized beige receiver in her ear. "Gamma alarm four", the voice droned. That was a strong radiation signal. She glanced left at the room number on the next door and subtracted three from it. The detector\'s microcomputer took several seconds to analyze the radiation and calculate the strength, so the room door behind her must have been the one actually giving off the gamma rays. Becky and her partner never turned around or slowed their pace, lest they would attract attention from other guests. At the end of the corridor, they looked back nonchalantly, then ducked into the stairwell. Becky pulled out a small radio from her purse. "We have a hit", she whispered, and relayed the room number. The searchers had found the nuclear device, which had been emitting a harmless amount of radiation, in less than two hours.',
    question: 'According to this extract ...',
    options: [
      'special agents swirled through the city with spy cameras and poison gas.',
      'nuclear scientists swarmed the streets in special anti-radiation outfits.',
      'the nuclear device had been subtracted from the room three floors down.',
      'only one agent got close enough to the nuclear device to identify it.',
    ],
    answer: 3,
    ex: "【正答】only one agent got close enough to the nuclear device to identify it。 放射線検知器を身につけ実際に信号を感知して現場を特定したのはベッキー一人であった。毒ガス (A) やアンチ放射線用の特殊装備 (B) への言及はなく、隊員たちは『できるだけ目立たない服装』をしていたとある。『部屋番号から3を引く』のはベッキーが行った計算手順であり、爆弾自体が『3階下の部屋から引き算された』という記述ではない (C)。",
  },
];
