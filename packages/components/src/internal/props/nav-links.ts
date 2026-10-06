import type { ButtonOrLinkOrTextWithChildrenProps, Stringified } from '../../schema';
import type { Prop } from './helpers/factory';
import { createLinksPropDefinition } from './helpers/links';

/** The entries of `kol-nav`: links, buttons or texts, each with optional children. The children are not validated. */
export type NavLinksProp = Prop<'links', Stringified<ButtonOrLinkOrTextWithChildrenProps[]>, ButtonOrLinkOrTextWithChildrenProps[]>;

export const navLinksProp = createLinksPropDefinition<ButtonOrLinkOrTextWithChildrenProps>('KolNav');
