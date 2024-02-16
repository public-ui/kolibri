import React from 'react';

import { KolBadge } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';

export const BadgeBasic: FC = () => (
	<>
		<SampleDescription>
			<p>Hier werden verschiedenfarbige Badges angezeigt</p>
		</SampleDescription>
		<div className="flex gap-2">
			<KolBadge _label="schwarz"></KolBadge>
			<KolBadge _color="#86ffc6" _label="türkis"></KolBadge>
			<KolBadge _color="#06539e" _label="blau"></KolBadge>
			<KolBadge _color="#ae0000" _label="rot"></KolBadge>
			<KolBadge _color="#8b008b" _label="lila"></KolBadge>
		</div>
	</>
);
