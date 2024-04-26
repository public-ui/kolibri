import type { FC } from 'react';
import React, { useEffect, useRef } from 'react';

import { SampleDescription } from '../components/SampleDescription';
import { ToasterService } from '@public-ui/components';

export const DialogOnToast: FC = () => {
	const modal = useRef<HTMLDialogElement>(null);
	const toaster = ToasterService.getInstance(document);

	useEffect(() => {
		modal.current?.show();

		void toaster.enqueue({
			description: 'Toasty',
			label: `Initial Toast`,
			type: 'warning',
		});
	});

	return (
		<>
			<SampleDescription>
				<p>
					Combination of <code>&lt;dialog&gt;</code>-element and Toast components.
				</p>
			</SampleDescription>

			<dialog ref={modal}>modal dialog</dialog>
		</>
	);
};
