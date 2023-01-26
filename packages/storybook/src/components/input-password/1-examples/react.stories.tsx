import React, { useState } from 'react';

import { KolButton, KolInputPassword as MyComponent } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DEFAULT_INPUT_PROPS } from '../../bik-bitv-test';

import { InputPasswordConfiguration } from './autogen.configuration';

export default {
	...InputPasswordConfiguration,
	title: 'React/InputPassword/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolInputPassword: ComponentStory<typeof MyComponent> = (args: any) => {
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
		<KolInputPassword {...args}>{args.content}</KolInputPassword>
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
export const Error = (args: any) => (
	<div>
		<KolInputPassword _id="mein_passwort" _name="mein_passwort" _error="Fehlermeldung" _touched></KolInputPassword>
	</div>
);
Error.args = {
	...DefaultArgs,
};
Error.storyName = 'Fehlermeldung';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Disabled = (args: any) => (
	<div>
		<KolInputPassword _id="mein_passwort" _name="mein_passwort"></KolInputPassword>
		<div className="mt-2"></div>
		<KolInputPassword _id="mein_passwort" _name="mein_passwort" _disabled></KolInputPassword>
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
			<KolInputPassword {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Passwort
			</KolInputPassword>
			<KolInputPassword {...DEFAULT_INPUT_PROPS} _readOnly _touched={touched}>
				Passwort (Readonly)
			</KolInputPassword>
			<KolInputPassword {...DEFAULT_INPUT_PROPS} _disabled _touched={touched}>
				Passwort (Disabled)
			</KolInputPassword>
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
