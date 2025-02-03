import React from 'react';

import { KolAbbr } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';
export const AbbrBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolAbbr shows an abbreviation and the full form in parentheses, if provided.</p>
		</SampleDescription>

		<p>
			I am <KolAbbr _label="as an example">e.g.</KolAbbr> an abbreviation.
		</p>

		<p>
			I am <KolAbbr>e.g.</KolAbbr> an abbreviation without label.
		</p>
	</>
);
