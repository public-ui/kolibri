import React from 'react';

import { MyExample as MyComponent } from '@{{kebab name}}/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AbbrConfiguration } from './autogen.configuration';

export default {
	...AbbrConfiguration,
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
