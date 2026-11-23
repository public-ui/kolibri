import type { ComponentPropsOptional } from '../../internal/functional-components/generic-types';
import type { HeadingLevel, PropAlert, PropAlertType, PropAlertVariant, PropHasCloser, PropLabelLangSegments } from '../props';
import type { EventCallback } from '../types';

export type KoliBriAlertEventCallbacks = {
	onClose?: EventCallback<Event>;
};

type OptionalAlertProps = {
	level: HeadingLevel;
	on: KoliBriAlertEventCallbacks;
} & PropLabelLangSegments &
	PropAlert &
	PropHasCloser &
	PropAlertType &
	PropAlertVariant;

export type AlertProps = ComponentPropsOptional<OptionalAlertProps>;
