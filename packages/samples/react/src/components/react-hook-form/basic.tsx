import type { FC } from 'react';
import React from 'react';
import type { SubmitHandler, FieldErrors } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import {
	KolInputTextController,
	KolInputPasswordController,
	KolInputEmailController,
	KolInputNumberController,
	KolInputRangeController,
	KolInputDateController,
	KolInputColorController,
	KolInputFileController,
	KolTextareaController,
	KolComboboxController,
	KolSelectController,
	KolSingleSelectController,
	KolInputRadioController,
	KolInputCheckboxController,
} from '@public-ui/react-hook-form-adapter';
import { KolButton } from '@public-ui/react';

import { SampleDescription } from '../SampleDescription';
import { COUNTRY_SUGGESTIONS } from '../../shares/country';

interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	age: number;
	volume: number;
	birthday: string;
	favoriteColor: string;
	cv: FileList | null;
	bio: string;
	country: string;
	language: string;
	framework: string;
	gender: string;
	termsAccepted: boolean;
}

const defaultValues: FormData = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	age: 18,
	volume: 50,
	birthday: '',
	favoriteColor: '#000000',
	cv: null,
	bio: '',
	country: '',
	language: '',
	framework: '',
	gender: '',
	termsAccepted: false,
};

const languageOptions = [
	{ label: 'English', value: 'en' },
	{ label: 'German', value: 'de' },
	{ label: 'French', value: 'fr' },
];

const frameworkOptions = [
	{ label: 'React', value: 'react' },
	{ label: 'Vue', value: 'vue' },
	{ label: 'Stencil', value: 'stencil' },
];

const genderOptions = [
	{ label: 'Male', value: 'male' },
	{ label: 'Female', value: 'female' },
	{ label: 'Other', value: 'other' },
];

export const RHFBasic: FC = () => {
	const { control, handleSubmit } = useForm<FormData>({
		defaultValues,
		mode: 'onTouched',
	});

	const onSubmit: SubmitHandler<FormData> = (data) => {
		alert(JSON.stringify(data, null, 2));
	};

	const onError = (errors: FieldErrors<FormData>) => {
		console.warn('Validation errors:', errors);
	};

	return (
		<>
			<SampleDescription>
				<p>This sample demonstrates a form using React Hook Form with KoliBri adapters. All inputs are validated, and error messages are shown on submit.</p>
			</SampleDescription>

			<form onSubmit={handleSubmit(onSubmit, onError)} className="grid gap-4 w-full max-w-xl">
				<KolInputTextController name="firstName" control={control} _label="First Name" rules={{ required: 'First name is required' }} _required />
				<KolInputTextController name="lastName" control={control} _label="Last Name" rules={{ required: 'Last name is required' }} _required />
				<KolInputEmailController name="email" control={control} _label="Email" rules={{ required: 'Email is required' }} _required />
				<KolInputPasswordController name="password" control={control} _label="Password" rules={{ required: 'Password is required' }} _required />
				<KolInputNumberController name="age" control={control} _label="Age" rules={{ required: 'Age is required', min: 0 }} _required />
				<KolInputRangeController name="volume" control={control} _label="Volume (0–100)" _min={0} _max={100} />
				<KolInputDateController name="birthday" control={control} _label="Birthday" rules={{ required: 'Birthday is required' }} />
				<KolInputColorController name="favoriteColor" control={control} _label="Favorite Color" id="favoriteColor" _required />
				<KolInputFileController name="cv" control={control} _label="Upload CV" rules={{ required: 'Please upload your CV' }} _required />
				<KolTextareaController name="bio" control={control} _label="Bio" rules={{ required: 'Please provide a short bio' }} _required />
				<KolComboboxController
					name="country"
					control={control}
					_label="Country"
					rules={{ required: 'Please select a country' }}
					_suggestions={COUNTRY_SUGGESTIONS}
					_required
				/>
				<KolSelectController
					name="language"
					control={control}
					_label="Preferred Language"
					rules={{ required: 'Please select a language' }}
					_options={languageOptions}
					_required
				/>
				<KolSingleSelectController
					name="framework"
					control={control}
					_label="Favorite Framework"
					rules={{ required: 'Please select a framework' }}
					_options={frameworkOptions}
					_required
				/>
				<KolInputRadioController
					name="gender"
					control={control}
					_label="Gender"
					rules={{ required: 'Please select your gender' }}
					_options={genderOptions}
					_required
				/>
				<KolInputCheckboxController
					name="termsAccepted"
					control={control}
					_label="I accept the terms and conditions"
					rules={{ required: 'You must accept the terms' }}
					_required
				/>

				<KolButton _label="Submit" _type="submit" />
			</form>
		</>
	);
};
