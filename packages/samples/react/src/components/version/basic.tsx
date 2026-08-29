import React from 'react';

import { KolVersion } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';
export const VersionBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolVersion renders a label showing the given version number.</p>
		</SampleDescription>

		<SampleBlock id="basic" fitContent>
			<KolVersion _label="1.1.1" />
		</SampleBlock>
	</>
);
