import { KolForm, KolInputText } from '@public-ui/react';
import React from 'react';

import { FC } from 'react';

export const InputTextBlur: FC = () => (
	<KolForm className="grid gap-4">
		<KolInputText
			_on={{
				onBlur: console.log,
			}}
			_type="search"
			_label="Suche"
		/>
	</KolForm>
);
