import React from 'react';
import { KolLinkButton } from '@public-ui/react';

import { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

const ARGS = {
	_href: '#/back-page',
};

export const LinkButtonBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolLinkButton renders a link that looks like a button. The sample shows the different styling variants.</p>
		</SampleDescription>
		<div className="grid gap-14">
			<div className="flex flex-warp gap-14">
				<KolLinkButton _label="Primary" _variant="primary" {...ARGS}></KolLinkButton>
				<KolLinkButton _label="Secondary" _variant="secondary" {...ARGS}></KolLinkButton>
				<KolLinkButton _label="Normal" _variant="normal" {...ARGS}></KolLinkButton>
				<KolLinkButton _label="Danger" _variant="danger" {...ARGS}></KolLinkButton>
				<KolLinkButton _label="Ghost" _variant="ghost" {...ARGS}></KolLinkButton>
			</div>
		</div>
	</>
);
