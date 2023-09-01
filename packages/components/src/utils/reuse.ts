import { isObject } from './validator';

export const propagateFocus = <H extends HTMLElement, R extends HTMLElement>(host?: H, ref?: R) => {
	if (isObject(host) && host) {
		host.focus = (ops: FocusOptions) => ref?.focus(ops);
	}
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
