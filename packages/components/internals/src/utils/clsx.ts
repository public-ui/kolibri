/*
 * Adapted from clsx (MIT License).
 * Source: https://github.com/lukeed/clsx/blob/master/src/index.js
 *
 * MIT License
 *
 * Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
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
						if (str) {
							str += ' ';
						}
						str += y;
					}
				}
			}
		} else {
			for (const key in mix) {
				if (mix[key]) {
					if (str) {
						str += ' ';
					}
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
				if (str) {
					str += ' ';
				}
				str += x;
			}
		}
	}
	return str;
};

export default clsx;
