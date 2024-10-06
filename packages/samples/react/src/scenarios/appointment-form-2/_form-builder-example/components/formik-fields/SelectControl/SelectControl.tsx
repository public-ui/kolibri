import * as React from 'react';
import type { FieldInputProps, FormikProps } from 'formik';
import { KolSingleSelect } from '@public-ui/react';
import type { InputTypeOnDefault } from '@public-ui/components';
import { useFieldIdBuilder, useFieldMsgBuilder, useFormikControlEventHandler } from '../../../hooks';

const PleaseOption = { label: 'Please select…', value: '' };

export type SelectControlProps<T, V> = {
	field: FieldInputProps<T>;
	form: FormikProps<T>;
	error?: string;
	options: { value: number | string; label: string }[];
	label: string;
	value: V;
	touched?: boolean;
	required?: boolean;
};

function SelectControl<T extends Record<string, unknown>, V extends string>(
	{ field, form, error, options = [], label, value: initialValue, touched, required }: SelectControlProps<T, V>,
	ref: React.ForwardedRef<HTMLKolSingleSelectElement>,
) {
	const { _on, value } = useFormikControlEventHandler<T, V>({ value: initialValue, field, form });
	const { buildFieldId } = useFieldIdBuilder();
	const { buildFieldMsg } = useFieldMsgBuilder();

	return (
		<KolSingleSelect
			ref={ref}
			id={buildFieldId(field.name)}
			_msg={buildFieldMsg(error || '')}
			_name={field.name}
			_touched={touched}
			_label={label}
			_value={value}
			_required={required}
			_options={[PleaseOption, ...options]}
			_on={_on as InputTypeOnDefault}
		/>
	);
}

export default React.forwardRef(SelectControl);
