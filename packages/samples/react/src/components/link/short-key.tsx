import type { FC } from 'react';
import React from 'react';

import { KolLink } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const LinkShortKey: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample shows KolButton with short key without functionality. The short key is purely visual. Its functionality needs to be developed separately.{' '}
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
