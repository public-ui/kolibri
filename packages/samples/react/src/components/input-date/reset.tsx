import React, { useRef } from 'react';
import { KolButton, KolInputDate } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const InputDateReset = () => {
	const dateRef = useRef(null);

	return (
		<>
			<SampleDescription>
				<p>
					This sample demonstrates the KolInputDate <code>reset</code>-Method, which can be used to clear the field, even when it holds incomplete or invalid
					values.
				</p>
			</SampleDescription>

			<KolInputDate ref={dateRef} _label="Resettable Input Date" _value="2024-02-10" />
			<KolButton className="mt" _label={'Reset'} _on={{ onClick: () => dateRef.current?.reset() }} />
		</>
	);
};
