import { KolAlert, KolButton, KolForm, KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useState } from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const FormSuccess: FC = () => {
	const [submitted, setSubmitted] = useState(false);

	return (
		<>
			<SampleDescription>
				<p>
					This sample shows a form that displays a success alert after saving. The alert is rendered as the result of the submit and announces itself to screen
					readers through the <code>_alert</code> property. It remains visible afterwards.
				</p>
			</SampleDescription>

			<SampleBlock id="form-success" className="grid gap-2">
				{submitted && (
					<KolAlert _alert _label="Successfully saved" _type="success">
						The data has been saved.
					</KolAlert>
				)}
				<KolForm
					className="w-full"
					_on={{
						onSubmit: () => setSubmitted(true),
					}}
				>
					<div className="flex flex-col gap-2">
						<KolInputText id="first-name" _label="First name" />
						<KolInputText id="last-name" _label="Last name" />
						<div>
							<KolButton _label="Save" _type="submit" _variant="primary" />
						</div>
					</div>
				</KolForm>
			</SampleBlock>
		</>
	);
};
