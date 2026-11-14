import type { DomNode } from '../types.js';

/**
 * In-page DOM collector for the IR: flattens the shadow DOM of a rendered
 * component and names every node by its BEM class (or tag), the same names the
 * SVG layers carry. Executed in the browser via `page.evaluate` after a theme
 * has rendered the component.
 */
export function collectDomTree(selector: string): DomNode {
	function walk(element: Element): DomNode {
		const kolClass = [...element.classList].find((name) => name.startsWith('kol-'));
		const text = [...element.childNodes]
			.filter((node) => node.nodeType === Node.TEXT_NODE)
			.map((node) => node.textContent?.trim())
			.filter(Boolean)
			.join(' ');
		return {
			name: kolClass ?? element.tagName.toLowerCase(),
			tag: element.tagName.toLowerCase(),
			text: text || undefined,
			// Geslottete Knoten bleiben Kinder des Host im Light DOM und fehlen,
			// wenn nur der Shadow-Zweig traversiert wird.
			children: [...(element.shadowRoot ? [...element.shadowRoot.children, ...element.children] : element.children)].map(walk),
		};
	}
	const host = document.querySelector(selector);
	if (!host) {
		throw new Error(`No element for ${selector}`);
	}
	return walk(host);
}
