import { KolHeading, KolNav as MyComponent } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { NavConfiguration } from './autogen.configuration';

export default {
	...NavConfiguration,
	title: 'React/Nav/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolNav: ComponentStory<typeof MyComponent> = (args: any) => {
	return <MyComponent {...args}>{args.children}</MyComponent>;
};

const DefaultArgs = {};

export const Standard = (args: any) => (
	<div>
		<KolNav {...args}></KolNav>
	</div>
);
Standard.args = {
	...DefaultArgs,
};

export const Submenu = (args: any) => (
	<div>
		<KolNav {...args}></KolNav>
	</div>
);
Submenu.args = {
	...DefaultArgs,
	_ariaLabel: 'Navigation',
	_hasCompactButton: true,
	_links:
		"[{'_label':'Startseite','_href':'startseite', '_children':[{'_label':'1. Untermenüpunkt','_href':'startseite/1-untermenuepunkt'},{'_label':'2. Untermenüpunkt','_href':'startseite/2-untermenuepunkt'}]},{'_label':'2. Menüpunkt','_href':'unterseite'}]",
};
Submenu.storyName = 'Untermenü';

export const Active = () => (
	<div>
		<KolNav
			_ariaLabel="Navigation"
			_links='[{"_label":"Startseite","_href":"startseite","_icon":"home"},{"_label":"2. Menüpunkt","_href":"2-menuepunkt","_active":true},{"_label":"3. Menüpunkt","_href":"3-menuepunkt","_icon":"home"}]'
		/>
	</div>
);
Active.args = {
	...DefaultArgs,
};
Active.storyName = 'Deaktiviert';

export const Size = () => (
	<div>
		<KolNav
			_ariaLabel="Navigation"
			_links='[{"_label":"Startseite","_href":"startseite","_icon":"home"},{"_label":"2. Menüpunkt","_href":"2-menuepunkt","_active":true},{"_label":"Startseite","_href":"startseite","_icon":"home"}]'
		/>
		<br />
		<KolNav
			_ariaLabel="Navigation"
			_compact
			_links='[{"_label":"Startseite","_href":"startseite","_icon":"home"},{"_label":"2. Menüpunkt","_href":"2-menuepunkt","_active":true},{"_label":"Startseite","_href":"startseite","_icon":"home"}]'
		/>
	</div>
);
Size.args = {
	...DefaultArgs,
};
Size.storyName = 'Größen';

export const Compactbutton = () => (
	<div>
		<KolNav
			_ariaLabel="Navigation"
			_orientation="vertical"
			_compact
			_hasCompactButton
			_links='[{"_label":"Startseite","_href":"startseite","_icon":"home"},{"_label":"2. Menüpunkt","_href":"2-menuepunkt","_active":true},{"_label":"Startseite","_href":"startseite","_icon":"home"}]'
		/>
	</div>
);
Compactbutton.args = {
	...DefaultArgs,
};
Compactbutton.storyName = 'Kompakt-Button';

export const Horizontal = () => (
	<div>
		<KolNav
			_ariaLabel="Navigation"
			_orientation="horizontal"
			_links='[{"_label":"Startseite","_href":"startseite","_icon":"home"},{"_label":"2. Menüpunkt","_href":"2-menuepunkt","_active":true},{"_label":"Startseite","_href":"startseite","_icon":"home"}]'
		/>
	</div>
);
Horizontal.args = {
	...DefaultArgs,
};
Horizontal.storyName = 'Horizontale Ausgabe';

export const Context = () => (
	<div style={{ display: 'flex' }}>
		<div style={{ marginRight: '30px', minWidth: '200px' }}>
			<KolNav
				_ariaLabel="Navigation"
				_hasCompactButton={true}
				style={{ minWidth: '100%' }}
				_links='[{"_label":"Startseite","_href":"startseite","_icon":"home"},{"_label":"2. Menüpunkt","_href":"2-menuepunkt","_active":true},{"_label":"Startseite","_href":"startseite","_icon":"home"}]'
			/>
		</div>
		<div>
			<KolHeading _level={1}>
				Willkommen bei <b>KoliBri</b>
			</KolHeading>
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
			voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
			voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
		</div>
	</div>
);
Context.args = {
	...DefaultArgs,
};
Context.storyName = 'Seitenzusammenhang';
