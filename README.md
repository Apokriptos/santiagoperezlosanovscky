# Santiago Pérez Losanovscky — portfolio foundation

Games Overview now has a provisional cream/black/red editorial visual baseline. See [the calibration notes](docs/visual-calibration.md) for asset decisions, scope, verification, and pending content. Detailed styling stops at Overview pending review; the router and shared shell are unchanged.

Buildless, semantic HTML, CSS, and vanilla JavaScript. Serve this folder with any static server, or run `npm start` and open `http://127.0.0.1:4173/`. No production dependencies or build step. GitHub Pages can serve the repository root; `.nojekyll` preserves static delivery. Hosting settings are not changed by this implementation.

## Structure and geometry

- `styles/shell.css` alone owns the approved `251px` left rail and optional `134px` contextual rail. `src/shell.js` renders both variants. At 1434 × 913 the content rectangles measure 1183px and 1049px respectively.
- Main content scrolls within its desktop rectangle: a document scrollbar must never subtract pixels from the shell. Rails retain viewport height. Page CSS only composes the interior.
- Below or at 1000px the left rail becomes an expandable menu, the contextual rail becomes a native select, and the document scrolls normally. Internal columns stack at 700px. The bottom case step list scrolls within itself for arbitrary counts.
- `src/router.js` validates hash routes and renders a recoverable not-found page for unknown identifiers. Hash changes provide direct links, refresh persistence, and browser Back/Forward without a server rewrite. Internal overview-video scroll links preserve the active route.
- `src/app.js` owns route rendering, navigation state, focus, mobile menu, and component binding. `src/pages.js` supplies shared templates. No per-project bespoke pages.
- `src/components.js` supplies media, galleries, captions, pagination, keyboard controls, safe URLs, and load/error fallbacks. Videos load on demand and stop on navigation. A configured CV uses native PDF embedding with open/download fallbacks, without a PDF.js runtime dependency.

## Content and configuration

Edit `src/data.js`: `config`, `navigation`, `Projects`, `Roles`, and `CaseStudies` are the centralized sources. IDs are stable URL segments. Records and step counts are arbitrary; the sample data deliberately contains cases with different step counts. The five approved roles are present. Technical Animation describes in-engine integration, not traditional character animation.

Projects support descriptions, role IDs, tags, thumbnail, hero media, video, gallery, build status/URL, external URL, and related case IDs. Roles support summary, experience (`{title,body,projectId}`), practice media, approach, and an optional featured case ID. Cases reference project and role IDs and contain arbitrary steps with body, media, and captions. Empty optional arrays are valid.

Media objects use `{src,alt,caption}`. Videos use `{src,type,poster,captions}` where `type: 'embed'` is optional and captions is a WebVTT path. Use repository-relative paths such as `media/project/video.mp4`; their base is the repository root derived from the module URL. Use approved embed URLs for embedded providers. Local PDF paths support the download attribute; cross-origin servers may choose their own download behavior.

Portrait, introduction, biography, timeline, skills, location, languages, CV, contact, and overview-video paths live in `config`. Unknown facts are explicitly forthcoming. Replace sample project/case records with approved content and wire role/project references as evidence becomes available. The known GitHub account and studio destination are configured; email and LinkedIn are unset.

## Reference adaptation

Read-only inspection of `Apokriptos/aobscuragames` informed URL resolution relative to script/module location, lazy video creation, playback cleanup, image-error placeholders, caption support, and explicit PDF-unavailable states. Its `documents.js` was inspected; native PDF embedding is sufficient here, so PDF.js and canvas rendering were not copied. No Aobscura files, branding, fixed game counts, or thumbnail gallery structures were copied or changed.

Supplied visual reference images remain in `references/` and original assets remain in `assets/`. This pass preserves screen hierarchy and compositions using neutral styling. It does not use whole mockups as raster pages or assume unidentified artwork is an approved portrait.

## Verification

Run `npm test` for router validation, all configured routes, invalid routes, a temporary 11-step case, and CSS ownership assertions. Start the server, then open `/tests/qa.html` to run browser layout and interaction checks under a simulated repository project prefix. The harness uses actual iframe viewports, including exactly 1434 × 913, then 390, 768, 1000, 1200, and 1920px widths. It checks every configured Games route, shell dimensions, overflow, project/gallery controls, keyboard behavior, case covers/steps, mobile menu/Escape, contextual selector, Back/Forward, fresh deep links, and placeholder/contact/root states. `/tests/shell.html?viewport` and `?viewport&context` isolate the neutral shell before pages. `?debug#games/projects` colors the shell regions without changing geometry.

Final artwork, final copy, real project/case evidence, playable builds, portrait, email/LinkedIn, and actual CV are pending. Real video playback, PDF content rendering, downloads of supplied binaries, and production GitHub Pages deployment cannot be verified until their files/hosting exist. Books remains a placeholder.
