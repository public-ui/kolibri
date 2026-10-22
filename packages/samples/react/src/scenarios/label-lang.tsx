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
	KolMeter,
	KolNav,
	KolPopoverButton,
	KolProgress,
	KolQuote,
	KolTableStateful,
	KolTabs,
	KolToolbar,
	KolTree,
	KolTreeItem,
} from '@public-ui/react-v19';
import { SampleBlock } from '../components/SampleBlock';
import { SampleDescription } from '../components/SampleDescription';

import type { FC } from 'react';

export const LabelLang: FC = () => {
	const defaultLabel = [{ text: 'Acquirer', lang: 'en' }, { text: '-Gutschrift' }];

	const navLinks = [
		{
			_label: defaultLabel,
			_href: '#/',
		},
		{
			_label: defaultLabel,
			_href: '#/',
		},
	];

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
					<KolBreadcrumb _label="Breadcrumb" _links={navLinks} />
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
				<SampleBlock id="label-lang-link-button">
					<KolLinkButton _label={defaultLabel} _href="" />
				</SampleBlock>
				<SampleBlock id="label-lang-meter">
					<KolMeter _label={defaultLabel} _max={1024} _min={0} _unit="MB" _value={512} />
				</SampleBlock>
				<SampleBlock id="label-lang-nav">
					<KolNav _label="Navi" _links={navLinks} />
				</SampleBlock>
				<SampleBlock id="label-lang-popover">
					<KolPopoverButton _label={defaultLabel}>Text</KolPopoverButton>
				</SampleBlock>
				<SampleBlock id="label-lang-progress">
					<KolProgress _label={defaultLabel} _max={100} _value={45} _variant="bar" />
				</SampleBlock>
				<SampleBlock id="label-lang-quote">
					<KolQuote _href="https://public-ui.github.io/docs" _label={defaultLabel} _quote="Quote." _variant="inline" />
				</SampleBlock>
				<SampleBlock id="label-lang-table">
					<KolTableStateful _label={defaultLabel}></KolTableStateful>
				</SampleBlock>
				<SampleBlock id="label-lang-tabs">
					<KolTabs _tabs={tabs} _label="Regular tabs"></KolTabs>
				</SampleBlock>
				<SampleBlock id="label-lang-tabs">
					<KolToolbar
						_label="Toolbar"
						_items={[
							{
								type: 'button',
								_label: defaultLabel,
							},
							{
								type: 'link',
								_label: defaultLabel,
								_href: '#',
							},
						]}
					></KolToolbar>
				</SampleBlock>
				<SampleBlock id="label-lang-tree">
					<KolTree _label="Tree">
						<KolTreeItem _label={defaultLabel} _href="#/" />
					</KolTree>
				</SampleBlock>
			</div>
		</>
	);
};
