import React from 'react';
import type { FC } from 'react';
import { KolAlert, KolInputCheckbox, KolInputText, KolSelect } from '@public-ui/react';
import { SampleDescription } from '../components/SampleDescription';
import type { SelectOption } from '@public-ui/components';

export const InputGroupWithError: FC = () => {
	const phoneError = true;
	const phoneErrorMessage = 'Unrecognized phone number.';
	const pizzaError = true;
	const pizzaErrorMessage = 'Choose at least two and up to five toppings.';
	const pizzaToppings = ['Mushrooms', 'Bell Peppers', 'Onions', 'Olives', 'Spinach', 'Tomatoes', 'Artichokes', 'Zucchini', 'Jalapeños', 'Basil'];

	const countryCodes: SelectOption<string>[] = [
		{
			label: 'United States +1',
			value: '1',
		},
		{
			label: 'Greece +30 ',
			value: '30',
		},
		{
			label: 'Germany +49',
			value: '49',
		},
		{
			label: 'Japan +81',
			value: '81',
		},
	];

	return (
		<>
			<SampleDescription>
				<p>This sample shows how input components can be grouped together with just one error message, without repeating the message for every field.</p>
				<p>The sample only demonstrates how the errors can be displayed, an actual validation logic is not part of the example.</p>
			</SampleDescription>

			<fieldset>
				<legend>Phone number</legend>
				{phoneError && <KolAlert _alert _type="error" _label={phoneErrorMessage} />}

				<div className="grid grid-cols-3 gap-4 max-w-2xl">
					<KolSelect _options={countryCodes} _label="CountryCode " _msg={{ _description: phoneErrorMessage, _type: 'error' }} _touched _hideError />
					<KolInputText _label="Area code" _msg={{ _description: phoneErrorMessage, _type: 'error' }} _touched _hideError />
					<KolInputText _label="Local number" _msg={{ _description: phoneErrorMessage, _type: 'error' }} _touched _hideError />
				</div>
			</fieldset>

			<fieldset className="mt">
				<legend>Pizza toppings</legend>
				{pizzaError && <KolAlert _alert _type="error" _label={pizzaErrorMessage} />}

				{pizzaToppings.map((topping) => (
					<KolInputCheckbox key={topping} _label={topping} _msg={{ _description: phoneErrorMessage, _type: 'error' }} _touched _hideError />
				))}
			</fieldset>
		</>
	);
};
