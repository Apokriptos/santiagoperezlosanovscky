import { escape as e } from './html.js';
import { icon, roleIcon } from './ui-icons.js';
export { icon, roleIcon } from './ui-icons.js';

// HTML slots are trusted renderer output; public-facing labels are escaped.
const classes = (...values) => values.filter(Boolean).join(' ');
const headingTag = level => {
  if (![1,2,3,4,5,6].includes(level)) throw new RangeError('Heading level must be 1–6');
  return 'h'+level;
};
function attrs(values = {}) {
  return Object.entries(values).map(([name,value])=>{
    if (!/^(aria-[\w-]+|data-[\w-]+|id|title|name|value)$/.test(name)) throw new TypeError('Unsupported UI attribute: '+name);
    return value == null ? '' : ` ${name}="${e(value)}"`;
  }).join('');
}
function hrefValue(value) {
  const href=String(value);
  if (/^[a-z][\w+.-]*:/i.test(href) && !/^(https?:|mailto:)/i.test(href)) throw new TypeError('Unsafe UI link');
  if (/[\u0000-\u001f\u007f]/.test(href) || href.startsWith('//')) throw new TypeError('Unsafe UI link');
  return href;
}
export function pageTitle(label,{level=1,slash=true,className=''}={}) {
  const tag=headingTag(level);
  return `<${tag} class="${e(classes('ui-page-title',slash&&'ui-page-title--slash',className))}"><span class="ui-plate">${e(label)}</span></${tag}>`;
}
export function sectionTitle(label,{level=2,tone='red',className=''}={}) {
  const tag=headingTag(level);
  return `<${tag} class="${e(classes('ui-section-title',className))}"><span class="ui-plate ${tone==='red'?'ui-plate--red':''}">${e(label)}</span></${tag}>`;
}
export function headerPlate(label,{level=2,className=''}={}) {
  const tag=headingTag(level);
  return `<${tag} class="${e(classes('ui-header-plate',className))}"><span class="ui-plate">${e(label)}</span></${tag}>`;
}
export function surface(content,{tag='section',accent=false,square=false,dark=false,className='',overlay=''}={}) {
  if (!['section','article','div','figure','aside'].includes(tag)) throw new TypeError('Unsupported surface element');
  return `<${tag} class="${e(classes('ui-surface',accent&&'ui-surface--accent',square&&'ui-surface--square',dark&&'ui-surface--dark',className))}"><div class="ui-surface__edge"><div class="ui-surface__body">${content}</div></div>${overlay}</${tag}>`;
}
export function button(label,{href=null,variant='neutral',compact=false,arrowHousing=false,iconName=null,disabled=false,iconOnly=false,className='',attributes={}}={}) {
  if (label == null || !String(label).trim()) throw new TypeError('A UI button needs a label');
  if (!['neutral','secondary','primary'].includes(variant)) throw new RangeError('Unknown button variant');
  if (iconOnly && !iconName) throw new TypeError('Icon-only controls need an icon');
  const cls=classes('ui-btn',variant==='secondary'&&'ui-btn--secondary',variant==='primary'&&'ui-btn--primary',compact&&'ui-btn--compact',arrowHousing&&'ui-btn--arrow',className);
  const content=(iconName?icon(iconName):'')+(iconOnly?'':`<span class="ui-btn__label">${e(label)}</span>`)+(arrowHousing?`<span class="ui-btn__arrow" aria-hidden="true">${icon('arrow-right')}</span>`:'');
  const labelAttr=iconOnly?` aria-label="${e(label)}"`:'';
  if (href!=null) return `<a class="${e(cls)}"${disabled?' role="link" aria-disabled="true" tabindex="-1"':` href="${e(hrefValue(href))}"`}${labelAttr}${attrs(attributes)}>${content}</a>`;
  return `<button class="${e(cls)}" type="button"${disabled?' disabled':''}${labelAttr}${attrs(attributes)}>${content}</button>`;
}
export function carouselArrow(direction,{label,disabled=false,className='',attributes={}}={}) {
  if (!['previous','next'].includes(direction)) throw new RangeError('Use previous or next');
  if (!label) throw new TypeError('Carousel arrows require a specific accessible label');
  return button(label,{iconOnly:true,iconName:direction,disabled,className:classes('ui-carousel-arrow','ui-carousel-arrow--'+(direction==='previous'?'prev':'next'),className),attributes});
}
export function indexTabs(items,{label='Page index',className=''}={}) {
  return `<nav class="${e(classes('ui-index',className))}" aria-label="${e(label)}">${items.map((item,i)=>button(item.label??String(i+1),{href:item.href??null,disabled:!!item.disabled,compact:true,className:'ui-index-tab',attributes:{...(item.href?item.active?{'aria-current':'page'}:{}:{'aria-pressed':!!item.active}),'data-ui-index':i}})).join('')}</nav>`;
}
export function contextRail({kind,title,items,legacy=false}) {
  const modifiers={generic:'',projects:'ui-project-rail',roles:'ui-role-rail','case-studies':'ui-case-study-rail'};
  if (!Object.hasOwn(modifiers,kind)) throw new RangeError('Unknown contextual rail kind');
  return `<aside class="${classes(legacy&&'right-rail','ui-context-rail',modifiers[kind])}"><h2 class="ui-context-rail__heading"><span class="index-label ui-context-rail__label">${e(title)}</span></h2><nav class="ui-context-rail__track" aria-label="${e(title)}">${items.map(item=>`<a class="ui-context-rail__item" href="${e(hrefValue(item.href))}"${item.active?' aria-current="page"':''}><span class="ui-context-rail__marker" aria-hidden="true"></span><span class="index-label ui-context-rail__label">${e(item.title)}</span></a>`).join('')}</nav></aside>`;
}
export function mediaFrame(content,{label='Media',controls='',ratio='16 / 9',accent=true,className=''}={}) {
  if (!/^\d+(?:\.\d+)?\s*\/\s*\d+(?:\.\d+)?$/.test(ratio) || ratio.split('/').some(n=>Number(n)<=0)) throw new TypeError('Use a positive standard media ratio');
  const [width,height]=ratio.split('/').map(Number);
  if (!Number.isFinite(width) || !Number.isFinite(height) || width<=height) throw new TypeError('Media frames require a landscape ratio');
  return surface(`<div class="ui-media-frame__viewport" style="--ui-media-ratio:${e(ratio)}" role="group" aria-label="${e(label)}">${content}</div>`,{tag:'figure',accent,className:classes('ui-media-frame',className),overlay:controls?`<div class="ui-media-frame__controls">${controls}</div>`:''});
}
