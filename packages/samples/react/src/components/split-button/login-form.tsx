/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { KolButton, KolInputPassword, KolInputText, KolSplitButton } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';

export const SplitButtonLoginForm: FC = () => {
	const splitButtonRef = React.useRef<HTMLKolSplitButtonElement & { closePopup: () => void }>(null);

	const handleCloseClick = () => {
		splitButtonRef.current?.closePopup();
	};

	return (
		<>
			<SampleDescription>
				<p>This sample shows a login form inside the popover.</p>
			</SampleDescription>

			<KolSplitButton ref={splitButtonRef} _label="Login">
				<div style={{ width: 300, padding: 16, border: '1px solid #ccc' }} onClick={(e) => e.stopPropagation()}>
					<div className="grid gap-4">
						<KolInputText _label="Username" />
						<KolInputPassword _label="Password" />
						<KolButton _label="Close" _on={{ onClick: handleCloseClick }} />
					</div>
				</div>
			</KolSplitButton>
		</>
	);
};
