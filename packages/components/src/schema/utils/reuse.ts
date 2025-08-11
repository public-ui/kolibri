const MODES = ['development', 'production', 'test'] as const;
export type Mode = (typeof MODES)[number];

export let runtimeMode: Mode = 'production';
try {
	runtimeMode = (process.env['NODE_ENV'] as Mode) || 'production';
} catch (e) {
	runtimeMode = 'production';
}

export const setRuntimeMode = (mode: Mode): void => {
	runtimeMode = mode;
};

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

/**
 * This function builds the BadgeText. It chooses access key over shortkey or empty string, if both are empty
 * @param accessKey
 * @param shortKey
 * @returns returns badgeText as string
 */
export const buildBadgeTextString = (accessKey?: string, shortKey?: string) => {
	return accessKey || shortKey || '';
};
