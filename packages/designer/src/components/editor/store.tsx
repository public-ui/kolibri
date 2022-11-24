import { Bundesanstalt, Bundesministerium, SelectOption } from '@public-ui/components';
import { TabButtonProps } from '@public-ui/components/dist/types/components/tabs/component';
import {
	KolAbbr,
	KolAccordion,
	KolAlert,
	KolBadge,
	KolBreadcrumb,
	KolButton,
	KolButtonGroup,
	KolCard,
	KolDetails,
	KolHeading,
	KolIcon,
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
	KolLink,
	KolButtonLink,
	KolLinkGroup,
	KolLogo,
	KolModal,
	KolNav,
	KolPagination,
	KolProgress,
	KolSelect,
	KolSkipNav,
	KolSpin,
	KolTable,
	KolTabs,
	KolTextarea,
	KolToast,
	KolVersion,
	KolLinkButton,
} from '@public-ui/solid';
import { Component } from 'solid-js';
import countries from 'world_countries_lists/data/countries/de/countries.json';
import { DATA, Zeiten } from './data';

// https://css-tricks.com/snippets/javascript/random-hex-color/
const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

const STATUS_OPTIONS: SelectOption<string>[] = [
	{
		label: '- Keine Auswahl',
		value: '',
		disabled: true,
	},
];

type Country = {
	id: number;
	alpha2: string;
	alpha3: string;
	name: string;
};
(countries as Country[]).forEach((country) =>
	STATUS_OPTIONS.push({
		label: country.name,
		value: country.alpha2,
	})
);
let modalElement: HTMLElement | null = null;

const HINT_MSG = 'Ich bin ein Hinweis.';
const ERROR_MSG = 'Ich bin eine Fehlermeldung!';

const LONG_TEXT = `Lorem Ipsum ist ein einfacher Demo-Text für die Print- und Schriftindustrie. Lorem Ipsum ist in der Industrie bereits der Standard Demo-Text seit 1500, als ein unbekannter Schriftsteller eine Hand voll Wörter nahm und diese durcheinander warf um ein Musterbuch zu erstellen. Es hat nicht nur 5 Jahrhunderte überlebt, sondern auch in Spruch in die elektronische Schriftbearbeitung geschafft (bemerke, nahezu unverändert). Bekannt wurde es 1960, mit dem erscheinen von "Letraset", welches Passagen von Lorem Ipsum enhielt, so wie Desktop Software wie "Aldus PageMaker" - ebenfalls mit Lorem Ipsum.`;

const DEFAULT_TABS: TabButtonProps[] = [
	{
		_icon: 'fa-solid fa-chart-simple',
		_label: 'Nicht ausgewählt',
	},
	{
		_icon: 'fa-solid fa-plate-wheat',
		_label: 'Ausgewählt',
		_on: {
			onCreate: () => {},
		},
	},
	{
		_icon: 'fa-solid fa-people-group',
		_label: 'Nicht ausgewählt',
	},
];
const TABS_ICON_ONLY = DEFAULT_TABS.map((tab) => {
	return {
		...tab,
		_iconOnly: true,
	};
});

export const components: Record<string, Component> = {
	'KOL-ABBR': () => (
		<div class="grid justify-center">
			<div class="grid gap-6 text-center">
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
		</div>
	),
	'KOL-ACCORDION': () => (
		<div class="grid justify-center gap-1">
			<KolAccordion _level={1} _heading="Überschrift Accordion 1" _open>
				<div slot="content">{LONG_TEXT}</div>
			</KolAccordion>
			<KolAccordion _level={2} _heading="Überschrift Accordion 2">
				<div slot="content">{LONG_TEXT}</div>
			</KolAccordion>
			<KolAccordion _level={3} _heading="Überschrift Accordion 3">
				<div slot="content">{LONG_TEXT}</div>
			</KolAccordion>
			<KolAccordion _level={4} _heading="Überschrift Accordion 4" _open>
				<div slot="content">{LONG_TEXT}</div>
			</KolAccordion>
			<KolAccordion _level={5} _heading="Überschrift Accordion 5">
				<div slot="content">{LONG_TEXT}</div>
			</KolAccordion>
			<KolAccordion _level={6} _heading="Überschrift Accordion 6">
				<div slot="content">{LONG_TEXT}</div>
			</KolAccordion>
			<KolAccordion class="bordered" _heading="Accordion #3 Header" _level={3}>
				<p slot="header">
					In den Accordion-Header kann auch noch was komplexeres eingefügt werden.
					<KolButton class="not-used" _icon="icofont-ui-add" _label="Hinzufügen" _variant="secondary"></KolButton>
				</p>
				<p slot="content">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta pariatur laudantium saepe ipsa atque officia cupiditate repudiandae harum earum aut
					doloribus autem libero exercitationem dolor ad, magni dignissimos ratione fuga. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
					perferendis qui animi nesciunt illo facere, doloribus sint cupiditate nihil dolorem voluptate ab esse! Ducimus ad est commodi molestias voluptas
					reiciendis.
				</p>
			</KolAccordion>
		</div>
	),
	'KOL-ALERT': () => (
		<div class="grid justify-center bg-red-100 gap-6">
			<KolAlert _heading="Nachricht" _level={3}>
				Hier wird die Nachricht näher beschrieben.
			</KolAlert>
			<KolAlert _type="success" _hasCloser>
				Est reprehenderit mollit eiusmod aute non et non non sunt duis dolore. Lorem exercitation nulla proident pariatur ipsum proident do eiusmod veniam nisi
				amet. Do id esse consectetur deserunt non incididunt do pariatur laborum aliquip amet. Incididunt ad sunt irure minim duis laborum ad culpa nisi veniam
				tempor qui. Amet officia magna nisi esse aliqua eu Lorem. Adipisicing enim aliquip sunt dolor culpa irure irure consectetur. Laboris enim exercitation
				do consequat duis incididunt ex pariatur do excepteur aliqua. Pariatur dolor tempor tempor occaecat esse non veniam cillum irure cupidatat mollit culpa
				ad nisi. Consequat velit consequat officia aute sit dolore et aute est ea veniam. Elit ea commodo et cupidatat nisi.
			</KolAlert>
			<KolAlert _type="error" _heading="Fehler" _level={3}>
				Hier wird der Fehler näher beschrieben.
			</KolAlert>
			<KolAlert _type="info" _heading="Hinweis" _level={4}>
				Hier wird der Hinweis näher beschrieben.
			</KolAlert>
			<KolAlert _type="success" _heading="Erfolg" _level={5}>
				Hier wird der Erfolg näher beschrieben.
			</KolAlert>
			<KolAlert _type="warning" _heading="Warnung" _level={6}>
				Hier wird die Warnung näher beschrieben.
			</KolAlert>
			<KolAlert _type="info" _heading="Et exercitation est commodo pariatur." _hasCloser>
				Commodo nulla veniam sunt sunt excepteur consectetur sunt excepteur. Esse anim aliqua voluptate voluptate aliqua cupidatat irure est consequat. Enim
				occaecat nostrud in commodo ea ex. Tempor eu qui incididunt ad incididunt fugiat ex irure voluptate adipisicing excepteur. Est occaecat fugiat
				exercitation officia nostrud minim in laborum aliquip ea.
			</KolAlert>
			<KolAlert>Hier wird die Nachricht näher beschrieben.</KolAlert>
			<KolAlert _type="error">Hier wird der Fehler kurz beschrieben.</KolAlert>
			<KolAlert _type="info">Hier wird der Hinweis kurz beschrieben.</KolAlert>
			<KolAlert _type="success">Hier wird der Erfolg kurz beschrieben.</KolAlert>
			<KolAlert _type="warning">Hier wird die Warnung kurz beschrieben.</KolAlert>
			<KolAlert _heading="Nachricht" _level={3} _variant="card">
				Hier wird die Nachricht näher beschrieben.
			</KolAlert>
			<KolAlert _type="error" _heading="Fehler" _level={3} _variant="card">
				Hier wird der Fehler näher beschrieben.
			</KolAlert>
			<KolAlert _type="info" _heading="Hinweis" _level={4} _variant="card">
				Hier wird der Hinweis näher beschrieben.
			</KolAlert>
			<KolAlert _type="success" _heading="Erfolg" _level={5} _variant="card">
				Hier wird der Erfolg näher beschrieben.
			</KolAlert>
			<KolAlert _type="warning" _heading="Warnung" _level={6} _variant="card">
				Hier wird die Warnung näher beschrieben.
			</KolAlert>
			<KolAlert _variant="card">Hier wird die Nachricht näher beschrieben.</KolAlert>
			<KolAlert _type="error" _variant="card">
				Hier wird der Fehler kurz beschrieben.
			</KolAlert>
			<KolAlert _type="info" _variant="card">
				Hier wird der Hinweis kurz beschrieben.
			</KolAlert>
			<KolAlert _type="success" _variant="card">
				Hier wird der Erfolg kurz beschrieben.
			</KolAlert>
			<KolAlert _type="warning" _variant="card">
				Hier wird die Warnung kurz beschrieben.
			</KolAlert>
			<KolAlert _type="warning" _variant="card" _heading="Non adipisicing reprehenderit duis duis." _hasCloser>
				Irure eu adipisicing aute fugiat reprehenderit amet pariatur reprehenderit. Velit enim commodo qui in. Sint aliqua duis labore consequat eiusmod laboris
				anim. Aliquip sunt ea nulla nostrud non aute. Nulla irure nisi nulla sunt elit tempor nostrud.
			</KolAlert>
		</div>
	),
	'KOL-BADGE': () => (
		<div class="flex flex-wrap gap-6">
			<KolBadge
				_label="Text"
				_color={{
					backgroundColor: `#000`,
					color: `#fff`,
				}}
			></KolBadge>
			<KolBadge
				_label="Text"
				_color={{
					backgroundColor: `#ddd`,
					color: `#222`,
				}}
				_icon="icofont-tree"
			></KolBadge>
			<KolBadge
				_label="Text"
				_color={{
					backgroundColor: `#ff0`,
					color: `#860`,
				}}
				_icon="icofont-tree"
				_iconAlign="right"
			></KolBadge>
			<KolBadge
				_label="Text"
				_color={{
					backgroundColor: `#333`,
					color: `#888`,
				}}
				_icon="icofont-tree"
				_iconOnly
			></KolBadge>
			{new Array(10).fill(null).map(() => (
				<>
					<KolBadge _label="Text" _color={`#${randomColor()}`}></KolBadge>
					<KolBadge _label="Text" _color={`#${randomColor()}`} _icon="icofont-tree"></KolBadge>
					<KolBadge
						_label="Text"
						_color={`#${randomColor()}`}
						_icon={{
							right: 'icofont-tree',
						}}
					></KolBadge>
					<KolBadge _label="Text" _color={`#${randomColor()}`} _icon="icofont-tree" _iconOnly></KolBadge>
				</>
			))}
			<div style="max-width: 100px">
				<div class="grid gap-4">
					<KolBadge
						_label="Ein Badge mit sehr viel Text sieht z.B. so aus!"
						_color={{
							backgroundColor: `#CCDEDA`,
							color: `#005C45`,
						}}
					></KolBadge>
					<KolBadge _label="Ein Badge mit sehr viel Text sieht z.B. so aus!" _color={`#CCDEDA`}></KolBadge>
				</div>
			</div>
		</div>
	),
	'KOL-BREADCRUMB': () => (
		<div class="grid justify-center gap-6">
			<KolBreadcrumb
				_ariaLabel="Breadcrumb aus Text-Links"
				_links={[
					{ _label: 'Startseite', _href: '#/' },
					{ _label: 'Unterseite der Startseite', _href: '#/unterseite' },
					{ _label: 'Unterseite der Unterseite', _href: '#/unterseite/unterseite' },
				]}
			></KolBreadcrumb>
			<KolBreadcrumb
				_ariaLabel="Breadcrumb aus Text-Links"
				_links={[
					{ _label: 'Startseite', _icon: 'icofont-home', _href: '#/' },
					{ _label: 'Unterseite der Startseite mit sehr langem Link-Test', _href: '#/unterseite' },
					{ _label: 'Unterseite der Unterseite', _href: '#/unterseite/unterseite' },
				]}
			></KolBreadcrumb>
			<KolBreadcrumb
				_ariaLabel="Breadcrumb aus Text-Links"
				_links={[
					{ _ariaLabel: 'Startseite', _label: 'Startseite', _icon: 'icofont-home', _iconOnly: true, _href: '#/' },
					{ _label: 'Unterseite der Startseite mit sehr langem Link-Test', _href: '#/unterseite' },
					{ _label: 'Unterseite der Unterseite', _href: '#/unterseite/unterseite' },
				]}
			></KolBreadcrumb>
			<KolBreadcrumb
				_ariaLabel="Breadcrumb aus Text-Links"
				_links={[{ _ariaLabel: 'Startseite', _label: 'Startseite', _icon: 'icofont-home', _iconOnly: true, _href: '#/' }]}
			></KolBreadcrumb>
		</div>
	),
	'KOL-BUTTON': () => (
		<div class="grid grid-cols-3 items-center justify-items-center gap-6">
			<div class="grid gap-6 text-center items-center justify-items-center">
				<KolButton _label="Primary" _variant="primary"></KolButton>
				<KolButton _label="Secondary" _variant="secondary"></KolButton>
				<KolButton _label="Normal" _variant="normal"></KolButton>
				<KolButton _label="Danger" _variant="danger"></KolButton>
				<KolButton _label="Ghost" _variant="ghost"></KolButton>
				<KolButton _label="Loading" _customClass="loading" _variant="custom"></KolButton>
			</div>
			<div class="grid gap-6 text-center items-center justify-items-center">
				<KolButton _label="Primary" _icon="icofont-home" _variant="primary"></KolButton>
				<KolButton _label="Secondary" _icon="icofont-home" _variant="secondary"></KolButton>
				<KolButton _label="Normal" _icon="icofont-home" _variant="normal"></KolButton>
				<KolButton _label="Danger" _icon="icofont-home" _variant="danger"></KolButton>
				<KolButton _label="Ghost" _icon="icofont-home" _variant="ghost"></KolButton>
				<KolButton _label="Loading" _icon="icofont-home" _customClass="loading" _variant="custom"></KolButton>
			</div>
			<div class="grid gap-6 text-center items-center justify-items-center">
				<KolButton _label="Primary" _icon="icofont-home" _iconAlign="right" _variant="primary" style="width: 120px"></KolButton>
				<KolButton _label="Secondary" _icon="icofont-home" _iconAlign="right" _variant="secondary" style="width: 120px"></KolButton>
				<KolButton _label="Normal" _icon="icofont-home" _iconAlign="right" _variant="normal" style="width: 120px"></KolButton>
				<KolButton _label="Danger" _icon="icofont-home" _iconAlign="right" _variant="danger" style="width: 120px"></KolButton>
				<KolButton _label="Ghost" _icon="icofont-home" _iconAlign="right" _variant="ghost" style="width: 120px"></KolButton>
				<KolButton _label="Loading" _icon="icofont-home" _iconAlign="right" _customClass="loading" _variant="custom" style="width: 120px"></KolButton>
			</div>
			<div class="grid gap-6 text-center items-center justify-items-center">
				<KolButton _label="Primary" _icon="icofont-home" _iconOnly _variant="primary"></KolButton>
				<KolButton _label="Secondary" _icon="icofont-home" _iconOnly _variant="secondary" _tooltipAlign="right"></KolButton>
				<KolButton _label="Normal" _icon="icofont-home" _iconOnly _variant="normal" _tooltipAlign="bottom"></KolButton>
				<KolButton _label="Danger" _icon="icofont-home" _iconOnly _variant="danger" _tooltipAlign="left"></KolButton>
				<KolButton _label="Ghost" _icon="icofont-home" _iconOnly _variant="ghost" _tooltipAlign="top"></KolButton>
				<KolButton _label="Loading" _icon="icofont-home" _iconOnly _customClass="loading" _variant="custom" _tooltipAlign="top"></KolButton>
			</div>
			<div class="grid gap-6 text-center items-center justify-items-center">
				<KolButton _label="Primary" _icon="icofont-home" _disabled _variant="primary"></KolButton>
				<KolButton _label="Secondary" _icon="icofont-home" _disabled _variant="secondary"></KolButton>
				<KolButton _label="Normal" _icon="icofont-home" _disabled _variant="normal"></KolButton>
				<KolButton _label="Danger" _icon="icofont-home" _disabled _variant="danger"></KolButton>
				<KolButton _label="Ghost" _icon="icofont-home" _disabled _variant="ghost"></KolButton>
				<KolButton _label="Loading" _icon="icofont-home" _disabled _customClass="loading" _variant="custom"></KolButton>
			</div>
			<div class="grid gap-6 text-center items-center justify-items-center">
				<KolButton
					_label="Primary"
					_icon={{
						left: 'icofont-arrow-left',
						right: 'icofont-arrow-right',
						top: 'icofont-arrow-up',
						bottom: 'icofont-arrow-down',
					}}
					_variant="primary"
				></KolButton>
				<KolButton
					_label="Secondary"
					_icon={{
						left: 'icofont-arrow-left',
						right: 'icofont-arrow-right',
						top: 'icofont-arrow-up',
						bottom: 'icofont-arrow-down',
					}}
					_variant="secondary"
				></KolButton>
				<KolButton
					_label="Normal"
					_icon={{
						left: 'icofont-arrow-left',
						right: 'icofont-arrow-right',
						top: 'icofont-arrow-up',
						bottom: 'icofont-arrow-down',
					}}
					_variant="normal"
				></KolButton>
				<KolButton
					_label="Danger"
					_icon={{
						left: 'icofont-arrow-left',
						right: 'icofont-arrow-right',
						top: 'icofont-arrow-up',
						bottom: 'icofont-arrow-down',
					}}
					_variant="danger"
				></KolButton>
				<KolButton
					_label="Ghost"
					_icon={{
						left: 'icofont-arrow-left',
						right: 'icofont-arrow-right',
						top: 'icofont-arrow-up',
						bottom: 'icofont-arrow-down',
					}}
					_variant="ghost"
				></KolButton>
				<KolButton
					_label="Loading"
					_icon={{
						left: 'icofont-arrow-left',
						right: 'icofont-arrow-right',
						top: 'icofont-arrow-up',
						bottom: 'icofont-arrow-down',
					}}
					_customClass="loading"
					_variant="custom"
				></KolButton>
			</div>
		</div>
	),
	'KOL-LINK-BUTTON': () => (
		<div class="grid grid-cols-3 items-center justify-items-center gap-6">
			<div class="grid gap-6 text-center items-center justify-items-center">
				<KolLinkButton _label="Primary" _variant="primary">
					Primary
				</KolLinkButton>
				<KolLinkButton _label="Secondary" _variant="secondary">
					Secondary
				</KolLinkButton>
				<KolLinkButton _label="Normal" _variant="normal">
					Normal
				</KolLinkButton>
				<KolLinkButton _label="Danger" _variant="danger">
					Danger
				</KolLinkButton>
				<KolLinkButton _label="Ghost" _variant="ghost">
					Ghost
				</KolLinkButton>
				<KolLinkButton _label="Loading" _customClass="loading" _variant="custom">
					Loading
				</KolLinkButton>
			</div>
			<div class="grid gap-6 text-center items-center justify-items-center">
				<KolLinkButton _icon="icofont-home" _label="Primary" _variant="primary">
					Primary
				</KolLinkButton>
				<KolLinkButton _icon="icofont-home" _label="Secondary" _variant="secondary">
					Secondary
				</KolLinkButton>
				<KolLinkButton _icon="icofont-home" _label="Normal" _variant="normal">
					Normal
				</KolLinkButton>
				<KolLinkButton _icon="icofont-home" _label="Danger" _variant="danger">
					Danger
				</KolLinkButton>
				<KolLinkButton _icon="icofont-home" _label="Ghost" _variant="ghost">
					Ghost
				</KolLinkButton>
				<KolLinkButton _icon="icofont-home" _label="Loading" _customClass="loading" _variant="custom">
					Loading
				</KolLinkButton>
			</div>
			<div class="grid gap-6 text-center items-center justify-items-center">
				<KolLinkButton _icon="icofont-home" _iconAlign="right" _label="Primary" _variant="primary" style="width: 120px">
					Primary
				</KolLinkButton>
				<KolLinkButton _icon="icofont-home" _iconAlign="right" _label="Secondary" _variant="secondary" style="width: 120px">
					Secondary
				</KolLinkButton>
				<KolLinkButton _icon="icofont-home" _iconAlign="right" _label="Normal" _variant="normal" style="width: 120px">
					Normal
				</KolLinkButton>
				<KolLinkButton _icon="icofont-home" _iconAlign="right" _label="Danger" _variant="danger" style="width: 120px">
					Danger
				</KolLinkButton>
				<KolLinkButton _icon="icofont-home" _iconAlign="right" _label="Ghost" _variant="ghost" style="width: 120px">
					Ghost
				</KolLinkButton>
				<KolLinkButton _icon="icofont-home" _iconAlign="right" _label="Loading" _customClass="loading" _variant="custom" style="width: 120px">
					Loading
				</KolLinkButton>
			</div>
			<div class="grid gap-6 text-center items-center justify-items-center">
				<KolLinkButton _icon="icofont-home" _iconOnly _label="Primary" _variant="primary">
					Primary
				</KolLinkButton>
				<KolLinkButton _icon="icofont-home" _iconOnly _label="Secondary" _variant="secondary" _tooltipAlign="right">
					Secondary
				</KolLinkButton>
				<KolLinkButton _icon="icofont-home" _iconOnly _label="Normal" _variant="normal" _tooltipAlign="bottom">
					Normal
				</KolLinkButton>
				<KolLinkButton _icon="icofont-home" _iconOnly _label="Danger" _variant="danger" _tooltipAlign="left">
					Danger
				</KolLinkButton>
				<KolLinkButton _icon="icofont-home" _iconOnly _label="Ghost" _variant="ghost" _tooltipAlign="top">
					Ghost
				</KolLinkButton>
				<KolLinkButton _icon="icofont-home" _iconOnly _label="Loading" _customClass="loading" _variant="custom" _tooltipAlign="top">
					Loading
				</KolLinkButton>
			</div>
			<div class="grid gap-6 text-center items-center justify-items-center border border-red p-2">
				<div class="w-full text-left">
					<KolDetails _summary="Hinweis">
						Einen Link kann man nicht deaktivieren und daher ist das Property `_disabled` bei einem LinkButton nicht vorgesehen.
					</KolDetails>
				</div>
				<KolLinkButton class="opacity-25" _icon="icofont-home" _disabled _label="Primary" _variant="primary">
					Primary
				</KolLinkButton>
				<KolLinkButton class="opacity-25" _icon="icofont-home" _disabled _label="Secondary" _variant="secondary">
					Secondary
				</KolLinkButton>
				<KolLinkButton class="opacity-25" _icon="icofont-home" _disabled _label="Normal" _variant="normal">
					Normal
				</KolLinkButton>
				<KolLinkButton class="opacity-25" _icon="icofont-home" _disabled _label="Danger" _variant="danger">
					Danger
				</KolLinkButton>
				<KolLinkButton class="opacity-25" _icon="icofont-home" _disabled _label="Ghost" _variant="ghost">
					Ghost
				</KolLinkButton>
				<KolLinkButton class="opacity-25" _icon="icofont-home" _disabled _label="Loading" _customClass="loading" _variant="custom">
					Loading
				</KolLinkButton>
			</div>
			<div class="grid gap-6 text-center items-center justify-items-center">
				<KolLinkButton
					_icon={{
						left: 'icofont-arrow-left',
						right: 'icofont-arrow-right',
						top: 'icofont-arrow-up',
						bottom: 'icofont-arrow-down',
					}}
					_label="Primary"
					_variant="primary"
				>
					Primary
				</KolLinkButton>
				<KolLinkButton
					_icon={{
						left: 'icofont-arrow-left',
						right: 'icofont-arrow-right',
						top: 'icofont-arrow-up',
						bottom: 'icofont-arrow-down',
					}}
					_label="Secondary"
					_variant="secondary"
				>
					Secondary
				</KolLinkButton>
				<KolLinkButton
					_icon={{
						left: 'icofont-arrow-left',
						right: 'icofont-arrow-right',
						top: 'icofont-arrow-up',
						bottom: 'icofont-arrow-down',
					}}
					_label="Normal"
					_variant="normal"
				>
					Normal
				</KolLinkButton>
				<KolLinkButton
					_icon={{
						left: 'icofont-arrow-left',
						right: 'icofont-arrow-right',
						top: 'icofont-arrow-up',
						bottom: 'icofont-arrow-down',
					}}
					_label="Danger"
					_variant="danger"
				>
					Danger
				</KolLinkButton>
				<KolLinkButton
					_icon={{
						left: 'icofont-arrow-left',
						right: 'icofont-arrow-right',
						top: 'icofont-arrow-up',
						bottom: 'icofont-arrow-down',
					}}
					_label="Ghost"
					_variant="ghost"
				>
					Ghost
				</KolLinkButton>
				<KolLinkButton
					_icon={{
						left: 'icofont-arrow-left',
						right: 'icofont-arrow-right',
						top: 'icofont-arrow-up',
						bottom: 'icofont-arrow-down',
					}}
					_label="Loading"
					_customClass="loading"
					_variant="custom"
				>
					Loading
				</KolLinkButton>
			</div>
		</div>
	),
	'KOL-BUTTON-GROUP': () => (
		<div class="grid gap-6 text-center">
			<KolButtonGroup>
				<KolButton _label="Primary" _variant="primary"></KolButton>
				<KolButton _label="Secondary" _variant="secondary"></KolButton>
				<KolButton _label="Normal" _variant="normal"></KolButton>
				<KolButton _label="Danger" _variant="danger"></KolButton>
				<KolButton _label="Ghost" _variant="ghost"></KolButton>
				<KolButton _label="Disabled" _disabled></KolButton>
			</KolButtonGroup>
			<KolButtonGroup>
				<KolButton _label="Primary" _variant="primary"></KolButton>
				<KolButton _label="Secondary" _variant="secondary"></KolButton>
				<KolButton _label="Normal" _variant="normal"></KolButton>
				<KolButton _label="Danger" _icon="icofont-trash" _iconOnly _variant="danger"></KolButton>
				<KolButton _label="Ghost" _icon="icofont-info" _iconOnly _variant="ghost"></KolButton>
				<KolButton _label="Disabled" _icon="icofont-lock" _iconOnly _disabled></KolButton>
			</KolButtonGroup>
		</div>
	),
	'KOL-CARD': () => (
		<div class="grid xl:grid-cols-2 2xl:grid-cols-3 gap-6">
			<KolCard _hasFooter _heading="H1-Überschrift der Card" _level={1}>
				<div slot="content">
					Inhalt der Card Hier wird der Fehler näher beschrieben. Hier wird der Fehler näher beschrieben. Hier wird der Fehler näher beschrieben. Hier wird der
					Fehler näher beschrieben. Hier wird der Fehler näher beschrieben.
				</div>
				<div slot="footer">Fußbereich der Card</div>
			</KolCard>
			<KolCard _heading="H2-Überschrift der Card" _level={2}>
				<div slot="content">Inhalt der Card</div>
			</KolCard>
			<KolCard _heading="Bild in der Card" _hasFooter _level={2}>
				<div slot="content">
					<img alt="Einleitungsbild der Stadtverwaltung" class="w-full" src="http://placeimg.com/400/200/arch" />
				</div>
				<div slot="footer">
					<KolButtonGroup>
						<KolButton _label="Kaufen" _variant="primary"></KolButton>
						<KolButton _label="Löschen" _icon="icofont-trash" _iconOnly _variant="danger"></KolButton>
					</KolButtonGroup>
				</div>
			</KolCard>
			<KolCard _heading="H3-Überschrift der Card" _level={3}>
				<div slot="header">Fußbereich der Card</div>
				<div slot="content">
					Inhalt der Card Hier wird der Fehler näher beschrieben. Hier wird der Fehler näher beschrieben. Hier wird der Fehler näher beschrieben. Hier wird der
					Fehler näher beschrieben. Hier wird der Fehler näher beschrieben. Hier wird der Fehler näher beschrieben.
				</div>
			</KolCard>
			<KolCard _hasFooter _heading="H4-Überschrift der Card" _level={4}>
				<div slot="content">Inhalt der Card</div>
				<div slot="footer">Fußbereich der Card</div>
			</KolCard>
			<KolCard _hasFooter _heading="H5-Überschrift der Card" _level={5}>
				<div slot="content">Inhalt der Card</div>
				<div slot="footer">Fußbereich der Card</div>
			</KolCard>
			<KolCard _hasFooter _heading="H6-Überschrift der Card" _level={6}>
				<div slot="content">Inhalt der Card</div>
				<div slot="footer">
					<KolButtonGroup>
						<KolButton _label="Speichern" _variant="primary"></KolButton>
						<KolButton _label="Abbrechen" _variant="secondary"></KolButton>
						<KolButton _label="Löschen" _variant="danger"></KolButton>
					</KolButtonGroup>
				</div>
			</KolCard>
		</div>
	),
	'KOL-DETAILS': () => (
		<div class="grid justify-center gap-6">
			<KolDetails _open _summary="Ihre Überschrift 1">
				Inhalt der ersten Details-Komponente
			</KolDetails>
			<KolDetails _open _summary="Ihre Überschrift 2">
				Inhalt der zweiten Details-Komponente
			</KolDetails>
		</div>
	),
	'KOL-HEADING': () => (
		<div class="grid grid-cols-2">
			<div class="grid gap-6 text-center">
				<KolHeading _level={1}>H1-Überschrift</KolHeading>
				<KolHeading _level={2}>H2-Überschrift</KolHeading>
				<KolHeading _level={3}>H3-Überschrift</KolHeading>
				<KolHeading _level={4}>H4-Überschrift</KolHeading>
				<KolHeading _level={5}>H5-Überschrift</KolHeading>
				<KolHeading _level={6}>H6-Überschrift</KolHeading>
			</div>
		</div>
	),
	'KOL-ICON': () => (
		<div class="grid justify-center gap-6">
			<strong>Icofont</strong>
			<div class="flex gap-2">
				<KolIcon _ariaLabel="icofont" _icon="icofont-home"></KolIcon>
				<KolIcon _ariaLabel="icofont" _icon="icofont-arrow-right"></KolIcon>
			</div>
			<strong>Codicon</strong>
			<div class="flex gap-2">
				<KolIcon _ariaLabel="codicon" _icon="codicon codicon-home"></KolIcon>
				<KolIcon _ariaLabel="codicon" _icon="codicon codicon-arrow-right"></KolIcon>
			</div>
			<strong>Font-Awesome</strong>
			<div class="flex gap-2">
				<KolIcon _ariaLabel="font-awesome" _icon="fa-solid fa-house"></KolIcon>
				<KolIcon _ariaLabel="font-awesome" _icon="fa-solid fa-arrow-right"></KolIcon>
			</div>
		</div>
	),
	'KOL-INDENTED-TEXT': () => (
		<div class="grid justify-center gap-6">
			<KolIndentedText>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
			</KolIndentedText>
		</div>
	),
	'KOL-INPUT-CHECKBOX': () => (
		<div class="grid justify-center gap-6">
			<div class="grid gap-6 text-center">
				<KolInputCheckbox _id="anrede" _name="anrede" _required _type="checkbox">
					Nicht ausgewählt
				</KolInputCheckbox>
				<KolInputCheckbox _checked _id="anrede" _name="anrede" _type="checkbox" _touched _error={ERROR_MSG}>
					Ausgewählt
				</KolInputCheckbox>
				<KolInputCheckbox _id="anrede" _indeterminate _name="anrede" _type="checkbox">
					Unbestimmt (Indeterminate)
				</KolInputCheckbox>
			</div>
			<div class="grid gap-6 text-center">
				<KolInputCheckbox _id="anrede" _name="anrede" _type="switch" _error={ERROR_MSG}>
					Nicht ausgewählt
				</KolInputCheckbox>
				<KolInputCheckbox _checked _id="anrede" _name="anrede" _type="switch">
					Ausgewählt
				</KolInputCheckbox>
				<KolInputCheckbox _id="anrede" _disabled _indeterminate _name="anrede" _type="switch" _touched _error={ERROR_MSG}>
					Unbestimmt (Indeterminate)
				</KolInputCheckbox>
			</div>
		</div>
	),
	'KOL-INPUT-COLOR': () => (
		<div class="grid justify-center gap-6">
			<KolInputColor
				_id="farbe"
				_name="farbe"
				_value="#ff0000"
				_error={ERROR_MSG}
				_icon={{
					left: {
						icon: 'icofont-home',
					},
					right: {
						icon: 'icofont-home',
					},
				}}
				_touched
			>
				Farbe
			</KolInputColor>
			<KolInputColor _id="farbe" _name="farbe" _list="['#000000','#ff0000', '#0000ff','#00ff00']" _error={ERROR_MSG}>
				Farbe
			</KolInputColor>
			<KolInputColor _disabled _id="farbe" _name="farbe" _value="#ff0000">
				Farbe (Disabled)
			</KolInputColor>
		</div>
	),
	'KOL-INPUT-DATE': () => (
		<div class="grid justify-center gap-6">
			<KolInputDate _id="date" _name="date" _type="date">
				Datumseingabe
			</KolInputDate>
			<KolInputDate _id="time" _name="time" _type="datetime-local">
				Local-Datetime (Standard)
			</KolInputDate>
			<KolInputDate _id="time" _name="time" _step={1} _type="datetime-local" _error={ERROR_MSG}>
				Local-Datetime (mit Sekunden)
			</KolInputDate>
			<KolInputDate _id="month" _name="month" _type="month">
				Monat
			</KolInputDate>
			<KolInputDate _id="week" _name="week" _type="week">
				Woche
			</KolInputDate>
			<KolInputDate _id="time" _name="time" _type="time">
				Zeit (Standard)
			</KolInputDate>
			<KolInputDate _id="time" _name="time" _step={1} _type="time">
				Zeit (mit Sekunden)
			</KolInputDate>
			<KolInputDate _id="date" _name="date" _read-only>
				Zahleneingabe (Readonly)
			</KolInputDate>
			<KolInputDate _disabled _id="date" _name="date">
				Zahleneingabe (Disabled)
			</KolInputDate>
		</div>
	),
	'KOL-INPUT-EMAIL': () => (
		<div class="grid justify-center gap-6">
			<KolInputEmail _id="email" _name="email" _required _value="test@mail.de" _error={ERROR_MSG}>
				E-Mail
			</KolInputEmail>
			<KolInputEmail
				_id="email"
				_name="email"
				_placeholder="elke@mustermann.de"
				_list="['test1@mail.de', 'test2@mail.de', 'test3@mail.de']"
				_error={ERROR_MSG}
				_icon={{
					left: {
						icon: 'icofont-home',
					},
					right: {
						icon: 'icofont-home',
					},
				}}
				_touched
			>
				E-Mail (Liste)
			</KolInputEmail>
			<KolInputEmail _disabled _id="email" _name="email" _value="test@mail.de">
				E-Mail (Disabled)
			</KolInputEmail>
			<KolInputEmail _id="email" _name="email" _read-only _value="test@mail.de">
				E-Mail (Readonly)
			</KolInputEmail>
		</div>
	),
	'KOL-INPUT-FILE': () => (
		<div class="grid justify-center gap-6">
			<KolInputFile
				_id="file"
				_name="file"
				_required
				_error={ERROR_MSG}
				_icon={{
					left: {
						icon: 'icofont-home',
					},
					right: {
						icon: 'icofont-home',
					},
				}}
				_touched
			>
				Datei hochladen
			</KolInputFile>
			<KolInputFile _id="file" _multiple _name="file" _error={ERROR_MSG}>
				Datei hochladen (Multiple)
			</KolInputFile>
			<KolInputFile _disabled _id="file" _name="file">
				Datei hochladen (Disabled)
			</KolInputFile>
		</div>
	),
	'KOL-INPUT-NUMBER': () => (
		<div class="grid justify-center gap-6">
			<KolInputNumber
				_id="number"
				_name="number"
				_required
				_type="number"
				_error={ERROR_MSG}
				_placeholder="Mit Icons"
				_icon={{
					left: {
						icon: 'icofont-home',
					},
					right: {
						icon: 'icofont-home',
					},
				}}
				_touched
			>
				Zahleneingabe
			</KolInputNumber>
			<KolInputNumber _id="number" _max={10} _min={-10} _name="number" _step={2} _type="number">
				Zahleneingabe (-10 bis 10 in 2er Schritten)
			</KolInputNumber>
			<KolInputNumber _id="date" _name="date" _type="date">
				Datumseingabe
			</KolInputNumber>
			<KolInputNumber _id="time" _name="time" _type="datetime-local">
				Local-Datetime (Standard)
			</KolInputNumber>
			<KolInputNumber _id="time" _name="time" _step={1} _type="datetime-local" _error={ERROR_MSG}>
				Local-Datetime (mit Sekunden)
			</KolInputNumber>
			<KolInputNumber _id="month" _name="month" _type="month">
				Monat
			</KolInputNumber>
			<KolInputNumber _id="week" _name="week" _type="week">
				Woche
			</KolInputNumber>
			<KolInputNumber _id="time" _name="time" _type="time">
				Zeit (Standard)
			</KolInputNumber>
			<KolInputNumber _id="time" _name="time" _step={1} _type="time">
				Zeit (mit Sekunden)
			</KolInputNumber>
			<KolInputNumber _id="number" _name="number" _read-only _type="number">
				Zahleneingabe (Readonly)
			</KolInputNumber>
			<KolInputNumber _disabled _id="number" _name="number" _type="number">
				Zahleneingabe (Disabled)
			</KolInputNumber>
		</div>
	),
	'KOL-INPUT-PASSWORD': () => (
		<div class="grid justify-center gap-6">
			<KolInputPassword
				_id="password"
				_name="password"
				_required
				_error={ERROR_MSG}
				_placeholder="Mit Icons"
				_icon={{
					left: {
						icon: 'icofont-home',
					},
					right: {
						icon: 'icofont-home',
					},
				}}
				_smartButton={{
					_icon: {
						left: {
							icon: 'icofont-eye',
						},
					},
					_iconOnly: true,
					_label: 'Passwort anzeigen',
					_on: {
						onClick: () => {},
					},
				}}
				_touched
			>
				Passwort
			</KolInputPassword>
			<KolInputPassword _disabled _id="password" _name="password" _error={ERROR_MSG}>
				Passwort (Disabled)
			</KolInputPassword>
			<KolInputPassword _id="password" _name="password" _read-only>
				Passwort (Readonly)
			</KolInputPassword>
		</div>
	),
	'KOL-INPUT-RADIO': () => (
		<div class="grid justify-center gap-6">
			<KolInputRadio
				_id="anrede"
				_error={ERROR_MSG}
				_name="anrede"
				_list="[{'label':'Frau','value':'Frau'},{'label':'Herr','value':'Herr'},{'label':'Firma','value':'Firma'}]"
			>
				Anrede
			</KolInputRadio>
			<KolInputRadio
				_id="anrede"
				_required
				_error={ERROR_MSG}
				_name="anrede2"
				_value="Firma"
				_list="[{'label':'Frau','value':'Frau'},{'label':'Herr','value':'Herr'},{'label':'Firma','value':'Firma'}]"
			>
				Anrede
			</KolInputRadio>
			<KolInputRadio
				_id="anrede"
				_orientation="horizontal"
				_required
				_error={ERROR_MSG}
				_name="anrede2"
				_value="Firma"
				_list="[{'label':'Frau','value':'Frau'},{'label':'Herr','value':'Herr'},{'label':'Firma','value':'Firma'}]"
			>
				Anrede (horizontal)
			</KolInputRadio>
			<KolInputRadio
				_id="anrede"
				_disabled
				_touched
				_error={ERROR_MSG}
				_name="anrede3"
				_value="Firma"
				_list="[{'label':'Frau','value':'Frau'},{'label':'Herr','value':'Herr'},{'label':'Firma','value':'Firma'}]"
			>
				Anrede
			</KolInputRadio>
		</div>
	),
	'KOL-INPUT-RANGE': () => (
		<div class="grid justify-center gap-6">
			<KolInputRange
				_id="range"
				_min={0}
				_max={50}
				_name="range"
				_error={ERROR_MSG}
				_icon={{
					left: {
						icon: 'icofont-home',
					},
					right: {
						icon: 'icofont-home',
					},
				}}
				_touched
			>
				Schieberegler
			</KolInputRange>
			<KolInputRange _id="range" _min={0} _max={50} _name="range" _step={10} _error={ERROR_MSG}>
				Schieberegler
			</KolInputRange>
			<KolInputRange _disabled _id="range" _min={0} _max={50} _name="range">
				Schieberegler
			</KolInputRange>
		</div>
	),
	'KOL-INPUT-TEXT': () => (
		<div class="grid justify-center gap-6 bg-red-100">
			<KolInputText
				_id=""
				_hint={HINT_MSG}
				_error={ERROR_MSG}
				_placeholder="Mit Icons"
				_icon={{
					left: 'icofont-arrow-left',
					right: {
						icon: 'icofont-arrow-right',
						style: {
							'font-size': '200%',
						},
					},
				}}
				_hideLabel
				_required
				_smartButton={{
					_icon: {
						left: {
							icon: 'icofont-eye',
						},
					},
					_iconOnly: true,
					_label: 'Passwort anzeigen',
					_on: {
						onClick: () => {},
					},
				}}
				_touched
				_type="search"
			>
				Suche
			</KolInputText>
			<KolInputText
				_id=""
				_error={ERROR_MSG}
				_placeholder="Mit Icons"
				_icon={{
					left: {
						icon: 'icofont-home',
					},
					right: {
						icon: 'icofont-home',
					},
				}}
				_hideLabel
				_touched
				_type="search"
			>
				Suche
			</KolInputText>
			<KolInputText _id="" _placeholder="Placeholder" _required _type="text">
				Vorname (text)
			</KolInputText>
			<KolInputText _id="" _placeholder="Placeholder" _type="search">
				Suche (search)
			</KolInputText>
			<KolInputText _id="vorname" _name="vorname" _placeholder="Placeholder" _error={ERROR_MSG} _touched _type="url">
				URL (url)
			</KolInputText>
			<KolInputText _id="" _placeholder="Placeholder" _type="tel">
				Telefon (tel)
			</KolInputText>
			<KolInputText _id="" _placeholder="Placeholder" _read-only _type="text">
				Vorname (text, readonly)
			</KolInputText>
			<KolInputText _id="" _value="Value" _read-only _type="text">
				Vorname (text, readonly)
			</KolInputText>
			<KolInputText _id="" _placeholder="Placeholder" _disabled _type="text">
				Vorname (text, disabled)
			</KolInputText>
			<KolInputText _id="" _value="Value" _disabled _type="text">
				Vorname (text, disabled)
			</KolInputText>
		</div>
	),
	'KOL-LINK-GROUP': () => (
		<div class="grid justify-center gap-6">
			<KolLinkGroup
				_ariaLabel=""
				_heading="Überschrift für diese Linkgroup"
				_links={[
					{ _label: 'Link nur Text', _href: 'https://www.w3.org' },
					{ _label: 'Link mit Icon', _href: 'https://www.w3.org', _icon: 'icofont-home' },
					{ _label: 'Link nur Icon', _href: 'https://www.w3.org', _icon: 'icofont-home' },
					{ _label: 'Link ohne Unterstrich', _href: 'https://www.w3.org' },
				]}
				_orientation="vertical"
			></KolLinkGroup>
			<KolLinkGroup
				_ariaLabel=""
				_heading="Horizontale Linkgroup"
				_links={[
					{ _label: 'Link nur Text', _href: 'https://www.w3.org' },
					{ _label: 'Link mit Icon', _href: 'https://www.w3.org', _icon: 'icofont-home' },
					{ _label: 'Link nur Icon', _href: 'https://www.w3.org', _icon: 'icofont-home' },
					{ _label: 'Link ohne Unterstrich', _href: 'https://www.w3.org' },
				]}
				_orientation="horizontal"
			></KolLinkGroup>
		</div>
	),
	'KOL-LINK': () => (
		<div class="grid justify-items-center gap-6">
			<KolLink _href="https://www.w3.org" _icon="icofont-home" _iconOnly _ariaLabel="Home"></KolLink>
			<KolLink _href="https://www.w3.org">Normaler Link</KolLink>
			<KolLink _href="https://www.w3.org" _icon="icofont-home" _iconAlign="left">
				Normaler Link mit Icon links
			</KolLink>
			<KolLink _href="https://www.w3.org" _icon="icofont-home" _iconAlign="right">
				Normaler Link mit Icon rechts
			</KolLink>
			<KolLink _href="https://www.w3.org" _icon="icofont-home" _iconOnly>
				Nur Icon-Link
			</KolLink>
			<KolLink _href="https://www.w3.org" _target="w3c">
				Externer Link
			</KolLink>
			<KolLink _href="/">Besuchter Link</KolLink>
			<KolLink _href="#/" _useCase="image" _ariaLabel="Zurück zur Startseite">
				<KolLogo class="inline-flex w-50" _org={Bundesanstalt['Informationstechnikzentrum Bund']}></KolLogo>
			</KolLink>
			<KolIndentedText>
				<p>
					<b>Links sind unsichtbar geschalten</b>
					<br />
					Um die Links zu sehen, am besten einmal in diesen Bereich klicken und Tab-Taste drücken.
				</p>
			</KolIndentedText>
			<KolSkipNav
				_ariaLabel="Skip-Nav"
				_links={[
					{ _label: 'Link nur Text', _href: 'https://www.w3.org' },
					{ _label: 'Link mit Icon', _href: 'https://www.w3.org', _icon: 'icofont-home' },
					{ _label: 'Link nur Icon', _href: 'https://www.w3.org', _icon: 'icofont-home' },
					{ _label: 'Link ohne Unterstrich', _href: 'https://www.w3.org' },
				]}
			></KolSkipNav>
		</div>
	),
	'KOL-BUTTON-LINK': () => (
		<div class="grid justify-items-center gap-6">
			<KolButtonLink _icon="icofont-home" _iconOnly _label="Label-Text"></KolButtonLink>
			<KolButtonLink _ariaLabel="Label-Text (aria-label)" _icon="icofont-home" _iconOnly _label="Label-Text"></KolButtonLink>
			<KolButtonLink _label="Normaler Link"></KolButtonLink>
			<KolButtonLink _icon="icofont-home" _iconAlign="left" _label="Normaler Link mit Icon links"></KolButtonLink>
			<KolButtonLink _icon="icofont-home" _iconAlign="right" _label="Normaler Link mit Icon rechts"></KolButtonLink>
			<KolButtonLink _icon="icofont-home" _iconOnly _label="Nur Icon-Link"></KolButtonLink>
			<KolButtonLink _label="Externer Link (gibt es nicht bei ButtonLink)"></KolButtonLink>
			<KolButtonLink _label="Besuchter Link (gibt es nicht bei ButtonLink)"></KolButtonLink>
			<KolButtonLink _ariaLabel="Zurück zur Startseite" _label="">
				<KolLogo class="inline-flex w-50" _org={Bundesanstalt['Informationstechnikzentrum Bund']}></KolLogo>
			</KolButtonLink>
			<KolIndentedText>
				<p>
					<b>Links sind unsichtbar geschalten</b>
					<br />
					Um die Links zu sehen, am besten einmal in diesen Bereich klicken und Tab-Taste drücken.
				</p>
			</KolIndentedText>
			<KolSkipNav
				_ariaLabel="Skip-Nav"
				_links={[
					{ _label: 'Link nur Text', _href: 'https://www.w3.org' },
					{ _label: 'Link mit Icon', _href: 'https://www.w3.org', _icon: 'icofont-home' },
					{ _label: 'Link nur Icon', _href: 'https://www.w3.org', _icon: 'icofont-home' },
					{ _label: 'Link ohne Unterstrich', _href: 'https://www.w3.org' },
				]}
			></KolSkipNav>
		</div>
	),
	'KOL-LOGO': () => (
		<div class="grid justify-center gap-6">
			<KolLogo _org={Bundesministerium['Die Bundesregierung']}></KolLogo>
			<KolLogo _org={Bundesministerium['Bundesministerium der Finanzen']}></KolLogo>
			<KolLogo _org={Bundesministerium['Bundesministerium für Gesundheit']}></KolLogo>
		</div>
	),
	'KOL-MODAL': () => (
		<div class="grid justify-center gap-6">
			<KolModal
				_ariaLabel=""
				_width="80%"
				ref={(element) => {
					modalElement = element;
				}}
			>
				<KolCard _heading="Ich bin ein Modal">
					<div slot="content">
						<KolButton
							_label="Schließen"
							_on={{
								onClick: () => {
									modalElement._activeElement = null;
								},
							}}
						></KolButton>
					</div>
				</KolCard>
			</KolModal>
			<KolButton
				_label="Modal öffnen"
				_on={{
					onClick: (event: Event) => {
						if (modalElement instanceof HTMLElement) {
							modalElement._activeElement = event.target as HTMLElement;
						}
					},
				}}
			></KolButton>
		</div>
	),
	'KOL-NAV': () => (
		<div class="col-12 grid gap-6">
			<div class="inline-flex">
				<KolNav
					class="font-80 max-width"
					_ariaLabel="Navigation in der Breite beschränkt"
					_has-compact-button
					_links={[
						{
							_label: '1 Navigationspunkt mit sehr langem Link-Test',
							_href: '#abc',
							_icon: 'woodpecker',
							_target: 'asdasd',
						},
						{
							_label: '2 Navigationspunkt und ich_bin_ein_echt_langes_zusammengesetztes_Worte_und_versuche_das_Layout_zu_brechen',
							_href: '#abc',
							_icon: 'woodpecker',
						},
						{
							_active: true,
							_label: '3 Navigationspunkt',
							_href: '#abc',
							_icon: 'woodpecker',
							_children: [
								{ _label: '3.1 Navigationspunkt', _href: '#abc', _icon: 'woodpecker' },
								{ _label: '3.2 Navigationspunkt', _href: '#abc', _icon: 'woodpecker', _target: 'asdasd' },
								{
									_active: true,
									_label: '3.3 Navigationspunkt',
									_href: '#abc',
									_children: [
										{ _active: true, _label: '3.3.1 Navigationspunkt (aktiv)', _href: '#abc' },
										{ _label: '3.3.2 Navigationspunkt', _href: '#abc' },
									],
								},
								{
									_label: '3.4 Navigationspunkt',
									_href: '#abc',
									_children: [
										{ _label: '3.4.1 Navigationspunkt', _href: '#abc' },
										{ _label: '3.4.2 Navigationspunkt', _href: '#abc' },
									],
								},
								{ _label: '3.5 Navigationspunkt', _href: '#abc' },
							],
						},
						{ _label: '4 Navigationspunkt', _href: '#abc' },
					]}
				></KolNav>
			</div>
			<div class="inline-flex">
				<KolNav
					class="font-60 max-width"
					_ariaLabel="Navigation initial eingeklappt"
					_compact
					_links={[
						{
							_label: '1 Navigationspunkt mit sehr langem Link-Test',
							_href: '#abc',
							_icon: 'woodpecker',
							_target: 'asdasd',
						},
						{
							_label: '2 Navigationspunkt und ich_bin_ein_echt_langes_zusammengesetztes_Worte_und_versuche_das_Layout_zu_brechen',
							_href: '#abc',
							_icon: 'woodpecker',
						},
						{
							_active: true,
							_label: '3 Navigationspunkt',
							_href: '#abc',
							_icon: 'woodpecker',
							_children: [
								{ _label: '3.1 Navigationspunkt', _href: '#abc', _icon: 'woodpecker' },
								{ _label: '3.2 Navigationspunkt', _href: '#abc', _icon: 'woodpecker', _target: 'asdasd' },
								{
									_active: true,
									_label: '3.3 Navigationspunkt',
									_href: '#abc',
									_children: [
										{ _active: true, _label: '3.3.1 Navigationspunkt (aktiv)', _href: '#abc' },
										{ _label: '3.3.2 Navigationspunkt', _href: '#abc' },
									],
								},
								{
									_label: '3.4 Navigationspunkt',
									_href: '#abc',
									_children: [
										{ _label: '3.4.1 Navigationspunkt', _href: '#abc' },
										{ _label: '3.4.2 Navigationspunkt', _href: '#abc' },
									],
								},
								{ _label: '3.5 Navigationspunkt', _href: '#abc' },
							],
						},
						{ _label: '4 Navigationspunkt', _href: '#abc' },
					]}
				></KolNav>
			</div>
			<div class="inline-flex">
				<KolNav
					_ariaLabel="Navigation mit sinnvoller Breite"
					_links={[
						{
							_label: '1 Navigationspunkt mit sehr langem Link-Test',
							_href: '#abc',
							_icon: 'woodpecker',
							_target: 'asdasd',
						},
						{
							_label: '2 Navigationspunkt und ich_bin_ein_echt_langes_zusammengesetztes_Worte_und_versuche_das_Layout_zu_brechen',
							_href: '#abc',
							_icon: 'woodpecker',
						},
						{
							_active: true,
							_label: '3 Navigationspunkt',
							_href: '#abc',
							_icon: 'woodpecker',
							_children: [
								{ _label: '3.1 Navigationspunkt', _href: '#abc', _icon: 'woodpecker' },
								{ _label: '3.2 Navigationspunkt', _href: '#abc', _icon: 'woodpecker', _target: 'asdasd' },
								{
									_active: true,
									_label: '3.3 Navigationspunkt',
									_href: '#abc',
									_children: [
										{ _active: true, _label: '3.3.1 Navigationspunkt (aktiv)', _href: '#abc' },
										{ _label: '3.3.2 Navigationspunkt', _href: '#abc' },
									],
								},
								{
									_label: '3.4 Navigationspunkt',
									_href: '#abc',
									_children: [
										{ _label: '3.4.1 Navigationspunkt', _href: '#abc' },
										{ _label: '3.4.2 Navigationspunkt', _href: '#abc' },
									],
								},
								{ _label: '3.5 Navigationspunkt', _href: '#abc' },
							],
						},
						{ _label: '4 Navigationspunkt', _href: '#abc' },
					]}
					_orientation="horizontal"
				></KolNav>
			</div>
			<div class="inline-flex">
				<KolNav
					class="font-80"
					style="display: inline-flex"
					_ariaLabel="Navigation mit sinnvoller Breite"
					_links={[
						{
							_label: '1 Navigationspunkt mit sehr langem Link-Test',
							_href: '#abc',
							_icon: 'woodpecker',
							_iconOnly: true,
							_target: 'asdasd',
						},
						{
							_label: '2 Navigationspunkt und ich_bin_ein_echt_langes_zusammengesetztes_Worte_und_versuche_das_Layout_zu_brechen',
							_href: '#abc',
							_icon: 'woodpecker',
							_iconOnly: true,
						},
						{
							_active: true,
							_label: '3 Navigationspunkt',
							_href: '#abc',
							_icon: 'woodpecker',
							_iconOnly: true,
							_children: [
								{ _label: '3.1 Navigationspunkt', _href: '#abc', _icon: 'woodpecker' },
								{ _label: '3.2 Navigationspunkt', _href: '#abc', _icon: 'woodpecker', _target: 'asdasd' },
								{
									_active: true,
									_label: '3.3 Navigationspunkt',
									_href: '#abc',
									_children: [
										{ _active: true, _label: '3.3.1 Navigationspunkt (aktiv)', _href: '#abc' },
										{ _label: '3.3.2 Navigationspunkt', _href: '#abc' },
									],
								},
								{
									_label: '3.4 Navigationspunkt',
									_href: '#abc',
									_children: [
										{ _label: '3.4.1 Navigationspunkt', _href: '#abc' },
										{ _label: '3.4.2 Navigationspunkt', _href: '#abc' },
									],
								},
								{ _label: '3.5 Navigationspunkt', _href: '#abc' },
							],
						},
						{ _label: '4 Navigationspunkt', _href: '#abc', _iconOnly: true },
					]}
					_orientation="horizontal"
				></KolNav>
			</div>
			<div class="inline-flex">
				<KolNav
					class="font-80"
					style="display: inline-flex"
					_ariaLabel="Navigation mit sinnvoller Breite"
					_links={[
						{
							_label: '1 Navigationspunkt mit sehr langem Link-Test',
							_href: '#abc',
							_icon: 'woodpecker',
							_iconOnly: true,
							_target: 'asdasd',
						},
						{
							_label: '2 Navigationspunkt und ich_bin_ein_echt_langes_zusammengesetztes_Worte_und_versuche_das_Layout_zu_brechen',
							_href: '#abc',
							_icon: 'woodpecker',
							_iconOnly: true,
						},
						{
							_label: '3 Navigationspunkt',
							_href: '#abc',
							_icon: 'woodpecker',
							_iconOnly: true,
							_children: [
								{ _label: '3.1 Navigationspunkt', _href: '#abc', _icon: 'woodpecker' },
								{ _label: '3.2 Navigationspunkt', _href: '#abc', _icon: 'woodpecker', _target: 'asdasd' },
								{
									_label: '3.3 Navigationspunkt',
									_href: '#abc',
									_children: [
										{ _label: '3.3.1 Navigationspunkt', _href: '#abc' },
										{ _label: '3.3.2 Navigationspunkt', _href: '#abc' },
									],
								},
								{
									_label: '3.4 Navigationspunkt',
									_href: '#abc',
									_children: [
										{ _label: '3.4.1 Navigationspunkt', _href: '#abc' },
										{ _label: '3.4.2 Navigationspunkt', _href: '#abc' },
									],
								},
								{ _active: true, _label: '3.5 Navigationspunkt (aktiv)', _href: '#abc' },
							],
						},
						{ _label: '4 Navigationspunkt', _href: '#abc', _iconOnly: true },
					]}
					_orientation="horizontal"
				></KolNav>
			</div>
		</div>
	),
	'KOL-PAGINATION': () => (
		<div class="grid justify-center gap-6">
			<KolPagination _on={{}} _total={15} _page={6} _sibling-count={0} _variant="primary"></KolPagination>
			<KolPagination _on={{}} _total={15} _page={6} _variant="secondary"></KolPagination>
			<KolPagination _on={{}} _total={15} _page={6} _sibling-count={0} _boundary-count={2} _variant="normal"></KolPagination>
			<KolPagination _on={{}} _total={15} _page={6} _boundary-count={2} _variant="danger"></KolPagination>
			<KolPagination _on={{}} _total={15} _page={6} _boundary-count={2} _tooltipAlign="bottom" _variant="ghost"></KolPagination>
			<KolPagination _on={{}} _total={15} _pageSizeOptions={[1, 3, 6]} _page={6} _boundary-count={2} _tooltipAlign="bottom" _variant="ghost"></KolPagination>
		</div>
	),
	'KOL-PROGRESS': () => (
		<div class="grid justify-center gap-6">
			<KolProgress _max={100} _type="bar" _unit="Meter" _value={10}></KolProgress>
			<KolProgress _max={100} _type="cycle" _value={10}></KolProgress>
		</div>
	),
	'KOL-SELECT': () => (
		<div class="grid justify-center gap-6">
			<KolSelect
				_id=""
				_list={STATUS_OPTIONS}
				_error={ERROR_MSG}
				_touched
				_icon={{
					left: {
						icon: 'icofont-home',
					},
					right: {
						icon: 'icofont-home',
					},
				}}
			>
				Anrede
			</KolSelect>
			<KolSelect _id="" _list={STATUS_OPTIONS} _multiple _required _error={ERROR_MSG}>
				Anrede
			</KolSelect>
		</div>
	),
	'KOL-SPIN': () => (
		<div class="grid justify-center gap-6">
			<KolSpin _show></KolSpin>
		</div>
	),
	'KOL-TABLE': () => (
		<div class="grid justify-center gap-6">
			<KolTable
				_caption="Öffnungszeiten"
				_data={DATA}
				_headers={{
					horizontal: [
						[
							{ label: '', asTd: true },
							{ label: 'Tag', colSpan: 5 },
						],
						[
							{
								label: 'Stadtteil',
								key: 'stadtteil',
								textAlign: 'left',
								sort: (data: Zeiten[]) => {
									return data.sort((first, second) => {
										if (first.stadtteil < second.stadtteil) {
											return -1;
										}
										if (first.stadtteil > second.stadtteil) {
											return 1;
										}
										return 0;
									});
								},
							},
							{ label: 'Montag', key: 'montag', textAlign: 'center' },
							{ label: 'Dienstag', key: 'dienstag', textAlign: 'center' },
							{ label: 'Mittwoch', key: 'mittwoch', textAlign: 'center' },
							{ label: 'Donnerstag', key: 'donnerstag', textAlign: 'center' },
							{ label: 'Freitag', key: 'freitag', textAlign: 'center' },
						],
					],
				}}
				_minWidth="50em"
				_pagination={{
					_page: 1,
				}}
				style={{
					display: 'inline-grid',
					width: '100%',
				}}
			></KolTable>
			<KolTable
				_caption="Öffnungszeiten"
				_data={[
					{
						asp: 'City',
						montag: '08:00',
						dienstag: '08:00',
						mittwoch: '10:00',
						donnerstag: '11:00',
						freitag: '08:00',
					},
					{
						asp: 'City-Süd',
						montag: '08:00',
						dienstag: '08:00',
						mittwoch: '10:00',
						donnerstag: '11:00',
						freitag: '08:00',
					},
					{
						asp: 'City-Nord',
						montag: '08:00',
						dienstag: '08:00',
						mittwoch: '10:00',
						donnerstag: '11:00',
						freitag: '08:00',
					},
				]}
				_headers={{
					horizontal: [
						[
							{
								label: 'Stadtteil',
								key: 'asp',
							},
							{
								label: 'Montag',
								key: 'montag',
							},
							{
								label: 'Dienstag',
								key: 'dienstag',
							},
							{
								label: 'Mittwoch',
								key: 'mittwoch',
							},
							{
								label: 'Donnerstag',
								key: 'donnerstag',
							},
							{
								label: 'Freitag',
								key: 'freitag',
							},
						],
					],
				}}
			>
				Anrede
			</KolTable>
		</div>
	),
	'KOL-TABS': () => (
		<div class="grid gap-6">
			<KolTabs _ariaLabel="" _selected={0} _tabs={DEFAULT_TABS} _tabsAlign="top">
				<div slot="tab-0">Inhalte von Tab 1</div>
				<div slot="tab-1">Inhalte von Tab 2</div>
				<div slot="tab-2">Inhalte von Tab 3</div>
			</KolTabs>
			<KolTabs _ariaLabel="" _selected={0} _tabs={TABS_ICON_ONLY} _tabsAlign="top">
				<div slot="tab-0">Inhalte von Tab 1</div>
				<div slot="tab-1">Inhalte von Tab 2</div>
				<div slot="tab-2">Inhalte von Tab 3</div>
			</KolTabs>
			<KolTabs _ariaLabel="" _selected={1} _tabs={DEFAULT_TABS} _tabsAlign="right">
				<div slot="tab-0">Inhalte von Tab 1</div>
				<div slot="tab-1">Inhalte von Tab 2</div>
				<div slot="tab-2">Inhalte von Tab 3</div>
			</KolTabs>
			<KolTabs _ariaLabel="" _selected={1} _tabs={TABS_ICON_ONLY} _tabsAlign="right">
				<div slot="tab-0">Inhalte von Tab 1</div>
				<div slot="tab-1">Inhalte von Tab 2</div>
				<div slot="tab-2">Inhalte von Tab 3</div>
			</KolTabs>
			<KolTabs _ariaLabel="" _selected={0} _tabs={DEFAULT_TABS} _tabsAlign="bottom">
				<div slot="tab-0">Inhalte von Tab 1</div>
				<div slot="tab-1">Inhalte von Tab 2</div>
				<div slot="tab-2">Inhalte von Tab 3</div>
			</KolTabs>
			<KolTabs _ariaLabel="" _selected={0} _tabs={TABS_ICON_ONLY} _tabsAlign="bottom">
				<div slot="tab-0">Inhalte von Tab 1</div>
				<div slot="tab-1">Inhalte von Tab 2</div>
				<div slot="tab-2">Inhalte von Tab 3</div>
			</KolTabs>
			<KolTabs _ariaLabel="" _selected={1} _tabs={DEFAULT_TABS} _tabsAlign="left">
				<div slot="tab-0">Inhalte von Tab 1</div>
				<div slot="tab-1">Inhalte von Tab 2</div>
				<div slot="tab-2">Inhalte von Tab 3</div>
			</KolTabs>
			<KolTabs _ariaLabel="" _selected={1} _tabs={TABS_ICON_ONLY} _tabsAlign="left">
				<div slot="tab-0">Inhalte von Tab 1</div>
				<div slot="tab-1">Inhalte von Tab 2</div>
				<div slot="tab-2">Inhalte von Tab 3</div>
			</KolTabs>
		</div>
	),
	'KOL-TEXTAREA': () => (
		<div class="grid justify-center gap-6">
			<KolTextarea _id="text" _name="text" _required _error={ERROR_MSG} _placeholder="Mit Icons" _touched>
				Ihre Nachricht
			</KolTextarea>
			<KolTextarea _id="text" _resize="none" _rows={10} _name="text" _required _error={ERROR_MSG}>
				Ihre Nachricht
			</KolTextarea>
			<KolTextarea _id="text" _hasCounter _maxLength={200} _resize="none" _rows={10} _name="text" _required _error={ERROR_MSG}>
				Ihre Nachricht
			</KolTextarea>
			<KolTextarea _disabled _id="text" _name="text">
				Ihre Nachricht (Disabled)
			</KolTextarea>
			<KolTextarea _id="text" _name="text" _read-only>
				Ihre Nachricht (Readonly)
			</KolTextarea>
		</div>
	),
	'KOL-SKIP-NAV': () => (
		<div class="grid justify-center gap-6">
			<KolIndentedText>
				<p>
					<b>Links sind unsichtbar geschalten</b>
					<br />
					Um die Links zu sehen, am besten einmal in diesen Bereich klicken und Tab-Taste drücken.
				</p>
			</KolIndentedText>
			<KolSkipNav
				_ariaLabel="Skip-Nav"
				_links={[
					{ _label: 'Link nur Text', _href: 'https://www.w3.org' },
					{ _label: 'Link mit Icon', _href: 'https://www.w3.org', _icon: 'icofont-home' },
					{ _label: 'Link nur Icon', _href: 'https://www.w3.org', _icon: 'icofont-home' },
					{ _label: 'Link ohne Unterstrich', _href: 'https://www.w3.org' },
				]}
			></KolSkipNav>
		</div>
	),
	'KOL-TOAST': () => (
		<div
			class="grid justify-center gap-6"
			ref={(elm) => {
				if (elm instanceof HTMLElement) {
					const toasts = elm.querySelectorAll('kol-toast');
					toasts.forEach((toast) => toast.setAttribute('_show', 'false'));
					if (toasts.length > 0) {
						toasts[0].setAttribute('_show', 'true');
					}
				}
			}}
		>
			<KolToast _type="error" _heading="Fehler" _level={3}>
				Hier wird der Fehler näher beschrieben.
			</KolToast>
			<KolToast _type="info" _heading="Hinweis" _level={4}>
				Hier wird der Hinweis näher beschrieben.
			</KolToast>
			<KolToast _type="success" _heading="Erfolg" _level={5}>
				Hier wird der Erfolg näher beschrieben.
			</KolToast>
			<KolToast _type="warning" _heading="Warnung" _level={6}>
				Hier wird die Warnung näher beschrieben.
			</KolToast>
			{/* <KolToast _type="error">Hier wird der Fehler kurz beschrieben.</KolToast>
      <KolToast _type="info">Hier wird der Hinweis kurz beschrieben.</KolToast>
      <KolToast _type="success">Hier wird der Erfolg kurz beschrieben.</KolToast>
      <KolToast _type="warning">Hier wird die Warnung kurz beschrieben.</KolToast> */}
		</div>
	),
	'KOL-TOOLTIP': () => (
		<div class="grid justify-center gap-6">
			<KolDetails _summary="Hinweis">
				Damit der Tooltip korrekt ausgerichtet wird, muss für das vorrangehende Referenz-Element `inline-block` gesetzt werden.
			</KolDetails>
			<KolButton _icon="icofont-simple-down" _iconOnly _label="unten" _tooltip-align="bottom" _variant="primary"></KolButton>
			<KolButton _icon="icofont-simple-up" _iconOnly _label="oben" _tooltip-align="top" _variant="secondary"></KolButton>
			<KolButton _icon="icofont-simple-left" _iconOnly _label="links" _tooltip-align="left" _variant="normal"></KolButton>
			<KolButton _icon="icofont-simple-right" _iconOnly _label="rechts" _tooltip-align="right" _variant="danger"></KolButton>
			<KolLink class="text-center" _ariaLabel="unten" _icon="icofont-simple-down" _iconOnly _tooltip-align="bottom"></KolLink>
			<KolLink class="text-center" _ariaLabel="oben" _icon="icofont-simple-up" _iconOnly _tooltip-align="top"></KolLink>
			<KolLink class="text-center" _ariaLabel="links" _icon="icofont-simple-left" _iconOnly _tooltip-align="left"></KolLink>
			<KolLink class="text-center" _ariaLabel="rechts" _icon="icofont-simple-right" _iconOnly _tooltip-align="right"></KolLink>
		</div>
	),
	'KOL-VERSION': () => (
		<div class="grid gap-6 text-center">
			<KolVersion _version="1.0.0"></KolVersion>
		</div>
	),
};
