import { KolLogo as MyComponent, KolPagination } from '@public-ui/react';
import { ComponentMeta } from '@storybook/react';
import React from 'react';

import { PaginationConfiguration } from './autogen.configuration';

export default {
	...PaginationConfiguration,
	title: 'React/Pagination/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const DefaultArgs = {};

export const Standard = (args: any) => (
	<div>
		<KolPagination {...args}></KolPagination>
	</div>
);
Standard.args = {
	...DefaultArgs,
};

export const Test = (args: any) => (
	<div>
		<KolPagination _count={10} _page={6} _sibling-count={0}></KolPagination>
	</div>
);
Test.args = {
	...DefaultArgs,
};
Test.storyName = 'Standardausgabe';

export const Sibling = (args: any) => (
	<div>
		<KolPagination _count={10} _page={6} _sibling-count={2}></KolPagination>
	</div>
);

Sibling.storyName = 'Ausgabe mit Sibling';

export const Boundary = (args: any) => (
	<div>
		<KolPagination _count={10} _page={6} _sibling-count={0} _boundary-count={2}></KolPagination>
	</div>
);

Boundary.storyName = 'Ausgabe mit Boundary';
