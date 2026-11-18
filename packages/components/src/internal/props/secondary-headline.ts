import type { SecondaryHeadlinePropType } from '../../schema/props/secondary-headline';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type SecondaryHeadlineProp = SimpleProp<'secondaryHeadline', SecondaryHeadlinePropType>;
export const secondaryHeadlineProp = createPropDefinition<SecondaryHeadlineProp>('secondaryHeadline', '', normalizeString);
