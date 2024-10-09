import * as React from 'react';
import { KolInputCheckbox } from '@public-ui/react';
import { type InputTypeOnDefault } from '@public-ui/components';
import { useFieldIdBuilder, useFieldMsgBuilder } from '../../../hooks';
import type { GenericFormikInputControlProps } from '../_types';

export type InputCheckboxControlProps = {
	label: string;
	required?: boolean;
	trueValue?: unknown;
	falseValue?: unknown;
};

function InputCheckboxControl<T extends Record<string, unknown>, V extends boolean>(
	props: GenericFormikInputControlProps<T, V> & InputCheckboxControlProps,
	ref: React.ForwardedRef<HTMLKolInputRadioElement>,
) {
	const { field, form, error, label, value, trueValue = true, falseValue = false, touched, required } = props;
	const { buildFieldId } = useFieldIdBuilder();
	const { buildFieldMsg } = useFieldMsgBuilder();

	const handleOnBlur = React.useCallback(
		(_: Event) => {
			void form.setFieldTouched(field.name, true);
		},
		[field.name],
	);

	const handleOnChange = React.useCallback(
		(event: Event) => {
			if (event.target) {
				const isChecked = (event.target as { checked?: boolean }).checked;
				void form.setFieldValue(field.name, isChecked ? trueValue : falseValue, true);
			}
		},
		[field.name, trueValue, falseValue],
	);

	let checked = value === trueValue;

	if (typeof trueValue === 'object') {
		checked = value && typeof value === 'object';
	}

	return (
		<KolInputCheckbox
			ref={ref}
			id={buildFieldId(field.name)}
			_msg={buildFieldMsg(error || '')}
			_name={field.name}
			_touched={touched}
			_label={label}
			_checked={checked}
			_required={required}
			_on={
				{
					onBlur: handleOnBlur,
					onChange: handleOnChange,
				} as InputTypeOnDefault
			}
		/>
	);
}

export default React.forwardRef(InputCheckboxControl);
