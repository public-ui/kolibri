import { KolInputRadio } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { InputEventValueDemo } from '../InputEventValueDemo';
import { SampleDescription } from '../SampleDescription';

export const InputRadioOnInputOnChange: FC = () => (
	<>
		<SampleDescription>
			<p>
				Shows the callback value from <code>onInput</code> while typing and from <code>onChange</code> after leaving the field.
			</p>
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
	</>
);
