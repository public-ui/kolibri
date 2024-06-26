import type { FC } from 'react';
import React, { useRef } from 'react';

import { KolForm, KolInputPassword } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const InputPasswordShowPassword: FC = () => {
	const passwordRef = useRef<HTMLKolInputPasswordElement>(null);

	return (
		<>
			<SampleDescription>
				<p>
					Hier wird ein Passwort Eingabefeld angezeigt. Durch klicken auf den im Feld Rechts stehenden Button, kann zwischen verdecktem und angezeigtem Passwort
					gewechselt werden.
				</p>
			</SampleDescription>
			<KolForm>
				<KolInputPassword _placeholder="Mit 'Passwort anzeigen' Button" _label="Passwort" ref={passwordRef} className="block" _variant="visibility-toggle" />
				<KolInputPassword
					_placeholder="Mit 'Passwort anzeigen' Button und disabled"
					_label="Passwort"
					ref={passwordRef}
					className="block"
					_disabled
					_variant="visibility-toggle"
				/>
			</KolForm>
		</>
	);
};
