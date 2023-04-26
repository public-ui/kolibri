import React from 'react';
import { KolInputPassword } from '@public-ui/react';

import { FC } from 'react';

import { ERROR_MSG } from '../../shares/constants';

export const InputPasswordBasic: FC = () => (
	<div className="grid gap-4">
		<KolInputPassword
			_id="password"
			_name="password"
			_required
			_error={ERROR_MSG}
			_placeholder="Mit Icons"
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
				_iconOnly: true,
				_label: 'Passwort anzeigen',
				_on: {
					onClick: () => {},
				},
			}}
			_touched
		>
			Passwort
		</KolInputPassword>
		<KolInputPassword _disabled _id="password" _error={ERROR_MSG}>
			Passwort (Disabled)
		</KolInputPassword>
		<KolInputPassword _id="password" _read-only>
			Passwort (Readonly)
		</KolInputPassword>
	</div>
);
