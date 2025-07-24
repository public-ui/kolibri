import type { FC } from 'react';
import React from 'react';

import { KolCombobox } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { ERROR_MSG, HINT_MSG } from '../../shares/constants';
import { COUNTRY_SUGGESTIONS } from '../../shares/country';

export const ComboboxHideLabel: FC = () => (
	<>
		<SampleDescription>
			<p>This sample demonstrates KolCombobox with hidden labels.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolCombobox _hint={HINT_MSG} _label="Label" _suggestions={COUNTRY_SUGGESTIONS} _value={'Deutschland'} _hideLabel />
			<KolCombobox _label="Disabled" _suggestions={COUNTRY_SUGGESTIONS} _value={'Deutschland'} _disabled _hideLabel />
			<KolCombobox
				_suggestions={COUNTRY_SUGGESTIONS}
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_touched
				_label="Label"
				_placeholder="Placeholder"
				_required
				_hideLabel
			/>
			<KolCombobox _label="With access key" _suggestions={COUNTRY_SUGGESTIONS} _value={'Deutschland'} _accessKey="c" _hideLabel />
			<KolCombobox _label="With short key" _suggestions={COUNTRY_SUGGESTIONS} _value={'Deutschland'} _shortKey="s" _hideLabel />
		</div>
	</>
);
