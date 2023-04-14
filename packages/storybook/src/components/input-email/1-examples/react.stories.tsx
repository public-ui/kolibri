import { KolButton, KolInputEmail as MyComponent } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import { DEFAULT_INPUT_PROPS } from '../../bik-bitv-test';
import { InputEmailConfiguration } from './autogen.configuration';

export default {
	...InputEmailConfiguration,
	title: 'React/InputEmail/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolInputEmail: ComponentStory<typeof MyComponent> = (args: any) => {
	return <MyComponent {...args}>{args.children}</MyComponent>;
};

const DefaultArgs = {};

export const Standard = (args: any) => (
	<div>
		<KolInputEmail {...args}>{args.content}</KolInputEmail>
	</div>
);
Standard.args = {
	...DefaultArgs,
};

export const Autocomplete = (args: any) => (
	<div>
		<KolInputEmail _id="meine_email" _name="meine_email" _value="" _list="['alpha@email.de','beta@email.de','gamma@email.de']"></KolInputEmail>
	</div>
);
Autocomplete.args = {
	...DefaultArgs,
};
Autocomplete.storyName = 'Auto-Vervollständigen';

export const Multiple = (args: any) => (
	<div>
		<p>Trennzeichen für die einzelnen E-Mail-Adressen ist ein Komma (,)</p>
		<KolInputEmail _id="meine_email" _name="meine_email" _value="" _multiple={true} _list="['alpha@email.de','beta@email.de','gamma@email.de']"></KolInputEmail>
	</div>
);
Multiple.args = {
	...DefaultArgs,
};
Multiple.storyName = 'Auto-Vervollständigen/Mehrfachauswahl';

export const Messages = (args: any) => (
	<div>
		<KolInputEmail _id="meine_email" _name="meine_email" _error="Fehlermeldung" _touched _value="info@email.de"></KolInputEmail>
	</div>
);
Messages.args = {
	...DefaultArgs,
};
Messages.storyName = 'Fehlermeldung';

export const Disabled = (args: any) => (
	<div>
		<KolInputEmail _id="meine_email" _name="meine_email" _value="info@email.de"></KolInputEmail>
		<div className="mt-2"></div>
		<KolInputEmail _id="meine_email" _name="meine_email" _disabled _value="info@email.de"></KolInputEmail>
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
			<KolInputEmail {...DEFAULT_INPUT_PROPS} _touched={touched}>
				E-Mail-Adresse
			</KolInputEmail>
			<KolInputEmail _list="['test1@test.de','test2@test.de','test3@test.de']" {...DEFAULT_INPUT_PROPS} _touched={touched}>
				E-Mail-Adresse (Auto-Vervollständigung)
			</KolInputEmail>
			<KolInputEmail _list="['test1@test.de','test2@test.de','test3@test.de']" _multiple {...DEFAULT_INPUT_PROPS} _touched={touched}>
				E-Mail-Adresse(n) (Auto-Vervollständigung, Mehrfachauswahl)
			</KolInputEmail>
			<KolInputEmail _readOnly {...DEFAULT_INPUT_PROPS} _touched={touched}>
				E-Mail-Adresse (Read only)
			</KolInputEmail>
			<KolInputEmail _disabled {...DEFAULT_INPUT_PROPS} _touched={touched}>
				E-Mail-Adresse (Disabled)
			</KolInputEmail>
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
