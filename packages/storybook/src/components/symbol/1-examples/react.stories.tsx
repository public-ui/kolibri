import React from 'react';

import { KolSymbol as MyComponent } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { SymbolConfiguration } from './autogen.configuration';

export default {
	...SymbolConfiguration,
	title: 'React/Symbol/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolSymbol: ComponentStory<typeof MyComponent> = (args: any) => {
	return <MyComponent {...args}>{args.children}</MyComponent>;
};

const DefaultArgs = {};

export const Standard = (args: any) => (
	<div>
		<KolSymbol ariaLabel={args._ariaLabel} {...args}></KolSymbol>
	</div>
);
Standard.args = {
	...DefaultArgs,
};

export const sign = (args: any) => (
	<div>
		<KolSymbol ariaLabel={args._ariaLabel} {...args}></KolSymbol>
	</div>
);
sign.args = {
	_ariaLabel: 'Dollar-Zeichen',
	_symbol: '$',
};
sign.storyName = 'Einzelnes Zeichen';

export const Bar = (args: any) => (
	<div>
		<KolSymbol ariaLabel={args._ariaLabel} {...args}></KolSymbol>
	</div>
);
Bar.args = {
	_ariaLabel: 'Ein langer Text',
	_symbol:
		'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore	magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscingelitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero	eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
};
Bar.storyName = 'Langer Text';

export const signText = (args: any) => (
	<div>
		<p>
			Lorem ipsum dolor sit amets, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
			voluptua.
			<br />
			<br />
			Kosten hierfür: 350 <KolSymbol ariaLabel={args._ariaLabel} {...args}></KolSymbol>
			<br />
			<br />
			At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
			dolor sit amet, consetetur sadipscingelitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
			et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
		</p>
	</div>
);
signText.args = {
	_ariaLabel: 'Dollar-Zeichen',
	_symbol: '$',
};
signText.storyName = 'Dollar-Zeichen in Fließtext';
