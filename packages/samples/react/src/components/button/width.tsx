import React from 'react';
import { KolButton } from '@public-ui/react';

import { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

const ARGS = {
	className: 'w-8rem',
	_on: {
		onClick: () => alert('Klick!'),
	},
};

export const ButtonWidth: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolButton with adjusted widths.</p>
		</SampleDescription>

		<div className="grid gap-14">
			<div className="flex flex-warp gap-14">
				<KolButton _label="Primary" _variant="primary" {...ARGS}></KolButton>
				<KolButton _label="Secondary" _variant="secondary" {...ARGS}></KolButton>
				<KolButton _label="Normal" _variant="normal" {...ARGS}></KolButton>
				<KolButton _label="Danger" _variant="danger" {...ARGS}></KolButton>
				<KolButton _label="Ghost" _variant="ghost" {...ARGS}></KolButton>
			</div>
			<div className="flex flex-warp gap-14">
				<KolButton _disabled _label="Primary" _variant="primary" {...ARGS}></KolButton>
				<KolButton _disabled _label="Secondary" _variant="secondary" {...ARGS}></KolButton>
				<KolButton _disabled _label="Normal" _variant="normal" {...ARGS}></KolButton>
				<KolButton _disabled _label="Danger" _variant="danger" {...ARGS}></KolButton>
				<KolButton _disabled _label="Ghost" _variant="ghost" {...ARGS}></KolButton>
			</div>
		</div>
	</>
);
