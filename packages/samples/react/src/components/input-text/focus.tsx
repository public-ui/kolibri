import React, { useLayoutEffect, useRef } from 'react';
import { KolButton, KolForm, KolInputText } from '@public-ui/react';

import { FC } from 'react';
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
				<p>This sample shows a KolInputText component that automatically receives focus.</p>
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
