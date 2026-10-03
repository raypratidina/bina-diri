# Bina Diri MVP 1 — Complete Codex Handoff

Version: 1.0 · 3 October 2026

## 0. How to use this document

This file is a self-contained product and implementation handoff. The receiving Codex thread does not need access to the earlier ChatGPT conversation. All product decisions needed for the MVP are included below.

**Current execution scope: implement Stage 1 only, then stop for user review.** The full MVP specification is included to keep the foundation compatible with later stages. A complete specification is not permission to implement every stage immediately.

User-facing UI and implementation summaries must be in Indonesian. Code identifiers may use English.

Paste this instruction when attaching this file to Codex:

> Read BINA_DIRI_CODEX_HANDOFF.md completely. Treat it as the product specification for Bina Diri MVP 1. Inspect the active workspace and any applicable AGENTS.md first. Report the actual project path and a concise implementation plan, then implement Stage 1 as defined in section 2. Preserve existing work. Do not implement the complete learning or quiz flows yet. Verify the build, navigation, responsive layout, and keyboard access; report what passed and what could not be verified. Give me the local run commands or an available preview, then stop for my review. Do not assume access to the earlier ChatGPT project or its files.

### Workspace boundary

- This document transfers requirements, not source code or a live project folder.
- The previous conversation reported an empty workspace with no app setup. That is historical context, not evidence about the workspace you are now using.
- Inspect the actual working directory, repository status, package manifests, source tree, assets, and applicable instructions before editing.
- If the current workspace is empty, initialize the project there. If it contains this handoff alone, that is also a valid starting point.
- If a relevant application already exists, preserve its useful structure and adapt incrementally.
- If only an unrelated project exists and the intended destination is unclear, ask for the target folder before scaffolding into it. Do not overwrite unrelated work or invent a connection to another workspace.
- Do not create a new hosted project, publish, or deploy in this stage. Local development and review are the requested outcome.
- Do not claim a successful test, design inspection, font download, or preview unless it actually happened.

## 1. Product definition and boundaries

Bina Diri is a responsive web educational game for children aged 6–12 with intellectual disabilities. It teaches five self-care activities through simple illustrations and short instructions, then reinforces recognition through a fixed ten-question image quiz with immediate feedback and retries.

Parents, teachers, or caregivers may help the child. Do not implement separate assisted and independent modes.

Core principle: **visual explains, text reinforces**. Keep one clear action per screen, simple language, predictable navigation, large controls, and a calm layout.

The only main features are **Materi** and **Kuis**.

Explicitly out of scope for every MVP 1 stage:

- Audio or speech, including narration and sound effects.
- Login, registration, accounts, profiles, authentication.
- Backend, database, APIs, CMS, dashboard, cloud storage.
- Saved progress, history, analytics, achievements.
- Scores, leaderboard, timer, lives, penalties.
- Expression Reader, webcam, face analysis.
- Complex animation, detailed final illustration production.

No localStorage, sessionStorage, cookies, database, or cloud persistence for progress. State exists only in memory. For a predictable MVP, a full refresh starts at Home with fresh session state.

## 2. Execution stages and review boundary

### Stage 1 — Authorized first implementation

1. Audit the active workspace; briefly report the path, existing structure, and plan.
2. Set up React + Vite + TypeScript, Tailwind CSS, React Router, Lucide React.
3. Set up centralized Toonkit-style tokens, Fredoka and Nunito, layout, focus, and button interaction styles.
4. Build reusable Button, IconButton, PageHeader, ActivityCard, IllustrationContainer, and simple loading/error/placeholder patterns needed by this stage.
5. Implement Home with two clear choices: Materi and Kuis.
6. Implement the Material List with five activity cards and their assigned colors.
7. Use low-detail, representative, reusable assets. Artwork must not hold up the foundation.
8. Make Home → Materi → Material List work. Each activity card opens a clear temporary destination identifying the selected activity with a working return action. Home → Kuis opens a clear quiz placeholder with a working return action.
9. Do not show working-looking learning/quiz controls that silently do nothing. Placeholder copy may say “Materi ini sedang disiapkan.” or “Kuis sedang disiapkan.” Keep implementation jargon out of the child-facing UI.
10. Verify build, navigation, keyboard/focus, and widths 320, 390, 768, 1440px where tooling permits.
11. Provide the implementation summary, actual verification results, remaining work, and exact run commands/preview.
12. **Stop for review. Do not implement Stage 2 or Stage 3 automatically.**

Stage 1 completion means a runnable, responsive foundation with usable navigation and an inspectable visual direction. It does not mean the full MVP is complete.

### Stage 2 — After user authorization

Implement five materials × six steps, intro/completion, progress, navigation, rapid-tap protection, and learning image fallbacks using the approved foundation.

### Stage 3 — After user authorization

Implement the fixed quiz bank, quiz state/feedback, image readiness and retry handling, exit confirmation, completion and replay. Verify the full MVP flows.

### Stage 4 — Final MVP verification

Review the full acceptance checklist. Fix concrete issues, keep placeholder art replaceable, and document remaining limitations. Final artwork is a later phase, not a release prerequisite for this MVP.

## 3. Technical architecture

Required stack: React, Vite, TypeScript, Tailwind CSS, React Router, Lucide React.

Use React local state. Context only when sharing state is necessary. Do not introduce Redux, Zustand, GraphQL, Prisma, Supabase, authentication infrastructure, backend APIs, or speculative abstractions.

Keep content, logic, UI, and tokens separate. Use compatible package versions and the existing package manager/lockfile when present. Document actual installed versions; this brief does not pin versions.

Suggested structure (adapt to useful existing conventions):

```text
src/
  app/
    App.tsx
    router.tsx
  components/
  features/
    materials/
    quiz/
  data/
    materials.ts
    quiz.ts
  types/
  hooks/
  styles/
  utils/
public/
  assets/
    illustrations/
      activities/
      materials/
      objects/
      quiz/
      system/
```

Do not create empty abstractions purely to fill this structure. Do not create separate page components for each step or question. Use shared templates driven by data. No /api/materials or /api/quiz.

Recommended routes:

| Route | Screen |
|---|---|
| `/` | Home |
| `/materials` | Material List |
| `/materials/:materialId` | Material Intro; temporary destination in Stage 1 |
| `/materials/:materialId/learn` | Material Learn |
| `/materials/:materialId/complete` | Material Completion |
| `/quiz` | Quiz Intro; placeholder in Stage 1 |
| `/quiz/play` | Quiz Play |
| `/quiz/complete` | Quiz Completion |

Use state for material steps, not separate routes per step. Invalid paths need a safe return path. Invalid material IDs show “Materi tidak ditemukan.” with “Kembali ke Materi”. Later stages should guard completion screens against an invalid session. Full reload returns Home; in-session invalid IDs still use the material error state.

## 4. Design foundation

Reference supplied by the user:

https://www.figma.com/design/xue3V7CP24NSE3nIYOVC3k/Design-System-Toonkit?node-id=9-2

This is a reference link, not an exported design library. No Figma asset export is bundled with this handoff. Inspect it if access is available. If inaccessible, use the confirmed tokens below and explicitly document provisional missing colors; do not claim exact Toonkit matching.

Visual language: playful, rounded, bold outlines, hard offset shadows, chunky controls, bright accents, clear hierarchy, uncluttered screens. Avoid a dense dashboard or complex navbar.

### Confirmed tokens

| Token | Value |
|---|---|
| Ink | `#211D2B` |
| Surface | `#FFFFFF` |
| Pink | `#FF99C2` |
| Mint | `#81E4B9` |
| Yellow | `#FFDF57` |
| Default border | 2px |
| Heavy border | 4px |
| Radius md | 12px |
| Radius xl | 24px |
| Radius full | 9999px |
| Medium shadow | 4px hard offset |
| Large shadow | 8px hard offset |
| Spacing scale | 4, 8, 12, 16, 24, 32, 48, 64, 96px |

Blue, Purple, and Red exact values were not included in the available handoff. Prefer the actual Toonkit equivalents when accessible. Otherwise choose readable provisional tokens centrally and disclose them for review. Do not block implementation solely on these missing values.

Activity mapping:

| ID | Title | Theme |
|---|---|---|
| tooth-brushing | Menggosok Gigi | Pink |
| bathing | Mandi | Blue |
| dressing | Memakai Baju | Mint |
| eating | Makan Sendiri | Yellow |
| shoes | Memakai Sepatu | Purple |

Use an illustration and title alongside color; color is never the only identifying cue.

### Typography

- Fredoka: display, page titles, quiz questions, activity titles, celebration headings.
- Nunito: body, labels, buttons, helper text.
- Define consistent roles: display, heading-lg, heading-md, body-lg, body-md, label-lg, caption.
- Choose a small readable responsive type scale during foundation work; do not scatter arbitrary font sizes across pages.
- Load fonts through an available legitimate source and supply readable fallbacks. If fetching is blocked, report that limitation rather than claiming the fonts are loaded.

### Responsive layout

| Width | Requirements |
|---|---|
| 320px | 16px page margin, single column, no horizontal overflow |
| 390px | Single column, large controls and legible instructions |
| 768px | Activity cards may use 2 columns; quiz may use 3 if readable |
| 1440px | Max outer container about 1280px; focused learning content about 800–900px |

Mobile quiz answers stack vertically. Desktop answers may form a three-column row. Do not shrink cards just to retain three columns on mobile. Learning illustrations remain visually dominant.

Primary controls: minimum 56px height. Icon-button hit area: minimum 48×48px. Tap/click is the only required interaction; no swipe, drag, long press, or double-click.

Default controls have a visible hard shadow. On press, move the control toward the shadow and reduce the offset. Keep motion around 150–250ms. Limit animations to press, hover, feedback, and simple transitions. Respect reduced-motion preferences. No constant bouncing, moving backgrounds, parallax, or elaborate sequences.

## 5. Screen templates and components

Screens: Home; Material List; Material Intro; Material Learn; Material Completion; Quiz Intro; Quiz Play; Quiz Completion; Confirmation Dialog; Loading State; Error State.

Reusable components across the completed MVP:

- Button: Primary/Secondary; default, hover, pressed, focus, disabled.
- IconButton: Back/Close, meaningful accessible name.
- PageHeader: consistent title and navigation.
- ProgressIndicator: textual count, e.g. “1 dari 6”; never percentages.
- ActivityCard: illustration + title, entire card interactive.
- QuizAnswerCard: default, hover, pressed, focus, incorrect, correct, locked/disabled.
- IllustrationContainer: stable dimensions, src/alt inputs, replacement-independent layout.
- QuizFeedback: icon + text, not color alone.
- CompletionScreen: reusable heading, illustration, description, actions.
- ConfirmationDialog: focus handling and safe actions.
- LoadingState and ErrorState.

## 6. Materials — exact content

All materials have Intro → six steps → Completion. Content must be data-driven.

### Menggosok Gigi

Intro: **Yuk, belajar menggosok gigi!**

1. Ambil sikat gigi.
2. Beri pasta gigi pada sikat.
3. Sikat gigi bagian depan.
4. Sikat gigi bagian kanan dan kiri.
5. Berkumur dengan air.
6. Bersihkan sikat gigi.

Completion: **Hebat! Kamu sudah belajar menggosok gigi.**

### Mandi

Intro: **Yuk, belajar mandi!**

1. Basahi tubuh dengan air.
2. Gunakan sabun.
3. Gosok seluruh tubuh.
4. Bilas tubuh dengan air.
5. Keringkan tubuh dengan handuk.
6. Pakai baju bersih.

Completion: **Hebat! Kamu sudah belajar mandi.**

### Memakai Baju

Intro: **Yuk, belajar memakai baju!**

1. Ambil baju yang bersih.
2. Masukkan kepala ke lubang baju.
3. Masukkan tangan kanan.
4. Masukkan tangan kiri.
5. Tarik baju sampai rapi.
6. Rapikan pakaianmu.

Completion: **Hebat! Kamu sudah belajar memakai baju.**

Use a simple t-shirt, not button-up clothing or buttoning interaction.

### Makan Sendiri

Intro: **Yuk, belajar makan sendiri!**

1. Cuci tangan sebelum makan.
2. Duduk dengan rapi.
3. Ambil makanan dengan sendok.
4. Masukkan makanan ke mulut.
5. Kunyah makanan perlahan.
6. Rapikan setelah selesai makan.

Completion: **Hebat! Kamu sudah belajar makan sendiri.**

### Memakai Sepatu

Intro: **Yuk, belajar memakai sepatu!**

1. Ambil sepatumu.
2. Duduk dengan rapi.
3. Masukkan kaki kanan.
4. Masukkan kaki kiri.
5. Pasangkan sepatu dengan benar.
6. Rapikan sepatumu.

Completion: **Hebat! Kamu sudah belajar memakai sepatu.**

Use slip-on or velcro shoes. No shoelace-tying interaction.

### Material types

```ts
export type ActivityTheme = 'pink' | 'blue' | 'mint' | 'yellow' | 'purple';

export interface MaterialStep {
  id: string;
  text: string;
  image: string;
}

export interface Material {
  id: string;
  title: string;
  theme: ActivityTheme;
  intro: { text: string; image: string };
  steps: MaterialStep[];
  completion: { text: string; image: string };
}
```

An optional descriptive image-alt field is acceptable when instruction text does not adequately describe the illustration. Do not add audio, score, or persistence fields.

### Material navigation

| Current screen | Back | Forward/action |
|---|---|---|
| Intro | Material List | Mulai → Step 1 |
| Step 1 | Intro | Lanjut → Step 2 |
| Steps 2–5 | Previous step | Lanjut → next step |
| Step 6 | Step 5 | Lanjut → Completion |
| Completion | Explicit completion actions | Pilih Materi Lain → list; Kembali ke Beranda → Home |

State can be a bounded currentStepIndex initialized to 0. Progress is “1 dari 6” through “6 dari 6”. Revisiting a material starts a fresh learning flow. Guard rapid taps so one intended progression cannot skip steps.

## 7. Quiz bank

Ten fixed questions, in the exact order below. Two per material. Three image options each, exactly one correct answer. No randomization, score, timer, or lives.

Questions are approved wording. The concrete distractor choices and answer positions below are a handoff implementation default completing the earlier requirement of two clear distractors; they were not exported from an existing quiz file. Keep them visually distinct. Correctness is developer data only, never a pre-answer UI label.

| # | materialId | Question | Option A | Option B | Option C | Correct |
|---|---|---|---|---|---|---|
| 1 | tooth-brushing | Mana gambar anak yang sedang menggosok gigi? | Anak menggosok gigi | Anak makan sendiri | Anak memakai sepatu | A |
| 2 | tooth-brushing | Mana yang digunakan untuk menggosok gigi? | Sendok | Sikat gigi | Sepatu | B |
| 3 | bathing | Mana gambar anak yang sedang mandi? | Anak memakai baju | Anak makan sendiri | Anak mandi | C |
| 4 | bathing | Mana yang digunakan saat mandi? | Sabun | Sepatu | Sendok | A |
| 5 | dressing | Mana gambar anak yang sedang memakai baju? | Anak menggosok gigi | Anak memakai baju | Anak makan sendiri | B |
| 6 | dressing | Mana baju yang dipakai di tubuh? | Sepatu | Sikat gigi | Kaos | C |
| 7 | eating | Mana gambar anak yang sedang makan sendiri? | Anak makan sendiri | Anak mandi | Anak memakai sepatu | A |
| 8 | eating | Mana yang digunakan untuk makan? | Sabun | Sendok | Sepatu | B |
| 9 | shoes | Mana gambar anak yang sedang memakai sepatu? | Anak memakai baju | Anak menggosok gigi | Anak memakai sepatu | C |
| 10 | shoes | Mana benda yang dipakai di kaki? | Sepatu | Kaos | Sikat gigi | A |

Use actual recognizable activity images for activity questions and object images for object questions. Do not reduce every activity answer to the same generic character or use text-only cards as the final quiz implementation.

### Quiz types and state

```ts
export interface QuizAnswer {
  id: string;
  label: string;
  image: string;
  correct: boolean;
}

export interface QuizQuestion {
  id: string;
  materialId: string;
  question: string;
  answers: QuizAnswer[];
}

export interface QuizSessionState {
  currentQuestionIndex: number;
  selectedAnswerId: string | null;
  attemptedAnswerIds: string[];
  status: 'default' | 'incorrect' | 'correct';
  completed: boolean;
}
```

Initial state: index 0, selectedAnswerId null, attemptedAnswerIds [], status default, completed false. Image loading/error state is separate from answer state.

### Quiz interaction rules

1. Home → Kuis → Quiz Intro → Mulai → Question 1. Intro copy should be short and explain selecting a picture; no invented mechanics.
2. Show “1 dari 10” through “10 dari 10”. Lanjut starts disabled.
3. Wrong choice: mark the selected card incorrect with X and error styling. Add its ID to attemptedAnswerIds and disable it. Display **“Belum tepat. Coba lagi, ya!”**. Stay on the question; other unattempted choices remain active. Lanjut stays disabled.
4. Retrying means choosing another available option. No retry quota, penalty, lives, or reset of wrong-answer disabling. Do not create a conflicting separate retry gate for normal incorrect answers.
5. Correct choice: show check icon and success styling; display **“Benar! Hebat!”**. Lock all cards and enable Lanjut. Do not advance automatically.
6. Lanjut after a correct answer advances exactly one question and clears selection, attempts, and feedback. New question images must be ready before interaction.
7. Lanjut after Question 10 leads to Quiz Completion. Keep the label Lanjut on Question 10.
8. Quiz Completion: heading **“Hebat!”**; description **“Kamu sudah menyelesaikan kuis.”**; actions **Main Lagi** and **Kembali ke Beranda**. No score summary.
9. Main Lagi fully resets the session and goes directly to Question 1.
10. Back during play never means previous question. Show the exit dialog. Handle browser Back consistently with this rule where supported by the chosen router.

Exit dialog:

- Title: **Keluar dari kuis?**
- Description: **Kuis akan dimulai dari awal jika kamu keluar.**
- Actions: **Lanjutkan Kuis** and **Keluar**.
- Continue closes the dialog and preserves the current question and answer state.
- Keluar resets the session and goes Home.
- Escape should safely close the dialog and continue the quiz. Restore focus to the triggering control.

Ignore attempted answers and all answer taps after correct status. Use atomic state updates or a simple reducer if helpful; do not introduce a state library. Prevent rapid answer taps from overwriting a correct state and rapid Lanjut taps from skipping questions.

## 8. Illustration and asset strategy

Functional illustrations only for MVP 1: simple, flat, low detail, consistent, recognizable, minimal backgrounds. One clear action per learning illustration. Do not spend significant time or generation credits polishing final art.

- Prefer SVG for simple vector assets; WebP is acceptable for raster assets.
- Reuse activity art for cards, introductions, and activity quiz answers where appropriate.
- Reuse objects such as toothbrush, soap, spoon, towel, t-shirt, shoes.
- Reuse shapes/characters between material steps while retaining the specific action cue. Reuse must not make six different actions visually indistinguishable.
- A representative placeholder is allowed while assets are incomplete; report its status honestly.
- Do not substitute arbitrary unrelated stock imagery or complicated scenes.
- Bathing art should be a simple child-appropriate depiction, e.g. upper body with water/bubbles and no explicit detail.
- Do not add buttoning or shoelace complexity.
- Keep images replaceable by path without changing learning or quiz logic.

Example usage:

```tsx
<IllustrationContainer src={step.image} alt={step.text} />
```

Suggested reusable paths: activities/tooth-brushing.svg, bathing.svg, dressing.svg, eating.svg, shoes.svg; objects/toothbrush.svg, soap.svg, spoon.svg, towel.svg, t-shirt.svg, shoes.svg. Names are conventions to implement, not files claimed to exist.

## 9. Accessibility, loading, and error behavior

- Use semantic main, nav, headings, links, and buttons. Do not use clickable divs as controls.
- Support keyboard Tab, Enter, and Space according to native element behavior.
- Keep visible focus indicators; never remove outlines without replacement.
- Ensure sufficient text/control contrast even with bright activity colors.
- Use readable short instructions and large targets.
- Correct/incorrect feedback includes text and icons, not color alone. Announce feedback without forcing a focus jump on every answer.
- On screen/question transitions, manage focus so keyboard and screen-reader users can orient themselves.
- Dialogs need accessible title/description, modal semantics, focus containment, safe dismissal, and focus restoration.
- Image alt text describes the displayed content. Accessible quiz names must not expose the correct flag, “correct answer”, or hidden hints before selection. Neutral descriptions of all options are allowed.

Initial loading: **Bina Diri** / **Memuat...**. Do not add artificial delays. Use fixed illustration dimensions to avoid layout shifts.

Learning image failure: keep layout, show a neutral placeholder, retain the instruction text, and allow continuation.

Quiz image failure: show **“Gambar belum berhasil dimuat.”** with **Coba Lagi**. Disable answer selection and progression until all three current-question images are available. Retry reloads/rechecks the affected assets. Track readiness per question so late events from previous questions cannot unlock the wrong screen. Do not permit a normal quiz round with missing answer images.

Use appropriate dimensions and lazy loading where relevant; avoid delaying current-question image readiness unnecessarily. Prioritize modern mobile Chrome and desktop Chrome; remain compatible with recent Edge, Safari, and Firefox. Report browsers actually tested.

## 10. Acceptance and verification checklist

### Stage 1 review

- [ ] Build succeeds using the repository's package manager.
- [ ] Home presents Materi and Kuis without a complex navbar.
- [ ] Materi opens the five-card list with correct titles/themes.
- [ ] All five cards and the Kuis entry have intentional destinations and working return navigation.
- [ ] Unfinished flows are clearly temporary; full learning/quiz logic is not implemented.
- [ ] Fredoka/Nunito and centralized tokens are present, or any blocked font loading is disclosed.
- [ ] Layout is checked at 320, 390, 768, 1440px; no clipping or horizontal overflow.
- [ ] Keyboard focus is visible, navigation works, and targets meet minimum sizes.
- [ ] Asset placeholders/provisional colors are identified in the review summary.
- [ ] Run instructions and remaining stages are documented.

### Completed material flow

- [ ] Every one of the five materials has exact six-step content.
- [ ] Home → list → intro → steps 1–6 → completion works for all materials.
- [ ] Back from step 1 returns to intro; other steps return to previous step.
- [ ] Progress displays correct count, not percentage.
- [ ] Completion actions return to list or Home.
- [ ] Rapid double taps do not skip steps.
- [ ] Missing learning images leave usable text and navigation.
- [ ] Invalid material IDs show the intended error and recovery.

### Completed quiz flow

- [ ] Exactly ten fixed questions; two per material; three image choices; one correct each.
- [ ] Wrong choice shows X/text, becomes disabled, and leaves other choices usable.
- [ ] Lanjut remains disabled after a wrong choice.
- [ ] Correct choice shows check/text, locks all answers, and enables Lanjut.
- [ ] Correct choice does not auto-advance.
- [ ] Lanjut advances once and resets question state; rapid taps do not skip.
- [ ] Question 10 transitions to completion with no score.
- [ ] Main Lagi resets fully and opens Question 1 directly.
- [ ] Exit cancellation preserves state; confirmed exit resets and returns Home.
- [ ] In-app/browser Back do not open a previous quiz question as an active round.
- [ ] Loading/failed answer images block answering and continuing; retry can recover.
- [ ] Full refresh starts fresh at Home; no persisted progress.

Use focused tests for state transitions and image-error gates where they address actual risk. For the initial foundation, build checks and real navigation/layout/keyboard checks may suffice. Do not claim a browser check from code inspection alone. If tooling is unavailable, explain what remains unverified.

## 11. Required delivery report after each authorized stage

Provide in Indonesian:

1. What was implemented and the actual project path.
2. Which checks ran, their results, and any blocked verification.
3. Known limitations, provisional tokens, and asset placeholders.
4. Exact commands to install/run/build using the chosen package manager, and an actual preview link if one exists.
5. What remains for the next stage.

Keep a brief README in the implementation repository with local run instructions and stage status. At the end of Stage 1, explicitly stop and wait for visual/foundation review. Do not silently expand scope.

## 12. Final product definition

A responsive web educational game without login or backend that helps children aged 6–12 with intellectual disabilities learn five self-care activities through simple illustrations and short text, then reinforce understanding through a ten-question image-selection quiz with immediate retry-based feedback.

Build only what is necessary for this definition, within the currently authorized stage.
