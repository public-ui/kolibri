import type { Generic } from 'adopted-style-sheets';
import type { PropInline, PropPopoverAlign } from '../props';
import type { OptionalButtonProps, RequiredButtonProps } from './button';

type RequiredPopoverButtonProps = RequiredButtonProps;
type OptionalPopoverButtonProps = OptionalButtonProps & PropPopoverAlign & PropInline;

export type PopoverButtonProps = Generic.Element.Members<RequiredPopoverButtonProps, OptionalPopoverButtonProps>;
