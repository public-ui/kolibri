import type { Components } from '@public-ui/components';
import React from 'react';

import { SampleColumns } from '../../SampleColumns';
import { ComboboxCases } from './cases';

export const ComboboxVariants = (props: Partial<Components.KolCombobox>) => {
	return (
		<SampleColumns>
			<fieldset data-visual-block="text">
				<legend>Text</legend>
				<ComboboxCases {...props} />
			</fieldset>
			<fieldset data-visual-block="text-hide-label">
				<legend>Text (hideLabel)</legend>
				<ComboboxCases {...props} _hideLabel />
			</fieldset>
		</SampleColumns>
	);
};
