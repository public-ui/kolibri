import { KolBadge, KolDetails, KolHeading as MyComponent } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { HeadingConfiguration } from './autogen.configuration';

export default {
	...HeadingConfiguration,
	title: 'React/Heading/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolHeading: ComponentStory<typeof MyComponent> = (args: any) => {
	return <MyComponent {...args}>{args.children}</MyComponent>;
};

const DefaultArgs = {
	_level: 1,
};

export const Standard = (args: any) => (
	<div>
		<KolHeading {...args}>{args.content}</KolHeading>
	</div>
);
Standard.args = {
	...DefaultArgs,
};

export const Sizes = (args: any) => (
	<div>
		<p>
			Die Heading-Komponente ist eine elementare Komponente die sehr oft wiederverwendet werden muss, um die verschiedenen Bereiche für die Barrierefreiheit zu
			beschriften.
		</p>
		<KolDetails _summary="Hinweise zur Barrierefreiheit">
			Die Heading-Komponente stellt sicher, dass wir innerhalb KoliBri's die Heading's h1, h2, h3, h4, h5 und h6 dynamisch über alle Komponenten verwenden
			können.
		</KolDetails>
		<KolHeading _level={1}>Ich bin eine H1-Überschrift</KolHeading>
		<KolHeading _level={2}>Ich bin eine H2-Überschrift</KolHeading>
		<KolHeading _level={3}>Ich bin eine H3-Überschrift</KolHeading>
		<KolHeading _level={4}>Ich bin eine H4-Überschrift</KolHeading>
		<KolHeading _level={5}>Ich bin eine H5-Überschrift</KolHeading>
		<KolHeading _level={6}>Ich bin eine H6-Überschrift</KolHeading>
	</div>
);
Sizes.args = {
	...DefaultArgs,
};
Sizes.storyName = 'Größen';

export const With = (args: any) => (
	<div>
		<div>
			<KolHeading _level={1}>Ich bin eine H1-Überschrift</KolHeading>
			<p>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor .
			</p>
			<KolHeading _level={2}>Ich bin eine H2-Überschrift</KolHeading>
			<p>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor .
			</p>
			<KolHeading _level={3}>Ich bin eine H3-Überschrift</KolHeading>
			<p>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor .
			</p>
			<KolHeading _level={4}>Ich bin eine H4-Überschrift</KolHeading>
			<p>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor .
			</p>
			<KolHeading _level={5}>Ich bin eine H5-Überschrift</KolHeading>
			<p>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor .
			</p>
			<KolHeading _level={6}>Ich bin eine H6-Überschrift</KolHeading>
			<p>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor .
			</p>
		</div>
	</div>
);
With.args = {
	...DefaultArgs,
};
With.storyName = 'Im Textzusammenhang';

export const Combination = (args: any) => (
	<div>
		<KolHeading _level={1}>
			Eine Überschrift mit einer <KolBadge _label="KoliBri Badge-Komponente"></KolBadge>
		</KolHeading>
	</div>
);
Combination.args = {
	...DefaultArgs,
};
Combination.storyName = 'Mit KoliBri-Komponente';
