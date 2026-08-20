import React from 'react';

import { KolSpin } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const SpinCycle: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows the KolSpin variant &quot;cycle&quot; and that you can change its color and size.</p>
		</SampleDescription>

		<SampleBlock id="cycle">
			<KolSpin _show _variant="cycle" />
		</SampleBlock>
	</>
);
