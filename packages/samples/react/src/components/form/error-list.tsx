import { KolForm, KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useEffect, useRef } from 'react';
import { SampleBlock } from '../SampleBlock';
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

			<SampleBlock id="error-list">
				<KolForm
					className="w-full"
					ref={formRef}
					_on={{
						onSubmit: scrollTo,
					}}
					_errorList={[
						{
							message: 'Error in Input 2 (default scroll behaviour)',
							selector: '#input2',
						},
						{
							message: 'Error in Input 3 (no scrolling, just alert)',
							selector: () => alert('Error in Input 3'),
						},
						{
							message: 'Error in Input 4 (custom scroll behaviour)',
							selector: '#input4',
							options: { behavior: 'instant', block: 'start', afterFocus: () => console.log('after Focus Input 4') },
						},
					]}
				>
					<div className="flex flex-col gap-2">
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
						<KolInputText
							id="input4"
							_label="Input 4"
							_touched
							_msg={{
								_description: 'Input error',
								_type: 'error',
							}}
						/>
					</div>
				</KolForm>
			</SampleBlock>
		</>
	);
};
