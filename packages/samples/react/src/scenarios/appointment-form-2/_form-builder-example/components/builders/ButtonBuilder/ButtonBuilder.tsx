import * as React from 'react';
import { NewArrayItemButton } from '../../buttons';
import RemoveArrayItemButton from '../../buttons/RemoveArrayItemButton';

function ButtonBuilder({ action }: { action: string }, ref: React.ForwardedRef<HTMLKolButtonElement>) {
	switch (action) {
		case 'formik-array-new-item':
			return <NewArrayItemButton ref={ref} />;
		case 'formik-array-remove-item':
			return <RemoveArrayItemButton ref={ref} />;
		default:
			return null;
	}
}

export default React.forwardRef(ButtonBuilder);
