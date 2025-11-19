import { KolInputText } from '@public-ui/react-v19';
import * as React from 'react';
import { SampleDescription } from '../SampleDescription';

export const InputTextExpertSlot = () => {
	return (
		<>
			<SampleDescription>
				<p>This sample show KolInputText with expert slot.</p>
			</SampleDescription>

			<KolInputText _label="" _type="text">
				<span slot="expert">I am more than just a input field</span>
			</KolInputText>
		</>
	);
};
