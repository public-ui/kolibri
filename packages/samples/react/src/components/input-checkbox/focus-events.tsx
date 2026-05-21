import { KolInputCheckbox } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useCallback, useState } from 'react';
import { SampleDescription } from '../SampleDescription';

export const InputCheckboxFocusEvents: FC = () => {
	const [events, setEvents] = useState<string[]>([]);

	const addEvent = useCallback((name: string) => {
		setEvents((prev) => [`${new Date().toISOString().slice(11, 23)} ${name}`, ...prev].slice(0, 8));
	}, []);

	return (
		<>
			<SampleDescription>
				<p>
					Clicking the label text while the checkbox is already focused must <strong>not</strong> fire a spurious{' '}
					<code>onBlur</code>. To verify the fix: focus the checkbox (Tab or first click), then click its label
					text again — the event log should show only <code>onChange</code>, <strong>not</strong>{' '}
					<code>onBlur</code> followed by <code>onFocus</code>.
				</p>
			</SampleDescription>
			<KolInputCheckbox
				_label="Accept terms and conditions"
				_on={{
					onFocus: () => addEvent('onFocus'),
					onBlur: () => addEvent('onBlur'),
					onChange: (_e: Event, v: unknown) => addEvent(`onChange → ${String(v)}`),
				}}
			/>
			<section style={{ marginTop: '1rem' }}>
				<p>
					<strong>Event log (newest first):</strong>
				</p>
				{events.length === 0 ? (
					<p>No events yet.</p>
				) : (
					<ol style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
						{events.map((entry, i) => (
							<li key={i}>{entry}</li>
						))}
					</ol>
				)}
			</section>
		</>
	);
};
