import { KolVersion as MyComponent } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { VersionConfiguration } from './autogen.configuration';

export default {
	...VersionConfiguration,
	title: 'React/Version/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolVersion: ComponentStory<typeof MyComponent> = (args: any) => {
	return <MyComponent {...args}>{args.children}</MyComponent>;
};

const DefaultArgs = {};

export const Standard = (args: any) => (
	<div>
		<KolVersion {...args}>{args.content}</KolVersion>
	</div>
);
Standard.args = {
	...DefaultArgs,
};

export const Context = (args: any) => (
	<div>
		<KolVersion _version="1.0.0" />
		Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
		At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
		dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.
	</div>
);
Context.args = {
	...DefaultArgs,
};
Context.storyName = 'Textzusammenhang';
