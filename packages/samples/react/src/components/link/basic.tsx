import type { FC } from 'react';
import React from 'react';

import { KolLink, KolHeading } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

export const LinkBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				KolLink renders a link. This sample shows disabled links, links with hidden label and links with different CSS <code>display</code>-properties.
			</p>
		</SampleDescription>

		<KolHeading _level={2} _label="Links with variant 'standalone'" />

		<div className="grid gap-4 w-fit">
			<KolLink _href="#/back-page" _label="Simple Link" _variant="standalone" />
			<KolLink _disabled _href="#/back-page" _label="Simple Link (disabled)" _variant="standalone" />
			<KolLink _hideLabel _icons="codicon codicon-home" _href="#/back-page" _label="Icon Link" _variant="standalone" />
			<KolLink _disabled _hideLabel _icons="codicon codicon-home" _href="#/back-page" _label="Icon Link (disabled)" _variant="standalone" />
		</div>

		<div className="grid gab-4">
			<KolHeading _level={2} _label="Links with variant 'inline'" />
			<p>
				In this paragraph, a link is inserted that contains no additional attributes. <KolLink _href="#/back-page" _label="Simple Link" /> It is rendered by
				default as a <strong>inline element</strong>.
			</p>
			<p>
				In this paragraph, a link is inserted that is rendered as an inline-block element.{' '}
				<KolLink class="d-inline-block" _accessKey="S" _href="#/back-page" _label="Simple Link" />. This allows you to assign width, height, and other
				properties to it using CSS styles.
				<br />
				<br />
				After that, there is a link that is rendered as a block element. <KolLink class="d-block" _href="#/back-page" _label="Simple Link" />, therefore, I span
				the entire width of the parent element, causing a line break.
			</p>
		</div>
	</>
);
