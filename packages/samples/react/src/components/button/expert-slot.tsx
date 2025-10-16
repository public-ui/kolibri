import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';
import { ButtonVariants } from './partials/variants';

export const ButtonExpertSlot: FC = () => (
	<>
		<SampleDescription>
			<p>KolButton show a button-element with expert slot.</p>
		</SampleDescription>

		<ButtonVariants _label="">
			<span slot="expert">I am more than just a button</span>
		</ButtonVariants>
	</>
);
