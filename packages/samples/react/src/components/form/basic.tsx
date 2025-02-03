import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';
import { KolForm, KolInputText } from '@public-ui/react';

export const FormBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolForm renders a form around the input components provided in a slot. This sample shows a basic form with three input fields.</p>
		</SampleDescription>

		<KolForm className="w-full">
			<div className="grid gap-2">
				<KolInputText id="input1" _label="Input 1" />
				<KolInputText id="input2" _label="Input 2" />
				<KolInputText id="input3" _label="Input 3" />
			</div>
		</KolForm>
	</>
);
