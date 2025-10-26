import type { FC } from 'react';
import React from 'react';

import { KolButton } from '@public-ui/react-v19';
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
					This sample demonstrates how tooltip animation duration and width can be customized via
					<code>--kolibri-tooltip-animation-duration</code> and <code>--kol-tooltip-width</code>.
				</p>
			</SampleDescription>

			<div className="flex justify-center items-center gap-4">
				<KolButton
					_label="Custom duration"
					_hideLabel
					style={{ '--kolibri-tooltip-animation-duration': '2500ms' }}
					_icons="codicon codicon-clock"
					_on={dummyEventHandler}
				></KolButton>
				<KolButton
					_label="Custom width"
					_hideLabel
					style={{ '--kol-tooltip-width': '400px' }}
					_icons="codicon codicon-arrow-both"
					_on={dummyEventHandler}
				></KolButton>
			</div>
		</>
	);
};
