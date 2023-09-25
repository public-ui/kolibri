import React from 'react';
import { KolForm, KolInputPassword } from '@public-ui/react';

import { FC } from 'react';

import { ERROR_MSG } from '../../shares/constants';

export const InputPasswordBasic: FC = () => (
	<KolForm>
		<div className="grid gap-4">
			<KolInputPassword _disabled _error={ERROR_MSG} _touched _label="Passwort (Disabled)" />
			<KolInputPassword _read-only _label="Passwort (Readonly)" />
			<KolInputPassword
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
			/>
		</div>
	</KolForm>
);
