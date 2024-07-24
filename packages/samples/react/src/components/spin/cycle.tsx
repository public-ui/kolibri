import React from 'react';
import { KolSpin } from '@public-ui/react';

import { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const SpinCycle: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows the KolSpin variant &quot;cycle&quot;.</p>
		</SampleDescription>

		<KolSpin _show _variant="cycle" />
	</>
);
