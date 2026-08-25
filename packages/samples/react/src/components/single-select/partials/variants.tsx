import React from 'react';

import type { Components } from '@public-ui/components';
import { SampleColumns } from '../../SampleColumns';
import { SampleGroup } from '../../SampleGroup';
import { SingleSelectCases } from './cases';

export const SingleSelectVariants = (props: Components.KolSingleSelect) => {
	return (
		<SampleColumns>
			<SampleGroup heading="Text">
				<SingleSelectCases blockIdPrefix="label" {...props} />
			</SampleGroup>
			<SampleGroup heading="Text (hideLabel)">
				<SingleSelectCases blockIdPrefix="hide-label" snapshotOnly="error" {...props} _hideLabel />
			</SampleGroup>
		</SampleColumns>
	);
};
