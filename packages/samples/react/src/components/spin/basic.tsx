import React from 'react';

import { KolSpin } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const SpinBasic: FC = () => (
	<>
		<SampleDescription>
			<p>Hier ist eine drehende Animation in Deutschlandfarben.</p>
		</SampleDescription>
		<KolSpin _show />
	</>
);
