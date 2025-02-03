import React, { forwardRef } from 'react';
import { KolInputPassword } from '@public-ui/react';
import type { Components } from '@public-ui/components';

import { ERROR_MSG, HINT_MSG } from '../../../shares/constants';

export const InputPasswordCases = forwardRef<HTMLKolInputPasswordElement, Components.KolInputPassword>(function InputPasswordCases(props, ref) {
	return (
		<div className="grid gap-4">
			<div className="black-background">
				<KolInputPassword {...props} _label="Passwort (Black background test)" />
			</div>
			<KolInputPassword
				{...props}
				ref={ref}
				_accessKey="P"
				_required
				_hint={HINT_MSG}
				_msg={{ _type: 'error', _description: ERROR_MSG }}
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
			<KolInputPassword {...props} _placeholder="Placeholder" _msg={{ _type: 'info', _description: 'Just a hint' }} _label="Password" />
			<KolInputPassword {...props} _placeholder="Placeholder" _msg={{ _type: 'warning', _description: 'Small warning' }} _label="Password" />
			<KolInputPassword {...props} _placeholder="Placeholder" _msg={{ _type: 'success', _description: 'Success message' }} _label="Password" />
			<KolInputPassword {...props} _disabled _msg={{ _type: 'error', _description: ERROR_MSG }} _label="Passwort (Disabled)" _touched />
			<KolInputPassword {...props} _readOnly _label="Passwort (Readonly)" />
			<KolInputPassword {...props} ref={ref} _shortKey="c" _label="With access key" />
			<KolInputPassword {...props} ref={ref} _shortKey="s" _label="With short key" />
		</div>
	);
});
