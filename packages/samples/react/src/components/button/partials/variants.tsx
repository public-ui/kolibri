import React from 'react';

import { ButtonCases } from './cases';
import { KolHeading } from '@public-ui/react';
import type { ButtonSampleProps } from './type';

export const ButtonVariants: React.FC<ButtonSampleProps> = (props = {}) => {
	const examples: { label: string; buttonProps: ButtonSampleProps }[] = [
		{ label: 'Button', buttonProps: props },
		{ label: 'Button (disabled)', buttonProps: { ...props, _disabled: true } },
		{ label: 'Button (hideLabel)', buttonProps: { ...props, _hideLabel: true } },
		{ label: 'Button (disabled, hideLabel)', buttonProps: { ...props, _disabled: true, _hideLabel: true } },
	];

	return (
		<div className="grid gap-8">
			{examples.map(({ label, buttonProps }, index) => (
				<section key={index} className="grid gap-4">
					<KolHeading _level={2} _label={label} />
					<ButtonCases {...buttonProps}></ButtonCases>
				</section>
			))}
		</div>
	);
};
