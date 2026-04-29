import { KolSelect } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { InputEventValueDemo } from '../InputEventValueDemo';
import { SampleDescription } from '../SampleDescription';

export const SelectOnInputOnChange: FC = () => (
	<>
		<SampleDescription>
			<p>
				Shows the callback value from <code>onInput</code> while typing and from <code>onChange</code> after leaving the field.
			</p>
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
	</>
);
