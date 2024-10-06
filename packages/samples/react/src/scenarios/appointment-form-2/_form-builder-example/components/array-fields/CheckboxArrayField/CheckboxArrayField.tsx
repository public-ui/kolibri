import * as React from 'react';
import { FastField, type FastFieldProps, type FormikProps } from 'formik';
import { InputCheckboxArrayControl } from '../../formik-array-fields';
import { OptionQueryController } from '../../data-query';

export type CheckboxArrayFormFieldProps = {
	name: string;
	label: string;
	required?: boolean;
	queryKey?: string;
	options?: ({ value: string; label: string } | string)[];
	orientation?: 'horizontal' | 'vertical';
	emptyValue?: unknown;
};

function CheckboxArrayFormField<T extends Record<string, unknown>>(props: CheckboxArrayFormFieldProps, ref: React.ForwardedRef<HTMLDivElement>) {
	const { name, options = [], queryKey = '', label, required, emptyValue } = props;

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
							label={label}
							value={value as unknown as string[]}
							required={required}
							options={options}
							emtpyValue={emptyValue}
						/>
					</OptionQueryController>
				);
			}}
		</FastField>
	);
}

export default React.forwardRef(CheckboxArrayFormField);
