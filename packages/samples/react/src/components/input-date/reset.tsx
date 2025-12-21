import { KolButton, KolInputDate } from '@public-ui/react-v19';
import React, { useRef } from 'react';
import { SampleDescription } from '../SampleDescription';

export const InputDateReset = () => {
	type InputDateHandle = {
		reset: () => void;
	};
	const isInputDateHandle = (element: unknown): element is InputDateHandle => typeof (element as InputDateHandle)?.reset === 'function';

	const dateRef = useRef<unknown>(null);

	return (
		<>
			<SampleDescription>
				<p>
					This sample demonstrates the KolInputDate <code>reset</code>-Method, which can be used to clear the field, even when it holds incomplete or invalid
					values.
				</p>
			</SampleDescription>

			<KolInputDate className="w-full" ref={(element) => (dateRef.current = element)} _label="Resettable Input Date" _value="2024-02-10" />
			<KolButton
				className="mt"
				_label={'Reset'}
				_on={{
					onClick: () => {
						if (isInputDateHandle(dateRef.current)) {
							dateRef.current.reset();
						}
					},
				}}
			/>
		</>
	);
};
