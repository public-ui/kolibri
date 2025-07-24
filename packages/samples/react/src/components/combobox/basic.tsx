import type { FC } from 'react';
import React from 'react';

import { KolCombobox } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { ERROR_MSG, HINT_MSG } from '../../shares/constants';
import { COUNTRY_SUGGESTIONS } from '../../shares/country';

export const ComboboxBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolCombobox combines a text input with a suggestion list, enabling users to either type in a value or to select one of the suggestions.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolCombobox _hint={HINT_MSG} _label="Label" _suggestions={COUNTRY_SUGGESTIONS} _value={'Deutschland'} />
			<KolCombobox _label="Disabled" _suggestions={COUNTRY_SUGGESTIONS} _value={'Deutschland'} _disabled />
			<KolCombobox
				_suggestions={COUNTRY_SUGGESTIONS}
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_touched
				_label="Label"
				_placeholder="Placeholder"
				_required
			/>
			<KolCombobox _label="With access key" _suggestions={COUNTRY_SUGGESTIONS} _value={'Deutschland'} _accessKey="c" />
			<KolCombobox _label="With short key" _suggestions={COUNTRY_SUGGESTIONS} _value={'Deutschland'} _shortKey="s" />
		</div>
	</>
);
