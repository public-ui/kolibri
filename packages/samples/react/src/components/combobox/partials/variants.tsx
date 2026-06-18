import type { Components } from '@public-ui/components';
import React from 'react';

import { SampleColumns } from '../../SampleColumns';
import { ComboboxCases } from './cases';

export const ComboboxVariants = (props: Partial<Components.KolCombobox>) => {
	return (
		<SampleColumns>
			<fieldset>
				<legend>Text</legend>
				<ComboboxCases {...props} accessKey="c" shortKey="s" />
			</fieldset>
			<fieldset>
				<legend>Text (hideLabel)</legend>
				<ComboboxCases {...props} _hideLabel accessKey="v" shortKey="x" />
			</fieldset>
		</SampleColumns>
	);
};
