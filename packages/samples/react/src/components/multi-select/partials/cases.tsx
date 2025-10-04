import React from 'react';

import { KolMultiSelect } from '@public-ui/react-v19';
import type { Components, Option, StencilUnknown } from '@public-ui/components';

import { ERROR_MSG, HINT_MSG } from '../../../shares/constants';
import { COUNTRY_OPTIONS } from '../../../shares/country';
import { LONG_OPTIONS } from '../../../shares/longOptions';

export const MultiSelectCases = (props: Components.KolMultiSelect) => {
	const defaultOptions = COUNTRY_OPTIONS as Option<StencilUnknown>[];
	const longLabelOptions = LONG_OPTIONS as Option<StencilUnknown>[];

	return (
		<div className="grid gap-4">
			<KolMultiSelect
				{...props}
				_hint={HINT_MSG}
				_label="Label"
				_options={defaultOptions}
				_value={['de', 'fr']}
				_on={{
					onBlur: console.log,
					onInput: console.log,
					onChange: console.log,
					onClick: console.log,
					onFocus: console.log,
				}}
			/>
			<KolMultiSelect {...props} _label="Disabled" _options={defaultOptions} _value={['de', 'fr']} _disabled />
			<KolMultiSelect
				{...props}
				_options={defaultOptions}
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_rows={4}
				_touched
				_label="Label"
				_placeholder="Placeholder"
				_required
			/>
			<KolMultiSelect {...props} _label="With access key" _options={defaultOptions} _value={['de']} _accessKey="m" />
			<KolMultiSelect {...props} _label="With short key" _options={defaultOptions} _value={['de']} _shortKey="m" />
			<KolMultiSelect {...props} _label="With long labels" _options={longLabelOptions} _placeholder="Select options" />
			<KolMultiSelect {...props} _label="With hidden clear button" _options={defaultOptions} _value={['de', 'fr']} _hideClearButton />
		</div>
	);
};
