import { KolInputTextController } from '@public-ui/react-hook-form-adapter';
import { KolButton, KolForm } from '@public-ui/react-v19';
import React, { type BaseSyntheticEvent, type FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { SampleDescription } from '../../components/SampleDescription';

interface FormData {
	first: string;
	second: string;
}

const defaultValues: FormData = {
	first: '',
	second: '',
};

export const RHFDisabled: FC = () => {
	const { control, handleSubmit, watch } = useForm<FormData>({
		defaultValues,
	});

	const onSubmit: SubmitHandler<FormData> = (data) => {
		alert(JSON.stringify(data, null, 2));
	};

	return (
		<>
			<SampleDescription>
				<p>This sample shows two fields of which just one can be filled. The other gets disabled.</p>
			</SampleDescription>

			<KolForm
				className="w-full max-w-xl"
				_on={{
					onSubmit: (event) => {
						void handleSubmit(onSubmit)(event as unknown as BaseSyntheticEvent);
					},
				}}
			>
				<div className="grid gap-4">
					<KolInputTextController name="first" control={control} _label="First" _disabled={!!watch('second')} />

					<KolInputTextController name="second" control={control} _label="Second" _disabled={!!watch('first')} />

					<KolButton _label="Submit" _type="submit" />
				</div>
			</KolForm>
		</>
	);
};
