import * as React from 'react';
import { FormBuilderService } from './FormBuilderService';

const FormBuilderContext = React.createContext(new FormBuilderService());

export type FormBuilderProviderProps = React.PropsWithChildren<{
	initialValue: unknown;
}>;

export function useFormBuilderService(): FormBuilderService {
	const context = React.useContext(FormBuilderContext);
	return context;
}

export function useValues<T>(): T {
	const ctx = useFormBuilderService();
	return ctx.values as T;
}

function FormBuilderProvider({ children, initialValue }: FormBuilderProviderProps) {
	const [service, setService] = React.useState(() => new FormBuilderService(initialValue));

	React.useLayoutEffect(() => {
		setService(new FormBuilderService(initialValue));
	}, [initialValue]);

	return <FormBuilderContext.Provider value={service}>{children}</FormBuilderContext.Provider>;
}

export default FormBuilderProvider;
