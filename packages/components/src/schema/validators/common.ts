export const isDefined = <T>(value: T | undefined | null): value is T => value !== undefined && value !== null;

export const isString = (value: unknown, options?: { min?: number; max?: number }): value is string => {
	if (typeof value !== 'string') {
		return false;
	}
	if (options) {
		const { min, max } = options;
		if (typeof min === 'number' && value.length < min) {
			return false;
		}
		if (typeof max === 'number' && value.length > max) {
			return false;
		}
	}
	return true;
};

export const isNumber = (value: unknown, options?: { min?: number; max?: number }): value is number => {
	if (typeof value !== 'number') {
		return false;
	}
	if (options) {
		const { min, max } = options;
		if (typeof min === 'number' && value < min) {
			return false;
		}
		if (typeof max === 'number' && value > max) {
			return false;
		}
	}
	return true;
};

export const isObject = (value: unknown): boolean => typeof value === 'object' && value !== null;

export const isStyle = (style?: Record<string, string>): boolean => {
	if (isObject(style)) {
		for (const property in style) {
			if (!isString(property, { min: 1 })) {
				return false;
			}
		}
	} else {
		return isString(style, { min: 1 });
	}
	return true;
};

/**
 * Fix event instance for state changes.
 */
export const STATE_CHANGE_EVENT = new Event('StateChange');
