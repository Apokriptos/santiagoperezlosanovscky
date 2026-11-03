# CV source and web documents

The current authoritative CV is the user-supplied PDF, copied unchanged to `cv-technical-game-designer.pdf`. The earlier `CV — Technical Game Designer — Santiago Perez Losanovscky.docx` is retained only as a historical authoring file and is not used to rebuild the current CV.

- `cv-technical-game-designer.pdf` is the searchable two-page PDF used by View CV and Download PDF.
- `cv-technical-game-designer.html` is the PDF-derived companion shown inside the CV panel. It uses exact page renders with transparent selectable SVG text, preserving the PDF's appearance while supporting browser Find/copy and accessible text. It works without a native PDF plugin.
- `cv-preview-page-1.png` and `cv-preview-page-2.png` are 144-DPI page renders used by that companion.
- `config.cv` in `src/data.js` holds the PDF URL, optional preview URL, source path, and summary. The summary is the first sentence of the supplied professional summary. No unrelated biography, experience, role, or contact fields were populated automatically.

To update the CV, replace the PDF with the supplied final document, then run `python scripts/export_cv.py`. This maintainer tool uses `pdfplumber` and Poppler `pdftoppm` to refresh the companion and page renders directly from the PDF. These are not website runtime dependencies. The script never rewrites the supplied PDF; its SHA-256 is recorded in the companion and checked against the unchanged source.

After refreshing, inspect both pages and the web preview, then check View CV and Download PDF. The summary is the first sentence of the current supplied PDF. About, trajectory, roles and Contact are not automatically rewritten. Setting `previewUrl` to null restores native PDF embedding; setting the PDF `url` to null restores the existing missing-document state.
