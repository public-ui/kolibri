import * as React from 'react';
import type { FieldArrayRenderProps } from 'formik';

const FormikArrayHelperContext = React.createContext<FieldArrayRenderProps>({} as FieldArrayRenderProps);

export function useFormikArrayHelper(): FieldArrayRenderProps {
	const ctx = React.useContext(FormikArrayHelperContext);
	return ctx;
}

function FormikArrayHelperProvider({ helper, children }: React.PropsWithChildren<{ helper: FieldArrayRenderProps }>) {
	return <FormikArrayHelperContext.Provider value={helper}>{children}</FormikArrayHelperContext.Provider>;
}

export default FormikArrayHelperProvider;
