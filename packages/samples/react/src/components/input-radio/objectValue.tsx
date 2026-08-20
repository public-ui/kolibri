import type { FC } from 'react';
import React from 'react';

import { KolForm, KolInputRadio } from '@public-ui/react-v19';

import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const InputRadioObjectValue: FC = () => {
	const options = [
		{ label: 'Field 1', value: { id: 1, name: 'Option 1' } },
		{ label: 'Field 2', value: { id: 2, name: 'Option 2' } },
	];

	return (
		<div className="grid gap-4">
			<SampleDescription>
				This sample shows KolInputRadio with <code>object</code> and <code>undefined</code> values.
			</SampleDescription>

			<KolForm>
				<p>
					In this example for <code>KolInputRadio</code>, the values of the options are defined as objects.
				</p>
				<SampleBlock id="object-value" className="container my-4 d-grid gap-4">
					<KolInputRadio _value={options[1].value} _options={options} _label="Test (with object value)" />
				</SampleBlock>

				<p>
					In this example for <code>KolInputRadio</code>, no value is set.
				</p>
				<SampleBlock id="no-value" className="container my-4 d-grid gap-4">
					<KolInputRadio _options={options} _label="Test (without value)" />
				</SampleBlock>
			</KolForm>
		</div>
	);
};
