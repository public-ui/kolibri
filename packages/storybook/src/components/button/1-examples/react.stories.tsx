import { KolButton as MyComponent, KolInputText } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ButtonConfiguration } from './autogen.configuration';

export default {
	...ButtonConfiguration,
	title: 'React/Button/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolButton: ComponentStory<typeof MyComponent> = (args: any) => {
	return <MyComponent {...args}>{args.children}</MyComponent>;
};

const DefaultArgs = {
	_label: 'Label-Text',
};

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Standard = (args: any) => (
	<div>
		<KolButton {...args}></KolButton>
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
export const WithIcon = (args: any) => (
	<div>
		<KolButton {...args}></KolButton>
	</div>
);
WithIcon.args = {
	...DefaultArgs,
	_icon: '{"top":{"icon":"icofont-arrow-up"}}',
};
WithIcon.storyName = 'Button mit Icon und Text';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const WithAllIcon = (args: any) => (
	<div>
		<KolButton {...args}></KolButton>
	</div>
);
WithAllIcon.args = {
	...DefaultArgs,
	_icon:
		'{"top":{"icon":"icofont-arrow-up"},"right":{"icon":"icofont-arrow-right"},"bottom":{"icon":"icofont-arrow-down"},"left":{"icon":"icofont-arrow-left"}}',
};
WithAllIcon.storyName = 'Button mit allen Icon und Text';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const WithIcons = (args: any) => (
	<div>
		<KolButton {...args}></KolButton>
	</div>
);
WithIcons.args = {
	...DefaultArgs,
	_icon:
		"{'top': {'style': {'font-size': '200%', 'transform': 'rotate(45deg)'}, 'icon': 'icofont-arrow-up'},'right': {'icon': 'icofont-arrow-right'},'bottom': {'icon': 'icofont-arrow-down'},'left': {'icon': 'icofont-arrow-left'}}",
};
WithIcons.storyName = 'Button mit verschiedenen Icon-Positionen';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const OnlyIcon = (args: any) => (
	<div>
		<KolButton {...args}></KolButton>
	</div>
);
OnlyIcon.args = {
	...DefaultArgs,
	_icon: 'home',
	_iconOnly: true,
};
OnlyIcon.storyName = 'Button nur mit Icon';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Tooltip = (args: any) => (
	<div>
		<KolButton {...args}></KolButton>
	</div>
);
Tooltip.args = {
	...DefaultArgs,
	_icon: 'home',
	_iconOnly: true,
	_label: 'Benamung des Button',
	_tooltipAlign: 'right',
};
Tooltip.storyName = 'Button mit Icon und Tooltip';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const WithCta = (args: any) => (
	<div style={{ display: 'flex', gap: '0.25rem' }}>
		<KolButton {...args} _variant="primary" _label="Primary"></KolButton>
		<KolButton {...args} _variant="secondary" _label="Secondary"></KolButton>
		<KolButton {...args} _variant="normal" _label="Normal"></KolButton>
		<KolButton {...args} _variant="danger" _label="Danger"></KolButton>
		<KolButton {...args} _variant="ghost" _label="Ghost"></KolButton>
		<KolButton {...args} _customClass="myClass" _variant="custom" _label="Custom"></KolButton>
	</div>
);
WithCta.args = {
	...DefaultArgs,
	_icon: 'home',
};
WithCta.storyName = 'Styles';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const WithSizes = (args: any) => (
	<div style={{ display: 'flex', gap: '0.25rem' }}>
		<KolButton _label="Button ohne Mindestbreite" _icon="icofont-home" _iconAlign="left"></KolButton>
		<br />
		<KolButton _label="Button mit 100 Pixel Mindestbreite" _icon="icofont-home" _iconAlign="left" style={{ width: '100px' }}></KolButton>
		<br />
		<KolButton _label="Button mit 200 Pixel Mindestbreite" _icon="icofont-home" _iconAlign="left" style={{ width: '200px' }}></KolButton>
		<br />
		<KolButton _label="Button mit 300 Pixel Mindestbreite" _icon="icofont-home" _iconAlign="left" style={{ width: '300px' }}></KolButton>
		<br />
		<KolButton _label="Button mit 400 Pixel Mindestbreite" _icon="icofont-home" _iconAlign="left" style={{ width: '400px' }}></KolButton>
	</div>
);
WithSizes.args = {
	...DefaultArgs,
};
WithSizes.storyName = 'Mindestbreite von Buttons';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Context = (args: any) => (
	<div>
		<div style={{ display: 'grid', gap: '0.25rem' }}>
			<KolInputText _type="text" _id="vorname" _name="vorname" _placeholder="Vorname"></KolInputText>
			<KolInputText _type="text" _id="nachname" _name="nachname" _placeholder="Nachname"></KolInputText>
			<div style={{ display: 'flex', gap: '0.25rem' }}>
				<KolButton _label="Abbrechen" _icon="icofont-home" _variant="danger" _iconAlign="left"></KolButton>
				<KolButton _label="Speichern" _icon="icofont-save" _variant="primary" _iconAlign="left"></KolButton>{' '}
			</div>
		</div>
	</div>
);
Context.args = {
	...DefaultArgs,
};
Context.storyName = 'Anwendung';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Output = (args: any) => (
	<div style={{ display: 'grid', gap: '0.25rem' }}>
		<KolButton class="not-used" _variant="primary" _label="Primary-Schaltfläche"></KolButton>
		<KolButton class="not-used" _variant="secondary" _label="Secondary-Schaltfläche"></KolButton>
		<KolButton class="not-used" _variant="danger" _label="Danger-Schaltfläche"></KolButton>
		<KolButton class="not-used" _variant="ghost" _label="Ghost-Schaltfläche"></KolButton>
		<KolButton class="not-used" _className="myClass" _variant="custom" _label="Custom-Schaltfläche"></KolButton>

		<KolButton class="not-used" _disabled _label="Disabled-Schaltfläche"></KolButton>
		<KolButton class="not-used" _variant="primary" _label="Hinzufügen"></KolButton>
		<KolButton className="font-80" style={{ fontSize: '80%' }} _variant="primary" _label="Hinzufügen" _icon="icofont-ui-add"></KolButton>
		<KolButton className="font-60" style={{ fontSize: '60%' }} _variant="primary" _label="Hinzufügen" _icon="icofont-ui-add" _icon-align="right"></KolButton>
		<KolButton class="not-used" _variant="primary" _label="Hinzufügen (nur Icon)" _icon="icofont-ui-add" _icon-only="true"></KolButton>
		<KolButton _variant="primary" _label="ich_bin_ein_echt_langes_zusammengesetztes_Worte_und_versuche_das_Layout_zu_brechen"></KolButton>

		<div className="d-flex" style={{ maxWidth: '420px', justifyContent: 'space-between' }}>
			<KolButton class="not-used" _variant="primary" _label="Speichern"></KolButton>
			<KolButton class="not-used" _variant="primary" _disabled _label="Bearbeiten"></KolButton>
			<KolButton class="not-used" _variant="primary" _label="Abbrechen"></KolButton>
			<KolButton class="not-used" _variant="primary" _label="Löschen"></KolButton>
		</div>
		<div className="d-flex" style={{ fontSize: '80%', maxWidth: '345px', justifyContent: 'space-between' }}>
			<KolButton class="not-used" _variant="primary" _label="Speichern"></KolButton>
			<KolButton class="not-used" _variant="primary" _disabled _label="Bearbeiten"></KolButton>
			<KolButton class="not-used" _variant="primary" _label="Abbrechen"></KolButton>
			<KolButton class="not-used" _variant="primary" _label="Löschen"></KolButton>
		</div>
		<div className="d-flex" style={{ fontSize: '60%', maxWidth: '265px', justifyContent: 'space-between' }}>
			<KolButton class="not-used" _variant="primary" _label="Speichern"></KolButton>
			<KolButton class="not-used" _variant="primary" _disabled _label="Bearbeiten"></KolButton>
			<KolButton class="not-used" _variant="primary" _label="Abbrechen"></KolButton>
			<KolButton class="not-used" _variant="primary" _label="Löschen"></KolButton>
		</div>
	</div>
);

Output.storyName = 'Darstellungsvarianten';
