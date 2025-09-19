import type { FC } from 'react';
import React from 'react';
import { KolButton } from '@public-ui/react-v19';
import { SampleDescription } from '../components/SampleDescription';

export const LongTooltip: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>
					This sample demonstrates how the tooltip adapts its width when containing long text inside a row-reverse flex container. The effect becomes visible
					when inspecting the layout with DevTools and reducing the available width (e.g. by narrowing the screen).
				</p>
			</SampleDescription>

			<div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
				<KolButton
					_icons="codicon codicon-home"
					_hideLabel
					_label="Das ist ein sehr sehr langer Tooltip-Text, der die Breite ausreizt."
					_variant="primary"
				></KolButton>
			</div>
		</>
	);
};
