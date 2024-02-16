import React, { forwardRef } from 'react';

import { KolInputPassword } from '@public-ui/react';

import { ERROR_MSG } from '../../../shares/constants';

import type { Components } from '@public-ui/components';
export const InputPasswordCases = forwardRef<HTMLKolInputPasswordElement, Components.KolInputPassword>(function InputPasswordCases(props, ref) {
	return (
		<div className="grid gap-4">
			<KolInputPassword {...props} _disabled _error={ERROR_MSG} _label="Passwort (Disabled)" _touched />
			<KolInputPassword {...props} _readOnly _label="Passwort (Readonly)" />
			<KolInputPassword
				{...props}
				ref={ref}
				_accessKey="P"
				_required
				_error={ERROR_MSG}
				_placeholder="Mit Icons"
				_label="Passwort"
				_icons={{
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
