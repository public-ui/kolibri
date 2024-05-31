import { Bundesanstalt, Bundesministerium, ButtonOrLinkOrTextWithChildrenProps, SelectOption, TabButtonProps, ToasterService } from '@public-ui/components';
import {
	KolAbbr,
	KolAccordion,
	KolAlert,
	KolAvatar,
	KolBadge,
	KolBreadcrumb,
	KolButton,
	KolButtonGroup,
	KolButtonLink,
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
	KolLinkButton,
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
	KolVersion,
} from '@public-ui/solid';
import { Component } from 'solid-js';
import { COUNTRIES } from './countries';
import { DATA, Zeiten } from './data';
import { AlertType } from '@public-ui/components';

// https://css-tricks.com/snippets/javascript/random-hex-color/
const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

const STATUS_OPTIONS: SelectOption<string>[] = [
	{
		label: '- Keine Auswahl',
		value: '',
		disabled: true,
	},
];

COUNTRIES.forEach((country) =>
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
		_icon: 'codicon codicon-pie-chart',
		_label: 'Erster Tab',
	},
	{
		_icon: 'codicon codicon-calendar',
		_label: 'Zweites Tab',
	},
	{
		_disabled: true,
		_icon: 'codicon codicon-briefcase',
		_label: 'Deaktiviertes Tab',
	},
	{
		_icon: 'codicon codicon-telescope',
		_label: 'Letzter Tab',
	},
];
const TABS_ICON_ONLY = DEFAULT_TABS.map((tab) => {
	return {
		...tab,
		_hideLabel: true,
	};
});

const NAV_CHILDREN: ButtonOrLinkOrTextWithChildrenProps[] = [
	{
		_href: '#link',
		_icon: 'codicon codicon-pie-chart',
		_label: 'Navigationspunkt als Link',
		_target: '_blank',
	},
	{
		_icon: 'codicon codicon-pie-chart',
		_label: 'Navigationspunkt als Button',
		_on: {
			onClick: console.log,
		},
	},
	{
		_icon: 'codicon codicon-pie-chart',
		_label: 'Navigationspunkt nur Text',
	},
	{
		_href: '#link',
		_icon: 'codicon codicon-pie-chart',
		_label: 'Navigationspunkt als Link',
		_target: '_blank',
		_children: [],
	},
];

const NAV_LINKS: ButtonOrLinkOrTextWithChildrenProps[] = [
	{
		_href: '#link',
		_icon: 'codicon codicon-pie-chart',
		_label: 'Navigationspunkt als Link',
		_target: '_blank',
	},
	{
		_icon: 'codicon codicon-pie-chart',
		_label: 'Navigationspunkt als Button',
		_on: {
			onClick: console.log,
		},
	},
	{
		_icon: 'codicon codicon-pie-chart',
		_label: 'Navigationspunkt nur Text',
	},
	{
		_icon: 'codicon codicon-pie-chart',
		_label: 'Navigationspunkt Aktiv',
		_active: true,
		_on: {
			onClick: console.log,
		},
	},
	{
		_children: NAV_CHILDREN,
		_href: '#link',
		_icon: 'codicon codicon-pie-chart',
		_label: 'Navigationspunkt als Link',
		_target: '_blank',
	},
	{
		_children: NAV_CHILDREN,
		_icon: 'codicon codicon-pie-chart',
		_label: 'Navigationspunkt als Button',
		_on: {
			onClick: console.log,
		},
	},
	{
		_children: NAV_CHILDREN,
		_icon: 'codicon codicon-pie-chart',
		_label: 'Navigationspunkt nur Text',
	},
];

export const components: Record<string, Component> = {
	'KOL-ABBR': () => (
		<div class="grid gap-6">
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
	),
	'KOL-ACCORDION': () => (
		<div class="grid gap-1">
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
					<KolButton class="not-used" _icon="codicon codicon-add" _label="Hinzufügen" _variant="secondary" />
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
		<div class="grid gap-6">
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
			<KolAlert _type="warning" _variant="card" _heading="Warnung mit langem Inhalt" _hasCloser>
				Irure eu adipisicing aute fugiat reprehenderit amet pariatur reprehenderit. Velit enim commodo qui in. Sint aliqua duis labore consequat eiusmod laboris
				anim. Aliquip sunt ea nulla nostrud non aute. Nulla irure nisi nulla sunt elit tempor nostrud. Irure eu adipisicing aute fugiat reprehenderit amet
				pariatur reprehenderit. Velit enim commodo qui in. Sint aliqua duis labore consequat eiusmod laboris anim. Aliquip sunt ea nulla nostrud non aute. Nulla
				irure nisi nulla sunt elit tempor nostrud. Irure eu adipisicing aute fugiat reprehenderit amet pariatur reprehenderit. Velit enim commodo qui in. Sint
				aliqua duis labore consequat eiusmod laboris anim. Aliquip sunt ea nulla nostrud non aute. Nulla irure nisi nulla sunt elit tempor nostrud. Irure eu
				adipisicing aute fugiat reprehenderit amet pariatur reprehenderit. Velit enim commodo qui in. Sint aliqua duis labore consequat eiusmod laboris anim.
				Aliquip sunt ea nulla nostrud non aute. Nulla irure nisi nulla sunt elit tempor nostrud.
			</KolAlert>
		</div>
	),
	'KOL-AVATAR': () => (
		<div class="flex flex-wrap gap-6">
			<KolAvatar _label="Max Mustermann"></KolAvatar>
			<KolAvatar _label="Max"></KolAvatar>
			<KolAvatar _label="Max Mustermann" _src="https://placehold.co/400"></KolAvatar>
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
			/>
			<KolBadge
				_label="Text"
				_color={{
					backgroundColor: `#ddd`,
					color: `#222`,
				}}
				_icon="codicon codicon-dashboard"
			/>
			<KolBadge
				_label="Text"
				_color={{
					backgroundColor: `#ff0`,
					color: `#860`,
				}}
				_icon="codicon codicon-dashboard"
			/>
			<KolBadge
				_label="Text"
				_color={{
					backgroundColor: `#333`,
					color: `#888`,
				}}
				_icon="codicon codicon-dashboard"
				_hideLabel
			/>
			{new Array(10).fill(null).map(() => (
				<>
					<KolBadge _label="Text" _color={`#${randomColor()}`} />
					<KolBadge _label="Text" _color={`#${randomColor()}`} _icon="codicon codicon-dashboard" />
					<KolBadge
						_label="Text"
						_color={`#${randomColor()}`}
						_icon={{
							right: 'codicon codicon-dashboard',
						}}
					/>
					<KolBadge _label="Text" _color={`#${randomColor()}`} _icon="codicon codicon-dashboard" _hideLabel />
				</>
			))}
			<KolBadge
				_label="Badge mit Schalter"
				_color={{
					backgroundColor: `#CCDEDA`,
					color: `#005C45`,
				}}
				_smartButton={{
					_label: 'Test',
					_icon: 'codicon codicon-three-bars',
					_on: {
						onClick: console.log,
					},
				}}
			/>
			<div style="max-width: 100px">
				<div class="grid gap-6">
					<KolBadge
						_label="Ein Badge mit sehr viel Text sieht z.B. so aus!"
						_color={{
							backgroundColor: `#CCDEDA`,
							color: `#005C45`,
						}}
					/>
					<KolBadge _label="Ein Badge mit sehr viel Text sieht z.B. so aus!" _color={`#CCDEDA`} />
				</div>
			</div>
		</div>
	),
	'KOL-BREADCRUMB': () => (
		<div class="grid gap-6">
			<KolBreadcrumb
				_ariaLabel="Breadcrumb aus Text-Links"
				_links={[
					{ _label: 'Startseite', _href: '#/' },
					{ _label: 'Unterseite der Startseite', _href: '#/unterseite' },
					{ _label: 'Unterseite der Unterseite', _href: '#/unterseite/unterseite' },
				]}
			/>
			<KolBreadcrumb
				_ariaLabel="Breadcrumb aus Text-Links"
				_links={[
					{ _label: 'Startseite', _icon: 'codicon codicon-home', _href: '#/' },
					{ _label: 'Unterseite der Startseite mit sehr langem Link-Test', _href: '#/unterseite' },
					{ _label: 'Unterseite der Unterseite', _href: '#/unterseite/unterseite' },
				]}
			/>
			<KolBreadcrumb
				_ariaLabel="Breadcrumb aus Text-Links"
				_links={[
					{ _ariaLabel: 'Startseite', _label: 'Startseite', _icon: 'codicon codicon-home', _hideLabel: true, _href: '#/' },
					{ _label: 'Unterseite der Startseite mit sehr langem Link-Test', _href: '#/unterseite' },
					{ _label: 'Unterseite der Unterseite', _href: '#/unterseite/unterseite' },
				]}
			/>
			<KolBreadcrumb
				_ariaLabel="Breadcrumb aus Text-Links"
				_links={[{ _ariaLabel: 'Startseite', _label: 'Startseite', _icon: 'codicon codicon-home', _hideLabel: true, _href: '#/' }]}
			/>
		</div>
	),
	'KOL-BUTTON': () => (
		<div class="grid grid-cols-2 items-center justify-items-center gap-6">
			<div class="grid gap-6 items-center justify-items-center">
				<KolButton _label="Primary" _variant="primary" />
				<KolButton _label="Secondary" _variant="secondary" />
				<KolButton _label="Normal" _variant="normal" />
				<KolButton _label="Danger" _variant="danger" />
				<KolButton _label="Ghost" _variant="ghost" />
				<KolButton _label="Loading" _customClass="loading" _variant="custom" />
			</div>
			<div class="grid gap-6 items-center justify-items-center">
				<KolButton _label="Primary" _icon="codicon codicon-home" _variant="primary" />
				<KolButton _label="Secondary" _icon="codicon codicon-home" _variant="secondary" />
				<KolButton _label="Normal" _icon="codicon codicon-home" _variant="normal" />
				<KolButton _label="Danger" _icon="codicon codicon-home" _variant="danger" />
				<KolButton _label="Ghost" _icon="codicon codicon-home" _variant="ghost" />
				<KolButton _label="Loading" _icon="codicon codicon-home" _customClass="loading" _variant="custom" />
			</div>
			<div class="grid gap-6 items-center justify-items-center">
				<KolButton _label="Primary" _icon="codicon codicon-home" _variant="primary" style="width: 12em" />
				<KolButton _label="Secondary" _icon="codicon codicon-home" _variant="secondary" style="width: 12em" />
				<KolButton _label="Normal" _icon="codicon codicon-home" _variant="normal" style="width: 12em" />
				<KolButton _label="Danger" _icon="codicon codicon-home" _variant="danger" style="width: 12em" />
				<KolButton _label="Ghost" _icon="codicon codicon-home" _variant="ghost" style="width: 12em" />
				<KolButton _label="Loading" _icon="codicon codicon-home" _customClass="loading" _variant="custom" style="width: 12em" />
			</div>
			<div class="grid gap-6 items-center justify-items-center">
				<KolButton _label="Primary" _icon="codicon codicon-home" _hideLabel _variant="primary" />
				<KolButton _label="Secondary" _icon="codicon codicon-home" _hideLabel _variant="secondary" _tooltipAlign="right" />
				<KolButton _label="Normal" _icon="codicon codicon-home" _hideLabel _variant="normal" _tooltipAlign="bottom" />
				<KolButton _label="Danger" _icon="codicon codicon-home" _hideLabel _variant="danger" _tooltipAlign="left" />
				<KolButton _label="Ghost" _icon="codicon codicon-home" _hideLabel _variant="ghost" _tooltipAlign="top" />
				<KolButton _label="Loading" _icon="codicon codicon-home" _hideLabel _customClass="loading" _variant="custom" _tooltipAlign="top" />
			</div>
			<div class="grid gap-6 items-center justify-items-center">
				<KolButton _label="Primary" _icon="codicon codicon-home" _disabled _variant="primary" />
				<KolButton _label="Secondary" _icon="codicon codicon-home" _disabled _variant="secondary" />
				<KolButton _label="Normal" _icon="codicon codicon-home" _disabled _variant="normal" />
				<KolButton _label="Danger" _icon="codicon codicon-home" _disabled _variant="danger" />
				<KolButton _label="Ghost" _icon="codicon codicon-home" _disabled _variant="ghost" />
				<KolButton _label="Loading" _icon="codicon codicon-home" _disabled _customClass="loading" _variant="custom" />
			</div>
			<div class="grid gap-6 items-center justify-items-center">
				<KolButton
					_label="Primary"
					_icon={{
						left: 'codicon codicon-arrow-left',
						right: 'codicon codicon-arrow-right',
						top: 'codicon codicon-arrow-up',
						bottom: 'codicon codicon-arrow-down',
					}}
					_variant="primary"
				/>
				<KolButton
					_label="Secondary"
					_icon={{
						left: 'codicon codicon-arrow-left',
						right: 'codicon codicon-arrow-right',
						top: 'codicon codicon-arrow-up',
						bottom: 'codicon codicon-arrow-down',
					}}
					_variant="secondary"
				/>
				<KolButton
					_label="Normal"
					_icon={{
						left: 'codicon codicon-arrow-left',
						right: 'codicon codicon-arrow-right',
						top: 'codicon codicon-arrow-up',
						bottom: 'codicon codicon-arrow-down',
					}}
					_variant="normal"
				/>
				<KolButton
					_label="Danger"
					_icon={{
						left: 'codicon codicon-arrow-left',
						right: 'codicon codicon-arrow-right',
						top: 'codicon codicon-arrow-up',
						bottom: 'codicon codicon-arrow-down',
					}}
					_variant="danger"
				/>
				<KolButton
					_label="Ghost"
					_icon={{
						left: 'codicon codicon-arrow-left',
						right: 'codicon codicon-arrow-right',
						top: 'codicon codicon-arrow-up',
						bottom: 'codicon codicon-arrow-down',
					}}
					_variant="ghost"
				/>
				<KolButton
					_label="Loading"
					_icon={{
						left: 'codicon codicon-arrow-left',
						right: 'codicon codicon-arrow-right',
						top: 'codicon codicon-arrow-up',
						bottom: 'codicon codicon-arrow-down',
					}}
					_customClass="loading"
					_variant="custom"
				/>
			</div>
		</div>
	),
	'KOL-LINK-BUTTON': () => (
		<div class="grid grid-cols-2 items-center justify-items-center gap-6">
			<div class="grid gap-6 items-center justify-items-center">
				<KolLinkButton _href="#" _label="Primary" _variant="primary" />
				<KolLinkButton _href="#" _label="Secondary" _variant="secondary" />
				<KolLinkButton _href="#" _label="Normal" _variant="normal" />
				<KolLinkButton _href="#" _label="Danger" _variant="danger" />
				<KolLinkButton _href="#" _label="Ghost" _variant="ghost" />
				<KolLinkButton _href="#" _label="Loading" _customClass="loading" _variant="custom" />
			</div>
			<div class="grid gap-6 items-center justify-items-center">
				<KolLinkButton _href="#" _icon="codicon codicon-home" _label="Primary" _variant="primary" />
				<KolLinkButton _href="#" _icon="codicon codicon-home" _label="Secondary" _variant="secondary" />
				<KolLinkButton _href="#" _icon="codicon codicon-home" _label="Normal" _variant="normal" />
				<KolLinkButton _href="#" _icon="codicon codicon-home" _label="Danger" _variant="danger" />
				<KolLinkButton _href="#" _icon="codicon codicon-home" _label="Ghost" _variant="ghost" />
				<KolLinkButton _href="#" _icon="codicon codicon-home" _label="Loading" _customClass="loading" _variant="custom" />
			</div>
			<div class="grid gap-6 items-center justify-items-center">
				<KolLinkButton _href="#" _icon="codicon codicon-home" _label="Primary" _variant="primary" style="width: 12em" />
				<KolLinkButton _href="#" _icon="codicon codicon-home" _label="Secondary" _variant="secondary" style="width: 12em" />
				<KolLinkButton _href="#" _icon="codicon codicon-home" _label="Normal" _variant="normal" style="width: 12em" />
				<KolLinkButton _href="#" _icon="codicon codicon-home" _label="Danger" _variant="danger" style="width: 12em" />
				<KolLinkButton _href="#" _icon="codicon codicon-home" _label="Ghost" _variant="ghost" style="width: 12em" />
				<KolLinkButton _href="#" _icon="codicon codicon-home" _label="Loading" _customClass="loading" _variant="custom" style="width: 12em" />
			</div>
			<div class="grid gap-6 items-center justify-items-center">
				<KolLinkButton _href="#" _icon="codicon codicon-home" _hideLabel _label="Primary" _variant="primary" />
				<KolLinkButton _href="#" _icon="codicon codicon-home" _hideLabel _label="Secondary" _variant="secondary" _tooltipAlign="right" />
				<KolLinkButton _href="#" _icon="codicon codicon-home" _hideLabel _label="Normal" _variant="normal" _tooltipAlign="bottom" />
				<KolLinkButton _href="#" _icon="codicon codicon-home" _hideLabel _label="Danger" _variant="danger" _tooltipAlign="left" />
				<KolLinkButton _href="#" _icon="codicon codicon-home" _hideLabel _label="Ghost" _variant="ghost" _tooltipAlign="top" />
				<KolLinkButton _href="#" _icon="codicon codicon-home" _hideLabel _label="Loading" _customClass="loading" _variant="custom" _tooltipAlign="top" />
			</div>
			<div class="grid gap-6 items-center justify-items-center border border-red p-2">
				<div class="w-full text-left">
					<KolDetails _summary="Hinweis">
						Einen Link kann man nicht deaktivieren und daher ist das Property `_disabled` bei einem LinkButton nicht vorgesehen.
					</KolDetails>
				</div>
				<KolLinkButton class="opacity-25" _href="#" _icon="codicon codicon-home" _disabled _label="Primary" _variant="primary" />
				<KolLinkButton class="opacity-25" _href="#" _icon="codicon codicon-home" _disabled _label="Secondary" _variant="secondary" />
				<KolLinkButton class="opacity-25" _href="#" _icon="codicon codicon-home" _disabled _label="Normal" _variant="normal" />
				<KolLinkButton class="opacity-25" _href="#" _icon="codicon codicon-home" _disabled _label="Danger" _variant="danger" />
				<KolLinkButton class="opacity-25" _href="#" _icon="codicon codicon-home" _disabled _label="Ghost" _variant="ghost" />
				<KolLinkButton class="opacity-25" _href="#" _icon="codicon codicon-home" _disabled _label="Loading" _customClass="loading" _variant="custom" />
			</div>
			<div class="grid gap-6 items-center justify-items-center">
				<KolLinkButton
					_href="#"
					_icon={{
						left: 'codicon codicon-arrow-left',
						right: 'codicon codicon-arrow-right',
						top: 'codicon codicon-arrow-up',
						bottom: 'codicon codicon-arrow-down',
					}}
					_label="Primary"
					_variant="primary"
				/>
				<KolLinkButton
					_href="#"
					_icon={{
						left: 'codicon codicon-arrow-left',
						right: 'codicon codicon-arrow-right',
						top: 'codicon codicon-arrow-up',
						bottom: 'codicon codicon-arrow-down',
					}}
					_label="Secondary"
					_variant="secondary"
				/>
				<KolLinkButton
					_href="#"
					_icon={{
						left: 'codicon codicon-arrow-left',
						right: 'codicon codicon-arrow-right',
						top: 'codicon codicon-arrow-up',
						bottom: 'codicon codicon-arrow-down',
					}}
					_label="Normal"
					_variant="normal"
				/>
				<KolLinkButton
					_href="#"
					_icon={{
						left: 'codicon codicon-arrow-left',
						right: 'codicon codicon-arrow-right',
						top: 'codicon codicon-arrow-up',
						bottom: 'codicon codicon-arrow-down',
					}}
					_label="Danger"
					_variant="danger"
				/>
				<KolLinkButton
					_href="#"
					_icon={{
						left: 'codicon codicon-arrow-left',
						right: 'codicon codicon-arrow-right',
						top: 'codicon codicon-arrow-up',
						bottom: 'codicon codicon-arrow-down',
					}}
					_label="Ghost"
					_variant="ghost"
				/>
				<KolLinkButton
					_customClass="loading"
					_href="#"
					_icon={{
						left: 'codicon codicon-arrow-left',
						right: 'codicon codicon-arrow-right',
						top: 'codicon codicon-arrow-up',
						bottom: 'codicon codicon-arrow-down',
					}}
					_label="Loading"
					_variant="custom"
				/>
			</div>
			<div class="grid gap-6 items-center justify-items-center border border-red p-2">
				<KolLinkButton _href="#" _label="Primary" _target="_blank" _variant="primary" />
				<KolLinkButton _href="#" _icon="codicon codicon-home" _label="Secondary" _target="_blank" _variant="secondary" />
				<KolLinkButton _href="#" _icon="codicon codicon-home" _label="Normal" _target="_blank" _variant="normal" style="width: 12em" />
				<KolLinkButton _href="#" _icon="codicon codicon-home" _hideLabel _label="Danger" _target="_blank" _variant="danger" _tooltipAlign="left" />
				<KolLinkButton _href="#" class="opacity-25" _icon="codicon codicon-home" _disabled _label="Ghost" _target="_blank" _variant="ghost" />
				<KolLinkButton
					_href="#"
					_customClass="loading"
					_icon={{
						left: 'codicon codicon-arrow-left',
						right: 'codicon codicon-arrow-right',
						top: 'codicon codicon-arrow-up',
						bottom: 'codicon codicon-arrow-down',
					}}
					_label="Loading"
					_target="_blank"
					_variant="custom"
				/>
			</div>
		</div>
	),
	'KOL-BUTTON-GROUP': () => (
		<div class="grid gap-6">
			<KolButtonGroup>
				<KolButton _label="Primary" _variant="primary" />
				<KolButton _label="Secondary" _variant="secondary" />
				<KolButton _label="Normal" _variant="normal" />
				<KolButton _label="Danger" _variant="danger" />
				<KolButton _label="Ghost" _variant="ghost" />
				<KolButton _label="Disabled" _disabled />
			</KolButtonGroup>
			<KolButtonGroup>
				<KolButton _label="Primary" _variant="primary" />
				<KolButton _label="Secondary" _variant="secondary" />
				<KolButton _label="Normal" _variant="normal" />
				<KolButton _label="Danger" _icon="codicon codicon-trash" _hideLabel _variant="danger" />
				<KolButton _label="Ghost" _icon="codicon codicon-info" _hideLabel _variant="ghost" />
				<KolButton _label="Disabled" _icon="codicon codicon-lock" _hideLabel _disabled />
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
						<KolButton _label="Kaufen" _variant="primary" />
						<KolButton _label="Löschen" _icon="codicon codicon-trash" _hideLabel _variant="danger" />
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
						<KolButton _label="Speichern" _variant="primary" />
						<KolButton _label="Abbrechen" _variant="secondary" />
						<KolButton _label="Löschen" _variant="danger" />
					</KolButtonGroup>
				</div>
			</KolCard>
			<KolCard _hasCloser _heading="Kann geschlossen werden" _level={6}>
				<div slot="content" style="background: lavender">
					Inhalt über die ganze Breite
				</div>
			</KolCard>
		</div>
	),
	'KOL-DETAILS': () => (
		<div class="grid gap-6">
			<KolDetails _open _summary="Ihre Überschrift 1">
				Inhalt der ersten Details-Komponente
			</KolDetails>
			<KolDetails _open _summary="Ihre Überschrift 2">
				Inhalt der zweiten Details-Komponente
			</KolDetails>
		</div>
	),
	'KOL-HEADING': () => (
		<div class="grid gap-6">
			<KolHeading _label="H1-Überschrift" _level={1} />
			<KolHeading _label="H2-Überschrift" _level={2} />
			<KolHeading _label="H3-Überschrift" _level={3} />
			<KolHeading _label="H4-Überschrift" _level={4} />
			<KolHeading _label="H5-Überschrift" _level={5} />
			<KolHeading _label="H6-Überschrift" _level={6} />
		</div>
	),
	'KOL-ICON': () => (
		<div class="grid gap-6">
			<KolDetails _open _summary="Description">
				In KoliBri you can use any icon font you want. You should know that you need to insert your preferred icon font CSS file into the HTML page (header,
				link). Also, you need to insert this icon font CSS information into KoliBri Icon Style. In the following examples, we have integrated the font files
				into the designer.
			</KolDetails>
			<strong>Codicon</strong>
			<div class="flex gap-2">
				<KolIcon _ariaLabel="codicon house" _icon="codicon codicon-home" />
				<KolIcon _ariaLabel="codicon arrow right" _icon="codicon codicon-arrow-right" />
				<KolIcon class="text-red" _ariaLabel="codicon arrow right in red" _icon="codicon codicon-arrow-right" />
			</div>
			<strong>Font-Awesome (v6)</strong>
			<div class="flex gap-2">
				<KolIcon _ariaLabel="font-awesome house" _icon="fa-solid fa-home" />
				<KolIcon _ariaLabel="font-awesome arrow right" _icon="fa-solid fa-arrow-right" />
				<KolIcon class="text-red" _ariaLabel="font-awesome arrow right in red" _icon="fa-solid fa-arrow-right" />
			</div>
			<strong>Icofont</strong>
			<div class="flex gap-2">
				<KolIcon _ariaLabel="icofont house" _icon="icofont-home" />
				<KolIcon _ariaLabel="icofont arrow right" _icon="icofont-arrow-right" />
				<KolIcon class="text-red" _ariaLabel="icofont arrow right in red" _icon="icofont-arrow-right" />
			</div>
			<strong>Material Icons</strong>
			<div class="flex gap-2">
				<KolIcon _ariaLabel="material icons house" _icon="material-icons home" />
				<KolIcon _ariaLabel="material icons arrow right" _icon="material-icons east" />
				<KolIcon class="text-red" _ariaLabel="material icons arrow right in red" _icon="material-icons east" />
			</div>
			<strong>Material Symbols</strong>
			<div class="flex gap-2">
				<KolIcon _ariaLabel="material symbols house" _icon="material-symbols-outlined home" />
				<KolIcon _ariaLabel="material symbols arrow right" _icon="material-symbols-outlined arrow_right_alt" />
				<KolIcon class="text-red" _ariaLabel="material symbols arrow right in red" _icon="material-symbols-outlined arrow_right_alt" />
			</div>
			<strong>Tabler</strong>
			<div class="flex gap-2">
				<KolIcon _ariaLabel="tabler" _icon="ti ti-home-2" />
				<KolIcon _ariaLabel="tabler arrow right" _icon="ti ti-arrow-right" />
				<KolIcon class="text-red" _ariaLabel="tabler arrow right in red" _icon="ti ti-arrow-right" />
			</div>
		</div>
	),
	'KOL-INDENTED-TEXT': () => (
		<div class="grid gap-6">
			<KolIndentedText>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
			</KolIndentedText>
		</div>
	),
	'KOL-INPUT-CHECKBOX': () => (
		<div class="grid gap-6">
			<KolInputCheckbox _value={true} _label="Unchecked" _id="checkbox-1" _required></KolInputCheckbox>
			<KolInputCheckbox _value={true} _label="Unchecked (indeterminate)" _id="checkbox-2" _indeterminate _required></KolInputCheckbox>
			<KolInputCheckbox _value={true} _label="Checked" _checked _hint="Here is a hint for you!" _id="checkbox-3" _touched _error={ERROR_MSG}></KolInputCheckbox>
			<KolInputCheckbox
				_value={true}
				_label="Checked (indeterminate)"
				_checked
				_hint="Here is a hint for you!"
				_id="checkbox-4"
				_indeterminate
				_touched
				_error={ERROR_MSG}
			></KolInputCheckbox>
			<hr />
			<KolInputCheckbox _value={true} _label="Unchecked" _id="checkbox-switch-1" _required _variant="switch"></KolInputCheckbox>
			<KolInputCheckbox _value={true} _label="Unchecked (indeterminate)" _id="checkbox-switch-2" _indeterminate _required _variant="switch"></KolInputCheckbox>
			<KolInputCheckbox
				_value={true}
				_label="Checked"
				_checked
				_hint="Here is a hint for you!"
				_id="checkbox-switch-3"
				_variant="switch"
				_touched
				_error={ERROR_MSG}
			></KolInputCheckbox>
			<KolInputCheckbox
				_value={true}
				_label="Checked (indeterminate)"
				_checked
				_hint="Here is a hint for you!"
				_id="checkbox-switch-4"
				_indeterminate
				_variant="switch"
				_touched
				_error={ERROR_MSG}
			></KolInputCheckbox>
			<hr />
			<KolInputCheckbox _value={true} _label="Unchecked" _id="checkbox-button-1" _required _variant="button"></KolInputCheckbox>
			<KolInputCheckbox _value={true} _label="Unchecked (indeterminate)" _id="checkbox-button-2" _indeterminate _required _variant="button"></KolInputCheckbox>
			<KolInputCheckbox
				_value={true}
				_label="Checked"
				_checked
				_hint="Here is a hint for you!"
				_id="checkbox-button-3"
				_variant="button"
				_touched
				_error={ERROR_MSG}
			></KolInputCheckbox>
			<KolInputCheckbox
				_value={true}
				_label="Checked (indeterminate)"
				_checked
				_hint="Here is a hint for you!"
				_id="checkbox-button-4"
				_indeterminate
				_variant="button"
				_touched
				_error={ERROR_MSG}
			></KolInputCheckbox>
			<KolInputCheckbox _value={true} _disabled _label="Disabled" />
		</div>
	),
	'KOL-INPUT-COLOR': () => (
		<div class="grid gap-6">
			<KolInputColor
				_id="farbe"
				_name="farbe"
				_value="#ff0000"
				_error={ERROR_MSG}
				_icon={{
					left: {
						icon: 'codicon codicon-home',
					},
					right: {
						icon: 'codicon codicon-home',
					},
				}}
				_touched
				_label="Farbe"
			></KolInputColor>
			<KolInputColor _label="Farbe" _id="farb1" _list="['#000000','#ff0000', '#0000ff','#00ff00']" _error={ERROR_MSG}></KolInputColor>
			<KolInputColor _label="Farbe (Disabled)" _id="farbe2" _hint="Hilfetext" _value="#ff0000"></KolInputColor>
			<KolInputColor _label="Farbe (Disabled)" _disabled _id="farbe3" _value="#ff0000"></KolInputColor>
		</div>
	),
	'KOL-INPUT-DATE': () => (
		<div class="grid gap-6">
			<KolInputDate _label="Datumseingabe" _id="date1" _type="date"></KolInputDate>
			<KolInputDate _label="Local-Datetime (Standard)" _id="datetime-local1" _type="datetime-local"></KolInputDate>
			<KolInputDate _label="Local-Datetime (mit Sekunden)" _id="datetime-local2" _step={1} _type="datetime-local" _error={ERROR_MSG}></KolInputDate>
			<KolInputDate _label="Monat" _id="month" _type="month"></KolInputDate>
			<KolInputDate _label="Woche" _id="week" _type="week"></KolInputDate>
			<KolInputDate _label="Zeit (Standard)" _id="time" _type="time"></KolInputDate>
			<KolInputDate _label="Zeit (mit Sekunden)" _id="time" _step={1} _type="time"></KolInputDate>
			<KolInputDate _label="Zahleneingabe (Readonly)" _id="date2" _read-only></KolInputDate>
			<KolInputDate _label="Zahleneingabe (Disabled)" _disabled _id="date3"></KolInputDate>
		</div>
	),
	'KOL-INPUT-EMAIL': () => (
		<div class="grid gap-6">
			<KolInputEmail _label="E-Mail" _id="email" _required _value="test@mail.de" _error={ERROR_MSG}></KolInputEmail>
			<KolInputEmail
				_id="email1"
				_name="email1"
				_placeholder="elke@mustermann.de"
				_list="['test1@mail.de', 'test2@mail.de', 'test3@mail.de']"
				_error={ERROR_MSG}
				_icon={{
					left: {
						icon: 'codicon codicon-home',
					},
					right: {
						icon: 'codicon codicon-home',
					},
				}}
				_touched
				_label="E-Mail (Liste)"
			></KolInputEmail>
			<KolInputEmail _label="E-Mail (Disabled)" _disabled _id="email2" _value="test@mail.de"></KolInputEmail>
			<KolInputEmail _label="E-Mail (Readonly)" _id="email3" _read-only _value="test@mail.de"></KolInputEmail>
		</div>
	),
	'KOL-INPUT-FILE': () => (
		<div class="grid gap-6">
			<KolInputFile
				_id="file"
				_name="file"
				_required
				_error={ERROR_MSG}
				_icon={{
					left: {
						icon: 'codicon codicon-home',
					},
					right: {
						icon: 'codicon codicon-home',
					},
				}}
				_touched
				_label="Datei hochladen"
			></KolInputFile>
			<KolInputFile _label="Datei hochladen (Multiple)" _id="file" _multiple _error={ERROR_MSG}></KolInputFile>
			<KolInputFile _label="Datei hochladen (Disabled)" _disabled _id="file"></KolInputFile>
		</div>
	),
	'KOL-INPUT-NUMBER': () => (
		<div class="grid gap-6">
			<KolInputNumber
				_id="number"
				_name="number"
				_required
				_error={ERROR_MSG}
				_placeholder="Mit Icons"
				_icon={{
					left: {
						icon: 'codicon codicon-home',
					},
					right: {
						icon: 'codicon codicon-home',
					},
				}}
				_touched
				_label="Zahleneingabe"
			></KolInputNumber>
			<KolInputNumber _label="Zahleneingabe (-10 bis 10 in 2er Schritten)" _id="number" _max={10} _min={-10} _step={2}></KolInputNumber>
			<KolInputDate _label="Datumseingabe" _id="date" _type="date"></KolInputDate>
			<KolInputDate _label="Local-Datetime (Standard)" _id="time" _type="datetime-local"></KolInputDate>
			<KolInputDate _label="Local-Datetime (mit Sekunden)" _id="time" _step={1} _type="datetime-local" _error={ERROR_MSG}></KolInputDate>
			<KolInputDate _label="Monat" _id="month" _type="month"></KolInputDate>
			<KolInputDate _label="Woche" _id="week" _type="week"></KolInputDate>
			<KolInputDate _label="Zeit (Standard)" _id="time" _type="time"></KolInputDate>
			<KolInputDate _label="Zeit (mit Sekunden)" _id="time" _step={1} _type="time"></KolInputDate>
			<KolInputNumber _label="Zahleneingabe (Readonly)" _id="number" _read-only></KolInputNumber>
			<KolInputNumber _label="Zahleneingabe (Disabled)" _disabled _id="number"></KolInputNumber>
		</div>
	),
	'KOL-INPUT-PASSWORD': () => (
		<div class="grid gap-6">
			<KolInputPassword
				_id="password"
				_name="password"
				_required
				_error={ERROR_MSG}
				_placeholder="Mit Icons"
				_icon={{
					left: {
						icon: 'codicon codicon-home',
					},
					right: {
						icon: 'codicon codicon-home',
					},
				}}
				_smartButton={{
					_icon: {
						left: {
							icon: 'codicon codicon-eye',
						},
					},
					_hideLabel: true,
					_label: 'Passwort anzeigen',
					_on: {
						onClick: () => {},
					},
				}}
				_touched
				_label="Passwort"
			></KolInputPassword>
			<KolInputPassword _label="Passwort (Disabled)" _disabled _id="password" _error={ERROR_MSG}></KolInputPassword>
			<KolInputPassword _label="Passwort (Readonly)" _id="password" _read-only></KolInputPassword>
		</div>
	),
	'KOL-INPUT-RADIO': () => (
		<div class="grid gap-6">
			<KolInputRadio
				_id="anrede"
				_error={ERROR_MSG}
				_name="anrede"
				_list="[{'label':'Frau','value':'Frau'},{'disabled':true,'label':'Herr (disabled)'},{'label':'Firma','value':'Firma'}]"
				_label="Anrede"
			></KolInputRadio>
			<KolInputRadio
				_id="anrede"
				_required
				_error={ERROR_MSG}
				_name="anrede2"
				_value="Firma"
				_list="[{'label':'Frau','value':'Frau'},{'disabled':true,'label':'Herr (disabled)','value':'Herr'},{'label':'Firma','value':'Firma'}]"
				_label="Anrede"
			></KolInputRadio>
			<KolInputRadio
				_id="anrede"
				_orientation="horizontal"
				_required
				_error={ERROR_MSG}
				_name="anrede2"
				_value="Firma"
				_list="[{'label':'Frau','value':'Frau'},{'disabled':true,'label':'Herr (disabled)'},{'label':'Firma','value':'Firma'}]"
				_label="Anrede (horizontal)"
			></KolInputRadio>
			<KolInputRadio
				_id="anrede"
				_disabled
				_touched
				_error={ERROR_MSG}
				_name="anrede3"
				_value="Firma"
				_list="[{'label':'Frau','value':'Frau'},{'disabled':true,'label':'Herr (disabled)'},{'label':'Firma','value':'Firma'}]"
				_label="Anrede"
			></KolInputRadio>
		</div>
	),
	'KOL-INPUT-RANGE': () => (
		<div class="grid gap-6">
			<KolInputRange
				_id="range"
				_min={0}
				_max={50}
				_name="range"
				_error={ERROR_MSG}
				_icon={{
					left: {
						icon: 'codicon codicon-home',
					},
					right: {
						icon: 'codicon codicon-home',
					},
				}}
				_touched
				_label="Schieberegler"
			></KolInputRange>
			<KolInputRange _label="Schieberegler" _id="range" _min={0} _max={50} _step={10} _error={ERROR_MSG}></KolInputRange>
			<KolInputRange _label="Schieberegler" _disabled _id="range" _min={0} _max={50}></KolInputRange>
		</div>
	),
	'KOL-INPUT-TEXT': () => (
		<div class="grid gap-6">
			<KolInputText
				_id=""
				_hint={HINT_MSG}
				_error={ERROR_MSG}
				_placeholder="Mit Icons"
				_icon={{
					left: 'codicon codicon-arrow-left',
					right: {
						icon: 'codicon codicon-arrow-right',
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
							icon: 'codicon codicon-eye',
						},
					},
					_hideLabel: true,
					_label: 'Passwort anzeigen',
					_on: {
						onClick: () => {},
					},
				}}
				_touched
				_type="search"
				_label="Suche"
			></KolInputText>
			<KolInputText
				_id=""
				_error={ERROR_MSG}
				_placeholder="Mit Icons"
				_icon={{
					left: {
						icon: 'codicon codicon-home',
					},
					right: {
						icon: 'codicon codicon-home',
					},
				}}
				_hideLabel
				_touched
				_type="search"
				_label="Suche"
			></KolInputText>
			<KolInputText _label="Vorname (text)" _id="" _placeholder="Placeholder" _required _type="text"></KolInputText>
			<KolInputText _label="Suche (search)" _id="" _placeholder="Placeholder" _type="search"></KolInputText>
			<KolInputText _label="URL (url)" _id="vorname" _placeholder="Placeholder" _error={ERROR_MSG} _touched _type="url"></KolInputText>
			<KolInputText _label="Telefon (tel)" _id="" _placeholder="Placeholder" _type="tel"></KolInputText>
			<KolInputText _label="Vorname (text, readonly)" _id="" _placeholder="Placeholder" _read-only _type="text"></KolInputText>
			<KolInputText _label="Vorname (text, readonly)" _id="" _value="Value" _read-only _type="text"></KolInputText>
			<KolInputText _label="Vorname (text, disabled)" _id="" _placeholder="Placeholder" _disabled _type="text"></KolInputText>
			<KolInputText _label="Vorname (text, disabled)" _id="" _value="Value" _disabled _type="text"></KolInputText>
		</div>
	),
	'KOL-LINK-GROUP': () => (
		<div class="grid gap-6">
			<KolLinkGroup
				_ariaLabel=""
				_heading="Überschrift für diese Linkgroup"
				_links={[
					{ _label: 'Link nur Text', _href: 'https://www.w3.org' },
					{ _label: 'Link mit Icon', _href: 'https://www.w3.org', _icon: 'codicon codicon-home' },
					{ _label: 'Link nur Icon', _href: 'https://www.w3.org', _icon: 'codicon codicon-home' },
					{ _label: 'Link ohne Unterstrich', _href: 'https://www.w3.org' },
				]}
				_orientation="vertical"
			></KolLinkGroup>
			<KolLinkGroup
				_ariaLabel=""
				_heading="Horizontale Linkgroup"
				_links={[
					{ _label: 'Link nur Text', _href: 'https://www.w3.org' },
					{ _label: 'Link mit Icon', _href: 'https://www.w3.org', _icon: 'codicon codicon-home' },
					{ _label: 'Link nur Icon', _href: 'https://www.w3.org', _icon: 'codicon codicon-home' },
					{ _label: 'Link ohne Unterstrich', _href: 'https://www.w3.org' },
				]}
				_orientation="horizontal"
			></KolLinkGroup>
		</div>
	),
	'KOL-LINK': () => (
		<div class="grid gap-6">
			<div>
				<KolLink _ariaLabel="Home" _href="https://www.w3.org" _icon="codicon codicon-home" _hideLabel _label="" />
			</div>
			<div>
				<KolLink _href="https://www.w3.org" _label="">
					Normaler Link
				</KolLink>
			</div>
			<div>
				<KolLink _href="https://www.w3.org" _icon="codicon codicon-home" _label="">
					Normaler Link mit Icon links
				</KolLink>
			</div>
			<div>
				<KolLink _href="https://www.w3.org" _icon="codicon codicon-home" _label="">
					Normaler Link mit Icon rechts
				</KolLink>
			</div>
			<div>
				<KolLink _href="https://www.w3.org" _icon="codicon codicon-home" _hideLabel _label="">
					Nur Icon-Link
				</KolLink>
			</div>
			<div>
				<p>
					Ich bin ein Link <KolLink _href="https://www.w3.org" _label="Externer Link" _target="w3c" /> und sehe auch so aus.
				</p>
				<KolLink _href="/" _label="">
					Besuchter Link
				</KolLink>
			</div>
			<div>
				<KolLink _ariaLabel="Zurück zur Startseite" _href="#/" _label="">
					<KolLogo class="inline-flex w-50" _org={Bundesanstalt['Informationstechnikzentrum Bund']} />
				</KolLink>
			</div>
			<div>
				<KolLink _ariaLabel="Zurück zur Startseite" _href="#/" _label="">
					<KolLogo slot="expert" class="inline-flex w-50" _org={Bundesanstalt['Informationstechnikzentrum Bund']} />
				</KolLink>
			</div>
			<div>
				<KolLink
					_href="#"
					_icon={{
						left: 'codicon codicon-arrow-left',
						right: 'codicon codicon-arrow-right',
						top: 'codicon codicon-arrow-up',
						bottom: 'codicon codicon-arrow-down',
					}}
					_label="Icons"
				/>
			</div>
			<div>
				<KolIndentedText>
					<b>Links sind unsichtbar geschalten</b>
					<br />
					Um die Links zu sehen, am besten einmal in diesen Bereich klicken und Tab-Taste drücken.
				</KolIndentedText>
				<KolSkipNav
					_ariaLabel="Skip-Nav"
					_links={[
						{ _label: 'Link nur Text', _href: 'https://www.w3.org' },
						{ _label: 'Link mit Icon', _href: 'https://www.w3.org', _icon: 'codicon codicon-home' },
						{ _label: 'Link nur Icon', _href: 'https://www.w3.org', _icon: 'codicon codicon-home' },
						{ _label: 'Link ohne Unterstrich', _href: 'https://www.w3.org' },
					]}
				/>
			</div>
		</div>
	),
	'KOL-BUTTON-LINK': () => (
		<div class="grid gap-6">
			<div>
				<KolButtonLink _icon="codicon codicon-home" _hideLabel _label="Label-Text" />
			</div>
			<div>
				<KolButtonLink _ariaLabel="Label-Text (aria-label)" _icon="codicon codicon-home" _hideLabel _label="Label-Text" />
			</div>
			<div>
				<KolButtonLink _label="Normaler Link" />
			</div>
			<div>
				<KolButtonLink _icon="codicon codicon-home" _label="Normaler Link mit Icon links" />
			</div>
			<div>
				<KolButtonLink _icon="codicon codicon-home" _label="Normaler Link mit Icon rechts" />
			</div>
			<div>
				<KolButtonLink _icon="codicon codicon-home" _hideLabel _label="Nur Icon-Link" />
			</div>
			<div>
				<p>
					Ich bin eigentlich ein Button <KolButtonLink _label="Externer Link (gibt es nicht bei ButtonLink)" /> und sehe aber wie ein Link aus.
				</p>
				<KolButtonLink _label="Besuchter Link (gibt es nicht bei ButtonLink)" />
			</div>
			<div>
				<KolButtonLink _ariaLabel="Zurück zur Startseite" _label="">
					<KolLogo slot="expert" class="inline-flex w-50" _org={Bundesanstalt['Informationstechnikzentrum Bund']} />
				</KolButtonLink>
			</div>
			<div>
				<KolButtonLink
					_icon={{
						left: 'codicon codicon-arrow-left',
						right: 'codicon codicon-arrow-right',
						top: 'codicon codicon-arrow-up',
						bottom: 'codicon codicon-arrow-down',
					}}
					_label="Icons"
				/>
			</div>
			<div>
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
						{ _label: 'Link mit Icon', _href: 'https://www.w3.org', _icon: 'codicon codicon-home' },
						{ _label: 'Link nur Icon', _href: 'https://www.w3.org', _icon: 'codicon codicon-home' },
						{ _label: 'Link ohne Unterstrich', _href: 'https://www.w3.org' },
					]}
				/>
			</div>
		</div>
	),
	'KOL-LOGO': () => (
		<div class="grid gap-6">
			<KolLogo _org={Bundesministerium['Die Bundesregierung']} />
			<KolLogo _org={Bundesministerium['Bundesministerium der Finanzen']} />
			<KolLogo _org={Bundesministerium['Bundesministerium für Gesundheit']} />
		</div>
	),
	'KOL-MODAL': () => (
		<div class="grid gap-6">
			<KolModal
				_ariaLabel=""
				_width="80%"
				ref={(element: HTMLElement) => {
					modalElement = element;
				}}
			>
				<KolCard _heading="Ich bin ein Modal" style="width: 100%">
					<div slot="content">
						<KolButton
							_label="Schließen"
							_on={{
								onClick: () => {
									if (modalElement instanceof HTMLKolModalElement) {
										modalElement._activeElement = null;
									}
								},
							}}
						/>
					</div>
				</KolCard>
			</KolModal>
			<KolButton
				_label="Modal öffnen"
				_on={{
					onClick: (event: Event) => {
						if (modalElement instanceof HTMLKolModalElement) {
							modalElement._activeElement = event.target as HTMLElement;
						}
					},
				}}
			/>
		</div>
	),
	'KOL-NAV': () => (
		<div class="col-12 grid gap-6">
			<div class="inline-flex">
				<KolNav class="font-80 max-width" _ariaLabel="Navigation in der Breite beschränkt" _has-compact-button _links={NAV_LINKS} />
			</div>
			<div class="inline-flex">
				<KolNav class="font-60 max-width" _ariaLabel="Navigation initial eingeklappt" _compact _links={NAV_LINKS} />
			</div>
			<div class="inline-flex">
				<KolNav _ariaLabel="Navigation mit sinnvoller Breite" _links={NAV_LINKS} _orientation="horizontal" />
			</div>
			<div class="inline-flex">
				<KolNav class="font-80" style="display: inline-flex" _ariaLabel="Navigation mit sinnvoller Breite" _links={NAV_LINKS} _orientation="horizontal" />
			</div>
			<div class="inline-flex">
				<KolNav class="font-80" style="display: inline-flex" _ariaLabel="Navigation mit sinnvoller Breite" _links={NAV_LINKS} _orientation="horizontal" />
			</div>
		</div>
	),
	'KOL-PAGINATION': () => (
		<div class="grid gap-6">
			<KolPagination _on={{}} _total={15} _page={6} _sibling-count={0} _variant="primary" />
			<KolPagination _on={{}} _total={15} _page={6} _variant="secondary" />
			<KolPagination _on={{}} _total={15} _page={6} _sibling-count={0} _boundary-count={2} _variant="normal" />
			<KolPagination _on={{}} _total={15} _page={6} _boundary-count={2} _variant="danger" />
			<KolPagination _on={{}} _total={15} _page={6} _boundary-count={2} _tooltipAlign="bottom" _variant="ghost" />
			<KolPagination _on={{}} _total={15} _pageSizeOptions={[1, 3, 6]} _page={6} _boundary-count={2} _tooltipAlign="bottom" _variant="ghost" />
		</div>
	),
	'KOL-PROGRESS': () => (
		<div class="grid gap-6">
			<KolProgress _max={100} _type="bar" _unit="Meter" _value={10} />
			<KolProgress _max={100} _type="cycle" _value={10} />
			<KolProgress _label="Progress bar" _max={100} _type="bar" _unit="Meter" _value={10} />
			<KolProgress _label="Progress cycle" _max={100} _type="cycle" _value={10} />
		</div>
	),
	'KOL-SELECT': () => (
		<div class="grid gap-6">
			<KolSelect _label="Anrede" _id="" _list={STATUS_OPTIONS} _error={ERROR_MSG}></KolSelect>
			<KolSelect _label="Anrede" _id="" _disabled _list={STATUS_OPTIONS} _error={ERROR_MSG}></KolSelect>
			<KolSelect
				_id=""
				_list={STATUS_OPTIONS}
				_error={ERROR_MSG}
				_touched
				_icon={{
					left: {
						icon: 'codicon codicon-home',
					},
					right: {
						icon: 'codicon codicon-home',
					},
				}}
				_label="Anrede"
			></KolSelect>
			<KolSelect _label="Anrede" _id="" _list={STATUS_OPTIONS} _multiple _required _error={ERROR_MSG}></KolSelect>
		</div>
	),
	'KOL-SPIN': () => (
		<div class="grid gap-6">
			<KolSpin _show />
			<KolSpin _show _variant="cycle" />
			<KolSpin _show _variant="none" />
		</div>
	),
	'KOL-TABLE': () => (
		<div class="grid gap-6">
			<KolTable
				_label="Öffnungszeiten"
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
			/>
			<KolTable
				_label="Öffnungszeiten"
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
					vertical: [[{ label: 'Berlin' }, { label: 'Hamburg' }, { label: 'München' }]],
					horizontal: [
						[
							{ label: '' },
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
			/>
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
		<div class="grid gap-6">
			<KolTextarea _label="Ihre Nachricht (1 Row)" _rows={1} _required _error={ERROR_MSG} _placeholder="Mit Icons" _touched></KolTextarea>
			<KolTextarea _label="Ihre Nachricht" _required _error={ERROR_MSG} _placeholder="Mit Icons" _touched></KolTextarea>
			<KolTextarea _label="Ihre Nachricht" _resize="none" _rows={10} _required _error={ERROR_MSG}></KolTextarea>
			<KolTextarea _label="Ihre Nachricht" _hasCounter _maxLength={200} _resize="none" _rows={10} _required _error={ERROR_MSG}></KolTextarea>
			<KolTextarea
				_label="Ihre Nachricht (mit Hint)"
				_hasCounter
				_maxLength={200}
				_hint="Here is a hint for you!"
				_rows={10}
				_error={ERROR_MSG}
				_placeholder="Mit Hint"
			></KolTextarea>
			<KolTextarea _label="Ihre Nachricht (Disabled)" _disabled></KolTextarea>
			<KolTextarea _label="Ihre Nachricht (Readonly)" _read-only></KolTextarea>
		</div>
	),
	'KOL-SKIP-NAV': () => (
		<div class="grid gap-6">
			<KolIndentedText>
				<b>Links sind unsichtbar geschalten</b>
				<br />
				Um die Links zu sehen, am besten einmal in diesen Bereich klicken und Tab-Taste drücken.
			</KolIndentedText>
			<KolSkipNav
				_ariaLabel="Skip-Nav"
				_links={[
					{ _label: 'Link nur Text', _href: 'https://www.w3.org' },
					{ _label: 'Link mit Icon', _href: 'https://www.w3.org', _icon: 'codicon codicon-home' },
					{ _label: 'Link nur Icon', _href: 'https://www.w3.org', _icon: 'codicon codicon-home' },
					{ _label: 'Link ohne Unterstrich', _href: 'https://www.w3.org' },
				]}
			/>
		</div>
	),
	'KOL-TOAST-CONTAINER': () => {
		const toaster = ToasterService.getInstance(document);
		return (
			<div class="grid gap-1">
				{['default', 'info', 'success', 'warning', 'error'].map((type) => (
					<KolButton
						_label={`Toast zeigen (${type})`}
						_on={{
							onClick: () =>
								void toaster.enqueue({
									label: `${type.toUpperCase()} Toast`,
									description: `Dies ist eine Toast-Nachricht vom Typ "${type}".`,
									type: type as AlertType,
								}),
						}}
					/>
				))}
			</div>
		);
	},
	'KOL-TOOLTIP-WC': () => (
		<div class="grid justify-items-center gap-8">
			<div class="grid gap-4 grid-cols-4 justify-items-center">
				<KolButton _icon="codicon codicon-arrow-down" _hideLabel _label="unten" _tooltip-align="bottom" _variant="primary" />
				<KolButton _icon="codicon codicon-arrow-up" _hideLabel _label="oben" _tooltip-align="top" _variant="secondary" />
				<KolButton _icon="codicon codicon-arrow-left" _hideLabel _label="links" _tooltip-align="left" _variant="normal" />
				<KolButton _icon="codicon codicon-arrow-right" _hideLabel _label="rechts" _tooltip-align="right" _variant="danger" />
			</div>
			<div class="grid gap-4 grid-cols-4 justify-items-center">
				<KolLinkButton _href="#" _icon="codicon codicon-arrow-down" _hideLabel _label="unten" _tooltip-align="bottom" _variant="primary" />
				<KolLinkButton _href="#" _icon="codicon codicon-arrow-up" _hideLabel _label="oben" _tooltip-align="top" _variant="secondary" />
				<KolLinkButton _href="#" _icon="codicon codicon-arrow-left" _hideLabel _label="links" _tooltip-align="left" _variant="normal" />
				<KolLinkButton _href="#" _icon="codicon codicon-arrow-right" _hideLabel _label="rechts" _tooltip-align="right" _variant="danger" />
			</div>
			<div class="grid gap-4 grid-cols-4 justify-items-center">
				<KolLink class="text-center" _ariaLabel="unten" _href="#" _icon="codicon codicon-arrow-down" _hideLabel _label="unten" _tooltip-align="bottom" />
				<KolLink class="text-center" _ariaLabel="oben" _href="#" _icon="codicon codicon-arrow-up" _hideLabel _label="oben" _tooltip-align="top" />
				<KolLink class="text-center" _ariaLabel="links" _href="#" _icon="codicon codicon-arrow-left" _hideLabel _label="links" _tooltip-align="left" />
				<KolLink class="text-center" _ariaLabel="rechts" _href="#" _icon="codicon codicon-arrow-right" _hideLabel _label="rechts" _tooltip-align="right" />
			</div>
			<div class="grid gap-4 grid-cols-4 justify-items-center">
				<KolButtonLink class="text-center" _ariaLabel="unten" _icon="codicon codicon-arrow-down" _hideLabel _label="unten" _tooltip-align="bottom" />
				<KolButtonLink class="text-center" _ariaLabel="oben" _icon="codicon codicon-arrow-up" _hideLabel _label="oben" _tooltip-align="top" />
				<KolButtonLink class="text-center" _ariaLabel="links" _icon="codicon codicon-arrow-left" _hideLabel _label="links" _tooltip-align="left" />
				<KolButtonLink class="text-center" _ariaLabel="rechts" _icon="codicon codicon-arrow-right" _hideLabel _label="rechts" _tooltip-align="right" />
			</div>
		</div>
	),
	'KOL-VERSION': () => (
		<div class="grid gap-6">
			<KolVersion _version="1.0.0" />
		</div>
	),
};
