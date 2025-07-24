import type { FC } from 'react';
import React from 'react';
import { KolButton, KolHeading } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { useToasterService } from '../../hooks/useToasterService';

export const ButtonBasic: FC = () => {
	const { dummyClickEventHandler } = useToasterService();
	const dummyEventHandler = { onClick: dummyClickEventHandler };
	const examples: { label: string; props: { _disabled?: boolean; _hideLabel?: boolean } }[] = [
		{ label: 'Button', props: {} },
		{ label: 'Button (disabled)', props: { _disabled: true } },
		{ label: 'Button (hideLabel)', props: { _hideLabel: true } },
		{ label: 'Button (disabled, hideLabel)', props: { _disabled: true, _hideLabel: true } },
	];
	return (
		<>
			<SampleDescription>
				<p>
					KolButton shows a button-element. This sample demonstrates the basic usage with its different styling variants, icons, disabled state and hidden
					labels.
				</p>
			</SampleDescription>
			<div className="grid gap-8">
				{examples.map(({ label, props }, index) => (
					<section key={index} className="grid gap-4">
						<KolHeading _level={2} _label={label} />
						<div className="flex flex-wrap gap-4">
							<KolButton _icons="codicon codicon-home" _label="Primary" _variant="primary" _on={dummyEventHandler} {...props} />
							<KolButton _icons="codicon codicon-heart" _label="Secondary" _variant="secondary" _on={dummyEventHandler} {...props} />
							<KolButton _icons="codicon codicon-hubot" _label="Tertiary" _variant="tertiary" _on={dummyEventHandler} {...props} />
							<KolButton _icons="codicon codicon-hubot" _label="Normal" _variant="normal" _on={dummyEventHandler} {...props} />
							<KolButton _icons="codicon codicon-trash" _label="Danger" _variant="danger" _on={dummyEventHandler} {...props} />
							<KolButton _icons="codicon codicon-reactions" _label="Ghost" _variant="ghost" _on={dummyEventHandler} {...props} />
						</div>
					</section>
				))}
			</div>
		</>
	);
};
