/**
 * https://stackoverflow.com/questions/63116039/camelcase-to-kebab-case
 */
// export const kebabize = (str: string) => {
// 	return str
// 		.split('')
// 		.map((letter, idx) => {
// 			return letter.toUpperCase() === letter ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}` : letter;
// 		})
// 		.join('');
// };

export const reflectAttrs = (_props: Record<string, unknown>, _defaults: Record<string, unknown> = {}, _filter: string[] = []): string => '';
// export const reflectAttrs = (props: Record<string, unknown>, defaults: Record<string, unknown> = {}, filter: string[] = []): string => {
// 	props = mixMembers(defaults, props);
// 	const KEYS = Object.getOwnPropertyNames(props);
// 	let str = '';
// 	KEYS.forEach((key) => {
// 		if (filter.length === 0 || filter.includes(key)) {
// 			const value = props[key];
// 			if (typeof value == 'string' || typeof value === 'number' || value === true) {
// 				str += ` ${kebabize(key)}="${value === true ? '' : (props[key] as string)}"`;
// 			}
// 		}
// 	});
// 	return str;
// };
