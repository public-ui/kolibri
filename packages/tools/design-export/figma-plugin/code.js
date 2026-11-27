/**
 * KoliBri Import for Figma: aligns the open file with `figma-import.json` of the design export
 * (`pnpm --filter @public-ui/design-export start:spec`).
 *
 * - Variables: one collection per theme with the modes Light and Dark; a frame switches the scheme
 *   through its explicit variable mode (Figma concept #11379, scheme switch per frame).
 * - Components: one component set per block on the page `KoliBri`, one variant per axis value
 *   combination. Components are found again through the plugin data `kolibri-key` and rebuilt in
 *   place, so their ids stay and instances in other files stay linked.
 *
 * Code → Figma only: manual changes inside the main components are overwritten by the next run.
 */
figma.showUI(__html__, { width: 380, height: 340 });

const PAGE_NAME = 'KoliBri';
const KEY = 'kolibri-key';

function log(text) {
	figma.ui.postMessage({ type: 'log', text });
}

function rgb(color) {
	const value = String(color).trim().toLowerCase();
	let match = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/.exec(value);
	if (match) return { r: parseInt(match[1], 16) / 255, g: parseInt(match[2], 16) / 255, b: parseInt(match[3], 16) / 255, a: 1 };
	match = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/.exec(value);
	if (match)
		return { r: parseInt(match[1] + match[1], 16) / 255, g: parseInt(match[2] + match[2], 16) / 255, b: parseInt(match[3] + match[3], 16) / 255, a: 1 };
	match = /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?/.exec(value);
	if (match) return { r: Number(match[1]) / 255, g: Number(match[2]) / 255, b: Number(match[3]) / 255, a: match[4] === undefined ? 1 : Number(match[4]) };
	return null;
}

async function syncVariables(spec) {
	const collections = await figma.variables.getLocalVariableCollectionsAsync();
	let collection = collections.find((candidate) => candidate.name === spec.collection);
	if (!collection) collection = figma.variables.createVariableCollection(spec.collection);
	collection.renameMode(collection.modes[0].modeId, 'Light');
	if (!collection.modes.some((mode) => mode.name === 'Dark')) collection.addMode('Dark');
	const modeIds = {};
	for (const mode of collection.modes) modeIds[mode.name] = mode.modeId;

	const existing = (await figma.variables.getLocalVariablesAsync()).filter((variable) => variable.variableCollectionId === collection.id);
	const byName = new Map(existing.map((variable) => [variable.name, variable]));
	let created = 0;
	for (const entry of spec.variables) {
		let variable = byName.get(entry.name);
		if (variable && variable.resolvedType !== entry.type) {
			variable.remove();
			variable = undefined;
		}
		if (!variable) {
			variable = figma.variables.createVariable(entry.name, collection, entry.type);
			byName.set(entry.name, variable);
			created++;
		}
		for (const mode of ['Light', 'Dark']) {
			const raw = entry.values[mode];
			const value = entry.type === 'COLOR' ? rgb(raw) : raw;
			if (value !== null) variable.setValueForMode(modeIds[mode], value);
		}
	}
	log(`Variablen: ${spec.variables.length} abgeglichen, ${created} neu (Sammlung „${spec.collection}“, Modi Light/Dark).`);
	return byName;
}

async function loadFonts() {
	const fonts = { 400: { family: 'Inter', style: 'Regular' }, 700: { family: 'Inter', style: 'Bold' } };
	try {
		await figma.loadFontAsync({ family: 'Verdana', style: 'Regular' });
		await figma.loadFontAsync({ family: 'Verdana', style: 'Bold' });
		fonts[400] = { family: 'Verdana', style: 'Regular' };
		fonts[700] = { family: 'Verdana', style: 'Bold' };
	} catch (error) {
		await figma.loadFontAsync(fonts[400]);
		await figma.loadFontAsync(fonts[700]);
		log('Verdana ist nicht verfügbar, Texte nutzen Inter.');
	}
	return (weight) => (weight >= 600 ? fonts[700] : fonts[400]);
}

function paint(entry, variables) {
	const color = rgb(entry.color);
	if (!color) return null;
	let solid = { type: 'SOLID', color: { r: color.r, g: color.g, b: color.b }, opacity: color.a };
	const variable = entry.variable ? variables.get(entry.variable) : undefined;
	if (variable) solid = figma.variables.setBoundVariableForPaint(solid, 'color', variable);
	return solid;
}

function applyFrame(frame, node, variables) {
	frame.name = node.name;
	frame.clipsContent = false;
	frame.resize(Math.max(node.width, 0.01), Math.max(node.height, 0.01));
	frame.layoutMode = node.layoutMode || 'NONE';
	if (frame.layoutMode !== 'NONE') {
		frame.itemSpacing = node.itemSpacing || 0;
		frame.primaryAxisAlignItems = node.primaryAxisAlignItems || 'MIN';
		frame.counterAxisAlignItems = node.counterAxisAlignItems || 'MIN';
		const padding = node.padding || [0, 0, 0, 0];
		frame.paddingTop = padding[0];
		frame.paddingRight = padding[1];
		frame.paddingBottom = padding[2];
		frame.paddingLeft = padding[3];
	}
	const fill = node.fill ? paint(node.fill, variables) : null;
	frame.fills = fill ? [fill] : [];
	const stroke = node.stroke ? paint(node.stroke, variables) : null;
	frame.strokes = stroke ? [stroke] : [];
	if (stroke) {
		frame.strokeAlign = 'INSIDE';
		frame.strokeTopWeight = node.stroke.weights[0];
		frame.strokeRightWeight = node.stroke.weights[1];
		frame.strokeBottomWeight = node.stroke.weights[2];
		frame.strokeLeftWeight = node.stroke.weights[3];
	}
	const radius = node.radius || [0, 0, 0, 0];
	frame.topLeftRadius = radius[0];
	frame.topRightRadius = radius[1];
	frame.bottomRightRadius = radius[2];
	frame.bottomLeftRadius = radius[3];
	const ring = node.focusRing ? rgb(node.focusRing.color) : null;
	if (ring) {
		let effect = { type: 'DROP_SHADOW', color: ring, offset: { x: 0, y: 0 }, radius: 0, spread: node.focusRing.spread, visible: true, blendMode: 'NORMAL' };
		const variable = node.focusRing.variable ? variables.get(node.focusRing.variable) : undefined;
		if (variable) effect = figma.variables.setBoundVariableForEffect(effect, 'color', variable);
		frame.effects = [effect];
	} else {
		frame.effects = [];
	}
	frame.opacity = node.opacity === undefined ? 1 : node.opacity;
}

function buildChildren(parent, node, variables, fontOf) {
	for (const child of node.children) {
		let shape;
		if (child.type === 'TEXT') {
			shape = figma.createText();
			shape.fontName = fontOf(child.fontWeight || 400);
			shape.characters = child.characters || ' ';
			shape.fontSize = child.fontSize || 16;
			if (child.lineHeight) shape.lineHeight = { value: child.lineHeight, unit: 'PIXELS' };
			if (child.textDecoration) shape.textDecoration = child.textDecoration === 'underline' ? 'UNDERLINE' : 'STRIKETHROUGH';
			const fill = child.fill ? paint(child.fill, variables) : null;
			if (fill) shape.fills = [fill];
			shape.name = child.name;
			shape.textAutoResize = 'WIDTH_AND_HEIGHT';
			parent.appendChild(shape);
		} else if (child.type === 'VECTOR') {
			shape = figma.createNodeFromSvg(child.svg);
			shape.name = child.name;
			shape.fills = [];
			const fill = child.fill ? paint(child.fill, variables) : null;
			if (fill) for (const vector of shape.findAll((candidate) => candidate.type === 'VECTOR')) vector.fills = [fill];
			parent.appendChild(shape);
			shape.resize(Math.max(child.width, 0.01), Math.max(child.height, 0.01));
		} else if (child.type === 'INSTANCE') {
			// Base components come first in the payload, so the component exists when an instance needs it.
			const main = library.get(child.component);
			if (!main) {
				log(`${child.name}: Basiskomponente ${child.component} fehlt.`);
				continue;
			}
			shape = main.createInstance();
			shape.name = child.name;
			parent.appendChild(shape);
		} else {
			shape = figma.createFrame();
			parent.appendChild(shape);
			applyFrame(shape, child, variables);
			buildChildren(shape, child, variables, fontOf);
		}
		if (parent.layoutMode === 'NONE' || child.absolute) {
			if (child.absolute && parent.layoutMode !== 'NONE') shape.layoutPositioning = 'ABSOLUTE';
			shape.x = child.x;
			shape.y = child.y;
		} else if (child.type !== 'TEXT') {
			const sizing = child.sizing || { horizontal: 'HUG', vertical: 'HUG' };
			shape.layoutSizingHorizontal = shape.layoutMode === 'NONE' && sizing.horizontal === 'HUG' ? 'FIXED' : sizing.horizontal;
			shape.layoutSizingVertical = shape.layoutMode === 'NONE' && sizing.vertical === 'HUG' ? 'FIXED' : sizing.vertical;
		}
		if (child.minWidth && shape.type === 'FRAME' && shape.layoutMode !== 'NONE') shape.minWidth = child.minWidth;
		if (child.minHeight && shape.type === 'FRAME' && shape.layoutMode !== 'NONE') shape.minHeight = child.minHeight;
	}
}

function buildComponent(component, entry, variables, fontOf) {
	for (const child of [...component.children]) child.remove();
	applyFrame(component, entry.tree, variables);
	component.name = entry.name;
	buildChildren(component, entry.tree, variables, fontOf);
	if (component.layoutMode !== 'NONE') {
		component.layoutSizingHorizontal = 'HUG';
		component.layoutSizingVertical = 'HUG';
		if (entry.tree.minHeight) component.minHeight = entry.tree.minHeight;
		if (entry.tree.minWidth) component.minWidth = entry.tree.minWidth;
	}
	component.setPluginData(KEY, entry.key);
}

async function libraryPage() {
	await figma.loadAllPagesAsync();
	let page = figma.root.children.find((candidate) => candidate.name === PAGE_NAME);
	if (!page) {
		page = figma.createPage();
		page.name = PAGE_NAME;
	}
	await figma.setCurrentPageAsync(page);
	return page;
}

/** Built components by key, for the instances of base components. */
const library = new Map();

async function run(payload) {
	if (!payload || payload.schema !== 'kolibri-figma/1.0') throw new Error('Keine figma-import.json (Schema kolibri-figma/1.0).');
	const variables = await syncVariables(payload.variables);
	const fontOf = await loadFonts();
	const page = await libraryPage();
	let top = 0;
	for (const set of payload.componentSets) {
		const node = page.findOne(
			(candidate) => (candidate.type === 'COMPONENT_SET' || candidate.type === 'COMPONENT') && candidate.getPluginData(KEY) === set.name,
		);
		const existing = new Map();
		if (node && node.type === 'COMPONENT_SET') {
			for (const child of node.children) existing.set(child.getPluginData(KEY), child);
		}
		const components = [];
		let created = 0;
		for (const entry of set.components) {
			let component = existing.get(entry.key) || (node && node.type === 'COMPONENT' ? node : undefined);
			if (!component) {
				component = figma.createComponent();
				created++;
			}
			buildComponent(component, entry, variables, fontOf);
			library.set(entry.key, component);
			components.push(component);
		}
		let target = node;
		if (set.properties.length === 0) {
			target = components[0];
		} else if (!node || node.type !== 'COMPONENT_SET') {
			target = figma.combineAsVariants(components, page);
		} else {
			for (const component of components) if (component.parent !== node) node.appendChild(component);
		}
		target.name = set.name;
		target.setPluginData(KEY, set.name);
		if (target.type === 'COMPONENT_SET') {
			target.layoutMode = 'HORIZONTAL';
			target.layoutWrap = 'WRAP';
			target.itemSpacing = 16;
			target.counterAxisSpacing = 16;
			target.paddingTop = target.paddingRight = target.paddingBottom = target.paddingLeft = 24;
			target.resize(1200, Math.max(target.height, 1));
			target.layoutSizingVertical = 'HUG';
		}
		if (!node) {
			target.x = 0;
			target.y = top;
		}
		top = target.y + target.height + 80;
		log(`${set.name}: ${set.components.length} Varianten, ${created} neu.`);
	}
	page.setPluginData('kolibri-version', `${payload.themeName} ${payload.version.theme} / components ${payload.version.components}`);
	log('Fertig.');
}

figma.ui.onmessage = (message) => {
	if (message.type !== 'import') return;
	run(message.payload).catch((error) => log(`Fehler: ${error && error.message ? error.message : error}`));
};
