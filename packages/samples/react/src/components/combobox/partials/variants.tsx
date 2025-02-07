import React from 'react';
import type { Components } from '@public-ui/components';

import { ComboboxCases } from './cases';
import { SampleColumns } from '../../SampleColumns';

export const ComboboxVariants = (props: Partial<Components.KolCombobox>) => {
	return (
		<SampleColumns>
			<fieldset>
				<legend>Text</legend>
				<ComboboxCases {...props} />
			</fieldset>
			<fieldset>
				<legend>Text (hideLabel)</legend>
				<ComboboxCases {...props} _hideLabel />
			</fieldset>
		</SampleColumns>
	);
};
