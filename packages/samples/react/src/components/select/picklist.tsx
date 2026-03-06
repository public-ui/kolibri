import type { FC } from 'react';
import React from 'react';

import { SampleDescription } from '../SampleDescription';
import { PicklistCases } from './picklist/partials/cases';

export const SelectPicklist: FC = () => (
	<>
		<SampleDescription>
			<p>
				A picklist (dual listbox / transfer list) lets users move items between an "Available" and a "Selected" list. The component is generic, supports
				controlled and uncontrolled usage, and adapts its layout responsively.
			</p>
		</SampleDescription>

		<PicklistCases />
	</>
);
