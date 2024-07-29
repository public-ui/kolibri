import React from 'react';
import { KolSpin } from '@public-ui/react';

import { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const SpinBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolSpin renders a loading indicator. This sample shows the default variant &quot;dot&quot;.</p>
		</SampleDescription>

		<KolSpin _show />
	</>
);
