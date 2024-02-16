import React from 'react';

import { KolSpin } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const SpinCycle: FC = () => (
	<>
		<SampleDescription>
			<p>Hier ist eine drehende Animation in verschiedenen Farben.</p>
		</SampleDescription>
		<KolSpin _show _variant="cycle" />
	</>
);
