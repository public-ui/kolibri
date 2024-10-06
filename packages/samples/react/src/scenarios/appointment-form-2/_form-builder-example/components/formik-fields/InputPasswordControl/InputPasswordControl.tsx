import * as React from 'react';
import type { FieldInputProps, FormikProps } from 'formik';
import { KolInputPassword } from '@public-ui/react';
import type { InputTypeOnDefault } from '@public-ui/components';
import { useFieldIdBuilder, useFieldMsgBuilder, useFormikControlEventHandler } from '../../../hooks';

export type InputPasswordControlProps<T, V> = {
	field: FieldInputProps<T>;
	form: FormikProps<T>;
	error?: string;
	label: string;
	value: V;
	touched?: boolean;
	required?: boolean;
};

function InputPasswordControl<T extends Record<string, unknown>, V extends string>(
	{ field, form, error, label, value: initialValue, touched, required }: InputPasswordControlProps<T, V>,
	ref: React.ForwardedRef<HTMLKolInputPasswordElement>,
) {
	const { _on, value } = useFormikControlEventHandler<T, V>({ value: initialValue, field, form });
	const { buildFieldId } = useFieldIdBuilder();
	const { buildFieldMsg } = useFieldMsgBuilder();

	return (
		<KolInputPassword
			ref={ref}
			id={buildFieldId(field.name)}
			_msg={buildFieldMsg(error || '')}
			_name={field.name}
			_touched={touched}
			_label={label}
			_value={value}
			_required={required}
			_on={_on as InputTypeOnDefault}
		/>
	);
}

export default React.forwardRef(InputPasswordControl);
