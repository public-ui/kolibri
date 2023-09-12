import React from 'react';
import { KolForm, KolTextarea } from '@public-ui/react';

import { FC } from 'react';
import { ERROR_MSG } from '../../shares/constants';

export const TextareaBasic: FC = () => (
	<KolForm>
		<KolTextarea _id="text" _error={ERROR_MSG} _label="Texteingabe" />
	</KolForm>
);
