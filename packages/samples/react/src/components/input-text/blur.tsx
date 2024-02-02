import React from 'react';

import { KolForm, KolInputText } from '@public-ui/react';

import type { FC } from 'react';
export const InputTextBlur: FC = () => (
	<KolForm>
		<KolInputText
			_on={{
				onBlur: console.log,
			}}
			_type="search"
			_label="Suche"
		/>
	</KolForm>
);
