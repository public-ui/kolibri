import * as React from 'react';
import { FastField, type FastFieldProps, type FormikProps } from 'formik';
import { InputFileControl, type InputFileControlProps } from '../../formik-fields';
import type { CoreFormFieldProps } from '../_types';
import { useCompleteFormikNameBuilder } from '../../../providers/FormikNamespaceProvider';

export type InputFileFormFieldProps = InputFileControlProps & CoreFormFieldProps;

function InputFileFormField<T extends Record<string, unknown>, V extends FileList>(
	props: InputFileFormFieldProps,
	ref: React.ForwardedRef<HTMLKolInputFileElement>,
) {
	const { name: initialName, ...other } = props;
	const name = useCompleteFormikNameBuilder(initialName);

	return (
		<FastField name={name}>
			{({ field, form, meta: { error, touched, value } }: FastFieldProps<T>) => {
				return (
					<InputFileControl
						ref={ref}
						field={field}
						form={form as FormikProps<Record<string, unknown>>}
						error={error}
						touched={touched}
						value={value as unknown as V}
						{...other}
					/>
				);
			}}
		</FastField>
	);
}

export default React.forwardRef(InputFileFormField);
