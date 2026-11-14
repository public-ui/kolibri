import type { ButtonOrLinkOrTextWithChildrenProps } from '../schema/index';
import { createLinksPropDefinition } from './helpers/links';

export const navLinksProp = createLinksPropDefinition<ButtonOrLinkOrTextWithChildrenProps>('KolNav');
