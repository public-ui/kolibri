import { KolButton, KolHeading } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { useToasterService } from '../../../hooks/useToasterService';
import { SampleDescription } from '../../SampleDescription';

export const ButtonStoryDisabled: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>This story demonstrates the disabled state of buttons. Disabled buttons are not clickable and appear visually dimmed.</p>
			</SampleDescription>

			<div className="grid gap-8">
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Disabled Buttons" />
					<div className="flex flex-wrap gap-4">
						<KolButton _disabled _icons="codicon codicon-home" _label="Primary" _variant="primary" _on={dummyEventHandler} />
						<KolButton _disabled _icons="codicon codicon-heart" _label="Secondary" _variant="secondary" _on={dummyEventHandler} />
						<KolButton _disabled _icons="codicon codicon-hubot" _label="Tertiary" _variant="tertiary" _on={dummyEventHandler} />
						<KolButton _disabled _icons="codicon codicon-hubot" _label="Normal" _variant="normal" _on={dummyEventHandler} />
						<KolButton _disabled _icons="codicon codicon-trash" _label="Danger" _variant="danger" _on={dummyEventHandler} />
						<KolButton _disabled _icons="codicon codicon-reactions" _label="Ghost" _variant="ghost" _on={dummyEventHandler} />
					</div>
				</section>

				<section className="grid gap-4">
					<KolHeading _level={2} _label="Comparison: Enabled vs Disabled" />
					<div className="flex flex-wrap gap-4">
						<KolButton _icons="codicon codicon-home" _label="Enabled" _variant="primary" _on={dummyEventHandler} />
						<KolButton _disabled _icons="codicon codicon-home" _label="Disabled" _variant="primary" _on={dummyEventHandler} />
					</div>
				</section>
			</div>
		</>
	);
};
