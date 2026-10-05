import type { KolFocusOptions } from '../schema';
import { delegateClick as delegateClickImpl, setClick } from './element-click';
import { delegateFocus as delegateFocusImpl, setFocus } from './element-focus';

export type CtaRef<T extends HTMLElement = HTMLElement> = {
	(ref?: T): void;
	el?: T;
};

/**
 * Creates the ref that `focus()` and `click()` delegate to.
 *
 * @param isInactive - Optional predicate; while it returns `true`, `el` reads as `undefined` and
 *   the delegating decorators below resolve to a no-op. Components whose inner control cannot
 *   carry a native `disabled` attribute use this to keep a disabled element out of reach of the
 *   public `focus()`/`click()` methods, just as a native `disabled` control would be.
 */
export function createCtaRef<T extends HTMLElement = HTMLElement>(isInactive?: () => boolean): CtaRef<T> {
	let element: T | undefined;
	const ref = ((el?: T) => {
		element = el;
	}) as CtaRef<T>;
	Object.defineProperty(ref, 'el', {
		get: () => (isInactive?.() === true ? undefined : element),
		set: (el?: T) => {
			element = el;
		},
	});
	return ref;
}

/**
 * `mousedown` handler that keeps a control from taking focus on click or tap.
 *
 * Elements whose disabled state is only `aria-disabled` — an `<a>`, a `<summary>` — stay focusable:
 * `tabindex="-1"` takes them out of the tab order but not out of the click focus, and focus is the
 * default action of `mousedown`. A native `disabled` control refuses focus implicitly; these have
 * to refuse it here.
 */
export const preventFocus = (event: MouseEvent): void => event.preventDefault();

type MethodDecorator_ = (_target: object, _key: string, descriptor: PropertyDescriptor) => PropertyDescriptor;

function makeMethodDecorator(fn: (this_: Record<string, unknown>) => Promise<void>): MethodDecorator_ {
	return (_target, _key, descriptor) => {
		descriptor.value = async function (this: Record<string, unknown>) {
			return fn(this);
		};
		return descriptor;
	};
}

function makeFocusDecorator(fn: (this_: Record<string, unknown>, options?: KolFocusOptions) => Promise<void>): MethodDecorator_ {
	return (_target, _key, descriptor) => {
		descriptor.value = async function (this: Record<string, unknown>, options?: KolFocusOptions) {
			return fn(this, options);
		};
		return descriptor;
	};
}

/**
 * Method decorator for `focus()` on WC (non-shadow) components.
 * @param refPropName - Class property holding the focusable CtaRef
 */
export function directFocus(refPropName: string): MethodDecorator_ {
	return makeFocusDecorator((self, options) => {
		const element = (self[refPropName] as CtaRef | undefined)?.el;
		return element ? setFocus(element, options) : Promise.resolve();
	});
}

/**
 * Method decorator for `click()` on WC (non-shadow) components.
 * @param refPropName - Class property holding the clickable CtaRef
 */
export function directClick(refPropName: string): MethodDecorator_ {
	return makeMethodDecorator((self) => {
		const element = (self[refPropName] as CtaRef).el;
		return element ? setClick(element) : Promise.resolve();
	});
}

/**
 * Method decorator for `focus()` on shadow components.
 * Waits for theming before delegating focus to the ref element.
 * @param refPropName - Class property holding the focusable CtaRef
 */
export function delegateFocus(refPropName: string): MethodDecorator_ {
	return makeFocusDecorator((self, options) => {
		const host = self['host'] as HTMLElement | undefined;
		if (!host) return Promise.resolve();
		return delegateFocusImpl(host, () => {
			const element = (self[refPropName] as CtaRef | undefined)?.el;
			return element ? setFocus(element, options) : Promise.resolve();
		});
	});
}

/**
 * Method decorator for `focus()` that delegates to a controller's `focus` method.
 * Use this for components that own a controller with its own focus implementation.
 * @param ctrlPropName - Class property holding the controller
 */
export function ctrlFocus(ctrlPropName: string): MethodDecorator_ {
	return makeFocusDecorator(async (self, options) => {
		const ctrl = self[ctrlPropName] as { focus?: (options?: KolFocusOptions) => Promise<void> } | undefined;
		await ctrl?.focus?.(options);
	});
}

/**
 * Method decorator for `click()` on shadow components.
 * Waits for theming before delegating click to the ref element.
 * @param refPropName - Class property holding the clickable CtaRef
 */
export function delegateClick(refPropName: string): MethodDecorator_ {
	return makeMethodDecorator((self) =>
		delegateClickImpl(self['host'] as HTMLElement, () => {
			const element = (self[refPropName] as CtaRef).el;
			return element ? setClick(element) : Promise.resolve();
		}),
	);
}
