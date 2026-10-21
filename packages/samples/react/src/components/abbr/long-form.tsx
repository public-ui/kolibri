import React from 'react';

import { KolAbbr } from '@public-ui/react-v19';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';
export const AbbrLongForm: FC = () => (
	<>
		<SampleDescription>
			<p>
				With <code>_label</code>, KolAbbr shows the long form of the abbreviation as a tooltip on hover and keyboard focus and announces it as the description
				of the abbreviation.
			</p>
		</SampleDescription>

		<SampleBlock id="long-form" fitContent>
			<span>
				I am <KolAbbr _abbr="e.g." _label="for example" /> an abbreviation with a long form.
			</span>
		</SampleBlock>
	</>
);
