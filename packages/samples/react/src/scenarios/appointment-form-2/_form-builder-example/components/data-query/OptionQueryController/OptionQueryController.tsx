import * as React from 'react';
import { useFormikContext } from 'formik';
import { useQuery } from '../../../providers/DataQueryProvider';

function OptionQueryController<T extends Record<string, unknown>>({ children, queryKey }: { children: JSX.Element; queryKey: string }) {
	const form = useFormikContext<T>();
	const { isPending, data } = useQuery<{ value: string | number; label: string }>(queryKey, form.values);

	if (!children) {
		return null;
	}

	return React.cloneElement(children, { isPending, options: data });
}

function OptionQueryControllerWrapper({ children, queryKey }: { children: JSX.Element; queryKey: string }) {
	if (queryKey) {
		return <OptionQueryController queryKey={queryKey}>{children}</OptionQueryController>;
	}

	return children;
}

export default OptionQueryControllerWrapper;
