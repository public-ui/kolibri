import type { Generic } from 'adopted-style-sheets';
import type { OptionalButtonProps, RequiredButtonProps } from './button';
import type { PropLabelWithExpertSlot, PropPopoverAlign } from '../props';

export type RequiredPopoverButtonProps = RequiredButtonProps;
export type OptionalPopoverButtonProps = OptionalButtonProps & PropPopoverAlign;

export type RequiredPopoverButtonStates = PropLabelWithExpertSlot;
export type OptionalPopoverButtonStates = PropPopoverAlign;

export type PopoverButtonProps = Generic.Element.Members<RequiredPopoverButtonProps, OptionalPopoverButtonProps>;
export type PopoverButtonStates = Generic.Element.Members<RequiredPopoverButtonStates, OptionalPopoverButtonStates>;
