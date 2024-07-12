import type { FC } from 'react';
import React from 'react';
import { FormWrap } from '../FormWrap';
import { ComboboxVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';
export const ComboboxBasic: FC = () => (
	<>
		<SampleDescription>
			KolCombobox combines a text input with a suggestion list, enabling users to either type in a value or to select on of the suggestions.
		</SampleDescription>
		<>
			<FormWrap RefComponent={ComboboxVariants} />
		</>
	</>
);
