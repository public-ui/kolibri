import * as React from 'react';

type FormikNamespaceContextType = {
	namespace: string;
	setNamespace: (namespace: string) => void;
};

const FormikNamespaceContext = React.createContext<FormikNamespaceContextType>({ namespace: '', setNamespace: (_: string) => {} });

function useFormikNamespace(): FormikNamespaceContextType {
	const ctx = React.useContext(FormikNamespaceContext);
	return ctx;
}

export function useCompleteFormikNameBuilder(name = ''): string {
	const ctx = useFormikNamespace();

	if (!ctx?.namespace) {
		return name;
	}

	if (!name) {
		return ctx.namespace;
	}

	return [ctx.namespace, name].join('.');
}

function FormikNamespaceProvider({ children, namespace: initialNamespace }: React.PropsWithChildren<{ namespace: string }>) {
	const completeNamespace = useCompleteFormikNameBuilder(initialNamespace);
	const [namespace, setNamespace] = React.useState(completeNamespace);

	React.useLayoutEffect(() => {
		setNamespace(completeNamespace);
	}, [completeNamespace]);

	return <FormikNamespaceContext.Provider value={{ namespace, setNamespace }}>{children}</FormikNamespaceContext.Provider>;
}

export default FormikNamespaceProvider;
