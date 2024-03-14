import { KolButton } from '@public-ui/react';
import React from 'react';
import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const ButtonAccessKey: FC = () => (
	<>
		<SampleDescription>
			<p>Hier verstehe ich es nicht!</p>
		</SampleDescription>
		<div className="flex flex-wrap gap-4">
			<KolButton _label="Mit S access key" _accessKey="S"></KolButton>
			<KolButton _label="Sehr kleines s" _accessKey="s"></KolButton>
			<KolButton _label="Access key kommt nicht in label vor" _accessKey="x"></KolButton>
			<KolButton _label="access key ohne label" _hideLabel _accessKey="s" _icons="codicon codicon-dashboard"></KolButton>
			<KolButton
				_label="mit inline icons"
				_icons={{
					left: 'codicon codicon-dashboard',
					right: 'codicon codicon-dashboard',
				}}
				_accessKey="s"
			/>
		</div>
	</>
);
