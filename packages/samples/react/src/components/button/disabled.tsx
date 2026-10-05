import { KolButton } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { useAlert } from '../../hooks/useAlert';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const ButtonDisabled: FC = () => {
	const { dummyClickEventHandler } = useAlert();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>This story demonstrates the disabled state of buttons. Disabled buttons are not clickable and appear visually dimmed.</p>
			</SampleDescription>

			<div className="grid gap-8">
				<SampleBlock id="disabled" heading="Disabled Buttons" fitContent>
					<div className="flex flex-wrap gap-4">
						<KolButton _disabled _icons="kolicon-house" _label="Primary" _variant="primary" _on={dummyEventHandler} />
						<KolButton _disabled _icons="kolicon-kolibri" _label="Secondary" _variant="secondary" _on={dummyEventHandler} />
						<KolButton _disabled _icons="kolicon-cogwheel" _label="Tertiary" _variant="tertiary" _on={dummyEventHandler} />
						<KolButton _disabled _icons="kolicon-cogwheel" _label="Normal" _variant="normal" _on={dummyEventHandler} />
						<KolButton _disabled _icons="kolicon-alert-warning" _label="Danger" _variant="danger" _on={dummyEventHandler} />
						<KolButton _disabled _icons="kolicon-eye-closed" _label="Ghost" _variant="ghost" _on={dummyEventHandler} />
					</div>
				</SampleBlock>

				<SampleBlock id="comparison" heading="Comparison: Enabled vs Disabled" fitContent>
					<div className="flex flex-wrap gap-4">
						<KolButton _icons="kolicon-house" _label="Enabled" _variant="primary" _on={dummyEventHandler} />
						<KolButton _disabled _icons="kolicon-house" _label="Disabled" _variant="primary" _on={dummyEventHandler} />
					</div>
				</SampleBlock>
			</div>
		</>
	);
};
