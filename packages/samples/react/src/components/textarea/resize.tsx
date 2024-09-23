import React from 'react';

import { KolForm, KolTextarea } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';
export const TextareaResize: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample demonstrates the <code>_resize</code>-property of KolTextarea. The sample textarea can (only) be resized in the given direction.
			</p>
		</SampleDescription>

		<KolForm className="w-full grid gap-4">
			<KolTextarea _resize="both" _label="Text input (both)" />
			<KolTextarea _resize="vertical" _label="Text input (vertical)" className="mt" />
			<KolTextarea _resize="horizontal" _label="Text input (horizontal)" className="mt" />
			<KolTextarea _resize="none" _label="Text input (none)" className="mt" />
		</KolForm>
	</>
);
