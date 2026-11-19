export function domToShapes(selector) {
	const host = document.querySelector(selector);
	if (!host) {
		throw new Error(`No element for ${selector}`);
	}
	const hostRect = host.getBoundingClientRect();
	const hostBlock = host.tagName.toLowerCase();
	const SIDES = ['top', 'right', 'bottom', 'left'];
	// Gerundet auf Hundertstel: Subpixel-Rauschen des Layouts darf die Ausgabe nicht verändern.
	const round = (value) => Math.round(value * 100) / 100;
	function relative(rect) {
		return { x: round(rect.x - hostRect.x), y: round(rect.y - hostRect.y), width: round(rect.width), height: round(rect.height) };
	}
	function isPainted(color) {
		return color !== '' && color !== 'transparent' && !/rgba?\([^)]*,0\)$/.test(color.replace(/\s/g, ''));
	}
	function kolClasses(element) {
		return [...element.classList].filter((name) => name.startsWith('kol-'));
	}
	function nameOf(element) {
		const classes = kolClasses(element);
		return (
			classes.find((name) => name === hostBlock || name.startsWith(`${hostBlock}__`)) ??
			classes.find((name) => name.includes('__')) ??
			classes[0] ??
			element.tagName.toLowerCase()
		);
	}
	function sides(style, property) {
		return SIDES.map((side) => parseFloat(style.getPropertyValue(property(side))) || 0);
	}
	function layoutOf(style) {
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
	function shadowOf(style) {
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
	function textNode(element, style, child) {
		const range = document.createRange();
		range.selectNodeContents(child);
		return {
			name: `${nameOf(element)}::text`,
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
	function walk(element) {
		const style = getComputedStyle(element);
		if (style.visibility === 'hidden' || style.display === 'none') {
			return [];
		}
		const rect = relative(element.getBoundingClientRect());
		if (rect.width === 0 && rect.height === 0) {
			return [];
		}
		const children = [];
		// Shadow-Kinder und geslottete Light-DOM-Kinder gehen in Dokumentreihenfolge in den Baum.
		const childNodes = element.shadowRoot ? [...element.shadowRoot.childNodes, ...element.childNodes] : [...element.childNodes];
		for (const child of childNodes) {
			if (child.nodeType === Node.TEXT_NODE && (child.textContent ?? '').trim() !== '') {
				children.push(textNode(element, style, child));
			} else if (child.nodeType === Node.ELEMENT_NODE) {
				children.push(...walk(child));
			}
		}
		const strokeWidths = sides(style, (side) => `border-${side}-width`);
		const hasStroke = strokeWidths.some((width) => width > 0) && isPainted(style.borderTopColor);
		const radius = [style.borderTopLeftRadius, style.borderTopRightRadius, style.borderBottomRightRadius, style.borderBottomLeftRadius].map(
			(value) => parseFloat(value) || 0,
		);
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
				interactive: element.matches('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])') || undefined,
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
	return root ?? { name: hostBlock, classes: [], kind: 'box', x: 0, y: 0, width: round(hostRect.width), height: round(hostRect.height), children: [] };
}
