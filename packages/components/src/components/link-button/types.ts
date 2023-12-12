import { Generic } from 'adopted-style-sheets';

import { PropAlternativeButtonLinkRole } from '../../types/props/alternative-button-link-role';
import { OptionalProps as LinkOptionalProps, RequiredProps as LinkRequiredProps } from '../link/types';

type RequiredProps = LinkRequiredProps;
type OptionalProps = Omit<LinkOptionalProps, keyof PropAlternativeButtonLinkRole>; // _role is fixed to "button"

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
