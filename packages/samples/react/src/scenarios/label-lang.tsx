import React from 'react';

import {
	KolAccordion,
	KolAlert,
	KolBadge,
	KolBreadcrumb,
	KolButton,
	KolButtonLink,
	KolCard,
	KolHeading,
	KolInputCheckbox,
	KolInputText,
	KolLink,
	KolLinkButton,
	KolTabs,
} from '@public-ui/react-v19';
import { SampleBlock } from '../components/SampleBlock';
import { SampleDescription } from '../components/SampleDescription';

import type { FC } from 'react';

export const LabelLang: FC = () => {
	const defaultLabel = [{ text: 'Acquirer', lang: 'en' }, { text: '-Gutschrift' }];

	const tabs = [
		{
			_label: defaultLabel,
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
					<KolAccordion _label={defaultLabel}>
						<p>Contents Accordion</p>
					</KolAccordion>
				</SampleBlock>
				<SampleBlock id="label-lang-alert">
					<KolAlert _label={defaultLabel}>This is the text of the alert.</KolAlert>
				</SampleBlock>
				<SampleBlock id="label-lang-badge">
					<KolBadge _label={defaultLabel}></KolBadge>
				</SampleBlock>
				<SampleBlock id="label-lang-breadcrumb">
					<KolBreadcrumb
						_label={defaultLabel}
						_links={[
							{
								_label: defaultLabel,
								_href: '#/',
							},
							{
								_label: defaultLabel,
								_href: '#/',
							},
						]}
					/>
				</SampleBlock>
				<SampleBlock id="label-lang-button">
					<KolButton _label={defaultLabel} />
				</SampleBlock>
				<SampleBlock id="label-lang-button-link">
					<KolButtonLink _label={defaultLabel} />
				</SampleBlock>
				<SampleBlock id="label-lang-card">
					<KolCard _label={defaultLabel}>Inhaltsbereich</KolCard>
				</SampleBlock>
				<SampleBlock id="label-lang-heading">
					<KolHeading _label={defaultLabel} _level={1} />
				</SampleBlock>
				<SampleBlock id="label-lang-checkbox">
					<KolInputCheckbox _label={defaultLabel} />
				</SampleBlock>
				<SampleBlock id="label-lang-input">
					<KolInputText _label={defaultLabel} />
				</SampleBlock>
				<SampleBlock id="label-lang-link">
					<KolLink _label={defaultLabel} _href="" />
				</SampleBlock>
				<SampleBlock id="label-lang-link">
					<KolLinkButton _label={defaultLabel} _href="" />
				</SampleBlock>
				<SampleBlock id="label-lang-tabs">
					<KolTabs _tabs={tabs} _label="Regular tabs"></KolTabs>
				</SampleBlock>
			</div>
		</>
	);
};
