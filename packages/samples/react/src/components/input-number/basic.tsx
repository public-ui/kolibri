import type { FC } from 'react';
import React from 'react';

import { SampleDescription } from '../SampleDescription';
import { KolInputNumber } from '@public-ui/react';
import { ERROR_MSG } from '../../shares/constants';

export const InputNumberBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				KolInputNumber encompasses basic functionalities, utilizing the min, max, and step attributes to restrict the range of input values. Despite these
				constraints, it allows free input that can ignore the defined minimum and maximum values, as well as step sizes. The component intentionally does not
				emphasize validation rules, supporting examples without form validation, and refrains from additional validation through native HTML element validation.
			</p>
		</SampleDescription>
		<div className="grid gap-4">
			<div className="black-background">
				<KolInputNumber _required _touched _value={123} _label="Number input (Black background test)" />{' '}
			</div>
			<KolInputNumber
				_required
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_touched
				_placeholder="Mit Icons"
				_label="Number input"
				_icons={{ left: { icon: 'codicon codicon-arrow-left' }, right: { icon: 'codicon codicon-arrow-right' } }}
			/>
			<KolInputNumber _required _msg={{ _type: 'error', _description: ERROR_MSG }} _touched _value={123} _label="Number input" />
			<KolInputNumber _required _msg={{ _type: 'warning', _description: ERROR_MSG }} _touched _value={123} _label="Number input" />
			<KolInputNumber _required _msg={{ _type: 'info', _description: ERROR_MSG }} _touched _value={123} _label="Number input" />
			<KolInputNumber _required _msg={{ _type: 'success', _description: ERROR_MSG }} _touched _value={123} _label="Number input" />
			<KolInputNumber _accessKey="Z" _max={10} _min={-10} _step={2} _label="Number input (-10 to 10 in steps of 2)" />
			<KolInputNumber _readOnly _label="Number input (Readonly)" />
			<KolInputNumber _disabled _label="Number input (Disabled)" />
			<KolInputNumber _label="With access key" _accessKey="c" />
			<KolInputNumber _label="With short key" _shortKey="s" />
		</div>
	</>
);
