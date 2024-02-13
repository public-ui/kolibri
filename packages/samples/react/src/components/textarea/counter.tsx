import type { FC } from 'react';
import React from 'react';

import { KolTextarea } from '@public-ui/react';

export const TextareaCounter: FC = () => (
	<KolTextarea _hasCounter={true} _label="Textara mit Counter und Hint und Fehler" _error={'oh no'} _hint={'Hinweis'} _touched />
);
