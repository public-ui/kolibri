import * as vscode from 'vscode';

type GuiBuilderMessage =
	| {
			type: 'insertCode';
			code: string;
	  }
	| {
			type: 'log';
			message: string;
	  };

function getNonce(): string {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	return Array.from({ length: 16 })
		.map(() => characters.charAt(Math.floor(Math.random() * characters.length)))
		.join('');
}

function buildComponentPalette(): string {
	const components = [
		{ type: 'KolButton', description: 'Button with accessible label' },
		{ type: 'KolInputText', description: 'Single-line text input with label' },
		{ type: 'KolForm', description: 'Lightweight form wrapper' },
	];

	return components
		.map(
			(component) => `
<div class="component" draggable="true" data-type="${component.type}">
<div class="component__title">${component.type}</div>
<div class="component__description">${component.description}</div>
</div>
`,
		)
		.join('');
}

function buildWebviewHtml(webview: vscode.Webview): string {
	const nonce = getNonce();

	return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>KoliBri GUI Builder</title>
<style>
:root {
color-scheme: light dark;
--gap: 12px;
--border-color: rgba(0, 0, 0, 0.12);
}

body {
font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
margin: 0;
padding: 12px;
background: var(--vscode-editor-background);
color: var(--vscode-editor-foreground);
}

h1 {
font-size: 18px;
margin: 0 0 8px;
}

.wrapper {
display: grid;
grid-template-columns: 1fr 1.2fr 1fr;
gap: var(--gap);
min-height: 70vh;
}

.panel {
border: 1px solid var(--border-color);
border-radius: 8px;
padding: 12px;
background: color-mix(in srgb, var(--vscode-editor-background) 85%, transparent);
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
display: flex;
flex-direction: column;
}

.panel h2 {
font-size: 15px;
margin: 0 0 8px;
}

.palette {
display: grid;
gap: 10px;
}

.component {
border: 1px solid var(--border-color);
border-radius: 6px;
padding: 8px 10px;
cursor: grab;
background: color-mix(in srgb, var(--vscode-editor-background) 92%, transparent);
transition: transform 120ms ease, border-color 120ms ease;
}

.component:hover {
transform: translateY(-1px);
border-color: var(--vscode-focusBorder);
}

.component__title {
font-weight: 600;
}

.component__description {
font-size: 12px;
color: var(--vscode-descriptionForeground);
}

.canvas {
flex: 1;
border: 1px dashed var(--border-color);
border-radius: 8px;
padding: 10px;
overflow: auto;
background: color-mix(in srgb, var(--vscode-editor-background) 92%, transparent);
}

.canvas__placeholder {
color: var(--vscode-descriptionForeground);
font-size: 12px;
text-align: center;
padding: 18px 8px;
}

.canvas__item {
border: 1px solid var(--border-color);
border-radius: 6px;
padding: 8px;
margin-bottom: 8px;
background: color-mix(in srgb, var(--vscode-editor-background) 90%, transparent);
cursor: move;
display: grid;
grid-template-columns: 1fr auto;
gap: 8px;
align-items: center;
}

.canvas__item:last-child {
margin-bottom: 0;
}

.canvas__item-title {
font-weight: 600;
}

.canvas__controls {
display: flex;
gap: 8px;
align-items: center;
grid-column: 1 / span 2;
}

.label-input {
width: 100%;
padding: 6px 8px;
border-radius: 6px;
border: 1px solid var(--border-color);
background: var(--vscode-input-background);
color: var(--vscode-input-foreground);
}

button {
background: var(--vscode-button-background);
color: var(--vscode-button-foreground);
border: none;
padding: 8px 10px;
border-radius: 6px;
cursor: pointer;
}

button.secondary {
background: color-mix(in srgb, var(--vscode-button-background) 85%, transparent);
}

.builder-actions {
display: flex;
gap: 8px;
flex-wrap: wrap;
margin-bottom: 8px;
}

textarea {
width: 100%;
min-height: 80px;
background: var(--vscode-input-background);
color: var(--vscode-input-foreground);
border: 1px solid var(--border-color);
border-radius: 8px;
padding: 8px;
font-family: monospace;
}

.preview {
flex: 1;
overflow: auto;
border: 1px solid var(--border-color);
border-radius: 8px;
padding: 10px;
background: color-mix(in srgb, var(--vscode-editor-background) 90%, transparent);
}

.preview pre {
margin: 0;
white-space: pre-wrap;
}
</style>
</head>
<body>
<h1>KoliBri GUI Builder</h1>
<p>Drag components onto the canvas, edit labels, and insert the generated React code into your active file.</p>
<div class="wrapper">
<section class="panel">
<h2>Component Palette</h2>
<div id="palette" class="palette">${buildComponentPalette()}</div>
</section>
<section class="panel">
<h2>Canvas</h2>
<div id="canvas" class="canvas" aria-label="Canvas"></div>
</section>
<section class="panel">
<h2>Generated React Code</h2>
<div class="builder-actions">
<button id="insert">Insert into active file</button>
<button id="export" class="secondary">Export layout JSON</button>
<button id="import" class="secondary">Load layout JSON</button>
</div>
<div class="preview"><pre id="preview" aria-live="polite"></pre></div>
<label for="layout-input">Layout JSON</label>
<textarea id="layout-input" aria-label="Layout JSON"></textarea>
</section>
</div>

<script nonce="${nonce}">
const vscode = acquireVsCodeApi();
const palette = document.getElementById('palette');
const canvas = document.getElementById('canvas');
const preview = document.getElementById('preview');
const layoutInput = document.getElementById('layout-input');
const layout = [];
const createId = () =>
crypto.randomUUID
? crypto.randomUUID()
: Date.now().toString(36) + '-' + Math.random().toString(16).slice(2);

const defaults = {
KolButton: { label: 'Click me', on: "{'onClick': () => console.log('clicked')}" },
KolInputText: { label: 'Label', name: 'field' },
KolForm: { legend: 'Example form' },
};

function updatePreview() {
preview.textContent = generateKolibriCode(layout);
}

function generateKolibriCode(items) {
return items
.map((item) => {
if (item.type === 'KolButton') {
const label = escapeProp(item.props.label || 'Click me');
return \`<KolButton _label="\${label}" _on={{ onClick: () => console.log('\${label}') }} />\`;
}

if (item.type === 'KolInputText') {
const label = escapeProp(item.props.label || 'Label');
const name = escapeProp(item.props.name || 'field');
return \`<KolInputText _label="\${label}" _name="\${name}" />\`;
}

if (item.type === 'KolForm') {
const legend = escapeProp(item.props.legend || 'Form');
return \`<KolForm _legend="\${legend}">\n  {/* Add form controls here */}\n</KolForm>\`;
}

return \`<!-- Unsupported component: \${item.type} -->\`;
})
.join('\n');
}

function escapeProp(value) {
return String(value).replace(/"/g, '\\"');
}

function renderCanvas() {
canvas.innerHTML = '';

if (!layout.length) {
const placeholder = document.createElement('div');
placeholder.className = 'canvas__placeholder';
placeholder.textContent = 'Drag a component from the palette to start building.';
canvas.appendChild(placeholder);
updatePreview();
return;
}

layout.forEach((item) => {
const element = document.createElement('div');
element.className = 'canvas__item';
element.draggable = true;
element.dataset.id = item.id;

const title = document.createElement('div');
title.className = 'canvas__item-title';
title.textContent = item.type;
element.appendChild(title);

const removeButton = document.createElement('button');
removeButton.className = 'secondary';
removeButton.textContent = 'Remove';
removeButton.addEventListener('click', () => {
const index = layout.findIndex((entry) => entry.id === item.id);
if (index > -1) {
layout.splice(index, 1);
renderCanvas();
}
});
element.appendChild(removeButton);

const controls = document.createElement('div');
controls.className = 'canvas__controls';

const labelInput = document.createElement('input');
labelInput.className = 'label-input';
labelInput.placeholder = '_label';
labelInput.value = item.props.label ?? '';
labelInput.addEventListener('input', (event) => {
item.props.label = event.target.value;
updatePreview();
});
controls.appendChild(labelInput);

if (item.type === 'KolInputText') {
const nameInput = document.createElement('input');
nameInput.className = 'label-input';
nameInput.placeholder = '_name';
nameInput.value = item.props.name ?? '';
nameInput.addEventListener('input', (event) => {
item.props.name = event.target.value;
updatePreview();
});
controls.appendChild(nameInput);
}

if (item.type === 'KolForm') {
const legendInput = document.createElement('input');
legendInput.className = 'label-input';
legendInput.placeholder = '_legend';
legendInput.value = item.props.legend ?? '';
legendInput.addEventListener('input', (event) => {
item.props.legend = event.target.value;
updatePreview();
});
controls.appendChild(legendInput);
}

element.appendChild(controls);

element.addEventListener('dragstart', (event) => {
event.dataTransfer?.setData('text/plain', item.id);
});

element.addEventListener('dragover', (event) => {
event.preventDefault();
});

element.addEventListener('drop', (event) => {
event.preventDefault();
const draggedId = event.dataTransfer?.getData('text/plain');
if (!draggedId || draggedId === item.id) {
return;
}

const fromIndex = layout.findIndex((entry) => entry.id === draggedId);
const toIndex = layout.findIndex((entry) => entry.id === item.id);

if (fromIndex > -1 && toIndex > -1) {
const [moved] = layout.splice(fromIndex, 1);
layout.splice(toIndex, 0, moved);
renderCanvas();
}
});

canvas.appendChild(element);
});

updatePreview();
}

function addComponent(type) {
const base = defaults[type] || { label: type };
layout.push({ id: createId(), type, props: { ...base } });
renderCanvas();
}

palette.addEventListener('dragstart', (event) => {
const target = event.target;
if (target instanceof HTMLElement && target.dataset.type) {
event.dataTransfer?.setData('text/plain', target.dataset.type);
}
});

canvas.addEventListener('dragover', (event) => {
event.preventDefault();
});

canvas.addEventListener('drop', (event) => {
event.preventDefault();
const type = event.dataTransfer?.getData('text/plain');
if (type) {
addComponent(type);
}
});

palette.addEventListener('click', (event) => {
const target = event.target;
const component = target?.closest('.component');
if (component instanceof HTMLElement && component.dataset.type) {
addComponent(component.dataset.type);
}
});

document.getElementById('insert').addEventListener('click', () => {
vscode.postMessage({ type: 'insertCode', code: preview.textContent || '' });
});

document.getElementById('export').addEventListener('click', () => {
layoutInput.value = JSON.stringify(layout, null, 2);
vscode.postMessage({ type: 'log', message: 'Layout exported to JSON textarea.' });
});

document.getElementById('import').addEventListener('click', () => {
try {
const nextLayout = JSON.parse(layoutInput.value || '[]');
if (Array.isArray(nextLayout)) {
layout.splice(0, layout.length, ...nextLayout.map((entry) => ({ ...entry, id: entry.id || createId() })));
renderCanvas();
}
} catch (error) {
vscode.postMessage({ type: 'log', message: \`Import failed: \${error?.message || error}\` });
}
});

renderCanvas();
</script>
</body>
</html>`;
}

export function openGuiBuilder(channel: vscode.OutputChannel): void {
	const panel = vscode.window.createWebviewPanel('kolibriGuiBuilder', 'KoliBri GUI Builder', vscode.ViewColumn.Beside, {
		enableScripts: true,
		retainContextWhenHidden: true,
	});

	panel.webview.html = buildWebviewHtml(panel.webview);

	panel.webview.onDidReceiveMessage(async (message: GuiBuilderMessage) => {
		if (message.type === 'log') {
			channel.appendLine(`[GUI Builder] ${message.message}`);
			return;
		}

		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('Open a document to insert KoliBri code.');
			return;
		}

		await editor.edit((editBuilder) => {
			editBuilder.insert(editor.selection.active, message.code);
		});

		vscode.window.showInformationMessage('Inserted KoliBri code from the GUI Builder.');
	});
}
