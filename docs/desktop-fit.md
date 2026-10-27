# Desktop single-screen correction

All nine required Games page families pass at 1434 × 913. Main content client height and scroll height are both 913px; the document has no vertical overflow. Canonical shell widths remain 251 / 1183 without a contextual rail and 251 / 1049 / 134 with one.

| Screen | Representative route | Result | Client / scroll height |
| --- | --- | --- | --- |
| Games Overview | `#games` | PASS | 913 / 913 |
| Projects Overview | `#games/projects` | PASS | 913 / 913 |
| Project Detail | `#games/projects/project-1` | PASS | 913 / 913 |
| Roles Overview | `#games/roles` | PASS | 913 / 913 |
| Role Detail | `#games/roles/technical-animation` | PASS | 913 / 913 |
| About Me | `#games/about` | PASS | 913 / 913 |
| Case Studies Overview | `#games/case-studies` | PASS | 913 / 913 |
| Case Study Cover | `#games/case-studies/case-1` | PASS | 913 / 913 |
| Case Study Step | `#games/case-studies/case-1/step-1` | PASS | 913 / 913 |

## Changes

`styles/desktop-fit.css` composes each page within its desktop frame. Overview allocates space to introduction, selected roles, project carousel and portrait. Projects and Roles indexes balance their introduction/video area with their cards. Project Detail retains its two-by-two composition. Role Detail reserves a final row for its featured case CTA. About uses a horizontal trajectory band and compact skills grid. Media width caps prevent wider screens from producing excessively tall 16:9 images.

`styles/shell.css` allows visible overflow for these desktop page families, so layout mistakes remain detectable instead of being hidden by clipping. No sections were removed, no global font reduction or transform scaling was introduced, and shell widths were preserved. Widths at or below 1200px and heights below 840px retain the existing flow/scroll fallback. Existing Case Studies responsive rules remain in place.

`index.html` loads the new stylesheet. Browser tests and the stress fixture cover viewport containment, panel containment, controls, populated About content, and wider desktops. Router, production data/config, CV files and document behavior are unchanged by this correction. The previously implemented supplied CV remains in the complete delivery.

## Verification

- `node tests/verify.mjs`: 25 valid routes, invalid routes, arbitrary 12-step case, document/build/experience states and shell ownership passed.
- JavaScript syntax checks and `git diff --check` passed.
- Browser harness: all 23 configured Games routes preserve canonical geometry. All 21 routes in the required page families pass vertical viewport and panel containment at 1434 × 913 and 1920 × 913. A populated About fixture also passes.
- All 23 Games routes pass horizontal overflow checks at widths 320, 360, 390, 768, 1000, 1200 and 1920. Short-window fallback remains covered.
- Seven-case carousel, pagination/keyboard, 4/7/12-step navigation, 1/2/3 evidence layouts, project galleries, mobile menu/Escape, context selectors, Back/Forward, fresh deep links, root/Books and CV preview/PDF serving checks passed.
- Recorded results: `tests/browser-results.json`. Visual review covered Overview, Projects, Project Detail, Roles, Role Detail and About; Case Studies retains its previously reviewed composition with bounded media.

## Remaining content

Final professional copy, artwork/portrait, project and case evidence, video, builds and some contact/profile content remain placeholders. Books remains a placeholder. Larger future copy should be checked against the desktop space budget. No current tested route has remaining desktop overflow. Production hosting was not exercised.

## Delivery

Suggested commit: `Compose Games desktop views without vertical scrolling`.

The complete working-tree ZIP has repository files directly at its root. Packaging checks CRC, inventory and every archived file SHA-256 against the unchanged working tree. It excludes `.git`, caches, scratch files, bundles/patches and previous ZIPs. Extract over `F:\Git\santiagoperezlosanovscky`; the existing `.git` stays untouched. No push or authentication attempt was made.
