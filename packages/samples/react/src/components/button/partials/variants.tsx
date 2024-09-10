import React from 'react';

import { ButtonCases } from './cases';
import { KolHeading } from '@public-ui/react';
import type { Components } from '@public-ui/components';

export const ButtonVariants = function ButtonVariant() {
	const examples: { label: string; buttonProps: Partial<Components.KolButton> }[] = [
		{ label: 'Button', buttonProps: {} },
		{ label: 'Button (disabled)', buttonProps: { _disabled: true } },
		{ label: 'Button (hideLabel)', buttonProps: { _hideLabel: true } },
		{ label: 'Button (disabled, hideLabel)', buttonProps: { _disabled: true, _hideLabel: true } },
	];
	return (
		<div className="grid gap-4">
			{examples.map(({ label, buttonProps }, index) => (
				<section key={index} className="grid">
					<KolHeading _level={2} _label={label} />
					<ButtonCases {...buttonProps} />
				</section>
			))}
		</div>
	);
};
