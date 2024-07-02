import React, { forwardRef } from 'react';

import { KolSingleSelect } from '@public-ui/react';

import { ERROR_MSG, HINT_MSG } from '../../../shares/constants';

import type { Components } from '@public-ui/components';
import { COUNTRY_OPTIONS } from '../../../shares/country';

export const SingleSelectCases = forwardRef<HTMLKolSingleSelectElement, Components.KolSelect>(function SingleSelectCases(props) {
	return (
		<div className="grid gap-4">
			<KolSingleSelect
				{...props}
				_hint={HINT_MSG}
				_label="Label"
				_options={COUNTRY_OPTIONS}
				_value={'de'}
				_on={{
					onBlur: console.log,
					onChange: console.log,
					onClick: console.log,
					onFocus: console.log,
				}}
			/>
			<KolSingleSelect {...props} _label="Disabled" _options={COUNTRY_OPTIONS} _value={'de'} _disabled />
			<KolSingleSelect
				{...props}
				_options={COUNTRY_OPTIONS}
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_touched
				_label="Label"
				_placeholder="Placeholder"
				_required
			/>
		</div>
	);
});
