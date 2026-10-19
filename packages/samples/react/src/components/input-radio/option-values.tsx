import type { FC } from 'react';
import React from 'react';

import { KolInputRadio } from '@public-ui/react-v19';

import type { RadioOption, StencilUnknown } from '@public-ui/components';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

/** Number labels are accepted and shown as text. */
const NUMBER_LABEL_OPTIONS = [
	{ label: 1, value: 1, hint: 'One person' },
	{ label: 2, value: 2, hint: 'Two persons' },
	{ label: 3, value: 3, hint: 'Three persons' },
] as unknown as RadioOption<StencilUnknown>[];

/** Without a `value`, an option uses its label as value; the JSON string form allows to leave it out. */
const LABEL_AS_VALUE_OPTIONS = JSON.stringify([{ label: 'Mrs.' }, { label: 'Mr.' }, { label: 'Company', value: 'company' }]);

const FALSY_VALUE_OPTIONS: RadioOption<StencilUnknown>[] = [
	{ label: 'No', value: false },
	{ label: 'Yes', value: true },
];

export const InputRadioOptionValues: FC = () => (
	<>
		<SampleDescription>
			<p>
				The options of KolInputRadio accept a number as <code>label</code>, which is shown as text, and an optional <code>hint</code> per option. An option
				without <code>value</code> uses its label as value, and a falsy value such as <code>false</code> is selected like any other value.
			</p>
		</SampleDescription>

		<div className="grid gap-4">
			<SampleBlock id="number-labels">
				<KolInputRadio _label="Number of persons (number labels with hints)" _options={NUMBER_LABEL_OPTIONS} _value={2} />
			</SampleBlock>
			<SampleBlock id="label-as-value">
				<KolInputRadio _label="Salutation (options without value)" _options={LABEL_AS_VALUE_OPTIONS} _value="Mr." _orientation="horizontal" />
			</SampleBlock>
			<SampleBlock id="falsy-value">
				<KolInputRadio _label="Newsletter (value false selected)" _options={FALSY_VALUE_OPTIONS} _value={false} _orientation="horizontal" />
			</SampleBlock>
		</div>
	</>
);
