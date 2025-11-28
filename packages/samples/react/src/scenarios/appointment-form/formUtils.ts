import type { ErrorListPropType } from '@public-ui/components';
import type { FieldErrors, Path, UseFormGetValues, UseFormSetValue } from 'react-hook-form';

export function createErrorList<TFieldValues extends Record<string, unknown>>(
	errors: FieldErrors<TFieldValues>,
	fields?: Array<Path<TFieldValues>>,
): ErrorListPropType[] {
	const entries: Array<[Path<TFieldValues>, FieldErrors<TFieldValues>[Path<TFieldValues>]]> | Array<[string, FieldErrors<TFieldValues>[string]]> =
		fields?.map((field) => [field, errors[field]]) ?? (Object.entries(errors) as Array<[string, FieldErrors<TFieldValues>[string]]>);

	return entries
		.map(([fieldName, error]) => ({
			message: typeof error === 'object' && error ? String('message' in error ? error.message : '') : '',
			selector: `#field-${String(fieldName)}`,
		}))
		.filter(({ message }) => Boolean(message));
}

export function focusErrorList(formRef: React.RefObject<HTMLKolFormElement | null>) {
	formRef.current?.focusErrorList().catch(console.warn);
}

export function touchFields<TFieldValues extends Record<string, unknown>>(
	fields: Array<Path<TFieldValues>>,
	getValues: UseFormGetValues<TFieldValues>,
	setValue: UseFormSetValue<TFieldValues>,
): void {
	fields.forEach((name) => {
		setValue(name, getValues(name), { shouldTouch: true });
	});
}
