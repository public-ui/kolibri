import React from 'react';
import type { Components } from '@public-ui/components';

import { ComboboxCases } from './cases';

export const ComboboxVariants = (props: Partial<Components.KolCombobox>) => {
	return (
		<div className="grid md:grid-cols-2 gap-4">
			<fieldset>
				<legend>Text</legend>
				<ComboboxCases {...props} />
			</fieldset>
			<fieldset>
				<legend>Text (hideLabel)</legend>
				<ComboboxCases {...props} _hideLabel />
			</fieldset>
		</div>
	);
};
