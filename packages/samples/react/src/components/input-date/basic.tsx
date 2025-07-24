import type { FC } from 'react';
import React from 'react';

import { KolInputDate } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { ERROR_MSG, HINT_MSG } from '../../shares/constants';

export const InputDateBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputDate renders all types of fields for date and time input. The sample shows KolInputDate in a form context with all variations and states.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<div className="black-background">
				<KolInputDate _type="date" _label="Date input (Black background test)" _required />
			</div>
			<KolInputDate _type="datetime-local" _label="Local-Datetime (Standard)" _required />
			<KolInputDate
				_step={1}
				_type="datetime-local"
				_hint={HINT_MSG}
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_label="Local datetime (with seconds)"
				_required
				_touched
			/>
			<KolInputDate _msg={{ _type: 'info', _description: 'Just a hint' }} _label="Color" />
			<KolInputDate _msg={{ _type: 'warning', _description: 'Small warning' }} _label="Color" />
			<KolInputDate _msg={{ _type: 'success', _description: 'Success message' }} _label="Color" />
			<KolInputDate _type="month" _label="Month" _required />
			<KolInputDate _accessKey="W" _type="week" _label="Week" _required />
			<KolInputDate _type="time" _label="Time (standard)" _required />
			<KolInputDate _step={1} _type="time" _label="Time (with seconds)" _required />
			<KolInputDate _readOnly _label="Date input (read-only)" _required />
			<KolInputDate _disabled _label="Date input (Disabled)" _required />
			<KolInputDate _label="With access key" _accessKey="s" />
			<KolInputDate _label="With short key" _shortKey="s" />
		</div>
	</>
);
