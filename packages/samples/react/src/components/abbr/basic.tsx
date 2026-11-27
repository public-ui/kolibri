import React from 'react';

import { KolAbbr } from '@public-ui/react-v19';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';
export const AbbrBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolAbbr shows an abbreviation. With _label, the long form appears in a tooltip on hover and on focus.</p>
		</SampleDescription>

		<SampleBlock id="basic" fitContent>
			<p>
				The <KolAbbr _label="World Wide Web Consortium">W3C</KolAbbr> publishes the <KolAbbr _label="Web Content Accessibility Guidelines">WCAG</KolAbbr>, the
				reference for accessible websites.
			</p>
			<p>
				Short sentences help many readers, <KolAbbr _label="for example">e.&nbsp;g.</KolAbbr> people reading in a foreign language.
			</p>
			<p>
				Without a long form, <KolAbbr>HTML</KolAbbr> stays a plain abbreviation without a tooltip.
			</p>
		</SampleBlock>
	</>
);
