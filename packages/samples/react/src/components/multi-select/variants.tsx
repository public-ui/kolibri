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

	return (
		<div className="grid gap-4">
			<KolMultiSelect
				_label="Label"
				_options={COUNTRY_OPTIONS as Option<StencilUnknown>[]}
				_value={value1}
				_on={{
					onChange: (_event: Event, value: unknown) => {
						setValue1(value as Option<StencilUnknown>[]);
					},
				}}
			/>

			<KolMultiSelect
				_label="With hidden Button"
				_options={COUNTRY_OPTIONS as Option<StencilUnknown>[]}
				_value={value2.map((val) => val.value)}
				_on={{
					onChange: (_event: Event, value: unknown) => {
						setValue2(value as Option<StencilUnknown>[]);
					},
				}}
			/>
		</div>
	);
};
