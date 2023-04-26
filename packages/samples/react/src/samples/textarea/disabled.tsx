import React from 'react';
import { KolTextarea } from '@public-ui/react';

import { FC } from 'react';

export const TextareaDisabled: FC = () => (
	<KolTextarea _disabled _error="Es ist ein Fehler aufgetreten." _id="text" _value="Kleiner Text im Eingabefeld ...">
		Texteingabe
	</KolTextarea>
);
