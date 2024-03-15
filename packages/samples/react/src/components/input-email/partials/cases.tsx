import React, { forwardRef } from 'react';

import { KolInputEmail } from '@public-ui/react';

import { ERROR_MSG } from '../../../shares/constants';

import type { Components } from '@public-ui/components';
export const InputEmailCases = forwardRef<HTMLKolInputEmailElement, Components.KolInputEmail>(function InputEmailCases(props, ref) {
	return (
		<div className="grid gap-4">
			<KolInputEmail {...props} _required _value="test@mail.de" _msg={{ _type: 'error', _label: ERROR_MSG }} _label="E-Mail" />
			<KolInputEmail
				{...props}
				ref={ref}
				_accessKey="M"
				_placeholder="elke@mustermann.de"
				_suggestions="['test1@mail.de', 'test2@mail.de', 'test3@mail.de']"
				_label="E-Mail (Liste)"
				_msg={{ _type: 'error', _label: ERROR_MSG }}
				_touched
				_icons={{
					left: {
						icon: 'codicon codicon-arrow-left',
					},
					right: {
						icon: 'codicon codicon-arrow-right',
					},
				}}
			/>
			<KolInputEmail {...props} _disabled _value="test@mail.de" _label="E-Mail (Disabled)" />
			<KolInputEmail {...props} _readOnly _value="test@mail.de" _label="E-Mail (Readonly)" />
		</div>
	);
});
