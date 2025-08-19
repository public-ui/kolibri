import React, { forwardRef } from 'react';

import { InputRadioCases } from './cases';

import type { Components } from '@public-ui/components';
import { KolHeading } from '@public-ui/react-v19';

export const InputRadioVariants = forwardRef<HTMLKolInputRadioElement, Components.KolInputRadio>(function InputRadioVariant(props, ref) {
	return (
		<div className="grid md:grid-cols-2 gap-4">
			<div className="border border-solid border-dark-100 p-3">
				<KolHeading _level={2} _label="Radio" className="block mb-2" />
				<InputRadioCases {...props} />
			</div>
			<div className="border border-solid border-dark-100 p-3">
				<KolHeading _level={2} _label="Radio (hideLabel)" className="block mb-2" />
				<InputRadioCases ref={ref} {...props} _hideLabel />
			</div>
		</div>
	);
});
