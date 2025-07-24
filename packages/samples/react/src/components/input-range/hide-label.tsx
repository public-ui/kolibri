import type { FC } from 'react';
import React from 'react';

import { KolInputRange } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { ERROR_MSG, HINT_MSG } from '../../shares/constants';

export const InputRangeHideLabel: FC = () => (
	<>
		<SampleDescription>
			<p>This sample demonstrates KolInputRange with hidden labels.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<div className="black-background">
				<KolInputRange
					_hideLabel
					_min={0}
					_max={50}
					_msg={{ _type: 'error', _description: ERROR_MSG }}
					_label="Slider (Black background test)"
					_icons={{ left: { icon: 'codicon codicon-arrow-left' }, right: { icon: 'codicon codicon-arrow-right' } }}
					_touched
				/>
			</div>
			<KolInputRange
				_hideLabel
				_accessKey="F"
				_min={0}
				_max={50}
				_step={10}
				_hint={HINT_MSG}
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_label="Slider with error"
				_touched
			/>
			<KolInputRange _hideLabel _msg={{ _type: 'info', _description: 'Just a hint' }} _label="Slider" />
			<KolInputRange _hideLabel _msg={{ _type: 'warning', _description: 'Small warning' }} _label="Slider" />
			<KolInputRange _hideLabel _msg={{ _type: 'success', _description: 'Success message' }} _label="Slider" />
			<KolInputRange _hideLabel _disabled _min={0} _max={50} _label="Slider (disabled)" />
			<KolInputRange _hideLabel _min={0} _max={50} _label="With access key" _accessKey="c" />
			<KolInputRange _hideLabel _min={0} _max={50} _label="With short key" _shortKey="s" />
		</div>
	</>
);
