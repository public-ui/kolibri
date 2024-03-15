import React, { forwardRef } from 'react';

import { KolInputDate } from '@public-ui/react';

import { ERROR_MSG } from '../../../shares/constants';

import type { Components } from '@public-ui/components';
export const InputDateCases = forwardRef<HTMLKolInputDateElement, Components.KolInputDate>(function InputDateCases(props, ref) {
	return (
		<div className="grid gap-4">
			<KolInputDate {...props} _type="date" _label="Datumseingabe" _required />
			<KolInputDate {...props} _type="datetime-local" _label="Local-Datetime (Standard)" _required />
			<KolInputDate
				{...props}
				_step={1}
				_type="datetime-local"
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_label="Local-Datetime (mit Sekunden)"
				_required
				_touched
			/>
			<KolInputDate {...props} _type="month" _label="Monat" _required />
			<KolInputDate {...props} ref={ref} _accessKey="W" _type="week" _label="Woche" _required />
			<KolInputDate {...props} _type="time" _label="Zeit (Standard)" _required />
			<KolInputDate {...props} _step={1} _type="time" _label="Zeit (mit Sekunden)" _required />
			<KolInputDate {...props} _readOnly _label="Datumseingabe (Readonly)" _required />
			<KolInputDate {...props} _disabled _label="Datumseingabe (Disabled)" _required />
		</div>
	);
});
