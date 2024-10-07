import React from 'react';

import { KolButtonLink } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const ButtonLinkBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				KolButtonLink shows an element, that behaves like a button but looks like a link. The sample illustrates KolButtonLink with different display-properties
				such as <code>block</code>, <code>inline-block</code> and <code>inline</code>. It also demonstrates the disabled-state.
			</p>
		</SampleDescription>
		<section className="text-base">
			<p>
				In this paragraph, a link is inserted that contains no additional attributes. <KolButtonLink _label="Simple Link" /> It is rendered by default as an{' '}
				<strong>inline element</strong>.
			</p>
			<p>
				In this paragraph, a link is inserted that is rendered as an inline-block element.
				<KolButtonLink className="m-4" style={{ display: 'inline-block', border: '1px dotted' }} _label="Simple Link" />. This allows you to assign width,
				height, and other properties to it using CSS styles.
				<br />
				<br />
				After that, there is a link that is rendered as a block element.
				<KolButtonLink style={{ display: 'block' }} _label="Simple Link" />
				Therefore, I go over the entire width of the parent element to create a line break.
			</p>
			<p>
				<KolButtonLink _label="Disabled ButtonLink" _disabled />
			</p>
		</section>
	</>
);
