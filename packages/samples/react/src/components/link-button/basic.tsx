import React from 'react';

import { KolLinkButton } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

const ARGS = {
	_href: '#/back-page',
};

export const LinkButtonBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolLinkButton renders a link that looks like a button. The sample shows the different styling variants.</p>
		</SampleDescription>

		<div className="flex flex-wrap gap-2">
			<KolLinkButton _label="Primary" _variant="primary" {...ARGS}></KolLinkButton>
			<KolLinkButton _label="Secondary" _variant="secondary" {...ARGS}></KolLinkButton>
			<KolLinkButton _label="Normal" _variant="normal" {...ARGS}></KolLinkButton>
			<KolLinkButton _label="Danger" _variant="danger" {...ARGS}></KolLinkButton>
			<KolLinkButton _label="Ghost" _variant="ghost" {...ARGS}></KolLinkButton>
			<KolLinkButton _label="Access Key" _variant="primary" _accessKey="c" {...ARGS}></KolLinkButton>
			<KolLinkButton _label="Short Key" _variant="primary" _shortKey="s" {...ARGS}></KolLinkButton>
		</div>
	</>
);
