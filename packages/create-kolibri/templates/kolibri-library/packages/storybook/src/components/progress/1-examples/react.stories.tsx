import { KolProgress as MyComponent } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ProgressConfiguration } from './autogen.configuration';

export default {
	...ProgressConfiguration,
	title: 'React/Progress/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolProgress: ComponentStory<typeof MyComponent> = (args: any) => {
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
		<KolProgress {...args}></KolProgress>
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
export const Bar = (args: any) => (
	<div>
		<KolProgress _type="bar" _max={1000} _value={100}></KolProgress>
	</div>
);
Bar.args = {
	...DefaultArgs,
};
Bar.storyName = 'Horizontal';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Cycle = (args: any) => (
	<div>
		<KolProgress _type="cycle" _max={1000} _value={100}></KolProgress>
	</div>
);
Cycle.args = {
	...DefaultArgs,
};
Cycle.storyName = 'Kreis';
