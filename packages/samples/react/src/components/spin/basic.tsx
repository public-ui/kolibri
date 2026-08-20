import React from 'react';

import { KolSpin } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const SpinBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolSpin renders a loading indicator. This sample shows the default variant &quot;dot&quot;.</p>
		</SampleDescription>

		<SampleBlock id="basic">
			<KolSpin _show />
		</SampleBlock>
	</>
);
