import { KolButton } from '@public-ui/react';
import React from 'react';
import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';
import { useToasterService } from '../../hooks/useToasterService';

export const ButtonShortKey: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>This sample shows KolButton with short key. The access keys can be used to trigger the buttons using the keyboard.</p>
			</SampleDescription>

			<div className="flex flex-wrap gap-4">
				<KolButton _label="With S access key" _shortKey="S" _on={dummyEventHandler}></KolButton>
				<KolButton _label="Very small s" _shortKey="s" _on={dummyEventHandler}></KolButton>
				<KolButton _label="Access key does not appear in label" _shortKey="x" _on={dummyEventHandler}></KolButton>
				<KolButton _label="access key without label" _hideLabel _shortKey="s" _icons="codicon codicon-dashboard" _on={dummyEventHandler}></KolButton>
				<KolButton
					_label="with inline icons"
					_icons={{
						left: 'codicon codicon-dashboard',
						right: 'codicon codicon-dashboard',
					}}
					_shortKey="s"
				/>
			</div>
		</>
	);
};
