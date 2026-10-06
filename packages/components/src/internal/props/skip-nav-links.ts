import type { LinkProps, Stringified } from '../../schema';
import type { Prop } from './helpers/factory';
import { createLinksPropDefinition } from './helpers/links';

export type SkipNavLinksProp = Prop<'links', Stringified<LinkProps[]>, LinkProps[]>;

export const skipNavLinksProp = createLinksPropDefinition<LinkProps>('KolSkipNav');
