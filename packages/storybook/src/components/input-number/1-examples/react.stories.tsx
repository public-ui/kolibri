import React, { useState } from 'react';

import { KolButton, KolInputNumber as MyComponent } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DEFAULT_INPUT_PROPS } from '../../bik-bitv-test';

import { InputNumberConfiguration } from './autogen.configuration';

export default {
	...InputNumberConfiguration,
	title: 'React/InputNumber/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolInputNumber: ComponentStory<typeof MyComponent> = (args: any) => {
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
		<KolInputNumber {...args}>{args._label}</KolInputNumber>
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
export const Number = (args: any) => (
	<div>
		<KolInputNumber _type="number" _id="meine_zahl" _name="meine_zahl">
			Anzahl
		</KolInputNumber>
	</div>
);
Number.args = {
	...DefaultArgs,
};
Number.storyName = 'Zahlen';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const NumberBetween = (args: any) => (
	<div>
		<KolInputNumber _type="number" _min={100} _max={200} _id="meine_zahl" _name="meine_zahl">
			Anzahl
		</KolInputNumber>
	</div>
);
NumberBetween.args = {
	...DefaultArgs,
};
NumberBetween.storyName = 'Zahlen mit Min- und Max-Wert';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const NumberStep = (args: any) => (
	<div>
		<KolInputNumber _type="number" _min={100} _max={200} _step={50} _id="meine_zahl" _name="meine_zahl">
			Anzahl
		</KolInputNumber>
	</div>
);
NumberStep.args = {
	...DefaultArgs,
};
NumberStep.storyName = 'Zahlen mit Min- und Max-Wert und Schrittweite';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const DateDefault = (args: any) => (
	<div>
		<KolInputNumber _type="date" _id="mein_datum" _name="mein_datum">
			Erstellungsdatum
		</KolInputNumber>
	</div>
);
Date.args = {
	...DefaultArgs,
};
Date.storyName = 'Datum';
s;
/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Month = (args: any) => (
	<div>
		<KolInputNumber _type="month" _id="mein_monat" _name="mein_monat">
			Monat
		</KolInputNumber>
	</div>
);
Month.args = {
	...DefaultArgs,
};
Month.storyName = 'Monat';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Week = (args: any) => (
	<div>
		<KolInputNumber _type="week" _id="meine_woche" _name="meine_woche">
			Woche
		</KolInputNumber>
	</div>
);
Week.args = {
	...DefaultArgs,
};
Week.storyName = 'Woche';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Time = (args: any) => (
	<div>
		<KolInputNumber _type="time" _id="meine_zeit" _name="meine_zeit">
			Zeit
		</KolInputNumber>
	</div>
);
Time.args = {
	...DefaultArgs,
};
Time.storyName = 'Zeit';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const TimeLocal = (args: any) => (
	<div>
		<KolInputNumber _type="datetime-local" _id="meine_zeit" _name="meine_zeit">
			Datum & Zeit
		</KolInputNumber>
	</div>
);
TimeLocal.args = {
	...DefaultArgs,
};
TimeLocal.storyName = 'Datum & Zeit';

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Disabled = (args: any) => (
	<div>
		<KolInputNumber _type="number" _id="meine_zahl" _name="meine_zahl">
			Anzahl
		</KolInputNumber>
		<div className="mt-2"></div>
		<KolInputNumber _type="number" _id="meine_zahl" _name="meine_zahl" _disabled>
			Anzahl
		</KolInputNumber>
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
			<KolInputNumber _type="number" {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Zahleneingabe
			</KolInputNumber>
			<KolInputNumber _max={10} _min={-10} _step={2} _type="number" {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Zahleneingabe (-10 bis 10 in 2er Schritten)
			</KolInputNumber>
			<KolInputNumber _type="date" {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Datum
			</KolInputNumber>
			<KolInputNumber _type="datetime-local" {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Local-Datetime (Standard)
			</KolInputNumber>
			<KolInputNumber _type="datetime-local" _step={1} {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Local-Datetime (mit Sekunden)
			</KolInputNumber>
			<KolInputNumber _type="month" {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Monat
			</KolInputNumber>
			<KolInputNumber _type="week" {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Woche
			</KolInputNumber>
			<KolInputNumber _type="time" {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Zeit (Standard)
			</KolInputNumber>
			<KolInputNumber _type="time" _step={1} {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Zeit (mit Sekunden)
			</KolInputNumber>
			<KolInputNumber _type="number" _readOnly {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Zahleneingabe (Read only)
			</KolInputNumber>
			<KolInputNumber _type="number" _disabled {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Zahleneingabe (Disabled)
			</KolInputNumber>
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
