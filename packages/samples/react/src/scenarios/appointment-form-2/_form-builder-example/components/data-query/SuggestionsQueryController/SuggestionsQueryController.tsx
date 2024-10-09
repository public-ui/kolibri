import * as React from 'react';
import { useFormikContext } from 'formik';
import { useQuery } from '../../../providers/DataQueryProvider';

function SuggestionsQueryController<T extends Record<string, unknown>>({ children, queryKey }: { children: JSX.Element; queryKey: string }) {
	const form = useFormikContext<T>();
	const { data } = useQuery<{ label: string }>(queryKey, form.values);

	if (!children) {
		return null;
	}

	return React.cloneElement(children, { suggestions: data.map(({ label }) => label) });
}

function SuggestionsQueryControllerWrapper({ children, queryKey }: { children: JSX.Element; queryKey: string }) {
	if (queryKey) {
		return <SuggestionsQueryController queryKey={queryKey}>{children}</SuggestionsQueryController>;
	}

	return children;
}

export default SuggestionsQueryControllerWrapper;
