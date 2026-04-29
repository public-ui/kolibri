import { KolInputEmail } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputEventValueDemo } from '../InputEventValueDemo';
import { SampleDescription } from '../SampleDescription';
import { InputEmailVariants } from './partials/variants';

export const InputEmailBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputEmail renders an email input field. The sample shows KolInputEmail in a form context with all variations and states.</p>
		</SampleDescription>

		<InputEventValueDemo label="KolInputEmail" renderInput={(handlers) => <KolInputEmail _label="E-Mail" _on={handlers} />} />

		<FormWrap RefComponent={InputEmailVariants} showButtons={false} />
	</>
);
