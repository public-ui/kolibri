import { KolSelect } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { InputEventValueDemo } from '../InputEventValueDemo';
import { SampleDescription } from '../SampleDescription';

export const SelectMultipleDropdown: FC = () => (
	<>
		<SampleDescription>
			<p>Shows KolSelect with multiple=true and rows=1 - a select with multiselection in a dropdown.</p>
		</SampleDescription>

		<InputEventValueDemo
			label="KolSelect"
			renderInput={(handlers) => (
				<KolSelect
					_label="Select options"
					_options={[
						{ label: 'One', value: 'one' },
						{ label: 'Two', value: 'two' },
						{ label: 'Three', value: 'three' },
						{ label: 'Four', value: 'four' },
						{ label: 'Five', value: 'five' },
						{ label: 'Six', value: 'six' },
						{ label: 'Seven', value: 'seven' },
						{ label: 'Eight', value: 'eight' },
						{ label: 'Nine', value: 'nine' },
					]}
					_multiple={true}
					_rows={1}
					_on={handlers}
				/>
			)}
		/>
	</>
);
