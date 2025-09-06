export const isDefined = <T>(value: T | undefined | null): value is T => value !== undefined && value !== null;

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isNumber = (value: unknown): value is number => typeof value === 'number';

export const isObject = (value: unknown): boolean => typeof value === 'object' && value !== null;

export const isStyle = (style?: Record<string, string>): boolean => {
	if (isObject(style)) {
		for (const property in style) {
			if (!isString(property) || property.length < 1) {
				return false;
			}
		}
	} else {
		return isString(style) && style.length >= 1;
	}
	return true;
};

/**
 * Fix event instance for state changes.
 */
export const STATE_CHANGE_EVENT = new Event('StateChange');
