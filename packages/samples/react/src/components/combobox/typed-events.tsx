import type { EventValueOrEventCallback } from '@public-ui/components';
import type { FC } from 'react';
import React, { useState } from 'react';

import { KolCombobox } from '@public-ui/react-v19';
import { COUNTRY_SUGGESTIONS } from '../../shares/country';
import { SampleDescription } from '../SampleDescription';

/**
 * Demonstrates typed event callbacks imported directly from @public-ui/components.
 * Before #9430 was fixed, EventValueOrEventCallback and other types were not
 * importable; consumers had to define them locally or use `any`.
 */
export const ComboboxTypedEvents: FC = () => {
	const [value, setValue] = useState<string>('');

	const handleChange: EventValueOrEventCallback<Event, string> = (_event, newValue = '') => {
		setValue(newValue);
	};

	return (
		<>
			<SampleDescription>
				<p>
					This example shows how to type event handlers using <code>EventValueOrEventCallback</code> imported directly from{' '}
					<code>@public-ui/components</code>. The type was previously not accessible from the public API (#9430).
				</p>
			</SampleDescription>
			<KolCombobox _label="Country" _suggestions={COUNTRY_SUGGESTIONS} _value={value} _on={{ onChange: handleChange }} />
			<p>Selected value: {value || '–'}</p>
		</>
	);
};
