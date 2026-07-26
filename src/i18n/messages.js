// JFLT Training - UI translation dictionary
// ============================================================================
// Tone guide:
//   EN: plain, professional military English, sentence case for buttons.
//       Concise but not abrupt — audience is JFLT learners (mil. English).
//   JA: 丁寧な敬体、ですます調。短いボタンは「次へ」など命令調も可。
//
// Interpolation: use {token} syntax. e.g. t('progress', { current, total })
//   en: "Q{current} / {total}"   ja: "Q{current} / {total}"
//
// Keys are namespaced by component / area. Keep them sorted alphabetically
// inside each namespace to make additions easier.
// ============================================================================

export const MESSAGES = {
  en: {
    common: {
      back: '← Back',
      cancel: 'Cancel',
      close: '✕ Close',
      copy: 'Copy',
      copied: '✓ Copied',
      delete: 'Delete',
      next: 'Next →',
      ok: 'OK',
      reset: 'Reset',
      retry: 'Retry',
      save: '💾 Save',
      saved: '✅ Saved',
      skip: 'Skip →',
      yes: 'Yes',
    },

    header: {
      brand: 'JFLT Training',
      author: 'by Oshibe',
      tagline: '350 questions · NATO English',
      footer: 'JFLT Training · React + Vite + Tailwind · Powered by Google Cloud TTS',
      langJA: 'JA',
      langEN: 'EN',
      langSwitch: 'Language',
    },

    tabs: {
      questions: 'Practice',
      review: 'Review',
      grading: 'Test',
      writing: 'Writing',
      stats: 'Stats',
      updates: 'Updates',
      settings: 'Settings',
      past_exam: 'Past Exam',
    },

    review: {
      title: '📚 Review',
      intro:
        'Look back at questions you have answered, and re-attempt any of them. Topics you got wrong appear first.',
      filter_category: 'Category',
      filter_result: 'Result',
      filter_all: 'All',
      filter_correct: 'Correct',
      filter_incorrect: 'Incorrect',
      empty:
        'No answered questions yet. Try the Practice tab to start building your review list.',
      empty_filtered: 'No questions match the current filters.',
      attempts_count: '{count} attempt(s)',
      last_attempt: 'last: {date}',
    },

    changelog: {
      title: '📰 Update notes',
      intro:
        'A short log of what has changed recently. New entries appear at the top.',
      empty: 'No updates yet.',
      tags: {
        feature: 'NEW',
        improvement: 'Improved',
        fix: 'Fixed',
        style: 'Design',
      },
      entries: {
        topic_vocab_shuffle_all_2026_07: {
          title: 'Shuffle across every exam-prep topic at once',
          desc:
            'Added an "All Topics (Shuffle)" option to the exam-prep vocabulary trainer, for both the quiz and flashcards. Instead of practicing one topic pack at a time, you can now go through all 195 words pooled together in one shuffled round.',
        },
        flashcard_overlap_fix_2026_07: {
          title: 'Fixed flashcard button overlap',
          desc:
            'On some screen sizes the word text on the topic-vocab flip cards overlapped the audio-playback and flag buttons. The controls now sit in their own row above the card text so they never collide, on any device.',
        },
        topic_vocab_2026_07: {
          title: 'Specialized vocabulary trainer (90 words)',
          desc:
            'Added a dedicated entry point on the Vocab practice screen for three topics that come up often in JFLT L3 listening: treaty conclusion, NATO force deployment, and extradition (30 words each). Choose between a multiple-choice quiz (English word → Japanese meaning) or flip flashcards with example sentences.',
        },
        past_exam_gate_2026_06: {
          title: 'Restricted past-exam area (infrastructure)',
          desc:
            'Added a password-gated area for past-exam listening material. Authorised users click the footer attribution 5 times to reveal a password dialog; once unlocked, a 🔒 Past Exam tab appears. Question data is dynamically loaded so it stays out of the main bundle. ⚠️ This is obscurity, not real security — anyone with browser dev tools can still extract content. Use only for casual access control among trusted users.',
        },
        vocab_audio_2026_06: {
          title: 'Vocab: pronunciation playback for the tested word',
          desc:
            'Each Vocab practice question now has a 🔊 "Hear word" button that plays the term being tested (extracted from the quoted word in the question text). Helps you build the sound-meaning link, not just the spelling-meaning link. Uses the same Google TTS voice as Listening playback.',
        },
        api_key_guide_2026_06: {
          title: 'Settings: detailed API-key setup guide with deep links',
          desc:
            'Added a "🔑 How to get an API key" button below the API key input. Clicking it expands an inline step-by-step guide with direct links into the specific Google Cloud Console pages you need (project creation, TTS API library, billing setup, credentials). Each step shows exactly which button to click. Designed for users unfamiliar with Google Cloud.',
        },
        vocab_diplomacy_added_2026_06: {
          title: 'Vocab: 45 new diplomacy / IR questions',
          desc:
            'Added 45 vocabulary questions covering diplomatic and international-relations terminology at L2-L4 (15 each). Topics include UN procedures (resolution, veto, signatory, accession), treaty law (jurisdiction, sovereignty, stipulate, ratify), dispute settlement (mediation, arbitration, ceasefire, embargo), and IR theory (hegemony, multipolarity, revisionist, status quo, fait accompli, zero-sum). Complements the existing NATO/military vocabulary so the bank now matches the broader topical scope STANAG 6001 L3-L4 expects.',
        },
        vocab_jp_gloss_2026_06: {
          title: 'Vocab: Japanese gloss in every explanation',
          desc:
            'Every vocabulary question explanation now begins with 【意味】 followed by the Japanese meaning of the term being tested. Makes it easier to verify whether you actually knew the word, not just guessed the right option. Applied to all 185 vocab questions across L1-L4.',
        },
        voice_picker_2026_06: {
          title: 'Voice picker in Settings + pricing breakdown',
          desc:
            'Settings now has a male / female voice picker for Listening playback. Choose from Neural2 (default), WaveNet, or Studio (premium) tiers — each with a Test button for live preview. Two-speaker dialogue questions automatically use both your chosen voices for clear male/female contrast. A pricing table shows free-tier limits and per-character costs so you can estimate monthly Google Cloud spend before switching to Studio voices.',
        },
        listening_voice_swap_2026_06: {
          title: 'Listening: clearer narrator voice + readable dialogue labels',
          desc:
            'The default narrator voice for Listening passages is now en-GB-Neural2-B (male British) — clearer pronunciation in our testing. Two-speaker dialogue markers were renamed from "A:/B:" to "MAN:/WOMAN:" so question text can refer naturally to "the man" / "the woman". MAN turns use the male voice, WOMAN turns use en-GB-Neural2-A (female British). A sample L3 dialogue question has been added to Listening Level 3.',
        },
        listening_dialogue_2026_06: {
          title: 'Listening: two-speaker dialogue support',
          desc:
            'Listening passages can now be back-and-forth dialogues between two people. Lines beginning with speaker markers are read with separate British voices, with a short pause between turns. Passages without markers continue to play in the single narrator voice exactly as before, so existing questions are unaffected. Future Listening question batches can use the new format — see PROMPTS.md for the convention.',
        },
        header_desktop_fix_2026_06: {
          title: 'Header layout fixed on desktop + logo updated',
          desc:
            'On wide screens the brand name and tagline were truncated to "JF..." / "350 ..." because the header container was too narrow for the tab row plus title plus language toggle. Widened the header container from 768 to 1024 pixels so everything fits naturally. The placeholder "J" gradient square in the corner has been replaced with the new JFLT roundel logo (same as the favicon).',
        },
        favicon_added_2026_06: {
          title: 'Browser tab icon added',
          desc:
            'Added a JFLT roundel favicon so the app is identifiable in browser tabs and bookmarks. Navy disc with a yellow inner ring and "JFLT" lettering — readable down to 16 pixels.',
        },
        practice_random_order_2026_06: {
          title: 'Practice tab: questions now appear in random order',
          desc:
            'The Practice tab previously showed questions in fixed dataset order, so the same items appeared first every session. Each Practice session now reshuffles the question order on Start, and again whenever category or level changes. Stats and Review continue to track each question by its stable internal ID, unaffected by display order.',
        },
        vocab_grammar_balanced_2026_06: {
          title: 'Vocab + Grammar: answer letter and option length rebalanced',
          desc:
            'Fixed two issues affecting guessability. Answer letters: VOCAB had B at 45% (now 25%); GRAMMAR had 0% D answers (now 25%). Option lengths: VOCAB had the correct option uniquely longest in 69% of questions (now 4%); GRAMMAR went from 37% to 2%. Short distractors were padded with neutral qualifier tails, then options reordered round-robin per level. References to option letters in explanations were remapped automatically.',
        },
        vocab_expanded_2026_06: {
          title: 'Vocabulary: 125 new questions added (60 → 185)',
          desc:
            'Major vocab expansion across all four levels. L1 gains 37 everyday and basic military terms (unit names, ranks, drill commands, kit, AWOL/POW/KIA, etc.). L2 adds 38 intermediate operational and procedural terms (ambush, surveillance, doctrine, covert/overt, corroborate, authorize, etc.). L3 adds 38 strategic and policy terms (coercion, brinkmanship, containment, détente, polarization, ratify, promulgate, etc.). L4 adds 12 formal academic terms (attrition, cognizant, exigency, obviate, tacit, nascent, tantamount, corollary, etc.). All follow protocol: answer letters round-robin A/B/C/D, correct option never uniquely longest, no duplicate topics.',
        },
        listening_l3_expanded: {
          title: 'Listening L3: 10 new questions added (25 → 35)',
          desc:
            'Ten new L3 listening briefings added covering Indo-Pacific maritime ops, Arctic security, space situational awareness, counter-intelligence, integrated air defence, special operations economy of force, crisis communications, election interference, energy security, and combined arms doctrine. All follow current protocols: ≤180-word passages, paraphrased options (no verbatim keyword matching), distractors length-balanced so the correct answer is never uniquely the longest.',
        },
        reading_length_bias: {
          title: 'Reading: distractors lengthened so option length no longer reveals the answer',
          desc:
            'Audit found the correct option was uniquely the longest in 44% of Reading questions (vs the ~25% random baseline), letting learners guess by size — especially L4 at 80%. Padded the shorter distractors with semantically appropriate qualifiers across 22 questions. New rate: 21% overall (L1=6, L2=33, L3=29, L4=0).',
        },
        reading_l3_trimmed: {
          title: 'Reading L3: long passages trimmed, vocabulary upgraded',
          desc:
            'All eleven Reading L3 passages over 150 words have been rewritten to ≤150 words. To preserve L3 difficulty, vocabulary was upgraded (more Latinate, more abstract) and distractors were redesigned around plausible misreadings rather than obviously wrong choices. Lifts the average L3 read-time toward 2 min/question, matching the official 120-min Reading section.',
        },
        listening_l3_paraphrased: {
          title: 'Listening L3: paraphrased options instead of verbatim matching',
          desc:
            'Listening L3 previously let learners win by keyword matching — the correct option often copied the passage verbatim. The first 15 L3 questions have been rewritten so the correct answer paraphrases the passage and distractors target common misreadings, matching the style already used in L2 and the later L3 questions.',
        },
        review_listening_audio: {
          title: 'Review: play Listening audio',
          desc:
            'Expanded items in the Review tab now have a 🔊 play button. Listening passages can be re-listened to (not just read), and Reading passages can be read aloud — both via the same Google Cloud TTS used in the test.',
        },
        grading_autosave_unmount: {
          title: 'Test progress auto-saves when you leave the tab',
          desc:
            'Switching to another tab (or closing the browser) during a test no longer wipes your progress. The grading session is auto-saved exactly like clicking Pause, so the Resume banner appears next time you visit the Test tab.',
        },
        history_breakdown: {
          title: 'Test history: per-section breakdown',
          desc:
            'Tap any past test in the history list to see the per-level breakdown: correct/total per section, pass / + / fail status, and total duration. Lets you spot where you stalled rather than only seeing the final SLP score.',
        },
        listening_audio_stop: {
          title: 'Listening: previous audio is now stopped between questions',
          desc:
            'When moving to the next Listening question in Test mode, the previous question\'s audio is forcibly stopped so the new 5-second countdown actually has silence. Before, lingering audio made the next question seem to play instantly.',
        },
        grading_timer_pause: {
          title: 'Test mode: timer + pause / resume',
          desc:
            'The grading-mode test now shows an elapsed-time chip at the top (Reading targets 120 min per official spec; Listening 60, Vocab/Grammar 30). You can pause mid-test and resume later from the exact same question.',
        },
        grading_short_passages: {
          title: 'Test mode: prefer shorter passages',
          desc:
            'When the grading-mode test samples Reading and Listening questions, it now favours shorter passages so the test stays within the recommended time limit. The Practice tab still surfaces every question — long passages are useful for endurance training.',
        },
        answer_distribution: {
          title: 'Balanced A / B / C / D answer distribution',
          desc:
            'Reading and Listening previously had ~67% of answers at option B and 0% at D, so guessing "B" was a usable shortcut. Options have been rebalanced so each letter is the correct answer roughly 25% of the time. Question text, passages, distractor wording and explanations are unchanged — only the order inside each options array was reshuffled.',
        },
        listening_countdown: {
          title: 'Listening: 5-second read-ahead before audio plays',
          desc:
            'In Test mode, each Listening question now waits 5 seconds before the audio starts so you can skim the question and options first. Tap the audio button to skip the countdown.',
        },
        review_tab: {
          title: 'Review tab',
          desc:
            'Look back at every question you have answered, see which ones you got right or wrong, and re-attempt any of them right there.',
        },
        updates_tab: {
          title: 'Update notes tab',
          desc:
            'This tab. A lightweight changelog so you can see what changed without checking GitHub.',
        },
        mobile_header: {
          title: 'Mobile-friendly header',
          desc:
            'On phones the header now wraps to two rows so tab buttons stay tappable. Desktop layout unchanged.',
        },
        welcome_screen: {
          title: 'Practice welcome screen',
          desc:
            'Opening the app no longer drops you straight into a question. Pick a skill / level on the welcome screen first.',
        },
        session_streak_fix: {
          title: 'Session streak resets on open',
          desc:
            'The current-streak counter now starts at 0 each time you open the app. Best-streak and lifetime correct counts are preserved.',
        },
        bilingual_ui: {
          title: 'English / Japanese UI',
          desc:
            'All UI text is now bilingual. Auto-detects your browser language and offers a JA / EN toggle in the header.',
        },
        writing_tab: {
          title: 'Writing tab + AI coach prompt',
          desc:
            'A prompt that turns Gemini / Claude / ChatGPT into a JFLT writing examiner. Generates E-Mail / Report / Essay tasks and grades your work.',
        },
        grading_mode: {
          title: 'Grading mode (JFLT official format)',
          desc:
            'A new tab that runs 15 questions × 4 sections with adaptive progression and final SLP score. Test history is saved.',
        },
        l4_questions: {
          title: 'Level 4 question set completed',
          desc:
            'Reading L4 and Listening L4 each now have 15 questions, matching the JFLT section size for all four levels.',
        },
        expanded_questions: {
          title: 'Question bank expanded',
          desc:
            'Reading and Listening question counts increased substantially (now 140 / 90 questions across L1-L4).',
        },
        initial_release: {
          title: 'Initial release',
          desc:
            'JFLT Training launches with Reading / Listening / Vocab / Grammar across four levels, stats tracking, and Google Cloud TTS audio.',
        },
      },
    },

    welcome: {
      title: 'Free Practice',
      body:
        'Choose a skill and level, then practice freely. Each correct answer is added to your lifetime stats. To take a full JFLT-format test, use the Test tab instead.',
      pick_skill: 'Choose a skill',
      pick_level: 'Choose a level',
      level_all: 'ALL (every level)',
      level_one: 'Level {level}',
      level_count: '{count} questions',
      start: '▶️ Start practice',
      change: '⚙ Change skill / level',
      hint_grading_a: 'Want an official-format graded test instead?',
      hint_grading_b: 'Go to the Test tab.',
    },

    levels: {
      label: 'Level:',
      all: 'ALL',
      progress: 'Q{current} / {total}',
      noQuestions: 'No questions at this level.',
    },

    card: {
      correct: 'Correct!',
      incorrect: 'Incorrect — answer is {label}',
      readAloud: 'Read aloud',
      playAudio: 'Play audio',
      hearWord: 'Hear word',
      listenInstruction: '🔊 Use the "Play audio" button above to listen. (Transcript appears after answering.)',
      next: 'Next →',
      skip: 'Skip →',
      back: '← Back',
    },

    audio: {
      noKey: 'Please enter an API key in the Settings tab.',
      failed: 'Audio playback failed. Please verify your API key.',
      loading: 'Loading…',
      play: 'Play audio',
    },

    grading: {
      title: '🎖️ Grading Mode — JFLT Official Format',
      intro_p1: 'Measure your ability using the exact JFLT format.',
      intro_p2: '{questionsPerSection} questions × {sections} sections',
      intro_p3: ' will be presented starting at Level 1. The test ends once a section scores 6 or fewer correct answers. Your final SLP score (e.g. ',
      intro_p4: '2+',
      intro_p5: ') is then computed.',
      note_label: 'Note:',
      note_no_back: 'You cannot return to previous questions during the test.',
      note_audio_once_a: 'Listening audio plays ',
      note_audio_once_b: 'exactly once',
      note_audio_once_c: ', automatically.',
      note_reading_visible: 'Reading passages remain visible during the test (same as official format).',
      note_history: 'Results are displayed at the end and saved to your history.',
      select_skill: 'Choose a skill to test',
      api_warn:
        '⚠️ Listening can be taken without an API key, but no audio will play. We recommend registering a Google Cloud TTS API key in the Settings tab first.',
      start: '▶️ Start Grading Mode',
      history_title: '📜 Test History',
      history_clear: 'Clear history',
      history_empty: 'No test history yet.',
      history_total_correct: 'Total correct: {correct} / {total}',
      load_failed: 'Failed to load questions. Please return to the top.',
      go_back: 'Back',
      section_label: 'Section {current} / {total}',
      progress_count: '{current} / {total}',
      abort: 'Abort',
      pause: 'Pause',
      timer_label: 'time',
      time_target: 'Target: ~{min} min',
      note_pause: 'You can pause a test mid-way and resume it later.',
      confirm_abort: 'Aborting the test. Your record will not be saved.',
      confirm_pause:
        'Pause the test and save your progress? You can resume from this exact spot later.',
      confirm_discard: 'Discard the saved test and start fresh?',
      confirm_clear_history: 'Delete all test history?',
      resume_title: '⏸ Resume your saved test',
      resume_body:
        'You have a {skill} test in progress, paused on {date}. So far: Section {section}, question {question}, {elapsed} elapsed.',
      resume_btn: '▶ Resume',
      discard_btn: '🗑 Discard',
    },

    pq: {
      section_badge: 'Section {level} (Level {level})',
      q_progress: 'Q{current} / {total}',
      listen_instruction:
        '🎧 Listen to the audio and answer. You can review the transcript after the test ends.',
      listen_no_key:
        '⚠️ No API key is configured, so audio will not play. Register a key in Settings.',
      audio_once_tooltip: 'Plays only once (per official spec)',
      audio_loading: 'Loading',
      audio_played: 'Played',
      audio_failed: 'Failed (retry)',
      audio_play: 'Play',
      audio_read: 'Read aloud',
      audio_waiting: 'Auto-play in {count}s (tap to play now)',
      select_prompt: 'Please select an answer',
      answered: 'Answered',
      next_question: 'Next question →',
      complete_section: 'Complete section →',
    },

    pr: {
      slp_title: 'JFLT SLP',
      duration: 'Time: {duration}',
      review: 'Review',
      rules_title: '📐 Scoring Rules (out of 15)',
      rule_pass_a: 'Section passed — advance to next level',
      rule_half_a: 'Previous level + "+" (test ends)',
      rule_fail_a: 'Previous level only (test ends)',
      restart: '🔄 Take again',
      exit: '🏠 Back to top',
      section_review_title: '📝 Section {level} Review ({correct}/{total})',
      show_passage: 'Show passage',
      your_answer: '(your answer)',
      correct_mark: '✓',
      status: {
        pass: 'Pass',
        half: '+',
        fail: 'Below',
        untested: 'Not taken',
      },
      duration_format: '{m}m {s}s',
    },

    stats: {
      summary: {
        overall_jflt: 'Overall JFLT',
        overall_sub: 'Minimum across 4 sections',
        correct_total: 'Correct / Attempted',
        correct_total_sub: 'Accuracy {pct}%',
        streak: 'Streak',
        streak_sub: 'Best {best}',
      },
      rules_title: '📐 Scoring Rules',
      rule_pass: ': section passed → advance to next level',
      rule_half: ': previous level + "+" (e.g. L2 with 7-9 correct → 1+)',
      rule_fail: ': previous level (e.g. L2 with ≤6 correct → 1)',
      rules_note:
        'Overall JFLT is the minimum across all 4 sections (you must meet the level in every section).',
      reset_title: 'Reset Statistics',
      reset_body:
        'Delete all records and start fresh.',
      reset_btn: '🗑️ Reset all statistics',
      reset_section: 'Reset this section',
      confirm_reset_all: 'Reset all statistics?',
      confirm_reset_section: 'Reset {label} records?',
      level: 'L{lv}',
      score_progress: '{correct} / {total}',
      remaining:
        '{remaining} more correct needed to pass (threshold {pass} / + at {half})',
      jflt_label: 'JFLT',
      accuracy_pct: 'Accuracy',
      attempts: 'Attempted: {count} questions',
    },

    settings: {
      api_title: '🔑 Google Cloud API Key',
      api_body:
        'Required for audio playback (Text-to-Speech). Your key is stored only in this browser\'s LocalStorage and never sent to external servers.',
      api_label: 'API Key',
      placeholder: 'AIza...',
      show: 'Show',
      hide: 'Hide',
      save: '💾 Save',
      test: '🔊 Play test audio',
      testing: '⏳ Playing…',
      clear: '🗑️ Remove API key',
      saved_msg: '✅ Saved.',
      test_no_key: '⚠️ Please enter an API key first.',
      test_ok: '✅ Playback successful.',
      test_fail: '❌ Playback failed: {error}',
      current_key: 'Current key:',
      guide_title: '📘 Setup Guide',
      guide_step1_a: 'Open ',
      guide_step1_b: 'Google Cloud Console',
      guide_step1_c: ' and create or select a project.',
      guide_step2: 'In APIs & Services → Library, enable Cloud Text-to-Speech API.',
      guide_step3: 'In APIs & Services → Credentials, create an API key.',
      guide_step4:
        '(Recommended) Restrict the key by HTTP referrer to prevent misuse.',
      guide_step5: 'Copy the key, paste it above, and click Save.',
      guide_step6: 'Click "Play test audio" to verify.',
      warn_shared:
        '⚠️ The API key is stored only in this browser. On shared devices, click "Remove API key" after use.',
      audio_title: 'ℹ️ About audio',
      audio_use: 'Reads aloud Reading and Listening passages.',
      audio_cost:
        'Free within Google Cloud TTS\'s monthly free tier on Neural2 / WaveNet voices.',
      get_key_button: '🔑 How to get an API key (step-by-step)',
      hide_key_button: '🔼 Hide the guide',
      kg_title: '📘 Get your Google Cloud TTS API key',
      kg_duration: '≈ 5 minutes',
      kg_intro:
        'Each link below opens the exact Google Cloud Console page you need, in a new tab. Switch back here to paste the key at the end.',
      kg_step1_title: 'Step 1: Sign in to Google Cloud',
      kg_step1_body:
        'Sign in with any Google account (the same as Gmail). Create a free Google account first if you don\'t have one.',
      kg_step1_link: 'Open console.cloud.google.com',
      kg_step2_title: 'Step 2: Create a project',
      kg_step2_body:
        'Click the project selector at the top of the page (next to the "Google Cloud" logo) → "New Project" → name it (e.g. "jflt-tts") → "Create". Wait ~30 seconds for it to be ready, then make sure the new project is selected.',
      kg_step3_title: 'Step 3: Enable Text-to-Speech API',
      kg_step3_body:
        'Open the API library page below and click the blue "ENABLE" button. Wait until it switches to "API enabled".',
      kg_step3_link: 'Open the TTS API library page',
      kg_step4_title: 'Step 4: Set up billing (required, free tier covers normal use)',
      kg_step4_body:
        'Google requires a billing account even for free-tier usage. Add a credit card and link a billing account to your project on the billing page below.',
      kg_step4_link: 'Open billing setup',
      kg_step4_note:
        '💡 Neural2 / WaveNet voices are free up to 1,000,000 characters per month. Normal practice use stays well within this — no actual charges.',
      kg_step5_title: 'Step 5: Create the API key',
      kg_step5_body:
        'On the credentials page below, click "+ CREATE CREDENTIALS" at the top → "API key". A popup will show your key (starts with "AIza..."). Copy it.',
      kg_step5_link: 'Open the credentials page',
      kg_step6_title: 'Step 6 (recommended): Restrict the key',
      kg_step6_body:
        'In the popup from Step 5, click "RESTRICT KEY". Then: Application restrictions → "HTTP referrers" → add the URLs below as allowed referrers. API restrictions → "Restrict key" → select only "Cloud Text-to-Speech API". Click "Save". This stops anyone else from using your key.',
      kg_step6_referrers_label: 'Add these as allowed referrers:',
      kg_step7_title: 'Step 7: Paste it into JFLT',
      kg_step7_body:
        'Come back to this Settings tab, paste your copied key into the field above, click "Save", then "Play test audio" to verify it works.',
      kg_outro:
        'Done! If playback fails: (1) check the API shows "Enabled" on the library page, (2) check billing is linked to the same project, (3) check the referrer restriction allows this page\'s URL.',
      voice_title: '🎙️ Voice selection',
      voice_body:
        'Pick a male and a female voice. Single-narrator passages use your default-gender voice; dialogue passages use both (MAN: → male, WOMAN: → female).',
      voice_male: 'Male voice',
      voice_female: 'Female voice',
      voice_male_short: 'Male',
      voice_female_short: 'Female',
      voice_preview: 'Test',
      voice_default_gender: 'Default narrator (single-speaker passages)',
      voice_default_hint:
        'Two-speaker dialogue questions always use both voices regardless of this setting.',
      pricing_title: '💰 Google Cloud TTS pricing',
      pricing_body:
        'Google bills your API key directly by characters synthesised. Free tier resets monthly.',
      pricing_col_tier: 'Tier',
      pricing_col_free: 'Free tier / month',
      pricing_col_rate: 'After free tier',
      pricing_free_neural: '1,000,000 chars',
      pricing_rate_neural: '$16 / 1M chars',
      pricing_free_studio: '100,000 chars',
      pricing_rate_studio: '$160 / 1M chars',
      pricing_example_title: 'Typical usage',
      pricing_example_basis:
        'A medium passage ≈ 800 chars. Practising 300 passages/month ≈ 240K chars.',
      pricing_example_neural:
        'Neural2 / WaveNet → within free tier → $0/month.',
      pricing_example_studio:
        'Studio → 140K paid chars → ≈ $22/month. Quality is noticeably higher but watch the budget.',
      pricing_source:
        'Rates as of 2026. Check cloud.google.com/text-to-speech/pricing for the current figures.',
    },

    pastExam: {
      gate_title: 'Restricted access',
      gate_body:
        'This area contains reference material restricted to authorised users. Enter the unlock password to continue.',
      gate_placeholder: 'Password',
      gate_submit: 'Unlock',
      gate_cancel: 'Cancel',
      wrong_password: 'Incorrect password.',
      panel_title: 'Past-exam reference material',
      panel_subtitle: 'Restricted content — do not share outside authorised users.',
      lock_button: 'Lock',
      badge: 'Past exam',
      loading: 'Loading restricted content…',
      load_failed: 'Failed to load past-exam data',
      empty:
        'No past-exam questions added yet. Paste your entries into src/past-exam-data.js.',
      filter_all: 'All',
      level_label: 'Level',
      starred_badge: '★ Confirmed on exam',
      level_empty: 'No questions at this level yet.',
    },

    topicVocab: {
      entry_badge: 'Exam Prep',
      entry_button: 'Diplomacy / NATO / Extradition + More (195 words)',
      entry_subtitle: 'Specialized words worth reviewing right before the real exam',
      hub_title: 'Specialized Vocabulary — L3 Listening Focus',
      hub_body:
        'Topics that come up often in JFLT L3 listening: treaty conclusion, NATO force deployment, extradition, and a broader mixed pack.',
      all_topics_title: 'All Topics (Shuffle)',
      all_topics_subtitle: 'Practice every pack combined, in one shuffled round',
      word_count: '{count} words',
      mode_quiz_title: 'Quiz (EN → JA)',
      mode_quiz_body: 'See the English word, choose the correct Japanese meaning from 4 options.',
      mode_flash_title: 'Flashcards',
      mode_flash_body: 'Flip between the English word and its Japanese meaning, with an example sentence.',
      exit_button: '✕ Exit',
      quiz_prompt: 'What does this word mean?',
      score: 'Score: {correct} / {total}',
      reshuffle: 'Shuffle',
      flash_front_hint: 'Tap to reveal meaning',
      flash_back_hint: 'Tap to flip back',
      mark_button: 'Mark as hard to remember',
      unmark_button: 'Remove mark',
      marked_count: '{count} marked',
      marked_only_toggle: 'Practice marked words only ({count})',
      marked_empty: "You haven't marked any words in this topic yet.",
    },

    writing: {
      header_title: '✍️ Writing Practice — AI Coach Script',
      header_body:
        'JFLT Writing is graded qualitatively by a panel of 3 or more examiners. Getting equivalent feedback at home is hard — so we provide a prompt that turns any general-purpose AI chat (Gemini / Claude / ChatGPT) into a dedicated JFLT writing coach. Paste it into your AI and get official-format task generation, grading, and an estimated STANAG level — all automated.',
      tasks_title: '📚 Three Supported Tasks',
      structure_label: 'Structure:',
      tasks: {
        email: {
          label: 'E-Mail',
          formality: 'Informal',
          words: '50–150 words',
          description:
            'Casual email to a friend: new job, leave, events. Contractions (I\'m, don\'t) OK.',
          structure: 'Greeting → Main message → Closing',
        },
        report: {
          label: 'Report',
          formality: 'Very Formal',
          words: '150–250 words',
          description:
            'Formal report to a superior. Written in a specific officer role. No contractions or casual language.',
          structure: 'Purpose → Background → Problem → Recommendation → Closing',
        },
        essay: {
          label: 'Essay',
          formality: 'Middle Formal',
          words: '250–500 words',
          description:
            'Analytical essay on a current topic. Balance pros and cons, then state your position in the conclusion.',
          structure: 'Introduction → Pros (2 points) → Cons (2 points) → Conclusion',
        },
      },
      steps_title: '🚀 How to Use (6 Steps)',
      steps: {
        s1_t: 'Open an AI chat',
        s1_b: 'Open one of the supported AI chats below. Start a fresh conversation.',
        s2_t: 'Copy the script',
        s2_b: 'Use the Copy button at the bottom of this page to copy the full script to your clipboard.',
        s3_t: 'Paste into the chat and send',
        s3_b:
          'Paste as the first message to the AI and send. The AI will present three task type options.',
        s4_t: 'Choose a task type',
        s4_b:
          'Reply with "E-Mail", "Report", or "Essay". The AI will generate a specific prompt.',
        s5_t: 'Write and submit',
        s5_b: 'Write within the word count target (time yourself), then send to the AI.',
        s6_t: 'Review the feedback',
        s6_b:
          'You\'ll get structured feedback: word count, structure, grammar, and estimated STANAG level.',
      },
      ai_title: '🤖 Supported AI Chats',
      ai_note:
        'Note: Account, terms of service, and pricing for each service are managed separately.',
      ai: {
        gemini: {
          name: 'Google Gemini',
          note: 'Free tier available. Natural Japanese feedback.',
        },
        claude: {
          name: 'Anthropic Claude',
          note: 'Strong at long-form structural analysis. Consistent feedback.',
        },
        chatgpt: {
          name: 'ChatGPT',
          note: 'Broad coverage of military topics. GPT-4 recommended.',
        },
      },
      script_title: '📋 AI Coach Prompt',
      script_show: 'Show full script',
      script_hide: 'Hide',
      script_copy: '📋 Copy script',
      script_copied: '✓ Copied',
      script_intro:
        'Paste this prompt as the FIRST message to your AI chat. The AI will understand its role as a JFLT writing examiner and present the three task options.',
      script_collapsed: 'The full prompt is about {len}k characters. Click "Show full script" to expand, or "Copy script" to send it to the clipboard.',
      copy_failed:
        'Failed to copy to clipboard. Please select and copy manually.',
      tips_title: '💡 Tips for Effective Practice',
      tips: [
        'Time yourself like the real exam (Report: 30 min / Essay: 60 min as a guideline).',
        'Write without dictionaries or translation tools first; lean on the AI feedback afterwards.',
        'Log AI feedback in a separate note (Notion / Obsidian etc.) — patterns of weakness will emerge.',
        'Retry the same topic 2 weeks later to measure objective improvement.',
        'For Report: integrating the SCENARIO DETAILS (role, location, headcount) into the body is a key grading point.',
        'For Essay: holding the Pros 2 / Cons 2 / Conclusion structure is the first step to a high-level score.',
      ],
      script_managed_at: 'The script body is managed in',
    },

    alerts: {
      confirm_reset_stats: 'Reset all statistics?',
      confirm_reset_category: 'Reset {label} records?',
    },
  },

  ja: {
    common: {
      back: '← 前へ',
      cancel: 'キャンセル',
      close: '✕ 閉じる',
      copy: 'コピー',
      copied: '✓ コピー完了',
      delete: '削除',
      next: '次へ →',
      ok: 'OK',
      reset: 'リセット',
      retry: '再試行',
      save: '💾 保存',
      saved: '✅ 保存しました',
      skip: 'スキップ →',
      yes: 'はい',
    },

    header: {
      brand: 'JFLT Training',
      author: 'by Oshibe',
      tagline: '350 questions · NATO English',
      footer: 'JFLT Training · React + Vite + Tailwind · Powered by Google Cloud TTS',
      langJA: 'JA',
      langEN: 'EN',
      langSwitch: '言語',
    },

    tabs: {
      questions: '問題',
      review: '復習',
      grading: '採点',
      writing: 'Writing',
      stats: '統計',
      updates: '更新',
      settings: '設定',
      past_exam: '過去問',
    },

    review: {
      title: '📚 復習',
      intro:
        'これまで解いた問題を一覧で振り返り、その場で再挑戦できます。不正解だった問題が上に表示されます。',
      filter_category: 'カテゴリ',
      filter_result: '結果',
      filter_all: 'すべて',
      filter_correct: '正解',
      filter_incorrect: '不正解',
      empty:
        'まだ解いた問題がありません。「問題」タブで練習を始めると、ここに表示されます。',
      empty_filtered: '条件に合致する問題はありません。',
      attempts_count: '{count}回挑戦',
      last_attempt: '最終: {date}',
    },

    changelog: {
      title: '📰 アップデート情報',
      intro:
        'これまでの変更点をまとめています。新しいものが上にきます。',
      empty: 'まだ更新情報はありません。',
      tags: {
        feature: '新機能',
        improvement: '改善',
        fix: '修正',
        style: 'デザイン',
      },
      entries: {
        topic_vocab_shuffle_all_2026_07: {
          title: '直前対策の全トピックをまとめてシャッフル練習',
          desc:
            '直前対策の専門語彙トレーナーに「全トピック（シャッフル）」を追加しました。クイズ・フリップカードどちらも、トピックごとではなく195語全部をまとめてシャッフルした状態で練習できます。',
        },
        flashcard_overlap_fix_2026_07: {
          title: 'フリップカードのボタン重なりを修正',
          desc:
            '端末によっては単語カードの単語テキストが音声再生ボタンやフラグボタンと重なって表示される問題がありました。ボタン類をカード上部の専用行に配置し、どの端末でも重ならないようにしました。',
        },
        topic_vocab_2026_07: {
          title: '専門語彙トレーナーを追加（90語）',
          desc:
            'JFLTレベル3のリスニングでよく出る3分野（条約の締結・NATO軍の展開・国際犯罪人引渡し、各30語）専用の入り口をVocab練習画面に追加しました。英→日の4択クイズ、または例文つきフリップカードのどちらかを選んで練習できます。',
        },
        past_exam_gate_2026_06: {
          title: '関係者限定の過去問エリアを追加（基盤のみ）',
          desc:
            '関係者限定の過去問リスニングエリアを追加しました。フッターの著作表記を 5 回クリックするとパスワードダイアログが表示され、解錠すると 🔒 過去問タブが出現します。問題データは動的読み込みのためメインバンドルには含まれません。⚠️ クライアントサイドの「目隠し」であり真の機密保護ではありません — DevTools が使える人はバンドルから内容を抽出可能です。信頼できる関係者間でのカジュアルなアクセス制限用途のみに使用してください。',
        },
        vocab_audio_2026_06: {
          title: 'Vocab: 出題単語の音声再生に対応',
          desc:
            'Vocab 練習問題に 🔊「単語を聞く」ボタンを追加しました（問題文内の \'…\' で囲まれた語を自動抽出して読み上げます）。綴り→意味だけでなく、音→意味の結びつきも訓練できるようになります。Listening と同じ Google TTS 声を使用。',
        },
        api_key_guide_2026_06: {
          title: 'Settings: APIキー取得の詳細手順カードを追加',
          desc:
            'APIキー入力欄の下に「🔑 APIキー取得手順を表示」ボタンを追加しました。クリックすると Google Cloud Console の各操作ページへの直リンク付きで、ステップごとに何をクリックすればよいかを示す詳細ガイドが展開します（プロジェクト作成 → TTS API 有効化 → 請求設定 → 認証情報作成 → キー制限まで）。Google Cloud に不慣れな方向け。',
        },
        vocab_diplomacy_added_2026_06: {
          title: 'Vocab: 外交・国際関係の語彙を 45 問追加',
          desc:
            '外交および国際関係分野の語彙問題を L2-L4 に各 15 問、計 45 問追加しました。テーマは UN 手続き（resolution / veto / signatory / accession）、条約法（jurisdiction / sovereignty / stipulate）、紛争解決（mediation / arbitration / ceasefire / embargo）、IR 理論（hegemony / multipolarity / revisionist / status quo / fait accompli / zero-sum）など。既存の NATO・軍事系語彙と補完し合うことで、STANAG 6001 の L3-L4 で想定される話題範囲（抽象的・政策的議論）により合致する語彙バンクになりました。',
        },
        vocab_jp_gloss_2026_06: {
          title: 'Vocab: 解説に日本語訳を追加',
          desc:
            'Vocab 問題の解説冒頭に 【意味】に続けて出題単語の日本語訳が表示されるようになりました。正答の選択肢を勘で当てたのか、実際に単語を知っていたのかをすぐ確認できます。L1〜L4 の全 185 問に適用。',
        },
        voice_picker_2026_06: {
          title: 'Settings に音声選択 UI + 料金表を追加',
          desc:
            '⚙️ Settings タブから Listening 用の男声・女声を個別に選択できるようになりました。Neural2 (デフォルト) / WaveNet / Studio (高品質・有料) の3ティアから選択可能、各候補に試聴ボタン付き。2人会話形式の問題では選択した男声・女声が自動的に使い分けられ、男女コントラストを維持します。料金カードでは無料枠と文字単価を表示し、Studio に切り替える前に月額コストを試算できます。',
        },
        listening_voice_swap_2026_06: {
          title: 'Listening: ナレーター声をより聞き取りやすく + 対話ラベルを読みやすく',
          desc:
            'Listening の単一ナレーター音声を en-GB-Neural2-B (英国男声) に変更しました — 検証の結果より発音が明瞭でした。対話形式の話者マーカーも "A:/B:" から "MAN:/WOMAN:" に改名し、設問文で "the man" / "the woman" と自然に参照できるようになりました。MAN ターンは男声、WOMAN ターンは en-GB-Neural2-A (英国女声) で読まれます。サンプルとして L3 Listening に対話形式問題を1問追加。',
        },
        listening_dialogue_2026_06: {
          title: 'Listening: 2人会話形式に対応',
          desc:
            'Listening の passage を 2 人の対話形式で作成できるようになりました。行頭が話者マーカーで始まる行は別々の英国英語ボイスで読み上げられ、ターン間に短いポーズが入ります。マーカーがない passage は従来通り単一ナレーターで読まれるため、既存問題に影響はありません。今後の Listening 問題作成では新形式を利用可能 — 記法詳細は PROMPTS.md を参照。',
        },
        header_desktop_fix_2026_06: {
          title: 'PC 表示でヘッダーが潰れていた問題を修正 + ロゴ更新',
          desc:
            'PC で開くと「JF...」「350 ...」のようにブランド名・タグラインが見切れていました。ヘッダー部分のコンテナ幅を 768px から 1024px に広げ、タブ・タイトル・言語切替が自然に収まるよう調整しました。あわせて、左上の仮ロゴ ("J" の青いグラデーション四角) を、新しい JFLT ラウンデルロゴ (ファビコンと同じデザイン) に置き換えました。',
        },
        favicon_added_2026_06: {
          title: 'ブラウザタブのアイコンを追加',
          desc:
            'ブラウザタブやブックマーク一覧でアプリを識別できるよう、JFLT ラウンデルのファビコンを追加しました。紺の円盤に黄色のリングと "JFLT" の文字 — 16 ピクセルまで縮小しても判読可能なデザインです。',
        },
        practice_random_order_2026_06: {
          title: '練習タブ: 出題順をランダム化',
          desc:
            '練習タブの出題順がデータセット固定順だったため、毎回同じ問題が最初に出る状態でした。練習開始時、およびカテゴリー・レベル変更時に問題順を毎回シャッフルするように変更しました。統計やレビューは内部 ID で各問題を識別しているため、表示順の変更による影響はありません。',
        },
        vocab_grammar_balanced_2026_06: {
          title: '語彙・文法: 答え記号と選択肢長を再バランス',
          desc:
            '推測されやすい 2 つの問題を修正しました。答え記号: VOCAB は B が 45% でしたが 25% に均等化、GRAMMAR は D が 0% でしたが 25% に。選択肢の長さ: VOCAB は正解が唯一の最長になっている問題が 69% でしたが 4% に、GRAMMAR は 37% から 2% に減少。短い不正解選択肢に中立的な修飾語を付加してから、レベル毎にラウンドロビンで再配置しました。解説中の選択肢記号参照も自動的に再マッピングされています。',
        },
        vocab_expanded_2026_06: {
          title: '語彙: 125 問追加 (60 → 185)',
          desc:
            '全 4 レベルで語彙問題を大幅拡充しました。L1 は基本的な軍事・日常語彙 37 問 (部隊単位、階級、号令、装備、AWOL/POW/KIA 等)。L2 は中級の作戦・手続き用語 38 問 (ambush, surveillance, doctrine, covert/overt, corroborate, authorize 等)。L3 は戦略・政策用語 38 問 (coercion, brinkmanship, containment, détente, polarization, ratify, promulgate 等)。L4 はフォーマル学術語彙 12 問 (attrition, cognizant, exigency, obviate, tacit, nascent, tantamount, corollary 等)。全問でプロトコル準拠: 正解の A/B/C/D ラウンドロビン、正解選択肢が唯一の最長にならない、既存トピックと重複なし。',
        },
        listening_l3_expanded: {
          title: 'Listening L3: 10 問追加 (25 → 35)',
          desc:
            'Listening L3 に 10 問を追加しました (Indo-Pacific 海洋作戦、北極安全保障、宇宙状況把握、防諜、統合防空、特殊作戦の経済性、危機広報、選挙介入対策、エネルギー安全保障、諸兵連合ドクトリン)。現行プロトコル準拠: 本文 ≤180 語、選択肢は本文表現の言い換え (verbatim 不可)、正解選択肢が唯一の最長にならないよう文字数調整。',
        },
        reading_length_bias: {
          title: 'Reading: 選択肢の文字数で正解がバレない様に修正',
          desc:
            '監査で「正解が唯一の最長選択肢」になっている問題が 44% (ランダム期待値 25%) と判明。特に L4 は 80%。これでは文字数で当てられてしまうため、22 問の短いひっかけ選択肢に意味を変えない修飾句を追加して延長。修正後は全体で 21% (L1=6%, L2=33%, L3=29%, L4=0%) となり、ランダム期待値を下回りました。',
        },
        reading_l3_trimmed: {
          title: 'Reading L3: 長文を短縮し、語彙を高度化',
          desc:
            'Reading L3 の 150 語超だった 11 問を全て ≤150 語に書き換えました。L3 らしい難易度を保つため、語彙をより抽象的・ラテン語系に上げ、ひっかけ選択肢を「もっともらしい誤読」に作り直しています。1問 2 分目安 (公式 Reading 120分/60問) で解ける文章量になります。',
        },
        listening_l3_paraphrased: {
          title: 'Listening L3: 選択肢に言い換えを導入',
          desc:
            'これまで Listening L3 は本文の表現をそのまま選択肢に使っていたため、キーワード一致だけで解けてしまいました。前半 15 問の正解選択肢を「言い換え」に書き換え、ひっかけ選択肢も近似誤読型に再設計しました。L2 や L3 後半と同じスタイルに揃えています。',
        },
        review_listening_audio: {
          title: '復習タブ: Listening 音声を再生可能に',
          desc:
            '復習タブの問題を展開すると 🔊 再生ボタンが表示されるようになりました。Listening は音声を聴き直せ、Reading は読み上げできます (採点モードと同じ Google Cloud TTS を使用)。',
        },
        grading_autosave_unmount: {
          title: '採点中に他タブへ移動しても進捗を自動保存',
          desc:
            '採点モードで試験中に他のタブへ切り替えたり、ブラウザを閉じても進捗が消えなくなりました。「一時停止」を押したときと同じ状態で自動保存され、次に採点タブを開くと「再開」バナーが表示されます。',
        },
        history_breakdown: {
          title: '受験履歴: セクション別の正答内訳を表示',
          desc:
            '採点履歴の各行をタップで展開できるようになりました。L1〜L4 のセクション別正答数・合格/+/未到達のステータス・所要時間が確認でき、SLP スコアだけでなく「どこで詰まったか」が分かるようになります。',
        },
        listening_audio_stop: {
          title: 'Listening: 次の問題に進むと前の音声を停止',
          desc:
            '採点モードで次の Listening 問題に進む際、前の問題の音声を確実に停止するようにしました。これまで前の音声が継続再生されていたため、「次の音声がすぐに鳴った」と感じる挙動になっていました。これで 5 秒のカウントダウン中は確実に無音になります。',
        },
        grading_timer_pause: {
          title: '採点モード: タイマー + 一時停止 / 再開',
          desc:
            '採点モードに経過時間の表示を追加しました (Reading は公式仕様の 120 分、Listening 60 分、Vocab/Grammar 30 分が目安)。テストを途中で一時停止して、後で同じ問題から再開できます。',
        },
        grading_short_passages: {
          title: '採点モード: 短い passage を優先出題',
          desc:
            '採点モードで問題を選ぶ際、Reading / Listening は短めの passage を優先的に選択するようにしました。これで制限時間内に終わりやすくなります。問題タブでは引き続き全問題 (長文含む) を練習できます — 長文は持久力訓練に有効なので残しています。',
        },
        answer_distribution: {
          title: '正解の A / B / C / D 分布を均等化',
          desc:
            'Reading / Listening でこれまで正解の 67% が B、D が一度も使われていなかったため「B にしておけば当たる」戦略が成立してしまっていました。各選択肢が約 25% ずつ正解になるよう並び替えました。問題文・本文・選択肢の文言・解説は一切変更されておらず、options 配列内の順序のみ変わっています。',
        },
        listening_countdown: {
          title: 'Listening: 音声再生前に 5 秒の読み取り時間',
          desc:
            '採点モードの Listening 問題で、音声が自動再生される前に 5 秒間の読み取り時間を設けました。質問と選択肢を先に確認できます。ボタンタップで即座に再生することも可能です。',
        },
        review_tab: {
          title: '復習タブを追加',
          desc:
            'これまで解いた問題を ○ / × の一覧で振り返り、その場で再挑戦できる「復習」タブを追加しました。',
        },
        updates_tab: {
          title: 'アップデート情報タブを追加',
          desc:
            'このタブです。GitHub を見に行かなくても、何が変わったかをアプリ内で確認できるようにしました。',
        },
        mobile_header: {
          title: 'スマホでのヘッダーレイアウト改善',
          desc:
            'スマートフォンではヘッダーを 2 行に分け、タブボタンをタップしやすくしました。デスクトップ表示は変更ありません。',
        },
        welcome_screen: {
          title: '問題タブにスタート画面を追加',
          desc:
            'アプリを開いてすぐに問題が表示されないように、スキル / レベル選択のスタート画面を挟みました。',
        },
        session_streak_fix: {
          title: '連続正解カウントが開くたびに 0 に',
          desc:
            'アプリを開いた瞬間の「連続正解」を 0 にリセットするようにしました。最高連続記録と累計の正解数は引き続き保持されます。',
        },
        bilingual_ui: {
          title: '英語 / 日本語の切替対応',
          desc:
            'UI を完全バイリンガル化。ブラウザ言語を自動検出し、ヘッダー右の JA / EN ボタンで切り替えられます。',
        },
        writing_tab: {
          title: 'Writing タブと AI 添削プロンプトを追加',
          desc:
            'Gemini / Claude / ChatGPT を JFLT 添削コーチに変身させるプロンプトを掲載。E-Mail / Report / Essay の課題生成と採点ができます。',
        },
        grading_mode: {
          title: '採点モード (JFLT 公式形式) を追加',
          desc:
            '15問×4セクションの適応進行で SLP スコアを算出する採点モードを新設。受験履歴も保存されます。',
        },
        l4_questions: {
          title: 'Level 4 問題セットを完成',
          desc:
            'Reading L4 / Listening L4 をそれぞれ 15 問に拡充。全レベルが JFLT 公式の 1 セクション分（15 問）以上になりました。',
        },
        expanded_questions: {
          title: '問題数の大幅増加',
          desc:
            'Reading / Listening の問題数を大きく増やしました（現在 L1-L4 合計で 140 / 90 問）。',
        },
        initial_release: {
          title: '初回リリース',
          desc:
            'JFLT Training 公開。Reading / Listening / Vocab / Grammar の 4 カテゴリ、統計記録、Google Cloud TTS による音声再生を実装。',
        },
      },
    },

    welcome: {
      title: '自由練習モード',
      body:
        'スキルとレベルを選んで自由に練習できます。正解は累計の統計に記録されます。公式形式で実力測定したい場合は「採点」タブをご利用ください。',
      pick_skill: 'スキルを選択',
      pick_level: 'レベルを選択',
      level_all: 'ALL（全レベル）',
      level_one: 'Level {level}',
      level_count: '{count} 問',
      start: '▶️ 練習を開始',
      change: '⚙ スキル / レベルを変更',
      hint_grading_a: '公式形式の採点テストを受けたい場合は',
      hint_grading_b: '「採点」タブへ。',
    },

    levels: {
      label: 'Level:',
      all: 'ALL',
      progress: 'Q{current} / {total}',
      noQuestions: 'このレベルには問題がありません。',
    },

    card: {
      correct: '正解！',
      incorrect: '不正解 — 正解は {label}',
      readAloud: '読み上げ',
      playAudio: '音声を再生',
      hearWord: '単語を聞く',
      listenInstruction:
        '🔊 上の「音声を再生」ボタンで聴き取ってください。（採点後にスクリプトが表示されます）',
      next: '次へ →',
      skip: 'スキップ →',
      back: '← 前へ',
    },

    audio: {
      noKey: '設定タブで APIキーを入力してください',
      failed: '音声再生に失敗しました。APIキーを確認してください。',
      loading: '読み込み中...',
      play: '音声再生',
    },

    grading: {
      title: '🎖️ 採点モード — JFLT 公式形式',
      intro_p1: '実際の JFLT と同じ形式で実力を測定します。',
      intro_p2: '{questionsPerSection}問×{sections}セクション',
      intro_p3: 'を Level 1 から順に出題し、6問以下の正答でテスト終了。最終的に ',
      intro_p4: 'SLP スコア (例: 2+)',
      intro_p5: ' を算出します。',
      note_label: '注意:',
      note_no_back: '採点モード中は前の問題に戻れません',
      note_audio_once_a: 'Listening は音声が ',
      note_audio_once_b: '1 度だけ自動再生',
      note_audio_once_c: ' されます',
      note_reading_visible: 'Reading の本文はテスト中に表示されます (公式形式と同じ)',
      note_history: '結果はテスト終了時に表示・履歴保存されます',
      select_skill: '受験スキルを選択',
      api_warn:
        '⚠️ Listening は API キー未設定でも受験可能ですが、音声は再生されません。先に「設定」タブで Google Cloud TTS の API キーを登録することを推奨します。',
      start: '▶️ 採点モードを開始',
      history_title: '📜 受験履歴',
      history_clear: '履歴を削除',
      history_empty: 'まだ受験履歴がありません。',
      history_total_correct: '合計正解数: {correct} / {total}',
      load_failed: '問題の読み込みに失敗しました。トップに戻ってください。',
      go_back: '戻る',
      section_label: 'Section {current} / {total}',
      progress_count: '{current} / {total}',
      abort: '中断',
      pause: '一時停止',
      timer_label: '経過',
      time_target: '目安: 約 {min} 分',
      note_pause: 'テスト途中で一時停止して、後で同じ場所から再開できます。',
      confirm_abort: 'テストを中断します。記録は保存されません。',
      confirm_pause:
        'テストを一時停止して進捗を保存しますか？同じ場所から再開できます。',
      confirm_discard: '保存されたテストを破棄して、新規に開始しますか？',
      confirm_clear_history: '採点履歴をすべて削除しますか？',
      resume_title: '⏸ 中断中のテストを再開しますか？',
      resume_body:
        '{date} に一時停止した {skill} のテストがあります。現在: Section {section}、問題 {question}、経過時間 {elapsed}。',
      resume_btn: '▶ 再開',
      discard_btn: '🗑 破棄',
    },

    pq: {
      section_badge: 'Section {level} (Level {level})',
      q_progress: 'Q{current} / {total}',
      listen_instruction:
        '🎧 音声を聴いて回答してください。スクリプトはテスト終了後のレビューで確認できます。',
      listen_no_key:
        '⚠️ APIキー未設定のため音声再生は行われません。設定タブで登録してください。',
      audio_once_tooltip: '一度だけ再生されます (公式仕様)',
      audio_loading: '読み込み中',
      audio_played: '再生済み',
      audio_failed: '再生失敗 (再試行)',
      audio_play: '再生',
      audio_read: '読み上げ',
      audio_waiting: 'あと {count} 秒で自動再生 (タップで即再生)',
      select_prompt: '回答を選択してください',
      answered: '回答済み',
      next_question: '次の問題 →',
      complete_section: 'セクション完了 →',
    },

    pr: {
      slp_title: 'JFLT SLP',
      duration: '所要時間 {duration}',
      review: 'レビュー',
      rules_title: '📐 採点ルール (15問中)',
      rule_pass_a: 'そのレベル合格 → 上位セクションへ進める',
      rule_half_a: '前のレベル + 「+」(テスト終了)',
      rule_fail_a: '前のレベル (テスト終了)',
      restart: '🔄 もう一度受験',
      exit: '🏠 トップへ戻る',
      section_review_title: '📝 Section {level} レビュー ({correct}/{total})',
      show_passage: '本文を表示',
      your_answer: '(あなたの回答)',
      correct_mark: '✓',
      status: {
        pass: '合格',
        half: '+',
        fail: '未到達',
        untested: '未挑戦',
      },
      duration_format: '{m}分{s}秒',
    },

    stats: {
      summary: {
        overall_jflt: '総合 JFLT',
        overall_sub: '4セクションの最低値',
        correct_total: '正解 / 全問',
        correct_total_sub: '正解率 {pct}%',
        streak: '連続正解',
        streak_sub: '最高 {best}',
      },
      rules_title: '📐 採点基準',
      rule_pass: '：そのレベルの評価が付与され、上位レベルへ進む',
      rule_half: '：前のレベルに「+」が付く（例: L2で7-9問→ 1+）',
      rule_fail: '：前のレベルが付与される（例: L2で6問以下→ 1）',
      rules_note:
        '総合 JFLT は 4セクションの最低値です（全セクションで一定レベルを満たす必要あり）。',
      reset_title: '統計のリセット',
      reset_body:
        '全セクションの記録を削除して、最初から学習し直すことができます。',
      reset_btn: '🗑️ 全統計をリセット',
      reset_section: 'このセクションをリセット',
      confirm_reset_all: '統計をリセットしますか？',
      confirm_reset_section: '{label} の記録をリセットしますか？',
      level: 'L{lv}',
      score_progress: '{correct} / {total}',
      remaining: 'あと {remaining} 問正解で合格 (基準 {pass} / +付 {half})',
      jflt_label: 'JFLT',
      accuracy_pct: '正解率',
      attempts: '解いた問題数: {count} 問',
    },

    settings: {
      api_title: '🔑 Google Cloud APIキー',
      api_body:
        '音声再生（Text-to-Speech）のためのAPIキーを入力してください。キーは ブラウザの LocalStorage に保存され、外部サーバーに送られることはありません。',
      api_label: 'APIキー',
      placeholder: 'AIza...',
      show: '表示',
      hide: '隠す',
      save: '💾 保存',
      test: '🔊 テスト音声を再生',
      testing: '⏳ 再生中...',
      clear: '🗑️ APIキーを削除',
      saved_msg: '✅ 保存しました。',
      test_no_key: '⚠️ 先にAPIキーを入力してください。',
      test_ok: '✅ 再生に成功しました。',
      test_fail: '❌ 再生に失敗: {error}',
      current_key: '現在のキー:',
      guide_title: '📘 セットアップガイド',
      guide_step1_a: '',
      guide_step1_b: 'Google Cloud Console',
      guide_step1_c: ' にアクセスし、プロジェクトを作成（または選択）します。',
      guide_step2:
        '「APIとサービス」→「ライブラリ」から Cloud Text-to-Speech API を有効化します。',
      guide_step3: '「APIとサービス」→「認証情報」で APIキー を作成します。',
      guide_step4:
        '（推奨）作成したキーに HTTP リファラ制限を設定し、不正利用を防ぎます。',
      guide_step5: 'キーをコピーし、上の入力欄に貼り付けて「保存」を押します。',
      guide_step6: '「テスト音声を再生」で動作確認をします。',
      warn_shared:
        '⚠️ APIキーはブラウザ内にのみ保存されます。共有端末では使用後に「APIキーを削除」を押してください。',
      audio_title: 'ℹ️ 音声について',
      audio_use: 'Reading / Listening 問題の本文を読み上げます。',
      audio_cost:
        'Neural2 / WaveNet 声は Google Cloud TTS の無料枠の範囲内なら無料です。',
      get_key_button: '🔑 APIキー取得手順を表示',
      hide_key_button: '🔼 手順を閉じる',
      kg_title: '📘 Google Cloud TTS APIキーの取得手順',
      kg_duration: '所要 約 5 分',
      kg_intro:
        '以下の各リンクをクリックすると、Google Cloud Console の該当ページが新しいタブで開きます。最後にこのページに戻ってキーを貼り付けてください。',
      kg_step1_title: 'Step 1: Google アカウントでログイン',
      kg_step1_body:
        'Gmail と同じ Google アカウントでログイン。アカウントを持っていなければ無料で作成可能です。',
      kg_step1_link: 'console.cloud.google.com を開く',
      kg_step2_title: 'Step 2: プロジェクトを作成',
      kg_step2_body:
        '画面上部のプロジェクトセレクタ（"Google Cloud" ロゴの右隣）をクリック →「新しいプロジェクト」→ 名前（例: jflt-tts）→「作成」。30秒ほど待ってから、新しいプロジェクトが選択されていることを確認してください。',
      kg_step3_title: 'Step 3: Text-to-Speech API を有効化',
      kg_step3_body:
        '下のリンクから API ライブラリページを開き、青い「有効にする」ボタンをクリック。「API は有効です」と表示されるまで待ってください。',
      kg_step3_link: 'TTS API ライブラリページを開く',
      kg_step4_title: 'Step 4: 課金設定（必須・無料枠あり）',
      kg_step4_body:
        'Google は無料枠の使用でも請求先アカウントの登録を要求します。下のリンクから請求先設定を開き、クレジットカードを登録して作成したプロジェクトに紐付けてください。',
      kg_step4_link: '請求先アカウント設定を開く',
      kg_step4_note:
        '💡 Neural2 / WaveNet 声は月 100 万文字まで無料。通常の練習使用範囲内なら実際の課金は発生しません。',
      kg_step5_title: 'Step 5: APIキーを作成',
      kg_step5_body:
        '下のリンクから認証情報ページを開き、上部の「+ 認証情報を作成」→「APIキー」を選択。ポップアップに「AIza...」で始まるキーが表示されるのでコピーしてください。',
      kg_step5_link: '認証情報ページを開く',
      kg_step6_title: 'Step 6（推奨）: キーを制限',
      kg_step6_body:
        'Step 5 のポップアップ内の「鍵を制限する」をクリック。「アプリケーションの制限」→「HTTP リファラー」を選択 → 下記の URL を許可リファラーとして追加。「API の制限」→「キーを制限」→「Cloud Text-to-Speech API」のみを選択 →「保存」。これで他人があなたのキーを悪用できなくなります。',
      kg_step6_referrers_label: '許可リファラーに追加する URL:',
      kg_step7_title: 'Step 7: 本アプリに貼り付け',
      kg_step7_body:
        'この Settings タブに戻り、コピーしたキーを上の入力欄に貼り付け →「保存」→「テスト音声を再生」で動作確認をしてください。',
      kg_outro:
        '完了です！ 再生が失敗する場合は (1) API ライブラリで「有効」と表示されているか、(2) 同じプロジェクトに請求先が紐付いているか、(3) リファラー制限にこのページの URL が含まれているか を順に確認してください。',
      voice_title: '🎙️ 音声選択',
      voice_body:
        '男声と女声をそれぞれ選択してください。単独ナレーターは「デフォルト性別」の声で読まれ、2人会話問題は両方の声を使用します (MAN: → 男声、WOMAN: → 女声)。',
      voice_male: '男声',
      voice_female: '女声',
      voice_male_short: '男声',
      voice_female_short: '女声',
      voice_preview: '試聴',
      voice_default_gender: 'デフォルトナレーター（単独話者の問題）',
      voice_default_hint:
        '2人会話形式の問題はこの設定に関わらず常に男声＋女声の両方を使用します。',
      pricing_title: '💰 Google Cloud TTS 料金',
      pricing_body:
        '料金はあなたの API キーに対して Google から直接請求されます (文字数課金)。無料枠は毎月リセット。',
      pricing_col_tier: 'ティア',
      pricing_col_free: '無料枠 / 月',
      pricing_col_rate: '超過分',
      pricing_free_neural: '100万文字',
      pricing_rate_neural: '$16 / 100万文字',
      pricing_free_studio: '10万文字',
      pricing_rate_studio: '$160 / 100万文字',
      pricing_example_title: '使用量の目安',
      pricing_example_basis:
        '中程度の passage ≈ 800 文字。月300問再生すると ≈ 24万文字。',
      pricing_example_neural:
        'Neural2 / WaveNet → 無料枠内 → $0/月。',
      pricing_example_studio:
        'Studio → 課金14万文字 → 約 $22/月。音質は明確に向上しますが予算注意。',
      pricing_source:
        '料金は 2026 年時点の参考値。最新の料金は cloud.google.com/text-to-speech/pricing を確認してください。',
    },

    pastExam: {
      gate_title: '関係者専用エリア',
      gate_body:
        'このエリアは関係者限定の参考資料を含みます。続行するには解錠パスワードを入力してください。',
      gate_placeholder: 'パスワード',
      gate_submit: '解錠',
      gate_cancel: 'キャンセル',
      wrong_password: 'パスワードが違います。',
      panel_title: '過去問・参考資料',
      panel_subtitle: '関係者限定コンテンツ — 関係者以外への共有禁止。',
      lock_button: 'ロック',
      badge: '過去問',
      loading: '関係者限定コンテンツを読み込み中…',
      load_failed: '過去問データの読み込みに失敗',
      empty:
        '過去問データはまだ追加されていません。src/past-exam-data.js に問題を貼り付けてください。',
      filter_all: 'すべて',
      level_label: 'レベル',
      starred_badge: '★ 本番頻出',
      level_empty: 'このレベルの問題はまだありません。',
    },

    topicVocab: {
      entry_badge: '直前対策',
      entry_button: '外交・NATO・引渡し語彙＋もっと（195語）',
      entry_subtitle: '本番前にチェックしておきたい専門語彙',
      hub_title: '専門語彙 — L3リスニング頻出',
      hub_body:
        'JFLTレベル3のリスニングでよく出る分野：条約の締結、NATO軍の展開、国際犯罪人引渡し、そして幅広い重要単語パック。',
      all_topics_title: '全トピック（シャッフル）',
      all_topics_subtitle: 'すべてのパックを合わせて1つのシャッフル練習にできます',
      word_count: '{count}語',
      mode_quiz_title: 'クイズ（英→日）',
      mode_quiz_body: '英単語を見て、正しい日本語の意味を4択から選びます。',
      mode_flash_title: 'フリップカード',
      mode_flash_body: '英単語と日本語訳をめくって確認、例文つき。',
      exit_button: '✕ 終了',
      quiz_prompt: 'この単語の意味は？',
      score: 'スコア：{correct} / {total}',
      reshuffle: 'シャッフル',
      flash_front_hint: 'タップして意味を表示',
      flash_back_hint: 'タップして裏返す',
      mark_button: '覚えてない単語としてマーク',
      unmark_button: 'マークを解除',
      marked_count: '{count}語マーク済み',
      marked_only_toggle: 'マークした単語だけで練習する（{count}語）',
      marked_empty: 'このトピックにはまだマークした単語がありません。',
    },

    writing: {
      header_title: '✍️ Writing 練習 — AI 添削スクリプト',
      header_body:
        'JFLT Writing は 3 名以上の試験官による定性評価が行われます。自宅で同等のフィードバックを得るのは難しい — そこで、汎用 AI チャット (Gemini / Claude / ChatGPT) を JFLT 専用の添削コーチに変身させるプロンプトを用意しました。AI に貼り付けるだけで、公式形式の課題生成 → 添削 → 推定 STANAG レベル評価 まで自動化できます。',
      tasks_title: '📚 対応する 3 つのタスク',
      structure_label: '構造:',
      tasks: {
        email: {
          label: 'E-Mail',
          formality: 'Informal',
          words: '50–150 words',
          description:
            '友人宛のカジュアルなメール。新しい仕事、休暇、出来事の報告など。短縮形 (I\'m, don\'t) OK。',
          structure: 'Greeting → Main message → Closing',
        },
        report: {
          label: 'Report',
          formality: 'Very Formal',
          words: '150–250 words',
          description:
            '上官への正式な報告書。安全管理者・広報官など特定の役職で書く。短縮形・口語表現は不可。',
          structure: 'Purpose → Background → Problem → Recommendation → Closing',
        },
        essay: {
          label: 'Essay',
          formality: 'Middle Formal',
          words: '250–500 words',
          description:
            '時事的トピックに対する論理的なエッセイ。賛否両論をバランスよく分析し、最後に立場を表明する。',
          structure: 'Introduction → Pros (2 points) → Cons (2 points) → Conclusion',
        },
      },
      steps_title: '🚀 使い方 (6 ステップ)',
      steps: {
        s1_t: 'AI チャットを開く',
        s1_b: '下記の対応 AI のいずれかを開きます。新しいチャット (会話) を始めてください。',
        s2_t: 'スクリプトをコピー',
        s2_b: 'このページ下部の「コピー」ボタンでスクリプト全文をクリップボードに取得します。',
        s3_t: 'チャット欄に貼り付けて送信',
        s3_b: 'AI への 最初のメッセージ として貼り付け → 送信。AI は 3 つのタスクタイプを提示してきます。',
        s4_t: 'タスクタイプを選ぶ',
        s4_b: '「E-Mail」「Report」「Essay」のいずれかを返信。AI が具体的な課題を生成します。',
        s5_t: '自分で書いて送信',
        s5_b: '時間を測りながら、語数制限内で書き上げて AI に送信。',
        s6_t: 'フィードバックを確認',
        s6_b: '語数 / 構造 / 文法 / 推定 STANAG レベルを構造化された形で評価してくれます。',
      },
      ai_title: '🤖 対応 AI チャット',
      ai_note:
        '※ 各サービスのアカウント・利用規約・料金体系はそれぞれ別途確認してください。',
      ai: {
        gemini: {
          name: 'Google Gemini',
          note: '無料枠あり。日本語フィードバックが自然。',
        },
        claude: {
          name: 'Anthropic Claude',
          note: '長文の構造分析に強い。フィードバックの一貫性が高い。',
        },
        chatgpt: {
          name: 'ChatGPT',
          note: '幅広い軍事トピックをカバー。GPT-4 推奨。',
        },
      },
      script_title: '📋 添削コーチ用プロンプト',
      script_show: '全文を表示',
      script_hide: '隠す',
      script_copy: '📋 スクリプトをコピー',
      script_copied: '✓ コピー完了',
      script_intro:
        'このプロンプトを AI チャットの 最初のメッセージ として貼り付けて送信してください。AI が JFLT writing examiner として自分の役割を理解し、3 つのタスク選択肢を提示してきます。',
      script_collapsed:
        'プロンプト全文は約 {len}k 文字あります。「全文を表示」で展開、または「スクリプトをコピー」でクリップボードへ。',
      copy_failed:
        'クリップボードへのコピーに失敗しました。手動で選択 → コピーしてください。',
      tips_title: '💡 効果的な使い方のコツ',
      tips: [
        '本番と同じく時間を計りましょう (Report 30分 / Essay 60分 が目安)',
        '辞書・翻訳ツールは使わずにまず書き切る。後で AI のフィードバックで補強する。',
        'フィードバック内容は別ノート (Notion / Obsidian 等) に記録すると、自分の弱点パターンが見えてきます',
        '同じトピックを 2 週間後に再挑戦すると、改善度合いが客観的にわかる',
        'Report は SCENARIO DETAILS の役職・場所・人数を本文に組み込めているかが評価ポイント',
        'Essay は Pros 2 点 + Cons 2 点 + 結論 という構造を守ることがハイレベル評価の第一歩',
      ],
      script_managed_at: 'スクリプト本体は',
    },

    alerts: {
      confirm_reset_stats: '統計をリセットしますか？',
      confirm_reset_category: '{label} の記録をリセットしますか？',
    },
  },
};

export const LANGUAGES = ['en', 'ja'];
export const DEFAULT_LANG = 'en';

/**
 * Detect the initial language: persisted choice → browser language → default.
 */
export function detectInitialLanguage() {
  try {
    const stored = localStorage.getItem('jflt_lang');
    if (stored === 'en' || stored === 'ja') return stored;
  } catch (e) {
    // ignore
  }
  if (typeof navigator !== 'undefined') {
    const browserLang = (navigator.language || 'en').toLowerCase();
    if (browserLang.startsWith('ja')) return 'ja';
  }
  return DEFAULT_LANG;
}
