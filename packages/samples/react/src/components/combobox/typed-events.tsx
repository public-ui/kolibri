import type { EventValueOrEventCallback } from '@public-ui/components';
import { KolCombobox } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useState } from 'react';
import { COUNTRY_SUGGESTIONS } from '../../shares/country';
import { SampleDescription } from '../SampleDescription';

export const ComboboxTypedEvents: FC = () => {
	const [value, setValue] = useState<string>('');

	const handleChange: EventValueOrEventCallback<Event, unknown> = (_event: Event, newValue: unknown = '') => {
		setValue(typeof newValue === 'string' ? newValue : '');
	};

	return (
		<>
			<SampleDescription>
				<p>Demonstrates typed event callbacks using EventValueOrEventCallback, imported directly from @public-ui/components (issue #9430).</p>
			</SampleDescription>
			<KolCombobox _label="Country" _suggestions={COUNTRY_SUGGESTIONS} _value={value} _on={{ onChange: handleChange }} />
			<p>Selected value: {value || '–'}</p>
		</>
	);
};
