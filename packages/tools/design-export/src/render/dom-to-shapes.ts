/**
 * In-page shape collector for the Penpot plugin: maps every rendered element box
 * (shadow DOM plus slotted content) to a shape descriptor with coordinates relative
 * to the component origin. Executed via `page.evaluate` like the SVG walker, so the
 * function is self-contained. The raw tree keeps one node per element; folding
 * wrappers into the box that paints happens afterwards in `simplifyShapes`.
 */
export interface ShapeLayout {
	alignItems: string;
	direction: 'column' | 'row';
	gap: number;
	justifyContent: string;
	wrap: boolean;
}

export interface ShapeNode {
	/** The BEM class that names the layer: the component's own block wins over embedded blocks. */
	name: string;
	/** Every `kol-` class of the element and of the wrappers folded into it (theming contract). */
	classes: string[];
	kind: 'box' | 'text';
	x: number;
	y: number;
	width: number;
	height: number;
	/** `inline-*` boxes size to their content (hug), block boxes keep their width. */
	inline?: boolean;
	fill?: string;
	/** Penpot name of the color token the fill comes from (see `bindTokens`). */
	fillToken?: string;
	stroke?: string;
	strokeToken?: string;
	/** Border width per side: top, right, bottom, left. */
	strokeWidths?: [number, number, number, number];
	/** Corner radius: top-left, top-right, bottom-right, bottom-left. */
	radius?: [number, number, number, number];
	/** Padding per side: top, right, bottom, left. */
	padding?: [number, number, number, number];
	/** CSS outline (focus ring), drawn outside the border box at `offset`; `radius` is the corner radius it follows. */
	outline?: { color: string; offset: number; radius?: [number, number, number, number]; token?: string; width: number };
	/** CSS `min-width`/`min-height` in px, e.g. the a11y minimum size of interactive elements. */
	minWidth?: number;
	minHeight?: number;
	/** First CSS box shadow. */
	shadow?: { blur: number; color: string; spread: number; x: number; y: number };
	layout?: ShapeLayout;
	opacity?: number;
	characters?: string;
	fontSize?: number;
	fontWeight?: number;
	fontFamily?: string;
	lineHeight?: number;
	textAlign?: string;
	children: ShapeNode[];
}

export function domToShapes(selector: string): ShapeNode {
	const host = document.querySelector(selector);
	if (!host) {
		throw new Error(`No element for ${selector}`);
	}
	const hostRect = host.getBoundingClientRect();
	const hostBlock = host.tagName.toLowerCase();
	const SIDES = ['top', 'right', 'bottom', 'left'];

	function relative(rect: DOMRect): { x: number; y: number; width: number; height: number } {
		return { x: rect.x - hostRect.x, y: rect.y - hostRect.y, width: rect.width, height: rect.height };
	}

	function isPainted(color: string): boolean {
		return color !== '' && color !== 'transparent' && !/rgba?\([^)]*,0\)$/.test(color.replace(/\s/g, ''));
	}

	function kolClasses(element: Element): string[] {
		return [...element.classList].filter((name) => name.startsWith('kol-'));
	}

	function nameOf(element: Element): string {
		const classes = kolClasses(element);
		return (
			classes.find((name) => name === hostBlock || name.startsWith(`${hostBlock}__`)) ??
			classes.find((name) => name.includes('__')) ??
			classes[0] ??
			element.tagName.toLowerCase()
		);
	}

	function sides(style: CSSStyleDeclaration, property: (side: string) => string): [number, number, number, number] {
		return SIDES.map((side) => parseFloat(style.getPropertyValue(property(side))) || 0) as [number, number, number, number];
	}

	function layoutOf(style: CSSStyleDeclaration): ShapeLayout | undefined {
		if (!style.display.endsWith('flex')) {
			return undefined;
		}
		const column = style.flexDirection.startsWith('column');
		return {
			alignItems: style.alignItems,
			direction: column ? 'column' : 'row',
			gap: parseFloat(column ? style.rowGap : style.columnGap) || 0,
			justifyContent: style.justifyContent,
			wrap: style.flexWrap === 'wrap',
		};
	}

	function shadowOf(style: CSSStyleDeclaration): ShapeNode['shadow'] {
		if (style.boxShadow === 'none' || style.boxShadow.includes('inset')) {
			return undefined;
		}
		// Berechneter Wert: Farbe zuerst, dann x y blur spread in px; nur der erste Schatten zählt.
		const match = /^(rgba?\([^)]*\))\s+(-?[\d.]+)px\s+(-?[\d.]+)px\s+([\d.]+)px\s*(-?[\d.]+)?/.exec(style.boxShadow);
		if (!match || !isPainted(match[1])) {
			return undefined;
		}
		return { color: match[1], x: parseFloat(match[2]), y: parseFloat(match[3]), blur: parseFloat(match[4]), spread: parseFloat(match[5] ?? '0') };
	}

	function textNode(element: Element, style: CSSStyleDeclaration, child: ChildNode): ShapeNode {
		const range = document.createRange();
		range.selectNodeContents(child);
		return {
			name: `${nameOf(element)}__text`,
			classes: [],
			kind: 'text',
			...relative(range.getBoundingClientRect()),
			fill: style.color,
			characters: (child.textContent ?? '').trim(),
			fontSize: parseFloat(style.fontSize) || 14,
			fontWeight: parseInt(style.fontWeight, 10) || 400,
			fontFamily: style.fontFamily,
			lineHeight: parseFloat(style.lineHeight) || undefined,
			textAlign: style.textAlign,
			children: [],
		};
	}

	function walk(element: Element): ShapeNode[] {
		const style = getComputedStyle(element);
		if (style.visibility === 'hidden' || style.display === 'none') {
			return [];
		}
		const rect = relative(element.getBoundingClientRect());
		if (rect.width === 0 && rect.height === 0) {
			return [];
		}
		const children: ShapeNode[] = [];
		// Shadow-Kinder und geslottete Light-DOM-Kinder gehen in Dokumentreihenfolge in den Baum.
		const childNodes = element.shadowRoot ? [...element.shadowRoot.childNodes, ...element.childNodes] : [...element.childNodes];
		for (const child of childNodes) {
			if (child.nodeType === Node.TEXT_NODE && (child.textContent ?? '').trim() !== '') {
				children.push(textNode(element, style, child));
			} else if (child.nodeType === Node.ELEMENT_NODE) {
				children.push(...walk(child as Element));
			}
		}
		const strokeWidths = sides(style, (side) => `border-${side}-width`);
		const hasStroke = strokeWidths.some((width) => width > 0) && isPainted(style.borderTopColor);
		const radius = [style.borderTopLeftRadius, style.borderTopRightRadius, style.borderBottomRightRadius, style.borderBottomLeftRadius].map(
			(value) => parseFloat(value) || 0,
		) as [number, number, number, number];
		const padding = sides(style, (side) => `padding-${side}`);
		const opacity = parseFloat(style.opacity);
		const outlineWidth = style.outlineStyle === 'none' ? 0 : parseFloat(style.outlineWidth) || 0;
		if (element === host) {
			// Der Host malt nur die a11y-Kontrastfläche (Oberfläche, auf der die Komponente sitzt), kein Design.
			return [{ name: nameOf(element), classes: kolClasses(element), kind: 'box', ...rect, inline: style.display.startsWith('inline') || undefined, children }];
		}
		return [
			{
				name: nameOf(element),
				classes: kolClasses(element),
				kind: 'box',
				...rect,
				inline: style.display.startsWith('inline') || undefined,
				fill: isPainted(style.backgroundColor) ? style.backgroundColor : undefined,
				stroke: hasStroke ? style.borderTopColor : undefined,
				strokeWidths: hasStroke ? strokeWidths : undefined,
				radius: radius.some((value) => value > 0) ? radius : undefined,
				padding: padding.some((value) => value > 0) ? padding : undefined,
				outline:
					outlineWidth > 0 && isPainted(style.outlineColor)
						? {
								color: style.outlineColor,
								offset: parseFloat(style.outlineOffset) || 0,
								radius: radius.some((value) => value > 0) ? radius : undefined,
								width: outlineWidth,
							}
						: undefined,
				minWidth: parseFloat(style.minWidth) || undefined,
				minHeight: parseFloat(style.minHeight) || undefined,
				shadow: shadowOf(style),
				layout: layoutOf(style),
				opacity: opacity < 1 ? opacity : undefined,
				children,
			},
		];
	}

	const [root] = walk(host);
	return root ?? { name: hostBlock, classes: [], kind: 'box', x: 0, y: 0, width: hostRect.width, height: hostRect.height, children: [] };
}
