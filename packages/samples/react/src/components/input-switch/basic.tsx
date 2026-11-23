import type { FC } from 'react';
import React from 'react';

import { SampleColumns } from '../SampleColumns';
import { SampleDescription } from '../SampleDescription';
import { SampleGroup } from '../SampleGroup';
import { InputSwitchCases } from './cases';

export const InputSwitchBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				KolInputSwitch renders a switch that is semantically a checkbox and carries the ARIA role <code>switch</code>. The sample shows the component with all
				states.
			</p>
		</SampleDescription>
		<SampleColumns>
			<SampleGroup heading="Switch">
				<InputSwitchCases blockIdPrefix="switch" />
			</SampleGroup>
		</SampleColumns>
	</>
);
