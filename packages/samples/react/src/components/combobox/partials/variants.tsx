import React, { forwardRef } from 'react';

import { ComboboxCases } from './cases';

import type { Components } from '@public-ui/components';
export const ComboboxVariants = forwardRef<HTMLKolSelectElement, Components.KolSelect>(function SelectVariant(props, ref) {
	return (
		<div className="grid md:grid-cols-2 gap-4">
			<fieldset>
				<legend>Text</legend>
				<ComboboxCases {...props} />
			</fieldset>
			<fieldset>
				<legend>Text (hideLabel)</legend>
				<ComboboxCases ref={ref} {...props} _hideLabel />
			</fieldset>
		</div>
	);
});
