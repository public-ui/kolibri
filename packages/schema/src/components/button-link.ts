import type { Generic } from 'adopted-style-sheets';

import type { PropAlternativeButtonLinkRole } from '../props';
import type { OptionalButtonProps, OptionalButtonStates, RequiredButtonProps, RequiredButtonStates } from './button';

type RequiredProps = RequiredButtonProps;
type OptionalProps = Omit<OptionalButtonProps, keyof PropAlternativeButtonLinkRole>; // _role is fixed to "link"

export type ButtonLinkProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type ButtonLinkStates = Generic.Element.Members<RequiredButtonStates, OptionalButtonStates>;
