import * as React from 'react';
import { KolInputEmail } from '@public-ui/react';
import type { InputTypeOnDefault } from '@public-ui/components';
import { useFieldIdBuilder, useFieldMsgBuilder, useFormikControlEventHandler } from '../../../hooks';
import type { GenericFormikInputControlProps } from '../_types';

export type InputEmailControlProps = {
	label: string;
	required?: boolean;
};

function InputEmailControl<T extends Record<string, unknown>, V extends string>(
	props: GenericFormikInputControlProps<T, V> & InputEmailControlProps,
	ref: React.ForwardedRef<HTMLKolInputEmailElement>,
) {
	const { field, form, error, label, value: initialValue, touched, required } = props;
	const { _on, value } = useFormikControlEventHandler<T, V>({ value: initialValue, field, form });
	const { buildFieldId } = useFieldIdBuilder();
	const { buildFieldMsg } = useFieldMsgBuilder();

	return (
		<KolInputEmail
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

export default React.forwardRef(InputEmailControl);
