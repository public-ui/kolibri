import { KolInputRange } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputEventValueDemo } from '../InputEventValueDemo';
import { SampleDescription } from '../SampleDescription';
import { InputRangeVariants } from './partials/variants';

export const InputRangeBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				KolInputRange renders a pair of range- and number fields wich are synchronized with each other. The sample shows KolInputRange in a form context with
				all variations and states.
			</p>
		</SampleDescription>

		<InputEventValueDemo label="KolInputRange" renderInput={(handlers) => <KolInputRange _label="Range" _on={handlers} />} />

		<FormWrap RefComponent={InputRangeVariants} showButtons={false} />
	</>
);
