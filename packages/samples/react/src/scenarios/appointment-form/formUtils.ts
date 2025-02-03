import type { ErrorListPropType } from '@public-ui/components';

export function createErrorList(formikErrors: Record<string, string>): ErrorListPropType[] {
	return Object.keys(formikErrors).map((fieldName) => ({
		message: formikErrors[fieldName],
		selector: `#field-${fieldName}`,
	}));
}

export function focusErrorList(formikRef: React.RefObject<HTMLKolFormElement>) {
	formikRef.current?.focusErrorList().catch(console.warn);
}
