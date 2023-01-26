import { KolInputRadio, KolInputText, KolSelect } from '@public-ui/react';
import { LeanInputAdapter as MyComponent } from '@leanup/kolibri-react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { InputAdapterLeanupConfiguration } from './autogen.configuration';

export default {
	...InputAdapterLeanupConfiguration,
	title: 'React/InputAdapterLeanup/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const LeanInputAdapter: ComponentStory<typeof MyComponent> = (args: any) => {
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
		<LeanInputAdapter {...args}>
			<KolInputText _type="text" _placeholder="Textfeld">
				Textfeld
			</KolInputText>
		</LeanInputAdapter>
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
export const Select = (args: any) => (
	<div>
		<LeanInputAdapter {...args}>
			<KolSelect _list="[{'label':'Herr','value':'Herr'},{'label':'Frau','value':'Frau'},{'label':'Firma','value':'Firma'}]">Selectbox</KolSelect>
		</LeanInputAdapter>
	</div>
);
Select.args = {
	...DefaultArgs,
};
Select.storyName = 'Selectbox';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Radio = (args: any) => (
	<div>
		<LeanInputAdapter {...args}>
			<KolInputRadio
				_list={[
					{ label: 'Herr', value: 'Herr' },
					{ label: 'Frau', value: 'Frau' },
					{ label: 'Firma', value: 'Firma' },
				]}
			>
				Radiogroup
			</KolInputRadio>
		</LeanInputAdapter>
	</div>
);
Radio.args = {
	...DefaultArgs,
};
Radio.storyName = 'Radiogroup';
