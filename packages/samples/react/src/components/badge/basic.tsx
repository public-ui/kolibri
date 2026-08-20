import React from 'react';

import { KolBadge } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';

export const BadgeBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolBadge shows badges with a label, background color and optional icon.</p>
		</SampleDescription>

		<div className="flex flex-wrap gap-2" data-visual-block="basic">
			<KolBadge _label="black"></KolBadge>
			<KolBadge _color="#86ffc6" _label="teal"></KolBadge>
			<KolBadge _color="#06539e" _label="blue"></KolBadge>
			<KolBadge _color="#ae0000" _label="red with icon" _icons="kolicon-house"></KolBadge>
			<KolBadge _color="#8b008b" _label="purple with icon" _icons="kolicon-kolibri"></KolBadge>
		</div>
	</>
);
