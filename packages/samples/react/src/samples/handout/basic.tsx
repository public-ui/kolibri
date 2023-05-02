import { Bundesanstalt, KoliBriTableHeaders } from '@public-ui/components';
import {
	KolAbbr,
	KolAccordion,
	KolAlert,
	KolBadge,
	KolBreadcrumb,
	KolButton,
	KolButtonLink,
	KolCard,
	KolDetails,
	KolForm,
	KolHeading,
	KolIcon,
	KolImage,
	KolIndentedText,
	KolInputCheckbox,
	KolInputColor,
	KolInputDate,
	KolInputEmail,
	KolInputFile,
	KolInputNumber,
	KolInputPassword,
	KolInputRadio,
	KolInputRange,
	KolInputText,
	KolKolibri,
	KolLink,
	KolLinkButton,
	KolLinkGroup,
	KolLogo,
	KolModal,
	KolNav,
	KolPagination,
	KolProgress,
	KolQuote,
	KolSelect,
	KolSkipNav,
	KolSpin,
	KolTable,
	KolTabs,
	KolTextarea,
	KolVersion,
} from '@public-ui/react';
import PackageJson from '../../../package.json';
import React, { FC } from 'react';
import { getTheme, getThemeName } from '../../shares/store';

const TABLE_HEADERS: KoliBriTableHeaders = {
	horizontal: [
		[
			{
				label: '',
				rowSpan: 2,
				asTd: true,
			},
			{
				label: 'Werktage',
				colSpan: 5,
			},
			{
				label: 'Wochenende',
				colSpan: 2,
			},
		],
		[
			{
				key: 'montag',
				label: 'Montag',
				render: (el, data) => {
					const button = document.createElement('kol-button');
					button.setAttribute('_label', data.label);
					button.setAttribute('data-theme', 'default');
					button.setAttribute('style', 'font-size: 75%');
					button.setAttribute('exportparts', 'button,normal');
					button._on = { onClick: console.log };
					el.innerHTML = '';
					el.appendChild(button);
				},
				sort: (data) => {
					return data.sort((first, second) => {
						if (first.montag < second.montag) {
							return -1;
						}
						if (first.montag > second.montag) {
							return 1;
						}
						return 0;
					});
				},
				sortDirection: 'ASC',
				textAlign: 'right',
			},
			{
				key: 'dienstag',
				label: 'Dienstag',
				render: (el, data) => (el.innerHTML = `<kol-badge _color="#060" _label="${data.label}"></kol-badge>`),
				sort: (data) => {
					return data.sort((first, second) => {
						if (first.dienstag < second.dienstag) {
							return -1;
						}
						if (first.dienstag > second.dienstag) {
							return 1;
						}
						return 0;
					});
				},
				sortDirection: 'DESC',
			},
			{
				key: 'mittwoch',
				label: 'Mittwoch',
				render: (el, data) => (el.innerHTML = `<kol-badge _color="#006" _label="${data.label}"></kol-badge>`),
			},
			{
				key: 'donnerstag',
				label: 'Donnerstag',
				render: (el, data) => (el.innerHTML = `<kol-badge _color="#600" _label="${data.label}"></kol-badge>`),
			},
			{
				key: 'freitag',
				label: 'Freitag',
				render: (el, data) => (el.innerHTML = `<kol-badge _color="#303" _label="${data.label}"></kol-badge>`),
			},
			{
				key: 'samstag',
				label: 'Samstag',
				render: (el, data) => (el.innerHTML = `<kol-badge _color="#330" _label="${data.label}"></kol-badge>`),
			},
			{
				key: 'sonntag',
				label: 'Sonntag',
				render: (el, data) => (el.innerHTML = `<kol-badge _color="#033" _label="${data.label}"></kol-badge>`),
			},
		],
	],
	vertical: [
		[
			{
				label: 'Früh',
			},
			{
				label: 'Mittag',
			},
			{
				label: 'Abend',
			},
			{
				label: 'Nacht',
			},
		],
	],
};
const TABLE_DATA = [
	{
		montag: 'Alex',
		dienstag: 'Anna',
		mittwoch: 'Amalia',
		donnerstag: 'Arthur',
		freitag: 'Alex',
		samstag: 'Andrea',
		sonntag: 'Arnold',
	},
	{
		montag: 'Helena',
		dienstag: 'Fabian',
		mittwoch: 'Marie',
		donnerstag: 'Ben',
		freitag: 'Marcus',
		samstag: 'Alex',
		sonntag: 'Marcus',
	},
	{
		montag: 'Fabian',
		dienstag: 'Helena',
		mittwoch: 'Fabian',
		donnerstag: 'Maya',
		freitag: 'Ben',
		samstag: 'Alex',
		sonntag: 'Helena',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Samuel',
		dienstag: 'Selena',
		mittwoch: 'Sandra',
		donnerstag: 'Salim',
		freitag: 'Robert',
		samstag: 'Richard',
		sonntag: 'Pamela',
	},
	{
		montag: 'Samuel',
		dienstag: 'Selena',
		mittwoch: 'Sandra',
		donnerstag: 'Salim',
		freitag: 'Robert',
		samstag: 'Richard',
		sonntag: 'Pamela',
	},
	{
		montag: 'Finn',
		dienstag: 'Roger',
		mittwoch: 'Christian',
		donnerstag: 'Caspar',
		freitag: 'David',
		samstag: 'Bernard',
		sonntag: 'Anna',
	},
	{
		montag: 'Alex',
		dienstag: 'Anna',
		mittwoch: 'Amalia',
		donnerstag: 'Arthur',
		freitag: 'Alex',
		samstag: 'Andrea',
		sonntag: 'Arnold',
	},
	{
		montag: 'Helena',
		dienstag: 'Fabian',
		mittwoch: 'Marie',
		donnerstag: 'Ben',
		freitag: 'Marcus',
		samstag: 'Alex',
		sonntag: 'Marcus',
	},
	{
		montag: 'Fabian',
		dienstag: 'Helena',
		mittwoch: 'Fabian',
		donnerstag: 'Maya',
		freitag: 'Ben',
		samstag: 'Alex',
		sonntag: 'Helena',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Samuel',
		dienstag: 'Selena',
		mittwoch: 'Sandra',
		donnerstag: 'Salim',
		freitag: 'Robert',
		samstag: 'Richard',
		sonntag: 'Pamela',
	},
	{
		montag: 'Samuel',
		dienstag: 'Selena',
		mittwoch: 'Sandra',
		donnerstag: 'Salim',
		freitag: 'Robert',
		samstag: 'Richard',
		sonntag: 'Pamela',
	},
	{
		montag: 'Finn',
		dienstag: 'Roger',
		mittwoch: 'Christian',
		donnerstag: 'Caspar',
		freitag: 'David',
		samstag: 'Bernard',
		sonntag: 'Anna',
	},
	{
		montag: 'Alex',
		dienstag: 'Anna',
		mittwoch: 'Amalia',
		donnerstag: 'Arthur',
		freitag: 'Alex',
		samstag: 'Andrea',
		sonntag: 'Arnold',
	},
	{
		montag: 'Helena',
		dienstag: 'Fabian',
		mittwoch: 'Marie',
		donnerstag: 'Ben',
		freitag: 'Marcus',
		samstag: 'Alex',
		sonntag: 'Marcus',
	},
	{
		montag: 'Fabian',
		dienstag: 'Helena',
		mittwoch: 'Fabian',
		donnerstag: 'Maya',
		freitag: 'Ben',
		samstag: 'Alex',
		sonntag: 'Helena',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Samuel',
		dienstag: 'Selena',
		mittwoch: 'Sandra',
		donnerstag: 'Salim',
		freitag: 'Robert',
		samstag: 'Richard',
		sonntag: 'Pamela',
	},
	{
		montag: 'Samuel',
		dienstag: 'Selena',
		mittwoch: 'Sandra',
		donnerstag: 'Salim',
		freitag: 'Robert',
		samstag: 'Richard',
		sonntag: 'Pamela',
	},
	{
		montag: 'Finn',
		dienstag: 'Roger',
		mittwoch: 'Christian',
		donnerstag: 'Caspar',
		freitag: 'David',
		samstag: 'Bernard',
		sonntag: 'Anna',
	},
	{
		montag: 'Alex',
		dienstag: 'Anna',
		mittwoch: 'Amalia',
		donnerstag: 'Arthur',
		freitag: 'Alex',
		samstag: 'Andrea',
		sonntag: 'Arnold',
	},
	{
		montag: 'Helena',
		dienstag: 'Fabian',
		mittwoch: 'Marie',
		donnerstag: 'Ben',
		freitag: 'Marcus',
		samstag: 'Alex',
		sonntag: 'Marcus',
	},
	{
		montag: 'Fabian',
		dienstag: 'Helena',
		mittwoch: 'Fabian',
		donnerstag: 'Maya',
		freitag: 'Ben',
		samstag: 'Alex',
		sonntag: 'Helena',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Samuel',
		dienstag: 'Selena',
		mittwoch: 'Sandra',
		donnerstag: 'Salim',
		freitag: 'Robert',
		samstag: 'Richard',
		sonntag: 'Pamela',
	},
	{
		montag: 'Samuel',
		dienstag: 'Selena',
		mittwoch: 'Sandra',
		donnerstag: 'Salim',
		freitag: 'Robert',
		samstag: 'Richard',
		sonntag: 'Pamela',
	},
	{
		montag: 'Finn',
		dienstag: 'Roger',
		mittwoch: 'Christian',
		donnerstag: 'Caspar',
		freitag: 'David',
		samstag: 'Bernard',
		sonntag: 'Anna',
	},
	{
		montag: 'Alex',
		dienstag: 'Anna',
		mittwoch: 'Amalia',
		donnerstag: 'Arthur',
		freitag: 'Alex',
		samstag: 'Andrea',
		sonntag: 'Arnold',
	},
	{
		montag: 'Helena',
		dienstag: 'Fabian',
		mittwoch: 'Marie',
		donnerstag: 'Ben',
		freitag: 'Marcus',
		samstag: 'Alex',
		sonntag: 'Marcus',
	},
	{
		montag: 'Fabian',
		dienstag: 'Helena',
		mittwoch: 'Fabian',
		donnerstag: 'Maya',
		freitag: 'Ben',
		samstag: 'Alex',
		sonntag: 'Helena',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Samuel',
		dienstag: 'Selena',
		mittwoch: 'Sandra',
		donnerstag: 'Salim',
		freitag: 'Robert',
		samstag: 'Richard',
		sonntag: 'Pamela',
	},
	{
		montag: 'Samuel',
		dienstag: 'Selena',
		mittwoch: 'Sandra',
		donnerstag: 'Salim',
		freitag: 'Robert',
		samstag: 'Richard',
		sonntag: 'Pamela',
	},
	{
		montag: 'Finn',
		dienstag: 'Roger',
		mittwoch: 'Christian',
		donnerstag: 'Caspar',
		freitag: 'David',
		samstag: 'Bernard',
		sonntag: 'Anna',
	},
];

export const HandoutBasic: FC = () => (
	<div className="grid gap-4">
		<div className="grid gap-4 grid-cols-[auto_1fr_1fr] items-center">
			<KolKolibri className="block w-75px" _labeled={false}></KolKolibri>
			<KolHeading _label="" _level={1}>
				Kolibri-Handout <small>for {getThemeName(getTheme())}</small>
			</KolHeading>
			<KolDetails _summary="Abstract" _open>
				The handout shows a selection of KoliBri components in the style of <strong>{getThemeName(getTheme())}</strong>. Since KoliBri offers self-contained,
				accessible web components that can be customized to your own corporate design using theming, you don&#39;t have to develop these components yourself.
				For more information read our documentation and follow us (
				<KolLink _label="https://github.com/public-ui/kolibri" _href="https://github.com/public-ui/kolibri" _target="_blank" />
				).
			</KolDetails>
		</div>
		<div className="grid gap-4 grid-cols-12">
			<KolCard className="col-span-2" _heading="Heading" _level={2}>
				<div slot="content" className="grid gap-2 p-2">
					<KolHeading _label="Überschrift Stufe 1" _level={1}></KolHeading>
					<KolHeading _label="Überschrift Stufe 2" _level={2}></KolHeading>
					<KolHeading _label="Überschrift Stufe 3" _level={3}></KolHeading>
					<KolHeading _label="Überschrift Stufe 4" _level={4}></KolHeading>
					<KolHeading _label="Überschrift Stufe 5" _level={5}></KolHeading>
					<KolHeading _label="Überschrift Stufe 6" _level={6}></KolHeading>
					<KolHeading _label="Überschrift Stufe 6" _secondaryHeadline="Unterüberricht" _level={6}></KolHeading>
				</div>
			</KolCard>
			{/* <KolCard className="col-span-3" _heading="Accordion" _level={2}>
				<div slot="content" className="grid gap-2 p-2">
					<KolAccordion _heading="Überschrift Level 1" _level={1} _open>
						<div slot="content">Inhalt Accordion Tab 1</div>
					</KolAccordion>
					<KolAccordion _heading="Überschrift Level 2" _level={2}>
						<div slot="content">Inhalt Accordion Tab 2</div>
					</KolAccordion>
					<KolAccordion _heading="Überschrift Level 3" _level={3}>
						<div slot="content">Inhalt Accordion Tab 3</div>
					</KolAccordion>
					<KolAccordion _heading="Überschrift Level 4" _level={4}>
						<div slot="content">Inhalt Accordion Tab 4</div>
					</KolAccordion>
					<KolAccordion _heading="Überschrift Level 5" _level={5}>
						<div slot="content">Inhalt Accordion Tab 5</div>
					</KolAccordion>
					<KolAccordion _heading="Überschrift Level 6" _level={6}>
						<div slot="content">Inhalt Accordion Tab 6</div>
					</KolAccordion>
				</div>
			</KolCard> */}
			<KolCard className="col-span-2" _heading="Abbreviation and Progress" _level={2}>
				<div slot="content" className="grid gap-2 p-2">
					<p>
						Ich bin eine{' '}
						<KolAbbr _title="Ausführliche Beschreibung" _tooltipAlign="top">
							ABB
						</KolAbbr>{' '}
						mit Tooltip oben
					</p>
					<p>
						Ich bin eine{' '}
						<KolAbbr _title="Ausführliche Beschreibung" _tooltipAlign="right">
							ABB
						</KolAbbr>{' '}
						mit Tooltip rechts
					</p>
					<p>
						Ich bin eine{' '}
						<KolAbbr _title="Ausführliche Beschreibung" _tooltipAlign="bottom">
							ABB
						</KolAbbr>{' '}
						mit Tooltip unten
					</p>
					<p>
						Ich bin eine{' '}
						<KolAbbr _title="Ausführliche Beschreibung" _tooltipAlign="left">
							ABB
						</KolAbbr>{' '}
						mit Tooltip links
					</p>
					<div className="grid grid-cols-2 items-center">
						<KolProgress _type="bar" _max={100} _value={33} _label="Progress"></KolProgress>
						<KolProgress _type="cycle" _max={100} _value={66} _label="Progress"></KolProgress>
					</div>
				</div>
			</KolCard>
			<KolCard className="col-span-3" _heading="Button, LinkButton and Tab" _level={2}>
				<div slot="content" className="grid gap-2 p-2">
					<KolTabs _ariaLabel="" _selected={0} _tabs={[{ _label: 'Button' }, { _label: 'LinkButton' }, { _label: 'Disabled Tab', _disabled: true }]}>
						<div className="grid gap-2 py-2">
							<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
								<KolButton _icon={{ left: 'codicon codicon-arrow-left' }} _label="primary" _variant="primary"></KolButton>
								<KolButton _disabled _icon={{ left: 'codicon codicon-arrow-left' }} _label="primary" _variant="primary"></KolButton>
								<KolButton _iconOnly _icon="codicon codicon-arrow-left" _label="primary" _variant="primary"></KolButton>
							</div>
							<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
								<KolButton _icon={{ right: 'codicon codicon-arrow-right' }} _label="secondary" _variant="secondary"></KolButton>
								<KolButton _disabled _icon={{ right: 'codicon codicon-arrow-right' }} _label="secondary" _variant="secondary"></KolButton>
								<KolButton _iconOnly _icon="codicon codicon-arrow-right" _label="secondary" _variant="secondary"></KolButton>
							</div>
							<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
								<KolButton _icon={{ top: 'codicon codicon-arrow-up' }} _label="danger" _variant="danger"></KolButton>
								<KolButton _disabled _icon={{ top: 'codicon codicon-arrow-up' }} _label="danger" _variant="danger"></KolButton>
								<KolButton _iconOnly _icon="codicon codicon-arrow-up" _label="danger" _variant="danger"></KolButton>
							</div>
							<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
								<KolButton _icon={{ bottom: 'codicon codicon-arrow-down' }} _label="normal" _variant="normal"></KolButton>
								<KolButton _disabled _icon={{ bottom: 'codicon codicon-arrow-down' }} _label="normal" _variant="normal"></KolButton>
								<KolButton _iconOnly _icon="codicon codicon-arrow-down" _label="normal" _variant="normal"></KolButton>
							</div>
							<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
								<KolButton _label="ghost" _variant="ghost"></KolButton>
								<KolButton _disabled _label="ghost" _variant="ghost"></KolButton>
								<KolButton _icon="codicon codicon-home" _iconOnly _label="ghost" _variant="ghost"></KolButton>
							</div>
						</div>
						<div className="grid gap-2 py-2">
							<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
								<KolLinkButton _href="#" _icon={{ left: 'codicon codicon-arrow-left' }} _label="primary" _variant="primary"></KolLinkButton>
								<KolLinkButton _href="#" _disabled _icon={{ left: 'codicon codicon-arrow-left' }} _label="primary" _variant="primary"></KolLinkButton>
								<KolLinkButton _href="#" _iconOnly _icon="codicon codicon-arrow-left" _label="primary" _variant="primary"></KolLinkButton>
							</div>
							<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
								<KolLinkButton _href="#" _icon={{ right: 'codicon codicon-arrow-right' }} _label="secondary" _variant="secondary"></KolLinkButton>
								<KolLinkButton _href="#" _disabled _icon={{ right: 'codicon codicon-arrow-right' }} _label="secondary" _variant="secondary"></KolLinkButton>
								<KolLinkButton _href="#" _iconOnly _icon="codicon codicon-arrow-right" _label="secondary" _variant="secondary"></KolLinkButton>
							</div>
							<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
								<KolLinkButton _href="#" _icon={{ top: 'codicon codicon-arrow-up' }} _label="danger" _variant="danger"></KolLinkButton>
								<KolLinkButton _href="#" _disabled _icon={{ top: 'codicon codicon-arrow-up' }} _label="danger" _variant="danger"></KolLinkButton>
								<KolLinkButton _href="#" _iconOnly _icon="codicon codicon-arrow-up" _label="danger" _variant="danger"></KolLinkButton>
							</div>
							<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
								<KolLinkButton _href="#" _icon={{ bottom: 'codicon codicon-arrow-down' }} _label="normal" _variant="normal"></KolLinkButton>
								<KolLinkButton _href="#" _disabled _icon={{ bottom: 'codicon codicon-arrow-down' }} _label="normal" _variant="normal"></KolLinkButton>
								<KolLinkButton _href="#" _iconOnly _icon="codicon codicon-arrow-down" _label="normal" _variant="normal"></KolLinkButton>
							</div>
							<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
								<KolLinkButton _href="#" _label="ghost" _variant="ghost"></KolLinkButton>
								<KolLinkButton _href="#" _disabled _label="ghost" _variant="ghost"></KolLinkButton>
								<KolLinkButton _href="#" _icon="codicon codicon-home" _iconOnly _label="ghost" _variant="ghost"></KolLinkButton>
							</div>
						</div>
					</KolTabs>
				</div>
			</KolCard>
			<KolCard className="col-span-2" _heading="Accordion, Link and ButtonLink" _level={2}>
				<div slot="content" className="grid gap-2 p-2">
					<KolAccordion _heading="Links" _level={3} _open>
						<div className="grid gap-2" slot="content">
							<KolLink _href="#" _label="Linktext"></KolLink>
							<KolLink _href="#" _icon="codicon codicon-home" _label="Linktext mit Icon"></KolLink>
							<KolLink _href="#" _icon="codicon codicon-home" _iconOnly _label="Linktext nur mit Icon"></KolLink>
							<KolLink _href="/" _label="Besuchter Link"></KolLink>
							<p>
								Ich bin ein <KolLink _href="#" _label="externer Link" _target="w3c"></KolLink> im Fließtext.
							</p>
							<KolLink _ariaLabel="Zurück zur Startseite" _href="#" _label="">
								<KolLogo slot="expert" class="inline-flex w-50" _org={Bundesanstalt['Informationstechnikzentrum Bund']} />
							</KolLink>
						</div>
					</KolAccordion>
					<KolAccordion _heading="ButtonLinks" _level={3}>
						<div className="grid gap-2" slot="content">
							<KolButtonLink _label="Linktext"></KolButtonLink>
							<KolButtonLink _icon="codicon codicon-home" _label="Linktext mit Icon"></KolButtonLink>
							<KolButtonLink _icon="codicon codicon-home" _iconOnly _label="Linktext nur mit Icon"></KolButtonLink>
							<p>
								Ich bin ein <KolButtonLink _label="Link"></KolButtonLink> im Fließtext.
							</p>
							<KolButtonLink _ariaLabel="Zurück zur Startseite" _label="">
								<KolLogo slot="expert" class="inline-flex w-50" _org={Bundesanstalt['Informationstechnikzentrum Bund']} />
							</KolButtonLink>
							<KolButtonLink
								_icon={{
									left: 'codicon codicon-arrow-left',
									right: 'codicon codicon-arrow-right',
									top: 'codicon codicon-arrow-up',
									bottom: 'codicon codicon-arrow-down',
								}}
								_label="Icons"
							></KolButtonLink>
						</div>
					</KolAccordion>
				</div>
			</KolCard>
			<KolCard className="col-span-3" _heading="Alert" _level={2}>
				<div slot="content" className="grid gap-2 p-2">
					<KolAlert _heading="Default message" _type="default">
						This is the text of the alert.
					</KolAlert>
					<KolAlert _type="success">Success message text</KolAlert>
					<KolAlert _type="error" _hasCloser>
						This is a error message text.
					</KolAlert>
					<KolAlert _heading="Info card" _type="info" _variant="card">
						This is the text of the alert.
					</KolAlert>
					<KolAlert _heading="Warning card" _type="warning" _hasCloser _variant="card">
						This is the text of the alert.
					</KolAlert>
				</div>
			</KolCard>
			<KolCard className="col-span-2" _heading="Nav and Breadcrumb" _level={2}>
				<div slot="content" className="grid gap-2 p-2">
					<div>
						<KolNav
							_ariaLabel="Main navigation"
							_links={[
								{
									_label: 'Homepage',
									_icon: 'codicon codicon-home',
									_href: '#/',
								},
								{
									_label: '2 Navigation point',
									_icon: 'codicon codicon-home',
									_href: '#/untermenu',
								},
								{
									_active: true,
									_label: '3 Navigation point',
									_href: '#abc',
									_icon: 'codicon codicon-home',
									_children: [
										{
											_label: '3.1 Navigation point',
											_icon: 'codicon codicon-home',
											_href: '#/',
										},
										{
											_label: '3.2 External navigation point',
											_icon: 'codicon codicon-home',
											_href: '#abc',
											_target: '_blank',
										},
										{
											_label: '3.3 Navigation point',
											_href: '#abc',
											_icon: 'codicon codicon-home',
											_children: [
												{
													_active: true,
													_label: '3.3.1 Navigation point (active)',
													_icon: 'codicon codicon-home',
													_href: '#abc',
												},
												{ _label: '3.3.2 Navigation point', _icon: 'codicon codicon-home', _href: '#abc' },
											],
										},
									],
								},
								{ _label: '3 Navigation point', _icon: 'codicon codicon-home', _href: '#abc' },
							]}
							_hasCompactButton
						/>
					</div>
					{/* <KolSkipNav></KolSkipNav> */}
					{/* <KolLinkGroup></KolLinkGroup> */}
					<div>
						<KolBreadcrumb
							_ariaLabel="Breadcrumb aus Text-Links"
							_links={[
								{ _label: 'Startseite', _href: '#/' },
								{ _label: 'Unterseite der Startseite', _href: '#/unterseite' },
								{
									_label: 'Unterseite der Unterseite',
									_href: '#/unterseite/unterseite',
								},
							]}
						></KolBreadcrumb>
					</div>
				</div>
			</KolCard>
			<KolCard className="col-span-5" _heading="Input" _level={2}>
				<KolForm slot="content">
					<div className="grid gap-4 grid-cols-3 p-2">
						<KolInputColor>Farbe</KolInputColor>
						<KolInputFile>Datei hochladen</KolInputFile>
						<KolInputNumber>Zahleneingabe</KolInputNumber>
						<KolInputDate _type="date">Datum</KolInputDate>
						<KolInputEmail _icon="{'left': 'codicon codicon-home'}" _error="Test einer Fehlermeldung" _touched>
							E-Mail-Adresse
						</KolInputEmail>
						<KolInputText _hint="Ich bin ein Hinweis." _type="text">
							Vorname
						</KolInputText>
						<KolInputPassword>Passwort</KolInputPassword>
						<KolSelect _list="[{'label':'Herr','value':0},{'label':'Frau','value':1}]">Stimmung</KolSelect>
						<KolInputRange _min={0} _max={50} _value={25}>
							Schieberegler
						</KolInputRange>
						<KolInputRadio className="herr-frau" _list="[{'label':'Herr','value':0},{'label':'Frau','value':1}]" _value="1">
							Anrede
						</KolInputRadio>
						<div className="grid gap-4">
							<KolInputRadio _orientation="horizontal" _list="[{'label':'Herr','value':0},{'label':'Frau','value':1}]" _value="0">
								Anrede
							</KolInputRadio>
							<KolInputCheckbox _variant="checkbox">
								Ich akzeptiere die <KolAbbr _title="Allgemeine Geschäftsbedingungen">AGB</KolAbbr>.
							</KolInputCheckbox>
						</div>
						<KolTextarea _rows={4}>Textarea</KolTextarea>
					</div>
				</KolForm>
			</KolCard>
			<KolCard className="col-span-5" _heading="Table with Pagination" _level={2}>
				<div slot="content" className="grid gap-2 p-2">
					<KolTable _caption="Tabelle" _headers={TABLE_HEADERS} _data={TABLE_DATA} _pagination></KolTable>
				</div>
			</KolCard>
		</div>
		<KolVersion _version={PackageJson.version}></KolVersion>
		{/* <KolImage _src="assets/images/abgrenzung.jpg" _alt="KoliBri Darstellung"></KolImage> */}
		{/* <KolIndentedText></KolIndentedText> */}
		{/* <KolQuote></KolQuote> */}
	</div>
);
