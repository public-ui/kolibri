import React, { FC } from 'react';
import { FocusInput } from '../FocusInput';
import { InputCheckboxVariants } from './partials/variants';

export const InputCheckboxButton: FC = () => (
	<FocusInput
		RefInput={InputCheckboxVariants}
		props={{
			_variant: 'button',
		}}
	/>
);
