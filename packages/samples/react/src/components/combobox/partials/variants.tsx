import type { Components } from '@public-ui/components';
import React from 'react';

import { SampleColumns } from '../../SampleColumns';
import { SampleGroup } from '../../SampleGroup';
import { ComboboxCases } from './cases';

export const ComboboxVariants = (props: Partial<Components.KolCombobox>) => {
	return (
		<SampleColumns>
			<SampleGroup heading="Text">
				<ComboboxCases blockIdPrefix="label" {...props} />
			</SampleGroup>
			<SampleGroup heading="Text (hideLabel)">
				<ComboboxCases blockIdPrefix="hide-label" snapshotOnly="error" {...props} _hideLabel />
			</SampleGroup>
		</SampleColumns>
	);
};
