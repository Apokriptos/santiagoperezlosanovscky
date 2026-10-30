# Case Studies chapter interface and Coming soon state — Pass 06

2026-10-30. Implemented the next available approved contract, `SCREEN_CASE_STUDY_STEP_IMPLEMENTATION.txt`, and the requested Coming soon navigation/access presentation. The first public release will exclude Cases. Current routes remain available for interface development; this pass deliberately does not implement the later total-access lock.

## Coming soon entries

`config.caseStudies.comingSoon` centrally enables grey styling and a visible `Coming soon!` badge on the global Case Studies tab, existing project-to-case CTAs, configured role-to-case CTAs and the already-disabled unconfigured role-case action. The badge participates in the accessible name. Working links retain href, keyboard reachability and development navigation; they are not falsely marked aria-disabled. Focus remains visible, including a light focus ring over the dark left rail.

The development hub, cover and chapter headers show a compact Coming soon / interface preview notice. Internal chapter/case controls retain functional selected states so the interface can be worked on. The right contextual rail and mobile case selector still switch between cases, while the chapter rail switches within one case.

**Release lock remains outstanding:** before the first public release, implement and verify the planned exclusion of Case Studies navigation, cross-links and direct routes. The current styling flag is not an access-control mechanism. No route lock, redirect, route removal or publication was performed in this pass.

## Approved chapter composition

The shared case title plate and actual discipline line lead into one tactile `case-study-step-shell`. It contains a compact numbered current-step plate, a two-column content row (one static evidence image/frame and one `case-study-step-panel`), then a Case Cover link and data-driven `case-study-step-rail` with deliberate breathing room.

The explanation panel supports escaped paragraphs and optional Key Points. The evidence slot chooses an explicitly configured image or the first actual non-video source in existing step media. It never turns the current source list into a gallery. No video, image carousel, caption, extra evidence images, separate question strip or old generic reasoning paragraph remains. Null-source planned evidence is shown as forthcoming; no screenshot or analysis was fabricated. The reference discipline labels are stored with the reference case data, not hardcoded in its renderer.

The bottom rail exposes chapter number/title and aria-current, with visible focus and keyboard navigation. Seven reference steps fit on canonical desktop; longer lists scroll locally and reveal the active step. The right case rail stays case-level regardless of active chapter. Mobile stacks chapter content and allows the internal rail to scroll horizontally. Media stays standard landscape without distortion.

## Scope and shared architecture

- New `src/case-ui.js`: `caseStudyStep()`, `caseStudyStepPanel()` and `caseStudyStepRail()`, consuming unchanged shared UI primitives.
- New `src/case-availability.js`: one idempotent availability decorator called after existing application rendering/binding. No competing router or navigation controller.
- New scoped recipe styles: `styles/case-step.css` and `styles/coming-soon.css`. Shared surface/title/header/media definitions, shell geometry, assets and Projects/Roles templates remain unchanged.
- `src/pages.js` delegates only step screens to the new renderer. Existing case hub and covers remain functional. The referenced newer Cases Overview implementation contract is still missing; that approved overview revision is not marked implemented or reinterpreted from later screens.
- `src/data.js` adds preview status and the supplied reference disciplines; unsupplied step bodies are empty rather than retaining the specifically removed generic placeholder paragraph. Case IDs, step IDs/counts, relationships, and all real project links/media remain intact.
- README/AGENTS document the current preview status and later release-lock requirement.

## Validation

- `node tests/verify.mjs`: passed, including 31 valid routes, dynamic data, existing media/states, shared UI/Projects/Roles checks and new case chapter contract checks.
- `scripts/verify_ui_assets.py`: all 13 canonical SVGs passed; no SVG was modified.
- `tests/cases-browser.html`: passed at 1434, 1920, 768, 390 and 320px. Verifies grey Coming soon global/project/role links, visible focus, working development cross-links, direct chapter access, separate case/step selected states, step keyboard navigation, all seven reference labels fitting desktop, content/rail spacing, one actual fixture image at 16:9, explanatory paragraphs/key points, no removed captions/control strips, no overflow and desktop no-scroll.
- `tests/qa.html`: full regression passed across 29 canonical routes and seven responsive widths, including 1920px fit, dynamic seven-case carousel, 4/7/12-step structures/active reveal, single static evidence behavior, project galleries/native video playback, current build links, CV, mobile navigation/selectors, refresh and Back/Forward. The Cases hub notice shares its desktop subtitle row so it does not squeeze the existing cards.
- `git diff --check`: passed (line-ending notices only).
- Protected-file SHA-256 comparison confirms all existing assets/media/references/documentation, router/shell, shared primitives and Overview/Projects/Roles recipe/component files remain unchanged.

Browser results: `tests/cases-browser-results.json`, `tests/browser-results.json`. Evidence/analysis fixtures use explicitly marked test-only content and actual existing project images for rendering checks; they are not production case-study evidence or professional claims.

## Remaining content / source limitations

Real chapter explanations, evidence images and key points remain unsupplied. Existing hub/cover prose and some future case structures are forthcoming. No decorative gothic artwork was generated. The newer Case Studies Overview contract is absent; its approved revision remains SPEC ONLY. The release access lock is intentionally a separate future task requested by the user.

## Preview and delivery

Run `node scripts/serve.mjs`. Development chapter: `http://127.0.0.1:4173/#games/case-studies/case-1/step-1`. Cross-link presentation: `#games/projects/project-1`. Supplied screenshots: `case-study-interface.png` and `case-studies-coming-soon.png`.

The complete repository ZIP contains files directly at its root and excludes `.git`, caches/temp/Codex artifacts, prior ZIPs, bundles and patches. CRC, exact inventory and every file SHA-256 are checked against the unchanged final working tree. Extract over `F:\Git\santiagoperezlosanovscky`; its existing `.git` is untouched. No Git push, commit or authentication retry was attempted.

Suggested commit: `Build case chapter preview and mark Case Studies coming soon`.

## Exact files created

- `docs/case-studies-pass-06.md`
- `src/case-availability.js`
- `src/case-ui.js`
- `styles/case-step.css`
- `styles/coming-soon.css`
- `tests/cases-browser-results.json`
- `tests/cases-browser.html`
- `tests/cases.mjs`

## Exact files modified

- `AGENTS.md`
- `ASSET_MANIFEST.md`
- `README.md`
- `UI_COMPONENT_STATUS.md`
- `index.html`
- `src/app.js`
- `src/data.js`
- `src/pages.js`
- `tests/browser-results.json`
- `tests/qa.js`
- `tests/stress.html`
- `tests/verify.mjs`

Files deleted: none.
