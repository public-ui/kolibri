import React, { useLayoutEffect, useRef } from 'react';
import { KolButton, KolForm, KolInputText } from '@public-ui/react';

import { FC } from 'react';

export const InputTextFocus: FC = () => {
	const ref = useRef<HTMLKolInputTextElement | null>(null);

	useLayoutEffect(() => {
		setTimeout(() => {
			ref.current?.focus();
		}, 500);
	}, [ref]);

	return (
		<KolForm className="grid gap-4">
			<KolInputText ref={ref} _label="Vorname" />
			<KolInputText _label="Nachname" />
			<div>
				<KolButton _label="Submit"></KolButton>
			</div>
		</KolForm>
	);
};
