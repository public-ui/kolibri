import * as React from 'react';
import { type FieldInputProps, type FormikProps } from 'formik';
import { KolInputText } from '@public-ui/react';
import { type InputTypeOnDefault } from '@public-ui/components';
import { useFieldIdBuilder, useFieldMsgBuilder, useFormikControlEventHandler } from '../../../hooks';

export type InputTextControlProps<T, V> = {
	field: FieldInputProps<T>;
	form: FormikProps<T>;
	error?: string;
	label: string;
	value: V;
	touched?: boolean;
	required?: boolean;
};

function InputTextControl<T extends Record<string, unknown>, V extends string>(
	{ field, form, error, label, value: initialValue, touched, required }: InputTextControlProps<T, V>,
	ref: React.ForwardedRef<HTMLKolInputTextElement>,
) {
	const { _on, value } = useFormikControlEventHandler<T, V>({ value: initialValue, field, form });
	const { buildFieldId } = useFieldIdBuilder();
	const { buildFieldMsg } = useFieldMsgBuilder();

	return (
		<KolInputText
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

export default React.forwardRef(InputTextControl);
