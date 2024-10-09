import * as React from 'react';
import { FastField, type FastFieldProps, type FormikProps } from 'formik';
import { InputCheckboxControl, type InputCheckboxControlProps } from '../../formik-fields';
import type { CoreFormFieldProps } from '../_types';
import { useCompleteFormikNameBuilder } from '../../../providers/FormikNamespaceProvider';

export type InputCheckboxFormFieldProps = InputCheckboxControlProps & CoreFormFieldProps;

function InputCheckboxFormField<T extends Record<string, unknown>, V extends boolean>(
	props: InputCheckboxFormFieldProps,
	ref: React.ForwardedRef<HTMLKolInputCheckboxElement>,
) {
	const { name: initialName, ...other } = props;
	const name = useCompleteFormikNameBuilder(initialName);

	return (
		<FastField name={name}>
			{({ field, form, meta: { error, touched, value } }: FastFieldProps<T>) => {
				return (
					<InputCheckboxControl
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

export default React.forwardRef(InputCheckboxFormField);
