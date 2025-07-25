import React from 'react';
import { KolSpin } from '@public-ui/react';
import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const SpinLabel: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolSpin with a label.</p>
		</SampleDescription>

		<KolSpin _show _label="Loading data..." />
	</>
);
