import React from 'react';

import { KolForm, KolTextarea } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';
export const TextareaResize: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample demonstrates the <code>_resize</code>-property of KolTextarea. The sample textarea can (only) be resized in the given direction.
			</p>
		</SampleDescription>

		<KolForm className="w-full">
			<SampleBlock id="resize" className="flex flex-col gap-4">
				<KolTextarea _label="Text input (unset)" />
				<KolTextarea _resize="vertical" _label="Text input (vertical)" />
				<KolTextarea _resize="none" _label="Text input (none)" />
			</SampleBlock>
		</KolForm>
	</>
);
