import { KolAlert, KolButton } from '@public-ui/react';
import React from 'react';

import type { FC } from 'react';

export const BackPage: FC = () => {
	const goBack = {
		onClick: () => history.back(),
	};

	return (
		<KolAlert _label="This is an example page" _level={0} _type="info">
			<p>You followed an example link.</p>
			{history.length > 1 && <KolButton _label="Go Back" _on={goBack} />}
		</KolAlert>
	);
};
