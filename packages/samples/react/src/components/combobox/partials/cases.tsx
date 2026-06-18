import React from 'react';

import { KolCombobox } from '@public-ui/react-v19';

import type { Components } from '@public-ui/components';
import { ERROR_MSG, HINT_MSG } from '../../../shares/constants';
import { COUNTRY_SUGGESTIONS } from '../../../shares/country';

type ComboboxCasesProps = Partial<Components.KolCombobox> & {
	/** Access key for the "With access key" example. Must be unique across all instances rendered on the same page. */
	accessKey?: string;
	/** Short key for the "With short key" example. Must be unique across all instances rendered on the same page. */
	shortKey?: string;
};

export const ComboboxCases = ({ accessKey = 'c', shortKey = 's', ...props }: ComboboxCasesProps) => {
	return (
		<div className="grid gap-4">
			<KolCombobox {...props} _hint={HINT_MSG} _label="Label" _suggestions={COUNTRY_SUGGESTIONS} _value={'Deutschland'} />
			<KolCombobox {...props} _label="Disabled" _suggestions={COUNTRY_SUGGESTIONS} _value={'Deutschland'} _disabled />
			<KolCombobox
				{...props}
				_suggestions={COUNTRY_SUGGESTIONS}
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_touched
				_label="Label"
				_placeholder="Placeholder"
				_required
			/>
			<KolCombobox
				{...props}
				_label={`With access key (Alt+${accessKey.toUpperCase()})`}
				_suggestions={COUNTRY_SUGGESTIONS}
				_value={'Deutschland'}
				_accessKey={accessKey}
			/>
			<KolCombobox
				{...props}
				_label={`With short key (${shortKey.toUpperCase()})`}
				_suggestions={COUNTRY_SUGGESTIONS}
				_value={'Deutschland'}
				_shortKey={shortKey}
			/>
		</div>
	);
};
