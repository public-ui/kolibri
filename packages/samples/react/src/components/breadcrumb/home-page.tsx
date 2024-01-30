import { KolButton } from '@public-ui/react';
import React from 'react';

import { FC } from 'react';

export const HomePage: FC = () => (
	<KolButton
		_label="Go Back"
		_on={{
			onClick: () => {
				history.back();
			},
		}}
	/>
);
