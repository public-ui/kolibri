import React from 'react';

import { KolVersion } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';
export const VersionBasic: FC = () => (
	<>
		<SampleDescription>
			<p>Hier ist die Standarddarstellung der Versionsnummer.</p>
		</SampleDescription>
		<KolVersion _label="1.1.1" />
	</>
);
