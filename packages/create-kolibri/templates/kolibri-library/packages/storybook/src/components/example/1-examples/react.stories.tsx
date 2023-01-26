import React from 'react';

import { KolBadge as MyComponent } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ExampleConfiguration } from './autogen.configuration';

export default {
	...ExampleConfiguration,
	title: 'React/Example/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const MyExample: ComponentStory<typeof MyComponent> = (args: any) => {
	return <MyComponent {...args}>{args.children}</MyComponent>;
};

const DefaultArgs = {};

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Default = (args: any) => (
	<div>
		<MyExample {...args}>{args.content}</MyExample>
	</div>
);
Default.args = {
	...DefaultArgs,
};
