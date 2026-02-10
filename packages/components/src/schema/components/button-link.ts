import type { Generic } from 'adopted-style-sheets';

import type { PropButtonVariant, PropInline, PropVariantClassName } from '../props';
import type { OptionalButtonProps, OptionalButtonStates, RequiredButtonProps, RequiredButtonStates } from './button';

type RequiredProps = RequiredButtonProps;
type OptionalProps = Omit<OptionalButtonProps, keyof PropButtonVariant> & PropVariantClassName & PropInline;

export type ButtonLinkProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type ButtonLinkStates = Generic.Element.Members<RequiredButtonStates, OptionalButtonStates>;
