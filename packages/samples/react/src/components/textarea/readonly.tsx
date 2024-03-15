import React from 'react';

import { KolForm, KolTextarea } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const TextareaReadOnly: FC = () => (
	<>
		<SampleDescription>
			<p>Hier ist ein Beispiel für ein Textfeld, in das nicht geschrieben werden kann.</p>
		</SampleDescription>
		<KolForm>
			<KolTextarea _msg={{ _type: 'error', _label: 'Es ist ein Fehler aufgetreten' }} _readOnly _value="Kleiner Text im Eingabefeld ..." _label="Texteingabe" />
		</KolForm>
	</>
);
