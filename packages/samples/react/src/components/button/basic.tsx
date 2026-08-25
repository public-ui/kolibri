import { KolButton } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { useToasterService } from '../../hooks/useToasterService';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const ButtonBasic: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>
					This story demonstrates the most important features of the KolButton component. It showcases the different button variants, icons, disabled state, and
					hidden labels.
				</p>
			</SampleDescription>

			<div className="grid gap-8">
				<SampleBlock id="variants" heading="Button Variants" fitContent>
					<div className="flex flex-wrap gap-4">
						<KolButton _icons="kolicon-house" _label="Primary" _variant="primary" onClick={dummyClickEventHandler} />
						<KolButton _icons="kolicon-kolibri" _label="Secondary" _variant="secondary" onClick={dummyClickEventHandler} />
						<KolButton _icons="kolicon-cogwheel" _label="Tertiary" _variant="tertiary" onClick={dummyClickEventHandler} />
						<KolButton _icons="kolicon-cogwheel" _label="Normal" _variant="normal" _on={dummyEventHandler} />
						<KolButton _icons="kolicon-alert-warning" _label="Danger" _variant="danger" _on={dummyEventHandler} />
						<KolButton _icons="kolicon-eye-closed" _label="Ghost" _variant="ghost" _on={dummyEventHandler} />
					</div>
				</SampleBlock>

				<SampleBlock id="disabled" heading="Disabled State" fitContent>
					<div className="flex flex-wrap gap-4">
						<KolButton _disabled _icons="kolicon-house" _label="Primary" _variant="primary" _on={dummyEventHandler} />
						<KolButton _disabled _icons="kolicon-kolibri" _label="Secondary" _variant="secondary" _on={dummyEventHandler} />
						<KolButton _disabled _icons="kolicon-alert-warning" _label="Danger" _variant="danger" _on={dummyEventHandler} />
					</div>
				</SampleBlock>

				<SampleBlock id="hide-label" heading="Hidden Label (Icon Only)" fitContent>
					<div className="flex flex-wrap gap-4">
						<KolButton _hideLabel _icons="kolicon-house" _label="Primary" _variant="primary" _on={dummyEventHandler} />
						<KolButton _hideLabel _icons="kolicon-kolibri" _label="Secondary" _variant="secondary" _on={dummyEventHandler} />
						<KolButton _hideLabel _icons="kolicon-alert-warning" _label="Danger" _variant="danger" _on={dummyEventHandler} />
					</div>
				</SampleBlock>

				<SampleBlock id="icon-positions" heading="Icon Positions" fitContent>
					<div className="flex flex-wrap gap-4">
						<KolButton
							_icons={{
								left: 'kolicon-chevron-left',
							}}
							_label="Icon Left"
							_on={dummyEventHandler}
						/>
						<KolButton
							_icons={{
								right: 'kolicon-chevron-right',
							}}
							_label="Icon Right"
							_on={dummyEventHandler}
						/>
						<KolButton
							_icons={{
								left: 'kolicon-chevron-left',
								right: 'kolicon-chevron-right',
							}}
							_label="Icons Both Sides"
							_on={dummyEventHandler}
						/>
					</div>
				</SampleBlock>
			</div>
		</>
	);
};
