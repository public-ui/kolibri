import React from 'react';

import { KolForm, KolTextarea } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const TextareaRows: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample demonstrates the <code>_rows</code>-property of KolTextarea. The sample textarea has a fixed row number of 10.
			</p>
		</SampleDescription>
		<KolForm>
			<KolTextarea _rows={10} _label="Texteingabe" />
		</KolForm>
	</>
);
