import type { ComponentPropsOptional, ComponentPropsRequired } from '../../internal/functional-components/generic-types';
import type { PropInline, PropPopoverAlign } from '../props';
import type { OptionalButtonProps, RequiredButtonProps } from './button';

export type RequiredPopoverButtonProps = RequiredButtonProps;
export type OptionalPopoverButtonProps = OptionalButtonProps & PropPopoverAlign & PropInline;

export type PopoverButtonProps = ComponentPropsRequired<RequiredPopoverButtonProps> & ComponentPropsOptional<OptionalPopoverButtonProps>;
