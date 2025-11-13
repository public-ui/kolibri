import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { FieldError } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
	KolAlert,
	KolButton,
	KolCombobox,
	KolHeading,
	KolInputCheckbox,
	KolInputColor,
	KolInputDate,
	KolInputEmail,
	KolInputNumber,
	KolInputPassword,
	KolInputRadio,
	KolInputRange,
	KolInputText,
	KolLink,
	KolSelect,
	KolSingleSelect,
	KolTextarea,
} from '@public-ui/react-v19';

import { SampleDescription } from '../components/SampleDescription';
import { useToasterService } from '../hooks/useToasterService';
import { COUNTRY_SUGGESTIONS } from '../shares/country';

const formSchema = z.object({
	date: z.preprocess(
		(val) => (typeof val === 'string' || val instanceof Date ? new Date(val) : undefined),
		z.date({ message: 'Date is required' }).refine((d) => !isNaN(d.getTime()), { message: 'Invalid date' }),
	),

	text: z.string({ message: 'Please enter text.' }).min(10, 'Text must be at least 10 characters long.'),
	email: z.string({ message: 'Please enter your email.' }).min(1, 'Please enter your email.').email('Invalid email address.'),
	password: z
		.string({ message: 'Please enter a password.' })
		.min(8, 'Password must be at least 8 characters.')
		.regex(/[A-Z]/, 'Password must include at least one uppercase letter.')
		.regex(/[0-9]/, 'Password must include at least one number.'),
	range: z.number({ message: 'Please select a range.' }).min(30, 'Minimum value is 30.'),
	number: z.number({ message: 'Please enter a number.' }).min(1, 'Minimum is 1.').max(10, 'Maximum is 10.'),
	checkbox: z.boolean().refine((val: boolean) => val === true, {
		message: 'You must accept the terms and conditions.',
	}),

	radio: z.string({ message: 'Please select a gender.' }).min(1, 'Please select a gender.'),
	color: z.string({ message: 'Please select a color.' }).min(1, 'Please select a color.'),
	select: z.string({ message: 'Please select a value.' }).min(1, 'Please select a value.'),
	singleSelect: z.string({ message: 'Please select a single option.' }).min(1, 'Please select a single option.'),
	combobox: z.string({ message: 'Please select a country.' }).min(1, 'Please select a country.'),
	textarea: z.string({ message: 'Please enter a message.' }).min(1, 'Please enter a message.'),
});

export const SampleFormWithValidation: React.FC = () => {
	const { dummyClickEventHandler } = useToasterService();
	const {
		handleSubmit,
		formState: { errors, touchedFields },
		reset,
		setValue,
		trigger,
		watch,
	} = useForm({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			range: 30,
			number: 5,
		},
	});

	const err = (key: keyof z.infer<typeof formSchema>) => {
		const fieldError = errors[key];

		if (!fieldError || typeof fieldError !== 'object' || !('message' in fieldError)) {
			return undefined;
		}

		return {
			_description: fieldError.message as string,
			_type: 'error' as const,
		};
	};

	const isTouched = (key: keyof z.infer<typeof formSchema>) => {
		return !!touchedFields[key];
	};

	const bind = <K extends keyof z.infer<typeof formSchema>>(key: K) => ({
		id: `field-${key as string}`,
		_name: key,
		_value: watch(key) as z.infer<typeof formSchema>[K],
		_touched: isTouched(key),
		_msg: err(key),
		_on: {
			onInput: (_: Event, v: unknown) => setValue(key, v as any, { shouldTouch: true, shouldValidate: true }),
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
										onClick: (e: Event) => {
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
