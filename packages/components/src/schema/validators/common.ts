export const isObject = (value: unknown): boolean => typeof value === 'object' && value !== null;

export const isString = (value: unknown, minLength = 0): boolean => typeof value === 'string' && value.length >= minLength;

export const isStyle = (style?: Record<string, string>): boolean => {
	if (typeof style === 'object' && style !== null) {
		for (const property in style) {
			if (isString(property, 1) === false) {
				return false;
			}
		}
	} else {
		return isString(style, 1);
	}
	return true;
};

/**
 * Fix event instance for state changes.
 */
export const STATE_CHANGE_EVENT = new Event('StateChange');
