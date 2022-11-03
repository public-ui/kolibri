import { KolIndentedText, KolSkipNav as MyComponent } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { SkipNavConfiguration } from './autogen.configuration';

export default {
	...SkipNavConfiguration,
	title: 'React/SkipNav/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolSkipNav: ComponentStory<typeof MyComponent> = (args: any) => {
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
		<p>
			Bitte beachten Sie, das die <b>SkipNav</b>-Komponente nur durch Anspringen mit der <b>Tab-Taste</b> sichtbar wird.
		</p>
		<KolSkipNav {...args}></KolSkipNav>
	</div>
);
Standard.args = {
	...DefaultArgs,
};

export const Erweitert = () => {
	return (
		<div style={{ display: 'grid', gap: '0.25em' }}>
			<KolIndentedText>
				<p>
					<b>Links sind unsichtbar geschalten</b>
					<br />
					Um die Links zu sehen, am besten einmal in diesen Bereich klicken und Tab-Taste drücken.
				</p>
			</KolIndentedText>
			<KolSkipNav
				_ariaLabel="Versteckte Navigation"
				_links={[
					{
						_label: 'Ganz hoch und ich_bin_ein_echt_langes_zusammengesetztes_Worte_und_versuche_das_Layout_zu_brechen',
						_selector: 'header',
					},
					{ _label: 'Zum Formular', _selector: 'kol-form' },
					{ _label: 'Zum Ende', _selector: 'footer' },
				]}
			></KolSkipNav>
		</div>
	);
};
