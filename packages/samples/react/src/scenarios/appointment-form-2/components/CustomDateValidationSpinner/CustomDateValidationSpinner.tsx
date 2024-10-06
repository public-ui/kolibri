import * as React from 'react';
import { useFormikContext } from 'formik';
import { KolSpin } from '@public-ui/react';
import type { FormValues } from '../../examples/appointment/form-values';

function CustomDateValidationSpinner() {
	const { values, isValidating } = useFormikContext<FormValues>();

	if (values.date && isValidating) {
		return <KolSpin _show aria-label="Date being checked." />;
	}

	return null;
}

export default CustomDateValidationSpinner;
