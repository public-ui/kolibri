import type { KoliBriTableCell, KoliBriTableHeaders } from '@public-ui/components';
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
	KolNav,
	KolProgress,
	KolSelect,
	KolTableStateful,
	KolTabs,
	KolTextarea,
	KolVersion,
} from '@public-ui/react-v19';
import type { ComponentProps, FC } from 'react';
import React from 'react';

import { useToasterService } from '../../hooks/useToasterService';
import { getRoot } from '../../shares/react-roots';
import { getTheme, getThemeName } from '../../shares/store';
import { TABLE_DATA, type TableDataType } from './table-data';

type KolButtonProps = ComponentProps<typeof KolButton>;

function KolButtonWrapper(props: KolButtonProps & { style: Record<string, unknown> }) {
	const { dummyClickEventHandler } = useToasterService();
	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};
	return <KolButton {...props} _on={dummyEventHandler} />;
}

const TABLE_HEADERS: KoliBriTableHeaders = {
	horizontal: [
		[
			{
				label: 'Workdays',
				colSpan: 5,
				width: 500,
			},
			{
				label: 'Weekend',
				colSpan: 2,
				width: 200,
			},
		],
		[
			{
				key: 'monday',
				label: 'Monday',
				render: (el: HTMLElement, cell: KoliBriTableCell) => {
					const { label } = cell as { label: string };
					renderCellContent(el, <KolButtonWrapper _label={label} style={{ fontSize: '75%' }} />);
				},
				compareFn: (first, second) => {
					if ((first as TableDataType).monday < (second as TableDataType).monday) {
						return -1;
					}
					if ((first as TableDataType).monday > (second as TableDataType).monday) {
						return 1;
					}
					return 0;
				},
				sortDirection: 'ASC',
				textAlign: 'right',
				width: 100,
			},
			{
				key: 'tuesday',
				label: 'Tuesday',
				render: (el: HTMLElement, cell: KoliBriTableCell) => {
					const { label } = cell as { label: string };
					renderCellContent(el, <KolBadge _color="#060" _label={label}></KolBadge>);
				},
				compareFn: (first, second) => {
					if ((first as TableDataType).tuesday < (second as TableDataType).tuesday) {
						return -1;
					}
					if ((first as TableDataType).tuesday > (second as TableDataType).tuesday) {
						return 1;
					}
					return 0;
				},
				sortDirection: 'DESC',
				width: 100,
			},
			{
				key: 'wednesday',
				label: 'Wednesday',
				render: (el: HTMLElement, cell: KoliBriTableCell) => {
					const { label } = cell as { label: string };
					renderCellContent(el, <KolBadge _color="#006" _label={label}></KolBadge>);
				},
				width: 110,
			},
			{
				key: 'thursday',
				label: 'Thursday',
				render: (el: HTMLElement, cell: KoliBriTableCell) => {
					const { label } = cell as { label: string };
					renderCellContent(el, <KolBadge _color="#600" _label={label}></KolBadge>);
				},
				width: 100,
			},
			{
				key: 'friday',
				label: 'Friday',
				render: (el: HTMLElement, cell: KoliBriTableCell) => {
					const { label } = cell as { label: string };
					renderCellContent(el, <KolBadge _color="#303" _label={label}></KolBadge>);
				},
				width: 100,
			},
			{
				key: 'saturday',
				label: 'Saturday',
				render: (el: HTMLElement, cell: KoliBriTableCell) => {
					const { label } = cell as { label: string };
					renderCellContent(el, <KolBadge _color="#330" _label={label}></KolBadge>);
				},
				width: 100,
			},
			{
				key: 'sunday',
				label: 'Sunday',
				render: (el: HTMLElement, cell: KoliBriTableCell) => {
					const { label } = cell as { label: string };
					renderCellContent(el, <KolBadge _color="#033" _label={label}></KolBadge>);
				},
				width: 100,
			},
		],
	],
	vertical: [
		[
			{
				label: 'Early',
				width: 100,
			},
			{
				label: 'Noon',
				width: 100,
			},
			{
				label: 'Evening',
				width: 100,
			},
			{
				label: 'Night',
				width: 100,
			},
		],
	],
};

const renderCellContent = (element: HTMLElement, content: React.ReactNode) => {
	const renderElement = document.createElement('div');
	renderElement.setAttribute('role', 'presentation');
	element.innerHTML = '';
	element.appendChild(renderElement);
	getRoot(renderElement).render(content);
};

export const HandoutBasic: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<div className="grid gap-4">
			<div className="grid gap-4 md:grid-cols-[auto_1fr_1fr] items-center">
				<KolKolibri className="block w-75px" _labeled={false}></KolKolibri>
				<KolHeading _label="" _level={1}>
					<span slot="expert">
						Kolibri-Handout <small>for {getThemeName(getTheme())}</small>
					</span>
				</KolHeading>
				<KolDetails _label="Abstract" _open>
					The handout shows a selection of KoliBri components in the style of <strong>{getThemeName(getTheme())}</strong>. Since KoliBri offers self-contained,
					accessible web components that can be customized to your own corporate design using theming, you don&#39;t have to develop these components yourself.
					For more information read our documentation and follow us (
					<KolLink _label="https://github.com/public-ui/kolibri" _href="https://github.com/public-ui/kolibri" _target="_blank" />
					).
				</KolDetails>
			</div>
			<div className="grid gap-4 sm:grid-cols-6 md:grid-cols-6  xl:grid-cols-12">
				<KolCard className="col-span-6 sm:col-span-6 md:col-span-3 xl:col-span-2" _label="Heading" _level={2}>
					<div slot="" className="grid gap-2 p-2">
						<KolHeading _label="Heading Level 1" _level={1}></KolHeading>
						<KolHeading _label="Heading Level 2" _level={2}></KolHeading>
						<KolHeading _label="Heading Level 3" _level={3}></KolHeading>
						<KolHeading _label="Heading Level 4" _level={4}></KolHeading>
						<KolHeading _label="Heading Level 5" _level={5}></KolHeading>
						<KolHeading _label="Heading Level 6" _level={6}></KolHeading>
						<KolHeading _label="Heading Level 6" _secondaryHeadline="Lessons" _level={6}></KolHeading>
					</div>
				</KolCard>
				{/* <KolCard className="col-span-3" _label="Accordion" _level={2}>
				<div slot="" className="grid gap-2 p-2">
					<KolAccordion _label="Überschrift Level 1" _level={1} _open>
						<div slot="">Inhalt Accordion Tab 1</div>
					</KolAccordion>
					<KolAccordion _label="Überschrift Level 2" _level={2}>
						<div slot="">Inhalt Accordion Tab 2</div>
					</KolAccordion>
					<KolAccordion _label="Überschrift Level 3" _level={3}>
						<div slot="">Inhalt Accordion Tab 3</div>
					</KolAccordion>
					<KolAccordion _label="Überschrift Level 4" _level={4}>
						<div slot="">Inhalt Accordion Tab 4</div>
					</KolAccordion>
					<KolAccordion _label="Überschrift Level 5" _level={5}>
						<div slot="">Inhalt Accordion Tab 5</div>
					</KolAccordion>
					<KolAccordion _label="Überschrift Level 6" _level={6}>
						<div slot="">Inhalt Accordion Tab 6</div>
					</KolAccordion>
				</div>
			</KolCard> */}
				<KolCard className="col-span-6 sm:col-span-6 md:col-span-3 xl:col-span-2" _label="Abbreviation and Progress" _level={2}>
					<div slot="" className="grid gap-2 p-2">
						<p>
							I am <KolAbbr>e.g.</KolAbbr> an abbreviation.
						</p>
						<KolProgress _variant="bar" _max={100} _value={33} _label="Progress" />
						<KolProgress _variant="cycle" _max={100} _value={66} _label="Progress" />
					</div>
				</KolCard>
				<KolCard className="col-span-6 sm:col-span-6 md:col-span-6 xl:col-span-3" _label="Button, LinkButton and Tab" _level={2}>
					<div slot="" className="grid gap-2 p-2">
						<KolTabs _label="" _selected={0} _tabs={[{ _label: 'Button' }, { _label: 'LinkButton' }, { _label: 'Disabled Tab', _disabled: true }]}>
							<div className="grid gap-2 py-2">
								<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
									<KolButton _icons={{ left: 'kolicon-chevron-left' }} _label="primary" _variant="primary" _on={dummyEventHandler}></KolButton>
									<KolButton _disabled _icons={{ left: 'kolicon-chevron-left' }} _label="primary" _variant="primary" _on={dummyEventHandler}></KolButton>
									<KolButton _hideLabel _icons="kolicon-chevron-left" _label="primary" _variant="primary" _on={dummyEventHandler}></KolButton>
								</div>
								<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
									<KolButton _icons={{ right: 'kolicon-chevron-right' }} _label="secondary" _variant="secondary" _on={dummyEventHandler}></KolButton>
									<KolButton _disabled _icons={{ right: 'kolicon-chevron-right' }} _label="secondary" _variant="secondary" _on={dummyEventHandler}></KolButton>
									<KolButton _hideLabel _icons="kolicon-chevron-right" _label="secondary" _variant="secondary" _on={dummyEventHandler}></KolButton>
								</div>
								<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
									<KolButton _icons={{ top: 'kolicon-chevron-up' }} _label="danger" _variant="danger" _on={dummyEventHandler}></KolButton>
									<KolButton _disabled _icons={{ top: 'kolicon-chevron-up' }} _label="danger" _variant="danger" _on={dummyEventHandler}></KolButton>
									<KolButton _hideLabel _icons="kolicon-chevron-up" _label="danger" _variant="danger" _on={dummyEventHandler}></KolButton>
								</div>
								<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
									<KolButton _icons={{ bottom: 'kolicon-chevron-down' }} _label="normal" _variant="normal" _on={dummyEventHandler}></KolButton>
									<KolButton _disabled _icons={{ bottom: 'kolicon-chevron-down' }} _label="normal" _variant="normal" _on={dummyEventHandler}></KolButton>
									<KolButton _hideLabel _icons="kolicon-chevron-down" _label="normal" _variant="normal" _on={dummyEventHandler}></KolButton>
								</div>
								<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
									<KolButton _label="ghost" _variant="ghost"></KolButton>
									<KolButton _disabled _label="ghost" _variant="ghost"></KolButton>
									<KolButton _icons="kolicon-house" _hideLabel _label="ghost" _variant="ghost" _on={dummyEventHandler}></KolButton>
								</div>
							</div>
							<div className="grid gap-2 py-2">
								<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
									<KolLinkButton _href="#/back-page" _icons={{ left: 'kolicon-chevron-left' }} _label="primary" _variant="primary"></KolLinkButton>
									<KolLinkButton _href="#/back-page" _icons={{ left: 'kolicon-chevron-left' }} _label="primary" _variant="primary"></KolLinkButton>
									<KolLinkButton _href="#/back-page" _hideLabel _icons="kolicon-chevron-left" _label="primary" _variant="primary"></KolLinkButton>
								</div>
								<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
									<KolLinkButton _href="#/back-page" _icons={{ right: 'kolicon-chevron-right' }} _label="secondary" _variant="secondary"></KolLinkButton>
									<KolLinkButton _href="#/back-page" _icons={{ right: 'kolicon-chevron-right' }} _label="secondary" _variant="secondary"></KolLinkButton>
									<KolLinkButton _href="#/back-page" _hideLabel _icons="kolicon-chevron-right" _label="secondary" _variant="secondary"></KolLinkButton>
								</div>
								<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
									<KolLinkButton _href="#/back-page" _icons={{ top: 'kolicon-chevron-up' }} _label="danger" _variant="danger"></KolLinkButton>
									<KolLinkButton _href="#/back-page" _icons={{ top: 'kolicon-chevron-up' }} _label="danger" _variant="danger"></KolLinkButton>
									<KolLinkButton _href="#/back-page" _hideLabel _icons="kolicon-chevron-up" _label="danger" _variant="danger"></KolLinkButton>
								</div>
								<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
									<KolLinkButton _href="#/back-page" _icons={{ bottom: 'kolicon-chevron-down' }} _label="normal" _variant="normal"></KolLinkButton>
									<KolLinkButton _href="#/back-page" _icons={{ bottom: 'kolicon-chevron-down' }} _label="normal" _variant="normal"></KolLinkButton>
									<KolLinkButton _href="#/back-page" _hideLabel _icons="kolicon-chevron-down" _label="normal" _variant="normal"></KolLinkButton>
								</div>
								<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
									<KolLinkButton _href="#/back-page" _label="ghost" _variant="ghost"></KolLinkButton>
									<KolLinkButton _href="#/back-page" _label="ghost" _variant="ghost"></KolLinkButton>
									<KolLinkButton _href="#/back-page" _icons="kolicon-house" _hideLabel _label="ghost" _variant="ghost"></KolLinkButton>
								</div>
							</div>
						</KolTabs>
					</div>
				</KolCard>
				<KolCard className="col-span-6 sm:col-span-6 md:col-span-2 xl:col-span-2" _label="Accordion, Link and ButtonLink" _level={2}>
					<div slot="" className="grid gap-2 p-2">
						<KolAccordion _label="Links" _level={3} _open>
							<div className="grid gap-2" slot="">
								<KolLink _href="#/back-page" _label="Link text"></KolLink>
								<KolLink _href="#/back-page" _icons="kolicon-house" _label="Link text with icon"></KolLink>
								<KolLink _href="#/back-page" _icons="kolicon-house" _hideLabel _label="Link text with icon only"></KolLink>
								<KolLink _href="/" _label="Visited link"></KolLink>
								<p>
									I am a <KolLink _href="#/back-page" _label="externer Link" _target="w3c"></KolLink> in the running text.
								</p>
							</div>
						</KolAccordion>
						<KolAccordion _label="ButtonLinks" _level={3}>
							<div className="grid gap-2" slot="">
								<KolButtonLink _label="Link text"></KolButtonLink>
								<KolButtonLink _icons="kolicon-house" _label="Link text with icon"></KolButtonLink>
								<KolButtonLink _icons="kolicon-house" _hideLabel _label="Link text with icon only"></KolButtonLink>
								<p>
									I am a <KolButtonLink _label="Link"></KolButtonLink> in the running text.
								</p>
								<KolButtonLink
									_icons={{
										left: 'kolicon-chevron-left',
										right: 'kolicon-chevron-right',
										top: 'kolicon-chevron-up',
										bottom: 'kolicon-chevron-down',
									}}
									_label="Icons"
								></KolButtonLink>
							</div>
						</KolAccordion>
					</div>
				</KolCard>
				<KolCard className="col-span-6 sm:col-span-6 md:col-span-4 xl:col-span-3" _label="Alert" _level={2}>
					<div slot="" className="grid gap-2 p-2">
						<KolAlert _label="Default message" _type="default">
							This is the text of the alert.
						</KolAlert>
						<KolAlert _type="success">Success message text</KolAlert>
						<KolAlert _type="error" _hasCloser>
							This is a error message text.
						</KolAlert>
						<KolAlert _label="Info card" _type="info" _variant="card">
							This is the text of the alert.
						</KolAlert>
						<KolAlert _label="Warning card" _type="warning" _hasCloser _variant="card">
							This is the text of the alert.
						</KolAlert>
					</div>
				</KolCard>
				<KolCard className="col-span-6 sm:col-span-6 md:col-span-2 xl:col-span-2" _label="Nav and Breadcrumb" _level={2}>
					<div slot="" className="grid gap-2 p-2">
						<div>
							<KolNav
								_label="Main navigation"
								_links={[
									{
										_label: 'Homepage',
										_icons: 'kolicon-house',
										_href: '#/back-page',
									},
									{
										_label: '2 Navigation point',
										_icons: 'kolicon-house',
										_href: '#/back-page',
									},
									{
										_active: true,
										_label: '3 Navigation point',
										_href: '#/back-page',
										_icons: 'kolicon-house',
										_children: [
											{
												_label: '3.1 Navigation point',
												_icons: 'kolicon-house',
												_href: '#/back-page',
											},
											{
												_label: '3.2 External navigation point',
												_icons: 'kolicon-house',
												_href: '#/back-page',
												_target: '_blank',
											},
											{
												_label: '3.3 Navigation point',
												_href: '#/back-page',
												_icons: 'kolicon-house',
												_children: [
													{
														_active: true,
														_label: '3.3.1 Navigation point (active)',
														_icons: 'kolicon-house',
														_href: '#/back-page',
													},
													{ _label: '3.3.2 Navigation point', _icons: 'kolicon-house', _href: '#/back-page' },
												],
											},
										],
									},
									{ _label: '3 Navigation point', _icons: 'kolicon-house', _href: '#/back-page' },
								]}
								_hasCompactButton
							/>
						</div>
						{/* <KolSkipNav></KolSkipNav> */}
						<div>
							<KolBreadcrumb
								_label="Breadcrumb aus Text-Links"
								_links={[
									{ _label: 'Homepage', _href: '#/back-page' },
									{ _label: 'Bottom of the homepage', _href: '#/back-page' },
									{
										_label: 'Underside of the underside',
										_href: '#/back-page',
									},
								]}
							></KolBreadcrumb>
						</div>
					</div>
				</KolCard>
				<KolCard className="col-span-6 sm:col-span-6 md:col-span-4 xl:col-span-5" _label="Input" _level={2}>
					<KolForm slot="">
						<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 p-2">
							<KolInputColor _label={`Color`} />
							<KolInputFile _label={`Upload file`} />
							<KolInputNumber _label={`Number input`} />
							<KolInputDate _type="date" _label={`Date`} />
							<KolInputEmail
								_icons="{'left': 'kolicon-house'}"
								_msg={{ _type: 'error', _description: 'Test of an error message' }}
								_touched
								_label={`E-mail address`}
							/>
							<KolInputText _hint="I am a hint." _label={`First name`} />
							<KolInputPassword _label={`password`} />
							<KolSelect _options="[{'label':'Mr.','value':0},{'label':'Mrs.','value':1}]" _label={`Stimmung`} />
							<KolInputRange _min={0} _max={50} _value={25} _label={`Slider`} />
							<KolInputRadio className="herr-frau" _options="[{'label':'Mr.','value':0},{'label':'Mrs.','value':1}]" _value="1" _label={`Salutation`} />
							<div className="grid gap-4">
								<KolInputRadio _orientation="horizontal" _options="[{'label':'Mr.','value':0},{'label':'Mrs.','value':1}]" _value="0" _label={`Salutation`} />
								<KolInputCheckbox _label="">
									<span slot="expert">
										I accept the <KolAbbr>AGB</KolAbbr>.
									</span>
								</KolInputCheckbox>
							</div>
							<KolTextarea _rows={4} _label={`Textarea`} />
						</div>
					</KolForm>
				</KolCard>
				<KolCard className="col-span-6 sm:col-span-6 md:col-span-4 xl:col-span-5" _label="Table with Pagination" _level={2}>
					<div slot="" className="gap-2 p-2 flex flex-col">
						<KolTableStateful _label="Table" _headers={TABLE_HEADERS} _data={TABLE_DATA} _pagination></KolTableStateful>
					</div>
				</KolCard>
			</div>
			<KolVersion _label="5.0.2-test.2"></KolVersion>
			{/* <KolImage _src="abgrenzung.jpg" _alt="KoliBri Darstellung"></KolImage> */}
			{/* <KolIndentedText></KolIndentedText> */}
			{/* <KolQuote></KolQuote> */}
		</div>
	);
};
