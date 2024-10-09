import * as React from 'react';
import { FastField, type FastFieldProps, type FormikProps } from 'formik';
import { InputNumberControl, type InputNumberControlProps } from '../../formik-fields';
import type { CoreFormFieldProps } from '../_types';
import { useCompleteFormikNameBuilder } from '../../../providers/FormikNamespaceProvider';

export type InputNumberFormFieldProps<V> = InputNumberControlProps<V> & CoreFormFieldProps;

function InputNumberFormField<T extends Record<string, unknown>, V extends number>(
	props: InputNumberFormFieldProps<V>,
	ref: React.ForwardedRef<HTMLKolInputNumberElement>,
) {
	const { name: initialName, ...other } = props;
	const name = useCompleteFormikNameBuilder(initialName);

	return (
		<FastField name={name}>
			{({ field, form, meta: { error, touched, value } }: FastFieldProps<T>) => {
				return (
					<InputNumberControl
						ref={ref}
						field={field}
						form={form as FormikProps<Record<string, unknown>>}
						error={error}
						touched={touched}
						value={value as unknown as number}
						{...other}
					/>
				);
			}}
		</FastField>
	);
}

export default React.forwardRef(InputNumberFormField);
