import * as React from 'react';
import { FastField, type FastFieldProps, type FormikProps } from 'formik';
import { TextareaControl, type TextareaControlProps } from '../../formik-fields';
import type { CoreFormFieldProps } from '../_types';
import { useCompleteFormikNameBuilder } from '../../../providers/FormikNamespaceProvider';

export type TextareaFormFieldProps = TextareaControlProps & CoreFormFieldProps;

function TextareaFormField<T extends Record<string, unknown>, V extends string>(
	props: TextareaFormFieldProps,
	ref: React.ForwardedRef<HTMLKolTextareaElement>,
) {
	const { name: initialName, ...other } = props;
	const name = useCompleteFormikNameBuilder(initialName);

	return (
		<FastField name={name}>
			{({ field, form, meta: { error, touched, value } }: FastFieldProps<T>) => {
				return (
					<TextareaControl
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

export default React.forwardRef(TextareaFormField);
