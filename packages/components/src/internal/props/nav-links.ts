import type { ButtonOrLinkOrTextWithChildrenProps } from '../../schema';
import type { LinksProp } from './helpers/links';
import { createLinksPropDefinition } from './helpers/links';

/** The entries of `kol-nav`: links, buttons or texts, each with optional children. The children are not validated. */
export type NavLinksProp = LinksProp<ButtonOrLinkOrTextWithChildrenProps>;

export const navLinksProp = createLinksPropDefinition<ButtonOrLinkOrTextWithChildrenProps>('KolNav');
