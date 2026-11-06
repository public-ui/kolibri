/**
 * Serializes a rendered KoliBri component into a layered SVG.
 *
 * The walker runs inside the browser page (passed to `page.evaluate`): it flattens
 * the shadow DOM, reads the computed layout of every BEM element and emits one
 * SVG group per element, named by its BEM class (or tag). `id` and `data-name`
 * carry the layer name, so Penpot and Figma keep the theming contract visible in
 * the layer tree. Colors are resolved values for the active `color-scheme` of the
 * frame; exporting both schemes yields one SVG per scheme.
 *
 * Static approximation, documented limitations: pseudo elements, font icons
 * (kept as text glyphs; the font is not embedded) and multi-side borders with
 * differing widths collapse into a uniform stroke.
 */
export function domToSvg(hostSelector: string): string {
	const host = document.querySelector(hostSelector);
	if (!host) {
		throw new Error(`No element for ${hostSelector}`);
	}
	const hostRect = host.getBoundingClientRect();
	const svgParts: string[] = [];

	function escapeXml(value: string): string {
		return value.replace(/[<>&"']/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char] ?? char);
	}

	function layerName(element: Element): string {
		const kolClass = [...element.classList].find((name) => name.startsWith('kol-'));
		return kolClass ?? `${element.tagName.toLowerCase()}`;
	}

	function isPainted(color: string): boolean {
		return color !== '' && color !== 'transparent' && !/rgba?\([^)]*,\s*0\s*\)/.test(color.replace(/\s/g, ''));
	}

	/** Direct text children as SVG text runs, positioned by their rendered range. */
	function textNodesOf(element: Element, style: CSSStyleDeclaration): string[] {
		const runs: string[] = [];
		for (const child of element.childNodes) {
			if (child.nodeType === Node.TEXT_NODE && (child.textContent ?? '').trim() !== '') {
				const range = document.createRange();
				range.selectNodeContents(child);
				const textRect = range.getBoundingClientRect();
				runs.push(
					`<text x="${(textRect.x - hostRect.x).toFixed(1)}" y="${(textRect.y - hostRect.y + textRect.height / 2 + parseFloat(style.fontSize) * 0.35).toFixed(1)}" font-family="${escapeXml(style.fontFamily)}" font-size="${style.fontSize}" font-weight="${style.fontWeight}" fill="${style.color}" stroke="none" xml:space="preserve">${escapeXml(child.textContent ?? '')}</text>`,
				);
			}
		}
		return runs;
	}

	function serializeElement(element: Element, depth: number): void {
		const style = getComputedStyle(element);
		if (style.visibility === 'hidden' || style.display === 'none') {
			return;
		}
		const rect = element.getBoundingClientRect();
		if (rect.width === 0 && rect.height === 0) {
			return;
		}
		const x = rect.x - hostRect.x;
		const y = rect.y - hostRect.y;
		const name = layerName(element);
		const parts: string[] = [];
		if (isPainted(style.backgroundColor)) {
			parts.push(
				`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${rect.width.toFixed(1)}" height="${rect.height.toFixed(1)}" rx="${parseFloat(style.borderTopLeftRadius) || 0}" fill="${style.backgroundColor}" stroke="none"/>`,
			);
		}
		const borderWidth = Math.max(
			parseFloat(style.borderTopWidth),
			parseFloat(style.borderRightWidth),
			parseFloat(style.borderBottomWidth),
			parseFloat(style.borderLeftWidth),
		);
		if (borderWidth > 0 && isPainted(style.borderTopColor)) {
			const inset = borderWidth / 2;
			parts.push(
				`<rect x="${(x + inset).toFixed(1)}" y="${(y + inset).toFixed(1)}" width="${(rect.width - borderWidth).toFixed(1)}" height="${(rect.height - borderWidth).toFixed(1)}" rx="${parseFloat(style.borderTopLeftRadius) || 0}" fill="none" stroke="${style.borderTopColor}" stroke-width="${borderWidth}"/>`,
			);
		}
		parts.push(...textNodesOf(element, style));
		// Geslottete Knoten bleiben Kinder des Host im Light DOM; der Slot selbst trägt
		// sie nicht als children. Beide Zweige serialisieren, sonst fehlt Slot-Inhalt.
		const children = element.shadowRoot ? [...element.shadowRoot.children, ...element.children] : [...element.children];
		if (parts.length > 0 || children.length > 0) {
			svgParts.push(`\n${'  '.repeat(depth + 1)}<g id="${name}" data-name="${name}">${parts.join('')}`);
			for (const child of children) {
				serializeElement(child, depth + 1);
			}
			svgParts.push(`</g>`);
		}
	}

	// den Host selbst als Wurzelgruppe serialisieren; geslottete Textknoten hängen
	// direkt am Host und gehören mit in die Wurzelgruppe
	const hostStyle = getComputedStyle(host);
	svgParts.push(`\n  <g id="${host.tagName.toLowerCase()}" data-name="${host.tagName.toLowerCase()}">`);
	if (isPainted(hostStyle.backgroundColor)) {
		svgParts.push(
			`<rect x="0" y="0" width="${hostRect.width.toFixed(1)}" height="${hostRect.height.toFixed(1)}" fill="${hostStyle.backgroundColor}" stroke="none"/>`,
		);
	}
	svgParts.push(...textNodesOf(host, hostStyle));
	for (const child of [...(host.shadowRoot?.children ?? []), ...host.children]) {
		serializeElement(child, 1);
	}
	svgParts.push(`</g>`);

	// Der Name am svg-Element wird beim Import zum Layernamen (z.B. in Penpot);
	// die BEM-Wurzelgruppe darunter bleibt zusätzlich benannt.
	const hostName = host.tagName.toLowerCase();
	return `<svg xmlns="http://www.w3.org/2000/svg" id="${hostName}" data-name="${hostName}" width="${Math.ceil(hostRect.width)}" height="${Math.ceil(hostRect.height)}" viewBox="0 0 ${Math.ceil(hostRect.width)} ${Math.ceil(hostRect.height)}">${svgParts.join('')}\n</svg>`;
}
