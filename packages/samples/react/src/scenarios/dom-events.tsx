import type { FC } from 'react';
import { useState } from 'react';
import React from 'react';
import { SampleDescription } from '../components/SampleDescription';
import { KolButton, KolInputDate } from '@public-ui/react';

export const DomEvents: FC = () => {
	const [date, setDate] = useState<Date>(new Date());

	return (
		<>
			<SampleDescription>
				<p>(Temporary) scenario to experiment with DOM events on input components.</p>
			</SampleDescription>

			<KolInputDate
				_label="Date Input"
				_value={date}
				onInput={(event) => {
					setDate(event.target._value as Date);
				}}
			/>
			<KolButton
				_label="increase"
				_on={{
					onClick: () => {
						setDate(new Date(date.getTime() + 1000 * 60 * 60 * 24));
					},
				}}
			/>
			<pre>
				value: {JSON.stringify(date)} ({typeof date})
			</pre>
		</>
	);
};
