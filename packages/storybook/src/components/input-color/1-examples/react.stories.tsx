import { KolButton, KolInputColor as MyComponent } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';
import { DEFAULT_INPUT_PROPS } from '../../bik-bitv-test';
import { InputColorConfiguration } from './autogen.configuration';

export default {
	...InputColorConfiguration,
	title: 'React/InputColor/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolInputColor: ComponentStory<typeof MyComponent> = (args: any) => {
	return <MyComponent {...args}>{args.children}</MyComponent>;
};

const DefaultArgs = {};

export const Standard = (args: any) => (
	<div>
		<KolInputColor {...args}>{args.content}</KolInputColor>
	</div>
);
Standard.args = {
	...DefaultArgs,
};

export const Messages = (args: any) => (
	<div>
		<KolInputColor _id="mein_switch" _name="mein_switch" _error="Fehlermeldung" _touched _value="#ff0000"></KolInputColor>
	</div>
);
Messages.args = {
	...DefaultArgs,
};
Messages.storyName = 'Fehlermeldung';

export const Disabled = (args: any) => (
	<div>
		<KolInputColor _id="mein_switch" _name="mein_switch" _value="#ff0000"></KolInputColor>
		<div className="mt-2"></div>
		<KolInputColor _id="mein_switch" _name="mein_switch" _disabled _value="#ff0000"></KolInputColor>
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
			<KolInputColor _value="#ff0000" {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Farbe
			</KolInputColor>
			<KolInputColor _list="['#000000','#ff0000','#0000ff','#00ff00']" {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Farbe
			</KolInputColor>
			<KolInputColor _value="#ff0000" _disabled {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Farbe (Disabled)
			</KolInputColor>

			<div style={{ display: 'flex', gap: ' 0.25em' }}>
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
