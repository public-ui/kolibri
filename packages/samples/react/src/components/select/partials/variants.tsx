import React, { forwardRef } from 'react';

import { SelectCases } from './cases';

import type { Components } from '@public-ui/components';
export const SelectVariants = forwardRef<HTMLKolSelectElement, Components.KolSelect>(function SelectVariant(props, ref) {
	return (
		<div className="grid md:grid-cols-2 gap-4">
			<fieldset>
				<legend>Text</legend>
				<SelectCases {...props} />
			</fieldset>
			<fieldset>
				<legend>Text (hideLabel)</legend>
				<SelectCases ref={ref} {...props} _hideLabel />
			</fieldset>
		</div>
	);
});
