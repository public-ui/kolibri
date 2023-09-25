import React, { FC } from 'react';
import { InputCheckboxVariants } from './partials/variants';
import { FocusInput } from '../FocusInput';

export const InputCheckboxSwitch: FC = () => (
	<FocusInput
		RefInput={InputCheckboxVariants}
		props={{
			_variant: 'switch',
		}}
	/>
);
