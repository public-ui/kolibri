import React, { useState } from 'react';

import { KolButton, KolInputRange as MyComponent } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DEFAULT_INPUT_PROPS } from '../../bik-bitv-test';

import { InputRangeConfiguration } from './autogen.configuration';

export default {
	...InputRangeConfiguration,
	title: 'React/InputRange/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolInputRange: ComponentStory<typeof MyComponent> = (args: any) => {
	return <MyComponent {...args}>{args.children}</MyComponent>;
};

const DefaultArgs = {};

export const Standard = (args: any) => (
	<div>
		<KolInputRange {...args}></KolInputRange>
	</div>
);
Standard.args = {
	...DefaultArgs,
};

export const Error = (args: any) => (
	<div>
		<KolInputRange _id="meine_range" _name="meine_range" _error="Fehlermeldung" _touched></KolInputRange>
	</div>
);
Error.args = {
	...DefaultArgs,
};
Error.storyName = 'Fehlermeldung';

export const Disabled = (args: any) => (
	<div>
		<KolInputRange _id="meine_range" _name="meine_range"></KolInputRange>
		<div className="mt-2"></div>
		<KolInputRange _id="meine_range" _name="meine_range" _disabled></KolInputRange>
	</div>
);
Disabled.args = {
	...DefaultArgs,
};
Disabled.storyName = 'Aktiv / Nicht aktiv';

export const Formularbeispiel = () => {
	const [touched, setTouched] = useState<boolean>(false);
	return (
		<div style={{ display: 'grid', gap: '0.25em' }}>
			<KolInputRange _min={0} _max={50} {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Schieberegler
			</KolInputRange>
			<KolInputRange _min={0} _max={50} _step={10} {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Schieberegler (mit Raster)
			</KolInputRange>
			<KolInputRange
				_list="[{'value':0,'label':'sehr schlecht'},{'value':10,'label':'schlecht'},{'value':20,'label':'mangelhaft'},{'value':30,'label':'gut'},{'value':40,'label':'naja'},{'value':50,'label':'sehr gut'}]"
				_min={0}
				_max={50}
				_step={10}
				{...DEFAULT_INPUT_PROPS}
				_touched={touched}
			>
				Schieberegler (mit Rasterlinien)
			</KolInputRange>
			<KolInputRange _min={0} _max={50} _disabled {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Schieberegler (Disabled)
			</KolInputRange>
			<div style={{ display: 'flex', gap: '0.25em' }}>
				<KolButton
					_variant="primary"
					_label="Absenden"
					_on={{
						onClick: () => {
							setTouched(true);
						},
					}}
				></KolButton>
				<KolButton
					_variant="ghost"
					_label="Zurücksetzen"
					_on={{
						onClick: () => {
							setTouched(false);
						},
					}}
				></KolButton>
			</div>
		</div>
	);
};
