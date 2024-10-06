import * as React from 'react';
import { FastField, type FastFieldProps, type FormikProps } from 'formik';
import { RadioSelectControl } from '../../formik-fields';
import { OptionQueryController } from '../../data-query';

export type RadioSelectFormFieldProps = {
	name: string;
	label: string;
	required?: boolean;
	queryKey?: string;
	options?: { value: number | string; label: string }[];
	orientation?: 'horizontal' | 'vertical';
};

function RadioSelectFormField<T extends Record<string, unknown>, V extends string | number>(
	props: RadioSelectFormFieldProps,
	ref: React.ForwardedRef<HTMLKolInputRadioElement>,
) {
	const { name, orientation, options = [], queryKey = '', label, required } = props;

	return (
		<FastField name={name}>
			{({ field, form, meta: { error, touched, value } }: FastFieldProps<T>) => {
				return (
					<OptionQueryController queryKey={queryKey}>
						<RadioSelectControl
							ref={ref}
							field={field}
							form={form as FormikProps<Record<string, unknown>>}
							error={error}
							touched={touched}
							label={label}
							value={value as unknown as V}
							required={required}
							options={options}
							orientation={orientation}
						/>
					</OptionQueryController>
				);
			}}
		</FastField>
	);
}

export default React.forwardRef(RadioSelectFormField);
