import React from 'react';

import { KolForm, KolTextarea } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const TextareaDisabled: FC = () => (
	<>
		<SampleDescription>
			<p>Hier ist ein Beispiel für ein deaktiviertes Textfeld.</p>
		</SampleDescription>
		<KolForm>
			<KolTextarea _disabled _error="Es ist ein Fehler aufgetreten." _value="Kleiner Text im Eingabefeld ..." _label="Texteingabe" />
		</KolForm>
	</>
);
