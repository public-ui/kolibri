import type { ErrorListPropType } from '@public-ui/components';
import { KolButton, KolForm, KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useRef, useState } from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

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

export const FormErrorListScroll: FC = () => {
	const formRef = useRef<HTMLKolFormElement | null>(null);
	const [errorList, setErrorList] = useState<ErrorListPropType[]>([]);

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
					This sample shows a form whose error list is populated as the result of a submit. The submit button is placed at a distance from the error list, so
					the scrolling to the list becomes visible.
				</p>
			</SampleDescription>

			<SampleBlock id="error-list">
				<KolForm className="w-full" ref={formRef} _errorList={errorList} _on={{ onSubmit: handleSubmit }}>
					<div className="flex flex-col gap-250">
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
							<KolButton _label="ScrollTo" _type="submit" />
						</div>
					</div>
				</KolForm>
			</SampleBlock>
		</>
	);
};
