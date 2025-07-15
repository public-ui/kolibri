import type { FC } from 'react';
import React from 'react';
import { FormWrap } from '../FormWrap';
import { ComboboxVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';
export const ComboboxBasic: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>KolCombobox combines a text input with a suggestion list, enabling users to either type in a value or to select on of the suggestions.</p>
			</SampleDescription>

			<FormWrap RefComponent={ComboboxVariants} />
		</>
	);
};
