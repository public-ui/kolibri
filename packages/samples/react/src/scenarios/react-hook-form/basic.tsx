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
import { KolButton } from '@public-ui/react-v19';

import { SampleDescription } from '../../components/SampleDescription';
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
	language: 'de',
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

const allFields: Array<keyof FormData> = [
	'firstName',
	'lastName',
	'email',
	'password',
	'age',
	'volume',
	'birthday',
	'favoriteColor',
	'cv',
	'bio',
	'country',
	'language',
	'framework',
	'gender',
	'termsAccepted',
];

export const RHFBasic: FC = () => {
	const { control, handleSubmit, setValue, getValues, trigger } = useForm<FormData>({
		defaultValues,
		mode: 'onTouched',
		shouldFocusError: true,
	});

	// Cast control to any to work around TypeScript generic compatibility issues with KoliBri adapters
	const adaptedControl = control as any;

	const touchAndValidateAll = () => {
		allFields.forEach((name) => {
			setValue(name, getValues(name), { shouldTouch: true, shouldValidate: true });
		});
	};

	const onSubmit: SubmitHandler<FormData> = (data) => {
		alert(JSON.stringify(data, null, 2));
	};

	const onError = (errors: FieldErrors<FormData>) => {
		touchAndValidateAll();
		void trigger(undefined, { shouldFocus: true });

		console.warn('Validation errors:', errors);
	};

	return (
		<>
			<SampleDescription>
				<p>This sample demonstrates a form using React Hook Form with KoliBri adapters. All inputs are validated, and error messages are shown on submit.</p>
			</SampleDescription>

			<form onSubmit={handleSubmit(onSubmit, onError)} className="grid gap-4 w-full max-w-xl">
				<KolInputTextController name="firstName" control={adaptedControl} _label="First Name" rules={{ required: 'First name is required' }} _required />
				<KolInputTextController name="lastName" control={adaptedControl} _label="Last Name" rules={{ required: 'Last name is required' }} _required />
				<KolInputEmailController name="email" control={adaptedControl} _label="Email" rules={{ required: 'Email is required' }} _required />
				<KolInputPasswordController name="password" control={adaptedControl} _label="Password" rules={{ required: 'Password is required' }} _required />
				<KolInputNumberController name="age" control={adaptedControl} _label="Age" rules={{ required: 'Age is required', min: 0 }} _required />
				<KolInputRangeController name="volume" control={adaptedControl} _label="Volume (0–100)" _min={0} _max={100} />
				<KolInputDateController name="birthday" control={adaptedControl} _label="Birthday" rules={{ required: 'Birthday is required' }} />
				<KolInputColorController name="favoriteColor" control={adaptedControl} _label="Favorite Color" id="favoriteColor" />
				<KolInputFileController name="cv" control={adaptedControl} _label="Upload CV" rules={{ required: 'Please upload your CV' }} _required />
				<KolTextareaController name="bio" control={adaptedControl} _label="Bio" rules={{ required: 'Please provide a short bio' }} _required />
				<KolComboboxController
					control={adaptedControl}
					rules={{ required: 'Please select a country' }}
					name="country"
					_label="Country"
					_suggestions={COUNTRY_SUGGESTIONS}
					_required
				/>
				<KolSelectController
					control={adaptedControl}
					rules={{ required: 'Please select a language' }}
					name="language"
					_label="Preferred Language"
					_options={languageOptions}
					_required
				/>
				<KolSingleSelectController
					rules={{ required: 'Please select a framework' }}
					control={adaptedControl}
					name="framework"
					_label="Favorite Framework"
					_options={frameworkOptions}
					_required
				/>
				<KolInputRadioController
					control={adaptedControl}
					rules={{ required: 'Please select your gender' }}
					name="gender"
					_label="Gender"
					_options={genderOptions}
					_required
				/>
				<KolInputCheckboxController
					name="termsAccepted"
					control={adaptedControl}
					_label="I accept the terms and conditions"
					rules={{ required: 'You must accept the terms' }}
					_required
				/>

				<KolButton _label="Submit" _type="submit" />
			</form>
		</>
	);
};
