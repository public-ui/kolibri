import { KolButton } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { useToasterService } from '../../hooks/useToasterService';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const ButtonHideLabel: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>
					This story demonstrates buttons with hidden labels. The label is still accessible to screen readers but visually hidden, showing only the icon. This
					is useful for icon-only buttons.
				</p>
			</SampleDescription>

			<div className="grid gap-8">
				<SampleBlock id="hide-label" heading="Buttons with Hidden Labels" fitContent>
					<div className="flex flex-wrap gap-4">
						<KolButton _hideLabel _icons="kolicon-house" _label="Home" _variant="primary" _on={dummyEventHandler} />
						<KolButton _hideLabel _icons="kolicon-kolibri" _label="Like" _variant="secondary" _on={dummyEventHandler} />
						<KolButton _hideLabel _icons="kolicon-cogwheel" _label="Subscribe" _variant="tertiary" _on={dummyEventHandler} />
						<KolButton _hideLabel _icons="kolicon-cogwheel" _label="Buy me a coffee" _variant="normal" _on={dummyEventHandler} />
						<KolButton _hideLabel _icons="kolicon-alert-warning" _label="Delete" _variant="danger" _on={dummyEventHandler} />
						<KolButton _hideLabel _icons="kolicon-eye-closed" _label="Settings" _variant="ghost" _on={dummyEventHandler} />
					</div>
				</SampleBlock>

				<SampleBlock id="comparison" heading="Comparison: With and Without Hidden Label" fitContent>
					<div className="flex flex-wrap gap-4">
						<KolButton _icons="kolicon-house" _label="Home" _variant="primary" _on={dummyEventHandler} />
						<KolButton _hideLabel _icons="kolicon-house" _label="Home" _variant="primary" _on={dummyEventHandler} />
					</div>
				</SampleBlock>

				<SampleBlock id="disabled" heading="Disabled with Hidden Label" fitContent>
					<div className="flex flex-wrap gap-4">
						<KolButton _disabled _hideLabel _icons="kolicon-house" _label="Home" _variant="primary" _on={dummyEventHandler} />
						<KolButton _disabled _hideLabel _icons="kolicon-kolibri" _label="Like" _variant="secondary" _on={dummyEventHandler} />
						<KolButton _disabled _hideLabel _icons="kolicon-cogwheel" _label="Subscribe" _variant="tertiary" _on={dummyEventHandler} />
						<KolButton _disabled _hideLabel _icons="kolicon-cogwheel" _label="Buy me a coffee" _variant="normal" _on={dummyEventHandler} />
						<KolButton _disabled _hideLabel _icons="kolicon-alert-warning" _label="Delete" _variant="danger" _on={dummyEventHandler} />
					</div>
				</SampleBlock>
			</div>
		</>
	);
};
