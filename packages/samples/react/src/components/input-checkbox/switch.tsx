import React, { FC } from 'react';
import { InputCheckboxVariants } from './partials/variants';
import { FormWrap } from '../FormWrap';
import { SampleDescription } from '../SampleDescription';

export const InputCheckboxSwitch: FC = () => (
	<>
		<SampleDescription>
			<p>
				{' '}
				Hier werden verschiedene Checkboxen mit betiteltem Wunschausgangsverhalten angezeigt. Die Checkbox &apos;Nicht ausgewählt&apos; ist Standardmäßig nicht
				ausgewählt usw. Die Buttons unten haben keine direkte Funktion, außer, dass Sie ausgewählt werden können. Der Unterschied zwischen der linken und
				Rechten Darstellung ist, dass erst nach anklicken im Rechten Teil ein Label angezeigt wird. In diesem Beispiel sind die Checkboxen als Switches
				dargestellt.
			</p>
		</SampleDescription>
		<FormWrap RefComponent={InputCheckboxVariants} _variant="switch" />
	</>
);
