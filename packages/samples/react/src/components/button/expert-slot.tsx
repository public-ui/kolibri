import type { FC } from 'react';
import React from 'react';
import { KolButton, KolHeading } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { useToasterService } from '../../hooks/useToasterService';

export const ButtonExpertSlot: FC = () => {
	const { dummyClickEventHandler } = useToasterService();
	const dummyEventHandler = { onClick: dummyClickEventHandler };
	const examples: { label: string; props: { _disabled?: boolean; _hideLabel?: boolean } }[] = [
		{ label: 'Button', props: {} },
		{ label: 'Button (disabled)', props: { _disabled: true } },
		{ label: 'Button (hideLabel)', props: { _hideLabel: true } },
		{ label: 'Button (disabled, hideLabel)', props: { _disabled: true, _hideLabel: true } },
	];
	const expert = <span slot="expert">I am more than just a button</span>;
	return (
		<>
			<SampleDescription>
				<p>KolButton show a button-element with expert slot.</p>
			</SampleDescription>
			<div className="grid gap-8">
				{examples.map(({ label, props }, index) => (
					<section key={index} className="grid gap-4">
						<KolHeading _level={2} _label={label} />
						<div className="flex flex-wrap gap-4">
							<KolButton _label="" _icons="codicon codicon-home" _variant="primary" _on={dummyEventHandler} {...props}>
								{expert}
							</KolButton>
							<KolButton _label="" _icons="codicon codicon-heart" _variant="secondary" _on={dummyEventHandler} {...props}>
								{expert}
							</KolButton>
							<KolButton _label="" _icons="codicon codicon-hubot" _variant="tertiary" _on={dummyEventHandler} {...props}>
								{expert}
							</KolButton>
							<KolButton _label="" _icons="codicon codicon-hubot" _variant="normal" _on={dummyEventHandler} {...props}>
								{expert}
							</KolButton>
							<KolButton _label="" _icons="codicon codicon-trash" _variant="danger" _on={dummyEventHandler} {...props}>
								{expert}
							</KolButton>
							<KolButton _label="" _icons="codicon codicon-reactions" _variant="ghost" _on={dummyEventHandler} {...props}>
								{expert}
							</KolButton>
						</div>
					</section>
				))}
			</div>
		</>
	);
};
