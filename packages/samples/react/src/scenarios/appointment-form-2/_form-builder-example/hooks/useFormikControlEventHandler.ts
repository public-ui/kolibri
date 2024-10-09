import * as React from 'react';
import type { FieldInputProps, FormikProps } from 'formik';

export function useFormikControlEventHandler<T, V>({ value, field, form }: { value: V; field: FieldInputProps<T>; form: FormikProps<T> }) {
	const [innerValue, setInnerValue] = React.useState<V | undefined>(value);

	React.useEffect(() => {
		if (value) {
			setInnerValue(value);
		} else {
			setInnerValue(undefined);
		}
	}, [value]);

	const handleOnBlur = React.useCallback(
		(_: Event) => {
			void form.setFieldTouched(field.name, true);
		},
		[field.name],
	);

	const handleOnChange = React.useCallback(
		(event: Event, newValue: V) => {
			if (event.target) {
				console.log('handleOnChange: ', field.name);
				void form.setFieldValue(field.name, newValue, true);
			}
		},
		[field.name],
	);

	return {
		value: innerValue,
		_on: {
			onChange: handleOnChange,
			onBlur: handleOnBlur,
		},
	};
}
