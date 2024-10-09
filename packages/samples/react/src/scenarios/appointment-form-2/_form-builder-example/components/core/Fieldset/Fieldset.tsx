import * as React from 'react';

function Fieldset({ label, children, onBlur }: React.PropsWithChildren<{ label: string; onBlur: () => void }>, ref: React.ForwardedRef<HTMLFieldSetElement>) {
	return (
		<fieldset ref={ref} onBlur={onBlur}>
			<legend>{label}</legend>
			{children}
		</fieldset>
	);
}

export default React.forwardRef(Fieldset);
