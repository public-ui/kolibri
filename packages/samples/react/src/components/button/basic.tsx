import type { FC } from 'react';
import React, { useRef } from 'react';
import { SampleDescription } from '../SampleDescription';
import { ButtonVariants } from './partials/variants';

export const ButtonBasic: FC = () => {
	const buttonRef = useRef<HTMLKolButtonElement>(null);

	const hide = () => {
		buttonRef.current?.hideTooltip();
	};
	return (
		<>
			<SampleDescription>
				<p>
					KolButton shows a button-element. This sample demonstrates the basic usage with its different styling variants, icons, disabled state and hidden
					labels.
				</p>
			</SampleDescription>

			<button onClick={hide}>Hide Tooltip</button>

			<ButtonVariants />
		</>
	);
};
