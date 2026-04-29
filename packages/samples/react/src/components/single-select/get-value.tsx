import { KolSingleSelect } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { InputEventValueDemo } from '../InputEventValueDemo';
import { SampleDescription } from '../SampleDescription';

export const SingleSelectOnInputOnChange: FC = () => (
	<>
		<SampleDescription>
			<p>
				Shows the callback value from <code>onInput</code> while typing and from <code>onChange</code> after leaving the field.
			</p>
		</SampleDescription>

		<InputEventValueDemo
			label="KolSingleSelect"
			renderInput={(handlers) => (
				<KolSingleSelect
					_label="Search option"
					_options={[
						{ label: 'One', value: 'one' },
						{ label: 'Two', value: 'two' },
					]}
					_on={handlers}
				/>
			)}
		/>
	</>
);
