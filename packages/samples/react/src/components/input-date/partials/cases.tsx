import React, { forwardRef } from 'react';

import { KolInputDate } from '@public-ui/react';

import { ERROR_MSG } from '../../../shares/constants';

import type { Components } from '@public-ui/components';
export const InputDateCases = forwardRef<HTMLKolInputDateElement, Components.KolInputDate>(function InputDateCases(props, ref) {
	return (
		<div className="grid gap-4">
			<KolInputDate {...props} _type="date" _label="Date input" _required />
			<KolInputDate {...props} _type="datetime-local" _label="Local-Datetime (Standard)" _required />
			<KolInputDate
				{...props}
				_step={1}
				_type="datetime-local"
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_label="Local datetime (with seconds)"
				_required
				_touched
			/>
			<KolInputDate {...props} _type="month" _label="Month" _required />
			<KolInputDate {...props} ref={ref} _accessKey="W" _type="week" _label="Week" _required />
			<KolInputDate {...props} _type="time" _label="Time (standard)" _required />
			<KolInputDate {...props} _step={1} _type="time" _label="Time (with seconds)" _required />
			<KolInputDate {...props} _readOnly _label="Date input (read-only)" _required />
			<KolInputDate {...props} _disabled _label="Date input (Disabled)" _required />
		</div>
	);
});
