import React, { useState } from 'react';

import { KolButton, KolInputText as MyComponent } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DEFAULT_INPUT_PROPS } from '../../bik-bitv-test';

import { NAMEN } from '../../../constants/names';
import { InputTextConfiguration } from './autogen.configuration';

export default {
	...InputTextConfiguration,
	title: 'React/InputText/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolInputText: ComponentStory<typeof MyComponent> = (args: any) => {
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
		<KolInputText {...args}>{args.label}</KolInputText>
	</div>
);
Standard.args = {
	...DefaultArgs,
};

export const Search = () => (
	<div>
		<KolInputText
			_id="mein_text"
			_name="mein_text"
			_hideLabel
			_icon="icofont-{'left': {'icon':'icofont-arrow-up'}}"
			_type="search"
			_placeholder="Geben Sie einen Suchbegriff ein"
		>
			Suchbegriff
		</KolInputText>
	</div>
);
Search.args = {
	...DefaultArgs,
};
Search.storyName = 'Suchfeld';

export const Url = () => (
	<div>
		<KolInputText _id="mein_text" _name="mein_text" _type="url" _placeholder="Geben Sie eine URL ein"></KolInputText>
	</div>
);
Url.args = {
	...DefaultArgs,
};
Url.storyName = 'URL-Feld';

export const Phone = () => (
	<div>
		<KolInputText _id="mein_text" _name="mein_text" _type="tel" _placeholder="Geben Sie eine Telefonnummer ein">
			URL
		</KolInputText>
	</div>
);
Phone.args = {
	...DefaultArgs,
};
Phone.storyName = 'Telefonnummer';

export const Error = () => (
	<div>
		<KolInputText _id="mein_text" _name="mein_text" _type="text" _error="Fehlermeldung" _touched>
			Telefonnummer
		</KolInputText>
	</div>
);
Error.args = {
	...DefaultArgs,
};
Error.storyName = 'Fehlermeldung';

export const IconLeftRight = () => (
	<div>
		<KolInputText _id="meine_range" _name="meine_range" _icon="icofont-{'left':{'icon':'icofont-arrow-left'}}">
			Icon links
		</KolInputText>
		<div className="mt-2"></div>
		<KolInputText _id="meine_range" _name="meine_range" _icon="icofont-{'right':{'icon':'icofont-arrow-right'}}">
			Icon rechts
		</KolInputText>
		<div className="mt-2"></div>
		<KolInputText _id="meine_range" _name="meine_range" _hideLabel _icon="icofont-{'right':{'icon':'icofont-arrow-right'}}">
			Icon rechts, label ausgeblendet
		</KolInputText>
	</div>
);
IconLeftRight.args = {
	...DefaultArgs,
};
IconLeftRight.storyName = 'Icon links / rechts / ohne Label';

export const Disabled = () => (
	<div>
		<KolInputText _id="meine_range" _name="meine_range">
			Vorname
		</KolInputText>
		<div className="mt-2"></div>
		<KolInputText _id="meine_range" _name="meine_range" _disabled>
			Vorname (disabled)
		</KolInputText>
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
			<KolInputText _list={NAMEN} _type="text" {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Vorname (Auto-Vervollständigung)
			</KolInputText>
			<KolInputText _type="search" {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Suchbegriff
			</KolInputText>
			<KolInputText _type="url" {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Url
			</KolInputText>
			<KolInputText _type="tel" {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Telefonnummer
			</KolInputText>
			<KolInputText _readOnly _type="text" {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Vorname (Read only)
			</KolInputText>
			<KolInputText _disabled _type="text" {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Vorname (Disabled)
			</KolInputText>
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
