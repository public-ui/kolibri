import type { FC } from 'react';
import React from 'react';

import { KolButton } from '@public-ui/react-v19';
import { SampleDescription } from '../components/SampleDescription';
import { useAlert } from '../hooks/useAlert';

export const CustomTooltipCssProperties: FC = () => {
	const { dummyClickEventHandler } = useAlert();

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
					_icons="fa-solid fa-clock"
					_on={dummyEventHandler}
				></KolButton>
				<KolButton _label="Custom width" _hideLabel style={{ '--kol-tooltip-width': '400px' }} _icons="kolicon-chevron-up" _on={dummyEventHandler}></KolButton>
			</div>
		</>
	);
};
