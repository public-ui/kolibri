import type { FC } from 'react';
import React from 'react';
import { FormWrap } from '../FormWrap';
import { ComboboxVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';
export const ComboboxBasic: FC = () => (
	<>
		<SampleDescription>The Combobox merges a text input with a suggestion list, enabling users to type or select their choice.</SampleDescription>
		<>
			<FormWrap RefComponent={ComboboxVariants} />
		</>
	</>
);
