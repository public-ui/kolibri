import React from 'react';

import { KolButton } from '@public-ui/react';

import type { FC } from 'react';

const ARGS = {
	_icons: 'codicon codicon-home',
	_hideLabel: true,
	_on: {
		onClick: () => alert('Klick!'),
	},
};

export const ButtonIconOnly: FC = () => (
	<div className="grid gap-14">
		<div className="flex flex-wrap gap-14">
			<KolButton _label="Primary" _variant="primary" _tooltipAlign="top" {...ARGS}></KolButton>
			<KolButton _label="Secondary" _variant="secondary" _tooltipAlign="right" {...ARGS}></KolButton>
			<KolButton _label="Normal" _variant="normal" _tooltipAlign="bottom" {...ARGS}></KolButton>
			<KolButton _label="Danger" _variant="danger" _tooltipAlign="left" {...ARGS}></KolButton>
			<KolButton _label="Ghost" _variant="ghost" {...ARGS}></KolButton>
		</div>
		<div className="flex flex-wrap gap-14">
			<KolButton _disabled _label="Primary" _variant="primary" {...ARGS}></KolButton>
			<KolButton _disabled _label="Secondary" _variant="secondary" {...ARGS}></KolButton>
			<KolButton _disabled _label="Normal" _variant="normal" {...ARGS}></KolButton>
			<KolButton _disabled _label="Danger" _variant="danger" {...ARGS}></KolButton>
			<KolButton _disabled _label="Ghost" _variant="ghost" {...ARGS}></KolButton>
		</div>
	</div>
);
