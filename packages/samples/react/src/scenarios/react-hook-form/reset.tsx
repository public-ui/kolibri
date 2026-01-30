import { KolSelectController, KolTextareaController } from '@public-ui/react-hook-form-adapter';
import { KolButton, KolForm } from '@public-ui/react-v19';
import React, { type BaseSyntheticEvent, type FC } from 'react';
import type { FieldErrors, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { SampleDescription } from '../../components/SampleDescription';
import { COUNTRY_OPTIONS } from '../../shares/country';

interface FormData {
	firstName: string | null;
	bio: string | null;
	country: string;
}

const defaultValues: FormData = {
	firstName: null,
	bio: null,
	country: '',
};

const allFields: Array<keyof FormData> = ['firstName', 'bio', 'country'];

export const RHFReset: FC = () => {
	const { control, handleSubmit, setValue, getValues, trigger } = useForm<FormData>({
		defaultValues,
		mode: 'onTouched',
		shouldFocusError: true,
	});

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
				<p>
					This sample demonstrates a form using React Hook Form with KoliBri adapters wrapped in a KolForm. All inputs are validated, and error messages are
					shown on submit.
				</p>
			</SampleDescription>

			<KolForm
				className="w-full max-w-xl"
				_on={{
					onSubmit: (event) => {
						void handleSubmit(onSubmit, onError)(event as unknown as BaseSyntheticEvent);
					},
					onReset: () => {
						console.log('reset');

						setValue('firstName', '');
						setValue('bio', null);
					},
				}}
			>
				<div className="grid gap-4">
					<KolTextareaController name="firstName" control={control} _label="First Name" rules={{ required: 'First name is required' }} _required />
					<KolTextareaController name="bio" control={control} _label="Bio" rules={{ required: 'Please provide a short bio' }} _required />
					<KolSelectController
						name="country"
						control={control}
						_options={[
							{
								label: ' ',
								value: '',
							},
							...COUNTRY_OPTIONS,
						]}
						_label="Multiple Select"
						_required
						_touched
					/>

					<KolButton _label="Clear" _type="reset" _variant="secondary" />
					<KolButton _label="Submit" _type="submit" />
				</div>
			</KolForm>
		</>
	);
};
