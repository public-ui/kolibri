import type { Generic } from 'adopted-style-sheets';

import type { PropInline } from '../props';
import type { OptionalButtonProps, RequiredButtonProps } from './button';

type RequiredProps = RequiredButtonProps;
type OptionalProps = OptionalButtonProps & PropInline;

export type ButtonLinkProps = Generic.Element.Members<RequiredProps, OptionalProps>;
