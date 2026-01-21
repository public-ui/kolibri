/*
 * Adapted from clsx (MIT License).
 * Source: https://github.com/lukeed/clsx/blob/master/src/lite.js
 */
type ClassValue = string | boolean | null | undefined;

const clsx = (...args: ClassValue[]): string => {
	let str = '';
	for (const arg of args) {
		if (arg && typeof arg === 'string') {
			str += (str && ' ') + arg;
		}
	}
	return str;
};

export default clsx;
