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
	date: z.string({ required_error: 'Please enter a date.' }).min(1, 'Please enter a date.'),
	text: z.string({ required_error: 'Please enter text.' }).min(10, 'Text must be at least 10 characters long.'),
	email: z.string({ required_error: 'Please enter your email.' }).email('Invalid email address.'),
	password: z
		.string({ required_error: 'Please enter a password.' })
		.min(8, 'Password must be at least 8 characters.')
		.regex(/[A-Z]/, 'Password must include at least one uppercase letter.')
		.regex(/[0-9]/, 'Password must include at least one number.'),
	range: z.number({ required_error: 'Please select a range.' }).min(30, 'Minimum value is 30.'),
	number: z.number({ required_error: 'Please enter a number.' }).min(1, 'Minimum is 1.').max(10, 'Maximum is 10.'),
	checkbox: z
		.boolean({ required_error: 'You must accept the terms and conditions.' })
		.nullable()
		.refine((val: unknown) => val === true, { message: 'You must accept the terms and conditions.' }),
	radio: z.string({ required_error: 'Please select a gender.' }),
	color: z.string({ required_error: 'Please select a color.' }),
	select: z.string({ required_error: 'Please select a value.' }),
	singleSelect: z.string({ required_error: 'Please select a single option.' }),
	combobox: z.string({ required_error: 'Please select a country.' }),
	textarea: z.string({ required_error: 'Please enter a message.' }),
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
		id: `field-${key as string}`,
		_name: key,
		_value: watch(key),
		_touched: isTouched(key),
		_msg: err(key),
		_on: {
			onInput: (_e: any, v: unknown) => setValue(key, v, { shouldTouch: true, shouldValidate: true }),
			onBlur: () => trigger(key),
		},
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
											const input = document.getElementById(`field-${key}`);
											input?.focus();
										},
									}}
								/>
							</li>
						))}
					</ul>
				</KolAlert>
			)}

			<form onSubmit={handleSubmit(dummyClickEventHandler)} noValidate className="grid gap-4 mt-6">
				<KolInputDate _label="Date" {...bind('date')} />
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
