import type { Generic } from 'adopted-style-sheets';
import type { PropLabelWithExpertSlot, PropPopoverAlign, PropShow } from '../props';
import type { OptionalButtonProps, RequiredButtonProps } from './button';

export type RequiredPopoverButtonProps = RequiredButtonProps;
export type OptionalPopoverButtonProps = OptionalButtonProps & PropPopoverAlign & PropShow;

export type RequiredPopoverButtonStates = PropLabelWithExpertSlot;
export type OptionalPopoverButtonStates = PropPopoverAlign;

export type PopoverButtonProps = Generic.Element.Members<RequiredPopoverButtonProps, OptionalPopoverButtonProps>;
export type PopoverButtonStates = Generic.Element.Members<RequiredPopoverButtonStates, OptionalPopoverButtonStates>;
