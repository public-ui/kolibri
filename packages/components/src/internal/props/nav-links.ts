import type { ButtonOrLinkOrTextWithChildrenProps } from '../../schema';
import { createLinksPropDefinition } from './helpers/links';

export const navLinksProp = createLinksPropDefinition<ButtonOrLinkOrTextWithChildrenProps>('KolNav');
