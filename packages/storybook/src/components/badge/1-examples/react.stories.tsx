import { KolBadge as MyComponent, KolDetails, KolHeading } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { BadgeConfiguration } from './autogen.configuration';

export default {
	...BadgeConfiguration,
	title: 'React/Badge/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolBadge: ComponentStory<typeof MyComponent> = (args: any) => {
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
		<KolBadge {...args}></KolBadge>
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
export const Einfaerben = (args: any) => (
	<div style={{ display: 'flex', gap: '0.25em' }}>
		<KolBadge {...args}></KolBadge>
		<KolBadge {...args} _color="#B22222"></KolBadge>
		<KolBadge {...args} _color="#4682B4"></KolBadge>
		<KolBadge {...args} _color="#228B22"></KolBadge>
		<KolBadge {...args} _color="#8B008B"></KolBadge>
	</div>
);
Einfaerben.args = {
	...DefaultArgs,
};
Einfaerben.storyName = 'Einfärben';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const MitIcon = (args: any) => (
	<div style={{ display: 'flex', gap: '0.25em' }}>
		<KolBadge {...args} _label="Standard ohne Icon"></KolBadge>
		<KolBadge {...args} _label="Icon Home" _icon={'home'}></KolBadge>
		<KolBadge {...args} _label="Icon question-circle" _icon={'question-circle'}></KolBadge>
		<KolBadge {...args} _label="Icon exclamation-circle" _icon={'exclamation-circle'}></KolBadge>
		<KolBadge {...args} _label="Icon calendar" _icon={'calendar'}></KolBadge>
	</div>
);

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const IconPosition = (args: any) => (
	<div style={{ display: 'flex', gap: '0.25em' }}>
		<KolBadge {...args} _iconAlign={'left'}></KolBadge>
		<KolBadge {...args} _iconAlign={'right'}></KolBadge>
	</div>
);
IconPosition.args = {
	...DefaultArgs,
	_icon: 'home',
};

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Schriftschnitt = (args: any) => (
	<div style={{ display: 'flex', gap: '0.25em' }}>
		<KolBadge {...args} _label="Normale Schrift"></KolBadge>
		<KolBadge
			{...args}
			_label="Schrift fett"
			style={{
				fontWeight: '600',
			}}
		></KolBadge>
	</div>
);

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const AlsLabel = (args: any) => (
	<div>
		<KolBadge {...args}></KolBadge>
		<p>
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
			voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor .
		</p>
	</div>
);
AlsLabel.args = {
	_label: '23.08.2021',
	_icon: 'calendar',
	_color: '#4682B4',
};

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Bright = (args: any) => (
	<div>
		<KolDetails _summary="Hinweise zur Barrierefreiheit">Die Komponente managed die Schriftfarbe in Abhängigkeit zur Hintergrundfarbe automatisch.</KolDetails>

		<KolHeading _level={2}>Heller Hintergrund</KolHeading>
		<div style={{ display: 'flex', gap: '0.25em' }}>
			<KolBadge _label="Ich bin ein Tag!" _icon="icofont-ui-love" _color="#c1ca31"></KolBadge>
			<KolBadge _label="Ich auch!" _icon="icofont-ui-rating" _icon-align="right" _color="#f7bb3d"></KolBadge>
			<KolBadge _label="Und ich!" _color="#80cdec"></KolBadge>
			<KolBadge _label="" _icon="icofont-ui-rate-blank" _icon-only _color="#f9e03a"></KolBadge>
		</div>
	</div>
);
Bright.storyName = 'Heller Hintergrund';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Dark = (args: any) => (
	<div>
		<KolDetails _summary="Hinweise zur Barrierefreiheit">Die Komponente managed die Schriftfarbe in Abhängigkeit zur Hintergrundfarbe automatisch.</KolDetails>

		<KolHeading _level={2}>Dunkler Hintergrund</KolHeading>
		<div style={{ display: 'flex', gap: '0.25em' }}>
			<KolBadge _label="Ich bin ein Tag!" _icon="icofont-ui-love" _color="#000"></KolBadge>
			<KolBadge _label="Ich auch!" _icon="icofont-ui-rating" _icon-align="right" _color="#94083c"></KolBadge>
			<KolBadge _label="Und ich!" _color="#0c247d"></KolBadge>
			<KolBadge _label="" _icon="icofont-ui-rate-blank" _icon-only _color="#030"></KolBadge>
		</div>
	</div>
);
Dark.storyName = 'Dunkler Hintergrund';
