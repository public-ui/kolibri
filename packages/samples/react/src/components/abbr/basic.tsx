import React from 'react';

import { KolAbbr } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';
export const AbbrBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolAbbr shows an abbreviation.</p>
		</SampleDescription>

		<p data-visual-block="basic">
			I am <KolAbbr>e.g.</KolAbbr> an abbreviation.
		</p>
	</>
);
