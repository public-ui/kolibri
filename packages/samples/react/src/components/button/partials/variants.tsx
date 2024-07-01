import React from 'react';

import { ButtonCases } from './cases';

export const ButtonVariants = function ButtonVariant() {
	return (
		<div className="grid gap-4">
			<h1>Button</h1>
			<section>
				<h2>Button</h2>
				<ButtonCases />
			</section>
			<section>
				<h2>Button (disabled)</h2>
				<ButtonCases _disabled />
			</section>
			<section>
				<h2>Button (hideLabel)</h2>
				<ButtonCases _hideLabel />
			</section>
			<section>
				<h2>Button (disabled, hideLabel)</h2>
				<ButtonCases _disabled _hideLabel />
			</section>
		</div>
	);
};
