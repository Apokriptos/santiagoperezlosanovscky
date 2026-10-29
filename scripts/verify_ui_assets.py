"""Validate canonical SVG assets without changing the portfolio application."""
from pathlib import Path
import json, hashlib, xml.etree.ElementTree as ET
root = Path(__file__).resolve().parents[1]
index = json.loads((root/'assets/ui/asset-index.json').read_text(encoding='utf-8'))
required_roles = {'technical-game-design','level-design','gameplay-development','creative-leadership','technical-animation','product-ownership'}
assert {entry['id'] for entry in index['entries'] if entry['family']=='roles'} == required_roles
assert len(index['entries']) == 13
allowed = {'svg','path','circle','rect'}
seen = set()
for entry in index['entries']:
    path = root / entry['path']
    source = path.read_text(encoding='utf-8')
    assert len(source.encode('utf-8')) < 2048, entry['path']
    svg = ET.fromstring(source)
    assert svg.attrib['viewBox']=='0 0 24 24' and svg.attrib['stroke-width']=='2.25'
    assert svg.attrib['stroke']=='currentColor'
    assert 'width' not in svg.attrib and 'height' not in svg.attrib
    assert len(list(svg)) > 0
    for node in svg.iter():
        assert node.tag.split('}')[-1] in allowed, entry['path']
        assert not (node.text or '').strip(), 'No baked text'
        for key,value in node.attrib.items():
            assert not key.startswith('on') and not key.endswith('href')
            assert 'data:' not in value and 'url(' not in value
    digest=hashlib.sha256(source.encode()).hexdigest()
    assert digest not in seen, 'Do not duplicate SVGs under aliases'
    seen.add(digest)
assert index['aliases']['previous']=='arrow-left' and index['aliases']['next']=='arrow-right'
assert not list((root/'assets/ui').rglob('*previous*.svg'))
assert not list((root/'assets/ui').rglob('*next*.svg'))
print('13 canonical SVGs passed XML, viewBox, weight, currentColor, complexity, no-raster/text/script/external-resource and duplicate/alias checks.')
