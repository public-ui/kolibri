import type { LinkProps } from '../../schema';
import { createLinksPropDefinition } from './helpers/links';

export const skipNavLinksProp = createLinksPropDefinition<LinkProps>('KolSkipNav');
