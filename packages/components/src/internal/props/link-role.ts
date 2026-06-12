import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

const LINK_ROLE_OPTIONS = ['tab', 'treeitem'] as const;

export type LinkRoleProp = SimpleProp<'role', string>;
export const linkRoleProp = createPropDefinition<LinkRoleProp>(
	'role',
	'',
	(value) => {
		const str = normalizeString(value);
		if (str === '' || (LINK_ROLE_OPTIONS as readonly string[]).includes(str)) {
			return str;
		}
		throw new Error(`Invalid role: ${str}`);
	},
	(v) => v === '' || (LINK_ROLE_OPTIONS as readonly string[]).includes(v),
);
