import * as React from 'react';
import { KolButton } from '@public-ui/react';
import { useFormikArrayHelper } from '../../../providers/FormikArrayHelperProvider';

function NewArrayItemButton(_: unknown, ref: React.ForwardedRef<HTMLKolButtonElement>) {
	const helper = useFormikArrayHelper();

	const handleOnClick = React.useCallback(() => {
		helper.push({});
	}, []);

	return <KolButton ref={ref} _label="New Item" _on={{ onClick: handleOnClick }} />;
}

export default React.forwardRef(NewArrayItemButton);
