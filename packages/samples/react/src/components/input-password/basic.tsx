import type { FC } from 'react';
import React from 'react';

import { KolInputPassword } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { ERROR_MSG, HINT_MSG } from '../../shares/constants';

export const InputPasswordBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputPassword renders a password input field. The sample shows KolInputPassword in a form context with all variations and states.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<div className="black-background">
				<KolInputPassword _label="Passwort (Black background test)" />
			</div>
			<KolInputPassword
				_accessKey="P"
				_required
				_hint={HINT_MSG}
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_placeholder="Mit Icons"
				_label="Passwort"
				_icons={{ left: { icon: 'codicon codicon-arrow-left' }, right: { icon: 'codicon codicon-arrow-right' } }}
				_touched
			/>
			<KolInputPassword _placeholder="Placeholder" _msg={{ _type: 'info', _description: 'Just a hint' }} _label="Password" />
			<KolInputPassword _placeholder="Placeholder" _msg={{ _type: 'warning', _description: 'Small warning' }} _label="Password" />
			<KolInputPassword _placeholder="Placeholder" _msg={{ _type: 'success', _description: 'Success message' }} _label="Password" />
			<KolInputPassword _disabled _msg={{ _type: 'error', _description: ERROR_MSG }} _label="Passwort (Disabled)" _touched />
			<KolInputPassword _readOnly _label="Passwort (Readonly)" />
			<KolInputPassword _shortKey="c" _label="With access key" />
			<KolInputPassword _shortKey="s" _label="With short key" />
		</div>
	</>
);
