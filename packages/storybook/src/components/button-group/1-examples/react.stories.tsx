import { KolButton, KolButtonGroup as MyComponent, KolHeading } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { ButtonGroupConfiguration } from './autogen.configuration';

export default {
	...ButtonGroupConfiguration,
	title: 'React/ButtonGroup/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolButtonGroup: ComponentStory<typeof MyComponent> = (args: any) => {
	return <MyComponent {...args}></MyComponent>;
};

const DefaultArgs = {
	_nestled: 'top',
};

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Standard = (args: any) => (
	<div>
		<KolButtonGroup {...args}>
			<KolButton _label="Button 1" _icon="icofont-home"></KolButton>
			<KolButton _label="Button 2"></KolButton>
			<KolButton _label="Button 3"></KolButton>
		</KolButtonGroup>
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
		<KolButtonGroup>
			<KolButton _label="Nur Text"></KolButton>
			<KolButton _label="Nur Icon" _icon="icofont-home" _iconOnly></KolButton>
			<KolButton _label="Text und Icon" _icon="icofont-home" _iconAlign="right"></KolButton>
		</KolButtonGroup>
	</div>
);
WithIcon.args = {
	...DefaultArgs,
};
WithIcon.storyName = 'Button-Group mit Icon und Text';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const WithCta = (args: any) => (
	<div>
		<KolButtonGroup>
			<KolButton _label="Primary" _variant="primary"></KolButton>
			<KolButton _label="Secondary" _variant="secondary"></KolButton>
			<KolButton _label="Normal" _variant="normal"></KolButton>
			<KolButton _label="Danger" _variant="danger"></KolButton>
		</KolButtonGroup>
	</div>
);
WithCta.args = {
	...DefaultArgs,
	_icon: 'home',
	_iconOnly: true,
};
WithCta.storyName = 'Button-Group mit Styles';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const WithDisabled = (args: any) => (
	<KolButtonGroup>
		<KolButton _on _label="Aktiv"></KolButton>
		<KolButton _label="Nicht aktiv" _disabled={'true'}></KolButton>
		<KolButton _on _label="Aktiv"></KolButton>
	</KolButtonGroup>
);
WithDisabled.args = {
	...DefaultArgs,
};
WithDisabled.storyName = 'Button-Group mit deaktiviertem Button';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Nestled = (args: any) => (
	<div>
		<KolHeading _level={3}>Nestled Top</KolHeading>
		<KolButtonGroup _nestled="top">
			<KolButton _label="Button 1" _variant="primary"></KolButton>
			<KolButton _label="Button 2" _variant="secondary"></KolButton>
			<KolButton _label="Button 3" _variant="normal"></KolButton>
		</KolButtonGroup>
		<div className="mb-2"></div>
		<KolHeading _level={3}>Nestled Bottom</KolHeading>
		<KolButtonGroup {...args} _nestled="bottom">
			<KolButton _label="Button 1" _variant="primary"></KolButton>
			<KolButton _label="Button 2" _variant="secondary"></KolButton>
			<KolButton _label="Button 3" _variant="normal"></KolButton>
		</KolButtonGroup>
		<div className="mb-2"></div>
		<KolHeading _level={3}>Nestled Left</KolHeading>
		<KolButtonGroup {...args} _nestled="left">
			<KolButton _label="Button 1" _variant="primary"></KolButton>
			<KolButton _label="Button 2" _variant="secondary"></KolButton>
			<KolButton _label="Button 3" _variant="normal"></KolButton>
		</KolButtonGroup>
		<div className="mb-2"></div>
		<KolHeading _level={3}>Nestled Right</KolHeading>
		<KolButtonGroup {...args} _nestled="right">
			<KolButton _label="Button 1" _variant="primary"></KolButton>
			<KolButton _label="Button 2" _variant="secondary"></KolButton>
			<KolButton _label="Button 3" _variant="normal"></KolButton>
		</KolButtonGroup>
	</div>
);
WithDisabled.args = {
	...DefaultArgs,
};
WithDisabled.storyName = 'Button-Group mit deaktiviertem Button';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Output = (args: any) => (
	<div style={{ display: 'grid', gap: '0.25em' }}>
		<KolButtonGroup>
			<KolButton _variant="primary" _label="Speichern"></KolButton>
			<KolButton _variant="primary" _disabled _label="Bearbeiten"></KolButton>
			<KolButton _variant="primary" _label="Abbrechen"></KolButton>
			<KolButton _variant="primary" _label="Löschen"></KolButton>
		</KolButtonGroup>
		<div className="d-flex" style={{ fontSize: '80%' }}>
			<KolButtonGroup>
				<KolButton _variant="primary" _label="Speichern"></KolButton>
				<KolButton _variant="primary" _disabled _label="Bearbeiten"></KolButton>
				<KolButton _variant="primary" _label="Abbrechen"></KolButton>
				<KolButton _variant="primary" _label="Löschen"></KolButton>
			</KolButtonGroup>
		</div>
		<div className="d-flex" style={{ fontSize: '60%' }}>
			<KolButtonGroup>
				<KolButton _variant="primary" _label="Speichern"></KolButton>
				<KolButton _variant="primary" _disabled _label="Bearbeiten"></KolButton>
				<KolButton _variant="primary" _label="Abbrechen"></KolButton>
				<KolButton _variant="primary" _label="Löschen"></KolButton>
			</KolButtonGroup>
		</div>
	</div>
);

Output.storyName = 'Darstellungsvarianten';
