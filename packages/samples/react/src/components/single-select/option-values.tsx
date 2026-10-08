import type { FC } from 'react';
import React from 'react';

import { KolSingleSelect } from '@public-ui/react-v19';

import type { Option, StencilUnknown } from '@public-ui/components';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

const FALSY_VALUE_OPTIONS: Option<StencilUnknown>[] = [
	{ label: 'Zero', value: 0 },
	{ label: 'No', value: false },
	{ label: 'Empty string', value: '' },
	{ label: 'One', value: 1 },
	{ label: 'Two (disabled)', value: 2, disabled: true },
];

/** Number labels are accepted and shown as text. */
const NUMBER_LABEL_OPTIONS = [
	{ label: 2024, value: 2024 },
	{ label: 2025, value: 2025 },
	{ label: 2026, value: 2026 },
] as unknown as Option<StencilUnknown>[];

export const SingleSelectOptionValues: FC = () => (
	<>
		<SampleDescription>
			<p>
				The options of KolSingleSelect accept any value, also falsy ones such as <code>0</code>, <code>false</code> or an empty string; the selected option is
				found by its value. A number as <code>label</code> is shown as text. Disabled options stay visible in the list but can not be selected.
			</p>
		</SampleDescription>

		<div className="grid gap-4">
			<SampleBlock id="falsy-zero">
				<KolSingleSelect _label="Value 0 selected" _options={FALSY_VALUE_OPTIONS} _value={0} />
			</SampleBlock>
			<SampleBlock id="falsy-false">
				<KolSingleSelect _label="Value false selected" _options={FALSY_VALUE_OPTIONS} _value={false} />
			</SampleBlock>
			<SampleBlock id="number-labels">
				<KolSingleSelect _label="Number labels (year)" _options={NUMBER_LABEL_OPTIONS} _value={2025} />
			</SampleBlock>
		</div>
	</>
);
