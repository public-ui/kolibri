/*
 * Adapted from clsx (MIT License).
 * Source: https://github.com/lukeed/clsx/blob/master/src/lite.js
 */
type ClassDictionary = Record<string, boolean>;
type ClassValue = ClassDictionary | ClassValue[] | number | string | null | undefined | boolean;

const toVal = (mix: ClassValue): string => {
	if (typeof mix === 'string' || typeof mix === 'number') {
		return String(mix);
	}

	if (!mix || typeof mix !== 'object') {
		return '';
	}

	if (Array.isArray(mix)) {
		let str = '';
		for (const item of mix) {
			if (item) {
				const val = toVal(item);
				if (val) {
					if (str) {
						str += ' ';
					}
					str += val;
				}
			}
		}
		return str;
	}

	let str = '';
	for (const key of Object.keys(mix)) {
		if (mix[key]) {
			if (str) {
				str += ' ';
			}
			str += key;
		}
	}
	return str;
};

const clsx = (...args: ClassValue[]): string => {
	let str = '';
	for (const arg of args) {
		if (arg) {
			const val = toVal(arg);
			if (val) {
				if (str) {
					str += ' ';
				}
				str += val;
			}
		}
	}
	return str;
};

export default clsx;
