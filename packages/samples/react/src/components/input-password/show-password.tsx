import React, { FC, useEffect, useRef, useState } from 'react';
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
				<p>This sample shows KolInputPassword with a custom smartButton, implementing a &quot;toggle password&quot; button.</p>
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
			</KolForm>
		</>
	);
};
