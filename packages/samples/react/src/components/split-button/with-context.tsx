/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';

import { KolButton, KolInputText, KolSplitButton } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';

export const SplitButtonWithContext: FC = () => {
	const splitButtonRef = React.useRef<HTMLKolSplitButtonElement & { closePopup: any }>();

	const handleCloseClick = () => {
		splitButtonRef.current?.closePopup();
	};

	return (
		<>
			<SampleDescription>
				<p>SplitButton renders a button with an additional context-menu, that can be opened by clicking the arrow icon.</p>
			</SampleDescription>

			<div className="flex gap-4">
				<KolSplitButton ref={splitButtonRef as any} _label="Only the arrow opens">
					<div style={{ width: 300, padding: 16, border: '1px solid #ccc' }} onClick={(e) => e.stopPropagation()}>
						<p>SplitButton renders a button with an additional context-menu, that can be opened by clicking the arrow icon.</p>
						<div style={{ gap: 16, display: 'flex', flexDirection: 'column' }}>
							<KolInputText _label="User" />
							<KolInputText _label="Role" />
							<KolButton _label="Close" _on={{ onClick: handleCloseClick }} />
						</div>
					</div>
				</KolSplitButton>
			</div>
		</>
	);
};
