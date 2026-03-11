import { KolButton, KolForm, KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const FormBasic: FC = () => {
	const formEventHAndler = {
		onSubmit: (event: any) => console.log('submitted:', event),
	};

	return (
		<>
			<SampleDescription>
				<p>
					KolForm renders a form around the input components provided in a slot. This sample shows a basic form with three input fields and a submit button.
				</p>
			</SampleDescription>

			<KolForm className="w-full" _on={formEventHAndler}>
				<div className="grid gap-2">
					<KolInputText id="input1" _label="Input 1" />
					<KolInputText id="input2" _label="Input 2" />
					<KolInputText id="input3" _label="Input 3" />
					<KolButton _label="Submit" _variant="primary" _type="submit" />
				</div>
			</KolForm>
		</>
	);
};
