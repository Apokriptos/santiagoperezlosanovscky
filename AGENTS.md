# AGENTS.md

## Project Purpose
This repository contains the personal portfolio website of **Santiago Pérez Losanovscky**.

Primary repository:
`Apokriptos/santiagoperezlosanovscky`

The portfolio has two branches:
- **Games** — professional game design portfolio.
- **Books** — author portfolio.

The root landing page is a simple branch selector between **GAMES** and **BOOKS**.

## Repository Boundaries
This repository is the only writable repository for this personal portfolio project.

Reference repository:
`Apokriptos/aobscuragames`

The Aobscura Games repository is **read-only reference material**. It may be inspected for proven patterns such as:
- GitHub Pages-safe structure
- video/media handling
- image galleries/carousels
- PDF/document viewing
- loading behavior
- responsive utilities
- navigation/state patterns
- asset loading
- external links
- accessibility patterns

Do not modify, commit to, or open PRs against `Apokriptos/aobscuragames` unless explicitly instructed.

## Relationship to Aobscura Games
Aobscura is a studio/project-facing site.
This repository presents Santiago’s work, capabilities, design thinking, experience, CV, roles, projects, case studies, and books.

Reusable infrastructure is welcome.
Do not copy Aobscura’s visual identity unless explicitly requested.

## Site Architecture
Prefer a single-page experience with client-side view switching, deep links, refresh-safe routes, and browser Back/Forward support.

Hash routes are acceptable, e.g.:
- `#games`
- `#games/projects`
- `#games/projects/hollow-graves`
- `#games/roles/technical-game-design`
- `#games/case-studies/<case-id>`
- `#games/case-studies/<case-id>/<step-id>`
- `#games/about`
- `#games/cv`
- `#games/contact`
- `#books`

Do not introduce a framework solely for routing unless clearly justified.

## Root Landing
Keep the root landing deliberately minimal:
- GAMES
- BOOKS

Do not clutter it with CV, Contact, socials, project navigation, or explanatory sections.

# Games Branch

## Primary Games Navigation
Persistent left navigation rail:
1. Overview
2. Projects
3. Roles
4. Case Studies
5. About Me
6. CV
7. Contact

An external Aobscura Games link may live at the bottom.

## Canonical Role Taxonomy
Use these five roles unless explicitly changed:
1. Technical Game Design
2. Level Design
3. Gameplay Development
4. Creative Leadership
5. Technical Animation

Do not create a separate Systems Design role unless explicitly requested.
Do not rename Technical Animation to Gameplay Animation.

Technical Animation includes:
- in-engine animation implementation
- Animation Blueprint/state logic
- blending
- retargeting
- procedural/additive animation
- animation integration
- gameplay-facing animation adjustment

It does not position Santiago as a traditional character animator.

## Desktop Geometry — Games
Desktop is the canonical design target.

Canonical full page:
`1434 × 913`

Persistent left navigation rail:
`251 × 913`

Pages without contextual right rail:
- Left rail: `251 px`
- Content: `1183 px`

Pages with contextual right rail:
- Left rail: `251 px`
- Content: `1049 px`
- Right rail: `134 px`

Do not arbitrarily resize these rails per screen.

The right rail appears only where sibling indexed navigation is useful, such as:
- Projects
- Roles
- Case Studies

## Responsive Behavior — Games
Desktop layout should remain primary, but mobile/tablet must stay usable.

On narrower screens:
- collapse left rail into an accessible menu/header/drawer
- convert contextual right rails into compact selectors
- stack columns logically
- preserve 16:9 video
- preserve carousel controls
- keep Case Study step navigation usable
- avoid horizontal overflow

## Games Overview
Support:
- concise introduction
- role links
- project carousel
- portrait/identity area

Projects must be data-driven.
Do not design around a fixed project count.

## Projects
Projects are modular and data-driven.

A new project should automatically integrate into:
- Projects Overview
- project carousel
- contextual Projects rail
- project detail template
- relevant Games Overview carousel

Do not create bespoke page architecture per game unless explicitly requested.

Project detail pages should support:
- gameplay/video
- premise/project text
- one large image carousel
- playable build/download
- contextual Projects rail

Avoid unnecessary thumbnail clutter.

## Roles
Roles are modular and data-driven.

A new role should not require rewriting:
- Roles Overview
- contextual Roles rail
- role detail structure

Role detail pages may contain:
- Role & Experience
- Selected Experience
- In Practice media carousel
- My Approach
- Featured Case Study hook

Do not invent statistics or metrics unless explicitly supplied.

## Case Studies
Case Studies must be highly modular.

There is no fixed number of cases or steps.

Each Case Study should support:
- cover/showcase view
- summary
- central question
- contribution/ownership
- linked project
- linked role
- arbitrary step list
- evidence media

Navigation:
- vertical Case Studies rail for switching between cases
- horizontal step rail inside a case

The horizontal step rail appears on step screens, not the case-study cover.

Never hard-code fixed case counts, step counts, or step names.

## CV
Support:
- embedded PDF
- View CV
- Download PDF

CV path should be configurable.
Do not hard-code temporary CV facts into the UI.

## Content Model
Centralize repeatable content in structured config/data:
- titles
- subtitles
- routes
- descriptions
- tags
- media
- links
- roles
- projects
- case studies
- case-study steps
- timeline entries
- skills
- contact destinations

Long-form prose may later live in Markdown, text files, JSON/config, or another lightweight source.

Do not bury large final copy inside rendering logic.

# Books Branch
Books will be implemented separately.

Current durable guidance:
- Books is separate from Games
- Books may prioritize mobile more strongly
- Books should not inherit Games CV/professional logic
- Games and Books may share infrastructure, but not necessarily layout or aesthetic

## Visual Identity
The personal portfolio must remain visually distinct from Aobscura Games.

Do not automatically reuse:
- Aobscura paper backgrounds
- game-specific themes
- sidebar artwork
- decorative motifs
- color schemes
- identity graphics

When approved mockups are supplied:
- preserve proportions
- preserve information hierarchy
- preserve fixed navigation geometry
- do not redesign composition unless explicitly asked

## Media and Assets
Prefer supplied assets over generated replacements.

Do not generate fake final artwork when placeholders are sufficient.

Keep media paths configurable.

Prefer responsive HTML/CSS/SVG structures for functional UI instead of giant raster containers whenever practical.

## Implementation Principles
Prefer:
- simple architecture
- semantic HTML
- maintainable CSS
- vanilla JS when sufficient
- reusable components/functions
- centralized configuration
- accessible controls
- keyboard support
- responsive layouts
- clear separation of data and rendering
- GitHub Pages-safe relative paths

Avoid:
- unnecessary frameworks
- duplicate markup
- hard-coded item counts
- hard-coded project/role/case lists in multiple places
- hidden dependencies on Aobscura
- premature aesthetic over-engineering

## Accessibility
Where practical:
- use semantic buttons/links
- provide useful aria labels
- preserve visible focus states
- make carousels keyboard-operable
- keep readable contrast
- provide meaningful alt text
- do not rely only on hover

## GitHub Pages
Keep deployment compatible with GitHub Pages.

Do not assume root-domain hosting.

The site may publish at:
`https://apokriptos.github.io/santiagoperezlosanovscky/`

Use repository-relative paths safely.

## Change Discipline
Before substantial changes:
1. inspect the existing implementation
2. understand current routing/state
3. identify reusable components
4. avoid rewriting unrelated systems
5. preserve working behavior unless explicitly replacing it

When requirements conflict:
1. explicit current user instruction
2. approved current mockup/spec
3. this AGENTS.md
4. older implementation behavior

## Do Not
Unless explicitly instructed, do not:
- modify `Apokriptos/aobscuragames`
- implement the complete Books branch
- copy Aobscura’s visual identity
- create separate Systems Design or Gameplay Animation roles
- add fake statistics
- invent final copy
- invent final artwork
- hard-code fixed project counts
- hard-code fixed role counts
- hard-code fixed Case Study counts
- hard-code fixed Case Study step counts
- redesign approved screen proportions
- replace responsive structures with unnecessary fixed raster UI
- add backend infrastructure for this static portfolio
- introduce a heavy framework without a concrete reason

## Verification Expectations
After meaningful implementation work, verify:
- routes/deep links work
- Back/Forward navigation works
- refresh preserves the active view
- project/role/case-study data remains modular
- carousels work
- contextual rails update correctly
- PDF viewing/download works where implemented
- external links work
- desktop proportions remain faithful
- mobile/tablet remain usable
- no horizontal overflow
- no accidental edits were made to Aobscura

When reporting completed work, summarize:
1. files changed
2. architecture changes
3. data/config changes
4. remaining placeholders
5. intentional deviations from approved references
