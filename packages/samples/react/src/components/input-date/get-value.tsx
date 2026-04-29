import { KolInputDate } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { InputEventValueDemo } from '../InputEventValueDemo';
import { SampleDescription } from '../SampleDescription';

export const InputDateOnInputOnChange: FC = () => (
	<>
		<SampleDescription>
			<p>
				Shows the callback value from <code>onInput</code> while typing and from <code>onChange</code> after leaving the field.
			</p>
		</SampleDescription>

		<InputEventValueDemo label="KolInputDate" renderInput={(handlers) => <KolInputDate _label="Date" _on={handlers} />} />
	</>
);
