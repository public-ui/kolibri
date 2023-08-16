import React from 'react';
import { KolForm, KolInputPassword } from '@public-ui/react';

import { FC } from 'react';

import { ERROR_MSG } from '../../shares/constants';

export const InputPasswordBasic: FC = () => (
	<KolForm className="grid gap-4">
		<KolInputPassword
			_id="password"
			_name="password"
			_required
			_error={ERROR_MSG}
			_placeholder="Mit Icons"
			_label="Passwort"
			_icon={{
				left: {
					icon: 'codicon codicon-arrow-left',
				},
				right: {
					icon: 'codicon codicon-arrow-right',
				},
			}}
			_smartButton={{
				_icon: {
					left: {
						icon: 'codicon codicon-eye',
					},
				},
				_hideLabel: true,
				_label: 'Passwort anzeigen',
				_on: {
					onClick: () => {},
				},
			}}
		/>
		<KolInputPassword _disabled _id="password" _error={ERROR_MSG} _label="Passwort (Disabled)" />
		<KolInputPassword _id="password" _read-only _label="Passwort (Readonly)" />
	</KolForm>
);
