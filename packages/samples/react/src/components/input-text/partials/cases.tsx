import React, { forwardRef } from 'react';

import { KolInputText } from '@public-ui/react';

import { ERROR_MSG, HINT_MSG } from '../../../shares/constants';

import type { Components } from '@public-ui/components';
export const InputTextCases = forwardRef<HTMLKolInputTextElement, Components.KolInputText>(function InputTextCases(props, ref) {
	return (
		<div className="grid gap-4">
			<KolInputText
				{...props}
				_hint={HINT_MSG}
				_msg={{ _type: 'error', _description: ERROR_MSG, _label: 'test überschrift' }}
				_placeholder="Mit Icons"
				_icons={{
					right: {
						icon: 'codicon codicon-arrow-right',
						style: {
							'font-size': '200%',
						},
					},
				}}
				_on={{
					onBlur: console.log,
					onChange: console.log,
					onClick: console.log,
					onFocus: console.log,
				}}
				_required
				_type="search"
				_touched
				_label="Vorname (text)"
				_accessKey="V"
				ref={ref}
			/>
			<KolInputText {...props} _placeholder="Placeholder" _msg={{ _type: 'info', _description: 'Nur ein Hinweis' }} _label="Suche (search)" _type="search" />
			<KolInputText {...props} _placeholder="Placeholder" _msg={{ _type: 'error', _description: ERROR_MSG }} _touched _type="url" _label="URL (url)" />
			<KolInputText {...props} _placeholder="Placeholder" _type="tel" _label="Telefon (tel)" _msg={{ _type: 'warning', _description: 'Kleine Warnung' }} />
			<KolInputText {...props} _placeholder="Placeholder" _type="tel" _label="Telefon (tel)" _msg={{ _type: 'success', _description: 'Erfolgsmeldung' }} />
			<KolInputText {...props} _placeholder="Placeholder" _label="Mit Counter" _hasCounter _maxLength={10} />
			<KolInputText {...props} _placeholder="Placeholder" _readOnly _label="Vorname (text, readonly)" />
			<KolInputText {...props} _value="Value" _readOnly _label="Vorname (text, readonly)" />
			<KolInputText {...props} _placeholder="Placeholder" _disabled _label="Vorname (text, disabled)" />
			<KolInputText {...props} _value="Value" _disabled _label="Vorname (text, disabled)" />
		</div>
	);
});
