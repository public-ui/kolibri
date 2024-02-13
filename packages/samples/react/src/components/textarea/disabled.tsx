import React from 'react';

import { KolForm, KolTextarea } from '@public-ui/react';

import type { FC } from 'react';

export const TextareaDisabled: FC = () => (
	<KolForm>
		<KolTextarea _disabled _error="Es ist ein Fehler aufgetreten." _value="Kleiner Text im Eingabefeld ..." _label="Texteingabe" />
	</KolForm>
);
