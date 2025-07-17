/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { KolInputCheckbox, KolSplitButton } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';

export const SplitButtonSettingsMenu: FC = () => (
	<>
		<SampleDescription>
			<p>The split button opens a small settings menu.</p>
		</SampleDescription>

		<KolSplitButton _label="Einstellungen">
			<div style={{ padding: 16, width: 200 }} onClick={(e) => e.stopPropagation()}>
				<div className="grid gap-4">
					<KolInputCheckbox _variant="switch" _label="Benachrichtigungen" />
					<KolInputCheckbox _variant="switch" _label="Newsletter" />
					<KolInputCheckbox _variant="switch" _label="Statistiken" />
				</div>
			</div>
		</KolSplitButton>
	</>
);
