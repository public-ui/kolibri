import { KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { InputEventValueDemo } from '../InputEventValueDemo';
import { SampleDescription } from '../SampleDescription';

export const InputTextOnInputOnChange: FC = () => (
	<>
		<SampleDescription>
			<p>
				Shows the callback value from <code>onInput</code> while typing and from <code>onChange</code> after leaving the field.
			</p>
		</SampleDescription>

		<InputEventValueDemo label="KolInputText" renderInput={(handlers) => <KolInputText _label="Name" _on={handlers} />} />
	</>
);
