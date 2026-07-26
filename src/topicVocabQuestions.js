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
    {
      level: 3,
      topic: 'Fugitive arrested — relative accused of harboring him',
      passage:
        "A well-known fugitive who had fled justice more than a decade ago was arrested this week after investigators discovered he had been living under a false identity in a small coastal town. Local prosecutors say the man, wanted on charges of large-scale corruption, had received help from at least one relative accused of knowingly harboring him for several years, providing housing and financial support despite being aware of his fugitive status. That relative now faces separate charges for harboring a criminal, which carries its own custodial penalty under local law. Investigators say the case was cracked after a tip from a neighbour who noticed the man rarely left the property and appeared to avoid contact with local officials. Prosecutors have confirmed that extradition proceedings, if eventually required, would depend on where formal charges are ultimately filed, since the man holds citizenship in a third country not directly involved in the original case. For now, he remains in custody while authorities determine the appropriate jurisdiction for his trial. The relative accused of harboring him is expected to appear in court separately next month.",
      question: 'What is the relative accused of, according to the report?',
      options: [
        'Fleeing justice alongside the fugitive.',
        'Harboring the fugitive by providing housing and financial support.',
        "Filing false extradition paperwork on the fugitive's behalf.",
        "Bribing a neighbour to stay silent about the fugitive's location.",
      ],
      answer: 1,
      ex: "'accused of knowingly harboring him for several years, providing housing and financial support' と説明されている。逃亡そのものへの関与や虚偽の引渡し書類作成、近隣住民への口止めへの言及はない。",
    },
    {
      level: 3,
      topic: 'Diplomatic immunity vs. political offense exception',
      passage:
        "M1: There's an interesting extradition case in the news today. Apparently the requested state is refusing to hand over the suspect.\nF1: On what grounds?\nM1: Two, actually. First, the man claims diplomatic immunity, arguing he was acting in an official capacity at the time of the alleged offense.\nF1: And the second?\nM1: His lawyers are also invoking the political offense exception, saying the charges relate entirely to his political activities rather than any ordinary crime.\nF1: That's a strong combination of defences. Which one do you think is more likely to succeed?\nM1: Honestly, the diplomatic immunity claim seems weaker here, since his official position ended before the alleged offense actually took place. The political offense argument may carry more weight, especially if the courts agree the charges are politically motivated rather than criminal in nature.\nF1: So the case could still go either way.\nM1: Exactly. Legal experts say a final ruling could take months, given how rarely both defences are argued together in the same case.\nF1: I'll be curious to see which argument the appeals court ultimately finds more persuasive.\nM1: Same here — this could set an interesting precedent either way.",
      question: 'According to the man, why does the diplomatic immunity claim seem weaker?',
      options: [
        'Because he never held an official position at all.',
        'Because the political offense exception makes it unnecessary.',
        'Because his official position had ended before the alleged offense occurred.',
        'Because the requested state does not recognize diplomatic immunity.',
      ],
      answer: 2,
      ex: "'his official position ended before the alleged offense actually took place' が理由。公的地位自体がなかったわけではなく、政治犯不引渡しの主張とは別問題。相手国が外交特権を認めていないという記述もない。",
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
    {
      level: 3,
      topic: 'Armed forces briefing — NATO fundamentals and an alleged incident',
      passage:
        "Today I want to address several questions about how our armed forces prepare for multinational operations. First, on conscription: our country abolished compulsory conscription two decades ago, so all current deployment relies entirely on volunteer personnel. Before any deployment abroad, every unit receives a full briefing on the rules of engagement, since operating under NATO's collective defence framework, particularly the commitments set out in Article 5, requires absolute clarity about when force may be used. An alliance is only as credible as its deterrence, and deterrence depends heavily on interoperability — the ability of different national forces to operate together smoothly, sharing equipment standards, communications, and procedures. I should mention that recent media reports of an alleged incident involving one of our contingents abroad are still under investigation, and no conclusions have been reached. Officials have stressed that speculation at this stage would be premature and unhelpful to the ongoing inquiry. In the meantime, planning continues for the alliance's next major exercise, which will test interoperability across several member states' armed forces under simulated wartime conditions. Attendance at pre-deployment briefings remains mandatory for every soldier involved, regardless of rank or specialty.",
      question: 'According to the speaker, what is true about the alleged incident?',
      options: [
        'It has already been confirmed by officials.',
        'It occurred during a NATO Article 5 deployment.',
        'It was caused by a lack of interoperability.',
        'It remains under investigation, with no conclusions reached.',
      ],
      answer: 3,
      ex: "'reports of an alleged incident... are still under investigation, and no conclusions have been reached' と述べられている。確定済みや第5条発動時の出来事、相互運用性不足が原因という記述はない。",
    },
    {
      level: 3,
      topic: 'Week in review — peacekeeping, extradition, and a referendum',
      passage:
        "F1: It's been a busy week for international news. Let's start with the peacekeeping mission — any update?\nM1: Yes, the peacekeeping force reported a marked drop in violence since the ceasefire, and officials say the broader peacekeeping effort in the region is finally showing results after years of little progress.\nF1: Good to hear. What about the extradition case we discussed last week?\nM1: That's moving forward. The treaty covering that extradition request was actually signed only two years ago, as part of a wider push toward the conclusion of treaties between the two governments on judicial cooperation.\nF1: And the referendum on constitutional reform?\nM1: It passed narrowly, though there were reports of a riot outside the main counting center after early results suggested the vote might fail. Police eventually restored order without serious injuries.\nF1: A lot happening all at once.\nM1: Definitely. I think the referendum result will get more attention next week once the final numbers are certified.\nF1: Agreed. Let's revisit all three stories once there's more confirmed information.",
      question: 'What does the man say about the peacekeeping mission?',
      options: [
        'Violence has dropped and the broader effort is finally showing results.',
        'The mission has made little progress after years of effort.',
        'The mission ended after the referendum passed.',
        'The mission was suspended due to the riot.',
      ],
      answer: 0,
      ex: "'a marked drop in violence... the broader peacekeeping effort... is finally showing results' と述べている。進展がない、住民投票後に終了、暴動により停止という記述はない。",
    },
    {
      level: 3,
      topic: 'Scramble and intercept — radio exchange',
      passage:
        "M1: Ops, this is Viper Flight, we've just been scrambled from quick reaction alert to intercept an unidentified contact approaching the air policing zone.\nM2: Copy, Viper Flight. AWACS has the contact on radar and will guide you in. Expect a tanker to be available for refuelling if your sortie runs long.\nM1: Understood. Are we flying this as a standard combat air patrol, or do you want us to escort the contact out of the area once identified?\nM2: Escort, once identified. Deconfliction with the tanker's own patrol track is already coordinated, so you shouldn't have any conflict on approach.\nM1: Copy that. How many sorties has the squadron flown today already?\nM2: This will be your third sortie of the day. Command wants continuous air policing coverage until the exercise concludes tonight.\nM1: Understood, Viper Flight proceeding to intercept.\nM2: One more thing — if fuel runs low before the intercept is complete, divert to the tanker immediately rather than pressing on.\nM1: Copy, safety first.\nM2: Also, be advised that a second QRA pair is being scrambled as backup in case this turns into a longer engagement.\nM1: Roger, appreciate the heads up. Viper Flight, out.",
      question: 'What will Viper Flight do once the contact is identified?',
      options: [
        'Return immediately to base without further action.',
        'Refuel from the tanker before continuing the sortie.',
        'Escort the contact out of the area.',
        'Hand the intercept over to the second QRA pair.',
      ],
      answer: 2,
      ex: "'Escort, once identified' と指示されている。即時帰投や給油優先、2番目のQRAへの引き継ぎへの言及はない。",
    },
    {
      level: 3,
      topic: 'Pre-mission briefing — FOB, airspace, and de-icing',
      passage:
        "This morning's briefing covers several items relevant to tomorrow's mission. First, the forward operating base has confirmed that all support facilities are ready to receive additional personnel. Second, an unmanned aircraft conducted a reconnaissance flight over the objective area overnight and reported no unusual activity, though it did note that a portion of the local airspace remains subject to civilian air traffic restrictions. Third, ground commanders have requested confirmation that air superiority over the objective area will be established before any troops move forward; fighter squadrons are expected to achieve that within the first hour of operations. Pilots have been reminded to check the latest NOTAM before departure, since one has been issued overnight regarding a temporary restriction near the FOB itself. Finally, weather officers report freezing conditions at higher altitudes, so de-icing procedures will be mandatory for all aircraft before take-off tomorrow morning. Any questions on these points should be directed to the operations staff before end of day. Command has also asked that all aircrew confirm receipt of this briefing in writing, given the number of time-sensitive items involved.",
      question: 'What must ground commanders confirm before troops move forward?',
      options: [
        'That air superiority over the objective area has been established.',
        'That the unmanned aircraft has landed safely.',
        'That the NOTAM restriction has been lifted.',
        'That de-icing has been completed at the FOB.',
      ],
      answer: 0,
      ex: "'ground commanders have requested confirmation that air superiority over the objective area will be established before any troops move forward' と述べられている。無人機の着陸やNOTAM解除、前進基地での除氷完了は前進の条件として挙げられていない。",
    },
    {
      level: 3,
      topic: 'Airport disruption — runway incursion and diverted traffic',
      passage:
        "Passengers waiting for the connecting service should note that boarding has been delayed by approximately forty minutes due to a runway incursion earlier this afternoon, which required the airport to briefly suspend all departures. Officials say conditions are now considered suitable for normal operations to resume, though controllers are still working through a backlog of diverted traffic from flights that were unable to land during the closure. One incoming flight was forced into a diversion to a nearby airport when it became clear that landing here within its fuel reserves was simply out of the question. Airport management has apologised for the disruption and confirmed that ground staff are working to clear the backed-up traffic on the taxiways as quickly as possible. Passengers are advised that conditions may remain unsuitable for smooth connections throughout the evening, and additional delays should be expected until the schedule fully recovers. Staff have also confirmed that all affected passengers will be automatically rebooked onto the next available service at no extra charge. The airport has asked for patience as controllers work to restore a normal flow of departures and arrivals.",
      question: 'Why was the connecting flight delayed?',
      options: [
        'Because weather conditions were unsuitable for landing.',
        'Because the flight was diverted to a nearby airport.',
        'Because passengers had not finished boarding.',
        'Because a runway incursion suspended departures earlier.',
      ],
      answer: 3,
      ex: "'boarding has been delayed... due to a runway incursion earlier this afternoon, which required the airport to briefly suspend all departures' が理由。天候不良ではなく、便自体のダイバートや搭乗未完了が理由でもない。",
    },
    {
      level: 3,
      topic: 'City council — obesity guidelines and a new leisure facility',
      passage:
        "The city council published new guidelines this week aimed at reducing childhood obesity, following a report showing rates have risen sharply over the past decade. As part of the plan, the council will fund a new leisure facility in the eastern district, offering free access to sports programs for local families. Officials say the facility will be paid for partly through a small increase in local taxation, though they were careful to stress that the overall tax rate for most residents will remain unchanged, since the additional funding comes primarily from a levy on new commercial developments rather than existing households. Temporary accommodation has also been arranged for construction workers during the building phase, most of whom are travelling from other regions for the project. The council expects the facility to open within eighteen months, and has promised regular updates on both the construction timeline and the broader public health guidelines it hopes will accompany the new investment. Community groups have generally welcomed the announcement, though some have asked for more detail on how the guidelines will actually be enforced in local schools. A public consultation on the guidelines will run for the next six weeks, and residents are encouraged to submit feedback online.",
      question: 'How will the new leisure facility mainly be funded, according to the report?',
      options: [
        'Through an increase in the overall tax rate for all residents.',
        'Through a levy on new commercial developments.',
        'Through temporary accommodation fees charged to construction workers.',
        'Through a reduction in existing public health guidelines spending.',
      ],
      answer: 1,
      ex: "'the additional funding comes primarily from a levy on new commercial developments rather than existing households' と説明されている。全住民の税率引き上げではなく、建設労働者の宿泊費や既存予算の削減への言及もない。",
    },
    {
      level: 3,
      topic: 'Documentary unveiled — strategic autonomy debate',
      passage:
        "A new documentary series was unveiled this week, examining Europe's growing debate over strategic autonomy and its relationship with traditional alliance structures. The programme, which includes an English voice-over for international audiences, features interviews with defence officials discussing how burden sharing among allies has evolved over the past decade. One episode follows preparations for a major multinational exercise involving forces from a dozen countries, showing how planners balance national priorities with the demands of working together under a single command. The producers say the series deliberately avoids taking a position on whether greater strategic autonomy would strengthen or weaken existing alliances, instead presenting arguments from officials on both sides of the debate. Early reviews have praised the documentary's access to normally closed planning meetings, though some critics argue the voice-over occasionally oversimplifies complex policy disagreements for a general audience. The full series will be broadcast over the coming month, with an accompanying online discussion forum for viewers to submit questions to the officials interviewed. Producers have confirmed that a follow-up episode focusing specifically on burden sharing negotiations is already in production for next year.",
      question: 'What does the documentary series deliberately avoid doing, according to the producers?',
      options: [
        'Including an English voice-over for international audiences.',
        'Featuring interviews with defence officials.',
        'Taking a position on whether strategic autonomy would help or harm alliances.',
        'Showing footage from the multinational exercise.',
      ],
      answer: 2,
      ex: "'deliberately avoids taking a position on whether greater strategic autonomy would strengthen or weaken existing alliances' と説明されている。ナレーション収録やインタビュー実施、演習映像は実際に行っている内容。",
    },
    {
      level: 3,
      topic: 'Economic outlook — inflation, supply chains, and a disinformation warning',
      passage:
        "This quarter's economic outlook remains mixed. Inflation has eased slightly from its peak last year, though prices for basic goods are still well above pre-pandemic levels, and some analysts warn that the country could yet slip into a mild recession if consumer spending continues to weaken. On a more positive note, investment in renewable energy has surged, partly driven by government incentives, and officials hope this will offset some of the long-term economic pressure created by demographic decline in the workforce. Migration policy remains a contentious topic in parliament, with some lawmakers arguing that controlled migration could help address labour shortages linked to the aging population. Meanwhile, the technology sector continues to grapple with supply chain disruptions affecting semiconductor production, which has delayed several major manufacturing projects. Separately, the cybersecurity agency issued a warning this week about a coordinated disinformation campaign targeting public trust in the upcoming budget announcement, urging citizens to verify information through official government channels rather than social media. Officials say a full response to these combined challenges will be outlined in next month's budget statement. Business groups have called for urgent clarity on tax policy in the meantime, saying uncertainty is already affecting investment decisions.",
      question: 'What warning did the cybersecurity agency issue this week?',
      options: [
        'A coordinated disinformation campaign is targeting trust in the budget announcement.',
        'Semiconductor supply chains have been targeted by cyberattacks.',
        'Migration data has been leaked to foreign governments.',
        'Renewable energy infrastructure is vulnerable to sabotage.',
      ],
      answer: 0,
      ex: "'a coordinated disinformation campaign targeting public trust in the upcoming budget announcement' と説明されている。半導体サプライチェーンへのサイバー攻撃、移民データ流出、再生可能エネルギー施設への妨害への言及はない。",
    },
    {
      level: 3,
      topic: 'Tsunami warning and volcanic eruption — unrelated events',
      passage:
        "Authorities issued a tsunami warning for coastal areas late last night following a powerful undersea earthquake, though the alert was lifted this morning after wave heights remained lower than initially feared. Separately, scientists continue to monitor a volcanic eruption that began three days ago on a remote island further north, which has so far caused no reported casualties but has disrupted several regional flight routes due to ash in the atmosphere. Officials say the two events are unrelated, despite occurring within days of each other, and emphasised that the tsunami warning system performed exactly as designed, giving coastal residents enough time to move to higher ground before the alert was lifted. Volcanologists studying the eruption say activity may continue for several more weeks, and have asked airlines operating in the region to maintain heightened caution around ash advisories until further notice. Local governments near both affected areas have activated their standard emergency coordination procedures as a precaution, even though neither event is currently considered to pose an ongoing threat to human life. Residents in the coastal zone have been thanked for following evacuation guidance promptly during the tsunami alert.",
      question: 'According to the report, what do officials say about the two events?',
      options: [
        'They were caused by the same underlying seismic activity.',
        'The volcanic eruption caused the tsunami warning to be issued.',
        'Both events currently pose an ongoing threat to human life.',
        'They are unrelated, despite occurring within days of each other.',
      ],
      answer: 3,
      ex: "'the two events are unrelated, despite occurring within days of each other' と明言されている。同一の地震活動や噴火が津波警報の原因、現在も人命への脅威が継続という記述はない。",
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
