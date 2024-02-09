import type { Components } from '@public-ui/components';
import React, { forwardRef } from 'react';

import { ButtonCases } from './cases';
import { SampleDescription } from '../../SampleDescription';

export const ButtonVariants = forwardRef<HTMLKolButtonElement, Components.KolButton>(function InputCheckboxVariant(props, ref) {
	return (
		<>
			<SampleDescription>Show our demo style buttons.</SampleDescription>
			<div className="grid gap-4">
				<h1>Button</h1>
				<section>
					<h2>Button</h2>
					<ButtonCases {...props} />
				</section>
				<section>
					<h2>Button (disabled)</h2>
					<ButtonCases {...props} _disabled />
				</section>
				<section>
					<h2>Button (hideLabel)</h2>
					<ButtonCases ref={ref} {...props} _hideLabel />
				</section>
				<section>
					<h2>Button (disabled, hideLabel)</h2>
					<ButtonCases {...props} _disabled _hideLabel />
				</section>
			</div>
		</>
	);
});
