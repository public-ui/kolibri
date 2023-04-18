import React, { useState } from 'react';

import { KolButton, KolInputDate as MyComponent } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DEFAULT_INPUT_PROPS } from '../../bik-bitv-test';

import { InputDateConfiguration } from './autogen.configuration';

export default {
	...InputDateConfiguration,
	title: 'React/InputDate/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolInputDate: ComponentStory<typeof MyComponent> = (args: any) => {
	return <MyComponent {...args}>{args.children}</MyComponent>;
};

const DefaultArgs = {};

export const Standard = (args: any) => (
	<div>
		<KolInputDate {...args}>{args._label}</KolInputDate>
	</div>
);
Standard.args = {
	...DefaultArgs,
};

export const DateDefault = (args: any) => (
	<div>
		<KolInputDate _type="date" _id="mein_datum" _name="mein_datum">
			Erstellungsdatum
		</KolInputDate>
	</div>
);
Date.args = {
	...DefaultArgs,
};
Date.storyName = 'Datum';

export const DateMin = (args: any) => (
	<div>
		<KolInputDate _type="date" _id="mein_datum" _name="mein_datum" _min={new Date()}>
			Fälligkeitsdatum
		</KolInputDate>
	</div>
);
Date.args = {
	...DefaultArgs,
};
Date.storyName = 'Datum';

export const Month = (args: any) => (
	<div>
		<KolInputDate _type="month" _id="mein_monat" _name="mein_monat">
			Monat
		</KolInputDate>
	</div>
);
Month.args = {
	...DefaultArgs,
};
Month.storyName = 'Monat';

export const Week = (args: any) => (
	<div>
		<KolInputDate _type="week" _id="meine_woche" _name="meine_woche">
			Woche
		</KolInputDate>
	</div>
);
Week.args = {
	...DefaultArgs,
};
Week.storyName = 'Woche';

export const Time = (args: any) => (
	<div>
		<KolInputDate _type="time" _id="meine_zeit" _name="meine_zeit">
			Zeit
		</KolInputDate>
	</div>
);
Time.args = {
	...DefaultArgs,
};
Time.storyName = 'Zeit';

export const TimeLocal = (args: any) => (
	<div>
		<KolInputDate _type="datetime-local" _id="meine_zeit" _name="meine_zeit">
			Datum & Zeit
		</KolInputDate>
	</div>
);
TimeLocal.args = {
	...DefaultArgs,
};
TimeLocal.storyName = 'Datum & Zeit';

export const Disabled = (args: any) => (
	<div>
		<KolInputDate _type="date" _id="meine_zahl" _name="meine_zahl">
			Anzahl
		</KolInputDate>
		<div className="mt-2"></div>
		<KolInputDate _type="date" _id="meine_zahl" _name="meine_zahl" _disabled>
			Anzahl
		</KolInputDate>
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
			<KolInputDate _max={10} _min={-10} _step={2} _type="number" {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Zahleneingabe (-10 bis 10 in 2er Schritten)
			</KolInputDate>
			<KolInputDate _type="date" {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Datum
			</KolInputDate>
			<KolInputDate _type="datetime-local" {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Local-Datetime (Standard)
			</KolInputDate>
			<KolInputDate _type="datetime-local" _step={1} {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Local-Datetime (mit Sekunden)
			</KolInputDate>
			<KolInputDate _type="month" {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Monat
			</KolInputDate>
			<KolInputDate _type="week" {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Woche
			</KolInputDate>
			<KolInputDate _type="time" {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Zeit (Standard)
			</KolInputDate>
			<KolInputDate _type="time" _step={1} {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Zeit (mit Sekunden)
			</KolInputDate>
			<KolInputDate _type="number" _readOnly {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Zahleneingabe (Read only)
			</KolInputDate>
			<KolInputDate _type="number" _disabled {...DEFAULT_INPUT_PROPS} _touched={touched}>
				Zahleneingabe (Disabled)
			</KolInputDate>
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
