import { KolButton, KolForm, KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useEffect, useRef } from 'react';
import { SampleDescription } from '../SampleDescription';

export const FormErrorList: FC = () => {
	const formRef = useRef<HTMLKolFormElement | null>(null);

	const scrollTo = () => {
		formRef.current?.focusErrorList();
	};

	/**
	 * Simulate the form submission
	 */
	useEffect(() => {
		formRef.current?.focusErrorList();
	}, []);

	return (
		<>
			<SampleDescription>
				<p>This sample shows a form with error messages.</p>
			</SampleDescription>

			<KolForm
				className="w-full"
				ref={formRef}
				_on={{
					onSubmit: scrollTo,
				}}
				_errorList={[
					{
						message: 'Error in Input 2',
						selector: '#input2',
					},
					{
						message: 'Error in Input 3',
						selector: () => alert('Error in Input 3'),
					},
				]}
			>
				<div className="grid gap-2">
					<KolInputText id="input1" _label="Input 1" />
					<KolInputText
						id="input2"
						_label="Input 2"
						_touched
						_msg={{
							_description: 'Input error',
							_type: 'error',
						}}
					/>
					<KolInputText
						id="input3"
						_label="Input 3"
						_touched
						_msg={{
							_description: 'Input error',
							_type: 'error',
						}}
					/>
					<div>
						<KolButton _label="ScrollTo" _type="submit" />
					</div>
				</div>
			</KolForm>
		</>
	);
};
