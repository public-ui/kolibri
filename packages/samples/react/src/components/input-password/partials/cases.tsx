import React, { forwardRef } from 'react';

import { KolInputPassword } from '@public-ui/react';

import { Components } from '@public-ui/components';
import { ERROR_MSG } from '../../../shares/constants';

export const InputPasswordCases = forwardRef<HTMLKolInputPasswordElement, Components.KolInputPassword>(function InputPasswordCases(props, ref) {
	return (
		<div className="grid gap-4">
			<KolInputPassword {...props} _disabled _error={ERROR_MSG} _label="Passwort (Disabled)" />
			<KolInputPassword {...props} _readOnly _label="Passwort (Readonly)" />
			<KolInputPassword
				{...props}
				ref={ref}
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
				_touched
			/>
		</div>
	);
});
