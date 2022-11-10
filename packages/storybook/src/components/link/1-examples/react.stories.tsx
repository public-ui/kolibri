import { KolLink as MyComponent } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { LinkConfiguration } from './autogen.configuration';

export default {
	...LinkConfiguration,
	title: 'React/Link/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolLink: ComponentStory<typeof MyComponent> = (args: any) => {
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
		<KolLink {...args}>{args.content}</KolLink>
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
export const Text = (args: any) => (
	<div>
		<p>
			In diesem Absatz wird ein Link gesetzt, der keine weiteren Attribute enthält.
			<br />
			<KolLink>Hier steht ein Link</KolLink> Er wird standardmäßig als
			<i style={{ padding: '0px 5px' }}>
				<b>inline-Element</b>
			</i>
			ausgegeben.
		</p>
	</div>
);
Text.args = {
	...DefaultArgs,
};
Text.storyName = 'Fließtext';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Display = (args: any) => (
	<div>
		<p>
			In diesem Absatz wird ein Link gesetzt, der einmal als inline-block-Element ausgegeben wird.
			<KolLink style={{ display: 'inline-block', margin: '0px 5px' }}>
				Ich bin ein Link als <b>inline-block-Element</b>
			</KolLink>
			. Damit kann man mir per CSS-Styles eine Breite, eine Höhe und andere Eigenschaften zuweisen.
			<br />
			<br />
			Danach folgt ein Link, der als block-Element ausgegeben wird.
			<KolLink style={{ display: 'block' }}>
				Ich bin ein Link als <b>block-Element</b>,
			</KolLink>
			daher gehe ich über die ganze Breite des Eltern-Elements erzeuge so einen Zeilenumbruch.
		</p>
	</div>
);
Display.args = {
	...DefaultArgs,
};
Display.storyName = 'Positionierung';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const WithIcon = (args: any) => (
	<div>
		<p>
			<KolLink _icon={'home'}>Ich bin ein Link mit Icon links</KolLink>
			<br />
			<KolLink _icon={'home'} _iconAlign="right">
				Ich bin ein Link mit Icon rechts
			</KolLink>
			<br />
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea optio deleniti fuga quos molestias, voluptate nobis nemo, incidunt excepturi facilis, amet
			ducimus minus quae corporis eligendi cum distinctio. Fugit, repellendus.
			<KolLink _icon={'home'} style={{ paddingLeft: '5px' }}>
				Ich bin ein Link mit Icon links
			</KolLink>
			. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea optio deleniti fuga quos molestias, voluptate nobis nemo, incidunt excepturi{' '}
			<KolLink _icon={'home'} _iconAlign="right" style={{ paddingRight: '5px' }}>
				Ich bin ein Link mit Icon rechts
			</KolLink>
			facilis, amet ducimus minus quae corporis eligendi cum distinctio. Fugit, repellendus.
		</p>
	</div>
);
WithIcon.args = {
	...DefaultArgs,
};
WithIcon.storyName = 'Mit Icon';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Underline = (args: any) => (
	<div>
		<p>
			<KolLink _icon={'home'}>Ich bin ein Link in Standardausgabe mit Unterstrich</KolLink>
			<br />
			<KolLink _icon={'home'} _underline={false}>
				Ich bin ein Link in Standardausgabe ohne Unterstrich
			</KolLink>
		</p>
	</div>
);
Underline.args = {
	...DefaultArgs,
};
Underline.storyName = 'Unterstrichen';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Open = (args: any) => (
	<div>
		<p>
			<KolLink _icon={'home'} _target="_self" _href="https://www.w3.org">
				Ich öffne meinen Link im gleichen Browsertab
			</KolLink>
			<br />
			<KolLink _icon={'home'} _target="blank" _href="https://www.w3.org">
				Ich öffne meinen Link in einem neuen Browsertab
			</KolLink>
		</p>
	</div>
);
Open.args = {
	...DefaultArgs,
};
Open.storyName = 'Öffnungsverhalten';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Stealth = (args: any) => (
	<div>
		<p>
			<KolLink _icon={'home'} _href="https://www.w3.org">
				Ich bin ein veröffentlichter und damit sichtbarer Link
			</KolLink>
			<br />
			<KolLink _icon={'home'} _stealth _href="https://www.w3.org">
				Ich bin ein versteckter Link, werde aber vom Screenreader trotzdem gelesen
			</KolLink>
		</p>
	</div>
);
Stealth.args = {
	...DefaultArgs,
};
Stealth.storyName = 'Versteckt';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Image = (args: any) => (
	<div>
		<p>
			<KolLink _icon={'home'} _href="https://www.w3.org" _useCase="text">
				Ich bin ein Link, der als Text gerendert wird
			</KolLink>
			<br />
			<KolLink _icon={'home'} _href="https://www.w3.org" _useCase="image">
				Ich bin ein Link, der als Image gerendert wird.
			</KolLink>
		</p>
	</div>
);
Image.args = {
	...DefaultArgs,
};
Image.storyName = 'Ausgabeart';

export const Darstellungsvariante = () => {
	return (
		<div style={{ display: 'grid', gap: '0.25em' }}>
			<KolLink _href="https://de.wikipedia.org" _target="wikipedia">
				Wikipedia
			</KolLink>
			<KolLink _icon="icofont-paper-plane" _href="https://de.wikipedia.org" _target="wikipedia">
				Wikipedia
			</KolLink>
			<p>
				E-Mail:
				<KolLink _href="mailto: info@wikipedia.org" _target="mail-client" _target-description="Link wird im E-Mail-Programm geöffnet."></KolLink>
			</p>
			<KolLink _use-case="image" _aria-label="Icon als Link" _icon="icofont-paper-plane" _icon-only _href="https://de.wikipedia.org" _target="wikipedia">
				Wikipedia
			</KolLink>
		</div>
	);
};
