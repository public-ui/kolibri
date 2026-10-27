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
