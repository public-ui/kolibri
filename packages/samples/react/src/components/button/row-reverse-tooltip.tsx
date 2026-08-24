import { KolButton } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const ButtonRowReverseTooltip: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>
					This story demonstrates how the tooltip adapts its width when containing long text inside a row-reverse flex container. The effect becomes visible
					when inspecting the layout with DevTools and reducing the available width (e.g., by narrowing the screen).
				</p>
			</SampleDescription>

			<div className="grid gap-8">
				<SampleBlock id="button-row-reverse-container" heading="Button in Row-Reverse Container">
					<div className="flex flex-row-reverse">
						<KolButton _icons="kolicon-house" _hideLabel _label="This is a very, very long tooltip text that exceeds the width." _variant="primary" />
					</div>
				</SampleBlock>
			</div>
		</>
	);
};
