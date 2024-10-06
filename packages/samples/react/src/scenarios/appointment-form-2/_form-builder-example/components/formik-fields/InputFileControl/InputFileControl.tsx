import * as React from 'react';
import type { FieldInputProps, FormikProps } from 'formik';
import { KolInputFile } from '@public-ui/react';
import type { InputTypeOnDefault } from '@public-ui/components';
import { useFieldIdBuilder, useFieldMsgBuilder, useFormikControlEventHandler } from '../../../hooks';

export type InputFileControlProps<T, V> = {
	field: FieldInputProps<T>;
	form: FormikProps<T>;
	error?: string;
	label: string;
	value: V;
	touched?: boolean;
	required?: boolean;
};

function InputFileControl<T extends Record<string, unknown>, V extends FileList>(
	{ field, form, error, label, value: initialValue, touched, required }: InputFileControlProps<T, V>,
	ref: React.ForwardedRef<HTMLKolInputFileElement>,
) {
	const { _on, value } = useFormikControlEventHandler<T, V>({ value: initialValue, field, form });
	const { buildFieldId } = useFieldIdBuilder();
	const { buildFieldMsg } = useFieldMsgBuilder();

	return (
		<KolInputFile
			ref={ref}
			id={buildFieldId(field.name)}
			_msg={buildFieldMsg(error || '')}
			_name={field.name}
			_touched={touched}
			_label={label}
			_value={value as unknown as string}
			_required={required}
			_on={_on as InputTypeOnDefault}
		/>
	);
}

export default React.forwardRef(InputFileControl);
