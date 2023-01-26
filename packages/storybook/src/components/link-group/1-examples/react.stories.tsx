import { KolLinkGroup as MyComponent } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { LinkGroupConfiguration } from './autogen.configuration';

export default {
	...LinkGroupConfiguration,
	title: 'React/LinkGroup/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolLinkGroup: ComponentStory<typeof MyComponent> = (args: any) => {
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
		<KolLinkGroup {...args}></KolLinkGroup>
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
export const Icons = (args: any) => (
	<div>
		<KolLinkGroup
			_ariaLabel="Überschrift LinkGroup"
			_heading="Eine Überschrift"
			_links="[{'_label':'Link nur Text','_href':'https://www.w3.org'},{'_label':'Link mit Icon','_href':'https://www.w3.org','_icon':'icofont-home'},{'_label':'Link nur Icon','_href':'https://www.w3.org','_icon':'icofont-home','_iconOnly':'true'},{'_label':'Link ohne Unterstrich','_href':'https://www.w3.org','_underline':'false'}]"
		></KolLinkGroup>
	</div>
);
Icons.args = {
	...DefaultArgs,
	_heading: 'Eine Überschrift',
};
Icons.storyName = 'Icons';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Text = (args: any) => (
	<div>
		Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea optio deleniti fuga quos molestias, voluptate nobis nemo, incidunt excepturi facilis, amet
		ducimus minus quae corporis eligendi cum distinctio. Fugit, repellendus.
		<br />
		<br />
		<KolLinkGroup _ariaLabel="Linkliste innerhalb eines Fließtextes" _links="[{'_label':'Link 1'},{'_label':'Link 2'},{'_label':'Link 3'}]"></KolLinkGroup>
		<br />
		Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea optio deleniti fuga quos molestias, voluptate nobis nemo, incidunt excepturi facilis, amet
		ducimus minus quae corporis eligendi cum distinctio. Fugit, repellendus.
	</div>
);
Text.args = {
	...DefaultArgs,
};
Text.storyName = 'Fließtext';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const OrientationH = (args: any) => (
	<div>
		Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea optio deleniti fuga quos molestias, voluptate nobis nemo, incidunt excepturi facilis, amet
		ducimus minus quae corporis eligendi cum distinctio. Fugit, repellendus.
		<br />
		<br />
		<KolLinkGroup
			_ariaLabel="Linkliste innerhalb eines Fließtextes"
			_links="[{'_label':'Link 1'},{'_label':'Link 2'},{'_label':'Link 3'}]"
			_orientation="horizontal"
		></KolLinkGroup>
		<br />
		Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea optio deleniti fuga quos molestias, voluptate nobis nemo, incidunt excepturi facilis, amet
		ducimus minus quae corporis eligendi cum distinctio. Fugit, repellendus.
	</div>
);
OrientationH.args = {
	...DefaultArgs,
};
OrientationH.storyName = 'Horizontale Ausrichtung';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const ListStyleType = (args: any) => (
	<div>
		Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea optio deleniti fuga quos molestias, voluptate nobis nemo, incidunt excepturi facilis, amet
		ducimus minus quae corporis eligendi cum distinctio. Fugit, repellendus.
		<br />
		<br />
		<KolLinkGroup
			_ariaLabel="Linkliste innerhalb eines Fließtextes"
			_links="[{'_label':'Link 1'},{'_label':'Link 2'},{'_label':'Link 3'}]"
			_listStyleType="square"
		></KolLinkGroup>
		<br />
		Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea optio deleniti fuga quos molestias, voluptate nobis nemo, incidunt excepturi facilis, amet
		ducimus minus quae corporis eligendi cum distinctio. Fugit, repellendus.
	</div>
);
ListStyleType.args = {
	...DefaultArgs,
};
ListStyleType.storyName = 'List-Style-Type';

export const Darstellungsvarianten = () => {
	return (
		<div style={{ display: 'grid', gap: '0.25em' }}>
			<KolLinkGroup
				_ariaLabel="Fehlerliste"
				_links={[
					{
						_label: 'Fehler 1 (#anschrift_anschrift_adresse_strasse)',
						_selector: '#anschrift_anschrift_adresse_strasse',
					},
					{
						_label: 'Fehler 2 (#password) und ich_bin_ein_echt_langes_zusammengesetztes_Worte_und_versuche_das_Layout_zu_brechen',
						_selector: '#password',
					},
					{
						_label: 'Fehler 3 - Sprungmarke (#gibt-es-nicht) und ich_bin_ein_echt_langes_Wort',
						_selector: '#gibt-es-nicht',
					},
				]}
			></KolLinkGroup>
			<KolLinkGroup
				_ariaLabel="Fehlerliste mit Rahmen"
				_heading="Liste der Formularfehler (nummeriert)"
				_level={2}
				_ordered
				style={{
					border: '1px solid #000',
					borderRadius: '5px',
					padding: '0.25rem 0.5rem',
				}}
				_links={[
					{
						_label: 'Fehler 1 (#anschrift_anschrift_adresse_strasse)',
						_selector: '#anschrift_anschrift_adresse_strasse',
					},
					{
						_label: 'Fehler 2 (#password) und ich_bin_ein_echt_langes_zusammengesetztes_Worte_und_versuche_das_Layout_zu_brechen',
						_selector: '#password',
					},
					{
						_label: 'Fehler 3 - Sprungmarke (#gibt-es-nicht) und ich_bin_ein_echt_langes_Wort',
						_selector: '#gibt-es-nicht',
					},
				]}
			></KolLinkGroup>
		</div>
	);
};
