import { KolButton, KolHeading } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { useToasterService } from '../../hooks/useToasterService';
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
				{/* Button Variants */}
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Button Variants" />
					<div className="flex flex-wrap gap-4">
						<KolButton _icons="kolicon-house" _label="Primary" _variant="primary" onClick={dummyClickEventHandler} />
						<KolButton _icons="kolicon-kolibri" _label="Secondary" _variant="secondary" onClick={dummyClickEventHandler} />
						<KolButton _icons="kolicon-cogwheel" _label="Tertiary" _variant="tertiary" onClick={dummyClickEventHandler} />
						<KolButton _icons="kolicon-cogwheel" _label="Normal" _variant="normal" _on={dummyEventHandler} />
						<KolButton _icons="kolicon-alert-warning" _label="Danger" _variant="danger" _on={dummyEventHandler} />
						<KolButton _icons="kolicon-eye-closed" _label="Ghost" _variant="ghost" _on={dummyEventHandler} />
					</div>
				</section>

				{/* Disabled State */}
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Disabled State" />
					<div className="flex flex-wrap gap-4">
						<KolButton _disabled _icons="kolicon-house" _label="Primary" _variant="primary" _on={dummyEventHandler} />
						<KolButton _disabled _icons="kolicon-kolibri" _label="Secondary" _variant="secondary" _on={dummyEventHandler} />
						<KolButton _disabled _icons="kolicon-alert-warning" _label="Danger" _variant="danger" _on={dummyEventHandler} />
					</div>
				</section>

				{/* Hidden Label */}
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Hidden Label (Icon Only)" />
					<div className="flex flex-wrap gap-4">
						<KolButton _hideLabel _icons="kolicon-house" _label="Primary" _variant="primary" _on={dummyEventHandler} />
						<KolButton _hideLabel _icons="kolicon-kolibri" _label="Secondary" _variant="secondary" _on={dummyEventHandler} />
						<KolButton _hideLabel _icons="kolicon-alert-warning" _label="Danger" _variant="danger" _on={dummyEventHandler} />
					</div>
				</section>

				{/* Icon Positions */}
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Icon Positions" />
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
				</section>
			</div>
		</>
	);
};
