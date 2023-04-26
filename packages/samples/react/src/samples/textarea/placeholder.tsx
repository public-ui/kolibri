import React from 'react';
import { KolTextarea } from '@public-ui/react';

import { FC } from 'react';

export const TextareaPlaceholder: FC = () => (
	<KolTextarea _id="text" _placeholder="Hier steht ein Platzhaltertext">
		Texteingabe
	</KolTextarea>
);
