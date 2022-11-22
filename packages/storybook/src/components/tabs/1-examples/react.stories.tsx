import { KolAlert, KolLink, KolTabs as MyComponent } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { TabsConfiguration } from './autogen.configuration';

export default {
	...TabsConfiguration,
	title: 'React/Tabs/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolTabs: ComponentStory<typeof MyComponent> = (args: any) => {
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
		<KolTabs {...args}></KolTabs>
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
export const Simple = (args: any) => (
	<div>
		<KolTabs _ariaLabel="Tabs" _selected={0} _tabs="[{'_label':'Tab 1'},{'_label':'Tab 2'},{'_label':'Tab 3'}]">
			<div slot="tab-0">Inhalt von Tab 1</div>
			<div slot="tab-1">Inhalt von Tab 2</div>
			<div slot="tab-2">Inhalt von Tab 3</div>
		</KolTabs>
	</div>
);
Simple.args = {
	...DefaultArgs,
};
Simple.storyName = 'Einfache Tabs';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Icon = (args: any) => (
	<div>
		<KolTabs
			_ariaLabel="Tabs"
			_selected={0}
			_tabs="[{'_label':'Nicht ausgewählt','_icon':'icofont-home'},{'_label':'Ausgewählt'},{'_label':'Nicht ausgewählt'}]"
		>
			<div slot="tab-0">Inhalt von Tab 1</div>
			<div slot="tab-1">Inhalt von Tab 2</div>
			<div slot="tab-2">Inhalt von Tab 3</div>
		</KolTabs>
	</div>
);
Icon.args = {
	...DefaultArgs,
};
Icon.storyName = 'Tabs mit Icon';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Active = (args: any) => (
	<div>
		<KolTabs _ariaLabel="Tabs" _selected={1} _tabs="[{'_label':'Nicht ausgewählt'},{'_label':'Ausgewählt'},{'_label':'Nicht ausgewählt'}]">
			<div slot="tab-0">Inhalt von Tab 1</div>
			<div slot="tab-1">Inhalt von Tab 2</div>
			<div slot="tab-2">Inhalt von Tab 3</div>
		</KolTabs>
	</div>
);
Active.args = {
	...DefaultArgs,
};
Active.storyName = 'Tab auswählen';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Deactive = (args: any) => (
	<div>
		<KolTabs
			_ariaLabel="Tabs"
			_selected={1}
			_tabs="[{'_label':'Nicht aktiv','_disabled':true},{'_label':'Aktiv gesetzt'},{'_label':'Nicht aktiv','_disabled':true}]"
		>
			<div slot="tab-0">Inhalt von Tab 1</div>
			<div slot="tab-1">Inhalt von Tab 2</div>
			<div slot="tab-2">Inhalt von Tab 3</div>
		</KolTabs>
	</div>
);
Deactive.args = {
	...DefaultArgs,
};
Deactive.storyName = 'Tab deaktivieren';

export const Erweitert = () => {
	const callback = (name: string) => {
		return (value: string) => {
			console.log(name, value);
		};
	};
	return (
		<div style={{ display: 'grid', gap: '0.25em' }}>
			<KolAlert _type="info">
				Die Steuerung eines Tabs erfolgt durch klicken oder Pfeiltasten. Die Umsetzung ist nach W3C umgesetzt:
				<ul>
					<li>
						<KolLink _href="https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-1/tabs.html" _target="w3c">
							https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-1/tabs.html
						</KolLink>
					</li>
					<li>
						<KolLink _href="https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-2/tabs.html" _target="w3c">
							https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-2/tabs.html
						</KolLink>
					</li>
				</ul>
			</KolAlert>
			<KolTabs
				_ariaLabel="Tab-Navigation"
				_on={{
					onCreate: {
						label: 'Neu Text anpassbar',
						callback: callback('onCreate'),
					},
					onSelect: callback('onSelect'),
				}}
				_selected={0}
				_tabs={[
					{ _label: 'Tab 1', _icon: 'home' },
					{ _label: 'Tab 2' },
					{ _label: 'Tab 3', _disabled: true },
					{
						_label: 'Tab 4',
						_on: {
							onClose: callback('onClose'),
						},
					},
					{
						_label: 'Tab 5',
						_on: {
							onClose: true,
						},
					},
					{ _label: 'Tab 6' },
					{ _label: 'Tab 7' },
					{ _label: 'Tab 8' },
				]}
				class="hydrated"
			>
				<div>
					Tab 1 <div>Tab 1.1</div>
				</div>
				<div>Tab 2</div>
				<div>Tab 3</div>
				<div>Tab 4</div>
				<div>Tab 5</div>
				<div>Tab 6</div>
				<div>Tab 7</div>
				<div>Tab 8</div>
			</KolTabs>
			<KolTabs
				_ariaLabel="Tab-Navigation"
				_on={{
					onCreate: callback('onCreate'),
				}}
				_selected={1}
				_tabs={[
					{ _label: 'Tab 1', _icon: 'home', _disabled: true },
					{ _label: 'Tab 2' },
					{ _label: 'Tab 3', _disabled: true },
					{ _label: 'Tab 4' },
					{ _label: 'Tab 5' },
					{ _label: 'Tab 6' },
					{ _label: 'Tab 7' },
					{ _label: 'Tab 8' },
				]}
				style={{ fontSize: '80%' }}
			>
				<div>Tab 1</div>
				<div>Tab 2</div>
				<div>Tab 3</div>
				<div>Tab 4</div>
				<div>Tab 5</div>
				<div>Tab 6</div>
				<div>Tab 7</div>
				<div>Tab 8</div>
			</KolTabs>
			<KolTabs
				_ariaLabel="Tab-Navigation"
				_selected={6}
				_tabs={[
					{ _label: 'Tab 1', _icon: 'home' },
					{ _label: 'Tab 2' },
					{ _label: 'Tab 3', _disabled: true },
					{ _label: 'Tab 4' },
					{ _label: 'Tab 5' },
					{ _label: 'Tab 6' },
					{ _label: 'Tab 7' },
					{ _label: 'Tab 8', _disabled: true },
				]}
				style={{ fontSize: '60%' }}
			>
				<div>Tab 1</div>
				<div>Tab 2</div>
				<div>Tab 3</div>
				<div>Tab 4</div>
				<div>Tab 5</div>
				<div>Tab 6</div>
				<div>Tab 7</div>
				<div>Tab 8</div>
			</KolTabs>
			<KolTabs
				_ariaLabel="Tab-Navigation"
				_selected={0}
				_tabs={[
					{ _label: 'Tab 1', _disabled: true },
					{ _label: 'Tab 2', _disabled: true },
					{ _label: 'Tab 3', _disabled: true },
				]}
			>
				<div>Tab 1</div>
				<div>Tab 2</div>
				<div>Tab 3</div>
			</KolTabs>
		</div>
	);
};
