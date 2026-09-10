import { KolButtonLink, KolHeading } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { useAlert } from '../../hooks/useAlert';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const ButtonLinkBasic: FC = () => {
	const { dummyClickEventHandler } = useAlert();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};
	return (
		<>
			<SampleDescription>
				<p>
					KolButtonLink shows an element, that behaves like a button but looks like a link. The sample illustrates KolButtonLink with different
					display-properties such as <code>block</code>, <code>inline-block</code> and <code>inline</code>. It also demonstrates the disabled-state.
				</p>
			</SampleDescription>
			<KolHeading _level={2} _label="Button-Link with _inline" />

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

			<KolHeading _level={2} _label="Button-Link with _inline={false}" />

			<p>Use the boolean _inline property to render the link inline (default) or standalone.</p>

			<SampleBlock id="basic" className="flex flex-col gap-2" fitContent>
				<KolButtonLink _label="Standalone ButtonLink" _inline={false} _on={dummyEventHandler} />
			</SampleBlock>
			<SampleBlock id="disabled" className="flex flex-col gap-2" fitContent>
				<KolButtonLink _label="Disabled ButtonLink" _disabled _inline={false} />
			</SampleBlock>
			<SampleBlock id="access-key" className="flex flex-col gap-2" fitContent>
				<KolButtonLink _label="With access key" _accessKey="c" _inline={false} _on={dummyEventHandler} />
			</SampleBlock>
			<SampleBlock id="short-key" className="flex flex-col gap-2" fitContent>
				<KolButtonLink _label="With short key" _shortKey="s" _inline={false} _on={dummyEventHandler} />
			</SampleBlock>
			<SampleBlock id="variant" className="flex flex-col gap-2" fitContent>
				<KolButtonLink _label="Special Variant ButtonLink" _variant="theme-link" />
			</SampleBlock>
		</>
	);
};
