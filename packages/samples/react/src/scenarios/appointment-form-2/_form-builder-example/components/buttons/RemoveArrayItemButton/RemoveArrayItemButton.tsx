import * as React from 'react';
import { KolButton } from '@public-ui/react';
import { useFormikArrayHelper } from '../../../providers/FormikArrayHelperProvider';
import { useFormikArrayIndex } from '../../../providers/FormikArrayIndexProvider';

function RemoveArrayItemButton(_: unknown, ref: React.ForwardedRef<HTMLKolButtonElement>) {
	const helper = useFormikArrayHelper();
	const index = useFormikArrayIndex();

	const handleOnClick = React.useCallback(() => {
		helper.remove(index);
	}, [index]);

	console.log('RemoveArrayItemButton: ', index);

	if (index < 0) {
		return null;
	}

	return <KolButton ref={ref} _label="Remove Item" _variant="danger" _on={{ onClick: handleOnClick }} />;
}

export default React.forwardRef(RemoveArrayItemButton);
