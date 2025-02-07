import React from 'react';

import { SingleSelectCases } from './cases';
import type { Components } from '@public-ui/components';
import { SampleColumns } from '../../SampleColumns';

export const SingleSelectVariants = (props: Components.KolSingleSelect) => {
	return (
		<SampleColumns>
			<fieldset>
				<legend>Text</legend>
				<SingleSelectCases {...props} />
			</fieldset>
			<fieldset>
				<legend>Text (hideLabel)</legend>
				<SingleSelectCases {...props} _hideLabel />
			</fieldset>
		</SampleColumns>
	);
};
