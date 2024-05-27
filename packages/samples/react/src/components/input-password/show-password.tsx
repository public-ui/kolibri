import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import { KolForm, KolInputPassword } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const InputPasswordShowPassword: FC = () => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const passwordRef = useRef<HTMLKolInputPasswordElement>(null);
	const handleTogglePasswordClick = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};
	useEffect(() => {
		const input = passwordRef.current?.shadowRoot?.querySelector('input');
		if (input) {
			input.type = isPasswordVisible ? 'text' : 'password';
		}
	}, [isPasswordVisible]);

	return (
		<>
			<SampleDescription>
				<p>
					Hier wird ein Passwort Eingabefeld angezeigt. Durch klicken auf den im Feld Rechts stehenden Button, kann zwischen verdecktem und angezeigtem Passwort
					gewechselt werden.
				</p>
			</SampleDescription>
			<KolForm>
				<KolInputPassword
					_placeholder="Mit 'Passwort anzeigen' Button"
					_label="Passwort"
					ref={passwordRef}
					_smartButton={{
						_icons: {
							left: {
								icon: 'codicon codicon-eye',
							},
						},
						_hideLabel: true,
						_label: `Passwort ${isPasswordVisible ? 'ausblenden' : 'einblenden'}`,
						_on: {
							onClick: handleTogglePasswordClick,
						},
					}}
					className="block"
				/>
				<KolInputPassword
					_placeholder="Mit 'Passwort anzeigen' Button und disabled"
					_label="Passwort"
					ref={passwordRef}
					_smartButton={{
						_icons: {
							left: {
								icon: 'codicon codicon-eye',
							},
						},
						_hideLabel: true,
						_label: `Passwort ${isPasswordVisible ? 'ausblenden' : 'einblenden'}`,
						_on: {
							onClick: handleTogglePasswordClick,
						},
					}}
					className="block"
					_disabled
				/>
			</KolForm>
		</>
	);
};
