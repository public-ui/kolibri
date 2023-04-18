import React from 'react';
import { KolLinkButton } from '@public-ui/react';

import { FC } from 'react';

const ARGS = {
	_on: {
		onClick: (_event, _value) => alert('Klick!'),
	},
};

export const LinkButtonBasic: FC = () => (
	<div className="grid gap-4">
		<div className="d-flex flex-warp gap-2">
			<KolLinkButton _label="Primary" _variant="primary" {...ARGS}></KolLinkButton>
			<KolLinkButton _label="Secondary" _variant="secondary" {...ARGS}></KolLinkButton>
			<KolLinkButton _label="Normal" _variant="normal" {...ARGS}></KolLinkButton>
			<KolLinkButton _label="Danger" _variant="danger" {...ARGS}></KolLinkButton>
			<KolLinkButton _label="Ghost" _variant="ghost" {...ARGS}></KolLinkButton>
		</div>
	</div>
);
