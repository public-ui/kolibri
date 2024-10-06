import * as React from 'react';
import { useFormikContext } from 'formik';
import type { FieldDefinition } from '../../../types';
import StackSection from '../StackSection';

export type ConditionalSectionProps = {
	name: string;
	conditionalValue?: unknown;

	fields: FieldDefinition[];
};

function ConditionalSection<T extends Record<string, unknown>>(props: ConditionalSectionProps, ref: React.ForwardedRef<HTMLDivElement>) {
	const { name, conditionalValue, fields } = props;
	const form = useFormikContext<T>();

	if (!form.values[name]) {
		return null;
	}

	if (!conditionalValue) {
		return <StackSection ref={ref} fields={fields} />;
	}

	if (conditionalValue && form.values[name] === conditionalValue) {
		return <StackSection ref={ref} fields={fields} />;
	}

	return null;
}

export default React.forwardRef(ConditionalSection);
