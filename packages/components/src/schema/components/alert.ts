import type { Generic } from 'adopted-style-sheets';

import type { HeadingLevel, PropAlert, PropAlertType, PropAlertVariant, PropHasCloser, PropLabel } from '../props';
import type { EventCallback } from '../types';

export type KoliBriAlertEventCallbacks = {
	onClose?: EventCallback<Event>;
};

type RequiredAlertProps = NonNullable<unknown>;
type OptionalAlertProps = {
	level: HeadingLevel;
	on: KoliBriAlertEventCallbacks;
} & PropLabel &
	PropAlert &
	PropHasCloser &
	PropAlertType &
	PropAlertVariant;

export type AlertProps = Generic.Element.Members<RequiredAlertProps, OptionalAlertProps>;
