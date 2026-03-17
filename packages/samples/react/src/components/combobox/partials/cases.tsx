import React from 'react';

import { KolCombobox } from '@public-ui/react-v19';
import { logKoliBriCallbackEvent, logKoliBriNativeEvent } from '../../../shares/utils';

import type { Components } from '@public-ui/components';
import { ERROR_MSG, HINT_MSG } from '../../../shares/constants';
import { COUNTRY_SUGGESTIONS } from '../../../shares/country';

export const ComboboxCases = (props: Partial<Components.KolCombobox>) => {
	return (
		<div className="grid gap-4">
			<KolCombobox
				{...props}
				_hint={HINT_MSG}
				_label="Label"
				_suggestions={COUNTRY_SUGGESTIONS}
				_value={'Deutschland'}
				_on={{
					onBlur: logKoliBriCallbackEvent,
					// onChange: logKoliBriCallbackEvent,
					// onClick: logKoliBriCallbackEvent,
					// onFocus: logKoliBriCallbackEvent,
					// onInput: logKoliBriCallbackEvent,
					// onKeyDown: logKoliBriCallbackEvent,
				}}
				onBlur={logKoliBriNativeEvent}
				// onChange={logKoliBriNativeEvent}
				// onClick={logKoliBriNativeEvent}
				// onFocus={logKoliBriNativeEvent}
				// onInput={logKoliBriNativeEvent}
				// onKeyDown={logKoliBriNativeEvent}
			/>
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
			<KolCombobox {...props} _label="With access key" _suggestions={COUNTRY_SUGGESTIONS} _value={'Deutschland'} _accessKey="c" />
			<KolCombobox {...props} _label="With short key" _suggestions={COUNTRY_SUGGESTIONS} _value={'Deutschland'} _shortKey="s" />
		</div>
	);
};
