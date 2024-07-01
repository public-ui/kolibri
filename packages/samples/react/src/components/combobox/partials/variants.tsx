import React, { forwardRef } from 'react';
import type { Components } from '@public-ui/components';

import { ComboboxCases } from './cases';

export const ComboboxVariants = forwardRef<HTMLKolComboboxElement, Components.KolCombobox>(function InputComboboxVariant(props, ref) {
	return (
		<div className="grid md:grid-cols-2 gap-4">
			<fieldset>
				<legend>Text</legend>
				<ComboboxCases ref={ref} {...props} />
			</fieldset>
			<fieldset>
				<legend>Text (hideLabel)</legend>
				<ComboboxCases ref={ref} {...props} _hideLabel />
			</fieldset>
		</div>
	);
});
