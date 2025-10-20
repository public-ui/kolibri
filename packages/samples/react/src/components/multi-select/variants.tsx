import { KolMultiSelect } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useState } from 'react';

import type { Option, StencilUnknown } from '@public-ui/components';
import { COUNTRY_OPTIONS } from '../../shares/country';

export const MultiSelectVariants: FC = () => {
	const [value1, setValue1] = useState<Option<StencilUnknown>[]>([]);
	const [value2, setValue2] = useState<Option<StencilUnknown>[]>([
		{
			label: 'Deutschland',
			value: 'de',
		},
	]);
	const [value3, setValue3] = useState<Option<StencilUnknown>[]>([]);
	const [value4, setValue4] = useState<Option<StencilUnknown>[]>([]);

	return (
		<div className="grid gap-4">
			<KolMultiSelect
				_label="Anrede (leer)"
				_options={COUNTRY_OPTIONS as Option<StencilUnknown>[]}
				_value={value1}
				_on={{
					onChange: (_event: Event, value: unknown) => {
						setValue1(value as Option<StencilUnknown>[]);
					},
				}}
			/>

			<KolMultiSelect
				_label="Anrede (vorausgewählt)"
				_options={COUNTRY_OPTIONS as Option<StencilUnknown>[]}
				_value={value2}
				_on={{
					onChange: (_event: Event, value: unknown) => {
						setValue2(value as Option<StencilUnknown>[]);
					},
				}}
			/>

			<KolMultiSelect
				_label="Anrede (max. 2 Auswahlen)"
				_options={COUNTRY_OPTIONS as Option<StencilUnknown>[]}
				_value={value3}
				_maxSelections={2}
				_on={{
					onChange: (_event: Event, value: unknown) => {
						setValue3(value as Option<StencilUnknown>[]);
					},
				}}
			/>

			<KolMultiSelect
				_label="Anrede (ohne Clear-Button)"
				_options={COUNTRY_OPTIONS as Option<StencilUnknown>[]}
				_value={value4}
				_hideClearButton={true}
				_on={{
					onChange: (_event: Event, value: unknown) => {
						setValue4(value as Option<StencilUnknown>[]);
					},
				}}
			/>
		</div>
	);
};
