import React, { useState } from 'react';

import { KolButton, KolInputFile as MyComponent } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DEFAULT_INPUT_PROPS } from '../../bik-bitv-test';

import { InputFileConfiguration } from './autogen.configuration';

export default {
	...InputFileConfiguration,
	title: 'React/InputFile/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolInputFile: ComponentStory<typeof MyComponent> = (args: any) => {
	return <MyComponent {...args}>{args.children}</MyComponent>;
};

const DefaultArgs = {};

export const Standard = (args: any) => (
	<div>
		<KolInputFile {...args}>{args.content}</KolInputFile>
	</div>
);
Standard.args = {
	...DefaultArgs,
};

export const JustJPG = (args: any) => (
	<div>
		<KolInputFile _accept="image/jpg" _id="mein_upload" _name="mein_upload"></KolInputFile>
	</div>
);
JustJPG.args = {
	...DefaultArgs,
};
JustJPG.storyName = 'Nur JPG';

export const Multiple = (args: any) => (
	<div>
		<KolInputFile _id="mein_upload" _name="mein_upload" _multiple={true}></KolInputFile>
	</div>
);
Multiple.args = {
	...DefaultArgs,
};
Multiple.storyName = 'Mehrfachauswahl';

export const Messages = (args: any) => (
	<div>
		<KolInputFile _id="mein_upload" _name="mein_upload" _error="Fehlermeldung" _touched _value="info@email.de"></KolInputFile>
	</div>
);
Messages.args = {
	...DefaultArgs,
};
Messages.storyName = 'Fehlermeldung';

export const Disabled = (args: any) => (
	<div>
		<KolInputFile _id="mein_upload" _name="mein_upload"></KolInputFile>
		<div className="mt-2"></div>
		<KolInputFile _id="mein_upload" _name="mein_upload" _disabled></KolInputFile>
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
			<KolInputFile {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Datei hochladen
			</KolInputFile>
			<KolInputFile _multiple {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Datei(en) hochladen (Mehrfachauswahl)
			</KolInputFile>
			<KolInputFile _disabled {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Datei hochladen (Disabled)
			</KolInputFile>
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
