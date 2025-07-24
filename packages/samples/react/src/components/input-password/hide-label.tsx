import type { FC } from 'react';
import React from 'react';

import { KolInputPassword } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { ERROR_MSG, HINT_MSG } from '../../shares/constants';

export const InputPasswordHideLabel: FC = () => (
	<>
		<SampleDescription>
			<p>This sample demonstrates KolInputPassword with hidden labels.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<div className="black-background">
				<KolInputPassword _hideLabel _label="Passwort (Black background test)" />
			</div>
			<KolInputPassword
				_hideLabel
				_accessKey="P"
				_required
				_hint={HINT_MSG}
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_placeholder="Mit Icons"
				_label="Passwort"
				_icons={{ left: { icon: 'codicon codicon-arrow-left' }, right: { icon: 'codicon codicon-arrow-right' } }}
				_touched
			/>
			<KolInputPassword _hideLabel _placeholder="Placeholder" _msg={{ _type: 'info', _description: 'Just a hint' }} _label="Password" />
			<KolInputPassword _hideLabel _placeholder="Placeholder" _msg={{ _type: 'warning', _description: 'Small warning' }} _label="Password" />
			<KolInputPassword _hideLabel _placeholder="Placeholder" _msg={{ _type: 'success', _description: 'Success message' }} _label="Password" />
			<KolInputPassword _hideLabel _disabled _msg={{ _type: 'error', _description: ERROR_MSG }} _label="Passwort (Disabled)" _touched />
			<KolInputPassword _hideLabel _readOnly _label="Passwort (Readonly)" />
			<KolInputPassword _hideLabel _shortKey="c" _label="With access key" />
			<KolInputPassword _hideLabel _shortKey="s" _label="With short key" />
		</div>
	</>
);
