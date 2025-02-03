import React from 'react';

import { SingleSelectCases } from './cases';
import type { Components } from '@public-ui/components';

export const SingleSelectVariants = (props: Components.KolSingleSelect) => {
	return (
		<div className="grid md:grid-cols-2 gap-4">
			<fieldset>
				<legend>Text</legend>
				<SingleSelectCases {...props} />
			</fieldset>
			<fieldset>
				<legend>Text (hideLabel)</legend>
				<SingleSelectCases {...props} _hideLabel />
			</fieldset>
		</div>
	);
};
