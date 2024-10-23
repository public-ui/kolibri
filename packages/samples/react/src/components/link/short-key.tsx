import type { FC } from 'react';
import React from 'react';

import { KolLink } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const LinkShortKey: FC = () => (
	<>
		<SampleDescription>
			<p>
				<p>This sample shows KolLink with short key. The access keys can be used to trigger the buttons using the keyboard.</p>
			</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolLink _href="#/back-page" _label="With S short key" _shortKey="S" />
			<KolLink _href="#/back-page" _label="Very small s" _shortKey="s" />
			<KolLink _href="#/back-page" _label="Short key does not appear in label" _shortKey="s" />
			<KolLink _hideLabel _icons="codicon codicon-home" _href="#/back-page" _label="short key without label" _shortKey="s" />
		</div>
	</>
);
