import type { FC } from 'react';
import React from 'react';

import { KolInputEmail } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { ERROR_MSG, HINT_MSG } from '../../shares/constants';

export const InputEmailHideLabel: FC = () => (
	<>
		<SampleDescription>
			<p>This sample demonstrates KolInputEmail with hidden labels.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<div className="black-background">
				<KolInputEmail _hideLabel _required _value="test@mail.de" _msg={{ _type: 'error', _description: ERROR_MSG }} _label="E-Mail (Black background test)" />
			</div>
			<KolInputEmail
				_hideLabel
				_accessKey="M"
				_placeholder="elke@mustermann.de"
				_suggestions="['test1@mail.de', 'test2@mail.de', 'test3@mail.de']"
				_label="E-Mail (list)"
				_hint={HINT_MSG}
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_touched
				_icons={{ left: { icon: 'codicon codicon-arrow-left' }, right: { icon: 'codicon codicon-arrow-right' } }}
			/>
			<KolInputEmail _hideLabel _msg={{ _type: 'info', _description: 'Just a hint' }} _label="E-Mail" />
			<KolInputEmail _hideLabel _msg={{ _type: 'warning', _description: 'Small warning' }} _label="E-Mail" />
			<KolInputEmail _hideLabel _msg={{ _type: 'success', _description: 'Success message' }} _label="E-Mail" />
			<KolInputEmail _hideLabel _disabled _value="test@mail.de" _label="E-Mail (Disabled)" />
			<KolInputEmail _hideLabel _readOnly _value="test@mail.de" _label="E-Mail (Readonly)" />
			<KolInputEmail _hideLabel _value="test@mail.de" _label="With access key" _accessKey="c" />
			<KolInputEmail _hideLabel _value="test@mail.de" _label="With short key" _shortKey="s" />
		</div>
	</>
);
