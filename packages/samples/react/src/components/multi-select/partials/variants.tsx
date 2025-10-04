import React from 'react';

import type { Components } from '@public-ui/components';

import { SampleColumns } from '../../SampleColumns';
import { MultiSelectCases } from './cases';

export const MultiSelectVariants = (props: Components.KolMultiSelect) => {
	return (
		<SampleColumns>
			<fieldset>
				<legend>Text</legend>
				<MultiSelectCases {...props} />
			</fieldset>
			<fieldset>
				<legend>Text (hideLabel)</legend>
				<MultiSelectCases {...props} _hideLabel />
			</fieldset>
		</SampleColumns>
	);
};
