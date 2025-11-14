import React from 'react';
import type { FC } from 'react';
import { KolButton, KolHeading } from '@public-ui/react-v19';
import { useToasterService } from '../../../hooks/useToasterService';
import { SampleDescription } from '../../SampleDescription';

export const ButtonStoryExpertSlot: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>
					This story demonstrates the expert slot feature of KolButton. The expert slot allows you to insert custom content into the button,
					providing advanced customization options beyond the standard label and icon properties.
				</p>
			</SampleDescription>

			<div className="grid gap-8">
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Buttons with Expert Slot Content" />
					<div className="flex flex-wrap gap-4">
						<KolButton _icons="codicon codicon-home" _label="" _variant="primary" _on={dummyEventHandler}>
							<span slot="expert">I am more than just a button</span>
						</KolButton>
						<KolButton _icons="codicon codicon-heart" _label="" _variant="secondary" _on={dummyEventHandler}>
							<span slot="expert">Custom content here</span>
						</KolButton>
						<KolButton _icons="codicon codicon-trash" _label="" _variant="danger" _on={dummyEventHandler}>
							<span slot="expert">Delete with custom text</span>
						</KolButton>
					</div>
				</section>

				<section className="grid gap-4">
					<KolHeading _level={2} _label="Disabled Buttons with Expert Slot" />
					<div className="flex flex-wrap gap-4">
						<KolButton _disabled _icons="codicon codicon-home" _label="" _variant="primary" _on={dummyEventHandler}>
							<span slot="expert">Disabled expert slot</span>
						</KolButton>
						<KolButton _disabled _icons="codicon codicon-reactions" _label="" _variant="ghost" _on={dummyEventHandler}>
							<span slot="expert">Another disabled one</span>
						</KolButton>
					</div>
				</section>
			</div>
		</>
	);
};
