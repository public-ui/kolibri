import { getCssStyle, patchTheme, patchThemeTag } from 'adopted-style-sheets';
import rgba from 'rgba-convert';
import { hex, score } from 'wcag-contrast';

import { getDocument, getExperimentalMode, Log } from './dev.utils';

// https://regex101.com/r/lSYLO9/1
/**
 * Bei Stencil kann es vorkommen, dass bei der Übergabe eines komplexer Objekte
 * der String "[object Object]" an die Web Component übergeben wird. Um den Neben-
 * effekt abzufangen, wird dieser Fall abgefangen und nicht ausgeführt.
 */
const OBJECT_OBJECT = /\[object Object\]/;
export const objectObjectHandler = (value: unknown, cb: () => void): void => {
	if (typeof value === 'string' && OBJECT_OBJECT.test(value)) {
		return;
	}
	cb();
};

/**
 * Bei interaktiven HTML-Elementen kommt es vor, dass der Event an einem nicht
 * interaktiven HTML-Element "lostriggert" und dann den DOM-Baum hoch propagiert.
 * Zu unterschiedlichen Zeitpunkten sind an dem einen Event somit immer unterschiedliche
 * HTML-Elemente.
 * Damit wir das "richtige" interaktive HTML-Element an das Event binden, setzen
 * wir das Target explizit und stoppen die Propagation.
 */
export const setEventTarget = (event: Event, target?: HTMLElement): void => {
	if (getExperimentalMode()) {
		// event.preventDefault(); /* WHY? */
		Log.debug([event, target]);
		Log.debug(`↑ We propagate the (submit) event to this target.`);
	}
	Object.defineProperty(event, 'target', {
		value: target,
		writable: false,
	});
};

export const stringifyJson = (value: unknown): string => {
	try {
		return JSON.stringify(value).replace(/"/g, "'");
	} catch {
		Log.warn(['stringifyJson', value]);
		Log.error(`↑ The JSON could not be converted to a string. A stringifiable JSON is expected.`);
		throw new Error();
	}
};

const JSON_CHARS = /^[{[]/; // string starts with { or [
export const parseJson = <T>(value: unknown): T => {
	if (typeof value === 'string') {
		try {
			// "null", "true", "false", "0" works too
			return JSON.parse(value);
		} catch {
			if (JSON_CHARS.test(value)) {
				try {
					return JSON.parse(value.replace(/'/g, '"'));
				} catch {
					Log.warn(['parseJson', value]);
					Log.error(`↑ The JSON string could not be parsed. Make sure that single quotes in the text are escaped (&#8216;).`);
				}
			}
		}
	}
	throw new Error();
};

export const mapBoolean2String = (value?: boolean): string | undefined => {
	return typeof value === 'boolean' ? (value === true ? 'true' : 'false') : undefined;
};

export const mapStringOrBoolean2String = (value?: string | boolean): string | undefined => {
	return typeof value === 'string' ? value : mapBoolean2String(value);
};

/**
 * Traverses the DOM including shadow roots and slotted elements via BFS.
 * `onNode` is called once per node; returning `true` stops traversal early.
 */
const traverseShadowDom = (rootNode: ParentNode, onNode: (node: ParentNode) => boolean): void => {
	if (!rootNode) {
		return;
	}
	const visited = new Set<Node>();
	const queue: ParentNode[] = [rootNode];
	let index = 0;
	while (index < queue.length) {
		const current = queue[index++];
		if (visited.has(current)) {
			continue;
		}
		visited.add(current);
		if (onNode(current)) {
			return;
		}
		const children = Array.from(current.children || []);
		for (let i = 0; i < children.length; i++) {
			queue.push(children[i]);
		}
		if (current instanceof HTMLElement && current.shadowRoot) {
			queue.push(current.shadowRoot);
		}
		if (current instanceof HTMLSlotElement) {
			const assigned = current.assignedNodes({ flatten: true });
			for (let i = 0; i < assigned.length; i++) {
				if (assigned[i] instanceof Element) {
					queue.push(assigned[i] as HTMLElement);
				}
			}
		}
	}
};

const querySelectorShadow = <T extends Element>(selector: string, rootNode: ParentNode): T | null => {
	let result: T | null = null;
	traverseShadowDom(rootNode, (current) => {
		if (current instanceof Element && current.matches(selector)) {
			result = current as T;
			return true;
		}
		return false;
	});
	return result;
};

const querySelectorAllShadow = <T extends Element>(selector: string, rootNode: ParentNode): T[] => {
	const results: T[] = [];
	traverseShadowDom(rootNode, (current) => {
		if (current instanceof Element && current.matches(selector)) {
			results.push(current as T);
		}
		return false;
	});
	return results;
};

export const koliBriQuerySelector = <T extends Element>(selector: string, node?: Document | HTMLElement | ShadowRoot): T | null =>
	querySelectorShadow<T>(selector, node || getDocument());

export const koliBriQuerySelectorAll = <T extends Element>(selector: string, node?: Document | HTMLElement | ShadowRoot): T[] =>
	querySelectorAllShadow<T>(selector, node || getDocument());

interface A11yColorContrast {
	backgroundColor: string;
	color: string;
	domNode: HTMLElement | HTMLSlotElement;
	level: string;
	score: number;
}

let DEFAULT_COLOR_CONTRAST: A11yColorContrast | null = null;
const getDefaultColorContrast = (): A11yColorContrast => {
	DEFAULT_COLOR_CONTRAST = DEFAULT_COLOR_CONTRAST || {
		backgroundColor: '#00000000',
		color: '#00000000',
		domNode: getDocument().body,
		level: 'Fail',
		score: 1,
	};
	return DEFAULT_COLOR_CONTRAST;
};

const TRANSPARENT_REGEXP = /(\d+, ){3}0\)/;
export const koliBriA11yColorContrast = (domNode: HTMLElement, a11yColorContrast: A11yColorContrast = getDefaultColorContrast()): A11yColorContrast => {
	const computedStyle = getComputedStyle(domNode);
	const hexBG: string = TRANSPARENT_REGEXP.test(computedStyle.backgroundColor) ? a11yColorContrast.backgroundColor : rgba.hex(computedStyle.backgroundColor);
	const hexC: string = TRANSPARENT_REGEXP.test(computedStyle.color) ? a11yColorContrast.color : rgba.hex(computedStyle.color);
	const diff = hex(hexBG, hexC);
	const contrast = {
		backgroundColor: hexBG,
		color: hexC,
		domNode: domNode,
		level: score(diff),
		score: diff,
	};
	if (diff < 4.5) {
		Log.error([
			'Color-Contrast-Error',
			{
				backgroundColor: contrast.backgroundColor,
				color: contrast.color,
				level: contrast.level,
				score: contrast.score,
			},
			contrast.domNode,
		]);
	}
	return contrast;
};

export const koliBriQuerySelectorColors = (selector: string, a11yColorContrast: A11yColorContrast = getDefaultColorContrast()): A11yColorContrast => {
	if (a11yColorContrast.domNode instanceof HTMLElement) {
		a11yColorContrast = koliBriA11yColorContrast(a11yColorContrast.domNode, a11yColorContrast);
	}
	const selectedNode: HTMLElement | null = a11yColorContrast.domNode.querySelector<HTMLElement>(selector);
	if (selectedNode === null) {
		const nodeList: NodeListOf<HTMLElement> = a11yColorContrast.domNode.querySelectorAll<HTMLElement>('[class="hydrated"]');
		for (let i = 0; i < nodeList.length; i++) {
			// const shadowRoot: ShadowRoot = nodeList[i].shadowRoot as ShadowRoot;
			// if (typeof shadowRoot === 'object' && shadowRoot !== null) {
			//   a11yColorContrast.domNode = shadowRoot;
			//   a11yColorContrast = koliBriQuerySelectorColors(selector, a11yColorContrast);
			// } else {
			a11yColorContrast.domNode = nodeList[i];
			a11yColorContrast = koliBriQuerySelectorColors(selector, a11yColorContrast);
			// }
			if (a11yColorContrast.domNode !== null) {
				break;
			}
		}
		return a11yColorContrast;
	} else {
		return koliBriA11yColorContrast(selectedNode, a11yColorContrast);
	}
};

export class KoliBriUtils {
	private static executionLock = false;
	private static cache = new Map<Element, A11yColorContrast>();
	public static queryHtmlElementColors(targetNode: HTMLElement, a11yColorContrast: A11yColorContrast, recursion = false, log = true): A11yColorContrast | null {
		let returnValue = null;
		if (recursion === true || KoliBriUtils.executionLock === false) {
			if (recursion === false) {
				KoliBriUtils.cache.clear();
				KoliBriUtils.cache.set(a11yColorContrast.domNode, a11yColorContrast);
				KoliBriUtils.executionLock = true;
				if (log === true) {
					Log.debug(`[KoliBriUtils] Color contrast analysis started...`);
				}
			}
			// Log.debug(a11yColorContrast.domNode);
			if (targetNode === a11yColorContrast.domNode) {
				returnValue = a11yColorContrast;
			} else {
				const children: Set<Element> = new Set<Element>();
				if (a11yColorContrast.domNode.shadowRoot) {
					const shadowChildren = a11yColorContrast.domNode.shadowRoot.children;
					for (let i = 0; i < shadowChildren.length; i++) {
						children.add(shadowChildren[i]);
					}
				}
				const slotElement: HTMLSlotElement = a11yColorContrast.domNode as HTMLSlotElement;
				if (typeof slotElement.assignedNodes === 'function') {
					const slotChildren = slotElement.assignedNodes();
					for (let i = 0; i < slotChildren.length; i++) {
						if (slotChildren[i] instanceof HTMLElement) {
							children.add(slotChildren[i] as HTMLElement);
						}
					}
				}
				const domChildren = a11yColorContrast.domNode.children;
				for (let i = 0; i < domChildren.length; i++) {
					children.add(domChildren[i]);
				}
				const arrayChildren = Array.from(children);
				for (let i = 0; i < arrayChildren.length; i++) {
					let colorContrast: A11yColorContrast | undefined = KoliBriUtils.cache.get(arrayChildren[i]);
					if (colorContrast === undefined) {
						colorContrast = koliBriA11yColorContrast(arrayChildren[i] as HTMLElement, a11yColorContrast);
					}
					KoliBriUtils.cache.set(arrayChildren[i], colorContrast);
					const colors: A11yColorContrast | null = KoliBriUtils.queryHtmlElementColors(targetNode, colorContrast, true, false);
					if (colors !== null) {
						returnValue = colors;
						break;
					}
				}
			}
		} else {
			Log.debug(`[KoliBriUtils] Call aborted because a color contrast analysis is currently being executed.`);
		}
		if (recursion === false) {
			if (log === true) {
				Log.debug(`[KoliBriUtils] Color contrast analysis finished (${KoliBriUtils.cache.size} DOM elements are analysed).`);
			}
			KoliBriUtils.executionLock = false;
			KoliBriUtils.cache.clear();
		}
		return returnValue;
	}
}

export class KoliBriDevHelper {
	public static readonly getCssStyle = getCssStyle;
	public static readonly patchTheme = patchTheme;
	public static readonly patchThemeTag = patchThemeTag;
	public static readonly querySelector = koliBriQuerySelector;
	public static readonly querySelectorAll = koliBriQuerySelectorAll;
	public static readonly stringifyJson = stringifyJson;
}
