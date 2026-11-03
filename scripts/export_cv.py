"""Refresh the embedded CV preview from the supplied PDF; never rewrite the PDF.

Maintainer dependencies: pdfplumber and Poppler pdftoppm. No browser dependencies.
"""
from pathlib import Path
from html import escape
import hashlib
import shutil
import subprocess
import pdfplumber

repo = Path(__file__).resolve().parents[1]
source = repo / 'documentation/cv-technical-game-designer.pdf'
destination = source.with_suffix('.html')
before = source.read_bytes()
digest = hashlib.sha256(before).hexdigest()
renderer = shutil.which('pdftoppm')
if not renderer:
    raise RuntimeError('Install Poppler pdftoppm before refreshing the CV preview.')
prefix = source.with_name('cv-preview-page')
subprocess.run([renderer, '-r', '144', '-png', str(source), str(prefix)], check=True)

pages = []
with pdfplumber.open(source) as pdf:
    for number, page in enumerate(pdf.pages, 1):
        # Exact PDF render plus transparent text for Find/copy and accessibility.
        text = []
        for line in page.extract_text_lines():
            label = escape(line['text'])
            x, top, right, bottom = (line[k] for k in ('x0', 'top', 'x1', 'bottom'))
            size = bottom - top
            text.append(f'<text x="{x:.3f}" y="{bottom-size*.18:.3f}" font-size="{size:.3f}" textLength="{right-x:.3f}" lengthAdjust="spacingAndGlyphs">{label}</text>')
        image = f'cv-preview-page-{number}.png'
        assert (source.parent / image).exists(), image
        pages.append(f'<section class="document-page" aria-label="CV page {number} of {len(pdf.pages)}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {page.width} {page.height}"><image href="{image}" width="{page.width}" height="{page.height}" aria-hidden="true"/><g fill="transparent" font-family="Arial, sans-serif">'+''.join(text)+'</g></svg></section>')
    count = len(pdf.pages)

html = '''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Santiago Pérez Losanovscky — Technical Game Designer CV</title>
<style>*{box-sizing:border-box}body{margin:0;padding:16px;background:#e5e1d9;color:#171717;font:14px/1.5 Arial,sans-serif}main{max-width:900px;margin:auto}.document-page{margin:0 0 16px;background:#fff;box-shadow:0 2px 10px #0002}.document-page svg{display:block;width:100%;height:auto}text{user-select:text;cursor:text}text::selection{fill:transparent;background:#db262650}nav{max-width:900px;margin:0 auto 14px}a{color:#222;text-underline-offset:3px}a:focus-visible{outline:3px solid #bf1118;outline-offset:3px}@media(max-width:450px){body{padding:8px}}@media print{body{padding:0;background:#fff}nav{display:none}.document-page{margin:0;box-shadow:none;break-after:page}}</style>
<nav aria-label="CV document"><a href="cv-technical-game-designer.pdf" target="_blank" rel="noopener noreferrer">Open original PDF</a></nav>
'''+f'<main data-source-sha256="{digest}" data-page-count="{count}">'+''.join(pages)+'</main></html>\n'
destination.write_text(html, encoding='utf-8')
assert source.read_bytes() == before, 'Supplied PDF must remain unchanged'
print(f'Generated {count} faithful, selectable CV preview pages. PDF SHA-256: {digest}')
