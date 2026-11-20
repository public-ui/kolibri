import { formatBytes } from './sizes.mjs';

const escapeHtml = (text) => String(text).replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

/**
 * Serializes data for a `<script type="application/json">` block; `<` is escaped so no string can close it.
 */
const toJsonScript = (data) => JSON.stringify(data).replace(/</g, '\\u003c');

const STYLE = `
:root {
	color-scheme: light dark;
	--bg: #ffffff; --fg: #1d1d1f; --muted: #5b5b66; --line: #d5d5dc; --panel: #f5f5f8;
	--own: #9ec5fe; --dependency: #ffc58a; --runtime: #cdb4f6; --css: #a6e3b4; --duplicate: #f5a3a3;
	--comment: #dadada; --chunk: #e3e3ea; --other: #d0d0d0;
}
@media (prefers-color-scheme: dark) {
	:root {
		--bg: #17171a; --fg: #ececf1; --muted: #a9a9b6; --line: #3a3a44; --panel: #212127;
		--own: #2f5d9c; --dependency: #92551b; --runtime: #5f4596; --css: #2f7a45; --duplicate: #9c3333;
		--comment: #4a4a4a; --chunk: #2b2b33; --other: #444;
	}
}
* { box-sizing: border-box; }
body { margin: 0; padding: 16px; background: var(--bg); color: var(--fg); font: 14px/1.4 system-ui, sans-serif; }
h1 { font-size: 20px; margin: 0 0 4px; }
p { margin: 0 0 12px; color: var(--muted); }
.bar { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; margin-bottom: 8px; }
fieldset { border: 1px solid var(--line); border-radius: 6px; padding: 4px 10px; margin: 0; }
legend { padding: 0 4px; color: var(--muted); }
nav ol { display: flex; flex-wrap: wrap; gap: 4px; list-style: none; margin: 0; padding: 0; }
nav li + li::before { content: '›'; margin-right: 4px; color: var(--muted); }
nav button { background: none; border: 0; color: inherit; text-decoration: underline; cursor: pointer; font: inherit; padding: 2px; }
#map { position: relative; width: 100%; height: min(70vh, 640px); border: 1px solid var(--line); border-radius: 6px; }
.tile { position: absolute; border: 1px solid var(--bg); padding: 2px 4px; font-size: 12px; color: var(--fg); cursor: default; }
.tile[data-zoom] { cursor: zoom-in; }
.tile:focus-visible { outline: 3px solid var(--fg); outline-offset: -3px; z-index: 2; }
.tile > .label { display: block; white-space: nowrap; text-overflow: ellipsis; pointer-events: none; font-weight: 600; }
.tile .inner { position: absolute; border: 1px solid var(--bg); opacity: 0.85; pointer-events: none; }
.legend { display: flex; flex-wrap: wrap; gap: 10px; margin: 8px 0; color: var(--muted); }
.legend span::before { content: ''; display: inline-block; width: 12px; height: 12px; margin-right: 4px; vertical-align: -1px; background: var(--swatch); border: 1px solid var(--line); }
#detail { min-height: 2.8em; margin: 8px 0; padding: 6px 10px; background: var(--panel); border-radius: 6px; }
table { border-collapse: collapse; width: 100%; margin: 8px 0 24px; }
th, td { text-align: left; padding: 4px 8px; border-bottom: 1px solid var(--line); vertical-align: top; }
td.num, th.num { text-align: right; white-space: nowrap; }
h2 { font-size: 16px; margin: 20px 0 4px; }
`;

const SCRIPT = `
const data = JSON.parse(document.getElementById('data').textContent);
const KINDS = ['own', 'dependency', 'runtime', 'css', 'duplicate', 'comment', 'chunk', 'other'];
const map = document.getElementById('map');
const crumbs = document.getElementById('crumbs');
const detail = document.getElementById('detail');
const tbody = document.getElementById('children');
let metric = 'gzip';
let path = [data.tree];

const fmt = (bytes) => bytes < 1024 ? bytes + ' B' : bytes < 1048576 ? (bytes / 1024).toFixed(1) + ' KB' : (bytes / 1048576).toFixed(2) + ' MB';
const value = (node) => node.sizes[metric] || 0;
const color = (kind) => 'var(--' + (KINDS.includes(kind) ? kind : 'other') + ')';
const describe = (node) => node.name + ' – ' + fmt(node.sizes.raw) + ' raw, ' + fmt(node.sizes.gzip) + ' gzip' + (node.sizes.brotli ? ', ' + fmt(node.sizes.brotli) + ' brotli' : '') + (node.meta ? ' – ' + node.meta : '');

function worst(row, length) {
	const sum = row.reduce((total, item) => total + item.area, 0);
	const max = Math.max(...row.map((item) => item.area));
	const min = Math.min(...row.map((item) => item.area));
	return Math.max((length * length * max) / (sum * sum), (sum * sum) / (length * length * min));
}

function squarify(nodes, x, y, w, h) {
	const total = nodes.reduce((sum, node) => sum + value(node), 0);
	const items = nodes.filter((node) => value(node) > 0).sort((a, b) => value(b) - value(a)).map((node) => ({ node, area: (value(node) / total) * w * h }));
	const out = [];
	while (items.length > 0) {
		const length = Math.min(w, h);
		const row = [items.shift()];
		while (items.length > 0 && worst([...row, items[0]], length) <= worst(row, length)) row.push(items.shift());
		const sum = row.reduce((total, item) => total + item.area, 0);
		const thickness = sum / length;
		let offset = 0;
		for (const item of row) {
			const size = item.area / thickness;
			out.push(w >= h ? { node: item.node, x, y: y + offset, w: thickness, h: size } : { node: item.node, x: x + offset, y, w: size, h: thickness });
			offset += size;
		}
		if (w >= h) { x += thickness; w -= thickness; } else { y += thickness; h -= thickness; }
	}
	return out;
}

function render() {
	const current = path[path.length - 1];
	map.replaceChildren();
	const width = map.clientWidth;
	const height = map.clientHeight;
	for (const rect of squarify(current.children || [], 0, 0, width, height)) {
		const tile = document.createElement('div');
		tile.className = 'tile';
		Object.assign(tile.style, { left: rect.x + 'px', top: rect.y + 'px', width: rect.w + 'px', height: rect.h + 'px', background: color(rect.node.kind) });
		tile.title = describe(rect.node);
		tile.tabIndex = 0;
		tile.setAttribute('aria-label', describe(rect.node));
		if (rect.node.children) {
			tile.dataset.zoom = '';
			tile.setAttribute('role', 'button');
			const top = rect.h > 30 ? 18 : 0;
			if (rect.w > 40 && rect.h > 40) {
				for (const inner of squarify(rect.node.children, 2, top, rect.w - 4, rect.h - top - 2)) {
					const box = document.createElement('div');
					box.className = 'inner';
					Object.assign(box.style, { left: inner.x + 'px', top: inner.y + 'px', width: inner.w + 'px', height: inner.h + 'px', background: color(inner.node.kind) });
					tile.append(box);
				}
			}
		}
		if (rect.w > 50 && rect.h > 16) {
			const label = document.createElement('span');
			label.className = 'label';
			label.textContent = rect.node.name;
			tile.prepend(label);
		}
		tile.addEventListener('mouseenter', () => { detail.textContent = describe(rect.node); });
		tile.addEventListener('focus', () => { detail.textContent = describe(rect.node); });
		const zoom = () => { if (rect.node.children) { path.push(rect.node); render(); } };
		tile.addEventListener('click', zoom);
		tile.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); zoom(); } });
		map.append(tile);
	}
	crumbs.replaceChildren(...path.map((node, index) => {
		const item = document.createElement('li');
		const button = document.createElement('button');
		button.type = 'button';
		button.textContent = node.name;
		if (index === path.length - 1) button.setAttribute('aria-current', 'location');
		button.addEventListener('click', () => { path = path.slice(0, index + 1); render(); });
		item.append(button);
		return item;
	}));
	const total = value(current) || 1;
	tbody.replaceChildren(...[...(current.children || [])].sort((a, b) => value(b) - value(a)).map((node) => {
		const row = document.createElement('tr');
		for (const [text, numeric] of [[node.name, false], [node.kind, false], [fmt(node.sizes.raw), true], [fmt(node.sizes.gzip), true], [node.sizes.brotli ? fmt(node.sizes.brotli) : '–', true], [((value(node) / total) * 100).toFixed(1) + ' %', true]]) {
			const cell = document.createElement('td');
			cell.textContent = text;
			if (numeric) cell.className = 'num';
			row.append(cell);
		}
		return row;
	}));
	detail.textContent = describe(current);
}

for (const input of document.querySelectorAll('input[name=metric]')) {
	input.addEventListener('change', () => { metric = input.value; render(); });
}
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && path.length > 1) { path.pop(); render(); } });
new ResizeObserver(() => render()).observe(map);
`;

/**
 * Renders a self-contained HTML page: a zoomable treemap of `tree`, a table of the current level and the
 * restructuring candidates. It loads nothing from the network.
 */
export function renderHtml({ markdownSummary, name, report, tree }) {
	const candidates = report.candidates
		.slice(0, 25)
		.map(
			(candidate, index) =>
				`<tr><td class="num">${index + 1}</td><td>${escapeHtml(candidate.kind)}</td><td>${escapeHtml(candidate.subject)}</td><td class="num">${
					candidate.impactGzip === undefined ? `${formatBytes(candidate.impactRaw)} raw` : `${formatBytes(candidate.impactGzip)} gzip`
				}</td><td>${escapeHtml(candidate.action)}</td></tr>`,
		)
		.join('');
	const legend = [
		['own', 'own code'],
		['dependency', 'dependency'],
		['runtime', 'Stencil runtime'],
		['css', 'CSS'],
		['duplicate', 'duplicated CSS'],
		['comment', 'CSS comments'],
		['chunk', 'chunk / group'],
	]
		.map(([kind, text]) => `<span style="--swatch: var(--${kind})">${text}</span>`)
		.join('');

	return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Size gate – ${escapeHtml(name)}</title>
<style>${STYLE}</style>
</head>
<body>
<main>
<h1>Size gate – ${escapeHtml(name)}</h1>
<p>${escapeHtml(markdownSummary)}</p>
<div class="bar">
<fieldset><legend>Size</legend>
<label><input type="radio" name="metric" value="raw"> raw</label>
<label><input type="radio" name="metric" value="gzip" checked> gzip</label>
<label><input type="radio" name="metric" value="brotli"> brotli</label>
</fieldset>
<nav aria-label="Treemap level"><ol id="crumbs"></ol></nav>
</div>
<div class="legend">${legend}</div>
<div id="map" aria-label="Treemap; select a tile to zoom in, Escape zooms out"></div>
<div id="detail" aria-live="polite"></div>
<h2>Current level</h2>
<table><thead><tr><th>Name</th><th>Kind</th><th class="num">raw</th><th class="num">gzip</th><th class="num">brotli</th><th class="num">Share</th></tr></thead><tbody id="children"></tbody></table>
<h2>Restructuring candidates</h2>
<table><thead><tr><th class="num">#</th><th>Kind</th><th>Subject</th><th class="num">Impact</th><th>Action</th></tr></thead><tbody>${candidates}</tbody></table>
</main>
<script type="application/json" id="data">${toJsonScript({ tree })}</script>
<script>${SCRIPT}</script>
</body>
</html>
`;
}
