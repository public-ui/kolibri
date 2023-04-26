import { KolSpin as MyComponent } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { SpinConfiguration } from './autogen.configuration';

export default {
	...SpinConfiguration,
	title: 'React/Spin/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolSpin: ComponentStory<typeof MyComponent> = (args: any) => {
	return <MyComponent {...args}>{args.children}</MyComponent>;
};

const DefaultArgs = {};

export const Standard = (args: any) => (
	<div>
		<KolSpin {...args}></KolSpin>
	</div>
);
Standard.args = {
	...DefaultArgs,
};
