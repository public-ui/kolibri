import { KolButton, KolInputCheckbox as MyComponent, KolLink } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';
import { DEFAULT_INPUT_PROPS } from '../../bik-bitv-test';

import { InputCheckboxConfiguration } from './autogen.configuration';

export default {
	...InputCheckboxConfiguration,
	title: 'React/InputCheckbox/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolInputCheckbox: ComponentStory<typeof MyComponent> = (args: any) => {
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
		<KolInputCheckbox {...args}>{args.content}</KolInputCheckbox>
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
export const Switch = (args: any) => (
	<div>
		<KolInputCheckbox _id="mein_switch" _name="mein_switch" _type="switch"></KolInputCheckbox>
	</div>
);
Switch.args = {
	...DefaultArgs,
};
Switch.storyName = 'Checkbox als Switch';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Cases = (args: any) => (
	<div>
		<KolInputCheckbox _id="mein_switch" _name="mein_switch" _type="checkbox">
			Nicht ausgewählt
		</KolInputCheckbox>
		<KolInputCheckbox _id="mein_switch" _name="mein_switch" _type="checkbox" _checked>
			Ausgewählt
		</KolInputCheckbox>
		<KolInputCheckbox _id="mein_switch" _name="mein_switch" _type="checkbox" _indeterminate>
			Unbestimmt (Indeterminate)
		</KolInputCheckbox>
	</div>
);
Cases.args = {
	...DefaultArgs,
};
Cases.storyName = 'Mögliche Zustände einer Checkbox';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const CasesS = (args: any) => (
	<div>
		<KolInputCheckbox _id="mein_switch" _name="mein_switch" _type="switch">
			Nicht Ausgewählt
		</KolInputCheckbox>
		<KolInputCheckbox _id="mein_switch" _name="mein_switch" _type="switch" _checked>
			Ausgewählt
		</KolInputCheckbox>
		<KolInputCheckbox _id="mein_switch" _name="mein_switch" _type="switch" _indeterminate>
			Unbestimmt (Indeterminate)
		</KolInputCheckbox>
	</div>
);
CasesS.args = {
	...DefaultArgs,
};
CasesS.storyName = 'Mögliche Zustände eines Switch';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const WithText = (args: any) => (
	<div>
		<KolInputCheckbox _id="mein_switch" _name="mein_switch" _type="checkbox">
			* Bitte bestätigen Sie durch Klick
		</KolInputCheckbox>
		<KolInputCheckbox _id="mein_switch" _name="mein_switch" _type="switch">
			* Bitte bestätigen Sie durch Klick
		</KolInputCheckbox>
	</div>
);
WithText.args = {
	...DefaultArgs,
};
WithText.storyName = 'Checkbox mit Label';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const WithLink = (args: any) => (
	<div>
		<KolInputCheckbox _id="mein_switch" _name="mein_switch" _type="checkbox">
			* Ich habe die <KolLink>Datenschutzerklärung</KolLink> zur Kenntnis genommen
		</KolInputCheckbox>
		<KolInputCheckbox _id="mein_switch" _name="mein_switch" _type="switch">
			* Ich habe die <KolLink>Datenschutzerklärung</KolLink> zur Kenntnis genommen
		</KolInputCheckbox>
	</div>
);
WithLink.args = {
	...DefaultArgs,
};
WithLink.storyName = 'Label mit Link';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Messages = (args: any) => (
	<div>
		<KolInputCheckbox _id="mein_switch" _name="mein_switch" _type="checkbox" _error="Fehlermeldung" _touched>
			* Bitte bestätigen Sie durch Klick
		</KolInputCheckbox>
	</div>
);
Messages.args = {
	...DefaultArgs,
};
Messages.storyName = 'Checkbox Fehlermeldung';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Disabled = (args: any) => (
	<div>
		<KolInputCheckbox _id="mein_switch" _name="mein_switch" _type="checkbox">
			* Bitte bestätigen Sie durch Klick
		</KolInputCheckbox>
		<KolInputCheckbox _id="mein_switch" _name="mein_switch" _type="checkbox" _disabled>
			* Bitte bestätigen Sie durch Klick
		</KolInputCheckbox>
	</div>
);
Disabled.args = {
	...DefaultArgs,
};
Disabled.storyName = 'Aktiv / Nicht aktiv';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Formularbeispiel = (args: any) => {
	const [touched, setTouched] = useState<boolean>(false);
	return (
		<div style={{ display: 'grid', gap: '0.25em' }}>
			<KolInputCheckbox {...DEFAULT_INPUT_PROPS} _type="checkbox" _touched={touched}>
				Ich akzeptiere die Allgemeinen Geschäftsbedingungen. (Checkbox)
			</KolInputCheckbox>
			<KolInputCheckbox {...DEFAULT_INPUT_PROPS} _type="switch" _touched={touched}>
				Ich akzeptiere die Allgemeinen Geschäftsbedingungen. (Switch)
			</KolInputCheckbox>
			<KolInputCheckbox {...DEFAULT_INPUT_PROPS} _type="checkbox" _disabled _touched={touched}>
				Ich akzeptiere die Allgemeinen Geschäftsbedingungen. (Disabled)
			</KolInputCheckbox>
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
