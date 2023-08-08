import { Generic } from '@a11y-ui/core';
import { OptionalProps as LinkOptionalProps, RequiredProps as LinkRequiredProps } from '../link/types';
import { PropAlternativeButtonLinkRole } from '../../types/props/alternative-button-link-role';

export type RequiredProps = LinkRequiredProps;
export type OptionalProps = Omit<LinkOptionalProps, keyof PropAlternativeButtonLinkRole>; // _role is fixed to "button"

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
