import type { FC } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { KolInputTextController } from '@public-ui/react-hook-form-adapter';
import { KolButton } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const RHFBasic: FC = () => {
	const { control, handleSubmit } = useForm({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
		},
	});

	const onSubmit = (data: any) => {
		alert(JSON.stringify(data, null, 2));
	};

	return (
		<>
			<SampleDescription>
				<p>This sample demonstrates a form using React Hook Form with KoliBri adapters.</p>
			</SampleDescription>

			<form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 w-full">
				<KolInputTextController name="firstName" control={control} _label="First Name" rules={{ required: 'First name is required' }} />
				<KolInputTextController name="lastName" control={control} _label="Last Name" rules={{ required: 'Last name is required' }} />

				<KolButton _label="Submit" _type="submit" />
			</form>
		</>
	);
};
