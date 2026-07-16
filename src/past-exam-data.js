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
// This file mixes two real-exam batches:
//   • L2 — single-narrator recorded messages/news (answers 0-3 preserved)
//   • L3 — interviews, briefings and two-person phone dialogues
//          (M1/M2/F1 markers). Two questions can share one dialogue
//          (police-prostitution No.33/34, traffic-accident No.31/32).
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
];
