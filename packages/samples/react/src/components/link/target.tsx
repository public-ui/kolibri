import React from 'react';

import { KolLink } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const LinkTarget: FC = () => (
	<>
		<SampleDescription>
			<p>Hier sind sechs Links mit verschiedenen beschriebenen Weiterleitungen.</p>
		</SampleDescription>
		<div className="d-flex gap-4">
			<KolLink _href="#/sample-page" _label="Ich bin ein Link ohne Target" />{' '}
			<KolLink _href="#/sample-page" _label="Ich bin ein Link mit Target (_self)" _target="_self" />{' '}
			<KolLink _href="#/sample-page" _label="Ich bin ein Link mit Target (_blank)" _target="_blank" />{' '}
			<KolLink _href="#/sample-page" _icons="codicon codicon-home" _hideLabel _label="Ich bin ein Link ohne Target" />{' '}
			<KolLink _href="#/sample-page" _icons="codicon codicon-home" _hideLabel _label="Ich bin ein Link mit Target (_self)" _target="_self" />{' '}
			<KolLink _href="#/sample-page" _icons="codicon codicon-home" _hideLabel _label="Ich bin ein Link mit Target (_blank)" _target="_blank" />
		</div>
	</>
);
