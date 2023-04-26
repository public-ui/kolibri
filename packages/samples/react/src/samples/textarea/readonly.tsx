import React from 'react';
import { KolTextarea } from '@public-ui/react';

import { FC } from 'react';

export const TextareaReadOnly: FC = () => (
	<KolTextarea _error="Es ist ein Fehler aufgetreten." _id="text" _readOnly _value="Kleiner Text im Eingabefeld ...">
		Texteingabe
	</KolTextarea>
);
