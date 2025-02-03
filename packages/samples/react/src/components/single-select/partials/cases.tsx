import React from 'react';

import { KolSingleSelect } from '@public-ui/react';

import { ERROR_MSG, HINT_MSG } from '../../../shares/constants';

import type { Option, StencilUnknown } from '@public-ui/components';
import { COUNTRY_OPTIONS } from '../../../shares/country';
import type { Components } from '@public-ui/components';

export const SingleSelectCases = (props: Components.KolSingleSelect) => {
	return (
		<div className="grid gap-4">
			<KolSingleSelect
				{...props}
				_hint={HINT_MSG}
				_label="Label"
				_options={COUNTRY_OPTIONS as Option<StencilUnknown>[]}
				_value={'de'}
				_on={{
					onBlur: console.log,
					onInput: console.log,
					onChange: console.log,
					onClick: console.log,
					onFocus: console.log,
				}}
			/>
			<KolSingleSelect {...props} _label="Disabled" _options={COUNTRY_OPTIONS as Option<StencilUnknown>[]} _value={'de'} _disabled />
			<KolSingleSelect
				{...props}
				_options={COUNTRY_OPTIONS as Option<StencilUnknown>[]}
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_touched
				_label="Label"
				_placeholder="Placeholder"
				_required
			/>
			<KolSingleSelect {...props} _label="With access key" _options={COUNTRY_OPTIONS as Option<StencilUnknown>[]} _value={'de'} _accessKey="c" />
			<KolSingleSelect {...props} _label="With short key" _options={COUNTRY_OPTIONS as Option<StencilUnknown>[]} _value={'de'} _shortKey="s" />
		</div>
	);
};
