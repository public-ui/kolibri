import React from 'react';
import { KolInputEmail, KolForm } from '@public-ui/react';

import { FC } from 'react';

import { ERROR_MSG } from '../../shares/constants';

export const InputEmailBasic: FC = () => (
	<KolForm className="grid gap-4">
		<KolInputEmail _id="email" _required _value="test@mail.de" _error={ERROR_MSG} _label="E-Mail" />
		<KolInputEmail
			_id="email1"
			_name="email1"
			_placeholder="elke@mustermann.de"
			_list="['test1@mail.de', 'test2@mail.de', 'test3@mail.de']"
			_label="E-Mail (Liste)"
			_error={ERROR_MSG}
			_icon={{
				left: {
					icon: 'codicon codicon-arrow-left',
				},
				right: {
					icon: 'codicon codicon-arrow-right',
				},
			}}
		/>
		<KolInputEmail _disabled _id="email2" _value="test@mail.de" _label="E-Mail (Disabled)" />
		<KolInputEmail _id="email3" _read-only _value="test@mail.de" _label="E-Mail (Readonly)" />
	</KolForm>
);
