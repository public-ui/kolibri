import * as React from 'react';
import StackSection, { type StackSectionProps } from '../StackSection';

export type FieldsetSectionProps = StackSectionProps & { label: string };

function FieldsetSection({ label, ...other }: FieldsetSectionProps, ref: React.ForwardedRef<HTMLFieldSetElement>) {
	return (
		<fieldset ref={ref}>
			<legend>{label}</legend>
			<StackSection {...other} />
		</fieldset>
	);
}

export default React.forwardRef(FieldsetSection);
