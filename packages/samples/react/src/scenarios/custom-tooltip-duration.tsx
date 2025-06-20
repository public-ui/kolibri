import type { FC } from 'react';
import React from 'react';

import { KolButton } from '@public-ui/react';
import { SampleDescription } from '../components/SampleDescription';
import { useToasterService } from '../hooks/useToasterService';

export const CustomTooltipDuration: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>
					This sample demonstrates how the tooltip animation duration can be changed using the CSS custom properties{' '}
					<code>--kolibri-tooltip-transition-duration</code>.
				</p>
			</SampleDescription>

			<KolButton
				_label="Custom duration"
				_hideLabel
				style={{
					'--kolibri-tooltip-transition-duration': '2500ms',
				}}
				_icons="codicon codicon-history"
				_on={dummyEventHandler}
			></KolButton>
		</>
	);
};
