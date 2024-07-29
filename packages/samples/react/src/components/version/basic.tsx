import React from 'react';
import { KolVersion } from '@public-ui/react';

import { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const VersionBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolVersion renders a label showing the given version number.</p>
		</SampleDescription>

		<KolVersion _label="1.1.1" />
	</>
);
