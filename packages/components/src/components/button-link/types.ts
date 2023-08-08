import { Generic } from '@a11y-ui/core';
import { OptionalButtonProps, RequiredButtonProps, OptionalButtonStates, RequiredButtonStates } from '../button/types';
import { PropAlternativeButtonLinkRole } from '../../types/props/alternative-button-link-role';

export type RequiredProps = RequiredButtonProps;
export type OptionalProps = Omit<OptionalButtonProps, keyof PropAlternativeButtonLinkRole>; // _role is fixed to "link"

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
export type States = Generic.Element.Members<RequiredButtonStates, OptionalButtonStates>;
