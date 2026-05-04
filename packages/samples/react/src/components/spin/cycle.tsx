import React from 'react';

import { KolSpin } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const SpinCycle: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows the KolSpin variant &quot;cycle&quot; and that you can change its color and size.</p>
		</SampleDescription>

		<KolSpin _show _variant="cycle" />
	</>
);
