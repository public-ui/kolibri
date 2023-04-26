import { Bundesanstalt } from '@public-ui/components';
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
import React, { FC } from 'react';

export const HandoutBasic: FC = () => (
	<div className="grid gap-4">
		<div className="grid gap-4 grid-cols-[auto_1fr_auto] items-center">
			<KolKolibri className="block w-75px" _labeled={false}></KolKolibri>
			<KolHeading _headline="Component-Handout" _level={1}></KolHeading>
			<KolVersion _version="1.5.0-rc.12"></KolVersion>
		</div>
		<div className="grid gap-4 grid-cols-2">
			<KolCard _heading="Heading's" _level={2}>
				<div slot="content" className="grid gap-2">
					<KolHeading _headline="Überschrift Stufe 1" _level={1}></KolHeading>
					<KolHeading _headline="Überschrift Stufe 2" _level={2}></KolHeading>
					<KolHeading _headline="Überschrift Stufe 3" _level={3}></KolHeading>
					<KolHeading _headline="Überschrift Stufe 4" _level={4}></KolHeading>
					<KolHeading _headline="Überschrift Stufe 5" _level={5}></KolHeading>
					<KolHeading _headline="Überschrift Stufe 6" _level={6}></KolHeading>
					<KolHeading _headline="Überschrift Stufe 6" _secondaryHeadline="Unterüberricht" _level={6}></KolHeading>
				</div>
			</KolCard>
			<KolCard _heading="Abbreviation's" _level={2}>
				<div slot="content" className="grid gap-2">
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
				</div>
			</KolCard>
			<KolCard _heading="Button's" _level={2}>
				<div slot="content" className="grid gap-2 ">
					<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
						<KolButton _icon={{ left: 'codicon codicon-arrow-left' }} _label="primary" _variant="primary"></KolButton>
						<KolButton _disabled _icon={{ left: 'codicon codicon-arrow-left' }} _label="primary" _variant="primary"></KolButton>
						<KolButton _iconOnly _icon={{ left: 'codicon codicon-arrow-left' }} _label="primary" _variant="primary"></KolButton>
					</div>
					<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
						<KolButton _icon={{ right: 'codicon codicon-arrow-right' }} _label="secondary" _variant="secondary"></KolButton>
						<KolButton _disabled _icon={{ right: 'codicon codicon-arrow-right' }} _label="secondary" _variant="secondary"></KolButton>
						<KolButton _iconOnly _icon={{ right: 'codicon codicon-arrow-right' }} _label="secondary" _variant="secondary"></KolButton>
					</div>
					<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
						<KolButton _icon={{ top: 'codicon codicon-arrow-up' }} _label="danger" _variant="danger"></KolButton>
						<KolButton _disabled _icon={{ top: 'codicon codicon-arrow-up' }} _label="danger" _variant="danger"></KolButton>
						<KolButton _iconOnly _icon={{ top: 'codicon codicon-arrow-up' }} _label="danger" _variant="danger"></KolButton>
					</div>
					<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
						<KolButton _icon={{ bottom: 'codicon codicon-arrow-down' }} _label="normal" _variant="normal"></KolButton>
						<KolButton _disabled _icon={{ bottom: 'codicon codicon-arrow-down' }} _label="normal" _variant="normal"></KolButton>
						<KolButton _iconOnly _icon={{ bottom: 'codicon codicon-arrow-down' }} _label="normal" _variant="normal"></KolButton>
					</div>
					<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
						<KolButton _label="ghost" _variant="ghost"></KolButton>
						<KolButton _disabled _label="ghost" _variant="ghost"></KolButton>
						<KolButton _icon="codicon codicon-home" _iconOnly _label="ghost" _variant="ghost"></KolButton>
					</div>
					<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
						<KolButton _label="custom" _variant="custom"></KolButton>
						<KolButton _disabled _label="custom" _variant="custom"></KolButton>
						<KolButton _icon="codicon codicon-trash" _iconOnly _label="custom" _variant="custom"></KolButton>
					</div>
				</div>
			</KolCard>
			<KolCard _heading="LinkButton's" _level={2}>
				<div slot="content" className="grid gap-2 ">
					<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
						<KolLinkButton _href="#" _icon={{ left: 'codicon codicon-arrow-left' }} _label="primary" _variant="primary"></KolLinkButton>
						<KolLinkButton _href="#" _disabled _icon={{ left: 'codicon codicon-arrow-left' }} _label="primary" _variant="primary"></KolLinkButton>
						<KolLinkButton _href="#" _iconOnly _icon={{ left: 'codicon codicon-arrow-left' }} _label="primary" _variant="primary"></KolLinkButton>
					</div>
					<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
						<KolLinkButton _href="#" _icon={{ right: 'codicon codicon-arrow-right' }} _label="secondary" _variant="secondary"></KolLinkButton>
						<KolLinkButton _href="#" _disabled _icon={{ right: 'codicon codicon-arrow-right' }} _label="secondary" _variant="secondary"></KolLinkButton>
						<KolLinkButton _href="#" _iconOnly _icon={{ right: 'codicon codicon-arrow-right' }} _label="secondary" _variant="secondary"></KolLinkButton>
					</div>
					<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
						<KolLinkButton _href="#" _icon={{ top: 'codicon codicon-arrow-up' }} _label="danger" _variant="danger"></KolLinkButton>
						<KolLinkButton _href="#" _disabled _icon={{ top: 'codicon codicon-arrow-up' }} _label="danger" _variant="danger"></KolLinkButton>
						<KolLinkButton _href="#" _iconOnly _icon={{ top: 'codicon codicon-arrow-up' }} _label="danger" _variant="danger"></KolLinkButton>
					</div>
					<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
						<KolLinkButton _href="#" _icon={{ bottom: 'codicon codicon-arrow-down' }} _label="normal" _variant="normal"></KolLinkButton>
						<KolLinkButton _href="#" _disabled _icon={{ bottom: 'codicon codicon-arrow-down' }} _label="normal" _variant="normal"></KolLinkButton>
						<KolLinkButton _href="#" _iconOnly _icon={{ bottom: 'codicon codicon-arrow-down' }} _label="normal" _variant="normal"></KolLinkButton>
					</div>
					<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
						<KolLinkButton _href="#" _label="ghost" _variant="ghost"></KolLinkButton>
						<KolLinkButton _href="#" _disabled _label="ghost" _variant="ghost"></KolLinkButton>
						<KolLinkButton _icon="codicon codicon-home" _href="#" _iconOnly _label="ghost" _variant="ghost"></KolLinkButton>
					</div>
					<div className="grid gap-2 grid-cols-[4fr_4fr_1fr] justify-items-center">
						<KolLinkButton _href="#" _label="custom" _variant="custom"></KolLinkButton>
						<KolLinkButton _href="#" _disabled _label="custom" _variant="custom"></KolLinkButton>
						<KolLinkButton _href="#" _icon="codicon codicon-trash" _iconOnly _label="custom" _variant="custom"></KolLinkButton>
					</div>
				</div>
			</KolCard>
			<KolCard _heading="Link's" _level={2}>
				<div slot="content" className="grid gap-2">
					<KolLink _href="#" _label="Linktext"></KolLink>
					<KolLink _href="#" _icon="codicon codicon-home" _label="Linktext mit Icon"></KolLink>
					<KolLink _href="#" _icon="codicon codicon-home" _iconOnly _label="Linktext nur mit Icon"></KolLink>
					<KolLink _href="/" _label="Besuchter Link"></KolLink>
					<p>
						Ich bin ein <KolLink _href="#" _label="externer Link" _target="w3c"></KolLink> im Fließtext.
					</p>
					<KolLink _ariaLabel="Zurück zur Startseite" _href="#" _label="">
						<KolLogo class="inline-flex w-50" _org={Bundesanstalt['Informationstechnikzentrum Bund']} />
					</KolLink>
					<KolLink _ariaLabel="Zurück zur Startseite" _href="#" _label="">
						<KolLogo slot="expert" class="inline-flex w-50" _org={Bundesanstalt['Informationstechnikzentrum Bund']} />
					</KolLink>
					<KolLink
						_href="#"
						_icon={{
							left: 'codicon codicon-arrow-left',
							right: 'codicon codicon-arrow-right',
							top: 'codicon codicon-arrow-up',
							bottom: 'codicon codicon-arrow-down',
						}}
						_label="Icons"
					></KolLink>
				</div>
			</KolCard>
			<KolCard _heading="ButtonLink's" _level={2}>
				<div slot="content" className="grid gap-2">
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
			</KolCard>
			<KolCard className="col-span-2" _heading="Nav's" _level={2}>
				<KolNav
					_ariaLabel="Navigation"
					_links={[
						{
							_label: 'Navigation',
							_icon: 'codicon codicon-home',
							_href: '#',
						},
						{
							_label: 'Modal',
							_icon: 'codicon codicon-home',
							_href: '#',
						},
						{
							_label: 'Pagination',
							_icon: 'codicon codicon-home',
							_href: '#',
						},
					]}
				></KolNav>
				<KolSkipNav></KolSkipNav>
				<KolLinkGroup></KolLinkGroup>
				<KolBreadcrumb></KolBreadcrumb>
			</KolCard>
			<KolCard className="col-span-2" _heading="Input's" _level={2}>
				<KolForm slot="content">
					<div className="grid gap-2">
						<KolInputColor _id="input-color">Farbe</KolInputColor>
						<KolInputFile _id="input-file">Datei hochladen</KolInputFile>
						<KolInputNumber _id="input-number" _type="number">
							Zahleneingabe
						</KolInputNumber>
						<KolInputDate _id="input-date" _type="date">
							Datum
						</KolInputDate>
						<KolInputEmail _icon="{'left': 'codicon codicon-home'}" _id="input-email" _error="Test einer Fehlermeldung" _touched>
							E-Mail-Adresse
						</KolInputEmail>
						<KolInputText _id="input-text" _hint="Ich bin ein Hinweis." _type="text">
							Vorname
						</KolInputText>
						<KolInputPassword _id="input-password" _name="input-password">
							Passwort
						</KolInputPassword>
						<KolSelect _id="select" _list="[{'label':'Herr','value':0},{'label':'Frau','value':1}]">
							Stimmung
						</KolSelect>
						<KolTextarea _id="textarea">Textarea</KolTextarea>
						<KolInputRadio className="herr-frau" _id="input-radio" _list="[{'label':'Herr','value':0},{'label':'Frau','value':1}]" _value="1">
							Anrede
						</KolInputRadio>
						<KolInputRadio _orientation="horizontal" _id="input-radio" _list="[{'label':'Herr','value':0},{'label':'Frau','value':1}]" _value="1">
							Anrede
						</KolInputRadio>
						<KolInputRange _id="schnitzelwert" _min={0} _max={50} _value={25}>
							Schieberegler
						</KolInputRange>
						<KolInputCheckbox _id="input-checkbox" _variant="checkbox">
							Ich akzeptiere die <KolAbbr _title="Allgemeine Geschäftsbedingungen">AGB</KolAbbr>.
						</KolInputCheckbox>
					</div>
				</KolForm>
			</KolCard>
			<KolCard className="col-span-2" _heading="Tab's" _level={2}>
				<div slot="content" className="grid gap-2">
					<KolTabs _ariaLabel="" _selected={0} _tabs='[{"_label":"Tab 1"},{"_label":"Tab 2", "_on": {"onClose": true} },{"_label":"Tab 3"}]'>
						<div>Seite 1</div>
						<div>Tab 2</div>
						<div>Ich bin hier nur zu Spass.</div>
					</KolTabs>
				</div>
			</KolCard>
			<KolCard className="col-span-2" _heading="Table's" _level={2}>
				<div slot="content" className="grid gap-2">
					<KolTable _caption="Tabelle" _headers={{}} _data={[]}></KolTable>
				</div>
			</KolCard>
			<KolImage _src="assets/images/abgrenzung.jpg" _alt="KoliBri Darstellung"></KolImage>
			<KolProgress _type="bar" _unit="Schnitzel" _max={50} _value={25}></KolProgress>
			<KolProgress _type="cycle" _unit="Schnitzel" _max={50} _value={25}></KolProgress>
			<KolAccordion></KolAccordion>
			<KolAlert></KolAlert>
			<KolDetails></KolDetails>
			<KolIndentedText></KolIndentedText>
			<KolQuote></KolQuote>
		</div>
	</div>
);
