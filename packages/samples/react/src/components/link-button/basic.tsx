import React from 'react';

import { KolLinkButton } from '@public-ui/react';

import type { FC } from 'react';

const ARGS = {
	_href: '#/back-page',
};

export const LinkButtonBasic: FC = () => (
	<div className="grid gap-14">
		<div className="flex flex-wrap gap-14">
			<KolLinkButton _label="Primary" _variant="primary" {...ARGS}></KolLinkButton>
			<KolLinkButton _label="Secondary" _variant="secondary" {...ARGS}></KolLinkButton>
			<KolLinkButton _label="Normal" _variant="normal" {...ARGS}></KolLinkButton>
			<KolLinkButton _label="Danger" _variant="danger" {...ARGS}></KolLinkButton>
			<KolLinkButton _label="Ghost" _variant="ghost" {...ARGS}></KolLinkButton>
		</div>
	</div>
);
