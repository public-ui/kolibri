import React from 'react';

import { KolButtonLink } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const ButtonLinkIcons: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolButtonLink with icons in different locations.</p>
		</SampleDescription>

		<SampleBlock id="left" fitContent>
			<KolButtonLink _icons="kolicon-house" _label="I am a link with an icon on the left" />
		</SampleBlock>
		<SampleBlock id="right" fitContent>
			<KolButtonLink
				_icons={{
					right: 'kolicon-house',
				}}
				_label="I am a link with an icon on the right"
			/>
		</SampleBlock>
		<SampleBlock id="top" fitContent>
			<KolButtonLink
				_icons={{
					top: 'kolicon-house',
				}}
				_label="I am a link with an icon at the top"
			/>
		</SampleBlock>
		<SampleBlock id="bottom" fitContent>
			<KolButtonLink
				_icons={{
					bottom: 'kolicon-house',
				}}
				_label="I am a link with icon below"
			/>
		</SampleBlock>
		<SampleBlock id="all" fitContent>
			<KolButtonLink
				_icons={{
					top: 'kolicon-house',
					right: 'kolicon-house',
					bottom: 'kolicon-house',
					left: 'kolicon-house',
				}}
				_label="I am a link with all icons"
			/>
		</SampleBlock>
		<SampleBlock id="hide-label" fitContent>
			<KolButtonLink _icons="kolicon-house" _hideLabel _label="I am a link with icon only" />
		</SampleBlock>
	</>
);
