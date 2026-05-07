import type { LinkOnCallbacksPropType } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

export type LinkCallbacksProp = SimpleProp<'on', LinkOnCallbacksPropType>;
export const linkCallbacksProp = createPropDefinition<LinkCallbacksProp>('on', {}, (value) => {
	if (value === undefined || value === null) return {};
	if (typeof value === 'object') {
		return value as LinkOnCallbacksPropType;
	}
	throw new Error('Invalid link callbacks');
});
