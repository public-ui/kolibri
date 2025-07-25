import React from 'react';
import { useForm } from 'react-hook-form';
import type { FieldError } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
	KolInputCheckbox,
	KolInputColor,
	KolInputDate,
	KolInputEmail,
	KolInputNumber,
	KolInputPassword,
	KolInputRadio,
	KolInputRange,
	KolInputText,
	KolSelect,
	KolSingleSelect,
	KolCombobox,
	KolTextarea,
	KolButton,
	KolHeading,
	KolAlert,
	KolLink,
} from '@public-ui/react';

import { SampleDescription } from '../components/SampleDescription';
import { COUNTRY_SUGGESTIONS } from '../shares/country';
import { useToasterService } from '../hooks/useToasterService';

const formSchema = z.object({
	date: z.string({ required_error: 'Date is required' }).min(1, 'Date is required'),
	text: z.string({ required_error: 'Text is required' }).min(10, 'Minimum 10 characters'),
	email: z.string({ required_error: 'Email is required' }).email('Invalid email address'),
	password: z
		.string({ required_error: 'Password is required' })
		.min(8, 'Min 8 characters')
		.regex(/[A-Z]/, 'At least one uppercase letter')
		.regex(/[0-9]/, 'At least one number'),
	range: z.number({ required_error: 'Email is required' }).min(30, 'Minimum value is 30'),
	number: z.number({ required_error: 'Email is required' }).min(1, 'Minimum 1').max(10, 'Maximum 10'),
	checkbox: z.literal(true, {
		errorMap: () => ({ message: 'You must accept the terms' }),
	}),
	radio: z.string({ required_error: 'Please choose your Gender' }),
	color: z.string({ required_error: 'Favorite Color is required' }),
	select: z.string({ required_error: 'Select is required' }),
	singleSelect: z.string({ required_error: 'Single select is required' }),
	combobox: z.string({ required_error: 'Country is required' }),
	textarea: z.string({ required_error: 'Message is required' }),
});

type FormData = z.infer<typeof formSchema>;

export const SampleFormWithValidation: React.FC = () => {
	const { dummyClickEventHandler } = useToasterService();
	const {
		handleSubmit,
		formState: { errors, touchedFields },
		reset,
		setValue,
		trigger,
		watch,
	} = useForm<FormData>({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			range: 30,
			number: 5,
		},
	});

	const err = <K extends keyof FormData>(key: K): any => (errors[key] ? { _description: errors[key]?.message as string, _type: 'error' } : undefined);

	const isTouched = <K extends keyof FormData>(key: K) => !!touchedFields[key];

	const bind = <K extends keyof FormData>(key: K) => ({
		_name: key,
		_value: watch(key),
		_touched: isTouched(key),
		_msg: err(key),
		_on: { onInput: (e: any, v: unknown) => setValue(key, v, { shouldTouch: true, shouldValidate: true }), onBlur: () => trigger(key) },
	});

	const onReset = () => {
		reset(undefined, {
			keepErrors: false,
			keepTouched: false,
			keepDirty: false,
		});
	};

	const allErrors = Object.entries(errors)
		.map(([key, value]) => [key, (value as FieldError).message] as const)
		.filter(([, msg]) => Boolean(msg));

	return (
		<section className="w-full max-w-3xl mx-auto p-6">
			<KolHeading _level={2} _label="Sample Form with Validation (Zod)" />
			<SampleDescription>
				<p>
					This example shows validation with <code>react-hook-form</code>, <code>Zod</code>, and an error list.
				</p>
			</SampleDescription>

			{allErrors.length > 0 && (
				<KolAlert _type="error" _label="Please fix the following:" _alert _variant="card">
					<ul className="list-disc pl-5">
						{allErrors.map(([key, msg], i) => (
							<li key={i}>
								<KolLink
									_label={msg}
									_href={`#field-${key}`}
									_on={{
										onClick: (e) => {
											e.preventDefault();
											const el = document.getElementById(`field-${key}`);
											if (el) el.focus();
										},
									}}
								/>
							</li>
						))}
					</ul>
				</KolAlert>
			)}

			<form onSubmit={handleSubmit(dummyClickEventHandler)} noValidate className="grid gap-4 mt-6">
				<KolInputDate _label="Date" {...bind('date')} _id="field-date" />
				<KolInputText _label="Text (≥ 10 chars)" {...bind('text')} />
				<KolInputEmail _label="Email" {...bind('email')} />
				<KolInputPassword _label="Password" {...bind('password')} />
				<KolInputRange _label="Range (≥ 30)" _min={0} _max={100} {...bind('range')} />
				<KolInputNumber _label="Number (1 – 10)" {...bind('number')} />
				<KolInputCheckbox _label="Accept terms" {...bind('checkbox')} />
				<KolInputRadio
					_label="Gender"
					_options={[
						{ label: 'Female', value: 'f' },
						{ label: 'Male', value: 'm' },
					]}
					{...bind('radio')}
				/>
				<KolInputColor _label="Favorite Color" {...bind('color')} />
				<KolSelect
					_label="Select"
					_options={[
						{ label: 'Option A', value: 'A' },
						{ label: 'Option B', value: 'B' },
					]}
					{...bind('select')}
				/>
				<KolSingleSelect
					_label="Single Select"
					_options={[
						{ label: 'Option A', value: 'A' },
						{ label: 'Option B', value: 'B' },
					]}
					{...bind('singleSelect')}
				/>
				<KolCombobox _label="Country" _suggestions={COUNTRY_SUGGESTIONS} {...bind('combobox')} />
				<KolTextarea _label="Message" _rows={4} {...bind('textarea')} />

				<div className="flex gap-4 mt-4">
					<KolButton _label="Submit" _type="submit" _variant="primary" />
					<KolButton _label="Reset" _type="reset" onClick={onReset} />
				</div>
			</form>
		</section>
	);
};
