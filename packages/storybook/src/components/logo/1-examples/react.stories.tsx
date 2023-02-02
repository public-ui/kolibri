import { KolIndentedText, KolLink, KolLogo as MyComponent } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { LogoConfiguration } from './autogen.configuration';

export default {
	...LogoConfiguration,
	title: 'React/Logo/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolLogo: ComponentStory<typeof MyComponent> = (args: any) => {
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
		<KolLogo {...args}></KolLogo>
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
export const Block = (args: any) => (
	<div>
		<KolLogo
			_org="BMG"
			style={{
				display: 'block',
				width: '200px',
			}}
		></KolLogo>
		Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
		At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum.
	</div>
);
Block.args = {
	...DefaultArgs,
};
Block.storyName = 'Block-Ausgabe';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Inline = (args: any) => (
	<div>
		<KolLogo
			_org="BMG"
			style={{
				display: 'inline',
				width: '200px',
			}}
		></KolLogo>
		Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
		At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum.
	</div>
);
Inline.args = {
	...DefaultArgs,
};
Inline.storyName = 'Inline-Ausgabe';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Sizes = (args: any) => (
	<div>
		<KolLogo
			_org="BReg"
			style={{
				display: 'inline-block',
				width: '100px',
			}}
		></KolLogo>
		<KolLogo
			_org="BReg"
			style={{
				display: 'inline-block',
				width: '200px',
			}}
		></KolLogo>
		<KolLogo
			_org="BReg"
			style={{
				display: 'inline-block',
				width: '400px',
			}}
		></KolLogo>
	</div>
);
Sizes.args = {
	...DefaultArgs,
};
Sizes.storyName = 'Größen';

export const Darstellungsvariante = () => {
	return (
		<div style={{ display: 'grid', gap: '0.25em' }}>
			<KolLogo _org="BReg" style={{ width: '300px' }}></KolLogo>
			<KolLogo _org="DEFAULT" style={{ width: '300px' }}></KolLogo>
			<KolLogo _org="BMG" style={{ width: '300px' }}></KolLogo>
			<p>
				<KolIndentedText>Im Folgenden wird ein "Zurück zur Startseite"-Link dargestellt:</KolIndentedText>
				<br />
				<KolLink _href="https://itzbund.de" _use-case="image" _aria-label="Zurück zur Startseite des ITZBund">
					<KolLogo _org="DEFAULT" style={{ display: 'inline-block', width: '300px' }}></KolLogo>
				</KolLink>
			</p>
		</div>
	);
};
