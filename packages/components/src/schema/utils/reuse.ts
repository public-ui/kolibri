import { isObject } from '../validators';

export const propagateFocus = <H extends HTMLElement, R extends HTMLElement>(host?: H, ref?: R) => {
	if (isObject(host) && host) {
		host.focus = (ops: FocusOptions) => ref?.focus(ops);
	}
};

const PROCESS_ENVS = ['development', 'production', 'test'] as const;
type ProcessEnv = (typeof PROCESS_ENVS)[number];
export let processEnv: ProcessEnv = 'development';
try {
	processEnv = process.env.NODE_ENV as ProcessEnv;
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

/**
 * This function is used to check if a label is an empty string.
 * @param label The label of the slot
 * @returns  True if the label is an empty string
 */
export const showExpertSlot = (label: unknown) => label === '';
