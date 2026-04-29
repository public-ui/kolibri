import { KolInputRadio } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputEventValueDemo } from '../InputEventValueDemo';
import { SampleDescription } from '../SampleDescription';
import { InputRadioVariants } from './partials/variants';

export const InputRadioBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputRadio renders a set of radio buttons. The sample shows KolInputRadio in a form context with all variations and states.</p>
		</SampleDescription>

		<InputEventValueDemo
			label="KolInputRadio"
			renderInput={(handlers) => (
				<KolInputRadio
					_label="Option"
					_options={[
						{ label: 'One', value: 'one' },
						{ label: 'Two', value: 'two' },
					]}
					_on={handlers}
				/>
			)}
		/>

		<FormWrap RefComponent={InputRadioVariants} showButtons={false} />
	</>
);
