import { isObject } from './validator';

export const propergateFocus = <H extends HTMLElement, R extends HTMLElement>(host?: H, ref?: R) => {
	if (isObject(host) && host) {
		host.focus = (ops: FocusOptions) => ref?.focus(ops);
	}
};

/**
 * If you need a tiny setTimeout with clearTimeout, you can
 * use this compact implementation.
 *
 * @param cb Callback with the code to run
 * @param delay Timeout delay
 */
// ts-prune-ignore-next
export const smartSetTimeout = (cb: () => void, delay?: number) => {
	const timeout = setTimeout(() => {
		clearTimeout(timeout);
		cb();
	}, delay);
};
