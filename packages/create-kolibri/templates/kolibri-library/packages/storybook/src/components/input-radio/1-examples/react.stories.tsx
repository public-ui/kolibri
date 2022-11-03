import { KolInputRadio as MyComponent } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { InputRadioConfiguration } from './autogen.configuration';

export default {
	...InputRadioConfiguration,
	title: 'React/InputRadio/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolInputRadio: ComponentStory<typeof MyComponent> = (args: any) => {
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
		<KolInputRadio {...args}></KolInputRadio>
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
export const Anrede = (args: any) => (
	<div>
		<KolInputRadio _id="anrede" _name="anrede" _list={args._list}></KolInputRadio>
	</div>
);
Anrede.args = {
	...DefaultArgs,
};
Anrede.storyName = 'Radio als Radiogroup';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Cases = (args: any) => (
	<div>
		<KolInputRadio
			_id="test"
			_name="test"
			_disabled
			_list={[
				{ label: 'Herr', value: 'Herr' },
				{ label: 'Frau', value: 'Frau' },
				{ label: 'Firma', value: 'Firma' },
			]}
		></KolInputRadio>
	</div>
);
Cases.args = {
	...DefaultArgs,
};
Cases.storyName = 'Deaktiviert';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Messages = (args: any) => (
	<div>
		<KolInputRadio
			_id="test"
			_name="test"
			_list={[
				{ label: 'Herr', value: 'Herr' },
				{ label: 'Frau', value: 'Frau' },
				{ label: 'Firma', value: 'Firma' },
			]}
			_error="Fehlermeldung"
			_touched
		></KolInputRadio>
	</div>
);
Messages.args = {
	...DefaultArgs,
};
Messages.storyName = 'Radiogroup Fehlermeldung';
