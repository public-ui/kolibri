import type { FC } from 'react';
import React from 'react';

import { SampleColumns } from '../SampleColumns';
import { SampleDescription } from '../SampleDescription';
import { SampleGroup } from '../SampleGroup';
import { InputToggleButtonCases } from './cases';

export const InputToggleButtonBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				KolInputToggleButton renders a toggle button that is semantically a checkbox. The sample shows the component with all states. The button label comes
				from the hidden input label or from the state icons.
			</p>
		</SampleDescription>
		<SampleColumns>
			<SampleGroup heading="Toggle Button">
				<InputToggleButtonCases blockIdPrefix="toggle-button" />
			</SampleGroup>
		</SampleColumns>
	</>
);
