/**
 * https://stackoverflow.com/questions/63116039/camelcase-to-kebab-case
 */
export const kebabize = (str: string) => {
	return str
		.split('')
		.map((letter, idx) => {
			return letter.toUpperCase() === letter ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}` : letter;
		})
		.join('');
};

export const reflectAttrs = (props: Record<string, unknown>): string => {
	const KEYS = Object.getOwnPropertyNames(props);
	let str = '';
	KEYS.forEach((key) => {
		const value = props[key];
		if ((typeof value == 'string' && value.length > 0) || typeof value === 'number' || value === true) {
			str += ` ${kebabize(key)}="${value === true ? '' : (props[key] as string)}"`;
		}
	});
	return str;
};
