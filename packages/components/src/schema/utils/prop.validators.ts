import type { Generic } from 'adopted-style-sheets';
import { getCssStyle, patchTheme, patchThemeTag } from 'adopted-style-sheets';
import { querySelectorAll } from 'query-selector-all-shadow-root';
import { querySelector } from 'query-selector-shadow-root';
import rgba from 'rgba-convert';
import { hex, score } from 'wcag-contrast';

import { Log, getDocument, getExperimentalMode } from './dev.utils';

import type { Stringified } from '../types/common';
import type { StencilUnknown } from '../types/unknown';
import { devHint } from './a11y.tipps';
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
 * Bei Stencil kann es vorkommen, dass bei der Übergabe eines leeren Array's
 * ein leerer String an die Web Component übergeben wird. Um den Nebeneffekt
 * abzufangen, wird dieser Fall abgefangen und nicht ausgeführt.
 */
export const emptyStringByArrayHandler = (value: unknown, cb: () => void): void => {
	if (typeof value === 'string' && value === '') {
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
		Log.debug([event, target]);
		Log.debug(`↑ We propagate the (submit) event to this target.`);
	}
	Object.defineProperty(event, 'target', {
		value: target,
		writable: false,
	});
};

const patchState = (component: Generic.Element.Component): void => {
	component.nextHooks?.forEach((hooks, key) => {
		const beforePatch = hooks.get('beforePatch') as Generic.Element.NextStateHooksCallback;
		if (typeof beforePatch === 'function') {
			beforePatch(component.nextState?.get(key), component.nextState as Map<string, unknown>, component, key);
		}
	});
	/**
	 * Wenn in beforePatch Methoden die Änderung verworfen wird,
	 * muss auch nicht der State aktualisiert und neu gerendert
	 * werden.
	 */
	if ((component.nextState as Map<string, unknown>)?.size > 0) {
		component.state = {
			...component.state,
			...Object.fromEntries(component.nextState as Map<string, unknown>),
		};
		delete component.nextState;

		component.nextHooks?.forEach((hooks, key) => {
			const afterPatch = hooks.get('afterPatch') as Generic.Element.StateHooksCallback;
			if (typeof afterPatch === 'function') {
				afterPatch(component.state[key], component.state, component, key);
			}
		});
	}
	delete component.nextHooks;
};

export type SetStateHooks = {
	afterPatch?: Generic.Element.StateHooksCallback;
	beforePatch?: Generic.Element.NextStateHooksCallback;
};

export const setState = <T>(component: Generic.Element.Component, propName: string, value?: T | null | undefined, hooks: SetStateHooks = {}): void => {
	if (component.nextHooks === undefined) {
		component.nextHooks = new Map();
	}
	if (component.nextState === undefined) {
		component.nextState = new Map();
	}
	const nextHooks = component.nextHooks.get(propName);
	if (nextHooks instanceof Map === false) {
		component.nextHooks.set(propName, new Map());
	}
	if (typeof hooks.afterPatch === 'function') {
		component.nextHooks.get(propName)?.set('afterPatch', hooks.afterPatch);
	}
	if (typeof hooks.beforePatch === 'function') {
		component.nextHooks.get(propName)?.set('beforePatch', hooks.beforePatch);
	}
	component.nextState.set(propName, value);
	/**
	 * Muss erstmal in sync bleiben, da sonst der
	 * Tooltip nicht korrekt ausgerichtet wird.
	 */
	// if (component.hydrated === true || processEnv !== 'test') {
	// clearTimeout(component.timeout as NodeJS.Timeout);
	// component.timeout = setTimeout(() => {
	// 	clearTimeout(component.timeout as NodeJS.Timeout);
	// 	patchState(component);
	// }, 50);
	// } else {
	patchState(component);
	// }
};

const logWarn = (component: Generic.Element.Component, propName: string, value: unknown, requiredGeneric: Set<string | null | undefined>): void => {
	devHint(
		`[${component.constructor.name}] The property value: (${value as string}) for '${propName}' is not valid. Allowed values are: ${Array.from(
			requiredGeneric,
		).join(', ')}`,
	);
};

export type WatchOptions = {
	defaultValue?: unknown;
	hooks?: SetStateHooks;
	required?: boolean;
};

export type WatchBooleanOptions = WatchOptions & {
	defaultValue?: boolean | null;
};

export type WatchStringOptions = WatchOptions & {
	defaultValue?: string | null;
	maxLength?: number;
	minLength?: number;
};

export type WatchNumberOptions = WatchOptions & {
	defaultValue?: number | null;
	min?: number;
	max?: number;
};

export function watchValidator<T>(
	component: Generic.Element.Component,
	propName: string,
	validationFunction: (value?: T) => boolean,
	requiredGeneric: Set<string | null | undefined>,
	value?: T,
	options: WatchOptions = {},
): void {
	if (validationFunction(value)) {
		/**
		 * Triff zu, wenn der Wert VALIDE ist.
		 */
		setState(component, propName, value, options.hooks);
	} else if (value === undefined && options.required !== true && validationFunction(options.defaultValue as T)) {
		/**
		 * Triff zu, wenn der Wert entweder ...
		 * - UNDEFINED oder NULL
		 * - und NICHT REQUIRED
		 * ... ist.
		 */
		setState(component, propName, options.defaultValue, options.hooks);
	} else {
		/**
		 * Triff zu, wenn der Wert NICHT valide ist.
		 */
		if (!options.required) {
			requiredGeneric.add(null);
		}
		logWarn(component, propName, value, requiredGeneric);
	}
}

export const watchBoolean = (component: Generic.Element.Component, propName: string, value?: boolean, options?: WatchBooleanOptions): void => {
	watchValidator(component, propName, (value): boolean => typeof value === 'boolean', new Set(['Boolean {true, false}']), value, options);
};

export const watchString = (component: Generic.Element.Component, propName: string, value?: string, options: WatchStringOptions = {}): void => {
	const minLength = typeof options.minLength === 'number' ? options?.minLength : 0;
	watchValidator(
		component,
		propName,
		(value): boolean =>
			typeof value === 'string' && value.length >= minLength && (typeof options?.maxLength === 'undefined' || value.length <= options.maxLength),
		new Set([`String`]),
		value,
		options,
	);
};

export const watchNumber = (component: Generic.Element.Component, propName: string, value?: number, options?: WatchNumberOptions): void => {
	watchValidator(
		component,
		propName,
		(value): boolean =>
			typeof value === 'number' &&
			(typeof options?.min === 'undefined' || (typeof options?.min === 'number' && value >= options.min)) &&
			(typeof options?.max === 'undefined' || (typeof options?.max === 'number' && value <= options.max)),
		new Set(['Number']),
		value,
		options,
	);
};

export const watchJsonArrayString = <T>(
	component: Generic.Element.Component,
	propName: string,
	itemValidation: (item: T) => boolean,
	value?: Stringified<T[]>,
	arrayValidation: (items: T[]) => boolean = (items: T[]) => items === items, // nochmal hirnen
	options: WatchOptions = {},
): void => {
	emptyStringByArrayHandler(value, () => {
		objectObjectHandler(value, () => {
			if (typeof value === 'undefined') {
				value = [];
			}
			try {
				try {
					value = parseJson<T[]>(value);
					// eslint-disable-next-line no-empty
				} catch (e) {
					// value behält den ursprünglichen Wert
				}
				if (Array.isArray(value)) {
					const invalid = value.find((item: T) => !itemValidation(item));
					if (invalid === undefined && arrayValidation(value)) {
						setState(component, propName, value, options.hooks);
					} else {
						objectObjectHandler(invalid, () => {
							Log.debug(invalid);
							throw new Error(`↑ Das Schema für das Property (_options) ist nicht valide. Der Wert wird nicht geändert.`);
						});
					}
				} else {
					objectObjectHandler(value, () => {
						Log.debug(value);
						throw new Error(`↑ Das Schema für das Property (_options) ist nicht valide. Der Wert wird nicht geändert.`);
					});
				}
			} catch (error) {
				/**
				 * TODO: Wir haben einen Known-Bug beim Propergieren von Zeichenkettenliste (string[]).
				 */
				Log.debug(error);
				// devHint(`Known bug: String array (string[])`);
			}
		});
	});
};

const BOOLEAN = /^(true|false)$/;
const INTEGER = /^-?(0|[1-9]\d*)$/;
const FLOAT = /^-?(0.|[1-9]\d*.)\d*[1-9]$/;
export const mapString2Unknown = (value: StencilUnknown) => {
	const typeStr = typeof value;
	const oldValue = `${value as string}`;
	if (typeof value === 'string') {
		if (BOOLEAN.test(value)) {
			value = value === 'true';
		} else if (INTEGER.test(value)) {
			value = parseInt(value);
		} else if (FLOAT.test(value)) {
			value = parseFloat(value);
		} else if (JSON_CHARS.test(value)) {
			try {
				value = parseJson<StencilUnknown>(value);
				// eslint-disable-next-line no-empty
			} catch (e) {
				// value behält den ursprünglichen Wert
			}
		}
	}
	if (typeStr !== typeof value) {
		devHint(`You have used a stringified property value (${oldValue} to ${JSON.stringify(value)}) which type switched from ${typeStr} to ${typeof value}!`);
	}
	return value;
};

export const stringifyJson = (value: unknown): string => {
	try {
		return JSON.stringify(value).replace(/"/g, "'");
	} catch (error) {
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
		} catch (error) {
			if (JSON_CHARS.test(value)) {
				try {
					return JSON.parse(value.replace(/'/g, '"'));
				} catch (error) {
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

export const koliBriQuerySelector = <T extends Element>(selector: string, node?: Document | HTMLElement | ShadowRoot): T | null =>
	querySelector<T>(selector, node || getDocument());

export const koliBriQuerySelectorAll = <T extends Element>(selector: string, node?: Document | HTMLElement | ShadowRoot): T[] =>
	querySelectorAll<T>(selector, node || getDocument());

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
