import React from 'react';

import { KolAccordion, KolAlert, KolButton, KolInputText, KolLink, KolTabs } from '@public-ui/react-v19';
import { SampleBlock } from '../components/SampleBlock';
import { SampleDescription } from '../components/SampleDescription';

import type { FC } from 'react';

export const LabelLang: FC = () => {
	const tabs = [
		{
			_label: [{ text: 'Acquirer', lang: 'en' }, { text: '-Gutschrift' }],
		},
		{
			_label: 'Second Tab',
		},
	];

	return (
		<>
			<SampleDescription>
				<p>Label can use additional language attributes for screenreaders.</p>
			</SampleDescription>

			<div className="grid gap-4">
				<SampleBlock id="label-lang-accordion">
					<KolAccordion _label={[{ text: 'Acquirer', lang: 'en' }, { text: '-Gutschrift' }]}>
						<p>Contents Accordion</p>
					</KolAccordion>
				</SampleBlock>
				<SampleBlock id="label-lang-alert">
					<KolAlert _label={[{ text: 'Acquirer', lang: 'en' }, { text: '-Gutschrift' }]}>This is the text of the alert.</KolAlert>
				</SampleBlock>
				<SampleBlock id="label-lang-button">
					<KolButton _label={[{ text: 'Acquirer', lang: 'en' }, { text: '-Gutschrift' }]} />
				</SampleBlock>
				<SampleBlock id="label-lang-input">
					<KolInputText _label={[{ text: 'Acquirer', lang: 'en' }, { text: '-Gutschrift' }]} />
				</SampleBlock>
				<SampleBlock id="label-lang-link">
					<KolLink _label={[{ text: 'Acquirer', lang: 'en' }, { text: '-Gutschrift' }]} _href="" />
				</SampleBlock>
				<SampleBlock id="label-lang-tabs">
					<KolTabs _tabs={tabs} _label="Regular tabs"></KolTabs>
				</SampleBlock>
			</div>
		</>
	);
};
