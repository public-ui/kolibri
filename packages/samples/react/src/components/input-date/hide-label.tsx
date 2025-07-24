import type { FC } from 'react';
import React from 'react';

import { KolInputDate } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { ERROR_MSG, HINT_MSG } from '../../shares/constants';

export const InputDateHideLabel: FC = () => (
	<>
		<SampleDescription>
			<p>This sample demonstrates KolInputDate with hidden labels.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<div className="black-background">
				<KolInputDate _hideLabel _type="date" _label="Date input (Black background test)" _required />
			</div>
			<KolInputDate _hideLabel _type="datetime-local" _label="Local-Datetime (Standard)" _required />
			<KolInputDate
				_hideLabel
				_step={1}
				_type="datetime-local"
				_hint={HINT_MSG}
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_label="Local datetime (with seconds)"
				_required
				_touched
			/>
			<KolInputDate _hideLabel _msg={{ _type: 'info', _description: 'Just a hint' }} _label="Color" />
			<KolInputDate _hideLabel _msg={{ _type: 'warning', _description: 'Small warning' }} _label="Color" />
			<KolInputDate _hideLabel _msg={{ _type: 'success', _description: 'Success message' }} _label="Color" />
			<KolInputDate _hideLabel _type="month" _label="Month" _required />
			<KolInputDate _hideLabel _accessKey="W" _type="week" _label="Week" _required />
			<KolInputDate _hideLabel _type="time" _label="Time (standard)" _required />
			<KolInputDate _hideLabel _step={1} _type="time" _label="Time (with seconds)" _required />
			<KolInputDate _hideLabel _readOnly _label="Date input (read-only)" _required />
			<KolInputDate _hideLabel _disabled _label="Date input (Disabled)" _required />
			<KolInputDate _hideLabel _label="With access key" _accessKey="s" />
			<KolInputDate _hideLabel _label="With short key" _shortKey="s" />
		</div>
	</>
);
