import type { FC } from 'react';
import React from 'react';

import { KolLink } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const LinkAccessKey: FC = () => (
	<>
		<SampleDescription>
			<p>
				<p>This sample shows KolLink with access key. The access keys can be used to trigger the buttons using the keyboard.</p>
			</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolLink _href="#/back-page" _label="With S access key" _accessKey="S" />
			<KolLink _href="#/back-page" _label="Very small s" _accessKey="s" />
			<KolLink _href="#/back-page" _label="Access key does not appear in label" _accessKey="s" />
			<KolLink _hideLabel _icons="codicon codicon-home" _href="#/back-page" _label="access key without label" _accessKey="s" />
		</div>
	</>
);
