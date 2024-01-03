import { useEffect } from 'react';
import { ErrorListPropType } from '@public-ui/components';

export function createErrorList(formikErrors: Record<string, string>): ErrorListPropType[] {
	return Object.keys(formikErrors).map((fieldName) => ({
		message: formikErrors[fieldName],
		selector: `#field-${fieldName}`,
	}));
}

export function useFocusErrorField(errorList: ErrorListPropType[]) {
	useEffect(() => {
		if (errorList.length > 0) {
			const errorListElement = document.querySelector(errorList[0].selector) as HTMLElement;
			if (errorListElement) {
				errorListElement.focus();
			}
		}
	}, [errorList]);
}
