import type { LinkProps } from '../schema/index';
import { createLinksPropDefinition } from './helpers/links';

export const skipNavLinksProp = createLinksPropDefinition<LinkProps>('KolSkipNav');
