// JFLT Reading Complete — Optimized for Level 2+
// Distribution: L1=10, L2=35, L3=25, L4=10 (Total: 80 questions)
// 
// Design principles:
// - L2 is the foundation (35 questions for mastery) — expect 90%+ accuracy
// - L3 provides sufficient exposure (25 questions) — target 50% accuracy for 2+
// - L1 reduced to essentials (10 questions for baseline confirmation)
// - L4 reduced to reference level (10 questions to understand L3/L4 boundary)
//
// All L2/L3 questions use paraphrased options (no verbatim keyword matching)

export const READING = {
  1: [
{ topic: "Checkpoint procedures", passage: "Corporal Davies is on duty at Checkpoint Alpha. He stops a civilian vehicle and asks the driver to show identification. The driver presents a passport. The corporal checks the document and records the entry time as 0820. He then waves the vehicle through.", question: "What time did the vehicle pass through the checkpoint?", options: ["0800", "0820", "0830", "0840"], answer: 1, ex: "The entry time is explicitly stated as 0820. Level 1 Reading tests ability to find specific facts in short texts (~50 words)." },
{ topic: "Daily military routine", passage: "The morning briefing begins at 0700. All officers must be present. Sergeant Major Rodriguez will present the daily schedule. After the briefing, personnel will proceed to their assigned posts. Breakfast is available in the mess hall until 0630.", question: "When does the morning briefing start?", options: ["0600", "0630", "0700", "0800"], answer: 2, ex: "'The morning briefing begins at 0700.' Note that breakfast ends BEFORE the briefing — a common Level 1 trap testing careful reading." },
{ topic: "Equipment and supplies", passage: "The supply depot received a shipment of 200 ration packs, 50 first aid kits, and 30 radio batteries. The items were checked and stored. The depot commander signed the delivery receipt at 1400.", question: "How many first aid kits were received?", options: ["200", "50", "30", "100"], answer: 1, ex: "'50 first aid kits' — Level 1 tests precise number retrieval. Don't confuse with 200 (ration packs) or 30 (batteries)." },
{ topic: "Medical — first aid", passage: "Private Johnson was injured during training. He reported to the medical centre at 1530. The medic treated a cut on his left hand. Johnson was cleared to return to duty the following morning.", question: "Which part of Private Johnson's body was injured?", options: ["Right hand", "Left arm", "Left hand", "Right arm"], answer: 2, ex: "'A cut on his left hand' — small details like left vs right are commonly tested at Level 1." },
{ topic: "Weather report", passage: "Tomorrow's weather forecast: cloudy in the morning with light rain expected after 1100. Temperature will reach 18 degrees Celsius. Wind from the west at 15 kilometres per hour. Visibility good. The weather may affect afternoon training activities.", question: "When is rain expected to begin?", options: ["In the early morning", "After 1100", "In the evening", "At midnight"], answer: 1, ex: "'Light rain expected after 1100' — straightforward time retrieval. 'After 1100' means from 1100 onwards." },
{ topic: "Personnel announcement", passage: "Lieutenant Smith has been promoted to the rank of Captain. The promotion ceremony will take place on Friday at 1000 in the parade ground. All officers are invited to attend. Dress uniform is required.", question: "What rank has Lieutenant Smith been promoted to?", options: ["Major", "Colonel", "Captain", "Sergeant"], answer: 2, ex: "'Promoted to the rank of Captain' — direct fact retrieval. Don't be distracted by the original rank (Lieutenant)." },
{ topic: "Training schedule", passage: "The new recruits will begin physical training at 0500 daily. The training session lasts two hours. Breakfast follows at 0730. Weapon training starts at 0900 and continues until lunch.", question: "How long is the morning physical training session?", options: ["One hour", "Two hours", "Three hours", "Half an hour"], answer: 1, ex: "'The training session lasts two hours' — direct fact retrieval. Note that 0500–0700 = 2 hours, then breakfast at 0730." },
{ topic: "Vehicle inspection", passage: "All military vehicles must undergo daily inspection before use. Drivers check fuel levels, tyre pressure, oil, and lights. Any faults must be reported to the motor sergeant immediately. Inspection takes about ten minutes.", question: "Who must drivers report faults to?", options: ["The platoon commander", "The motor sergeant", "The duty officer", "The base commander"], answer: 1, ex: "'Any faults must be reported to the motor sergeant immediately' — specific role identification at Level 1." },
{ topic: "Mess hall information", passage: "The mess hall serves three meals per day. Breakfast is from 0600 to 0700. Lunch is from 1200 to 1330. Dinner is from 1800 to 1900. Hot drinks are available all day from the coffee machine.", question: "Until what time is lunch served?", options: ["1200", "1300", "1330", "1400"], answer: 2, ex: "'Lunch is from 1200 to 1330' — pay attention to start vs end time. 1330 is the closing time." },
{ topic: "Guard duty roster", passage: "Private Williams is assigned to guard duty tonight. His shift begins at 2200 and ends at 0200. He will be at Gate Two. Corporal Brown will relieve him. Williams must arrive ten minutes early.", question: "Where will Private Williams be on guard duty?", options: ["Gate One", "Gate Two", "Gate Three", "The main entrance"], answer: 1, ex: "'He will be at Gate Two' — location retrieval. Don't confuse with the relieving guard (Corporal Brown)." }
  ],
  
  2: [
{ topic: "Rules of engagement — Kosovo", passage: "KFOR troops deployed in Kosovo operate under strict rules of engagement. Soldiers are authorised to use force only in self-defence or to protect civilians under imminent threat. Any use of force must be reported immediately to the commanding officer and documented in the duty log. Troops are reminded that all actions must comply with international humanitarian law.", question: "Under what circumstances may KFOR soldiers use force?", options: ["At any time they consider necessary", "Only in self-defence or to protect civilians under imminent threat", "After receiving written authorisation", "Only when ordered by a superior officer"], answer: 1, ex: "'Authorised to use force only in self-defence or to protect civilians under imminent threat' — Level 2 tests understanding of conditions and restrictions, not just isolated facts." },
    { topic: "Convoy logistics", passage: "The logistics convoy departed Camp Bravo at 0530 and was scheduled to arrive at Forward Operating Base Delta by 1100. Due to a road obstruction caused by a landslide, the convoy was forced to take an alternative route, adding approximately 45 minutes to the journey. The convoy commander reported the delay to headquarters and requested updated arrival time confirmation.", question: "What caused the convoy's delay?", options: ["A vehicle breakdown", "Enemy activity on the main road", "A landslide blocking the road", "Bad weather conditions"], answer: 2, ex: "'A road obstruction caused by a landslide' — paraphrase comprehension: the question asks for the cause, not the route change." },
    { topic: "Humanitarian medical support", passage: "NATO medical teams established a field hospital near the town of Brcko to support the local civilian population affected by flooding. The facility treated over 300 patients in the first 48 hours. Medical staff worked in 12-hour shifts to maintain continuous coverage. Supplies were replenished daily by helicopter, as road access remained limited due to flood damage.", question: "Why were supplies delivered by helicopter?", options: ["It was faster than road transport", "Road access was limited due to flood damage", "The roads were controlled by hostile forces", "Helicopter transport was cheaper"], answer: 1, ex: "'Supplies were replenished daily by helicopter, as road access remained limited due to flood damage' — 'as' = because." },
    { topic: "Training exercise overview", passage: "Exercise NORTHERN STAR is a multinational training exercise scheduled to take place over two weeks in northern Norway. Participating nations include Norway, the United Kingdom, Canada, and Italy. The exercise will focus on cold-weather operations and interoperability between national forces. Approximately 4,000 personnel will take part. Live-fire training will be conducted only at designated ranges.", question: "What is the main focus of the exercise?", options: ["Equipment testing", "Cold-weather operations and interoperability", "Recruit training", "Medical evacuation procedures"], answer: 1, ex: "'The exercise will focus on cold-weather operations and interoperability between national forces' — direct statement of focus areas." },
    { topic: "Communication protocols", passage: "All units must follow standard NATO radio procedures when transmitting operational information. Messages should be brief and clearly structured. Sensitive information must not be transmitted in clear text and must be encoded prior to transmission. If communication is lost, units should attempt contact every five minutes using the alternate frequency specified in the communication plan.", question: "What should units do with sensitive information before transmitting?", options: ["Send it via courier", "Transmit it quickly on the main frequency", "Encode it prior to transmission", "Wait for authorisation from headquarters"], answer: 2, ex: "'Sensitive information must not be transmitted in clear text and must be encoded prior to transmission' — Level 2 procedure comprehension." },
    { topic: "Border patrol incident", passage: "During a routine border patrol, a UN observer team detected unauthorised movement across the demarcation line. The team reported the incident through standard reporting channels and continued observation from a safe distance. Local authorities were notified within ten minutes. The observers did not engage and waited for further instructions from the mission commander.", question: "What did the observer team do after detecting the unauthorised movement?", options: ["They engaged immediately", "They reported and continued observation from a safe distance", "They withdrew from the area", "They requested air support"], answer: 1, ex: "'The team reported the incident... and continued observation from a safe distance' — observers in UN missions follow strict report-not-engage rules." },
    { topic: "Equipment failure report", passage: "Following the recent exercise, three units reported failures of their thermal imaging equipment. Initial investigation suggests the failures occurred due to extreme cold conditions during night operations. The manufacturer has been contacted and is sending technical specialists. Until the issue is resolved, affected units will use alternative night vision equipment from the unit reserve.", question: "What will affected units use until the equipment is repaired?", options: ["No night vision equipment", "Alternative night vision equipment from reserve stocks", "Equipment borrowed from allied forces", "Day-only operations"], answer: 1, ex: "'Affected units will use alternative night vision equipment from the unit reserve' — interim solution comprehension." },
    { topic: "Civil affairs project", passage: "The civil affairs team has launched a project to repair the damaged school in the local community. The project includes replacing the roof, fixing broken windows, and providing new desks and chairs. Local workers have been hired to assist with the construction. The project is expected to be completed within three weeks. Funding is provided through NATO civil cooperation funds.", question: "Who is performing the construction work?", options: ["NATO military engineers only", "Local civilian contractors only", "Local workers hired to assist", "Volunteers from neighbouring villages"], answer: 2, ex: "'Local workers have been hired to assist with the construction' — civil-military cooperation often involves hiring local labour to support both reconstruction and the local economy." },
    { topic: "Intelligence summary", passage: "The intelligence summary for the week reports increased activity in the eastern sector. A small armed group has been observed conducting reconnaissance along Route Yellow on three separate occasions. The group has not engaged with patrols. However, their pattern of activity suggests preparation for future operations. All patrols in the area are advised to maintain heightened vigilance.", question: "What is suggested by the armed group's pattern of activity?", options: ["They are withdrawing from the area", "They are preparing for future operations", "They are engaging in humanitarian work", "They have established a permanent base"], answer: 1, ex: "'Their pattern of activity suggests preparation for future operations' — interpretation of intelligence indicators is core to Level 2 reading." },
    { topic: "Field hospital operations", passage: "The field hospital handles all medical emergencies in the operational area. The facility has 50 beds and three operating theatres. Medical staff includes general surgeons, anaesthetists, and trauma specialists. Helicopter medevac is available 24 hours a day. Patients requiring specialised treatment are transferred to the regional hospital after stabilisation.", question: "What happens to patients who need specialised treatment?", options: ["They remain at the field hospital", "They are sent home to recover", "They are transferred to the regional hospital after stabilisation", "They are flown to their home countries"], answer: 2, ex: "'Patients requiring specialised treatment are transferred to the regional hospital after stabilisation' — 'after stabilisation' is a key sequencing detail." },
    { topic: "Supply chain disruption", passage: "Recent severe weather has disrupted the supply chain to forward bases. Three convoys have been delayed by an average of 36 hours. Helicopter resupply has been limited due to poor visibility. Stocks of fuel and rations remain adequate for seven days at current consumption rates. The situation is being closely monitored and contingency plans are being prepared.", question: "How long will current stocks last at current consumption rates?", options: ["Three days", "Five days", "Seven days", "Two weeks"], answer: 2, ex: "'Stocks of fuel and rations remain adequate for seven days at current consumption rates' — note 'at current consumption rates' as a key conditional." },
    { topic: "Joint patrol procedure", passage: "Joint patrols with local security forces are conducted twice weekly. Each patrol includes four NATO soldiers and four local officers. The patrol commander is rotated between the two forces. Patrols cover a fixed route and last approximately three hours. The aim is to build trust with the local population and improve security cooperation.", question: "How is the patrol commander selected?", options: ["The senior NATO officer always commands", "The local officer always commands", "Command rotates between the two forces", "Command is shared at all times"], answer: 2, ex: "'The patrol commander is rotated between the two forces' — note that rotation differs from sharing or fixed assignment." },
    { topic: "Casualty evacuation drill", passage: "All combat units conducted a casualty evacuation drill last week. The exercise tested the speed and effectiveness of medical response. Average evacuation time from point of injury to medical facility was 45 minutes. The target is 30 minutes. Areas for improvement include radio communication delays and helicopter response times. Additional training is scheduled for next month.", question: "What is the target evacuation time?", options: ["15 minutes", "30 minutes", "45 minutes", "60 minutes"], answer: 1, ex: "'The target is 30 minutes' — note the contrast: actual time was 45 minutes, target is 30 minutes. Level 2 often tests this kind of contrast." },
    { topic: "Operational briefing format", passage: "All operational briefings follow a standard format. The first section covers the situation, including weather, terrain, and enemy activity. The second section presents the mission objective. The third section details execution, including timings, routes, and assigned tasks. The final section covers logistics and command relationships. Questions are taken at the end.", question: "What is presented in the second section of the briefing?", options: ["Weather and terrain", "The mission objective", "Logistics arrangements", "Command relationships"], answer: 1, ex: "'The second section presents the mission objective' — sequence comprehension. The standard NATO briefing format follows: Situation, Mission, Execution, Logistics/Command." },
    { topic: "Live-fire safety briefing", passage: "Before any live-fire exercise, all participants attend a mandatory safety briefing. The briefing covers weapon handling, range procedures, and emergency stop signals. Anyone who misses the briefing cannot participate in the exercise. Range officers conduct safety checks before, during, and after firing. All personnel must wear ear and eye protection at all times on the range.", question: "What is the consequence of missing the safety briefing?", options: ["A formal warning", "Cannot participate in the exercise", "Must attend a later session", "A fine"], answer: 1, ex: "'Anyone who misses the briefing cannot participate in the exercise' — direct consequence statement. Level 2 tests understanding of rules and consequences." },,
// === ROE / Legal Framework (3 questions) ===
  {
    topic: "Rules of engagement — positive identification",
    passage: "All personnel conducting security operations must adhere strictly to the rules of engagement. Force may only be used when a hostile act or hostile intent has been clearly identified. Positive identification of the target is mandatory before engaging. If there is any doubt about whether a person or vehicle poses a genuine threat, personnel must seek guidance from their immediate superior before taking action. Failure to follow these procedures may result in disciplinary measures and could compromise the mission's legal standing.",
    question: "Under what circumstances are personnel permitted to use force?",
    options: [
      "Whenever they perceive a potential security risk in their area of operations.",
      "Only after a threatening action or intention has been unambiguously confirmed.",
      "At any time, provided they inform their superior officer afterward.",
      "When ordered to do so by the mission commander during pre-deployment briefing."
    ],
    answer: 1,
    ex: "'Force may only be used when a hostile act or hostile intent has been clearly identified' — option B paraphrases 'clearly identified' as 'unambiguously confirmed' and 'hostile act or hostile intent' as 'threatening action or intention'. A is too broad (any doubt requires seeking guidance). C reverses the sequence. D is fabricated. Distractor A uses 'security' from the passage to tempt surface readers."
  },
  {
    topic: "Rules of engagement — escalation of force",
    passage: "The escalation of force procedure requires personnel to use the minimum level of force necessary to achieve mission objectives. Personnel must issue verbal warnings and hand signals before resorting to warning shots. Warning shots must be aimed safely away from individuals. Only if these measures fail to stop a threat may personnel engage with direct fire. All use of force must be reported immediately through the chain of command, regardless of whether injuries occurred.",
    question: "What must happen before personnel may fire directly at a target?",
    options: [
      "The chain of command must grant explicit authorization for the engagement.",
      "Non-lethal deterrent measures must have proven insufficient to halt the threat.",
      "Personnel must confirm that injuries are likely to occur if they do not act.",
      "The target must be within effective range for small arms fire."
    ],
    answer: 1,
    ex: "'Only if these measures fail to stop a threat may personnel engage with direct fire' — option B paraphrases 'these measures fail' as 'non-lethal deterrent measures proven insufficient'. The passage describes warnings/signals/warning shots as preceding direct fire. A is not in the text (reporting is required, but authorization before direct fire is not mentioned). C and D are plausible additions but not stated. Surface matching fails: 'warning shots', 'verbal warnings' are not in any option."
  },
  {
    topic: "Legal obligations — treatment of detainees",
    passage: "Personnel who detain individuals during operations must treat them in accordance with international humanitarian law. Detainees must be protected from physical harm, provided with food and water, and given access to medical care if required. They must not be subjected to interrogation by personnel not specifically trained and authorized to conduct such activities. All detentions must be documented with the detainee's name, time and location of detention, and reason for detention. This information must be forwarded to the legal officer within six hours.",
    question: "What restriction does the passage place on questioning detained persons?",
    options: [
      "Questioning must occur within six hours of the initial detention.",
      "Only individuals with appropriate training and authorization may conduct interrogations.",
      "Detainees must first receive medical care before any questions are asked.",
      "All questioning must be supervised by the legal officer in person."
    ],
    answer: 1,
    ex: "'They must not be subjected to interrogation by personnel not specifically trained and authorized' — option B paraphrases 'trained and authorized' as 'appropriate training and authorization'. A misreads the six-hour deadline (it's for documentation, not interrogation). C and D are plausible fabrications. Distractor A uses '6 hours' from the text; D uses 'legal officer' — both punish surface matching."
  },

  // === Patrol / Security Operations (3 questions) ===
  {
    topic: "Patrol procedures — vehicle checkpoint",
    passage: "Vehicle checkpoints are established to control access to secure areas and to detect unauthorised movement. All approaching vehicles must be signalled to stop at least fifty meters before the checkpoint. Personnel conduct visual inspection of the vehicle and verify the identity of occupants against authorised personnel lists. Vehicles carrying prohibited items or whose occupants lack proper documentation are directed to a holding area pending further investigation. The checkpoint commander maintains a log recording all vehicles processed and any incidents that occur.",
    question: "What determines whether a vehicle is allowed to proceed through the checkpoint?",
    options: [
      "Whether it stops within fifty meters of the checkpoint position.",
      "Whether the occupants appear on approved lists and the vehicle contains no forbidden materials.",
      "Whether the checkpoint commander has recorded the vehicle in the log.",
      "Whether the vehicle matches the description provided in the daily intelligence brief."
    ],
    answer: 1,
    ex: "Vehicles are held if they carry 'prohibited items' or occupants 'lack proper documentation' — the converse (passing) requires proper documentation (i.e., being on authorized lists) and no prohibited items. Option B captures both conditions. A misreads (50m is the stopping distance, not the decision criterion). C confuses correlation (logging happens for all vehicles) with causation. D is fabricated. Distractors use 'fifty meters', 'log', 'commander' from the passage to punish keyword matching."
  },
  {
    topic: "Patrol operations — route reconnaissance",
    passage: "Before conducting a convoy movement, reconnaissance teams survey the planned route to identify potential hazards. The team records the condition of road surfaces, the location of bridges and narrow sections, and any signs of recent digging or disturbance that might indicate improvised explosive devices. Observable civilian activity along the route is also noted. The reconnaissance report is submitted to the operations officer at least four hours before the convoy departs, allowing time for route adjustments if necessary.",
    question: "Why is the reconnaissance report required four hours in advance?",
    options: [
      "To give the operations officer sufficient time to modify the convoy's path if needed.",
      "To allow reconnaissance teams to conduct a second survey of the route.",
      "To ensure that civilian activity can be monitored continuously until the convoy departs.",
      "To comply with the standard reporting timeline established in operational orders."
    ],
    answer: 0,
    ex: "'Allowing time for route adjustments if necessary' — option A paraphrases 'route adjustments' as 'modify the convoy's path'. B is plausible but unmentioned. C misreads (civilian activity is observed during recon, not continuously monitored). D uses 'operational orders' to sound official but is fabricated. The key inference: advance notice enables adaptation."
  },
  {
    topic: "Security incident — immediate actions",
    passage: "In the event of a security incident such as an attack on a patrol, personnel must immediately take cover and return fire if engaged. The patrol leader reports the incident to headquarters using the standard contact report format, providing grid location, number of attackers, weapons observed, and casualty status. Headquarters dispatches a quick reaction force if the situation requires reinforcement. Once the immediate threat has been neutralized, the patrol secures the site for investigation and prepares a detailed written incident report.",
    question: "When does the patrol leader transmit information to headquarters?",
    options: [
      "After the site has been secured and a detailed written report has been completed.",
      "As soon as the patrol has taken cover following the initial engagement.",
      "Only if headquarters specifically requests a situation update.",
      "Once reinforcements have arrived and assumed control of the site."
    ],
    answer: 1,
    ex: "The patrol leader 'reports the incident to headquarters' immediately after 'personnel must immediately take cover and return fire' — the reporting happens in the initial phase. Option B captures 'as soon as... following the initial engagement'. A reverses the sequence (written report comes later). C and D contradict the immediate reporting requirement. The distractor A is tempting because 'detailed written report' appears later in the passage."
  },

  // === Logistics / Supply (2 questions) ===
  {
    topic: "Supply request procedures",
    passage: "Units requiring additional supplies must submit requests through the logistics system at least seventy-two hours before the material is needed. Requests must specify the item nomenclature, quantity, and justification for the requirement. Emergency requests for critical items can be expedited through the duty officer, but these require approval from the battalion commander. Routine requests are processed in order of submission, while priority is given to operational units engaged in active missions.",
    question: "What distinguishes emergency supply requests from routine ones?",
    options: [
      "Emergency requests must be submitted more than seventy-two hours in advance.",
      "Emergency requests require higher-level approval and can bypass standard processing time.",
      "Emergency requests are limited to items that are classified as critical by the logistics officer.",
      "Emergency requests can only be made by operational units engaged in active missions."
    ],
    answer: 1,
    ex: "Emergency requests 'can be expedited through the duty officer, but these require approval from the battalion commander' — option B paraphrases 'expedited' as 'bypass standard processing time' and names the higher approval (battalion commander). A reverses the timing (emergency requests are for urgent needs, not advance planning). C misreads (critical items can be expedited, but the passage doesn't say only the logistics officer classifies them). D misreads priority (operational units get priority for routine requests, but emergency requests are a separate category open to any unit with justification)."
  },
  {
    topic: "Equipment maintenance — reporting failures",
    passage: "All equipment failures must be reported immediately to the unit maintenance officer. Personnel complete a fault report form describing the nature of the malfunction, when it was discovered, and any relevant operational circumstances. Critical equipment failures that affect mission capability are classified as priority repairs. Non-critical failures are addressed during scheduled maintenance periods. Equipment that cannot be repaired at unit level is evacuated to the base workshop for specialist attention.",
    question: "How is repair urgency determined for malfunctioning equipment?",
    options: [
      "By whether the failure occurred during an operational task or a training activity.",
      "By assessing whether the malfunction compromises the unit's ability to perform its mission.",
      "By the elapsed time since the equipment was last inspected by maintenance personnel.",
      "By consulting the manufacturer's technical manual for guidance on fault severity."
    ],
    answer: 1,
    ex: "'Critical equipment failures that affect mission capability are classified as priority repairs' — option B paraphrases 'affect mission capability' as 'compromises the unit's ability to perform its mission'. A, C, D are plausible factors but not mentioned in the passage as the determining criterion. Distractor A uses 'operational' from the passage to tempt surface readers."
  },

  // === Medical / MEDEVAC (2 questions) ===
  {
    topic: "Casualty evacuation priority",
    passage: "Medical evacuation priorities are assigned based on the severity of injuries and the likelihood of survival with timely treatment. Priority One casualties have life-threatening injuries requiring immediate evacuation. Priority Two casualties have serious injuries that require evacuation within four hours. Priority Three casualties have minor injuries that can be treated at the unit level or evacuated when transport is available. The senior medical officer at the scene determines the priority category for each casualty.",
    question: "What principle guides the classification of casualties into priority categories?",
    options: [
      "The total number of casualties that can be accommodated on available evacuation aircraft.",
      "The degree to which injuries threaten life and the urgency of obtaining medical intervention.",
      "The rank and position of the injured individual within the unit's chain of command.",
      "The distance from the casualty's location to the nearest medical treatment facility."
    ],
    answer: 1,
    ex: "'Based on the severity of injuries and the likelihood of survival with timely treatment' — option B paraphrases this as 'degree to which injuries threaten life' (severity) and 'urgency of obtaining medical intervention' (timely treatment). A focuses on transport logistics, not medical need. C is ethically implausible and unmentioned. D is a practical factor but not stated as the classification principle. Level 2 inference: recognizing the organizing principle behind a categorization scheme."
  },
  {
    topic: "First aid procedures — trauma management",
    passage: "When providing first aid to trauma casualties, personnel must first ensure the scene is safe before approaching the injured person. The initial assessment follows the ABC protocol: Airway, Breathing, Circulation. If the casualty is not breathing, personnel begin rescue breathing immediately. Severe bleeding must be controlled using direct pressure or tourniquets if pressure alone is insufficient. All first aid actions taken are documented on the casualty's field medical card, which accompanies the casualty during evacuation.",
    question: "What must occur before personnel begin treating an injured person?",
    options: [
      "The casualty's field medical card must be prepared and attached to the patient.",
      "Personnel must verify that approaching the casualty does not place them at risk.",
      "The ABC assessment protocol must be reviewed to ensure proper sequencing.",
      "Communication must be established with medical evacuation coordination.",
    ],
    answer: 1,
    ex: "'Personnel must first ensure the scene is safe before approaching the injured person' — option B paraphrases 'ensure the scene is safe' as 'verify that approaching does not place them at risk'. A reverses sequence (card is completed after treatment). C misreads (ABC is the assessment method, not something reviewed beforehand). D is not required before initial first aid. The key word is 'first' in the passage — it establishes temporal priority."
  },

  // === Intelligence / Reconnaissance (2 questions) ===
  {
    topic: "Intelligence reporting — information requirements",
    passage: "Intelligence reports submitted to headquarters must address the priority information requirements established by the commander. These requirements typically include enemy activity, terrain conditions, and civilian population movements. Reports must distinguish between information directly observed by the reporting unit and information obtained from secondary sources such as local informants. All reports include the time and location of the observation and an assessment of the information's reliability. Unconfirmed information should be clearly marked as such.",
    question: "Why must intelligence reports differentiate between observed and second-hand information?",
    options: [
      "Because the commander only accepts reports based on direct observation by military personnel.",
      "Because information from local sources is generally considered unreliable by headquarters.",
      "To enable analysts to evaluate the credibility of the information according to its source.",
      "To ensure that reports address all of the priority information requirements."
    ],
    answer: 2,
    ex: "The passage states reports must 'include... an assessment of the information's reliability' and 'distinguish between information directly observed' vs. 'obtained from secondary sources' — the purpose is enabling reliability assessment. Option C captures this as 'evaluate the credibility according to its source'. A and B overstate (the passage doesn't reject secondary sources, it requires labeling them). D confuses two separate requirements. Level 2 inference: understanding the purpose behind a procedure."
  },
  {
    topic: "Reconnaissance mission — reporting procedures",
    passage: "Reconnaissance teams tasked with surveying an area must submit an initial report upon reaching the observation position. This report confirms arrival and provides a preliminary assessment of visibility and terrain. During the observation period, teams report significant activities immediately using the radio. At the conclusion of the mission, a comprehensive written report is prepared covering all observations, including negative findings such as the absence of expected enemy activity. The written report is submitted within two hours of returning to base.",
    question: "What is the purpose of reporting negative findings in the final report?",
    options: [
      "To demonstrate that the reconnaissance team conducted a thorough observation.",
      "To inform commanders that anticipated threats did not materialize during the mission.",
      "To justify the decision to return to base at the conclusion of the observation period.",
      "To fulfill the requirement for a comprehensive written report within two hours."
    ],
    answer: 1,
    ex: "Negative findings include 'the absence of expected enemy activity' — this informs decision-makers that something anticipated didn't occur. Option B captures this as 'anticipated threats did not materialize'. A is plausible but not the stated purpose. C is fabricated (the timing is determined by mission plan, not by negative findings). D confuses a content requirement with a timing requirement. The key inference: negative intelligence (what didn't happen) is still valuable intelligence."
  },

  // === Civil-Military Cooperation (2 questions) ===
  {
    topic: "Civil-military liaison — local coordination",
    passage: "The civil-military cooperation team maintains regular contact with local government officials and community leaders. These meetings serve to identify civilian needs that military assets can help address, such as repairing infrastructure or providing medical support. The team also gathers information about local concerns regarding military operations. All assistance provided must be coordinated with humanitarian organizations operating in the area to avoid duplication of effort. The team's weekly report summarizes meetings held, assistance delivered, and issues raised by the civilian population.",
    question: "Why is coordination with humanitarian organizations necessary?",
    options: [
      "To ensure that military assistance complements rather than replicates ongoing relief efforts.",
      "To obtain authorization from humanitarian agencies before providing any civilian aid.",
      "To share information about local security threats identified during liaison meetings.",
      "To fulfill the requirement for weekly reporting on civil-military activities."
    ],
    answer: 0,
    ex: "'Coordinated with humanitarian organizations... to avoid duplication of effort' — option A paraphrases 'avoid duplication' as 'complements rather than replicates'. B overstates (the text says coordinate, not obtain authorization). C is plausible but not mentioned. D confuses two separate requirements. Level 2 question type: identifying the purpose behind a coordination requirement."
  },
  {
    topic: "Community engagement — damage compensation",
    passage: "When military operations result in damage to civilian property, the affected individuals may submit compensation claims to the civil affairs office. Claims must be filed within thirty days of the incident and must include evidence such as photographs or witness statements. The claims officer investigates each case to verify the damage and determine whether it resulted from military activity. Approved claims are paid from the operational budget. Claims resulting from combat operations are generally not eligible for compensation under the current policy.",
    question: "What determines whether a compensation claim will be approved?",
    options: [
      "Whether the claim was submitted within the thirty-day deadline.",
      "Whether photographic evidence or witness statements were provided with the claim.",
      "Whether investigation confirms the damage occurred and was caused by military actions.",
      "Whether the incident occurred during peacetime operations rather than combat."
    ],
    answer: 2,
    ex: "The claims officer 'investigates each case to verify the damage and determine whether it resulted from military activity' — both conditions must be met. Option C captures both: 'confirms the damage occurred' (verification) and 'caused by military actions' (attribution). A and B are procedural requirements for filing but don't determine approval. D partially captures the exclusion for combat but misses the verification step. Surface readers may choose A because '30 days' is prominent in the passage."
  },

  // === Joint/Multinational Operations (2 questions) ===
  {
    topic: "Joint operations — force integration",
    passage: "The multinational task force includes units from four contributing nations. Each national contingent operates under its own command structure but coordinates activities through the joint operations center. National commanders retain authority over their forces for administrative matters and must approve any operational orders that place their troops at significant risk. The force commander issues daily tasking orders specifying missions for each unit. Liaison officers from each nation are co-located at the operations center to facilitate coordination.",
    question: "What aspect of force employment remains under national rather than joint control?",
    options: [
      "The assignment of daily missions to units within each national contingent.",
      "Decisions regarding activities that could expose troops to substantial danger.",
      "The coordination of operations through the central command facility.",
      "The placement of liaison officers to ensure effective communication."
    ],
    answer: 1,
    ex: "'National commanders retain authority over their forces for administrative matters and must approve any operational orders that place their troops at significant risk' — option B paraphrases 'significant risk' as 'substantial danger' and 'must approve' as 'decisions regarding'. A is wrong (force commander issues daily tasking). C and D are joint functions. This tests understanding of 'national caveats' — a core L2 concept."
  },
  {
    topic: "Combined training exercise — interoperability",
    passage: "The annual combined exercise brings together forces from six alliance nations to practice interoperability in a simulated operational environment. Participating units conduct joint planning, share intelligence, and execute coordinated maneuvers. The exercise includes a communications test to verify that different national radio systems can exchange information effectively. After-action reviews identify areas where procedures need improvement. The lessons learned are compiled in a final report distributed to all participating nations to inform future training.",
    question: "What is the primary purpose of the communications test during the exercise?",
    options: [
      "To determine which nation possesses the most advanced radio technology.",
      "To confirm that equipment from different countries can successfully transmit data between systems.",
      "To identify units that require additional training in radio operating procedures.",
      "To compile information for inclusion in the exercise's after-action review."
    ],
    answer: 1,
    ex: "'Communications test to verify that different national radio systems can exchange information effectively' — option B paraphrases 'exchange information effectively' as 'successfully transmit data between systems'. A misreads (the test is about compatibility, not superiority). C is plausible but not stated. D confuses purpose with outcome (findings may go into the AAR, but that's not the test's purpose). The concept being tested: interoperability assessment."
  },

  // === Communications (2 questions) ===
  {
    topic: "Radio procedures — report format",
    passage: "Situation reports transmitted by radio must follow the standard format to ensure clarity and completeness. The report begins with the call sign of the reporting unit, followed by current location expressed as a grid reference. The report then states the unit's current activity and any significant observations such as enemy contact or terrain obstacles. Reports conclude with an estimate of when the next scheduled report will be transmitted. Brevity is essential to minimize transmission time and reduce the risk of interception.",
    question: "Why are radio transmissions kept as brief as possible?",
    options: [
      "To ensure that all required information can be transmitted within the allocated time slot.",
      "To conform to the standard reporting format established in communications procedures.",
      "To reduce the duration during which the transmission might be detected by adversaries.",
      "To allow other units to use the radio frequency for their own situation reports."
    ],
    answer: 2,
    ex: "'Brevity is essential to minimize transmission time and reduce the risk of interception' — option C paraphrases 'reduce the risk of interception' as 'reduce the duration during which... might be detected'. A, B, D are plausible operational reasons but not stated in the passage. Surface readers may choose B because 'standard format' is prominent."
  },
  {
    topic: "Communication security — authentication",
    passage: "Before acting on orders received by radio, personnel must verify the authenticity of the transmission using the current authentication codes. These codes are changed daily and distributed through secure channels. If a message cannot be authenticated, personnel must not comply with the orders and must report the incident to their immediate superior. Failure to authenticate could allow an adversary to issue false orders. Authentication procedures apply to all operational communications, not just those containing classified information.",
    question: "Under what circumstances do authentication procedures apply?",
    options: [
      "Only when the orders received involve the movement of classified materials.",
      "Whenever operational communications are transmitted, regardless of classification level.",
      "Only when personnel suspect that the transmission may have originated from hostile sources.",
      "Whenever the daily authentication codes have been updated through secure channels."
    ],
    answer: 1,
    ex: "'Authentication procedures apply to all operational communications, not just those containing classified information' — option B paraphrases this exactly ('regardless of classification level'). A contradicts 'not just classified'. C is wrong (authentication is required always, not just when suspicion exists). D confuses the update schedule with the applicability scope. The final sentence is the key claim being tested."
  },

  // === Training Exercises (2 questions) ===
  {
    topic: "Training exercise — safety supervision",
    passage: "Live-fire training exercises require the presence of qualified safety officers throughout the activity. Safety officers monitor the firing line to ensure personnel follow weapon handling procedures and that all rounds impact within designated safe areas. If a safety violation is observed, the safety officer has authority to halt the exercise immediately. Before the exercise begins, all participants attend a safety briefing covering range procedures, emergency signals, and the location of medical support. No one may participate in live fire without attending the briefing.",
    question: "What authority do safety officers possess during live-fire training?",
    options: [
      "They may conduct the safety briefing in place of the exercise commander.",
      "They may immediately stop the exercise if unsafe practices are observed.",
      "They may modify the location of designated safe impact areas during the exercise.",
      "They may determine which personnel are qualified to participate in live fire."
    ],
    answer: 1,
    ex: "'Safety officer has authority to halt the exercise immediately' if violations occur — option B captures this. A is unmentioned (safety officers monitor, but we don't know who conducts briefings). C is implausible and unmentioned (impact areas are pre-designated). D is wrong (qualification isn't mentioned; attendance at the briefing is the stated requirement). Surface readers may confuse the safety officer's monitoring role with other authorities."
  },
  {
    topic: "Training exercise — performance evaluation",
    passage: "At the conclusion of each training exercise, unit leaders conduct an after-action review with all participants. The review examines what was planned, what actually occurred, and why any differences arose. Participants are encouraged to identify both successful actions and mistakes made during the exercise. The purpose is to facilitate learning rather than to assign blame. Key lessons are documented and incorporated into training plans for future exercises. Units that consistently demonstrate proficiency in specific tasks may be assigned more complex training scenarios.",
    question: "What is the intended outcome of the after-action review?",
    options: [
      "To determine which individuals are responsible for mistakes made during the exercise.",
      "To enhance learning by analyzing both achievements and errors that occurred.",
      "To identify units that require remedial training before the next exercise.",
      "To assign more challenging tasks to participants who performed exceptionally well."
    ],
    answer: 1,
    ex: "'The purpose is to facilitate learning rather than to assign blame' — option B paraphrases 'facilitate learning' and 'both successful actions and mistakes'. A directly contradicts 'rather than to assign blame'. C is plausible but overstates (documentation is mentioned for future training, not specifically for remediation). D confuses unit-level progression with individual-level feedback. Level 2 inference: distinguishing stated purpose from potential side effects."
  },
  ],
  
  3: [
{
    topic: "Collective defence — Article 5",
    passage: "Article 5 of the North Atlantic Treaty constitutes the cornerstone of NATO's collective defence framework. It stipulates that an armed attack against one or more member nations shall be considered an attack against the alliance as a whole. Member states are obligated to take such action as they deem necessary, including the use of armed force, to restore and maintain the security of the North Atlantic area. The article has been invoked only once in the alliance's history, following the terrorist attacks of 11 September 2001 in the United States. The decision was unanimous among the then nineteen members. The practical response included the deployment of airborne early warning aircraft to patrol American airspace and the launch of maritime counter-terrorism operations in the Mediterranean. The episode demonstrated that the mutual defence commitment was not merely declaratory.",
    question: "What does the text imply about NATO's response after September 11?",
    options: [
      "It marked the first occasion on which the alliance translated its founding pledge into operational measures.",
      "It led to a permanent restructuring of the North Atlantic Treaty's defence provisions.",
      "It revealed deep divisions among the nineteen members regarding the use of force.",
      "It was limited to symbolic gestures rather than concrete military activity."
    ],
    answer: 0,
    ex: "The final sentence — 'demonstrated that the mutual defence commitment was not merely declaratory' — implies that prior to this, the commitment had never been operationalised. Distractor B over-generalises (no restructuring is mentioned). C contradicts 'unanimous'. D contradicts the deployment of aircraft and maritime operations. Note: no option uses the word 'invoke' or '9/11' from the passage — surface matching fails."
  },
  {
    topic: "Air superiority doctrine",
    passage: "Air superiority is the degree of dominance in air battle by one force that permits the conduct of its operations at a given time and place without prohibitive interference by the opposing force. Achieving and maintaining it is a fundamental prerequisite for the success of joint military operations. Modern campaigns to establish such dominance involve a combination of the suppression of enemy air defences, counter-air operations, and electronic warfare. The Italian Air Force has accumulated significant expertise through participation in alliance missions, notably its rotational deployments to the Baltic region, where allied air forces patrol the airspace of states that lack their own combat aviation capability. This standing mission has continued uninterrupted since 2004 and is among the alliance's most visible peacetime commitments.",
    question: "Which statement best captures the strategic logic of the Baltic deployment described?",
    options: [
      "It substitutes for capabilities that certain member states do not themselves possess.",
      "It serves primarily as a training opportunity for Italian pilots.",
      "It represents a temporary measure pending the development of Baltic national air forces.",
      "It is intended as a deterrent against hostile electronic warfare activities."
    ],
    answer: 0,
    ex: "The text states the deployment patrols airspace of states 'that lack their own combat aviation capability' — option A paraphrases this as substituting for missing capabilities. B is plausible but unmentioned. C is contradicted by 'continued uninterrupted since 2004' (permanent, not pending). D conflates two separate paragraph topics (electronic warfare was mentioned regarding campaigns, not the Baltic mission)."
  },
  {
    topic: "Cyber operations and hybrid threats",
    passage: "Modern hybrid warfare combines conventional military operations with cyber attacks, disinformation campaigns, and economic pressure. The alliance has formally recognised cyber space as an operational domain alongside land, sea, air, and space. A significant intrusion can trigger consultations under Article 4 of the North Atlantic Treaty, and, in severe cases, may be deemed equivalent to an armed attack, potentially invoking Article 5. The principal difficulty in such cases is establishing responsibility, a process that is often protracted and inconclusive. Without firm identification of the perpetrator, the alliance struggles to determine proportionate responses. This obstacle is compounded by the fact that adversaries deliberately employ techniques designed to maintain ambiguity regarding the true source of an operation.",
    question: "According to the text, what fundamentally limits the alliance's capacity to respond to cyber operations?",
    options: [
      "The absence of legal frameworks treating cyber attacks as armed attacks.",
      "Difficulties in conclusively identifying who carried out an operation.",
      "The reluctance of member states to invoke Article 4 consultations.",
      "Insufficient technical expertise within NATO cyber defence units."
    ],
    answer: 1,
    ex: "'The principal difficulty... is establishing responsibility' — option B paraphrases 'establishing responsibility' as 'conclusively identifying who carried out'. The passage explicitly says Article 5 CAN be invoked, so A is wrong. C and D are not in the text — they are plausible-sounding fabrications. Surface matching would fail because the answer doesn't reuse 'attribution', 'attribute', or 'perpetrator'."
  },
  {
    topic: "Evolving peacekeeping mandates",
    passage: "United Nations Security Council Resolution 1674, adopted in 2006, reaffirmed the international community's responsibility to protect civilians in armed conflict. Under this framework, peacekeeping forces are not merely observers but are mandated to take active measures to prevent violations of international humanitarian law. This represents a significant departure from the traditional peacekeeping model, in which forces were expected to maintain neutrality and use force only in strict self-defence. The new approach has proved controversial. Critics argue that the expanded mandate blurs the distinction between peacekeeping and peace enforcement, potentially compromising the perceived impartiality of UN operations. Supporters counter that the moral imperative to protect civilians overrides concerns about traditional doctrine.",
    question: "What is the central concern raised by those who oppose the post-2006 framework?",
    options: [
      "That UN forces lack the equipment necessary for active enforcement.",
      "That actively intervening may undermine the appearance of being a neutral party.",
      "That the legal authority underlying Resolution 1674 is questionable.",
      "That moral imperatives should not take precedence over operational doctrine."
    ],
    answer: 1,
    ex: "Critics argue the new mandate 'compromises the perceived impartiality' — option B paraphrases 'perceived impartiality' as 'appearance of being a neutral party'. A and C are unmentioned. D inverts the supporter/critic positions (the supporters argue moral imperative wins; the critics don't argue against this on doctrinal grounds — they argue from a perception standpoint). Note that no option uses 'impartiality', 'peace enforcement', or 'controversial' from the passage."
  },
  {
    topic: "Environmental considerations in operations",
    passage: "Contemporary military doctrine increasingly acknowledges the ecological consequences of operations. Fuel consumption, waste management, and the use of hazardous materials present both operational challenges and legal obligations under international environmental agreements. NATO's Environmental Protection Best Practices aim to minimise the ecological footprint of alliance activities without compromising operational effectiveness. Member nations are encouraged to adopt green technologies, including renewable energy sources at forward operating bases. Solar installations have proven particularly effective in remote locations where fuel resupply is costly and dangerous. These initiatives reduce both ecological harm and a critical operational vulnerability, since fuel convoys have historically been a frequent target of hostile attack.",
    question: "What is the principal reason given for installing solar power at forward bases?",
    options: [
      "Compliance with international environmental agreements requires alternative energy sources.",
      "Diesel generators have become prohibitively expensive in current operations.",
      "Reducing dependence on fuel convoys serves both ecological and security purposes.",
      "Solar technology has reached parity in reliability with conventional generation."
    ],
    answer: 2,
    ex: "The closing sentence makes the dual rationale explicit: 'reduce both ecological harm and a critical operational vulnerability'. C captures this. A is wrong because compliance is not stated as the driver. B is unmentioned. D is not in the text. Surface matching fails: no option uses 'renewable', 'green', 'solar', or 'footprint'."
  },
  {
    topic: "Multinational command",
    passage: "Effective command in multinational operations is complicated by disparities in doctrine, interoperability limitations, national caveats, and divergent risk tolerances among contributing nations. The principle of unity of command, while theoretically optimal, is frequently subordinated to political considerations that produce compromise command arrangements. National caveats — restrictions placed by individual nations on how their forces may be employed — can significantly limit operational flexibility. Research into recent NATO-led operations suggests that mission success correlates more strongly with the quality of liaison mechanisms and shared situational awareness than with formal command hierarchy per se. This finding has prompted renewed emphasis on the development of common operational pictures and real-time information sharing at the operational and tactical levels.",
    question: "What does the cited research finding imply about operational priorities?",
    options: [
      "Formal hierarchy is irrelevant in modern multinational operations.",
      "Investment in information exchange may yield greater returns than reorganising command structures.",
      "National caveats should be eliminated entirely to achieve unity of command.",
      "Traditional command theory has been fully discredited by recent experience."
    ],
    answer: 1,
    ex: "The finding is that liaison and shared awareness correlate more strongly than formal hierarchy — implying resources should flow to the former. Option B paraphrases this as 'information exchange may yield greater returns than reorganising command'. A overstates (the text says 'more strongly than', not 'instead of'). C is unrelated to the finding. D overstates ('renewed emphasis' ≠ 'fully discredited'). The trap is option A: surface readers may conflate 'correlates more strongly than' with 'is irrelevant'."
  },
  {
    topic: "Strategic communications",
    passage: "Information operations have become a critical dimension of modern conflict. State and non-state actors increasingly employ disinformation campaigns to undermine adversary decision-making, erode public trust, and create confusion in target populations. Social media platforms have amplified the reach and speed of these campaigns. The alliance has established specialised centres to monitor and counter hostile information activities. Effective response requires not only technical capabilities to detect and identify the origin of disinformation, but also the development of resilient information ecosystems within member societies. Public education in media literacy is increasingly recognised as a strategic security priority.",
    question: "What broader argument does the passage advance about countering disinformation?",
    options: [
      "Technical detection capabilities alone are insufficient; societal resilience matters equally.",
      "Social media platforms must be regulated to prevent disinformation spread.",
      "Specialised centres should be expanded across all member states.",
      "Decision-making processes must be insulated from public opinion to prevent manipulation."
    ],
    answer: 0,
    ex: "The text argues effective response requires 'not only technical capabilities... but also the development of resilient information ecosystems' — option A captures both pillars. B is not advocated in the text. C is over-extrapolation. D inverts the logic (the public is to be educated, not insulated). The key skill: recognising 'not only X but also Y' as identifying paired requirements."
  },
  {
    topic: "Special operations forces",
    passage: "Special operations forces are characterised by their selection criteria, training intensity, and operational autonomy. They are typically employed in roles unsuitable for conventional forces, including direct action against high-value targets, special reconnaissance, military assistance to partner forces, and counter-terrorism. Their value derives from the ability to achieve strategic effects with limited footprints. However, the same autonomy that makes them effective creates challenges for oversight and integration with broader operational plans. Recent doctrine emphasises the need for clear boundaries between special operations and conventional military activities, while preserving the flexibility that makes such forces uniquely effective. The balance is delicate and remains the subject of ongoing debate within alliance forums.",
    question: "Which statement best characterises the central tension described in the passage?",
    options: [
      "Selection criteria for special forces are too restrictive to meet operational demand.",
      "The very qualities that produce operational effectiveness simultaneously generate institutional difficulties.",
      "Conventional forces and special forces increasingly compete for the same missions.",
      "Counter-terrorism operations have eclipsed traditional special operations roles."
    ],
    answer: 1,
    ex: "'The same autonomy that makes them effective creates challenges' — option B captures this paradoxical relationship in different words. A, C, and D are unmentioned plausibilities. The skill tested here: recognising 'X is both the strength and the source of difficulty' as a thematic structure, without keyword cues."
  },
  {
    topic: "Maritime security",
    passage: "Maritime security operations encompass a range of activities aimed at preserving freedom of navigation and protecting commercial shipping from threats including piracy, smuggling, and terrorism. The alliance's Operation Sea Guardian in the Mediterranean exemplifies this approach. The operation conducts maritime situational awareness, supports counter-terrorism activities, and contributes to capacity-building for partner navies. Coordination with European Union missions and other international actors is essential, given the multiplicity of authorities operating in shared waters. The maritime domain presents distinctive challenges: vast areas to be monitored, the international legal regime governing the seas, and the variety of actors operating in maritime space. Effective operations therefore depend not merely on naval assets but on sustained legal frameworks and inter-organisational arrangements.",
    question: "What does the passage suggest about the conduct of maritime security?",
    options: [
      "Naval force levels are the primary determinant of operational success.",
      "Operations cannot succeed through military assets alone.",
      "Legal frameworks have become obstacles to effective maritime security.",
      "Counter-piracy has displaced counter-terrorism as the principal focus."
    ],
    answer: 1,
    ex: "'Effective operations therefore depend not merely on naval assets but on sustained legal frameworks and inter-organisational arrangements' — option B paraphrases this. A is contradicted ('not merely on naval assets'). C inverts the relationship (legal frameworks are described as necessary, not as obstacles). D is unmentioned. Surface matching fails: the answer doesn't reuse 'legal', 'naval', or 'inter-organisational'."
  },
  {
    topic: "Stabilisation operations",
    passage: "Stabilisation operations seek to create the conditions for sustainable peace following conflict. They typically combine security activities with political, economic, and developmental components. Experience from operations in the Balkans, Iraq, and Afghanistan has demonstrated that purely military approaches are insufficient to address the underlying causes of instability. The concept of comprehensive approach emerged from these experiences, emphasising integrated civilian-military action under unified strategic direction. However, implementing this approach in practice has proved challenging. Civilian agencies and military forces operate under different cultures, timelines, and authorities. Genuine integration requires not only structural arrangements but also shared understanding of the operational environment and the desired end state.",
    question: "What lesson does the passage draw from operations in the Balkans, Iraq, and Afghanistan?",
    options: [
      "Military operations should be conducted independently of civilian agencies.",
      "Stabilisation requires action across domains beyond the purely military.",
      "Civilian agencies should adopt military timelines and authority structures.",
      "Unified strategic direction has been successfully achieved in recent operations."
    ],
    answer: 1,
    ex: "The text states 'purely military approaches are insufficient' and stabilisation requires 'security, political, economic, and developmental components'. Option B paraphrases this as 'across domains beyond the purely military'. A reverses the lesson. C reverses who adapts to whom. D contradicts 'has proved challenging'. No option reuses 'comprehensive' or 'integration'."
  },
  {
    topic: "Ballistic missile defence",
    passage: "The alliance's ballistic missile defence capability is designed to protect alliance territory and populations against missile threats from outside the Euro-Atlantic area. The system integrates contributions from multiple member nations, including radar installations, interceptor missiles, and command and control elements. The capability has been declared operational and continues to be enhanced through ongoing investment. Russia has consistently characterised the system as a strategic threat, despite alliance assurances that it is not directed against Russian forces and lacks the technical capability to intercept Russian intercontinental missiles. This dispute has contributed to the deterioration of relations between the alliance and Russia, with implications extending beyond missile defence into broader questions of strategic stability in Europe.",
    question: "How does the passage characterise the disagreement over missile defence?",
    options: [
      "It reflects a genuine technical disagreement about the system's capabilities.",
      "It serves as a symptom and accelerant of wider strategic friction rather than an isolated dispute.",
      "It has been substantially resolved through alliance assurances to Russia.",
      "It centres on disputes over the geographical placement of radar installations."
    ],
    answer: 1,
    ex: "'Implications extending beyond missile defence into broader questions of strategic stability' — option B captures this as 'symptom and accelerant of wider strategic friction'. A is wrong because the text says assurances were given (suggesting the technical dispute is not genuine). C contradicts 'deterioration'. D is unmentioned. The skill: recognising that a specific dispute can be a proxy for broader tensions."
  },
  {
    topic: "Capability development",
    passage: "The alliance's capability development priorities reflect the evolving security environment. Recent emphasis has focused on areas including cyber defence, space situational awareness, artificial intelligence, and resilience against hybrid threats. These priorities recognise that future conflicts are likely to involve simultaneous challenges across multiple domains, including those previously considered peripheral to traditional military operations. Investment decisions are guided by the alliance defence planning process, which seeks to ensure that the necessary capabilities exist to fulfil the core tasks of collective defence, crisis management, and cooperative security. National contributions to these capabilities are coordinated through agreed targets, although implementation has been uneven across member states.",
    question: "What does the passage suggest about future conflict?",
    options: [
      "It will be confined to traditional military domains.",
      "It is expected to unfold concurrently in arenas once regarded as marginal.",
      "It will primarily involve cyber and space rather than land or sea.",
      "It can be addressed through the existing defence planning process without modification."
    ],
    answer: 1,
    ex: "'Simultaneous challenges across multiple domains, including those previously considered peripheral' — option B paraphrases 'previously considered peripheral' as 'once regarded as marginal'. A directly contradicts the text. C overstates: the new domains supplement rather than replace traditional ones. D is contradicted by 'uneven implementation'. Surface matching fails: no use of 'peripheral', 'cyber', 'space'."
  },
  {
    topic: "Counter-terrorism cooperation",
    passage: "Counter-terrorism cooperation within the alliance has evolved significantly since the 2001 attacks on the United States. The alliance's role complements that of national authorities and other international bodies, focusing primarily on intelligence sharing, capability development, and partnership with countries facing terrorist threats. The alliance maintains a counter-terrorism action plan and conducts regular exercises to test collective responses. However, primary responsibility for counter-terrorism remains with national governments, reflecting both legal frameworks and the predominantly domestic nature of many terrorist threats. The challenge of balancing security imperatives with civil liberties has been particularly acute in democratic societies, where intrusive surveillance powers face legal and political constraints absent in authoritarian regimes.",
    question: "What can be inferred about why the alliance plays a supporting rather than leading role in counter-terrorism?",
    options: [
      "The alliance lacks the technical capability to lead counter-terrorism efforts.",
      "Many terrorist threats arise from and operate within domestic jurisdictions where national law applies.",
      "Member states have refused to share intelligence at the alliance level.",
      "Counter-terrorism is not formally a core task of the alliance."
    ],
    answer: 1,
    ex: "The text states primary responsibility remains national 'reflecting both legal frameworks and the predominantly domestic nature of many terrorist threats'. Option B reformulates this as 'domestic jurisdictions where national law applies'. A is not stated. C contradicts 'intelligence sharing'. D is not in the text. The reader must connect 'domestic nature' + 'legal frameworks' to infer jurisdictional logic."
  },
  {
    topic: "Defence industrial cooperation",
    passage: "Defence industrial cooperation among alliance members has long been promoted as a means to enhance interoperability, reduce costs, and strengthen the technological base. Joint procurement programmes for major equipment have produced both successes and difficulties. Successful programmes have delivered advanced capabilities at affordable cost while building lasting industrial partnerships. Less successful efforts have been hampered by divergent national requirements, industrial protectionism, and political pressures to maintain domestic manufacturing capacity. Recent initiatives have sought to address these obstacles through more flexible cooperation frameworks. Whether these will produce sustained improvements remains uncertain, although the imperative of maximising defence resources amid competing demands provides strong motivation for continued effort.",
    question: "What does the passage imply about the prospects for future industrial cooperation?",
    options: [
      "Cooperation will inevitably succeed given the urgency of resource constraints.",
      "Past failures suggest cooperation efforts should be abandoned.",
      "Outcomes are not assured, but pressures favour continued attempts.",
      "Industrial protectionism has been definitively overcome through recent reforms."
    ],
    answer: 2,
    ex: "'Whether these will produce sustained improvements remains uncertain, although the imperative... provides strong motivation' — option C captures the dual claim: uncertain outcome but strong driver. A overstates ('inevitably'). B is contradicted by 'continued effort'. D contradicts 'remains uncertain'. The reader must hold a balanced inference of uncertainty + motivation."
  },
  {
    topic: "Partnership programmes",
    passage: "The alliance maintains formal partnership relationships with countries beyond its membership, ranging from comprehensive frameworks to more limited arrangements with individual nations. These relationships serve multiple purposes, including enhancing security cooperation, building interoperability with potential coalition contributors, and projecting stability beyond the immediate Euro-Atlantic area. Partner nations have made significant contributions to alliance operations in places such as Afghanistan and Kosovo. The political dimensions of partnerships have, however, become increasingly complex as the geopolitical environment has shifted. Some partnerships face pressure from competing strategic relationships, while others have evolved towards closer integration, including potential pathways to membership.",
    question: "What does the passage suggest has changed about partnerships?",
    options: [
      "Their original purposes have been replaced by new ones.",
      "They are now governed by simpler political dynamics than in the past.",
      "The geopolitical context surrounding them has become more demanding.",
      "Partner nations have ceased to contribute to alliance operations."
    ],
    answer: 2,
    ex: "'The political dimensions of partnerships have... become increasingly complex as the geopolitical environment has shifted' — option C paraphrases this as 'geopolitical context... more demanding'. A misreads — purposes are unchanged. B reverses the direction of change. D contradicts the past tense statement about contributions. Surface matching fails: no use of 'complex', 'political', 'geopolitical'."
  },,
{
    topic: "NATO operations — lessons learned process",
    passage: "The alliance's lessons learned process seeks to identify, analyze, and disseminate insights from operational experience to improve future performance. Following each major operation, specialist teams conduct systematic reviews examining what worked well and what did not. These reviews incorporate perspectives from multiple levels of command and from different national contingents to ensure a comprehensive understanding. However, the process faces inherent challenges. Organizational cultures within military institutions may resist acknowledging shortcomings, particularly when such acknowledgments could reflect poorly on senior leadership. Career incentives can discourage candid assessment of difficulties encountered during operations. Moreover, even when lessons are properly identified, translating them into changes in doctrine, training, or procurement often proves difficult due to institutional inertia and resource constraints. The most valuable lessons, therefore, are those that not only identify problems but also secure institutional commitment to implement solutions.",
    question: "What does the passage suggest is the most significant obstacle to organizational learning?",
    options: [
      "The difficulty of conducting systematic reviews across multiple command levels.",
      "Cultural and incentive structures that discourage honest evaluation of operational failures.",
      "The absence of specialist teams qualified to analyze complex operational experiences.",
      "Resource limitations that prevent the implementation of identified improvements."
    ],
    answer: 1,
    ex: "The passage identifies 'organizational cultures... resist acknowledging shortcomings' and 'career incentives can discourage candid assessment' — these cultural/structural impediments occur before the implementation phase. Option B captures these twin barriers. A is not framed as an obstacle (reviews do incorporate multiple perspectives). C contradicts the text (specialist teams exist). D is real but positioned as one of several downstream challenges, not the primary obstacle. Level 3: distinguishing root causes from symptoms."
  },
  {
    topic: "Strategic partnerships — political dimensions",
    passage: "The alliance's partnerships with non-member states have historically served both security and political functions. From a security perspective, partnerships enhance operational effectiveness by building interoperability with nations that may contribute to coalition operations. Politically, partnerships serve as mechanisms for projecting stability into neighboring regions and for demonstrating the alliance's openness to cooperation beyond its formal membership. However, the political utility of partnerships has become more complex in recent years. Some partner nations face domestic pressure from constituencies that view close association with the alliance as compromising national sovereignty. Other partnerships have been strained by the partner nation's development of alternative security relationships with powers whose interests sometimes diverge from those of the alliance. These tensions highlight the distinction between formal partnership frameworks and the actual depth of cooperation that can be sustained given evolving political circumstances.",
    question: "What complication in partnership relationships does the passage identify?",
    options: [
      "Partners increasingly lack the military capabilities needed for meaningful operational contribution.",
      "The formal structure of partnerships has become too rigid to accommodate political change.",
      "Political pressures within and beyond partner states can limit the extent of practical cooperation.",
      "The alliance has expanded partnerships too rapidly to maintain quality relationships."
    ],
    answer: 2,
    ex: "The passage describes two sources of strain: domestic pressure in partner nations ('compromising national sovereignty') and alternative security relationships with other powers. Option C captures both: 'political pressures within and beyond'. A is not mentioned (the passage affirms operational effectiveness, not capability gaps). B inverts the logic (the passage notes frameworks don't guarantee actual cooperation depth, but doesn't call them 'too rigid'). D is unmentioned. The distinction to grasp: formal vs. actual cooperation depth."
  },
  {
    topic: "Multinational exercises — training objectives",
    passage: "Large-scale multinational exercises serve multiple training objectives beyond the development of tactical proficiency. They provide opportunities to test command and control procedures across different national forces, identify interoperability challenges in equipment and communications, and practice logistical coordination in a complex operational environment. Perhaps more significantly, such exercises build personal relationships among officers from different nations who may later serve together in actual operations. The informal networks that develop during exercises can prove as valuable as formal coordination mechanisms when unanticipated challenges arise during real-world missions. Critics of large exercises argue that the substantial resources required could be better invested in more frequent, smaller-scale training events focused on specific capabilities. Proponents counter that the complexity inherent in large multinational exercises cannot be replicated in smaller settings, and that exposure to this complexity is itself a critical training objective.",
    question: "What assumption underlies the critics' position on exercise design?",
    options: [
      "That tactical proficiency is more important than relationship-building among officers.",
      "That smaller exercises can deliver equivalent training value with greater resource efficiency.",
      "That formal coordination mechanisms are sufficient without informal professional networks.",
      "That interoperability challenges are less significant than command and control procedures."
    ],
    answer: 1,
    ex: "Critics argue resources 'could be better invested in more frequent, smaller-scale training' — the implicit assumption is smaller exercises yield comparable or superior value per resource unit invested. Option B captures this efficiency logic. A is not the critics' claim (they may value relationships but prioritize frequency). C misreads (critics don't address informal networks; proponents do). D is unrelated to the critics' argument. Level 3 skill: inferring unstated assumptions from stated positions."
  },
  {
    topic: "Technology integration — digital transformation",
    passage: "The integration of advanced digital technologies into military operations promises substantial improvements in situational awareness, decision-making speed, and precision. Artificial intelligence applications can process vast quantities of sensor data far more rapidly than human analysts. Autonomous systems can perform dangerous missions with reduced risk to personnel. However, the adoption of these technologies introduces new vulnerabilities. Adversaries can exploit weaknesses in software or cyber defenses to compromise systems. Over-reliance on automated systems may erode the judgment and intuition that experienced personnel bring to complex operational problems. There is also concern that the pace of technological adoption in some allied nations significantly exceeds that in others, potentially creating disparities in capability that undermine interoperability. Effective integration therefore requires not merely acquiring new technologies but developing appropriate doctrine for their employment and establishing safeguards against their misuse or failure.",
    question: "What does the passage suggest about successful technology adoption in military operations?",
    options: [
      "It depends primarily on maintaining parity in technological capabilities across all allied forces.",
      "It requires complementary developments in employment doctrine and protective measures.",
      "It should be delayed until automated systems can fully replicate human judgment.",
      "It is hindered mainly by adversary capabilities to exploit system vulnerabilities."
    ],
    answer: 1,
    ex: "'Effective integration... requires not merely acquiring new technologies but developing appropriate doctrine for their employment and establishing safeguards' — option B paraphrases 'doctrine' and 'safeguards' as 'employment doctrine and protective measures'. A overstates (disparities are a concern, but parity is not stated as the primary dependency). C contradicts the text (the passage worries about over-reliance but doesn't advocate delay). D identifies one risk among several, not the main hindrance. The skill: identifying multi-dimensional requirements for success."
  },
  {
    topic: "Legal frameworks — operational constraints",
    passage: "International humanitarian law imposes obligations on military forces that can create tension with operational objectives. The principles of distinction and proportionality require forces to differentiate between combatants and civilians and to ensure that incidental civilian harm is not excessive in relation to the concrete military advantage anticipated. In practice, applying these principles demands detailed intelligence about the operational environment, sophisticated targeting procedures, and real-time legal advice during operations. Critics argue that strict adherence to legal norms places forces at a disadvantage when adversaries operate without similar constraints. Supporters of robust legal frameworks counter that compliance enhances the legitimacy of operations, which is itself a strategic asset. Moreover, they argue, abandoning legal constraints would undermine the very values that democratic societies seek to defend. This debate reflects deeper tensions between military effectiveness and ethical commitment.",
    question: "What fundamental disagreement do the two positions described in the passage express?",
    options: [
      "Whether international humanitarian law should apply to military forces of democratic nations.",
      "Whether operational advantage or adherence to values should take precedence when they conflict.",
      "Whether forces possess sufficient intelligence to comply with legal targeting requirements.",
      "Whether adversaries' failure to observe legal norms justifies reciprocal violations."
    ],
    answer: 1,
    ex: "Critics focus on operational disadvantage ('places forces at a disadvantage'); supporters prioritize legitimacy and values ('strategic asset', 'values that democratic societies seek to defend'). The core disagreement is whether effectiveness or ethical commitment should govern when they pull in opposite directions. Option B captures this axis. A and D overstate (no one argues democratic forces should be exempt or should reciprocate violations). C misses the normative disagreement (it's about factual capability). Level 3: identifying the conceptual axis along which two positions diverge."
  },
  {
    topic: "Crisis response — decision-making speed",
    passage: "Consensus-based decision-making within the alliance ensures that all member states have a voice in determining collective action. This inclusive approach protects national sovereignty and builds political legitimacy for alliance operations. However, the requirement for consensus can produce delays during fast-moving crises where rapid response may be essential to prevent escalation or protect threatened populations. Some analysts propose delegating greater authority to senior military commanders or to a subset of member states during emergencies. Others caution that bypassing full consultation, even in urgent circumstances, risks fracturing alliance unity and undermining the political foundation upon which military cooperation depends. Recent proposals have sought middle ground through pre-authorized response options that allow rapid initial action followed by subsequent political ratification. The viability of such arrangements remains untested in actual crisis conditions.",
    question: "What trade-off lies at the heart of the debate over crisis decision procedures?",
    options: [
      "Between military expertise and political judgment in operational planning.",
      "Between the speed of response and the inclusiveness of decision-making.",
      "Between defending threatened populations and preserving alliance resources.",
      "Between pre-authorized options and post-crisis political ratification."
    ],
    answer: 1,
    ex: "Consensus ensures inclusiveness but 'can produce delays during fast-moving crises where rapid response may be essential'. Option B captures the two competing goods: speed vs. inclusiveness. A is not the trade-off (both sides involve political decision-making). C is unmentioned. D misreads (pre-authorization is proposed as a solution, not one pole of the trade-off). Level 3: recognizing structural trade-offs within institutional design."
  },
  {
    topic: "Interoperability — standardization challenges",
    passage: "Achieving interoperability among alliance forces requires compatibility in equipment, procedures, and training. Standardization of equipment simplifies logistics and maintenance while ensuring that systems from different nations can operate together. However, complete standardization is often impractical due to divergent national requirements, existing inventories that would be costly to replace, and domestic industrial considerations. Nations understandably seek to preserve domestic manufacturing capacity for defense equipment, both for economic reasons and to maintain sovereign capability in critical areas. Consequently, the alliance has pursued a policy of pursuing interoperability through agreed standards for interfaces and communication protocols rather than requiring identical equipment across all forces. This approach allows national diversity in equipment choices while ensuring that different systems can work together when required. The challenge lies in enforcing adherence to agreed standards when national procurement decisions are made independently.",
    question: "Why does the passage suggest complete equipment standardization is unrealistic?",
    options: [
      "Because alliance procurement procedures cannot accommodate the diverse preferences of member states.",
      "Because agreed communication protocols have proven more effective than hardware uniformity.",
      "Because economic and sovereignty considerations lead nations to retain distinct manufacturing bases.",
      "Because existing equipment inventories have reached the end of their operational service life."
    ],
    answer: 2,
    ex: "The passage lists 'divergent national requirements, existing inventories that would be costly to replace, and domestic industrial considerations' plus 'preserve domestic manufacturing capacity... for economic reasons and to maintain sovereign capability'. Option C synthesizes these as 'economic and sovereignty considerations... distinct manufacturing bases'. A is a procedural constraint not mentioned. B misreads (protocols are the solution, not the reason standardization is impractical). D contradicts the text (costly to replace existing inventories, not that they've reached end-of-life). Level 3: synthesizing multiple stated reasons into a higher-order explanation."
  },
  {
    topic: "Force structure — readiness vs. capacity trade-offs",
    passage: "Alliance force planners confront a persistent tension between maintaining high-readiness forces that can respond rapidly to crises and developing the overall capacity necessary for sustained operations. High-readiness forces require intensive training, modern equipment, and personnel who can deploy on short notice. These demands are resource-intensive. Prioritizing readiness therefore limits the total number of personnel and units that can be maintained within a given defense budget. Conversely, emphasizing overall capacity allows larger forces but may result in lower readiness levels across the force as a whole. Historical experience suggests that both attributes are necessary: high-readiness forces for initial response and larger capacity forces for reinforcement and sustainment. The optimal balance depends on the strategic environment and the specific threats that forces may face. In practice, member nations vary considerably in how they balance these competing demands, reflecting different threat perceptions and resource constraints.",
    question: "What does the passage imply about force structure decisions?",
    options: [
      "They should prioritize high-readiness forces because initial response is most critical.",
      "They involve choosing between competing goods rather than selecting an objectively correct answer.",
      "They are primarily constrained by available defense budgets rather than strategic considerations.",
      "They have been resolved effectively through alliance-level coordination among member states."
    ],
    answer: 1,
    ex: "'The optimal balance depends on the strategic environment and the specific threats' and 'member nations vary considerably' — this indicates there's no universal right answer, just different reasonable choices based on context. Option B captures this as 'competing goods rather than objectively correct'. A takes one side of a false binary. C overstates (resources are a constraint, but strategic factors also matter). D contradicts 'member nations vary considerably'. The inference: recognizing that structural trade-offs preclude definitive solutions."
  },
  {
    topic: "Leadership development — officer education",
    passage: "Professional military education for officers has traditionally emphasized technical competence in military tactics and operations. However, the contemporary security environment demands a broader skill set. Officers at senior levels must understand political context, engage effectively with civilian authorities and international partners, and make decisions in situations where military and political considerations are deeply intertwined. Some defense establishments have responded by incorporating more political science, international relations, and ethics into officer education curricula. Critics worry that broadening the curriculum dilutes the focus on core military competencies and that officers educated in this manner may be less prepared for the fundamental task of leading in combat. Proponents argue that technical military skills, while essential, are insufficient for the complex leadership demands of modern operations, particularly those involving coalition partners and civilian populations. The debate reflects broader questions about the proper role of military institutions in democratic societies.",
    question: "What concern do critics of broadened military education express?",
    options: [
      "That officers will become overly involved in political decision-making beyond their professional role.",
      "That dedicating curriculum time to non-military subjects may compromise proficiency in essential military skills.",
      "That civilian authorities will lose confidence in military officers who study political science.",
      "That coalition operations require different educational preparation than traditional military training."
    ],
    answer: 1,
    ex: "Critics 'worry that broadening the curriculum dilutes the focus on core military competencies' and officers 'may be less prepared for the fundamental task of leading in combat'. Option B paraphrases 'dilutes the focus' as 'compromise proficiency'. A is plausible but not stated. C is implausible and unmentioned. D misreads (coalition ops are cited as a reason to broaden, not a concern about broadening). The skill: distinguishing what critics actually claim from adjacent concerns they might have."
  },
  {
    topic: "Coalition operations — national caveats",
    passage: "National caveats — restrictions that individual nations place on how their forces may be employed in coalition operations — represent an inevitable feature of multinational military cooperation. Such restrictions reflect legitimate national concerns, including domestic political constraints, assessment of operational risks, and interpretation of international legal obligations. However, extensive caveats can significantly complicate operational planning and reduce the flexibility available to coalition commanders. When different national contingents operate under different rules regarding use of force, intelligence sharing, or geographic areas of operation, the result can be a patchwork of capabilities that is difficult to employ coherently. Military commanders understandably prefer minimal restrictions on their forces. Political leaders equally understandably insist on retaining authority over their nation's military commitments. Effective coalition operations therefore require continuous negotiation to balance operational effectiveness with political sustainability. Success depends less on eliminating caveats — which is unrealistic — than on ensuring they are clearly understood by all participants and incorporated into planning from the outset.",
    question: "What does the passage suggest is essential for managing national caveats effectively?",
    options: [
      "Gradual elimination of restrictions through political persuasion of contributing nations.",
      "Transparent communication of limitations and their integration into operational planning.",
      "Delegation of final authority over force employment to coalition military commanders.",
      "Standardization of rules regarding use of force across all national contingents."
    ],
    answer: 1,
    ex: "'Success depends less on eliminating caveats... than on ensuring they are clearly understood by all participants and incorporated into planning from the outset' — option B paraphrases 'clearly understood' as 'transparent communication' and 'incorporated into planning' as 'integration into operational planning'. A contradicts 'eliminating caveats... is unrealistic'. C contradicts 'political leaders... insist on retaining authority'. D is desirable but not presented as the essential element. Level 3: identifying what the author treats as the practical solution vs. the ideal but unattainable."
  },
  ],
  
  4: [
{
    topic: "Nuclear deterrence",
    passage: "The alliance's nuclear deterrence posture is predicated upon the principle that nuclear weapons will not be employed as a first resort but retains the right to do so under extreme circumstances threatening the survival of any member state. This deliberate ambiguity, enshrined in the concept of flexible response, serves to complicate adversarial calculations and thereby enhances deterrence. The deployment of tactical nuclear weapons in Europe under dual-key arrangements with selected allies represents both a political commitment and a tangible capability signal. Critics of the current posture contend that ambiguity may inadvertently lower the threshold for escalation and create dangerous miscalculations during crises. Proponents argue, conversely, that clarity in declaratory policy would undermine the very uncertainty upon which deterrence fundamentally depends. The debate has acquired renewed salience following recent crises in Eastern Europe and the explicit nuclear threats articulated by certain leaders during these conflicts.",
    question: "What underlying disagreement separates the two positions described in the passage?",
    options: [
      "Whether nuclear weapons should be retained at all within the alliance arsenal.",
      "Whether predictability or unpredictability better serves the purpose of preventing conflict.",
      "Whether dual-key arrangements provide adequate political control.",
      "Whether tactical weapons should be replaced with strategic ones."
    ],
    answer: 1,
    ex: "Critics worry ambiguity 'lowers the threshold' (i.e. favour clarity); proponents argue clarity 'undermines uncertainty' (i.e. favour ambiguity). The deep disagreement is whether predictability or its opposite enhances deterrence. Option B captures this as 'predictability or unpredictability'. A, C, D address peripheral matters not at the core of the disagreement. The Level 4 skill: identifying the conceptual axis along which two positions differ, even when neither position is fully stated in those terms."
  },
{
    topic: "Alliance enlargement",
    passage: "The debate over the alliance's continued enlargement has intensified in the wake of recent acts of aggression in Europe. Proponents of an open-door policy invoke both the foundational principle of sovereign self-determination and the strategic rationale of extending the alliance's defensive perimeter to encompass states that share its values and interests. Opponents point to the destabilising effects of perceived encirclement and caution that enlargement may provoke disproportionate responses from revisionist powers seeking to preserve their declining sphere of influence. The accession of Finland in 2023 and Sweden in 2024 marked a historic shift in Northern European security architecture, demonstrating that the alliance retains the capacity to adapt to evolving geopolitical realities. These accessions, undertaken in response to aggression rather than despite it, fundamentally complicate the narrative that enlargement constitutes a primarily provocative act. The strategic implications, including expanded responsibilities for collective defence in the High North, will continue to shape planning for decades.",
    question: "What rhetorical effect does the passage attribute to the Nordic accessions?",
    options: [
      "They confirm the validity of the encirclement argument advanced by opponents of enlargement.",
      "They weaken a key claim used by those who object to extending alliance membership.",
      "They demonstrate that enlargement is now a matter of consensus among observers.",
      "They show that the alliance has reached the limits of its adaptive capacity."
    ],
    answer: 1,
    ex: "'These accessions, undertaken in response to aggression rather than despite it, fundamentally complicate the narrative that enlargement constitutes a primarily provocative act' — the accessions undermine the opponents' argument. Option B paraphrases 'fundamentally complicate the narrative' as 'weaken a key claim'. A inverts the meaning. C overstates ('consensus' is not claimed). D contradicts 'capacity to adapt'. The Level 4 skill: tracking which argument is strengthened or weakened by a given event."
  },
{
    topic: "Strategic communications",
    passage: "The strategic communications framework adopted by the alliance sought to address information asymmetries that had hitherto undermined cohesion among member states. By establishing a centralised narrative management protocol, the alliance aimed to preclude adversarial exploitation of internal disagreements while simultaneously reinforcing the credibility of its deterrence posture vis-à-vis potential aggressors. Implementation has proved more challenging than anticipated. Member states retain divergent national narratives shaped by distinct historical experiences and contemporary political imperatives. The proliferation of communication channels, including platforms outside traditional regulatory frameworks, has further complicated efforts to maintain consistent messaging. Notwithstanding these obstacles, recent initiatives suggest that incremental progress is achievable, particularly when coordinated responses to specific incidents demonstrate the practical value of collective action. The challenge remains balancing the operational requirements of effective communications with the democratic imperative of free expression.",
    question: "What fundamental tension does the passage identify as constraining the framework's success?",
    options: [
      "Between centralisation and the technical capabilities of member states.",
      "Between effective coordination of messaging and the openness inherent to democratic governance.",
      "Between historical experiences and contemporary political imperatives.",
      "Between traditional and emerging communication platforms."
    ],
    answer: 1,
    ex: "The closing sentence — 'balancing the operational requirements of effective communications with the democratic imperative of free expression' — names this tension. Option B paraphrases 'free expression' as 'openness inherent to democratic governance' and 'operational requirements' as 'effective coordination of messaging'. C and D describe complicating factors but not the fundamental tension named in the closing sentence. A is unmentioned. Level 4 demands identifying which of several mentioned tensions the author treats as foundational."
  },
{
    topic: "Multi-domain operations",
    passage: "Multi-domain operations represent a paradigmatic shift in how military campaigns are conceptualised and executed. Rather than treating air, land, sea, space, and cyber as parallel but largely independent domains, the framework seeks to exploit convergence — the simultaneous application of effects across domains to create dilemmas for the adversary that cannot be resolved by acting in any single domain. Air power, by virtue of its speed, reach, and flexibility, remains the principal enabler of cross-domain synergy. However, realising this potential demands a level of inter-service integration and digital interoperability that most allied nations are still developing. Some critics suggest that the construct, while intellectually compelling, risks obscuring rather than clarifying operational thinking by adding layers of complexity to already challenging coordination problems. Others argue that the framework merely articulates what skilled commanders have always sought to achieve, namely the integration of effects from all available capabilities to produce decisive outcomes.",
    question: "What position do the second group of critics described in the text appear to hold?",
    options: [
      "The framework introduces fundamentally new principles of warfare.",
      "The doctrine is essentially a formal restatement of long-standing operational practice.",
      "Multi-domain integration cannot be achieved without significant institutional reform.",
      "Air power should not be privileged over other domains in modern operations."
    ],
    answer: 1,
    ex: "'The framework merely articulates what skilled commanders have always sought to achieve' — option B paraphrases 'merely articulates' as 'essentially a formal restatement' and 'always sought to achieve' as 'long-standing operational practice'. A inverts the position. C is a different argument unmentioned. D contradicts the passage's claim about air power's enabling role. Level 4 requires distinguishing between two critical positions and matching each to its proper paraphrase."
  },
{
    topic: "Hybrid threat attribution",
    passage: "The challenge of attributing hostile actions in the contemporary security environment has acquired unprecedented complexity. Adversaries operating below the threshold of armed conflict deliberately exploit ambiguity to inhibit decisive collective response. Cyber operations conducted through chains of compromised infrastructure across multiple jurisdictions, disinformation campaigns disseminated through inauthentic networks, and economic coercion pursued through proxy entities all complicate traditional attribution frameworks. Even when technical attribution is achievable, the political will to publicly name responsible actors may be lacking, particularly when such acknowledgement implies obligations to respond. The alliance has invested in developing collective attribution mechanisms, recognising that the credibility of deterrence ultimately depends upon the demonstrated willingness to identify and respond to hostile actions. Yet the asymmetry between democratic constraints and authoritarian impunity continues to favour aggressors who can maintain plausible deniability while their victims navigate transparent legal processes.",
    question: "What deeper structural problem does the passage identify beyond the technical difficulty of attribution?",
    options: [
      "The financial cost of developing collective attribution mechanisms is prohibitive.",
      "Procedural transparency of democracies creates a disadvantage their adversaries do not share.",
      "Cyber infrastructure is too widely distributed to be effectively monitored.",
      "Economic coercion is more difficult to attribute than cyber operations."
    ],
    answer: 1,
    ex: "'The asymmetry between democratic constraints and authoritarian impunity continues to favour aggressors' — option B paraphrases this as 'procedural transparency of democracies creates a disadvantage'. A is unmentioned. C and D are surface details, not the structural problem identified. Level 4 demands recognising the structural/systemic claim that sits above the operational details. Surface readers will be drawn to C because the passage discusses cyber infrastructure."
  },
{
    topic: "Tailored deterrence",
    passage: "Contemporary deterrence theory has evolved considerably from its Cold War origins, when nuclear-centric models predominated. The current strategic environment requires conceptual frameworks capable of addressing simultaneous challenges from peer competitors, regional powers, and non-state actors operating across the full spectrum of conflict. Tailored approaches recognise that what deters a nuclear-armed great power may be entirely irrelevant against a transnational terrorist organisation, and that what credibly threatens an authoritarian regime may not affect a democratic adversary's calculations. This proliferation of deterrence relationships imposes substantial demands on intelligence, capabilities, and policymaking capacity. The integrated deterrence concept seeks to consolidate these multiple requirements within a unified framework. However, the practical implementation remains contested, with debates over the relative weight to be assigned different threats and the appropriate balance between conventional, nuclear, and non-kinetic instruments.",
    question: "What presumption underlying older deterrence models is challenged by the tailored approach?",
    options: [
      "That nuclear weapons have lost their relevance in contemporary security.",
      "That a single set of deterrence principles can apply uniformly across all adversaries.",
      "That conventional capabilities are sufficient without nuclear backing.",
      "That deterrence relationships should be limited to peer competitors."
    ],
    answer: 1,
    ex: "Tailored deterrence is premised on the idea that different adversaries require different approaches — implicitly rejecting the universal applicability assumed by older models. Option B captures this presumption being challenged. A is not the claim. C reverses the logic. D restricts the scope incorrectly. Level 4 requires inferring what was implicitly assumed by the prior model that the new approach now rejects."
  },
{
    topic: "Strategic stability and arms control",
    passage: "Strategic stability between nuclear-armed great powers has historically rested upon a combination of mutual vulnerability, transparency mechanisms, and arms control agreements that constrain destabilising capabilities. The progressive erosion of this architecture, evidenced by the lapse of several major treaties, has raised concerns about increased risk of miscalculation during crises. Emerging technologies, including hypersonic weapons, autonomous systems, and counterspace capabilities, complicate traditional concepts by compressing decision timelines and blurring distinctions between conventional and nuclear capabilities. Restoring elements of the previous architecture appears unlikely in the near term given current geopolitical tensions. Nevertheless, the underlying logic that motivated previous agreements — namely, that mutual restraint can serve the security interests of all parties — retains its essential validity. Whether this logic can find expression in new frameworks suited to contemporary conditions remains a fundamental question.",
    question: "Which proposition does the passage advance most directly?",
    options: [
      "Arms control is a relic of the Cold War with little applicability to contemporary security.",
      "Emerging technologies have rendered the concept of strategic stability obsolete.",
      "The principle motivating earlier arms control remains relevant even where specific agreements have failed.",
      "Hypersonic weapons should be the immediate focus of new arms control negotiations."
    ],
    answer: 2,
    ex: "'The underlying logic... retains its essential validity. Whether this logic can find expression in new frameworks suited to contemporary conditions remains a fundamental question' — Option C captures the distinction between the validity of the principle and the difficulty of its implementation. A directly contradicts this. B contradicts 'underlying logic retains validity'. D is over-specific and not advanced as the passage's main argument. Level 4 requires distinguishing the abstract principle from its concrete instantiations."
  },
{
    topic: "Civilian harm mitigation",
    passage: "The mitigation of civilian harm in armed conflict has emerged as a central concern in contemporary military operations, reflecting evolving legal obligations, strategic imperatives, and ethical commitments. Modern doctrine recognises that the protection of civilians is not merely a legal constraint upon military action but a strategic objective in its own right. Civilian casualties undermine the legitimacy of operations, alienate populations whose cooperation may be essential to mission success, and provide propaganda advantages to adversaries. Implementation of robust mitigation requires investment in intelligence, surveillance, and precision capabilities, alongside training, doctrine, and accountability mechanisms. These investments compete with other priorities in resource-constrained environments. Critics argue that despite improvements, the gap between stated commitments and operational reality remains substantial, particularly in operations conducted by partner forces with less developed protection cultures.",
    question: "What conceptual shift in the treatment of civilian harm does the passage identify?",
    options: [
      "Protection of civilians has moved from being a legal restriction to also being an operational goal.",
      "Civilian harm has been redefined as a propaganda concern rather than a legal issue.",
      "Mitigation has become impossible in modern conflict due to resource constraints.",
      "Partner forces have replaced alliance forces as the primary source of civilian casualties."
    ],
    answer: 0,
    ex: "'Not merely a legal constraint upon military action but a strategic objective in its own right' — option A paraphrases this as moving from 'legal restriction' to 'also being an operational goal'. The key word is 'not merely... but also' — both remain true. B is wrong because legal status is preserved, not replaced. C and D overstate. Level 4 distinguishes 'addition of a new framing' from 'replacement of the old one'."
  },
{
    topic: "Resilience",
    passage: "Resilience has emerged as a central concept in contemporary security thinking, reflecting recognition that prevention of all hostile actions is impossible and that the capacity to absorb, adapt to, and recover from hostile actions is therefore essential. Alliance doctrine identifies seven baseline resilience requirements covering critical infrastructure, civilian capabilities, and continuity of government. Implementation depends primarily upon national authorities, although coordination through alliance mechanisms enhances coherence and identifies gaps. Resilience requirements interact with traditional military capabilities in complex ways. Investments in resilience may reduce vulnerabilities that adversaries seek to exploit, thereby contributing to deterrence by denial. Conversely, evident gaps may incentivise hostile action by suggesting attractive targets. The conceptual challenge lies in calibrating resilience investments appropriately, given that absolute resilience is unattainable and excessive defensive measures may impose unsustainable costs on civilian society.",
    question: "What paradox in the relationship between resilience and adversary behaviour does the passage highlight?",
    options: [
      "Resilience investments are most effective when concealed from adversaries.",
      "The same investments that discourage attack can also signal where vulnerabilities lie.",
      "Resilience measures only work when complemented by offensive capabilities.",
      "Civilian and military resilience requirements are fundamentally incompatible."
    ],
    answer: 1,
    ex: "Resilience investments 'may reduce vulnerabilities... thereby contributing to deterrence by denial. Conversely, evident gaps may incentivise hostile action by suggesting attractive targets'. The paradox: resilience can both deter (by removing targets) and invite (by revealing remaining gaps). Option B captures this dual signalling effect. A, C, D are unrelated. Level 4 demands identifying paradoxical/dialectical relationships within a passage."
  },
{
    topic: "Burden sharing",
    passage: "Burden sharing within the alliance has been a perennial source of contention, but the debate has acquired new intensity in the contemporary period. The benchmark of two percent of gross domestic product, agreed at the Wales Summit, has become a politically charged metric despite its acknowledged limitations as a measure of meaningful contribution. Defence spending alone captures neither the quality of capabilities developed nor the operational contributions made by member states. A nation might exceed the spending threshold while investing inefficiently in capabilities of marginal alliance utility, while another might fall below the threshold yet provide highly capable forces in critical operations. More sophisticated assessments incorporate measures of capability development, operational deployment, and acceptance of risk in alliance missions. Yet the simplicity of the spending metric ensures its continued political prominence, even as analysts debate whether the underlying rationale is best served by alternative frameworks.",
    question: "Why does the spending metric persist despite its analytical weaknesses?",
    options: [
      "Member states have agreed not to use more sophisticated alternatives.",
      "Analysts have failed to develop credible alternative measures.",
      "Its accessibility as a single number makes it useful in political discourse.",
      "Alliance treaties require its use as the sole measure of contribution."
    ],
    answer: 2,
    ex: "'The simplicity of the spending metric ensures its continued political prominence' — option C paraphrases 'simplicity' and 'political prominence' as 'accessibility as a single number' and 'useful in political discourse'. A is contradicted. B is contradicted ('more sophisticated assessments' exist). D is fabricated. Level 4: recognising that 'political prominence' implies utility for political actors, not analytical merit."
  }
  ],
};
