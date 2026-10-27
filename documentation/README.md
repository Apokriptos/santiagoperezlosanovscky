# CV source and web documents

The supplied `CV — Technical Game Designer — Santiago Perez Losanovscky.docx` is the original authoring source and is retained unchanged.

- `cv-technical-game-designer.pdf` is the searchable two-page PDF used by View CV, Download PDF, and Contact's Download CV destination.
- `cv-technical-game-designer.html` is a searchable, selectable companion document shown inside the CV panel. It preserves the source wording and remains readable in embedded browsers without a native PDF plugin. It is document HTML, not a screenshot.
- `config.cv` in `src/data.js` holds the PDF URL, optional preview URL, source path, and summary. The summary is the first sentence of the supplied professional summary. No unrelated biography, experience, role, or contact fields were populated automatically.

To update both web documents from the Word source, run `python scripts/export_cv.py` from the repository. This optional maintainer tool uses `python-docx`, `reportlab`, and `pypdf`, plus Windows Arial fonts. These are not website runtime dependencies. The export preserves all source paragraphs, bold/italic runs, source font sizes in the PDF, A4 dimensions/margins, and the intended continued-experience page break. Text wrapping may differ from Word. It verifies that every source paragraph is present in PDF text.

After exporting, visually inspect both PDF pages and the web preview, then check View CV and Download PDF. The Word source is never edited by the script. Setting `previewUrl` to null restores native PDF embedding; setting the PDF `url` to null restores the existing missing-document state.
