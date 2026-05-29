import type { FocusFunctionOptions } from '../schema';
import { delegateClick as delegateClickImpl, setClick } from './element-click';
import { delegateFocus as delegateFocusImpl, setFocus } from './element-focus';

export type CtaRef<T extends HTMLElement = HTMLElement> = {
	(ref?: T): void;
	el?: T;
};

export function createCtaRef<T extends HTMLElement = HTMLElement>(): CtaRef<T> {
	const ref = ((el?: T) => {
		ref.el = el;
	}) as CtaRef<T>;
	ref.el = undefined;
	return ref;
}

type MethodDecorator_ = (_target: object, _key: string, descriptor: PropertyDescriptor) => PropertyDescriptor;

function makeMethodDecorator(fn: (this_: Record<string, unknown>) => Promise<void>): MethodDecorator_ {
	return (_target, _key, descriptor) => {
		descriptor.value = async function (this: Record<string, unknown>) {
			return fn(this);
		};
		return descriptor;
	};
}

function makeFocusDecorator(fn: (this_: Record<string, unknown>, options?: FocusFunctionOptions) => Promise<void>): MethodDecorator_ {
	return (_target, _key, descriptor) => {
		descriptor.value = async function (this: Record<string, unknown>, options?: FocusFunctionOptions) {
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
		const element = (self[refPropName] as CtaRef).el;
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
	return makeFocusDecorator((self, options) =>
		delegateFocusImpl(self['host'] as HTMLElement, () => {
			const element = (self[refPropName] as CtaRef).el;
			return element ? setFocus(element, options) : Promise.resolve();
		}),
	);
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
