# Supplied CV update — Pass 18

The new two-page PDF supplied by the user is copied unchanged to `documentation/cv-technical-game-designer.pdf`. View CV and Download PDF continue using that stable repository-relative URL. Source and installed PDF SHA-256 both equal `8a6c45177929ce0a74bab9df271d4ea6624d1330a1fcecc7d418d0509dd95ff9`.

`config.cv.source` now identifies the supplied PDF. The CV panel summary uses its current first professional-summary sentence. The earlier Word file remains a historical file and is no longer used as the active source.

The embedded companion is rebuilt directly from the supplied PDF, preserving its exact page appearance with 144-DPI page renders and transparent selectable SVG text for Find/copy and assistive-technology text. Both pages are included, and Open original PDF remains available inside the viewer. `scripts/export_cv.py` now refreshes this preview from the PDF without rewriting the PDF; maintainer dependencies are Poppler and pdfplumber, with no website runtime dependency added.

Modified files: `documentation/cv-technical-game-designer.pdf`, its HTML companion, two new page PNGs, `documentation/README.md`, `scripts/export_cv.py`, `src/data.js`, `tests/cv.mjs`, `tests/cv-browser.html`, `tests/cv-browser-results.json`, `tests/verify.mjs` and the component status/report documentation. No unrelated page content, layouts or navigation were changed.

Validation:

- Both original PDF pages were rendered and visually inspected.
- `node tests/verify.mjs` passed, including exact supplied-file hash, synchronized preview source hash, two-page count and current CV content checks.
- `tests/cv-browser.html` passed at 1280×720, 1366×768, 1440×900, 1600×900, 1920×1080, 2560×1440, 768×1024 and 390×844. Checks cover PDF MIME/hash, matching View/Download destinations, both preview page images decoding, current selectable text, final-page reachability and horizontal containment. The six desktop layouts have no page-level vertical overflow; the document itself scrolls inside its established viewer.

No CV placeholder remains. Existing placeholders elsewhere are unchanged.

The complete working-tree ZIP has files directly at its root, excludes `.git`, caches, temporary files and transfer archives, and is verified by CRC, exact inventory and per-file SHA-256 against the final unchanged repository. Extract over `F:\Git\santiagoperezlosanovscky`; existing Git metadata is untouched.

Suggested commit: `Update Technical Game Designer CV`
