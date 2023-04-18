import { KolTextarea } from '@public-ui/react';
import React from 'react';

import { FC } from 'react';

export const TextareaRows: FC = () => (
	<KolTextarea _id="text" _rows={10}>
		Texteingabe
	</KolTextarea>
);
