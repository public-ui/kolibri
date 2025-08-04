import { KolButton, KolForm, KolHeading, KolInputCheckbox, KolInputRadio } from '@public-ui/react';
import type { FC } from 'react';
import React, { useState } from 'react';
import { SampleDescription } from '../components/SampleDescription';

export const FormSubmit: FC = () => {
	const [submittedData, setSubmittedData] = useState<{ source: string; timestamp: string } | null>(null);

	const submit = () => {
		setSubmittedData({
			source: 'Form with Submit-Button',
			timestamp: new Date().toISOString(),
		});
	};

	const submitOhneButton = () => {
		setSubmittedData({
			source: 'Form without Submit-Button',
			timestamp: new Date().toISOString(),
		});
	};

	const options1 = [{ label: 'Radio1', value: 'Radio1' }];
	const options2 = [{ label: 'Radio2', value: 'Radio2' }];

	return (
		<>
			<SampleDescription>
				<p>This scenario shows forms with and without submit-button. When a form is submitted (via Enter) with focus on checkbox/radio, a result is printed</p>
			</SampleDescription>

			<div className="flex flex-row flex-wrap gap-x-8 gap-y-6">
				{/* Output */}
				{submittedData && (
					<div className="w-full mb-6 p-4 bg-gray-100 rounded border border-gray-300">
						<pre className="text-base">{JSON.stringify(submittedData, null, 2)}</pre>
					</div>
				)}

				{/* Form with Submit-Button */}
				<KolForm _on={{ onSubmit: submit }} className="flex-1 min-w-[300px]">
					<div className="mb-4">
						<KolHeading _label="Form with Submit Button" _level={2} />
					</div>
					<div className="grid gap-3">
						<KolInputRadio _label="Radio1" _hideLabel _id="radio-mit" _orientation="horizontal" _options={options1} />
						<KolInputCheckbox _id="checkbox-mit" _label="Checkbox1" />
						<KolButton _label="Senden" _type="submit" _variant="primary" />
					</div>
				</KolForm>

				{/* Form without Submit-Button */}
				<KolForm _on={{ onSubmit: submitOhneButton }} className="flex-1 min-w-[300px]">
					<div className="mb-4">
						<KolHeading _label="Form without Submit Button" _level={2} />
					</div>
					<div className="grid gap-3">
						<KolInputRadio _label="Radio2" _hideLabel _id="radio-ohne" _orientation="horizontal" _options={options2} />
						<KolInputCheckbox _id="checkbox-ohne" _label="Checkbox2" />
					</div>
				</KolForm>
			</div>
		</>
	);
};
