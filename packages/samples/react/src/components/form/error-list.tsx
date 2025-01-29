import { KolButton, KolForm, KolInputText } from '@public-ui/react';
import type { FC } from 'react';
import React, { useRef } from 'react';
import { SampleDescription } from '../SampleDescription';

export const FormErrorList: FC = () => {
	const formRef = useRef<HTMLKolFormElement>();
	return (
		<>
			<SampleDescription>
				<p>This sample shows a form with error messages.</p>
			</SampleDescription>

			<KolForm
				className="w-full"
				ref={formRef}
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
					<div>
						<KolButton
							_label="ScrollTo"
							_on={{
								onClick: () => {
									formRef.current?.focusErrorList();
								},
							}}
						/>
					</div>
				</div>
			</KolForm>
		</>
	);
};
