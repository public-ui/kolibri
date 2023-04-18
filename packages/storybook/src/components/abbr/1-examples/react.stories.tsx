import React from 'react';

import { KolAbbr as MyComponent } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AbbrConfiguration } from './autogen.configuration';

export default {
	...AbbrConfiguration,
	title: 'React/Abbr/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolAbbr: ComponentStory<typeof MyComponent> = (args: any) => {
	return <MyComponent {...args}>{args.children}</MyComponent>;
};

const DefaultArgs = {};

export const Standard = (args: any) => (
	<div>
		<KolAbbr {...args}>{args.content}</KolAbbr>
	</div>
);
Standard.args = {
	...DefaultArgs,
};

export const Top = (args: any) => (
	<div>
		Ich bin eine
		<KolAbbr style={{ margin: '0.5em' }} _title="Abkürzung" _tooltipAlign="top">
			{args.content}
		</KolAbbr>
		mit Tooltip oben.
	</div>
);
Top.args = {
	...DefaultArgs,
};
Top.storyName = 'Tooltip oben';

export const Right = (args: any) => (
	<div>
		Ich bin eine
		<KolAbbr style={{ margin: '0.5em' }} _title="Abkürzung" _tooltipAlign="right">
			{args.content}
		</KolAbbr>
		mit Tooltip rechts.
	</div>
);
Right.args = {
	...DefaultArgs,
};
Right.storyName = 'Tooltip rechts';

export const Bottom = (args: any) => (
	<div>
		Ich bin eine
		<KolAbbr style={{ margin: '0.5em' }} _title="Abkürzung" _tooltipAlign="bottom">
			{args.content}
		</KolAbbr>
		mit Tooltip unten.
	</div>
);
Bottom.args = {
	...DefaultArgs,
};
Bottom.storyName = 'Tooltip unten';

export const Left = (args: any) => (
	<div>
		Ich bin eine
		<KolAbbr style={{ margin: '0.5em' }} _title="Abkürzung" _tooltipAlign="left">
			{args.content}
		</KolAbbr>
		mit Tooltip links.
	</div>
);
Left.args = {
	...DefaultArgs,
};
Left.storyName = 'Tooltip links';

export const Content = (args: any) => (
	<div>
		<p style={{ fontFamily: 'Arial' }}>
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
			voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
			voluptua. At vero eos et accusam et justo duo dolores et ea rebum. <br />
			Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
			<KolAbbr _tooltipAlign="left" _title="Eine Beschreibung, was Lorem bedeutet" style={{ display: 'inline', margin: '0px 5px' }}>
				Lorem
			</KolAbbr>
			ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
			vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor
			sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
			accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
		</p>
	</div>
);
Content.args = {
	...DefaultArgs,
};
Content.storyName = 'Fließtext';
