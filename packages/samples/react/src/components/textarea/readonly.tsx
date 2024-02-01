import React from 'react';

import { KolForm, KolTextarea } from '@public-ui/react';

import type { FC } from 'react';

export const TextareaReadOnly: FC = () => (
	<KolForm>
		<KolTextarea _error="Es ist ein Fehler aufgetreten." _readOnly _value="Kleiner Text im Eingabefeld ..." _label="Texteingabe" />
	</KolForm>
);
