import * as React from 'react';
import { FastField, type FastFieldProps, type FormikProps } from 'formik';
import { InputEmailControl, type InputEmailControlProps } from '../../formik-fields';
import type { CoreFormFieldProps } from '../_types';
import { useCompleteFormikNameBuilder } from '../../../providers/FormikNamespaceProvider';

export type InputEmailFormFieldProps = InputEmailControlProps & CoreFormFieldProps;

function InputEmailFormField<T extends Record<string, unknown>, V extends string>(
	props: InputEmailFormFieldProps,
	ref: React.ForwardedRef<HTMLKolInputEmailElement>,
) {
	const { name: initialName, ...other } = props;
	const name = useCompleteFormikNameBuilder(initialName);

	return (
		<FastField name={name}>
			{({ field, form, meta: { error, touched, value } }: FastFieldProps<T>) => {
				return (
					<InputEmailControl
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

export default React.forwardRef(InputEmailFormField);
