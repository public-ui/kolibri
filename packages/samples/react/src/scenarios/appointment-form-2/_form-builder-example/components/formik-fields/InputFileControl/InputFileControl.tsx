import * as React from 'react';
import { KolInputFile } from '@public-ui/react';
import type { InputTypeOnDefault } from '@public-ui/components';
import { useFieldIdBuilder, useFieldMsgBuilder, useFormikControlEventHandler } from '../../../hooks';
import type { GenericFormikInputControlProps } from '../_types';

export type InputFileControlProps = {
	label: string;
	required?: boolean;
};

function InputFileControl<T extends Record<string, unknown>, V extends FileList>(
	props: GenericFormikInputControlProps<T, V> & InputFileControlProps,
	ref: React.ForwardedRef<HTMLKolInputFileElement>,
) {
	const { field, form, error, label, value: initialValue, touched, required } = props;
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
