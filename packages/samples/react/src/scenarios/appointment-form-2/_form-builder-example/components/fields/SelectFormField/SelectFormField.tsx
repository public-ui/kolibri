import * as React from 'react';
import { FastField, type FastFieldProps, type FormikProps } from 'formik';
import { SelectControl } from '../../formik-fields';
import { OptionQueryController } from '../../data-query';

export type SelectFormFieldProps = {
	name: string;
	label: string;
	required?: boolean;
	queryKey?: string;
	options?: { value: number | string; label: string }[];
};

function SelectFormField<T extends Record<string, unknown>, V extends string>(
	props: SelectFormFieldProps,
	ref: React.ForwardedRef<HTMLKolSingleSelectElement>,
) {
	const { name, options = [], queryKey = '', label, required } = props;

	return (
		<FastField name={name}>
			{({ field, form, meta: { error, touched, value } }: FastFieldProps<T>) => {
				return (
					<OptionQueryController queryKey={queryKey}>
						<SelectControl
							ref={ref}
							field={field}
							form={form as FormikProps<Record<string, unknown>>}
							error={error}
							touched={touched}
							label={label}
							value={value as unknown as V}
							required={required}
							options={options}
						/>
					</OptionQueryController>
				);
			}}
		</FastField>
	);
}

export default React.forwardRef(SelectFormField);
