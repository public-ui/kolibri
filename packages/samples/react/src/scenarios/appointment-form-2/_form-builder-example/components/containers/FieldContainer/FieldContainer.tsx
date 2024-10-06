import * as React from 'react';

function FieldContainer({ children }: React.PropsWithChildren, ref: React.ForwardedRef<HTMLDivElement>) {
	return (
		<div ref={ref} className="block w-full">
			{children}
		</div>
	);
}

export default React.forwardRef(FieldContainer);
