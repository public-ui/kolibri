import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { KolButton, KolInputText } from '@public-ui/react';

import { FC } from 'react';

export const InputTextFocus: FC = () => {
	const ref = useRef<HTMLKolInputTextElement | null>(null);

	useLayoutEffect(() => {
		setTimeout(() => {
			ref.current?.focus();
		}, 100);
	}, [ref]);

	return (
		<div className="grid gap-4">
			<KolInputText ref={ref} _id="vorname">
				Vorname
			</KolInputText>
			<KolInputText>Nachname</KolInputText>
			<div>
				<KolButton _label="Submit"></KolButton>
			</div>
		</div>
	);
};
