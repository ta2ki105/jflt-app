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
      audio_voice: 'Voice: ',
      audio_voice_code: 'en-GB-Neural2-A',
      audio_voice_suffix: ' (British English).',
      audio_use: 'Reads aloud Reading and Listening passages.',
      audio_cost:
        'Free within Google Cloud TTS\'s monthly free tier (1,000,000 characters).',
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
      audio_voice: '音声は ',
      audio_voice_code: 'en-GB-Neural2-A',
      audio_voice_suffix: ' (en-GB / British English) を使用します。',
      audio_use: 'Reading / Listening 問題の本文を読み上げます。',
      audio_cost:
        '料金は Google Cloud TTS の無料枠（毎月100万文字）の範囲内なら無料です。',
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
