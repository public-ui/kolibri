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
						<KolButton _icons="codicon codicon-home" _label="Primary" _variant="primary" _on={dummyEventHandler} />
						<KolButton _icons="codicon codicon-heart" _label="Secondary" _variant="secondary" _on={dummyEventHandler} />
						<KolButton _icons="codicon codicon-hubot" _label="Tertiary" _variant="tertiary" _on={dummyEventHandler} />
						<KolButton _icons="codicon codicon-hubot" _label="Normal" _variant="normal" _on={dummyEventHandler} />
						<KolButton _icons="codicon codicon-trash" _label="Danger" _variant="danger" _on={dummyEventHandler} />
						<KolButton _icons="codicon codicon-reactions" _label="Ghost" _variant="ghost" _on={dummyEventHandler} />
					</div>
				</section>

				{/* Disabled State */}
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Disabled State" />
					<div className="flex flex-wrap gap-4">
						<KolButton _disabled _icons="codicon codicon-home" _label="Primary" _variant="primary" _on={dummyEventHandler} />
						<KolButton _disabled _icons="codicon codicon-heart" _label="Secondary" _variant="secondary" _on={dummyEventHandler} />
						<KolButton _disabled _icons="codicon codicon-trash" _label="Danger" _variant="danger" _on={dummyEventHandler} />
					</div>
				</section>

				{/* Hidden Label */}
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Hidden Label (Icon Only)" />
					<div className="flex flex-wrap gap-4">
						<KolButton _hideLabel _icons="codicon codicon-home" _label="Primary" _variant="primary" _on={dummyEventHandler} />
						<KolButton _hideLabel _icons="codicon codicon-heart" _label="Secondary" _variant="secondary" _on={dummyEventHandler} />
						<KolButton _hideLabel _icons="codicon codicon-trash" _label="Danger" _variant="danger" _on={dummyEventHandler} />
					</div>
				</section>

				{/* Icon Positions */}
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Icon Positions" />
					<div className="flex flex-wrap gap-4">
						<KolButton
							_icons={{
								left: 'codicon codicon-arrow-left',
							}}
							_label="Icon Left"
							_on={dummyEventHandler}
						/>
						<KolButton
							_icons={{
								right: 'codicon codicon-arrow-right',
							}}
							_label="Icon Right"
							_on={dummyEventHandler}
						/>
						<KolButton
							_icons={{
								left: 'codicon codicon-arrow-left',
								right: 'codicon codicon-arrow-right',
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
