import { isObject } from './validator';

export const propagateFocus = <H extends HTMLElement, R extends HTMLElement>(host?: H, ref?: R) => {
	if (isObject(host) && host) {
		host.focus = (ops: FocusOptions) => ref?.focus(ops);
	}
};

type ProzessEnv = 'development' | 'production' | 'test';
export let processEnv: ProzessEnv = 'development';
try {
	processEnv = process.env.NODE_ENV as ProzessEnv;
} catch (e) {
	processEnv = 'production';
}
