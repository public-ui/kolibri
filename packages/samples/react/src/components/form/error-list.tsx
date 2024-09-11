import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';
import { KolForm, KolInputText } from '@public-ui/react';

export const FormErrorList: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows a form with error messages.</p>
		</SampleDescription>

		<KolForm
			className="w-full"
			_errorList={[
				{
					message: 'Error in Input 2',
					selector: '#input2',
				},
			]}
		>
			<div className="grid gap-2">
				<KolInputText id="input1" _label="Input 1" />
				<KolInputText id="input2" _label="Input 2" _touched _msg={{ _description: 'Input error', _type: 'error' }} />
				<KolInputText id="input3" _label="Input 3" />
			</div>
		</KolForm>
	</>
);
