import React from 'react';

import { KolForm, KolTextarea } from '@public-ui/react';

import type { FC } from 'react';

export const TextareaPlaceholder: FC = () => (
	<KolForm>
		<KolTextarea _placeholder="Hier steht ein Platzhaltertext" _label="Texteingabe" />
	</KolForm>
);
