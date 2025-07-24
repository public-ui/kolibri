import type { FC } from 'react';
import React from 'react';

import { SampleDescription } from '../SampleDescription';
import { KolInputNumber } from '@public-ui/react';
import { ERROR_MSG } from '../../shares/constants';

export const InputNumberHideLabel: FC = () => (
	<>
		<SampleDescription>
			<p>This sample demonstrates KolInputNumber with hidden labels.</p>
		</SampleDescription>
		<div className="grid gap-4">
			<div className="black-background">
				<KolInputNumber _hideLabel _required _touched _value={123} _label="Number input (Black background test)" />{' '}
			</div>
			<KolInputNumber
				_hideLabel
				_required
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_touched
				_placeholder="Mit Icons"
				_label="Number input"
				_icons={{ left: { icon: 'codicon codicon-arrow-left' }, right: { icon: 'codicon codicon-arrow-right' } }}
			/>
			<KolInputNumber _hideLabel _required _msg={{ _type: 'error', _description: ERROR_MSG }} _touched _value={123} _label="Number input" />
			<KolInputNumber _hideLabel _required _msg={{ _type: 'warning', _description: ERROR_MSG }} _touched _value={123} _label="Number input" />
			<KolInputNumber _hideLabel _required _msg={{ _type: 'info', _description: ERROR_MSG }} _touched _value={123} _label="Number input" />
			<KolInputNumber _hideLabel _required _msg={{ _type: 'success', _description: ERROR_MSG }} _touched _value={123} _label="Number input" />
			<KolInputNumber _hideLabel _accessKey="Z" _max={10} _min={-10} _step={2} _label="Number input (-10 to 10 in steps of 2)" />
			<KolInputNumber _hideLabel _readOnly _label="Number input (Readonly)" />
			<KolInputNumber _hideLabel _disabled _label="Number input (Disabled)" />
			<KolInputNumber _hideLabel _label="With access key" _accessKey="c" />
			<KolInputNumber _hideLabel _label="With short key" _shortKey="s" />
		</div>
	</>
);
