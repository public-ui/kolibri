import type { LinkProps } from '../../schema';
import type { LinksProp } from './helpers/links';
import { createLinksPropDefinition } from './helpers/links';

export type SkipNavLinksProp = LinksProp<LinkProps>;

export const skipNavLinksProp = createLinksPropDefinition<LinkProps>('KolSkipNav');
