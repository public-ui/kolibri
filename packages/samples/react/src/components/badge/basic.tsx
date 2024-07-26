import React from 'react';
import { KolBadge } from '@public-ui/react';

import { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

const PROPS = {
	_label: 'Label',
};

export const BadgeBasic: FC = () => (
	<>
		<SampleDescription></SampleDescription>
		<div className="flex gap-2">
			<KolBadge {...PROPS}></KolBadge>
			<KolBadge _color="#86ffc6" {...PROPS}></KolBadge>
			<KolBadge _color="#06539e" {...PROPS}></KolBadge>
			<KolBadge _color="#ae0000" {...PROPS}></KolBadge>
			<KolBadge _color="#8b008b" {...PROPS}></KolBadge>
		</div>
	</>
);
