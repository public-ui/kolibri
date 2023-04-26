import React from 'react';
import { KolButton } from '@public-ui/react';

import { FC } from 'react';

const ARGS = {
	className: 'w-8rem',
	_on: {
		onClick: (_event, _value) => alert('Klick!'),
	},
};

export const ButtonWidth: FC = () => (
	<div className="grid gap-4">
		<div className="d-flex flex-warp gap-2">
			<KolButton _label="Primary" _variant="primary" {...ARGS}></KolButton>
			<KolButton _label="Secondary" _variant="secondary" {...ARGS}></KolButton>
			<KolButton _label="Normal" _variant="normal" {...ARGS}></KolButton>
			<KolButton _label="Danger" _variant="danger" {...ARGS}></KolButton>
			<KolButton _label="Ghost" _variant="ghost" {...ARGS}></KolButton>
		</div>
		<div className="d-flex flex-warp gap-2">
			<KolButton _disabled _label="Primary" _variant="primary" {...ARGS}></KolButton>
			<KolButton _disabled _label="Secondary" _variant="secondary" {...ARGS}></KolButton>
			<KolButton _disabled _label="Normal" _variant="normal" {...ARGS}></KolButton>
			<KolButton _disabled _label="Danger" _variant="danger" {...ARGS}></KolButton>
			<KolButton _disabled _label="Ghost" _variant="ghost" {...ARGS}></KolButton>
		</div>
	</div>
);
