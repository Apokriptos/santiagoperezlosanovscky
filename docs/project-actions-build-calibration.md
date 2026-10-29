# Project Detail actions and build-panel calibration

The Case Study button now matches the approved mockup more closely: bold left-aligned title, separate right arrow on the same row, 40px minimum height and clear bottom inset within The Game. A conflicting older button rule that forced block layout and tiny centered text was overridden with the correct scoped selector. Slightly tighter paragraph spacing reserves the button's space without clipping content.

The build panel now has a controller icon and larger heading, an explanatory evaluation sentence and prominent red download action on the left, and compact icon-led provider/access metadata on the right. The divider and evaluation note follow the action block with a 22px gap, replacing the large automatic spacer. The note uses more readable typography. Mobile stacks these regions naturally.

Changed: `src/pages.js`, `styles/project-detail.css`, `tests/qa.js` and this report. No project description, route, build URL, gallery, rail or shell geometry changed. Icons are inline SVG; no new bitmap artwork was generated. Private-evaluation access is already established by the existing source evaluation notice; platform, size and architecture remain omitted because they are unknown.

Verification: Node route/data/media checks, JavaScript syntax and whitespace checks pass. Browser checks cover all three project routes at 1434 × 913, button text/arrow alignment, at least 12px bottom inset, compact build-note spacing, desktop no-scroll, mobile layouts, gallery controls, keyboard navigation, video decoding and current links. Existing portfolio content placeholders are unchanged.

Suggested commit: `Match Project Detail actions and build panel to mockup`.

The complete repository ZIP contains files directly at its root and excludes `.git`, caches and transfer artifacts. CRC, inventory and every archived file hash are verified against the tested working tree. Extract over `F:\Git\santiagoperezlosanovscky` without changing its existing `.git`. No push was attempted.
