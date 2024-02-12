import React, { forwardRef } from 'react';

import { KolInputText } from '@public-ui/react';

import { Components } from '@public-ui/components';
import { ERROR_MSG, HINT_MSG } from '../../../shares/constants';

export const InputTextCases = forwardRef<HTMLKolInputTextElement, Components.KolInputText>(function InputTextCases(props, ref) {
	return (
		<div className="grid gap-4">
			<KolInputText
				{...props}
				_hint={HINT_MSG}
				_error={ERROR_MSG}
				_placeholder="Mit Icons"
				_icons={{
					left: null,
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
			/>
			<KolInputText {...props} _placeholder="Placeholder" _label="Suche (search)" _type="search" />
			<KolInputText {...props} _placeholder="Placeholder" _error={ERROR_MSG} _touched _type="url" _label="URL (url)" />
			<KolInputText {...props} _placeholder="Placeholder" _type="tel" _label="Telefon (tel)" />
			<KolInputText {...props} _placeholder="Placeholder" _readOnly _label="Vorname (text, readonly)" />
			<KolInputText {...props} _value="Value" _readOnly _label="Vorname (text, readonly)" />
			<KolInputText {...props} _placeholder="Placeholder" _disabled _label="Vorname (text, disabled)" />
			<KolInputText {...props} _value="Value" _disabled _label="Vorname (text, disabled)" />
		</div>
	);
});
