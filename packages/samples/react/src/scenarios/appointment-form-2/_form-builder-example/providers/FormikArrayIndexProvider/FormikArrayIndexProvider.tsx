import * as React from 'react';

type FormikArrayIndexContextType = {
	index: number;
	setIndex: (index: number) => void;
};

const FormikArrayIndexContext = React.createContext<FormikArrayIndexContextType>({ index: -1, setIndex: (_: number) => {} });

export function useFormikArrayIndex(): number {
	const ctx = React.useContext(FormikArrayIndexContext);
	return ctx ? ctx.index : -1;
}

function FormikArrayIndexProvider({ children, index: initialIndex }: React.PropsWithChildren<{ index: number }>) {
	const [index, setIndex] = React.useState(initialIndex);

	React.useLayoutEffect(() => {
		setIndex(initialIndex);
	}, [initialIndex]);

	return <FormikArrayIndexContext.Provider value={{ index, setIndex }}>{children}</FormikArrayIndexContext.Provider>;
}

export default FormikArrayIndexProvider;
