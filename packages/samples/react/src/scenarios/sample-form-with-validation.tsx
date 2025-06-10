import React from 'react';
import { useForm } from 'react-hook-form';
import {
	KolInputCheckbox,
	KolInputColor,
	KolInputDate,
	KolInputEmail,
	KolInputFile,
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
} from '@public-ui/react';
import { SampleDescription } from '../components/SampleDescription';

import { COUNTRY_SUGGESTIONS } from '../shares/country';

type FormData = {
	date: string;
	text: string;
	email: string;
	password: string;
	range: number;
	number: number;
	file: FileList;
	checkbox: boolean;
	radio: string;
	color: string;
	select: string;
	singleSelect: string;
	combobox: string;
	textarea: string;
};

export const SampleFormWithValidation: React.FC = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, touchedFields },
	} = useForm<FormData>({
		mode: 'onBlur',
		reValidateMode: 'onChange',
	});

	const onSubmit = (data: FormData) => {
		console.log('Submitted:', data);
		alert('Form submitted successfully!');
	};

	const onReset = () => {
		reset(undefined, {
			keepErrors: false,
			keepTouched: false,
			keepDirty: false,
		});
	};

	const err = <K extends keyof FormData>(key: K) => (errors[key] ? { _description: (errors[key] as any).message, _type: 'error' } : undefined);

	const isTouched = <K extends keyof FormData>(key: K) => !!touchedFields[key];

	return (
		<section className="w-full max-w-3xl mx-auto p-6">
			<KolHeading _level={2} _label="Sample Form with Validation" />

			<SampleDescription>
				<p>
					This example shows how to validate every Kolibri input using only <code>react-hook-form</code>.
				</p>
				<ul className="list-disc pl-5">
					<li>
						Errors appear <em>after</em> the first interaction and disappear immediately when the value becomes valid.
					</li>
					<li>
						<strong>Password rule:</strong> min 8 chars, 1 uppercase, 1 number.
					</li>
					<li>
						<strong>Range rule:</strong> value ≥ 30.
					</li>
					<li>
						Reset clears values <em>and</em> messages.
					</li>
				</ul>
			</SampleDescription>

			<form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mt-6" noValidate>
				<KolInputDate _label="Date" _msg={err('date')} _touched={isTouched('date')} {...register('date', { required: 'Date is required' })} />

				<KolInputText
					_label="Text (≥ 10 chars)"
					_msg={err('text')}
					_touched={isTouched('text')}
					{...register('text', {
						required: 'Text is required',
						minLength: { value: 10, message: 'Minimum 10 characters' },
					})}
				/>

				<KolInputEmail
					_label="Email"
					_msg={err('email')}
					_touched={isTouched('email')}
					{...register('email', {
						required: 'Email is required',
						pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' },
					})}
				/>

				<KolInputPassword
					_label="Password"
					_msg={err('password')}
					_touched={isTouched('password')}
					{...register('password', {
						required: 'Password is required',
						minLength: { value: 8, message: 'Min 8 characters' },
						validate: {
							hasUpper: (v) => /[A-Z]/.test(v) || 'At least one uppercase letter',
							hasNumber: (v) => /[0-9]/.test(v) || 'At least one number',
						},
					})}
				/>

				<KolInputRange
					_label="Range (≥ 30)"
					_min={0}
					_max={100}
					_msg={err('range')}
					_touched={isTouched('range')}
					{...register('range', {
						valueAsNumber: true,
						required: 'Range is required',
						min: { value: 30, message: 'Minimum value is 30' },
					})}
				/>

				<KolInputNumber
					_label="Number (1 – 10)"
					_msg={err('number')}
					_touched={isTouched('number')}
					{...register('number', {
						valueAsNumber: true,
						required: 'Number is required',
						min: { value: 1, message: 'Minimum 1' },
						max: { value: 10, message: 'Maximum 10' },
					})}
				/>

				<KolInputCheckbox
					_label="I accept the terms"
					_msg={err('checkbox')}
					_touched={isTouched('checkbox')}
					{...register('checkbox', { required: 'You must accept the terms' })}
				/>

				<KolInputRadio
					_label="Gender"
					_options={[
						{ label: 'Female', value: 'f' },
						{ label: 'Male', value: 'm' },
					]}
					_msg={err('radio')}
					_touched={isTouched('radio')}
					{...register('radio', { required: 'Please choose an option' })}
				/>

				<KolInputColor _label="Favorite Color" _msg={err('color')} _touched={isTouched('color')} {...register('color', { required: 'Color is required' })} />

				<KolSelect
					_label="Static Select"
					_options={[
						{ label: 'Option A', value: 'A' },
						{ label: 'Option B', value: 'B' },
					]}
					_msg={err('select')}
					_touched={isTouched('select')}
					{...register('select', { required: 'Please select an option' })}
				/>

				<KolSingleSelect
					_label="Single Select"
					_options={[
						{ label: 'Option A', value: 'A' },
						{ label: 'Option B', value: 'B' },
					]}
					_msg={err('singleSelect')}
					_touched={isTouched('singleSelect')}
					{...register('singleSelect', { required: 'Selection required' })}
				/>

				<KolCombobox
					_label="Country"
					_suggestions={COUNTRY_SUGGESTIONS}
					_msg={err('combobox')}
					_touched={isTouched('combobox')}
					{...register('combobox', { required: 'Country is required' })}
				/>

				<KolTextarea
					_label="Message"
					_rows={4}
					_msg={err('textarea')}
					_touched={isTouched('textarea')}
					{...register('textarea', { required: 'Message is required' })}
				/>

				<div className="flex gap-4 mt-4">
					<KolButton _label="Submit" _type="submit" _variant="primary" />
					<KolButton _label="Reset" _type="reset" onClick={onReset} />
				</div>
			</form>
		</section>
	);
};
