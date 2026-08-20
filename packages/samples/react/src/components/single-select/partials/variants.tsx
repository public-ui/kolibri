import React from 'react';

import type { Components } from '@public-ui/components';
import { SampleColumns } from '../../SampleColumns';
import { SingleSelectCases } from './cases';

export const SingleSelectVariants = (props: Components.KolSingleSelect) => {
	return (
		<SampleColumns>
			<fieldset data-visual-block="text">
				<legend>Text</legend>
				<SingleSelectCases {...props} />
			</fieldset>
			<fieldset data-visual-block="text-hide-label">
				<legend>Text (hideLabel)</legend>
				<SingleSelectCases {...props} _hideLabel />
			</fieldset>
		</SampleColumns>
	);
};
