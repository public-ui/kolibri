import type { FC } from 'react';
import React, { useState } from 'react';

import { KolButton, KolInputCheckbox } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

export const InputCheckboxChange: FC = () => {
	const [isDisabled, setIsDisabled] = useState(false);

	console.log('isDisabled: ', isDisabled);

	return (
		<>
			<SampleDescription>
				<p>KolInputCheckbox renders a checkbox. The sample shows KolInputCheckbox in a form context with all variations and states.</p>
			</SampleDescription>

			<KolInputCheckbox
				_label="Das ist ein test"
				_on={{
					onChange: () => {
						setIsDisabled(!isDisabled);
						console.log('click checkbox');
					},
				}}
				//_checked={isDisabled}
				_disabled={isDisabled}
				//_hideLabel={isDisabled}
			/>
			<KolButton
				_label="Click me"
				_on={{
					onClick: () => {
						setIsDisabled(!isDisabled);
						console.log('click button');
					},
				}}
			/>
		</>
	);
};
