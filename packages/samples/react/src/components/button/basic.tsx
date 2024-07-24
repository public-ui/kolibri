import type { FC } from 'react';
import React from 'react';
import { FocusElement } from '../FocusInput';
import { ButtonVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';

export const ButtonBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				KolButton shows a button-element. This sample demonstrates the basic usage with its different styling variants, icons, disabled state and hidden labels.
			</p>
		</SampleDescription>
		<FocusElement RefComponent={ButtonVariants} />
	</>
);
