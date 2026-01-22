/*
 * Adapted from clsx (MIT License).
 * Source: https://github.com/lukeed/clsx/blob/master/src/index.js
 */
type ClassValue = string | number | boolean | null | undefined | ClassArray | ClassDictionary;
type ClassArray = ClassValue[];
type ClassDictionary = Record<string, boolean | null | undefined>;

const toVal = (mix: ClassValue): string => {
	let str = '';

	if (typeof mix === 'string' || typeof mix === 'number') {
		str += mix;
	} else if (typeof mix === 'object' && mix !== null) {
		if (Array.isArray(mix)) {
			for (const item of mix) {
				if (item) {
					const y = toVal(item);
					if (y) {
						str && (str += ' ');
						str += y;
					}
				}
			}
		} else {
			for (const key in mix) {
				if (mix[key]) {
					str && (str += ' ');
					str += key;
				}
			}
		}
	}

	return str;
};

const clsx = (...args: ClassValue[]): string => {
	let str = '';
	for (const arg of args) {
		if (arg) {
			const x = toVal(arg);
			if (x) {
				str && (str += ' ');
				str += x;
			}
		}
	}
	return str;
};

export default clsx;
