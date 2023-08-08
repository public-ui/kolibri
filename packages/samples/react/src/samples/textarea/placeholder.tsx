import React from 'react';
import { KolForm, KolTextarea } from '@public-ui/react';

import { FC } from 'react';

export const TextareaPlaceholder: FC = () => (
	<KolForm>
		<KolTextarea _id="text" _placeholder="Hier steht ein Platzhaltertext" _label="Texteingabe" />
	</KolForm>
);
