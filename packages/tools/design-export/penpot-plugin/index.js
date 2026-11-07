/**
 * KoliBri Design Sync — Penpot plugin code.
 *
 * Runs inside the Penpot plugin sandbox with the `penpot` global. Receives the export
 * payload (penpot-import.json from the design-export pipeline) from the UI iframe and
 * reconciles the library of the open file with it:
 *
 * - components are matched by the plugin data key `kolibri-key` (scenario id), layers by
 *   their BEM name per parent; a match is updated in place, so instances in linked files
 *   keep their link and their overrides
 * - every color is bound to its theme token (`color.primary` …), so the theme group
 *   `Scheme` in the Tokens panel switches the whole file between light and dark
 * - one variant set per component, its properties named after the KoliBri props
 *   (`Variant` for `_variant`; the switches `Disabled` for `_disabled`, `Hover` and `Focus`
 *   for the browser states)
 * - every visible element box is a board with its own fill, border, corner radius and
 *   flex layout, the focus ring a layer around it, outside the flex layout
 * - components and layers the export no longer contains are never deleted silently:
 *   components are marked deprecated, removed layers are listed in the report
 *
 * A preview runs the same reconciliation without writing and reports every change.
 * The first run on an empty file is a sync in which everything is new.
 */
/* global penpot */

(function () {
	'use strict';

	const KEY = 'kolibri-key';
	const SET = 'kolibri-set';
	const CLASSES = 'kolibri-classes';
	const DEPRECATED = 'kolibri-deprecated';
	const VERSION = 'kolibri-version';
	const OUTLINE = '::outline';

	const ALIGN = {
		baseline: 'start',
		center: 'center',
		end: 'end',
		'flex-end': 'end',
		'flex-start': 'start',
		normal: 'stretch',
		start: 'start',
		stretch: 'stretch',
	};
	const JUSTIFY = {
		center: 'center',
		end: 'end',
		'flex-end': 'end',
		'flex-start': 'start',
		normal: 'start',
		'space-around': 'space-around',
		'space-between': 'space-between',
		'space-evenly': 'space-evenly',
		start: 'start',
	};

	function rgbToHex(value) {
		if (!value) return value;
		if (value.startsWith('#')) return value;
		const match = value.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
		if (!match) return value;
		const channel = (part) =>
			Math.max(0, Math.min(255, parseInt(part, 10)))
				.toString(16)
				.padStart(2, '0');
		return `#${channel(match[1])}${channel(match[2])}${channel(match[3])}`;
	}

	function log(message, kind) {
		try {
			penpot.ui.sendMessage({ type: 'log', message, kind });
		} catch (error) {
			// UI-Log ist Best-Effort.
		}
	}

	const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

	/** Resolves once Penpot has applied pending layout changes; the plugin API emits them asynchronously. */
	async function layoutSettled() {
		try {
			await penpot.waitForLayoutUpdate(2000);
		} catch (error) {
			await wait(150);
		}
	}

	const round = (value) => Math.round((value || 0) * 100) / 100;
	const normalizeName = (name) =>
		String(name || '')
			.split('/')
			.map((part) => part.trim())
			.filter(Boolean)
			.join('/');

	function getData(target, key) {
		try {
			return target.getPluginData(key) || '';
		} catch (error) {
			return '';
		}
	}

	function setData(ctx, target, key, value) {
		if (!ctx.apply) return;
		try {
			target.setPluginData(key, value);
		} catch (error) {
			// Persistenz ist Best-Effort.
		}
	}

	/** Sets one property and reports a refusal of the API once per property instead of aborting. */
	function trySet(ctx, shape, property, value) {
		try {
			shape[property] = value;
			return true;
		} catch (error) {
			const key = `${shape.type}.${property}`;
			if (!ctx.refused.has(key)) {
				ctx.refused.add(key);
				log(`${key} nicht gesetzt: ${error.message}`, 'err');
			}
			return false;
		}
	}

	/**
	 * One property of a layer: a fresh layer gets the value without a report entry, an
	 * existing one only when it differs, and the difference is reported.
	 */
	function prop(ctx, fresh, path, label, same, set) {
		if (fresh) {
			set();
			return;
		}
		if (same()) return;
		ctx.report.changed.push(`${path}: ${label}`);
		if (ctx.apply) set();
	}

	// ---------------------------------------------------------------- desired values

	const hexOf = (value) => (value ? rgbToHex(value).toLowerCase() : undefined);

	function appliedTokens(shape) {
		try {
			return shape.tokens || {};
		} catch (error) {
			return {};
		}
	}

	/**
	 * The token a color is bound to, and whether the layer already carries exactly this binding.
	 * A token the file does not contain is reported once; the color then stays a plain value.
	 */
	function tokenState(ctx, shape, attribute, tokenName) {
		const token = tokenName ? ctx.tokens.get(tokenName) : undefined;
		if (tokenName && !token) ctx.missingTokens.add(tokenName);
		const applied = appliedTokens(shape)[attribute];
		return { matches: token ? applied === tokenName : !applied, token };
	}

	function bindToken(ctx, shape, token, attribute) {
		if (!token) return;
		try {
			shape.applyToken(token, [attribute]);
			ctx.stats.bound += 1;
		} catch (error) {
			log(`${shape.name}: Token ${token.name} nicht anwendbar (${error.message}).`, 'err');
		}
	}

	/** The fill of a layer, bound to its token: the value written first is the one of the light scheme. */
	function syncFill(ctx, shape, color, tokenName, path, fresh, label) {
		const hex = hexOf(color);
		const fills = hex ? [{ fillColor: hex, fillOpacity: 1 }] : [];
		const state = tokenState(ctx, shape, 'fill', hex ? tokenName : undefined);
		prop(
			ctx,
			fresh,
			path,
			hex ? `${label} ${state.token ? tokenName : hex}` : `${label} entfernt`,
			// Mit Token zählt nur die Bindung: der Wert hängt vom gerade aktiven Scheme ab.
			() => (state.token ? state.matches : state.matches && sameList(shape.fills, fills, fillKey)),
			() => {
				trySet(ctx, shape, 'fills', fills);
				bindToken(ctx, shape, state.token, 'fill');
			},
		);
	}

	function syncStroke(ctx, shape, color, tokenName, width, path, fresh, label) {
		const hex = hexOf(color);
		const strokes = hex && width ? [{ strokeColor: hex, strokeOpacity: 1, strokeStyle: 'solid', strokeWidth: width, strokeAlignment: 'inner' }] : [];
		const state = tokenState(ctx, shape, 'strokeColor', strokes.length > 0 ? tokenName : undefined);
		const sameGeometry = () =>
			Array.isArray(shape.strokes) &&
			shape.strokes.length === strokes.length &&
			shape.strokes.every((stroke, index) => stroke.strokeWidth === strokes[index].strokeWidth && stroke.strokeAlignment === strokes[index].strokeAlignment);
		prop(
			ctx,
			fresh,
			path,
			strokes.length > 0 ? `${label} ${width}px ${state.token ? tokenName : hex}` : `${label} entfernt`,
			() => sameGeometry() && (state.token ? state.matches : state.matches && sameList(shape.strokes, strokes, strokeKey)),
			() => {
				trySet(ctx, shape, 'strokes', strokes);
				bindToken(ctx, shape, state.token, 'strokeColor');
			},
		);
	}

	function shadowsOf(node) {
		if (!node.shadow) return [];
		const alpha = /rgba\([^)]*,\s*([\d.]+)\)/.exec(node.shadow.color);
		return [
			{
				style: 'drop-shadow',
				offsetX: node.shadow.x,
				offsetY: node.shadow.y,
				blur: node.shadow.blur,
				spread: node.shadow.spread,
				hidden: false,
				color: { color: rgbToHex(node.shadow.color).toLowerCase(), opacity: alpha ? parseFloat(alpha[1]) : 1 },
			},
		];
	}

	const fillKey = (fill) => `${String(fill.fillColor || '').toLowerCase()}|${fill.fillColorRefId || ''}`;
	const strokeKey = (stroke) =>
		`${String(stroke.strokeColor || '').toLowerCase()}|${stroke.strokeColorRefId || ''}|${stroke.strokeWidth}|${stroke.strokeAlignment}`;
	const shadowKey = (shadow) =>
		`${shadow.offsetX}|${shadow.offsetY}|${shadow.blur}|${shadow.spread}|${String((shadow.color || {}).color || '').toLowerCase()}|${round((shadow.color || {}).opacity)}`;

	function sameList(current, desired, key) {
		if (!Array.isArray(current)) return false;
		return current.length === desired.length && current.every((item, index) => key(item) === key(desired[index]));
	}

	function radiusOf(shape) {
		const corners = [shape.borderRadiusTopLeft, shape.borderRadiusTopRight, shape.borderRadiusBottomRight, shape.borderRadiusBottomLeft];
		return corners.every((corner) => typeof corner === 'number') ? corners.map(round) : [0, 0, 0, 0].map(() => round(shape.borderRadius));
	}

	function applyRadius(ctx, shape, radius) {
		const [topLeft, topRight, bottomRight, bottomLeft] = radius;
		if (topLeft === topRight && topLeft === bottomRight && topLeft === bottomLeft) {
			trySet(ctx, shape, 'borderRadius', topLeft);
			return;
		}
		trySet(ctx, shape, 'borderRadiusTopLeft', topLeft);
		trySet(ctx, shape, 'borderRadiusTopRight', topRight);
		trySet(ctx, shape, 'borderRadiusBottomRight', bottomRight);
		trySet(ctx, shape, 'borderRadiusBottomLeft', bottomLeft);
	}

	/**
	 * Flex layout of a box: the CSS flex container maps 1:1; a block box with padding and a
	 * single child maps to a column, which is the same arrangement.
	 */
	function layoutOf(node) {
		const layout =
			node.layout ||
			(node.padding && node.children.length === 1 ? { alignItems: 'start', direction: 'column', gap: 0, justifyContent: 'start', wrap: false } : null);
		if (!layout) return null;
		const [top, right, bottom, left] = node.padding || [0, 0, 0, 0];
		return {
			dir: layout.direction,
			wrap: layout.wrap ? 'wrap' : 'nowrap',
			alignItems: ALIGN[layout.alignItems] || 'start',
			justifyContent: JUSTIFY[layout.justifyContent] || 'start',
			[layout.direction === 'column' ? 'rowGap' : 'columnGap']: layout.gap,
			topPadding: top,
			rightPadding: right,
			bottomPadding: bottom,
			leftPadding: left,
			horizontalSizing: sizingOf(node).horizontal,
			verticalSizing: sizingOf(node).vertical,
		};
	}

	/** A minimum size binds when the box is no larger than it, e.g. the a11y minimum of 44px. */
	const binds = (minimum, size) => minimum !== undefined && minimum >= size - 0.5;

	/**
	 * Inline boxes hug their content, block boxes keep their width. A binding minimum size keeps
	 * that axis fixed, because Penpot measures text in its own font and would shrink the box below it.
	 */
	function sizingOf(node) {
		return {
			horizontal: node.inline && !binds(node.minWidth, node.width) ? 'auto' : 'fix',
			vertical: binds(node.minHeight, node.height) ? 'fix' : 'auto',
		};
	}

	// ---------------------------------------------------------------- layers

	const kindOf = (shape) => (shape.type === 'text' ? 'text' : 'box');

	/** Layer key per parent: the BEM name, numbered from the second layer of the same name on. */
	function nextKey(name, counts) {
		const count = counts.get(name) || 0;
		counts.set(name, count + 1);
		return count === 0 ? name : `${name}#${count}`;
	}

	/** Existing children by key; layers of an earlier import without a key are adopted by name. */
	function childrenByKey(board) {
		const result = new Map();
		const counts = new Map();
		for (const child of board.children || []) {
			const key = getData(child, KEY) || nextKey(child.name, counts);
			result.set(key, child);
		}
		return result;
	}

	function syncText(ctx, text, node, path, fresh) {
		prop(
			ctx,
			fresh,
			path,
			`Text „${node.characters}“`,
			() => text.characters === node.characters,
			() => trySet(ctx, text, 'characters', node.characters || ' '),
		);
		if (fresh) trySet(ctx, text, 'growType', 'auto-width');
		const fontSize = String(Math.round(node.fontSize || 14));
		prop(
			ctx,
			fresh,
			path,
			`Schriftgröße ${fontSize}`,
			() => String(text.fontSize) === fontSize,
			() => trySet(ctx, text, 'fontSize', fontSize),
		);
		if (node.fontWeight) {
			const fontWeight = String(node.fontWeight);
			prop(
				ctx,
				fresh,
				path,
				`Schriftgewicht ${fontWeight}`,
				() => String(text.fontWeight) === fontWeight,
				() => trySet(ctx, text, 'fontWeight', fontWeight),
			);
		}
		if (node.lineHeight && node.fontSize) {
			const lineHeight = String(round(node.lineHeight / node.fontSize));
			prop(
				ctx,
				fresh,
				path,
				`Zeilenhöhe ${lineHeight}`,
				() => String(round(parseFloat(text.lineHeight))) === lineHeight,
				() => trySet(ctx, text, 'lineHeight', lineHeight),
			);
		}
		if (node.fill) syncFill(ctx, text, node.fill, node.fillToken, path, fresh, 'Textfarbe');
	}

	function syncBoxStyle(ctx, board, node, path, fresh) {
		syncFill(ctx, board, node.fill, node.fillToken, path, fresh, 'Fläche');
		const width = node.strokeWidths ? Math.max(...node.strokeWidths) : 0;
		if (node.strokeWidths && node.strokeWidths.some((side) => side !== width) && fresh) {
			log(`${path}: Rahmen nur auf einzelnen Seiten (${node.strokeWidths.join('/')}), übernommen als umlaufend ${width}px.`, 'err');
		}
		syncStroke(ctx, board, node.stroke, node.strokeToken, width, path, fresh, 'Rahmen');
		const radius = (node.radius || [0, 0, 0, 0]).map(round);
		prop(
			ctx,
			fresh,
			path,
			`Radius ${radius.join('/')}`,
			() => radiusOf(board).join('/') === radius.join('/'),
			() => applyRadius(ctx, board, radius),
		);
		const shadows = shadowsOf(node);
		prop(
			ctx,
			fresh,
			path,
			'Schatten',
			() => sameList(board.shadows, shadows, shadowKey),
			() => trySet(ctx, board, 'shadows', shadows),
		);
		const opacity = node.opacity === undefined ? 1 : node.opacity;
		prop(
			ctx,
			fresh,
			path,
			`Deckkraft ${opacity}`,
			() => Math.abs((board.opacity === undefined ? 1 : board.opacity) - opacity) < 0.01,
			() => trySet(ctx, board, 'opacity', opacity),
		);
		// Hug-Achsen bekommen ihre Größe vom Layout, feste Achsen ihre gemessene Größe.
		const layout = layoutOf(node);
		const size = [round(Math.max(1, node.width)), round(Math.max(1, node.height))];
		const fixedWidth = !layout || layout.horizontalSizing === 'fix';
		const fixedHeight = !layout || layout.verticalSizing === 'fix';
		if (fresh) {
			board.resize(size[0], size[1]);
		} else if (fixedWidth || fixedHeight) {
			prop(
				ctx,
				false,
				path,
				`Größe ${fixedWidth ? size[0] : 'Hug'}×${fixedHeight ? size[1] : 'Hug'}`,
				() => (!fixedWidth || round(board.width) === size[0]) && (!fixedHeight || round(board.height) === size[1]),
				() => board.resize(fixedWidth ? size[0] : board.width, fixedHeight ? size[1] : board.height),
			);
		}
	}

	function syncLayout(ctx, board, node, path, fresh) {
		const desired = layoutOf(node);
		let flex = board.flex || null;
		if (!desired) {
			if (flex) {
				ctx.report.changed.push(`${path}: Flex-Layout entfernt`);
				if (ctx.apply) flex.remove();
			}
			return null;
		}
		let freshLayout = fresh;
		if (!flex) {
			if (!fresh) ctx.report.changed.push(`${path}: Flex-Layout neu`);
			if (!ctx.apply) return null;
			try {
				flex = board.addFlexLayout();
			} catch (error) {
				log(`${path}: Flex-Layout nicht möglich (${error.message}), Kinder bleiben absolut positioniert.`, 'err');
				return null;
			}
			freshLayout = true;
			ctx.stats.layouts += 1;
		}
		for (const [property, value] of Object.entries(desired)) {
			prop(
				ctx,
				freshLayout,
				path,
				`Layout ${property} ${value}`,
				() => flex[property] === value,
				() => trySet(ctx, flex, property, value),
			);
		}
		return flex;
	}

	/**
	 * The CSS outline as its own ring layer around the box: Penpot strokes have no offset, so the
	 * ring is a board outside the flex layout of its box. Its geometry follows the box as Penpot
	 * lays it out, not the browser measurement, because Penpot measures text in its own font
	 * (see `settleRings`).
	 */
	function syncOutline(ctx, board, node, path, existing, fresh) {
		const key = `${node.name}${OUTLINE}`;
		const ringPath = `${path}/${key}`;
		let ring = existing.get(key);
		if (!node.outline) {
			if (ring) {
				ctx.report.removedLayers.push(ringPath);
				if (ctx.apply) ring.remove();
			}
			return key;
		}
		const { color, offset, width } = node.outline;
		const distance = offset + width;
		let ringFresh = false;
		if (!ring) {
			if (!fresh) ctx.report.addedLayers.push(ringPath);
			if (!ctx.apply) return key;
			ring = penpot.createBoard();
			ring.name = key;
			trySet(ctx, ring, 'clipContent', false);
			trySet(ctx, ring, 'fills', []);
			board.appendChild(ring);
			ringFresh = true;
		}
		syncStroke(ctx, ring, color, node.outline.token, width, ringPath, ringFresh, 'Fokusring');
		const radius = (node.outline.radius || node.radius || [0, 0, 0, 0]).map((corner) => round(corner > 0 ? corner + distance : 0));
		prop(
			ctx,
			ringFresh,
			ringPath,
			`Radius ${radius.join('/')}`,
			() => radiusOf(ring).join('/') === radius.join('/'),
			() => applyRadius(ctx, ring, radius),
		);
		setData(ctx, ring, KEY, key);
		if (ctx.apply) ctx.rings.push({ board, distance, fresh: ringFresh, name: ringPath, ring });
		return key;
	}

	function createShape(ctx, node, key, origin, parent) {
		const shape = node.kind === 'text' ? penpot.createText(node.characters || ' ') : penpot.createBoard();
		if (!shape) {
			log(`Text ${node.name} konnte nicht angelegt werden.`, 'err');
			return null;
		}
		shape.name = node.name;
		if (node.kind === 'text') {
			ctx.stats.texts += 1;
		} else {
			trySet(ctx, shape, 'clipContent', false);
			ctx.stats.boards += 1;
		}
		if (parent) parent.appendChild(shape);
		shape.x = origin.x + node.x;
		shape.y = origin.y + node.y;
		syncShape(ctx, shape, node, key, key, origin, true, false);
		return shape;
	}

	/**
	 * Reconciles one layer and its subtree. `fixed` keeps the position: true for a component root,
	 * which the library maintainer or a variant set arranges, and for children of a flex layout.
	 */
	function syncShape(ctx, shape, node, key, path, origin, fresh, fixed) {
		if (!fresh && !fixed) {
			const position = [round(origin.x + node.x), round(origin.y + node.y)];
			prop(
				ctx,
				false,
				path,
				'Position',
				() => round(shape.x) === position[0] && round(shape.y) === position[1],
				() => {
					shape.x = position[0];
					shape.y = position[1];
				},
			);
		}
		if (!fresh)
			prop(
				ctx,
				false,
				path,
				`Name ${node.name}`,
				() => shape.name === node.name,
				() => trySet(ctx, shape, 'name', node.name),
			);
		setData(ctx, shape, KEY, key);
		if (node.classes && node.classes.length > 0) setData(ctx, shape, CLASSES, node.classes.join(' '));
		if (node.kind === 'text') {
			syncText(ctx, shape, node, path, fresh);
			return;
		}
		syncBoxStyle(ctx, shape, node, path, fresh);
		const existing = fresh ? new Map() : childrenByKey(shape);
		const inLayout = layoutOf(node) !== null;
		const counts = new Map();
		const seen = new Set();
		for (const child of node.children || []) {
			const childKey = nextKey(child.name, counts);
			const childPath = `${path}/${childKey}`;
			seen.add(childKey);
			const current = existing.get(childKey);
			if (current && kindOf(current) === child.kind) {
				syncShape(ctx, current, child, childKey, childPath, origin, false, inLayout);
				continue;
			}
			if (current) {
				ctx.report.removedLayers.push(`${childPath} (Ebenentyp geändert)`);
				if (ctx.apply) current.remove();
			}
			if (!fresh) ctx.report.addedLayers.push(childPath);
			if (ctx.apply) createShape(ctx, child, childKey, origin, shape);
		}
		// Das Layout kommt nach den Kindern, damit Penpot neue Kinder nach ihrer Position anordnet.
		syncLayout(ctx, shape, node, path, fresh);
		seen.add(syncOutline(ctx, shape, node, path, existing, fresh));
		for (const [childKey, child] of existing) {
			// Nur Ebenen dieses Plugins verschwinden; von Hand ergänzte Ebenen bleiben unangetastet.
			if (!seen.has(childKey) && getData(child, KEY)) {
				ctx.report.removedLayers.push(`${path}/${childKey}`);
				if (ctx.apply) child.remove();
			}
		}
	}

	/**
	 * Places the focus rings once Penpot has laid out their boxes. A new ring first leaves the flex
	 * layout of its box: a shape gets its `layoutChild` only after Penpot has registered the
	 * parent's layout, and the box reflows without the ring only after it is absolute. Then every
	 * ring takes the box as Penpot laid it out, plus offset and width, and keeps to it through
	 * constraints when the box later grows with a longer label.
	 */
	async function settleRings(ctx) {
		if (ctx.rings.length === 0) return;
		const rings = ctx.rings.splice(0);
		await layoutSettled();
		for (const item of rings.filter((ring) => ring.fresh)) {
			const child = item.ring.layoutChild;
			if (child) child.absolute = true;
		}
		await layoutSettled();
		for (const item of rings.filter((ring) => ring.fresh)) {
			// Derselbe Layout-Wert noch einmal gesetzt löst den Reflow der Box ohne den Ring aus.
			const flex = item.board.flex;
			if (flex) trySet(ctx, flex, 'verticalSizing', flex.verticalSizing);
		}
		await layoutSettled();
		for (const { board, distance, ring } of rings) {
			const target = [round(board.x - distance), round(board.y - distance), round(board.width + 2 * distance), round(board.height + 2 * distance)];
			if (round(ring.x) !== target[0] || round(ring.y) !== target[1] || round(ring.width) !== target[2] || round(ring.height) !== target[3]) {
				ring.resize(target[2], target[3]);
				ring.x = target[0];
				ring.y = target[1];
			}
			trySet(ctx, ring, 'constraintsHorizontal', 'leftright');
			trySet(ctx, ring, 'constraintsVertical', 'topbottom');
		}
		await layoutSettled();
		for (const { name, ring } of rings) {
			const child = ring.layoutChild;
			if (child && !child.absolute) log(`${name}: Fokusring liegt noch im Flex-Layout.`, 'err');
		}
	}

	// ---------------------------------------------------------------- library

	/**
	 * Components of this plugin by key. Components of an earlier import are adopted: the light
	 * scheme becomes the one set, components of the dark scheme keep their key and are marked
	 * deprecated, because the token theme `Scheme` replaces them.
	 */
	function managedComponents() {
		const result = new Map();
		for (const component of penpot.library.local.components || []) {
			let key = getData(component, KEY);
			if (!key) {
				const legacy = getData(component, 'kolibri-scenario-id');
				if (!legacy) continue;
				const fullName = normalizeName(`${component.path || ''}/${component.name}`);
				key = legacy.includes('/') ? legacy : `${fullName.startsWith('dark/') ? 'dark' : 'light'}/${legacy}`;
			}
			result.set(key.startsWith('light/') ? key.slice('light/'.length) : key, component);
		}
		return result;
	}

	/** Penpot tokens by name; tokens of active sets first, so a binding takes the visible one. */
	function loadTokens(ctx) {
		ctx.tokens = new Map();
		let sets = [];
		try {
			sets = [...(penpot.library.local.tokens.sets || [])];
		} catch (error) {
			return;
		}
		sets.sort((first, second) => Number(Boolean(second.active)) - Number(Boolean(first.active)));
		for (const set of sets) {
			for (const token of set.tokens || []) {
				if (!ctx.tokens.has(token.name)) ctx.tokens.set(token.name, token);
			}
		}
	}

	/** Without an active theme of the group `Scheme`, Light is activated, so bound colors resolve. */
	function ensureScheme(ctx) {
		let themes = [];
		try {
			themes = (penpot.library.local.tokens.themes || []).filter((theme) => theme.group === 'Scheme');
		} catch (error) {
			return;
		}
		if (themes.length === 0 || themes.some((theme) => theme.active)) return;
		const light = themes.find((theme) => theme.name === 'Light');
		if (!light) return;
		ctx.report.changed.push('Token-Theme Scheme/Light aktiviert');
		if (ctx.apply) light.toggleActive();
	}

	function syncComponentTree(ctx, component, shapes, key) {
		const main = component.mainInstance();
		if (!main) {
			log(`${key}: Hauptinstanz nicht gefunden, übersprungen.`, 'err');
			return;
		}
		if (kindOf(main) !== shapes.kind) {
			ctx.report.removedLayers.push(`${key} (Wurzeltyp geändert, bitte von Hand ersetzen)`);
			return;
		}
		setData(ctx, component, KEY, key);
		syncShape(ctx, main, shapes, shapes.name, key, { x: main.x - shapes.x, y: main.y - shapes.y }, false, true);
	}

	async function buildComponent(ctx, shapes, key, name, set, x, y) {
		const root = createShape(ctx, shapes, shapes.name, { x: x - shapes.x, y: y - shapes.y }, null);
		await settleRings(ctx);
		if (!root) return null;
		try {
			const component = penpot.library.local.createComponent([root]);
			component.name = name;
			setData(ctx, component, KEY, key);
			if (set) setData(ctx, component, SET, set);
			ctx.stats.components += 1;
			return component.mainInstance() || root;
		} catch (error) {
			log(`${key}: createComponent fehlgeschlagen (${error.message}), Board bleibt auf der Canvas.`, 'err');
			return null;
		}
	}

	/**
	 * Combines new main instances into a Penpot variant set. Penpot derives one property per path
	 * segment behind the common prefix (`kol-button / primary / false / hover` gives three); the
	 * plugin then names them after the KoliBri props once the asynchronous combination is done.
	 */
	async function combineSet(ctx, tag, mains, propertyNames) {
		let container;
		try {
			container = penpot.createVariantFromComponents(mains);
		} catch (error) {
			log(`${tag}: Variant-Set nicht möglich (${error.message}), Komponenten bleiben einzeln.`, 'err');
			return;
		}
		for (let attempt = 0; attempt < 50; attempt += 1) {
			const variants = container && container.variants;
			if (variants && variants.properties.length >= propertyNames.length) {
				propertyNames.forEach((propertyName, position) => variants.renameProperty(position, propertyName));
				trySet(ctx, container, 'name', tag);
				ctx.stats.sets += 1;
				return;
			}
			await wait(100);
		}
		log(`${tag}: Variant-Set angelegt, Eigenschaften aber nicht benannt (Zeitüberschreitung).`, 'err');
	}

	/**
	 * Adds a member to an existing variant set: `combineAsVariants` only accepts components that
	 * are no variants yet, so Penpot duplicates a sibling inside the set, and the copy is then
	 * reconciled into the new member and gets its property values.
	 */
	async function addToSet(ctx, sibling, entry, shapes, key) {
		const before = new Set((penpot.library.local.components || []).map((component) => component.id));
		try {
			sibling.addVariant();
		} catch (error) {
			log(`${key}: Variante nicht ergänzbar (${error.message}).`, 'err');
			return;
		}
		let added;
		for (let attempt = 0; attempt < 30 && !added; attempt += 1) {
			await wait(100);
			added = (penpot.library.local.components || []).find((component) => !before.has(component.id));
		}
		if (!added) {
			log(`${key}: neue Variante nicht gefunden (Zeitüberschreitung).`, 'err');
			return;
		}
		setData(ctx, added, KEY, key);
		setData(ctx, added, SET, entry.set);
		// Die Kopie gehört schon zur neuen Komponente, ihr Umbau ist keine Änderung am Bestand.
		const report = ctx.report;
		ctx.report = newReport();
		syncComponentTree(ctx, added, shapes, key);
		ctx.report = report;
		entry.properties.forEach(([, value], position) => added.setVariantProperty(position, value));
		await settleRings(ctx);
		ctx.stats.components += 1;
	}

	/** The lowest edge of the managed components, so new ones land below and never on top of them. */
	function freeTop(managed) {
		let bottom = 0;
		for (const component of managed.values()) {
			try {
				const main = component.mainInstance();
				if (main) bottom = Math.max(bottom, main.y + main.height);
			} catch (error) {
				// Ohne Hauptinstanz zählt die Komponente nicht.
			}
		}
		return bottom === 0 ? 40 : bottom + 200;
	}

	async function syncLibrary(ctx, payload) {
		const managed = managedComponents();
		const shapesOf = (entry) => entry.shapes;
		const keyOf = (entry) => entry.id;
		const sets = new Map();
		const singles = [];
		for (const entry of payload.components) {
			if (!shapesOf(entry)) continue;
			if (entry.set) {
				if (!sets.has(entry.set)) sets.set(entry.set, []);
				sets.get(entry.set).push(entry);
			} else {
				singles.push(entry);
			}
		}

		let top = freeTop(managed);
		const gutter = 24;
		for (const [tag, entries] of sets) {
			const existing = entries.filter((entry) => managed.has(keyOf(entry)));
			const fresh = entries.filter((entry) => !managed.has(keyOf(entry)));
			for (const entry of existing) {
				syncComponentTree(ctx, managed.get(keyOf(entry)), shapesOf(entry), keyOf(entry));
				await settleRings(ctx);
			}
			if (fresh.length === 0) continue;
			for (const entry of fresh) ctx.report.addedComponents.push(`${keyOf(entry)} (${entry.properties.map((pair) => pair.join('=')).join(', ')})`);
			if (!ctx.apply) continue;
			const members = existing.filter((entry) => {
				const component = managed.get(keyOf(entry));
				return component.isVariant && component.isVariant();
			});
			if (members.length > 0) {
				for (const entry of fresh) {
					// Vorlage ist das Mitglied mit den meisten gleichen Werten, also der ähnlichsten Struktur.
					const matches = (member) => member.properties.filter(([, value], position) => (entry.properties[position] || [])[1] === value).length;
					const template = members.reduce((best, member) => (matches(member) > matches(best) ? member : best));
					await addToSet(ctx, managed.get(keyOf(template)), entry, shapesOf(entry), keyOf(entry));
				}
				continue;
			}
			// Neues Variant-Set: Spalten sind die Hover/Focus-Kombinationen, Zeilen die übrigen Eigenschaften.
			const isState = ([property]) => property === 'Hover' || property === 'Focus';
			const columnOf = (entry) =>
				entry.properties
					.filter(isState)
					.map(([, value]) => value)
					.join(' / ');
			const rowOf = (entry) =>
				entry.properties
					.filter((pair) => !isState(pair))
					.map(([, value]) => value)
					.join(' / ');
			const states = [...new Set(fresh.map(columnOf))];
			const rows = [...new Set(fresh.map(rowOf))];
			const cellWidth = Math.max(...fresh.map((entry) => shapesOf(entry).width)) + gutter;
			const cellHeight = Math.max(...fresh.map((entry) => shapesOf(entry).height)) + gutter;
			const mains = [];
			for (const entry of fresh) {
				const values = entry.properties.map(([, value]) => value);
				const row = rows.indexOf(rowOf(entry));
				const column = states.indexOf(columnOf(entry));
				const main = await buildComponent(
					ctx,
					shapesOf(entry),
					keyOf(entry),
					[tag, ...values].join(' / '),
					tag,
					40 + column * cellWidth,
					top + row * cellHeight,
				);
				if (main) mains.push(main);
			}
			if (mains.length > 1)
				await combineSet(
					ctx,
					tag,
					mains,
					fresh[0].properties.map(([property]) => property),
				);
			top += rows.length * cellHeight + 80;
		}

		let column = 0;
		let rowHeight = 0;
		for (const entry of singles) {
			const key = keyOf(entry);
			if (managed.has(key)) {
				syncComponentTree(ctx, managed.get(key), shapesOf(entry), key);
				await settleRings(ctx);
				continue;
			}
			ctx.report.addedComponents.push(key);
			if (!ctx.apply) continue;
			const shapes = shapesOf(entry);
			if (column > 0 && 40 + (column + 1) * 320 > 2800) {
				column = 0;
				top += rowHeight + 40;
				rowHeight = 0;
			}
			rowHeight = Math.max(rowHeight, shapes.height);
			await buildComponent(ctx, shapes, key, entry.id, null, 40 + column * 320, top);
			column += 1;
		}

		// Was der Export nicht mehr enthält, wird markiert, nicht gelöscht: Instanzen in anderen Dateien hängen daran.
		const exported = new Set(payload.components.filter(shapesOf).map(keyOf));
		for (const [key, component] of managed) {
			if (exported.has(key)) continue;
			const alreadyDeprecated = getData(component, DEPRECATED) !== '';
			if (!alreadyDeprecated) ctx.report.deprecated.push(key);
			setData(ctx, component, DEPRECATED, ctx.version);
			const isVariant = component.isVariant && component.isVariant();
			if (ctx.apply && !alreadyDeprecated && !isVariant && !String(component.name).startsWith('deprecated')) {
				trySet(ctx, component, 'name', `deprecated / ${component.name}`);
			}
		}
	}

	function newReport() {
		return { addedComponents: [], addedLayers: [], changed: [], deprecated: [], missingTokens: [], removedLayers: [] };
	}

	async function run(message) {
		const payload = message.payload;
		if (!payload || !Array.isArray(payload.components)) {
			log('Ungültige Nutzdaten: components fehlt.', 'err');
			return;
		}
		const version = payload.version ? `${payload.version.components} (Theme ${payload.themeName} ${payload.version.theme})` : 'unbekannt';
		const ctx = {
			apply: message.type === 'sync',
			missingTokens: new Set(),
			refused: new Set(),
			report: newReport(),
			rings: [],
			stats: { boards: 0, bound: 0, components: 0, layouts: 0, sets: 0, texts: 0 },
			tokens: new Map(),
			version,
		};
		const previous = getData(penpot.library.local, VERSION) || 'leer';
		log(`${ctx.apply ? 'Synchronisiere' : 'Vorschau'}: Bibliothek ${previous} → ${version}.`);
		loadTokens(ctx);
		if (ctx.tokens.size === 0) {
			log('Die Datei enthält keine Tokens: Farben bleiben feste Werte. Erst kolibri-design-tokens.zip im Tokens-Panel importieren.', 'err');
		}
		ensureScheme(ctx);
		await syncLibrary(ctx, payload);
		ctx.report.missingTokens = [...ctx.missingTokens];
		if (ctx.apply) setData(ctx, penpot.library.local, VERSION, version);
		penpot.ui.sendMessage({ type: 'report', apply: ctx.apply, report: ctx.report });
		if (ctx.apply) {
			log(
				`Fertig: ${ctx.stats.components} Komponenten neu (${ctx.stats.sets} Variant-Sets), ${ctx.report.changed.length} Änderungen, ${ctx.stats.bound} Token-Bindungen gesetzt.`,
				'ok',
			);
		}
	}

	let queue = Promise.resolve();

	penpot.ui.onMessage((message) => {
		if (message && (message.type === 'preview' || message.type === 'sync')) {
			// Läufe gehen nacheinander, weil Variant-Sets und Layouts asynchron im Store entstehen.
			queue = queue.then(() => run(message)).catch((error) => log(`Abgebrochen: ${error.message}`, 'err'));
		}
	});

	penpot.ui.open('KoliBri Sync', 'index.html', { width: 460, height: 560 });
	log('KoliBri Sync bereit.');
})();
