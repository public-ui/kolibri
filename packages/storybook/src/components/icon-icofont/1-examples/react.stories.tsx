import { KolDetails, KolIcon, KolIconIcofont as MyComponent, KolIndentedText, KolLink } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { IconIcofontConfiguration } from './autogen.configuration';

export default {
	...IconIcofontConfiguration,
	title: 'React/IconIcofont/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolIconIcofont: ComponentStory<typeof MyComponent> = (args: any) => {
	return <MyComponent {...args}>{args.children}</MyComponent>;
};

const DefaultArgs = {
	_icon: 'home',
};

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Standard = (args: any) => (
	<div>
		<KolIconIcofont {...args} style={{ fontSize: args.size }}></KolIconIcofont>
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
export const Text = (args: any) => (
	<div>
		<KolIconIcofont
			_ariaLabel=""
			_icon="icofont-home"
			style={{
				display: 'inline-block',
				marginRight: '0.5rem',
				color: '#708090',
				fontSize: '200%',
			}}
		/>
		Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
		At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum. Es folgt ein Icon im Fließtext:
		<KolIconIcofont
			_ariaLabel=""
			_icon="icofont-arrow-right"
			style={{
				display: 'inline-block',
				margin: '0 0.5rem',
				color: '#708090',
				fontSize: '200%',
			}}
		/>
		dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.
	</div>
);
Text.args = {
	...DefaultArgs,
};
Text.storyName = 'Icofont im Text';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Sizes = (args: any) => (
	<div>
		<KolIconIcofont
			_ariaLabel=""
			_icon="icofont-home"
			style={{
				color: '#708090',
				fontSize: '100%',
			}}
		/>
		<br />
		<KolIconIcofont
			_ariaLabel=""
			_icon="icofont-home"
			style={{
				color: '#708090',
				fontSize: '200%',
			}}
		/>
		<br />
		<KolIconIcofont
			_ariaLabel=""
			_icon="icofont-home"
			style={{
				color: '#708090',
				fontSize: '400%',
			}}
		/>
	</div>
);
Sizes.args = {
	...DefaultArgs,
};
Sizes.storyName = 'Größen';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Colors = (args: any) => (
	<div>
		<KolIconIcofont
			_ariaLabel=""
			_icon="icofont-home"
			style={{
				color: '#DC143C',
				fontSize: '400%',
			}}
		/>
		in hexadezimaler Schreibweise (#DC143C)
		<br />
		<KolIconIcofont
			_ariaLabel=""
			_icon="icofont-home"
			style={{
				color: 'rgb(220, 20,60 )',
				fontSize: '400%',
			}}
		/>
		in RGB-Schreibweise rgb(220, 20,60)
		<br />
		<KolIconIcofont
			_ariaLabel=""
			_icon="icofont-home"
			style={{
				color: 'rgba(220, 20,60 ,0.5)',
				fontSize: '400%',
			}}
		/>
		in RGBA-Schreibweise mit Angabe des Alpha-Kanals rgba(220, 20,60,0.5)
	</div>
);
Colors.args = {
	...DefaultArgs,
};
Colors.storyName = 'Farben';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Output = (args: any) => (
	<div>
		<p>
			Die generische Icon-Komponente implementiert die Unterstützung einer Icon-Font. Hierbei ist die <code>KolIcon</code>
			-Komponente eine generische Komponente <u>ohne</u> <code>Shadow-Dom</code>. Die Barrierefreiheit wird durch diese Komponente sichergestellt.
		</p>
		<p>
			Zusätzlich zu der generischen Icon-Komponente gibt es die konkreten Icon-Komponenten
			<code>KolIcon-font-awesome</code> und
			<code>KolIconIcofont</code>. Diese Komponenten beinhalten keine Logik, sondern verwenden die der generischen Icon-Komponente wieder. Sie kapseln lediglich
			die jeweilige Icon-Font.
		</p>
		<KolDetails _summary="Hinweise zur Barrierefreiheit">
			Die Icon-Komponente stellt sicher, dass die Grafik (Icon) immer mit einem Beschriftung (aria-label) beschrieben werden muss. Dabei wird automatisch die
			Rolle (img) gesetzt. Sollte eine Beschriftung nicht erforderlich sein, weil beispielsweise eine Beschriftung schon durch ein übergeordnetes Element
			erfolgt, dann kann das explizit durch die Angabe einer leeren Beschriftung gemacht werden. Wobei hier die Rolle in diesem Fall nicht gesetzt wird.
			<br />
			Links:
			<br />
			<KolLink _href="https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA24.html">https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA24.html</KolLink>
		</KolDetails>
		<KolIconIcofont _icon="icofont-home" _ariaLabel="Haus" style={{ fontSize: '400%', color: '#5f5f5f' }}></KolIconIcofont>
		<KolIndentedText>Mit Aria-Label</KolIndentedText>
		<KolIcon
			_icon="icofont-home"
			style={{
				fontSize: '400%',
				color: '#00646b',
			}}
		></KolIcon>
		<KolIndentedText>Ohne Aria-Label</KolIndentedText>
	</div>
);
Output.storyName = 'Aria Labels';
