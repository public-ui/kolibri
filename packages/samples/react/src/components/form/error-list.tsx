import type { ErrorListPropType } from '@public-ui/components';
import { KolButton, KolForm, KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

/**
 * The error entries stay in the order of the form inputs and demonstrate the three selector
 * variants: a CSS selector with default scrolling on the first invalid input, a callback without
 * scrolling, and a CSS selector with smooth scrolling to the last input.
 */
const ERROR_LIST: ErrorListPropType[] = [
	{
		message: 'Error in Input 2 (default scroll behaviour)',
		selector: '#input2',
	},
	{
		message: 'Error in Input 3 (no scrolling, just alert)',
		selector: () => alert('Error in Input 3'),
	},
	{
		message: 'Error in Input 4 (smooth scroll behaviour)',
		selector: '#input4',
		options: { behavior: 'smooth', block: 'start', afterFocus: () => console.log('after Focus Input 4') },
	},
];

export const FormErrorList: FC = () => {
	const formRef = useRef<HTMLKolFormElement | null>(null);
	/**
	 * The `submitted` query parameter renders the route with the error list already set, so the visual
	 * tests capture the list; the plain route keeps the list as the result of a submit.
	 */
	const [searchParams] = useSearchParams();
	const submitted = searchParams.get('submitted') === 'true';
	const [errorList, setErrorList] = useState<ErrorListPropType[]>(() => (submitted ? ERROR_LIST : []));

	/**
	 * A route loaded as submitted focuses the first error entry, as a submit does.
	 */
	useEffect(() => {
		if (submitted) {
			void formRef.current?.focusErrorList();
		}
	}, [submitted]);

	/**
	 * In a real application, the error list is derived from the validation of the submitted form
	 * data. `focusErrorList` applies its focus asynchronously, after the list has been rendered.
	 */
	const handleSubmit = () => {
		setErrorList(ERROR_LIST);
		void formRef.current?.focusErrorList();
	};

	return (
		<>
			<SampleDescription>
				<p>
					This sample shows a form whose error list is populated as the result of a submit. The error entries stay in the order of the form inputs and
					demonstrate the different selector variants: a CSS selector with default scrolling on the first invalid input, a callback without scrolling, and a CSS
					selector with smooth scrolling to the last input.
				</p>
			</SampleDescription>

			<SampleBlock id="error-list">
				<KolForm className="w-full" ref={formRef} _errorList={errorList} _on={{ onSubmit: handleSubmit }}>
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
						<div>
							<KolButton _label="Submit" _type="submit" />
						</div>
					</div>
				</KolForm>
			</SampleBlock>
		</>
	);
};
