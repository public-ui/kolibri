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
 *   flex layout; the focus ring is a layer around the interactive element, 2px off like
 *   `outline-offset`, laid out in the element's flex column so it follows the label
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
	/** On an instance of a base component: the key of the component it shows. */
	const INSTANCE = 'kolibri-instance';
	/** On an icon: its path data, so a changed icon is drawn anew. */
	const VECTOR = 'kolibri-vector';
	const DEPRECATED = 'kolibri-deprecated';
	const VERSION = 'kolibri-version';
	/** Page that holds the main components of a new library. */
	const LIBRARY_PAGE = 'KoliBri';

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

	/**
	 * A list of strokes on one layer. Penpot binds a stroke color token to the first stroke only,
	 * so only the first one follows its token.
	 */
	function syncStrokeList(ctx, shape, desired, path, fresh) {
		const strokes = desired.map((stroke) => ({
			strokeColor: hexOf(stroke.color),
			strokeOpacity: 1,
			strokeStyle: 'solid',
			strokeWidth: stroke.width,
			strokeAlignment: stroke.alignment,
		}));
		const first = desired[0];
		const state = tokenState(ctx, shape, 'strokeColor', first ? first.token : undefined);
		const sameGeometry = () =>
			Array.isArray(shape.strokes) &&
			shape.strokes.length === strokes.length &&
			shape.strokes.every((stroke, index) => stroke.strokeWidth === strokes[index].strokeWidth && stroke.strokeAlignment === strokes[index].strokeAlignment);
		const sameColors = () => sameList(shape.strokes.slice(state.token ? 1 : 0), strokes.slice(state.token ? 1 : 0), strokeKey);
		const label =
			desired.length === 0
				? 'Striche entfernt'
				: desired.map((stroke) => `${stroke.label} ${stroke.width}px ${stroke.token || hexOf(stroke.color)}`).join(', ');
		prop(
			ctx,
			fresh,
			path,
			label,
			() => sameGeometry() && sameColors() && state.matches,
			() => {
				trySet(ctx, shape, 'strokes', strokes);
				bindToken(ctx, shape, state.token, 'strokeColor');
			},
		);
	}

	/**
	 * The strokes of a box: the CSS border as an inner stroke and, after a fallback from the ring
	 * layer (see `usesRingLayer`), the CSS outline as an outer stroke without the gap of
	 * `outline-offset`.
	 */
	function syncStrokes(ctx, shape, node, path, fresh, withOutline) {
		const desired = [];
		if (node.outline && withOutline)
			desired.push({ alignment: 'outer', color: node.outline.color, label: 'Fokusring', token: node.outline.token, width: node.outline.width });
		const borderWidth = node.strokeWidths ? Math.max(...node.strokeWidths) : 0;
		if (node.stroke && borderWidth) desired.push({ alignment: 'inner', color: node.stroke, label: 'Rahmen', token: node.strokeToken, width: borderWidth });
		if (fresh && desired.length > 1) log(`${path}: Fokusring und Rahmen auf einer Ebene, nur der Fokusring folgt dem Token.`, 'err');
		syncStrokeList(ctx, shape, desired, path, fresh);
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
	 * Sizing per axis, as CSS sizes the box: inline boxes and boxes inside a box that hugs its
	 * content shrink to theirs (Hug); a child that a stretching flex parent extends across fills that
	 * axis; everything else keeps its width. A binding minimum size keeps that axis fixed, because
	 * Penpot measures text in its own font and would shrink the box below it.
	 */
	function sizingOf(node) {
		// A size set in CSS (`width: 100px`, `aspect-ratio`) stays fixed, also inside a stretching layout.
		const horizontal = node.fixedWidth ? 'fix' : node.fillX ? 'fill' : node.shrink && !binds(node.minWidth, node.width) ? 'auto' : 'fix';
		const vertical = node.fixedHeight ? 'fix' : node.fillY ? 'fill' : binds(node.minHeight, node.height) ? 'fix' : 'auto';
		return { horizontal, vertical };
	}

	/**
	 * Penpot knows only strokes around the whole shape. A border on single sides (`border-bottom`)
	 * becomes one filled layer per side, out of the layout at the edge of the box.
	 */
	function splitSideBorders(node) {
		for (const child of node.children || []) splitSideBorders(child);
		if (!node.stroke || !node.strokeWidths) return;
		const [top, right, bottom, left] = node.strokeWidths;
		const max = Math.max(top, right, bottom, left);
		if (max === 0 || node.strokeWidths.every((side) => side === max)) return;
		const edge = (side, width, x, y, w, h, absolute) =>
			width > 0
				? [
						{
							name: `${node.name}::border-${side}`,
							classes: [],
							kind: 'box',
							x,
							y,
							width: w,
							height: h,
							fill: node.stroke,
							fillToken: node.strokeToken,
							absolute,
							children: [],
						},
					]
				: [];
		node.children = [
			...(node.children || []),
			...edge('top', top, node.x, node.y, node.width, top, { left: 0, right: 0, top: 0 }),
			...edge('right', right, node.x + node.width - right, node.y, right, node.height, { bottom: 0, right: 0, top: 0 }),
			...edge('bottom', bottom, node.x, node.y + node.height - bottom, node.width, bottom, { bottom: 0, left: 0, right: 0 }),
			...edge('left', left, node.x, node.y, left, node.height, { bottom: 0, left: 0, top: 0 }),
		];
		delete node.stroke;
		delete node.strokeToken;
	}

	/** Marks the CSS sizing context on every box of a tree: shrink-to-fit and stretched axes. */
	function annotateSizing(node, parent) {
		if (node.kind === 'text' || node.kind === 'vector') return;
		const parentLayout = parent ? parent.layout : undefined;
		node.shrink = Boolean(node.inline || (parent && parent.hugs && parentLayout));
		if (parentLayout && ['normal', 'stretch'].includes(parentLayout.alignItems)) {
			const [top, right, bottom, left] = parent.padding || [0, 0, 0, 0];
			if (parentLayout.direction === 'row') node.fillY = Math.abs(node.height - (parent.height - top - bottom)) <= 1;
			else node.fillX = Math.abs(node.width - (parent.width - left - right)) <= 1;
		}
		node.hugs = sizingOf(node).horizontal === 'auto';
		for (const child of node.children || []) annotateSizing(child, node);
	}

	// ---------------------------------------------------------------- layers

	const kindOf = (shape) => (getData(shape, INSTANCE) ? 'instance' : getData(shape, VECTOR) ? 'vector' : shape.type === 'text' ? 'text' : 'box');

	const vectorData = (node) => node.vector.markup || node.vector.paths.join(' ');

	/** An icon as a group of paths (`createShapeFromSvg`); the fill of each path follows the color token. */
	function createVector(ctx, node, key, origin, parent) {
		// Markup of an inline `<svg>` carries its own colors; the paths of an icon take the fill of the node.
		const markup =
			node.vector.markup ||
			`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${node.vector.viewBox}" width="${node.width}" height="${node.height}">${node.vector.paths
				.map((d) => `<path d="${d}"/>`)
				.join('')}</svg>`;
		const shape = penpot.createShapeFromSvg(markup);
		if (!shape) {
			log(`${key}: Icon nicht angelegt.`, 'err');
			return null;
		}
		if (parent) parent.appendChild(shape);
		trySet(ctx, shape, 'name', node.name);
		shape.x = origin.x + node.x;
		shape.y = origin.y + node.y;
		if (Math.abs(shape.width - node.width) > 0.5 || Math.abs(shape.height - node.height) > 0.5) shape.resize(node.width, node.height);
		setData(ctx, shape, KEY, key);
		setData(ctx, shape, VECTOR, vectorData(node));
		ctx.stats.icons += 1;
		syncVectorFill(ctx, shape, node, key, true);
		return shape;
	}

	function syncVectorFill(ctx, shape, node, path, fresh) {
		if (node.vector.markup) return;
		const paths = (shape.children || []).length > 0 ? shape.children : [shape];
		paths.forEach((child, index) => syncFill(ctx, child, node.fill, node.fillToken, `${path}#${index}`, fresh, 'Icon-Farbe'));
	}

	/** A component of this plugin by key; the base components are built before the components that show them. */
	/**
	 * Every component of the file. The library lists one member per variant set; the other members
	 * are reached through the set.
	 */
	function localComponents() {
		const all = new Map();
		for (const component of penpot.library.local.components || []) {
			all.set(component.id, component);
			let members = [];
			try {
				if (component.isVariant && component.isVariant() && component.variants) members = component.variants.variantComponents() || [];
			} catch (error) {
				members = [];
			}
			for (const member of members) all.set(member.id, member);
		}
		return [...all.values()];
	}

	function componentByKey(ctx, key) {
		const find = () => localComponents().find((component) => getData(component, KEY) === key);
		const found = find();
		if (found || !ctx.apply) return found;
		// Penpot may drop the key of a set member after combining; written again, the lookup holds.
		retag(ctx);
		return find();
	}

	/** The instance takes its size from the layout of its parent, as a box does. */
	function syncInstanceSizing(ctx, shape, node, path) {
		if (!ctx.apply) return;
		const sizing = sizingOf(node);
		ctx.sizing.push({ board: shape, horizontal: sizing.horizontal, path, vertical: sizing.vertical });
	}

	function createInstance(ctx, node, key, origin, parent) {
		const component = componentByKey(ctx, node.component);
		if (!component) {
			log(`${key}: Basiskomponente ${node.component} fehlt, Instanz nicht angelegt.`, 'err');
			return null;
		}
		const shape = component.instance();
		if (parent) parent.appendChild(shape);
		shape.x = origin.x + node.x;
		shape.y = origin.y + node.y;
		trySet(ctx, shape, 'name', node.name);
		setData(ctx, shape, KEY, key);
		setData(ctx, shape, INSTANCE, node.component);
		ctx.stats.instances += 1;
		syncInstanceSizing(ctx, shape, node, key);
		return shape;
	}

	/** An existing instance: another variant of the base component is swapped in, overrides stay. */
	function syncInstance(ctx, shape, node, key, path, origin, fixed) {
		if (!fixed) {
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
		setData(ctx, shape, KEY, key);
		const current = getData(shape, INSTANCE);
		if (current !== node.component) {
			ctx.report.changed.push(`${path}: ${current} → ${node.component}`);
			const component = ctx.apply ? componentByKey(ctx, node.component) : null;
			if (component) {
				shape.swapComponent(component);
				setData(ctx, shape, INSTANCE, node.component);
			}
		}
		syncInstanceSizing(ctx, shape, node, path);
	}

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

	/**
	 * The font of the theme from the fonts Penpot knows (Google Fonts and the fonts uploaded to the
	 * team). Without it, Penpot keeps its default font and the plugin names the missing one.
	 */
	function fontOf(ctx, family) {
		if (!family) return null;
		if (!ctx.fonts.has(family)) {
			let font = null;
			try {
				font = penpot.fonts.findByName(family);
			} catch (error) {
				font = null;
			}
			ctx.fonts.set(family, font);
			if (!font) log(`Schrift ${family} fehlt in Penpot: als Team-Schrift hochladen, bis dahin gilt die Standardschrift.`, 'err');
		}
		return ctx.fonts.get(family);
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
		const font = fontOf(ctx, node.fontFamily);
		if (font) {
			const fontWeight = String(node.fontWeight || 400);
			const variant =
				(font.variants || []).find((candidate) => String(candidate.fontWeight) === fontWeight && (candidate.fontStyle || 'normal') === 'normal') ||
				(font.variants || [])[0];
			prop(
				ctx,
				fresh,
				path,
				`Schrift ${font.name} ${fontWeight}`,
				() => text.fontId === font.fontId && (!variant || text.fontVariantId === variant.fontVariantId),
				() => font.applyToText(text, variant),
			);
		} else if (node.fontWeight) {
			const fontWeight = String(node.fontWeight);
			// Penpot führt die Schriftvariante getrennt vom Gewicht; ohne sie fällt ein bearbeiteter Text auf „regular“ zurück.
			const fontVariantId = fontWeight === '400' ? 'regular' : fontWeight;
			prop(
				ctx,
				fresh,
				path,
				`Schriftgewicht ${fontWeight}`,
				() => String(text.fontWeight) === fontWeight && String(text.fontVariantId) === fontVariantId,
				() => {
					trySet(ctx, text, 'fontVariantId', fontVariantId);
					trySet(ctx, text, 'fontWeight', fontWeight);
				},
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
		const textDecoration = node.textDecoration || 'none';
		prop(
			ctx,
			fresh,
			path,
			`Textdekoration ${textDecoration}`,
			() => (text.textDecoration || 'none') === textDecoration,
			() => trySet(ctx, text, 'textDecoration', textDecoration),
		);
		if (node.fill) syncFill(ctx, text, node.fill, node.fillToken, path, fresh, 'Textfarbe');
	}

	function syncBoxStyle(ctx, board, node, path, fresh, ringLayer) {
		syncFill(ctx, board, node.fill, node.fillToken, path, fresh, 'Fläche');
		syncStrokes(ctx, board, node, path, fresh, !ringLayer);
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
		if (board.grid) {
			if (!fresh) ctx.report.changed.push(`${path}: Grid-Layout entfernt`);
			if (ctx.apply) board.grid.remove();
		}
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
		if (ctx.apply) ctx.sizing.push({ board, horizontal: desired.horizontalSizing, path, vertical: desired.verticalSizing });
		return flex;
	}

	const RING = 'kolibri-ring';
	/** Raised when the ring layout changes, so a library that fell back tries the ring layer again. */
	const RING_REVISION = 'absolute:1';
	const OUTLINE = '::outline';

	/**
	 * The focus ring keeps the gap of `outline-offset` only as a layer of its own: a board without
	 * fill whose outer stroke is the outline. It sits absolutely one offset outside the box and is
	 * pinned to all four edges (constraints `leftright`/`topbottom`), so it follows the box when its
	 * content changes the size. Where Penpot does not place it (see `settleLayout`), the ring falls
	 * back to an outer stroke of the box without the gap.
	 */
	function usesRingLayer(ctx, node) {
		return node.kind === 'box' && node.outline !== undefined && !ctx.ringFallback;
	}

	function syncRingLayer(ctx, board, node, path, existing, fresh) {
		const key = `${node.name}${OUTLINE}`;
		const ringPath = `${path}/${key}`;
		let ring = existing.get(key);
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
		if (ctx.apply) {
			if (ring.flex) ring.flex.remove();
			// Absolut, bevor Penpot das Layout rechnet: so zählt der Ring nie zum Hug der Box.
			detachRing(ctx, ring);
		}
		const { color, offset, token, width } = node.outline;
		syncStrokeList(ctx, ring, [{ alignment: 'outer', color, label: 'Fokusring', token, width }], ringPath, ringFresh);
		const radius = (node.outline.radius || node.radius || [0, 0, 0, 0]).map((corner) => round(corner > 0 ? corner + offset : 0));
		prop(
			ctx,
			ringFresh,
			ringPath,
			`Radius ${radius.join('/')}`,
			() => radiusOf(ring).join('/') === radius.join('/'),
			() => applyRadius(ctx, ring, radius),
		);
		setData(ctx, ring, KEY, key);
		if (ctx.apply) ctx.ringLayers.push({ board, node, offset, path, ring });
		return key;
	}

	/** Takes the ring out of the flex flow and pins it to the edges of the box. */
	function detachRing(ctx, ring) {
		if (ring.layoutChild) {
			trySet(ctx, ring.layoutChild, 'absolute', true);
			trySet(ctx, ring.layoutChild, 'zIndex', 1);
		}
		trySet(ctx, ring, 'constraintsHorizontal', 'leftright');
		trySet(ctx, ring, 'constraintsVertical', 'topbottom');
	}

	/** One offset outside the box on every side. */
	function placeRing(ctx, { board, offset, ring }) {
		detachRing(ctx, ring);
		ring.resize(Math.max(1, round(board.width + 2 * offset)), Math.max(1, round(board.height + 2 * offset)));
		ring.x = board.x - offset;
		ring.y = board.y - offset;
	}

	const near = (a, b) => Math.abs(a - b) <= 1;

	/** The ring surrounds the box at the offset; this is what the design shows. */
	function ringFits({ board, offset, ring }) {
		return (
			near(ring.x, board.x - offset) &&
			near(ring.y, board.y - offset) &&
			near(ring.width, board.width + 2 * offset) &&
			near(ring.height, board.height + 2 * offset)
		);
	}

	/** Without the ring layer, the focus ring becomes an outer stroke of the box again. */
	function ringFallback(ctx, item, reason) {
		if (!ctx.ringFallback) log(`Fokusring mit Abstand nicht möglich (${reason}): Ringe werden äußere Striche ohne Abstand.`, 'err');
		ctx.ringFallback = true;
		const { board, node, path, ring } = item;
		try {
			ring.remove();
		} catch (error) {
			// Aufräumen ist Best-Effort.
		}
		// Die Bibliothek merkt sich den Rückfall, damit spätere Läufe den Ring nicht erneut als Ebene versuchen.
		setData(ctx, penpot.library.local, RING, RING_REVISION);
		syncStrokes(ctx, board, node, path, true, true);
	}

	function createShape(ctx, node, key, origin, parent) {
		if (node.kind === 'instance') return createInstance(ctx, node, key, origin, parent);
		if (node.kind === 'vector') return createVector(ctx, node, key, origin, parent);
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
	 * `root` keeps the name: Penpot derives the variant properties of a set member from the name
	 * of its root layer, so renaming it would overwrite them.
	 */
	function syncShape(ctx, shape, node, key, path, origin, fresh, fixed, root = false) {
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
		if (!fresh && !root)
			prop(
				ctx,
				false,
				path,
				`Name ${node.name}`,
				() => shape.name === node.name,
				() => trySet(ctx, shape, 'name', node.name),
			);
		setData(ctx, shape, KEY, key);
		// Out of the flow: positioned after Penpot has laid out the parent.
		if (node.absolute && ctx.apply) ctx.absolutes.push({ shape, x: round(origin.x + node.x), y: round(origin.y + node.y) });
		if (node.classes && node.classes.length > 0) setData(ctx, shape, CLASSES, node.classes.join(' '));
		if (node.kind === 'text') {
			syncText(ctx, shape, node, path, fresh);
			return;
		}
		const ringLayer = usesRingLayer(ctx, node);
		syncBoxStyle(ctx, shape, node, path, fresh, ringLayer);
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
				if (child.kind === 'instance') syncInstance(ctx, current, child, childKey, childPath, origin, inLayout);
				else if (child.kind !== 'vector') syncShape(ctx, current, child, childKey, childPath, origin, false, inLayout);
				else if (getData(current, VECTOR) === vectorData(child)) syncVectorFill(ctx, current, child, childPath, false);
				else {
					ctx.report.changed.push(`${childPath}: Icon neu gezeichnet`);
					if (ctx.apply) {
						current.remove();
						createShape(ctx, child, childKey, origin, shape);
					}
				}
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
		if (ringLayer) seen.add(syncRingLayer(ctx, shape, node, path, existing, fresh));
		for (const [childKey, child] of existing) {
			// Nur Ebenen dieses Plugins verschwinden; von Hand ergänzte Ebenen bleiben unangetastet.
			if (!seen.has(childKey) && getData(child, KEY)) {
				ctx.report.removedLayers.push(`${path}/${childKey}`);
				if (ctx.apply) child.remove();
			}
		}
	}

	/**
	 * Gives every box its sizing once more after Penpot has applied the layout: the plugin API emits
	 * layout changes asynchronously, and Penpot writes default sizing of its own after `addFlexLayout`.
	 */
	async function settleLayout(ctx) {
		if (ctx.sizing.length === 0 && ctx.ringLayers.length === 0 && ctx.absolutes.length === 0) return;
		const sizing = ctx.sizing.splice(0);
		const rings = ctx.ringLayers.splice(0);
		const absolutes = ctx.absolutes.splice(0);
		await layoutSettled();
		for (const { shape, x, y } of absolutes) {
			if (shape.layoutChild) trySet(ctx, shape.layoutChild, 'absolute', true);
			shape.x = x;
			shape.y = y;
		}
		for (const { board, horizontal, path, vertical } of sizing) {
			if (board.horizontalSizing === horizontal && board.verticalSizing === vertical) continue;
			ctx.stats.resized += 1;
			if (ctx.stats.resized === 1) log(`${path}: Penpot hatte die Größe auf ${board.horizontalSizing}/${board.verticalSizing} gesetzt, korrigiert.`);
			// `fill` gilt im Layout des Elternelements (`layoutChild`); das Board und sein eigenes Layout kennen nur Hug und Fixed.
			const targetOf = (value) => (value === 'fill' && board.layoutChild) || board.flex || board;
			trySet(ctx, targetOf(horizontal), 'horizontalSizing', horizontal);
			trySet(ctx, targetOf(vertical), 'verticalSizing', vertical);
		}
		await layoutSettled();
		// Der Ring richtet sich nach der Box, deren Größe erst jetzt feststeht.
		for (const item of rings) placeRing(ctx, item);
		if (rings.length > 0) await layoutSettled();
		for (const item of rings) {
			if (ringFits(item)) continue;
			const { board, ring } = item;
			const geometry = (shape) => `${round(shape.x - board.x)}/${round(shape.y - board.y)} ${round(shape.width)}×${round(shape.height)}`;
			ringFallback(ctx, item, `Ring ${geometry(ring)}, Element ${round(board.width)}×${round(board.height)}`);
		}
		for (const { board, horizontal, path, vertical } of sizing) {
			if (board.horizontalSizing !== horizontal || board.verticalSizing !== vertical) {
				log(`${path}: Größe bleibt ${board.horizontalSizing}/${board.verticalSizing} statt ${horizontal}/${vertical}.`, 'err');
			}
		}
	}

	/** Logs the layout state of the selection and its parents, as Penpot stores it. */
	function inspectSelection() {
		const selection = penpot.selection || [];
		if (selection.length === 0) {
			log('Nichts ausgewählt: eine Ebene auf der Canvas auswählen und erneut prüfen.', 'err');
			return;
		}
		const safely = (read) => {
			try {
				return read();
			} catch (error) {
				return undefined;
			}
		};
		for (const selected of selection) {
			log(`Auswahl ${selected.name}:`, 'head');
			let shape = selected;
			for (let depth = 0; shape && depth < 6; depth += 1) {
				const flex = safely(() => shape.flex);
				const child = safely(() => shape.layoutChild);
				const parts = [
					`${shape.type} ${shape.name}`,
					`${round(shape.width)}×${round(shape.height)}`,
					shape.type === 'board' ? `Größe ${safely(() => shape.horizontalSizing)}/${safely(() => shape.verticalSizing)}` : '',
					flex ? `Flex ${flex.dir} ${flex.horizontalSizing}/${flex.verticalSizing}` : '',
					child ? `im Layout ${child.absolute ? 'absolut' : `${child.horizontalSizing}/${child.verticalSizing}`}` : '',
					shape.type === 'text' ? `Text ${safely(() => shape.growType)}` : '',
					`Tokens ${JSON.stringify(appliedTokens(shape))}`,
				];
				log(`  ${'  '.repeat(depth)}${parts.filter(Boolean).join(' · ')}`);
				shape = safely(() => shape.parent);
			}
		}
	}

	// ---------------------------------------------------------------- library

	// Penpot keeps the property order of a set; a property added later sits at its end.
	const signatureOf = (pairs) =>
		pairs
			.map(([name, value]) => `${name}=${value}`)
			.sort()
			.join(',');

	function variantPropsOf(component) {
		try {
			return (component.isVariant && component.isVariant() && component.variantProps) || null;
		} catch (error) {
			return null;
		}
	}

	/**
	 * The export entry a set member of another export takes over, e.g. a member of the browser
	 * export (`Disabled`, `Hover`, `Focus`) in the set of the spec export (`Disabled`, `Message`, …):
	 * its values match, every property it lacks has the value of the set's first entry.
	 */
	function adoptableEntry(component, entriesBySet) {
		const properties = variantPropsOf(component);
		const entries = entriesBySet.get(getData(component, SET) || component.name);
		if (!properties || !entries) return undefined;
		const defaults = new Map(entries[0].properties);
		const candidates = entries.filter((entry) => {
			const values = new Map(entry.properties);
			const own = Object.entries(properties);
			if (own.some(([name, value]) => values.get(name) !== value)) return false;
			return entry.properties.every(([name, value]) => name in properties || defaults.get(name) === value);
		});
		return candidates.length === 1 ? candidates[0] : undefined;
	}

	/**
	 * Components of this plugin by key. The key is plugin data on the component; Penpot drops plugin
	 * data of components it combines into a variant set, so a set member without a key is recognized
	 * by its variant properties, which are unique within the set. A set member whose key the export
	 * no longer contains is adopted by an entry of the same set (`adoptableEntry`), so the set and
	 * its instances stay. Components of an earlier import are adopted: the light scheme becomes the
	 * one set, components of the dark scheme keep their key and are marked deprecated, because the
	 * token theme `Scheme` replaces them.
	 */
	function managedComponents(ctx, payload) {
		const bySignature = new Map();
		const entriesBySet = new Map();
		for (const entry of payload.components) {
			if (!entry.set) continue;
			const signature = signatureOf(entry.properties);
			bySignature.set(signature, bySignature.has(signature) ? null : entry);
			if (!entriesBySet.has(entry.set)) entriesBySet.set(entry.set, []);
			entriesBySet.get(entry.set).push(entry);
		}
		const exported = new Set(payload.components.map((entry) => entry.id));
		const orphans = [];
		const result = new Map();
		for (const component of localComponents()) {
			let key = getData(component, KEY);
			if (!key) {
				const legacy = getData(component, 'kolibri-scenario-id');
				if (legacy) {
					const fullName = normalizeName(`${component.path || ''}/${component.name}`);
					key = legacy.includes('/') ? legacy : `${fullName.startsWith('dark/') ? 'dark' : 'light'}/${legacy}`;
				}
			}
			if (!key) {
				const properties = variantPropsOf(component);
				const entry = properties ? bySignature.get(signatureOf(Object.entries(properties))) : undefined;
				const names = [component.name, ...normalizeName(component.path).split('/')];
				if (entry && names.includes(entry.set)) {
					key = entry.id;
					ctx.stats.recognized += 1;
				}
			}
			if (!key) continue;
			key = key.startsWith('light/') ? key.slice('light/'.length) : key;
			if (exported.has(key)) result.set(key, component);
			else orphans.push([key, component]);
		}
		// Erst nach allen passenden Schlüsseln, damit eine Übernahme keine vorhandene Komponente verdrängt.
		for (const [key, component] of orphans) {
			const entry = adoptableEntry(component, entriesBySet);
			if (entry && !result.has(entry.id)) {
				result.set(entry.id, component);
				ctx.stats.adopted += 1;
				ctx.report.changed.push(`${key} → ${entry.id}`);
			} else {
				result.set(key, component);
			}
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
		syncShape(ctx, main, shapes, shapes.name, key, { x: main.x - shapes.x, y: main.y - shapes.y }, false, true, true);
	}

	function propertyNamesOf(component) {
		try {
			return component.variants ? [...component.variants.properties] : Object.keys(variantPropsOf(component) || {});
		} catch (error) {
			return [];
		}
	}

	/** Sets the values of a set member by property name; Penpot addresses a property by its position. */
	function setVariantValues(ctx, component, pairs, key) {
		const names = propertyNamesOf(component);
		const current = variantPropsOf(component) || {};
		for (const [name, value] of pairs) {
			const position = names.indexOf(name);
			if (position < 0 || current[name] === value) continue;
			if (key) ctx.report.changed.push(`${key}: ${name} ${current[name] ?? '–'} → ${value}`);
			if (ctx.apply) component.setVariantProperty(position, value);
		}
	}

	/**
	 * The properties of a set, once per set: as many names as exported, but different ones, are
	 * renamed by position; missing ones are added at the end; one the export no longer has is
	 * reported, because removing it can make two members equal.
	 */
	async function syncSetProperties(ctx, component, entry) {
		if (ctx.syncedSets.has(entry.set)) return;
		ctx.syncedSets.add(entry.set);
		const variants = component.variants;
		if (!variants) return;
		const names = [...variants.properties];
		const wanted = entry.properties.map(([name]) => name);
		if (names.length === wanted.length && wanted.some((name) => !names.includes(name))) {
			wanted.forEach((name, position) => {
				if (names[position] === name) return;
				ctx.report.changed.push(`${entry.set}: Eigenschaft ${names[position]} → ${name}`);
				if (ctx.apply) variants.renameProperty(position, name);
			});
			return;
		}
		for (const name of wanted.filter((candidate) => !names.includes(candidate))) {
			ctx.report.changed.push(`${entry.set}: Eigenschaft ${name} ergänzt`);
			if (!ctx.apply) continue;
			const count = variants.properties.length;
			variants.addProperty();
			for (let attempt = 0; attempt < 30 && variants.properties.length === count; attempt += 1) await wait(100);
			if (variants.properties.length === count) {
				log(`${entry.set}: Eigenschaft ${name} nicht ergänzbar (Zeitüberschreitung).`, 'err');
				return;
			}
			variants.renameProperty(variants.properties.length - 1, name);
		}
		const extra = names.filter((name) => !wanted.includes(name));
		if (extra.length > 0) ctx.report.removedLayers.push(`${entry.set}: Eigenschaft ${extra.join(', ')} nicht mehr exportiert, bitte von Hand entfernen`);
	}

	async function syncVariantProperties(ctx, component, entry, key) {
		if (!entry.set || !variantPropsOf(component)) return;
		await syncSetProperties(ctx, component, entry);
		setVariantValues(ctx, component, entry.properties, key);
	}

	/**
	 * Penpot builds a component from the shapes in its page store; a shape the plugin just created
	 * may not have arrived there yet, and `createComponent` then reports invalid shapes. It is retried
	 * after the store has settled.
	 */
	async function createComponentWhenStored(root) {
		for (let attempt = 1; ; attempt += 1) {
			try {
				return penpot.library.local.createComponent([root]);
			} catch (error) {
				if (attempt >= 5) throw error;
				await wait(200 * attempt);
				await layoutSettled();
			}
		}
	}

	async function buildComponent(ctx, shapes, key, name, set, x, y) {
		await activate(ctx.libraryPage);
		const root = createShape(ctx, shapes, shapes.name, { x: x - shapes.x, y: y - shapes.y }, null);
		await settleLayout(ctx);
		if (!root) return null;
		try {
			const component = await createComponentWhenStored(root);
			component.name = name;
			setData(ctx, component, KEY, key);
			if (set) setData(ctx, component, SET, set);
			ctx.stats.components += 1;
			const main = component.mainInstance() || root;
			ctx.built.set(main.id, { key, set });
			ctx.built.set(component.id, { key, set });
			return main;
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
				await layoutSettled();
				await retagSettled(ctx, mains);
				return;
			}
			await wait(100);
		}
		log(`${tag}: Variant-Set angelegt, Eigenschaften aber nicht benannt (Zeitüberschreitung).`, 'err');
	}

	/**
	 * Penpot replaces the members of a new set asynchronously; the instances of the next components
	 * need their keys, so the plugin waits until every member is found by its key again.
	 */
	async function retagSettled(ctx, mains) {
		const keys = mains.map((main) => (ctx.built.get(main.id) || {}).key).filter(Boolean);
		for (let attempt = 0; attempt < 30; attempt += 1) {
			retag(ctx);
			const known = new Set(localComponents().map((component) => getData(component, KEY)));
			if (keys.every((key) => known.has(key))) return;
			await wait(100);
			await layoutSettled();
		}
		log(`${keys[0]} …: Keys nach dem Zusammenfassen nicht wiedergefunden.`, 'err');
	}

	/** Writes the keys again that Penpot dropped while combining the components into a set. */
	function retag(ctx) {
		for (const component of localComponents()) {
			let main;
			try {
				main = component.mainInstance();
			} catch (error) {
				main = null;
			}
			// By component id first: combining may give a member a new main instance.
			const built = ctx.built.get(component.id) || (main ? ctx.built.get(main.id) : undefined);
			if (!built || getData(component, KEY) === built.key) continue;
			setData(ctx, component, KEY, built.key);
			if (built.set) setData(ctx, component, SET, built.set);
		}
	}

	/**
	 * Adds a member to an existing variant set: `combineAsVariants` only accepts components that
	 * are no variants yet, so Penpot duplicates a sibling inside the set, and the copy is then
	 * reconciled into the new member and gets its property values.
	 */
	async function addToSet(ctx, sibling, entry, shapes, key) {
		if (ctx.addVariantFailed) {
			ctx.report.removedLayers.push(`${key}: nicht angelegt, Variante ergänzen schlug fehl`);
			return;
		}
		await activateMain(sibling);
		const before = new Set(localComponents().map((component) => component.id));
		try {
			sibling.addVariant();
		} catch (error) {
			log(`${key}: Variante nicht ergänzbar (${error.message}).`, 'err');
			return;
		}
		let added;
		for (let attempt = 0; attempt < 30 && !added; attempt += 1) {
			await wait(100);
			added = localComponents().find((component) => !before.has(component.id));
		}
		if (!added) {
			ctx.addVariantFailed = true;
			log(`${key}: neue Variante nicht gefunden (Zeitüberschreitung); weitere neue Varianten dieses Laufs werden übersprungen.`, 'err');
			return;
		}
		setData(ctx, added, KEY, key);
		setData(ctx, added, SET, entry.set);
		ctx.built.set(added.mainInstance().id, { key, set: entry.set });
		// Die Kopie gehört schon zur neuen Komponente, ihr Umbau ist keine Änderung am Bestand.
		const report = ctx.report;
		ctx.report = newReport();
		syncComponentTree(ctx, added, shapes, key);
		ctx.report = report;
		setVariantValues(ctx, added, entry.properties);
		await settleLayout(ctx);
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

	/** The page that holds a shape. */
	function pageOf(shape) {
		for (const page of (penpot.currentFile && penpot.currentFile.pages) || []) {
			try {
				if (page.getShapeById(shape.id)) return page;
			} catch (error) {
				// Eine Seite ohne lesbaren Inhalt zählt nicht.
			}
		}
		return null;
	}

	/** Penpot only accepts changes on the active page, so the page of a shape opens before it changes. */
	async function activate(page) {
		if (!page || (penpot.currentPage && penpot.currentPage.id === page.id)) return;
		await penpot.openPage(page);
		await layoutSettled();
	}

	async function activateMain(component) {
		let main = null;
		try {
			main = component.mainInstance();
		} catch (error) {
			main = null;
		}
		if (main) await activate(pageOf(main));
	}

	/**
	 * Opens the page of the library: the page holding most managed main instances, else the page
	 * `KoliBri`, which a sync creates. New components land there.
	 */
	async function openLibraryPage(ctx, managed) {
		const counts = new Map();
		for (const component of managed.values()) {
			let main = null;
			try {
				main = component.mainInstance();
			} catch (error) {
				main = null;
			}
			const page = main ? pageOf(main) : null;
			if (page) counts.set(page.id, { page, count: ((counts.get(page.id) || {}).count || 0) + 1 });
		}
		let target = [...counts.values()].sort((a, b) => b.count - a.count).map((entry) => entry.page)[0];
		if (counts.size > 1) log(`Die Bibliothek liegt auf ${counts.size} Seiten; neue Komponenten kommen auf „${target.name}“.`, 'err');
		if (!target) target = ((penpot.currentFile && penpot.currentFile.pages) || []).find((page) => page.name === LIBRARY_PAGE);
		if (!target && ctx.apply) {
			target = penpot.createPage();
			target.name = LIBRARY_PAGE;
		}
		ctx.libraryPage = target || null;
		if (target) {
			await activate(target);
			log(`Bibliotheksseite: ${target.name}`);
		}
	}

	/**
	 * Groups in build order: base components that show no other component, then those that show
	 * them (`InputContainerFC` shows `InputFC`), then the components of the export.
	 */
	function buildOrder(entries) {
		const byId = new Map(entries.map((entry) => [entry.id, entry]));
		const levels = new Map();
		const instancesOf = (node) => (node.kind === 'instance' ? [node.component] : (node.children || []).flatMap(instancesOf));
		const levelOf = (entry) => {
			if (!levels.has(entry.id)) {
				levels.set(entry.id, 0);
				const used = entry.shapes
					? instancesOf(entry.shapes)
							.map((id) => byId.get(id))
							.filter(Boolean)
					: [];
				levels.set(entry.id, used.length === 0 ? 0 : 1 + Math.max(...used.map(levelOf)));
			}
			return levels.get(entry.id);
		};
		// All members of a set build together, at the level of their deepest member.
		const setLevels = new Map();
		for (const entry of entries) {
			if (entry.base && entry.set) setLevels.set(entry.set, Math.max(setLevels.get(entry.set) ?? 0, levelOf(entry)));
		}
		const groups = [];
		for (const entry of entries) {
			const level = entry.base ? (entry.set ? setLevels.get(entry.set) : levelOf(entry)) : Number.MAX_SAFE_INTEGER;
			let group = groups.find((candidate) => candidate.level === level);
			if (!group) {
				group = { level, entries: [] };
				groups.push(group);
			}
			group.entries.push(entry);
		}
		return groups.sort((first, second) => first.level - second.level).map((group) => group.entries);
	}

	async function syncLibrary(ctx, payload) {
		const managed = managedComponents(ctx, payload);
		await openLibraryPage(ctx, managed);
		for (const entry of payload.components) {
			if (!entry.shapes) continue;
			splitSideBorders(entry.shapes);
			annotateSizing(entry.shapes, null);
		}
		const shapesOf = (entry) => entry.shapes;
		const keyOf = (entry) => entry.id;
		let top = freeTop(managed);
		const gutter = 24;
		for (const group of buildOrder(payload.components)) {
			const sets = new Map();
			const singles = [];
			for (const entry of group) {
				if (!shapesOf(entry)) continue;
				if (entry.set) {
					if (!sets.has(entry.set)) sets.set(entry.set, []);
					sets.get(entry.set).push(entry);
				} else {
					singles.push(entry);
				}
			}

			for (const [tag, entries] of sets) {
				const existing = entries.filter((entry) => managed.has(keyOf(entry)));
				const fresh = entries.filter((entry) => !managed.has(keyOf(entry)));
				for (const entry of existing) {
					await activateMain(managed.get(keyOf(entry)));
					syncComponentTree(ctx, managed.get(keyOf(entry)), shapesOf(entry), keyOf(entry));
					await syncVariantProperties(ctx, managed.get(keyOf(entry)), entry, keyOf(entry));
					await settleLayout(ctx);
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
					await activateMain(managed.get(key));
					syncComponentTree(ctx, managed.get(key), shapesOf(entry), key);
					await settleLayout(ctx);
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
			if (column > 0) top += rowHeight + 80;
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
			addVariantFailed: false,
			built: new Map(),
			libraryPage: null,
			fonts: new Map(),
			missingTokens: new Set(),
			ringFallback: getData(penpot.library.local, RING) === RING_REVISION,
			ringLayers: [],
			absolutes: [],
			refused: new Set(),
			report: newReport(),
			sizing: [],
			syncedSets: new Set(),
			stats: { adopted: 0, boards: 0, bound: 0, components: 0, icons: 0, instances: 0, layouts: 0, recognized: 0, resized: 0, sets: 0, texts: 0 },
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
		if (ctx.stats.adopted > 0) log(`${ctx.stats.adopted} Komponenten eines anderen Exports in ihr Set übernommen.`);
		if (ctx.stats.recognized > 0) {
			log(`${ctx.stats.recognized} Komponenten ohne Kennung über ihre Variant-Eigenschaften erkannt${ctx.apply ? ', Kennung neu gesetzt' : ''}.`);
		}
		penpot.ui.sendMessage({ type: 'report', apply: ctx.apply, report: ctx.report });
		if (ctx.apply) {
			log(
				`Fertig: ${ctx.stats.components} Komponenten neu (${ctx.stats.sets} Variant-Sets), ${ctx.stats.instances} Instanzen von Basiskomponenten, ${ctx.stats.icons} Icons, ${ctx.report.changed.length} Änderungen, ${ctx.stats.bound} Token-Bindungen gesetzt, ${ctx.stats.resized} von Penpot zurückgesetzte Größen korrigiert.`,
				'ok',
			);
		}
	}

	let queue = Promise.resolve();

	penpot.ui.onMessage((message) => {
		if (message && message.type === 'inspect') {
			inspectSelection();
			return;
		}
		if (message && (message.type === 'preview' || message.type === 'sync')) {
			// Läufe gehen nacheinander, weil Variant-Sets und Layouts asynchron im Store entstehen.
			queue = queue.then(() => run(message)).catch((error) => log(`Abgebrochen: ${error.message}`, 'err'));
		}
	});

	penpot.ui.open('KoliBri Sync', 'index.html', { width: 460, height: 560 });
	log('KoliBri Sync bereit.');
})();
