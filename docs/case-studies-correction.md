# Case Studies correction and supplied CV integration

This is a targeted follow-up to the Games visual pass. The site has not been rebuilt. The shared shell, router, primary navigation, Overview styling, Projects, Roles, About, and root layouts are unchanged.

## Changes

**Case Studies Overview:** A dedicated compact header and Design in Practice/video region follow the supplied `references/CASESTUDIES_LANDING.png`. Below them, one horizontal multi-card carousel displays all current cases simultaneously at canonical size. Additional cases create pages of up to three visible cards according to available width. Previous/next, pagination, Arrow keys, Home/End, and touch scrolling are supported. Controls disappear when every case fits. Cards, linked projects, available role tags, descriptions, and actions come from `CaseStudies[]`; no sample names from the reference were imported.

**Case Study Cover:** The title/context and discipline line lead into a wide hero, followed by The Case, Central Question, My Contribution, and What This Study Covers. The coverage list is generated from `steps[]` and uses compact columns at desktop. Begin Case Study and View Project remain visible. The cover has no timeline. Composition follows `references/CASESTUDY_OVERVIEW.png` inside the current shell.

**Case Study Step:** A dedicated viewport layout contains context, numbered heading, a question bar, readable reasoning, a landscape evidence row with captions, previous/next links, and a bottom timeline. The question uses the optional step question or the case's central question. Timeline links are generated from `currentCase.steps[]`, with numbered markers, a connecting rule, and a stronger current label/marker. Four and seven steps fit without illegible compression; twelve use only local horizontal overflow. The active entry is revealed on deep links. Tab/Enter remain standard links; Arrow keys and Home/End move keyboard focus within the timeline. Composition follows `references/CASESTUDIES_STUDYEXAMPLE.png`.

**CV:** The original supplied Word document in `documentation/` is unchanged. A searchable two-page PDF and a source-derived HTML document preview are included. The CV panel, View CV, Download PDF, and Contact's Download CV now point to real supplied content. The HTML preview avoids the blank native PDF embed observed in the in-app browser; the native PDF option remains available when no preview URL is configured. The profile summary uses the supplied CV's first professional-summary sentence. Unrelated content fields remain placeholders.

## How the desktop views fit

Only `styles/case-studies.css` budgets these page interiors. At a viewport of **1434 × 913**, the existing shell remains **251 / 1049 / 134**. Case Studies pages use the available content height, with explicit grid/flex regions and compact spacing, headings, panels, and media. No vertical clipping or vertical overflow hiding is applied to the main content to fake the fit. Tests require `scrollHeight === clientHeight === 913`, verify text/actions/media stay within the viewport and their panels, and require the timeline to remain above the fold.

The bottom timeline is an allocated final row rather than content appended after an oversized document. Its horizontal overflow is local. The contextual rail continues to show only Overview and one entry per case, not step links.

At mobile/tablet widths, normal vertical flow is restored and the existing contextual selector remains in use. Evidence stacks on phones. At unusually short desktop heights below 760px, normal internal flow is allowed for accessibility instead of cutting content off. Narrower desktop case-index media uses a panoramic frame to retain readable card text without changing the rails.

## Files changed or added in this correction

- `src/pages.js`: dedicated Case Studies index/cover/step structures and the optional live CV document preview.
- `src/components.js`: responsive multi-card case carousel and timeline keyboard navigation.
- `src/data.js`: Case Studies introduction/video slot and supplied CV paths/summary.
- `styles/case-studies.css`: isolated fixed-viewport desktop layouts, timeline, carousel, and responsive fallbacks.
- `index.html`: loads the targeted stylesheet.
- `tests/qa.js`, `tests/stress.html`, `tests/verify.mjs`, `tests/browser-results.json`: no-scroll/panel-boundary assertions, varying case/step/evidence counts, carousel controls, and real CV integration checks.
- `scripts/export_cv.py`: optional repeatable Word-to-PDF/HTML export; no production build step.
- `documentation/cv-technical-game-designer.pdf`, `documentation/cv-technical-game-designer.html`, `documentation/README.md`: runtime documents and source/update notes.
- `README.md`, this report, and the historical visual-pass report notice: documentation updates.

The new Case Studies landing reference and original CV DOCX are retained as supplied, byte-for-byte. No reference PNG is used as runtime UI.

## Verification

- Node checks: 25 valid routes, invalid-route recovery, arbitrary 12-step rendering, central shell ownership, data-driven content, configured/missing CV states, and bundled document presence.
- Canonical browser checks: all nine current Case Studies routes retain **251 / 1049 / 134**, main `clientHeight = scrollHeight = 913`, no document vertical scroll, visible contextual rail, and visible timeline on steps only.
- Stress checks: seven-case carousel with functional next/previous/pagination/keyboard; 4/7/12-step covers and step views; 1/2/3 evidence slots; current timeline entry visible and keyboard-focusable. The overview also fits at widths 1001 and 1200.
- Responsive regression: all 23 Games routes at widths 320, 360, 390, 768, 1000, 1200, 1434, and 1920, without horizontal page overflow. A 600px-high desktop checks the accessibility fallback.
- Routing, Back/Forward, fresh deep links, primary/contextual navigation, existing project/media carousels, mobile menu/Escape, Books placeholder, and root selector remain covered.
- CV: every source paragraph verified in PDF text; both PDF pages rendered and visually inspected; preview/PDF served successfully under a repository prefix with the correct PDF content type and real download link.

Recorded measurements and outcomes are in `tests/browser-results.json`. Re-run `node tests/verify.mjs`, start the local server with `npm start`, and open `/tests/qa.html` for browser checks.

## Remaining placeholders and review limits

Case titles/descriptions, final case reasoning, actual evidence/hero images, and overview video remain placeholders. The source model is intact for later content replacement. Large increases in prose or caption length should be reviewed against the desktop space budget rather than hidden or truncated. The tested 4/7/12-step fixtures use concise labels and the current placeholder bodies. The supplied CV is now implemented; other portfolio facts were not inferred from it. Native PDF plugin behavior varies by browser, so the HTML companion is the default embedded document and PDF viewing/downloading remains separate.

## Delivery

Suggested GitHub Desktop commit: **`Fix Case Studies navigation and single-screen layouts`**.

The full `portfolio-update.zip` has repository files directly at its root. It excludes `.git`, caches, scratch captures, transfer bundles/patches, and previous ZIPs. Every archived file is compared with the final working tree and ZIP CRC integrity is checked. Extract over `F:\Git\santiagoperezlosanovscky`; its `.git` directory is untouched. No push or credential workaround is attempted.
