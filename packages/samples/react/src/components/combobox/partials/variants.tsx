import type { Components } from '@public-ui/components';
import React from 'react';

import { SampleBlock } from '../../SampleBlock';
import { SampleColumns } from '../../SampleColumns';
import { ComboboxCases } from './cases';

export const ComboboxVariants = (props: Partial<Components.KolCombobox>) => {
	return (
		<SampleColumns>
			<SampleBlock id="text" heading="Text">
				<ComboboxCases {...props} />
			</SampleBlock>
			<SampleBlock id="text-hide-label" heading="Text (hideLabel)">
				<ComboboxCases {...props} _hideLabel />
			</SampleBlock>
		</SampleColumns>
	);
};
