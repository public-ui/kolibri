import React, { useLayoutEffect, useRef } from 'react';

import { KolButton, KolForm, KolInputText } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const InputTextFocus: FC = () => {
	const ref = useRef<HTMLKolInputTextElement | null>(null);

	useLayoutEffect(() => {
		setTimeout(() => {
			ref.current?.focus();
		}, 500);
	}, [ref]);

	return (
		<>
			<SampleDescription>
				<p>Hier sind zwei Freitexteingabefelder.</p>
			</SampleDescription>
			<KolForm>
				<div className="grid gap-4">
					<KolInputText ref={ref} _label="Vorname" />
					<KolInputText _label="Nachname" />
					<div>
						<KolButton _label="Submit"></KolButton>
					</div>
				</div>
			</KolForm>
		</>
	);
};
