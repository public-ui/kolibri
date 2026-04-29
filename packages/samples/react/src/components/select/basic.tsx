import { KolSelect } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputEventValueDemo } from '../InputEventValueDemo';
import { SampleDescription } from '../SampleDescription';
import { SelectVariants } from './partials/variants';

export const SelectBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolSelect renders a select field. The sample shows KolSelect in a form context with all variations and states.</p>
		</SampleDescription>

		<InputEventValueDemo
			label="KolSelect"
			renderInput={(handlers) => (
				<KolSelect
					_label="Select option"
					_options={[
						{ label: 'Please select…', value: '' },
						{ label: 'One', value: 'one' },
						{ label: 'Two', value: 'two' },
					]}
					_on={handlers}
				/>
			)}
		/>

		<FormWrap RefComponent={SelectVariants} showButtons={false} />
	</>
);
