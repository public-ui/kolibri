import React from 'react';
import { KolInputText } from '@public-ui/react';

import { FC } from 'react';

import { ERROR_MSG, HINT_MSG } from '../../shares/constants';

export const InputTextBasic: FC = () => (
	<div className="grid gap-4">
		<KolInputText
			_id=""
			_hint={HINT_MSG}
			_error={ERROR_MSG}
			_placeholder="Mit Icons"
			_icon={{
				left: 'codicon codicon-arrow-left',
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
			_hideLabel
			_required
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
			_type="search"
		>
			Suche
		</KolInputText>
		<KolInputText
			_id=""
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
			_hideLabel
			_touched
			_type="search"
		>
			Suche
		</KolInputText>
		<KolInputText _id="" _placeholder="Placeholder" _required>
			Vorname (text)
		</KolInputText>
		<KolInputText _id="" _placeholder="Placeholder" _type="search">
			Suche (search)
		</KolInputText>
		<KolInputText _id="vorname" _placeholder="Placeholder" _error={ERROR_MSG} _touched _type="url">
			URL (url)
		</KolInputText>
		<KolInputText _id="" _placeholder="Placeholder" _type="tel">
			Telefon (tel)
		</KolInputText>
		<KolInputText _id="" _placeholder="Placeholder" _read-only>
			Vorname (text, readonly)
		</KolInputText>
		<KolInputText _id="" _value="Value" _read-only>
			Vorname (text, readonly)
		</KolInputText>
		<KolInputText _id="" _placeholder="Placeholder" _disabled>
			Vorname (text, disabled)
		</KolInputText>
		<KolInputText _id="" _value="Value" _disabled>
			Vorname (text, disabled)
		</KolInputText>
	</div>
);
