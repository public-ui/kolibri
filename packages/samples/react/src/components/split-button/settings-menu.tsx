/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef } from 'react';
import { KolInputCheckbox, KolSplitButton } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';

export const SplitButtonSettingsMenu: FC = () => {
	const splitButtonRef = useRef<HTMLKolSplitButtonElement>(null);

	useEffect(() => {
		const popover = splitButtonRef.current?.shadowRoot?.querySelector('kol-popover-wc') as { _align?: string } | null;
		if (popover) {
			popover._align = 'left';
		}
	}, []);

	return (
		<>
			<SampleDescription>
				<p>The split button opens a small settings menu.</p>
			</SampleDescription>

			<div className="flex gap-4">
				<KolSplitButton ref={splitButtonRef} _label="Einstellungen">
					<div style={{ padding: 16, width: 200 }} onClick={(e) => e.stopPropagation()}>
						<div className="grid gap-4">
							<KolInputCheckbox _variant="switch" _label="Benachrichtigungen" _checked />
							<KolInputCheckbox _variant="switch" _label="Newsletter" />
							<KolInputCheckbox _variant="switch" _label="Statistiken" />
						</div>
					</div>
				</KolSplitButton>
			</div>
		</>
	);
};
