import * as React from 'react';
import type { FieldInputProps, FormikProps } from 'formik';
import { KolInputRange } from '@public-ui/react';
import type { InputTypeOnDefault } from '@public-ui/components';
import { useFieldIdBuilder, useFieldMsgBuilder, useFormikControlEventHandler } from '../../../hooks';

export type InputRangeControlProps<T> = {
	field: FieldInputProps<T>;
	form: FormikProps<T>;
	error?: string;
	label: string;
	value: number;
	min?: number;
	max?: number;
	touched?: boolean;
	required?: boolean;
};

function InputRangeControl<T extends Record<string, unknown>>(
	{ field, form, error, label, value: initialValue, min, max, touched /*, required */ }: InputRangeControlProps<T>,
	ref: React.ForwardedRef<HTMLKolInputRangeElement>,
) {
	const { _on, value } = useFormikControlEventHandler<T, number>({ value: initialValue, field, form });
	const { buildFieldId } = useFieldIdBuilder();
	const { buildFieldMsg } = useFieldMsgBuilder();

	return (
		<KolInputRange
			ref={ref}
			id={buildFieldId(field.name)}
			_msg={buildFieldMsg(error || '')}
			_name={field.name}
			_touched={touched}
			_label={label}
			_value={value as unknown as number}
			_min={min}
			_max={max}
			_on={_on as InputTypeOnDefault}
		/>
	);
}

export default React.forwardRef(InputRangeControl);
