import * as React from 'react';
import type { FieldInputProps, FormikProps } from 'formik';
import { KolInputDate } from '@public-ui/react';
import type { InputTypeOnDefault, Iso8601 } from '@public-ui/components';
import { useFieldIdBuilder, useFieldMsgBuilder, useFormikControlEventHandler } from '../../../hooks';

export type InputDateControlProps<T, V> = {
	field: FieldInputProps<T>;
	form: FormikProps<T>;
	error?: string;
	label: string;
	value: V;
	min?: V;
	max?: V;
	touched?: boolean;
	required?: boolean;
};

function InputDateControl<T extends Record<string, unknown>, V extends Iso8601 | Date>(
	{ field, form, error, label, value: initialValue, min, max, touched, required }: InputDateControlProps<T, V>,
	ref: React.ForwardedRef<HTMLKolInputDateElement>,
) {
	const { _on, value } = useFormikControlEventHandler<T, V>({ value: initialValue, field, form });
	const { buildFieldId } = useFieldIdBuilder();
	const { buildFieldMsg } = useFieldMsgBuilder();

	return (
		<KolInputDate
			ref={ref}
			id={buildFieldId(field.name)}
			_msg={buildFieldMsg(error || '')}
			_name={field.name}
			_touched={touched}
			_label={label}
			_value={value}
			_min={min}
			_max={max}
			_required={required}
			_on={_on as InputTypeOnDefault}
		/>
	);
}

export default React.forwardRef(InputDateControl);
