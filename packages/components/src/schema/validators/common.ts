export const isObject = (value: unknown): boolean => typeof value === 'object' && value !== null;

export const isString = (value: unknown, minLength = 0): boolean => typeof value === 'string' && value.length >= minLength;

export const isEqual = (left: unknown, right: unknown): boolean => {
	if (Object.is(left, right)) {
		return true;
	}

	if (typeof left !== typeof right) {
		return false;
	}

	if (left === null || right === null) {
		return false;
	}

	if (left instanceof Date && right instanceof Date) {
		return left.getTime() === right.getTime();
	}

	if (left instanceof RegExp && right instanceof RegExp) {
		return left.toString() === right.toString();
	}

	if (typeof left === 'object') {
		const leftArray = Array.isArray(left);
		const rightArray = Array.isArray(right);

		if (leftArray !== rightArray) {
			return false;
		}

		if (leftArray && rightArray) {
			const leftList = left as unknown[];
			const rightList = right as unknown[];

			if (leftList.length !== rightList.length) {
				return false;
			}

			for (let index = 0; index < leftList.length; index++) {
				if (!isEqual(leftList[index], rightList[index])) {
					return false;
				}
			}

			return true;
		}

		const leftObject = left as Record<string, unknown>;
		const rightObject = right as Record<string, unknown>;
		const leftKeys = Object.keys(leftObject);
		const rightKeys = Object.keys(rightObject);

		if (leftKeys.length !== rightKeys.length) {
			return false;
		}

		for (const key of leftKeys) {
			if (!Object.prototype.hasOwnProperty.call(rightObject, key)) {
				return false;
			}

			if (!isEqual(leftObject[key], rightObject[key])) {
				return false;
			}
		}

		return true;
	}

	return false;
};

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
