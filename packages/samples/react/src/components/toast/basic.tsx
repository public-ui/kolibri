import { ToasterService } from '@public-ui/components';
import { KolButton } from '@public-ui/react';
import React from 'react';

const toaster = ToasterService.getInstance(document);

import { FC } from 'react';

const handleButtonClick = () => {
	void toaster.enqueue({
		description: `Toasty`,
		label: `Initial Toast`,
		type: 'warning',
	});
};

export const ToastBasic: FC = () => (
	<div>
		<KolButton _label="Show toast" _on={{ onClick: handleButtonClick }}></KolButton>
	</div>
);
