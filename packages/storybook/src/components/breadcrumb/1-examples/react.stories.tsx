import { KolBreadcrumb as MyComponent, KolHeading } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { BreadcrumbConfiguration } from './autogen.configuration';

export default {
	...BreadcrumbConfiguration,
	title: 'React/Breadcrumb/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolBreadcrumb: ComponentStory<typeof MyComponent> = (args: any) => {
	return <MyComponent {...args}>{args.children}</MyComponent>;
};

const DefaultArgs = {};

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Standard = (args: any) => (
	<div>
		<KolBreadcrumb {...args}></KolBreadcrumb>
	</div>
);
Standard.args = {
	...DefaultArgs,
};

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Einfaerben = (args: any) => (
	<div>
		<KolBreadcrumb {...args}></KolBreadcrumb>
	</div>
);
Einfaerben.args = {
	...DefaultArgs,
};
Einfaerben.storyName = 'Breadcrumb nur Text';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const WithIcon = (args: any) => (
	<div>
		<KolBreadcrumb {...args}></KolBreadcrumb>
	</div>
);
WithIcon.args = {
	...DefaultArgs,
	_links:
		"[{'_label':'Startseite','_href':'#/'},{'_label':'1. Unterseite','_href':'#/unterseite','_icon':'icofont-home'},{'_label':'1. Unterseite der Unterseite','_href':'#/unterseite/unterseite','_icon':'icofont-arrow-right'}]",
};
WithIcon.storyName = 'Breadcrumb mit Icons und Text';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const OnlyIcon = (args: any) => (
	<div>
		<KolBreadcrumb {...args}></KolBreadcrumb>
	</div>
);
OnlyIcon.args = {
	...DefaultArgs,
	_links:
		"[{'_label':'Startseite','_href':'#/','_icon':'icofont-home','_iconOnly':'true'},{'_label':'1. Unterseite','_href':'#/unterseite','_icon':'icofont-arrow-right','_iconOnly':'true'},{'_label':'1. Unterseite der Unterseite','_href':'#/unterseite/unterseite','_icon':'icofont-phone','_iconOnly':'true'}]",
};
OnlyIcon.storyName = 'Breadcrumb nur Icons';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const WithAll = (args: any) => (
	<div>
		<KolBreadcrumb {...args}></KolBreadcrumb>
		<hr />
		<KolHeading _level={1}>1. Unterseite der Unterseite</KolHeading>
		Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
		At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
		dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
		et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
	</div>
);
WithAll.args = {
	...DefaultArgs,
	_links:
		"[{'_label':'Startseite','_href':'#/'},{'_label':'1. Unterseite','_href':'#/unterseite'},{'_label':'1. Unterseite der Unterseite','_href':'#/unterseite/unterseite'}]",
};
WithAll.storyName = 'Breadcrumb im Seitenzusammenhang';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Output = (args: any) => (
	<div>
		<KolBreadcrumb
			_ariaLabel="Breadcrumb aus Text-Links"
			_links={[
				{ _label: 'Startseite', _href: '#/' },
				{ _label: 'Unterseite der Startseite', _href: '#/unterseite' },
				{ _label: 'Unterseite der Unterseite', _href: '#/unterseite/unterseite' },
			]}
		></KolBreadcrumb>
		<KolBreadcrumb
			_ariaLabel="Breadcrumb aus Icons- oder Text-Links"
			_links={[
				{ _label: 'Startseite', _icon: 'home', _iconOnly: true, _href: '#/' },
				{ _label: 'Unterseite der Startseite mit sehr langem Link-Test', _href: '#/unterseite' },
				{ _label: 'Unterseite der Unterseite', _href: '#/unterseite/unterseite' },
			]}
		></KolBreadcrumb>
		<KolBreadcrumb
			_ariaLabel="Breadcrumb aus Icons- und Text-Links"
			_links={[
				{ _label: 'Startseite', _icon: 'home', _href: '#/' },
				{
					_label: 'Unterseite der Startseite und ich_bin_ein_echt_langes_zusammengesetztes_Worte_und_versuche_das_Layout_zu_brechen',
					_href: '#/unterseite',
				},
				{ _label: 'Unterseite der Unterseite', _href: '#/unterseite/unterseite' },
			]}
		></KolBreadcrumb>
	</div>
);
Output.storyName = 'Darstellungsvarianten';
