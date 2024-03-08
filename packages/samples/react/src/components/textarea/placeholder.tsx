import React from 'react';

import { KolForm, KolTextarea } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const TextareaPlaceholder: FC = () => (
	<>
		<SampleDescription>
			<p>Hier ist ein Beispiel für ein Freitextfeld mit Platzhaltertext.</p>
		</SampleDescription>
		<KolForm>
			<KolTextarea _placeholder="Hier steht ein Platzhaltertext" _label="Texteingabe" />
		</KolForm>
	</>
);
