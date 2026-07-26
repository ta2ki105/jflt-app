// L3-level listening comprehension questions built from each topic-vocab
// pack's own vocabulary (treaties / NATO deployment / extradition / the
// Jesús mixed pack / NATO acronyms). This reinforces the words taught in
// TopicVocabHub with realistic ~90-second listening passages, rather than
// just flashcards/quiz recall.
//
// Not part of the scored Reading/Listening/Vocab/Grammar corpus — reached
// via TopicVocabListeningHub, a separate zone from the vocab trainer.
//
// Shape matches listening-complete.js / past-exam-data.js:
//   { level, topic, passage, question, options[4], answer (0-3), ex }
// Passages use MAN/WOMAN/M1/M2/F1 markers where the script has two
// speakers (parsed by AudioPlayer.parseTurns); plain text otherwise.
// ~180-220 words per passage ≈ 90 seconds of TTS at normal pace.
//
// Answer positions were deliberately spread across A/B/C/D (not a simple
// repeating cycle) rather than hand-authored in reading order — see the
// distribution check in the commit that introduced this file.

export const TOPIC_VOCAB_QUESTIONS = {
  treaties: [
    {
      level: 3,
      topic: 'Bilateral defense treaty — ratification briefing',
      passage:
        "Good afternoon. I'd like to update you on the status of the new bilateral defense treaty between our two nations. After eighteen months of negotiation, the treaty was signed by both foreign ministers last month. However, signing alone does not make the agreement binding. Under our constitution, the treaty must first be ratified by parliament before it can enter into force. The ratification vote is scheduled for next week, and early indications suggest strong support across party lines. Once ratified, the treaty will be legally binding on both signatory states, and neither government will be able to withdraw from its provisions without giving twelve months' written notice, as specified in the withdrawal clause. I should also mention that our delegation successfully negotiated an important annex covering technical cooperation, and secured a reservation on article nine, which we felt imposed obligations beyond what our current budget can support. Some observers have asked whether this treaty could later be expanded into a wider multilateral pact involving other regional partners. That is certainly possible in principle, but for now, our focus remains on this bilateral arrangement, and any accession by a third party would require the consent of both original signatories. We expect the full ratification process, including any necessary legislative debate, to be completed well within the twelve-month window originally proposed by both delegations. I'll now take your questions.",
      question: 'According to the speaker, what happens after the treaty is ratified?',
      options: [
        'Either government may withdraw immediately without notice.',
        'The treaty automatically expands into a multilateral pact.',
        "The treaty becomes legally binding, requiring twelve months' notice to withdraw.",
        'Parliament must renegotiate the reservation on article nine.',
      ],
      answer: 2,
      ex: "スピーカーは 'once ratified... legally binding... withdraw... without giving twelve months' written notice' と述べている。即時脱退や自動的な多国間拡大、第9条再交渉への言及はない。",
    },
    {
      level: 3,
      topic: 'Multilateral convention — compliance and enforcement',
      passage:
        "M1: I understand the convention now has thirty-two signatories. Do you know when it will finally enter into force?\nF1: Yes, the treaty requires ratification by at least twenty-five states before it enters into force, and we crossed that threshold last week when two more countries completed their accession. So legally, it becomes binding on all current parties starting the first of next month.\nM1: That's good news. But I've heard some concern that a few of the newer signatories might not fully comply with the reporting obligations in article seven.\nF1: That's true, and if a state does breach those obligations, the treaty allows the other parties to raise the matter before the review committee. Still, no state can be forced to accept measures that infringe upon its sovereignty; the enforcement mechanism only allows for diplomatic pressure, not sanctions.\nM1: I see. So compliance really depends on goodwill rather than any binding penalty.\nF1: Exactly. That was a deliberate choice during the original negotiation, to keep the convention attractive to a wide range of countries with different legal systems. Both sides also agreed to hold a joint review meeting every two years to discuss how implementation is progressing, and officials describe that flexible approach as essential to keeping such a broad multilateral convention workable in practice.",
      question: 'What does the woman say about enforcement of the convention?',
      options: [
        'Enforcement relies on diplomatic pressure rather than binding penalties.',
        'States that breach the treaty face automatic economic sanctions.',
        "The review committee can override a state's sovereignty to enforce compliance.",
        'Only the original twenty-five ratifying states are subject to enforcement.',
      ],
      answer: 0,
      ex: "女性は 'the enforcement mechanism only allows for diplomatic pressure, not sanctions' と説明している。自動的な経済制裁や主権を無視した強制、批准国限定という記述は本文にない。",
    },
    {
      level: 3,
      topic: 'Fisheries protocol — proposed amendment',
      passage:
        "This week the government published its long-awaited review of the fisheries protocol. The protocol was originally signed as an annex to the main maritime convention nearly twenty years ago, and it has never been formally amended since. Officials now argue that several of its provisions are outdated and no longer reflect current fishing practices, so they are proposing an amendment that would update the quota clause and clarify the obligations of each party. Interestingly, the proposal does not touch the preamble, which sets out the original purpose of cooperation between coastal states, since that language is considered largely symbolic rather than legally binding. If the amendment fails to gain sufficient support, one minor party has hinted it may simply terminate its participation in the protocol altogether, rather than remain bound by rules it considers unfair. Officials from the two largest signatory states have stressed, however, that they hope to conclude the negotiations without any state choosing to withdraw, since a smaller group of parties would weaken the protocol's effectiveness across the whole region. A final decision is expected within the next two negotiating sessions, and diplomats on both sides say they remain cautiously optimistic that a compromise text can still be reached before the deadline. Environmental groups, meanwhile, are pushing for even stricter quota limits than those currently proposed, arguing that local fish stocks remain fragile despite recent signs of improvement.",
      question: 'According to the report, what has one minor party suggested it might do?',
      options: [
        'Propose an entirely new preamble for the protocol.',
        'Formally amend the quota clause on its own.',
        'Request accession to a separate maritime convention.',
        'Withdraw from the protocol if the amendment does not pass.',
      ],
      answer: 3,
      ex: "'one minor party has hinted it may simply terminate its participation... rather than remain bound by rules it considers unfair' から、改正不成立時の脱退を示唆していることが分かる。前文の書き直しや単独での改正、別条約への加入への言及はない。",
    },
  ],

  nato_deployment: [
    {
      level: 3,
      topic: 'Force posture review — enhanced forward presence',
      passage:
        "This morning I want to brief you on the alliance's latest force posture review. Following the recent buildup of hostile forces near the eastern border, member states have agreed to reinforce the enhanced forward presence battlegroups already stationed in the region. An additional multinational brigade, drawing troops from six different countries, will begin its rotation into the area next month, replacing the smaller contingent currently deployed there. To make this work smoothly, planners have placed heavy emphasis on interoperability, since equipment, communications, and even basic terminology can vary significantly between national contingents. The rapid reaction force remains on standby throughout this period, ready to deploy within seventy-two hours if the situation escalates further. Logistics units have also been reinforced, because sustaining a larger force so far forward requires a steady supply chain for fuel, ammunition, and spare parts. Importantly, none of this represents a mobilization of reserve forces; every soldier involved is already part of the standing force. The alliance continues to stress that these steps are defensive in nature and fully consistent with the collective defense principle underlying Article 5, rather than preparation for any offensive operation. Defense ministers from all member states are expected to review the results of this posture adjustment at their next scheduled summit, and a further update on troop rotation timelines is due before then.",
      question: 'What does the speaker emphasize about the new deployment?',
      options: [
        'It requires mobilizing reserve forces for the first time.',
        "It is defensive and consistent with the alliance's collective defense principle.",
        "It relies entirely on a single nation's troops for simplicity.",
        'It replaces the rapid reaction force with a smaller contingent.',
      ],
      answer: 1,
      ex: "'these steps are defensive in nature and fully consistent with the collective defense principle underlying Article 5, rather than preparation for any offensive operation' と明言している。予備役の動員は否定されており(standing force)、単一国限定は誤り(6か国の多国籍旅団)。即応部隊の縮小への言及もない。",
    },
    {
      level: 3,
      topic: 'Air policing rotation — radio exchange',
      passage:
        "M1: Command Post, this is Falcon Two-One, requesting status update on the current air policing rotation.\nM2: Falcon Two-One, be advised, two aircraft remain on quick reaction alert at the main operating base, with a further pair forward-deployed to support air policing over the Baltic states.\nM1: Copy. Are we still maintaining the same readiness posture as last week?\nM2: Affirmative. Readiness remains high; scramble times have not changed. However, headquarters has ordered a redeployment of one QRA pair to cover a gap caused by another member state's aircraft undergoing scheduled maintenance.\nM1: Understood. Will that redeployment affect our chain of command, or are we still reporting through the same channel?\nM2: No change to the chain of command. You will continue reporting directly to the multinational air operations center, the same as during the previous rotation. One more thing — sustainment officers have confirmed that fuel and spares for the extra pair have already arrived at the forward base, so there should be no impact on operational tempo.\nM1: Good to hear. Any word on when the borrowed pair returns to its own rotation?\nM2: Headquarters expects that to happen within ten days, once the other member state's maintenance work is finished.\nM1: Copy that. Falcon Two-One, out.",
      question: 'Why was one QRA pair redeployed, according to the dialogue?',
      options: [
        'Because the chain of command was reorganized for the rotation.',
        'Because readiness levels had dropped below the required standard.',
        'Because fuel consumption needed to be reduced during the rotation.',
        "To replace aircraft grounded for scheduled maintenance from another member state.",
      ],
      answer: 3,
      ex: "'a redeployment of one QRA pair to cover a gap caused by another member state's aircraft undergoing scheduled maintenance' と説明されている。指揮系統の変更は明確に否定されており、即応態勢の低下や燃料節約への言及もない。",
    },
    {
      level: 3,
      topic: 'Peacekeeping mission — phased withdrawal',
      passage:
        "After nearly a decade, the peacekeeping coalition operating in the region has begun a phased withdrawal of its remaining troops. Officials say the decision reflects improved stability rather than any change in the alliance's commitment to collective defense elsewhere. At its peak, the mission included a full multinational brigade supported by rotating garrison units from more than a dozen member states, working alongside local forces to maintain security. Over the past year, however, the mission has gradually handed over responsibility to a smaller, locally led force, and the remaining international contingent has been reduced to little more than an advisory garrison. Planners expect the final withdrawal to be complete within six months, though a small logistics detachment will stay slightly longer to help transfer equipment and close remaining bases. Alliance spokespeople have been careful to note that withdrawal from this particular mission does not signal any weakening of readiness elsewhere; forward-deployed forces along the eastern flank remain untouched, and the rapid reaction force continues to operate at full strength. Officials added that lessons learned from this deployment, particularly around logistics and interoperability, will directly inform planning for future coalition operations, and a formal after-action report is expected to be published later this year.",
      question: 'According to the report, what will happen to forces along the eastern flank?',
      options: [
        'They remain unaffected, along with the rapid reaction force.',
        'They will also begin a phased withdrawal within six months.',
        'They will be replaced by a locally led force.',
        'They will be reduced to an advisory garrison only.',
      ],
      answer: 0,
      ex: "'forward-deployed forces along the eastern flank remain untouched, and the rapid reaction force continues to operate at full strength' と明言している。撤退や現地部隊への交代、顧問団への縮小は、平和維持任務側の話であり東方正面とは無関係。",
    },
  ],

  extradition: [
    {
      level: 3,
      topic: 'Fraud suspect — apprehended after fleeing justice',
      passage:
        "Police say a suspect wanted in connection with a major fraud case has been apprehended after fleeing justice for nearly three years. The man, who is accused of defrauding investors of several million dollars, was first indicted in his home country, but he absconded before his trial could begin, reportedly using a false passport to cross the border. Interpol issued a red notice shortly afterward, alerting law enforcement agencies worldwide. He was eventually detained by local police acting on that notice, and prosecutors say the offense clearly meets the dual criminality requirement under the existing bilateral extradition treaty between the two countries, since fraud is a crime in both jurisdictions. A formal request for extradition has now been submitted, and officials expect a custody hearing within the next two weeks. The suspect's lawyer has argued that the case should instead be treated as a political offense, but prosecutors reject that claim entirely, insisting there is no political element whatsoever, only ordinary financial crime. If the extradition request succeeds, the man will be surrendered to face trial, and if convicted, could receive a lengthy custodial sentence. Investigators say several of his frozen assets may also be recovered separately through ongoing judicial cooperation with financial authorities in a third country.",
      question: "What argument has the suspect's lawyer made?",
      options: [
        'That the offense does not meet the dual criminality requirement.',
        "That Interpol's red notice was issued in error.",
        'That the suspect should be granted diplomatic immunity.',
        'That the case should be treated as a political offense.',
      ],
      answer: 3,
      ex: "弁護士は 'the case should instead be treated as a political offense' と主張している。双罰性の否定やレッドノーティスの誤り、外交特権への言及は本文にない。",
    },
    {
      level: 3,
      topic: 'Border stop — asylum claim complicates extradition',
      passage:
        "F1: We've had an unusual case at the border today. A man travelling on a forged passport was stopped, and it turns out he's wanted back home under an arrest warrant for embezzlement.\nM1: Interesting. Is he claiming anything in his defence?\nF1: Yes, he's applied for asylum, saying he would be unfairly prosecuted if he were sent back, and that the charges are politically motivated.\nM1: That complicates things. Do we have any judicial cooperation agreement with his home country?\nF1: We do, and under mutual legal assistance arrangements, we can request evidence from them directly. But before any extradition proceeds, immigration officials need to assess the asylum claim first. If it's granted, extradition would likely be refused, since we wouldn't deport someone into a situation of genuine persecution.\nM1: And if the asylum claim fails?\nF1: Then the standard extradition process would go ahead, assuming embezzlement is an extraditable offense under our treaty with that country, which I believe it is.\nM1: So essentially the asylum decision comes first, and everything else depends on it.\nF1: Exactly right. The home country has already sent a formal request for extradition, but for now it's simply sitting in a queue until the asylum office reaches its decision.\nM1: How long does that usually take?\nF1: Anywhere from a few weeks to several months, depending on how complicated the political element of the claim turns out to be.",
      question: 'According to the woman, what happens if the asylum claim is granted?',
      options: [
        'Extradition would proceed immediately regardless of the outcome.',
        'Extradition would likely be refused to avoid deporting him into persecution.',
        'The arrest warrant would automatically be cancelled.',
        'The man would immediately be granted permanent residency.',
      ],
      answer: 1,
      ex: "'If it's granted, extradition would likely be refused, since we wouldn't deport someone into a situation of genuine persecution' と説明している。即時強制送還や逮捕状の自動取消、永住権付与への言及はない。",
    },
    {
      level: 3,
      topic: 'Fugitive businessman — voluntary return after years abroad',
      passage:
        "A long-running extradition dispute appears close to resolution after officials confirmed that a wanted businessman, who had been living for six years in what many described as a safe haven with no extradition treaty, has agreed to return voluntarily. The man had originally fled justice after being accused of large-scale tax fraud, and although prosecutors issued an indictment and requested his repatriation multiple times, the host country repeatedly declined, citing the absence of any bilateral extradition treaty and concerns about dual criminality, since certain aspects of the alleged offense were not recognized as crimes under its own law. Negotiations continued quietly for years through informal judicial cooperation channels rather than a formal extradition request. Officials now say the businessman changed his position after concluding that continuing to live abroad indefinitely was no longer sustainable, particularly as several of his assets had been frozen. Under the terms of his return, he will surrender to authorities on arrival and stand trial, though prosecutors have indicated that if convicted, they will seek a custodial sentence rather than a simple fine, given the scale of the losses involved. Legal analysts say the case is likely to be studied closely by other governments negotiating extradition arrangements with countries that currently offer similar safe havens.",
      question: 'Why did the host country previously refuse to extradite the man?',
      options: [
        'Because he successfully claimed asylum in that country.',
        "Because Interpol had not issued a red notice for him.",
        'Because it had no bilateral extradition treaty and questioned dual criminality.',
        'Because he held diplomatic immunity there.',
      ],
      answer: 2,
      ex: "'citing the absence of any bilateral extradition treaty and concerns about dual criminality' が理由として述べられている。亡命の成功や外交特権、レッドノーティス未発行への言及はない。",
    },
  ],

  jesus_extra: [
    {
      level: 3,
      topic: 'Security Council session — ceasefire resolution',
      passage:
        "Fighting between rebel forces and the national army has continued for a third week, despite growing international pressure. The United Nations Security Council held an emergency session yesterday and adopted a resolution calling for an immediate ceasefire, though it stopped short of authorizing sanctions against either side. Diplomats say mediation efforts are ongoing, with a neighboring country offering to host negotiations between the two sides within the coming days. The rebels claim they are defending regional autonomy and reject any suggestion that their movement threatens the country's sovereignty, while government officials describe the fighting as an internal security matter and have so far resisted calls for an international observer mission. Humanitarian aid organizations report that thousands of civilians have already fled the conflict zone, and a temporary armistice earlier this month, intended to allow aid convoys through, collapsed within forty-eight hours amid accusations of ceasefire violations from both sides. Analysts note that without agreement on a genuine ceasefire, any resolution passed in New York is unlikely to change conditions on the ground in the short term. A follow-up session at the Security Council is expected within the month, and several member states have already signaled they may push for a stronger resolution if the fighting continues.",
      question: 'What did the Security Council resolution call for?',
      options: [
        'An immediate ceasefire, without authorizing sanctions.',
        'Immediate international sanctions against the rebel forces.',
        'Deployment of an international observer mission to the region.',
        "Formal recognition of the rebels' claim to regional autonomy.",
      ],
      answer: 0,
      ex: "'adopted a resolution calling for an immediate ceasefire, though it stopped short of authorizing sanctions' と明言。監視団の派遣は政府が拒否している別の話であり決議の内容ではない。自治承認への言及もない。",
    },
    {
      level: 3,
      topic: 'Earthquake relief operation — access blocked by landslide',
      passage:
        "Relief operations are continuing in the mountainous northern region following last week's earthquake, which triggered a landslide that blocked the main access road to several villages. Local authorities ordered an evacuation of the worst-affected areas as a precaution against aftershocks, and the air force has been supporting the relief operation by airlifting food, water, and medical supplies to communities that remain cut off. Officials say a renewed heatwave has complicated the response, since high temperatures increase the risk of disease in crowded evacuation shelters, while the drought affecting the wider region earlier this year had already strained local water supplies before the earthquake struck. International humanitarian aid has begun arriving, though officials note that the damaged road network means most assistance must still be delivered by helicopter for at least another week. Engineers are working to clear the landslide and repair the road, but they caution that further heavy rain could trigger additional landslides in the same area, delaying reconstruction efforts even further. The government has asked neighbouring countries for additional airlift capacity to speed up the delivery of supplies, and officials say a second wave of relief flights is expected to arrive within the next forty-eight hours.",
      question: 'Why is most aid currently delivered by helicopter?',
      options: [
        'Because the government has banned road transport in the region.',
        'Because international aid has not yet arrived.',
        'Because the landslide has blocked the main access road.',
        'Because the heatwave has made road travel too dangerous.',
      ],
      answer: 2,
      ex: "'a landslide that blocked the main access road... most assistance must still be delivered by helicopter' が理由。政府による道路封鎖命令や国際支援の未着、熱波による危険性への言及はない。",
    },
    {
      level: 3,
      topic: 'Emergency landing — bird strike and runway closure',
      passage:
        "M1: Control, this is Charlie Four-Two, requesting immediate return to the field. We've had a bird strike on departure and one engine is showing abnormal readings.\nM2: Charlie Four-Two, copy, understood. Are you declaring an emergency?\nM1: Affirmative, declaring an emergency landing. We're currently holding in the standard pattern while we run the checklist, but request priority for a go-around approach if the runway isn't immediately clear.\nM2: Roger, the runway is currently occupied by foreign object debris removal after an earlier taxiing incident, so please maintain your holding pattern for approximately five minutes. Emergency vehicles are being positioned now.\nM1: Copy, holding. Can you also advise on current weather? We had some damp conditions reported at departure.\nM2: Weather remains damp with light rain lingering over the field, visibility is still within limits for your approach.\nM1: Understood, Charlie Four-Two standing by in the holding pattern.\nM2: Copy, we'll call you back in shortly for final approach once the runway is confirmed clear.\nM1: One more thing — the engine reading has stabilized, so we no longer expect to need the emergency vehicles once we're on the ground.\nM2: Copy that, I'll pass it on, but we'll keep them positioned as a precaution until you've landed safely.",
      question: 'Why must the aircraft continue holding before landing?',
      options: [
        'Because of a bird strike affecting the runway itself.',
        'Because the runway is occupied by foreign object debris removal.',
        'Because visibility is too poor for approach.',
        'Because another aircraft is performing a go-around ahead of it.',
      ],
      answer: 1,
      ex: "'the runway is currently occupied by foreign object debris removal after an earlier taxiing incident' が理由。バードストライクは着陸機側の問題であり滑走路占有の理由ではない。視界不良は 'visibility is still within limits' と否定されており、他機のゴーアラウンドへの言及もない。",
    },
  ],

  nato_acronyms: [
    {
      level: 3,
      topic: 'Exchange program briefing — command structure',
      passage:
        "I'd like to give a brief overview of how our exchange program works. All of you have been selected by the DoD to attend language training at the DLI before joining your gaining commands. Officers commissioned through this program will typically serve first as a junior staff officer at a battalion HQ, working directly for the CO, before eventually taking on greater responsibility. NCOs in the program follow a slightly different path, usually beginning at a company-level CP, supporting day-to-day OPS rather than strategic planning. For those of you heading to units under CENTCOM, be aware that your point of contact, or POC, for administrative matters will be based at the regional headquarters, not at your local unit. Historically, some of you may study the ISAF mission in Afghanistan or the KFOR mission in Kosovo as case studies, since both illustrate how multinational forces integrate under a single operational headquarters. One historical note: the USAF was not established as an independent service until nineteen forty-seven; before that, it was simply an arm of the Army. I'll now hand over to the DLI staff for administrative details, but before I do, remember that your assigned POC is always your first point of contact for questions, not the general HQ switchboard.",
      question: 'According to the speaker, where do NCOs in the program typically begin?',
      options: [
        'At a battalion headquarters working directly for the commanding officer.',
        'At the regional headquarters under CENTCOM.',
        'At a company-level command post supporting daily operations.',
        'At the Defense Language Institute as instructors.',
      ],
      answer: 2,
      ex: "'NCOs in the program follow a slightly different path, usually beginning at a company-level CP, supporting day-to-day OPS' と説明されている。大隊本部でCOの下は将校の話であり、CENTCOM地域司令部はPOCの所在地、DLIで教官という記述は本文にない。",
    },
    {
      level: 3,
      topic: 'Change of command — informal exchange',
      passage:
        "F1: Do you know who the new CO is for the unit that just returned from the KFOR rotation?\nM1: I believe it's the officer who previously served on the CENTCOM staff. He's taking over from the current commanding officer next month.\nF1: That's good experience. I heard he also did a tour with ISAF earlier in his career.\nM1: That's right. Anyway, if you need anything from him directly, you should probably go through his POC first rather than contacting the HQ switchboard directly.\nF1: Understood. Is the command post still located in the same building as OPS?\nM1: For now, yes, though there's been talk from the DoD about consolidating both into a single facility next year to save costs.\nF1: Interesting. One more question — has the NCO in charge of daily OPS changed as well, or is she staying on through the transition?\nM1: She's staying on, actually, which should help keep things running smoothly while the new CO gets up to speed.\nF1: That's reassuring. Do you know if the DoD review will affect our OPS schedule at all in the meantime?\nM1: Not directly, no — that review is mainly about the physical facilities, not day-to-day operations.",
      question: 'What does the man suggest about contacting the new CO?',
      options: [
        'Contact him directly through the HQ switchboard.',
        'Go through his POC rather than the HQ switchboard.',
        'Wait until the DoD consolidation is complete.',
        'Speak to the NCO in charge of daily operations instead.',
      ],
      answer: 1,
      ex: "'you should probably go through his POC first rather than contacting the HQ switchboard directly' と助言している。HQ交換台への直接連絡は逆であり、DoD統合完了待ちや当直NCO経由という記述もない。",
    },
    {
      level: 3,
      topic: 'History lesson — the meaning of DoW',
      passage:
        "Today's history lesson focuses on a term you may encounter in older documents but rarely see used in a formal sense today: DoW, or Declaration of War. Under the constitution of most democratic states, only the legislature, not the department of defense or any single commanding officer, holds the authority to issue a formal DoW. In practice, however, most modern military operations, including those conducted under ISAF or KFOR, have been authorized through other legal mechanisms, such as United Nations mandates or bilateral agreements, rather than a traditional declaration of war between states. Some students confuse the abbreviation DoW with an unrelated, informal use of the same letters meaning simply day of week, which occasionally appears in scheduling documents, but that usage has nothing to do with military law. For your exam, remember that a DoW is a formal, legislative act, distinct from operational orders issued at the HQ or CP level, and distinct from the day-to-day OPS conducted by units in the field. We will look at two historical examples next week to see how this process has actually been used in practice, and how rarely legislatures have actually chosen to exercise that formal authority in the modern era.",
      question: 'According to the speaker, who holds the authority to issue a formal DoW?',
      options: [
        'The commanding officer at unit headquarters.',
        'The legislature.',
        'The Department of Defense.',
        'The staff officer running daily operations at the command post.',
      ],
      answer: 1,
      ex: "'only the legislature, not the department of defense or any single commanding officer, holds the authority to issue a formal DoW' と明言されている。指揮官やCPの担当将校、国防総省には権限がないとされている。",
    },
  ],
};
