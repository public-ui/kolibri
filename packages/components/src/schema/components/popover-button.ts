import type { PropInline, PropLabelWithExpertSlot, PropPopoverAlign } from '../props';
import type { Members } from '../types/members';
import type { OptionalButtonProps, RequiredButtonProps } from './button';

export type RequiredPopoverButtonProps = RequiredButtonProps;
export type OptionalPopoverButtonProps = OptionalButtonProps & PropPopoverAlign & PropInline;

export type RequiredPopoverButtonStates = PropLabelWithExpertSlot;
export type OptionalPopoverButtonStates = PropPopoverAlign & PropInline;

export type PopoverButtonProps = Members<RequiredPopoverButtonProps, OptionalPopoverButtonProps>;
export type PopoverButtonStates = Members<RequiredPopoverButtonStates, OptionalPopoverButtonStates>;
