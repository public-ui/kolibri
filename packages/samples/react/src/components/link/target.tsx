import React from 'react';

import { KolLink } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const LinkTarget: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample shows KolLink with different <code>_target</code>-properties.
			</p>
		</SampleDescription>

		<div className="text-base d-flex gap-4">
			<ul>
				<li>
					<KolLink _href="#/back-page" _label="Link without target" />
				</li>
				<li>
					<KolLink _href="#/back-page" _label="Link with target (_self)" _target="_self" />
				</li>
				<li>
					<KolLink _href="#/back-page" _label="Link with target (_blank)" _target="_blank" />
				</li>
				<li>
					<KolLink _href="#/back-page" _icons="codicon codicon-home" _hideLabel _label="Link without target" />
				</li>
				<li>
					<KolLink _href="#/back-page" _icons="codicon codicon-home" _hideLabel _label="Link with target (_self)" _target="_self" />
				</li>
				<li>
					<KolLink _href="#/back-page" _icons="codicon codicon-home" _hideLabel _label="Link with target (_blank)" _target="_blank" />
				</li>
			</ul>
		</div>
	</>
);
