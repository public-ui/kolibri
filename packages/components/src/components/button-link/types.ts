import { Generic } from '@a11y-ui/core';

import { PropAlternativeButtonLinkRole } from '../../types/props/alternative-button-link-role';
import { OptionalButtonProps, OptionalButtonStates, RequiredButtonProps, RequiredButtonStates } from '../button/types';

type RequiredProps = RequiredButtonProps;
type OptionalProps = Omit<OptionalButtonProps, keyof PropAlternativeButtonLinkRole>; // _role is fixed to "link"

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
export type States = Generic.Element.Members<RequiredButtonStates, OptionalButtonStates>;
