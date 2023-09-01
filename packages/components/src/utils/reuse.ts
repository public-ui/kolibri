import { isObject } from './validator';

export const propagateFocus = <H extends HTMLElement, R extends HTMLElement>(host?: H, ref?: R) => {
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

type ProzessEnv = 'development' | 'production' | 'test';
export let processEnv: ProzessEnv = 'development';
try {
	processEnv = process.env.NODE_ENV as ProzessEnv;
} catch (e) {
	processEnv = 'production';
}

/**
 * This function is used to handle the slot content by
 * moving a DOM element to a defined slot element.
 */
export const handleSlotContent = (hostRef: HTMLElement, slotRef: HTMLElement, slotName: string) => {
	if (hostRef && slotRef && typeof slotName === 'string') {
		const content = hostRef.querySelector(`[slot="${slotName}"]`);
		if (content) {
			slotRef.appendChild(content);
		}
	}
};
