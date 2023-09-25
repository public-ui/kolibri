import React, { forwardRef } from 'react';

import { KolInputEmail } from '@public-ui/react';

import { Components } from '@public-ui/components';
import { ERROR_MSG } from '../../../shares/constants';

export const InputEmailCases = forwardRef<HTMLKolInputEmailElement, Components.KolInputEmail>(function InputEmailCases(props, ref) {
	return (
		<div className="grid gap-4">
			<KolInputEmail {...props} _required _value="test@mail.de" _error={ERROR_MSG} _label="E-Mail" />
			<KolInputEmail
				{...props}
				ref={ref}
				_placeholder="elke@mustermann.de"
				_list="['test1@mail.de', 'test2@mail.de', 'test3@mail.de']"
				_label="E-Mail (Liste)"
				_error={ERROR_MSG}
				_icon={{
					left: 'codicon codicon-mail',
				}}
				_touched
			/>
			<KolInputEmail {...props} _disabled _value="test@mail.de" _label="E-Mail (Disabled)" />
			<KolInputEmail {...props} _readOnly _value="test@mail.de" _label="E-Mail (Readonly)" />
		</div>
	);
});
