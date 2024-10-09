import * as React from 'react';
import { FastField, type FastFieldProps, type FormikProps } from 'formik';
import { InputCheckboxArrayControl, type InputCheckboxArrayControlProps } from '../../formik-fields';
import { OptionQueryController } from '../../data-query';
import { useCompleteFormikNameBuilder } from '../../../providers/FormikNamespaceProvider';

export type CheckboxArrayFormFieldProps = InputCheckboxArrayControlProps & {
	name: string;
	queryKey?: string;
};

function CheckboxArrayFormField<T extends Record<string, unknown>>(props: CheckboxArrayFormFieldProps, ref: React.ForwardedRef<HTMLFieldSetElement>) {
	const { name: initialNamespace, queryKey = '', ...other } = props;
	const name = useCompleteFormikNameBuilder(initialNamespace);

	return (
		<FastField name={name}>
			{({ field, form, meta: { error, touched, value } }: FastFieldProps<T>) => {
				return (
					<OptionQueryController queryKey={queryKey}>
						<InputCheckboxArrayControl
							ref={ref}
							field={field}
							form={form as FormikProps<Record<string, unknown>>}
							error={error}
							touched={touched}
							value={value as unknown as string[]}
							{...other}
						/>
					</OptionQueryController>
				);
			}}
		</FastField>
	);
}

export default React.forwardRef(CheckboxArrayFormField);
