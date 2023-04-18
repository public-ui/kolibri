import React, { useState } from 'react';

import { KolButton, KolSelect as MyComponent } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { DEFAULT_INPUT_PROPS } from '../../bik-bitv-test';
import { SelectConfiguration } from './autogen.configuration';

export default {
	...SelectConfiguration,
	title: 'React/Select/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolSelect: ComponentStory<typeof MyComponent> = (args: any) => {
	return <MyComponent {...args}>{args.children}</MyComponent>;
};

const DefaultArgs = {};

export const Standard = (args: any) => (
	<div>
		<KolSelect {...args}>{args.content}</KolSelect>
	</div>
);
Standard.args = {
	...DefaultArgs,
};

export const Number = (args: any) => (
	<div>
		<KolSelect
			_id="mein_select"
			_name="mein_select"
			_multiple={true}
			_list="[{'label':'Herr','value':'Herr'},{'label':'Frau','value':'Frau'},{'label':'Firma','value':'Firma'}]"
		></KolSelect>
	</div>
);
Number.args = {
	...DefaultArgs,
};
Number.storyName = 'Multiselect';

export const error = (args: any) => (
	<div>
		<KolSelect
			_id="mein_select"
			_name="mein_select"
			_error="Fehlermeldung"
			_touched
			_list="[{'label':'Herr','value':'Herr'},{'label':'Frau','value':'Frau'},{'label':'Firma','value':'Firma'}]"
		></KolSelect>
	</div>
);
error.args = {
	...DefaultArgs,
};
error.storyName = 'Fehlermeldung';

export const Disabled = (args: any) => (
	<div>
		<KolSelect
			_id="mein_select"
			_name="mein_select"
			_list="[{'label':'Herr','value':'Herr'},{'label':'Frau','value':'Frau'},{'label':'Firma','value':'Firma'}]"
		></KolSelect>
		<div className="mt-2"></div>
		<KolSelect
			_id="mein_select"
			_name="mein_select"
			_disabled
			_list="[{'label':'Herr','value':'Herr'},{'label':'Frau','value':'Frau'},{'label':'Firma','value':'Firma'}]"
		></KolSelect>
	</div>
);
Disabled.args = {
	...DefaultArgs,
};
Disabled.storyName = 'Aktiv / Nicht aktiv';

export const Height = (args: any) => (
	<div>
		<KolSelect
			_height="85px"
			_id="mein_select"
			_name="mein_select"
			_list="[{'label':'Herr','value':'Herr'},{'label':'Frau','value':'Frau'},{'label':'Firma','value':'Firma'}]"
		></KolSelect>
	</div>
);
Disabled.args = {
	...DefaultArgs,
};
Disabled.storyName = 'Individuelle Höhe';

export const Formularbeispiel = () => {
	const [touched, setTouched] = useState<boolean>(false);
	const STATUS_OPTIONS = [
		{
			disabled: true,
			value: null,
			label: '- keine Auswahl -',
		},
		{
			label: 'Optgroup 1',
			options: [
				{
					value: 'a1',
					label: 'A1',
				},
				{
					disabled: true,
					value: 'b1',
					label: 'B1',
				},
				{
					label: 'Optgroup 2',
					options: [
						{
							value: 'a2',
							label: 'A2',
						},
						{
							value: 'b2',
							label: 'B2',
						},
					],
				},
				{
					value: 'c1',
					label: 'C1',
				},
			],
		},
		{
			value: '1',
			label: 'Gute Laune',
		},
		{
			value: '2',
			label: 'Geht so',
		},
		{
			value: '3',
			label: 'Schlechte Laune',
		},
		{
			value: '4',
			label: 'ich_bin_ein_echt_langes_zusammengesetztes_Worte_und_versuche_das_Layout_zu_brechen',
		},
	];

	return (
		<div style={{ display: 'grid', gap: '0.25em' }}>
			<KolSelect {...DEFAULT_INPUT_PROPS} _touched={touched} _list={STATUS_OPTIONS}>
				Stimmung
			</KolSelect>
			<KolSelect id="new-select-multi" _multiple {...DEFAULT_INPUT_PROPS} _touched={touched} _list={STATUS_OPTIONS}>
				Stimmung (Mehrfachauswahl)
			</KolSelect>
			<KolSelect _disabled {...DEFAULT_INPUT_PROPS} _touched={touched} _list={STATUS_OPTIONS}>
				Stimmung (Disabled)
			</KolSelect>
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
