import { KolButton, KolLink } from '@public-ui/react';
import React from 'react';
import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';
import { useToasterService } from '../../hooks/useToasterService';

export const ButtonAccessKey: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>
					This sample shows KolButton with{' '}
					<KolLink _label="access keys" _href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey" _target="blank" />. The access
					keys can be used to trigger the buttons using the keyboard.
				</p>
			</SampleDescription>

			<div className="flex flex-wrap gap-4">
				<KolButton _label="With S access key" _accessKey="S" _on={dummyEventHandler}></KolButton>
				<KolButton _label="Very small s" _accessKey="s" _on={dummyEventHandler}></KolButton>
				<KolButton _label="Access key does not appear in label" _accessKey="x" _on={dummyEventHandler}></KolButton>
				<KolButton _label="access key without label" _hideLabel _accessKey="s" _icons="codicon codicon-dashboard" _on={dummyEventHandler}></KolButton>
				<KolButton
					_label="with inline icons"
					_icons={{
						left: 'codicon codicon-dashboard',
						right: 'codicon codicon-dashboard',
					}}
					_accessKey="s"
				/>
			</div>
		</>
	);
};
