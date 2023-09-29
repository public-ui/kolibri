import React from 'react';
import { useFormikContext } from 'formik';
import { KolHeading } from '@public-ui/react';

export function Summary() {
	const { values } = useFormikContext();

	return (
		<>
			<KolHeading _level={2} _label="Zusammenfassung"></KolHeading>
			<pre>{JSON.stringify(values, null, 2)}</pre>
		</>
	);
}
