import React from 'react';

import { KolSpin } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const SpinVariables: FC = () => (
	<>
		<SampleDescription>
			<p>You can change the color and size of the spinners with CSS properties.</p>
		</SampleDescription>

		<KolSpin _show style={{ '--kol-spin-color': 'green', '--kol-spin-size': '80' }} />
	</>
);
