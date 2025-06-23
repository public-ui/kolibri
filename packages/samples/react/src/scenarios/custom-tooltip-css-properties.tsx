import type { FC } from 'react';
import React from 'react';

import { KolButton } from '@public-ui/react';
import { SampleDescription } from '../components/SampleDescription';
import { useToasterService } from '../hooks/useToasterService';

export const CustomTooltipCssProperties: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>
					This sample demonstrates how the tooltip animation duration can be changed using the CSS custom property
					<code>--kolibri-tooltip-animation-duration</code>.
				</p>
			</SampleDescription>
			<KolButton
				_label="Tooltip with long animation delay (2000ms)"
				_hideLabel
				style={{
					'--kolibri-tooltip-animation-delay': '2000ms',
				}}
				_icons="codicon codicon-history"
				_on={dummyEventHandler}
			/>

			<SampleDescription>
				<p>
					This sample demonstrates how the tooltip animation duration can be changed using the CSS custom property
					<code>--kolibri-tooltip-animation-duration</code>.
				</p>
			</SampleDescription>
			<KolButton
				_label="Tooltip with custom duration (5000ms)"
				_hideLabel
				style={{
					'--kolibri-tooltip-animation-duration': '5000ms',
				}}
				_icons="codicon codicon-history"
				_on={dummyEventHandler}
			/>

			<SampleDescription>
				<p>
					This sample demonstrates how a tooltip&apos;s width can be adjusted by defining the CSS custom property <code>--kolibri-tooltip-width</code> on one of
					the parent elements.
				</p>
			</SampleDescription>
			<KolButton
				_label="Tooltip with fixed width (400px)"
				_hideLabel
				style={{ '--kolibri-tooltip-width': '400px' }}
				_icons="codicon codicon-reactions"
				_on={dummyEventHandler}
			></KolButton>
		</>
	);
};
