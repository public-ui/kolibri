import * as React from 'react';
import type { FieldInputProps, FormikProps } from 'formik';
import { KolInputColor } from '@public-ui/react';
import type { InputTypeOnDefault } from '@public-ui/components';
import { useFieldIdBuilder, useFieldMsgBuilder, useFormikControlEventHandler } from '../../../hooks';

export type InputColorControlProps<T, V> = {
	field: FieldInputProps<T>;
	form: FormikProps<T>;
	error?: string;
	label: string;
	value: V;
	touched?: boolean;
	required?: boolean;
};

function InputColorControl<T extends Record<string, unknown>, V extends string>(
	{ field, form, error, label, value: initialValue, touched /*, required */ }: InputColorControlProps<T, V>,
	ref: React.ForwardedRef<HTMLKolInputColorElement>,
) {
	const { _on, value } = useFormikControlEventHandler<T, V>({ value: initialValue, field, form });
	const { buildFieldId } = useFieldIdBuilder();
	const { buildFieldMsg } = useFieldMsgBuilder();

	return (
		<KolInputColor
			ref={ref}
			id={buildFieldId(field.name)}
			_msg={buildFieldMsg(error || '')}
			_name={field.name}
			_touched={touched}
			_label={label}
			_value={value}
			_on={_on as InputTypeOnDefault}
		/>
	);
}

export default React.forwardRef(InputColorControl);
