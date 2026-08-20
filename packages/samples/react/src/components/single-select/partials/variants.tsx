import React from 'react';

import type { Components } from '@public-ui/components';
import { SampleBlock } from '../../SampleBlock';
import { SampleColumns } from '../../SampleColumns';
import { SingleSelectCases } from './cases';

export const SingleSelectVariants = (props: Components.KolSingleSelect) => {
	return (
		<SampleColumns>
			<SampleBlock id="text" heading="Text">
				<SingleSelectCases {...props} />
			</SampleBlock>
			<SampleBlock id="text-hide-label" heading="Text (hideLabel)">
				<SingleSelectCases {...props} _hideLabel />
			</SampleBlock>
		</SampleColumns>
	);
};
