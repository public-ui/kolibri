import { KolTextarea } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputEventValueDemo } from '../InputEventValueDemo';
import { SampleDescription } from '../SampleDescription';
import { TextareaVariants } from './partials/variants';

export const TextareaBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolTextarea renders a text field. The sample shows KolTextarea in a form context with different variations and states.</p>
		</SampleDescription>

		<InputEventValueDemo label="KolTextarea" renderInput={(handlers) => <KolTextarea _label="Message" _on={handlers} />} />

		<FormWrap RefComponent={TextareaVariants} showButtons={false} />
	</>
);
