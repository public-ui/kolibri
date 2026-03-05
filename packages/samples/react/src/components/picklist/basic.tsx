import type { FC } from 'react';
import React from 'react';

import { SampleDescription } from '../SampleDescription';
import { PicklistCases } from './partials/cases';

export const PicklistBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				A picklist (dual listbox) lets users move items between an "Available" and a "Selected" list. This sample shows how to build this pattern using KolSelect
				and KolButton.
			</p>
		</SampleDescription>

		<PicklistCases />
	</>
);
