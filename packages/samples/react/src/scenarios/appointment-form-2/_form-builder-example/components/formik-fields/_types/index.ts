import { type FieldInputProps, type FormikProps } from 'formik';

export type GenericFormikInputControlProps<T, V> = {
	field: FieldInputProps<T>;
	form: FormikProps<T>;
	error?: string;
	touched?: boolean;
	value: V;
};
