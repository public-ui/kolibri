import { KolInputColor } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputEventValueDemo } from '../InputEventValueDemo';
import { SampleDescription } from '../SampleDescription';
import { InputColorVariants } from './partials/variants';

export const InputColorBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputColor renders a color input. The sample shows KolInputColor in a form context with all variations and states.</p>
		</SampleDescription>

		<InputEventValueDemo label="KolInputColor" renderInput={(handlers) => <KolInputColor _label="Pick color" _on={handlers} />} />

		<FormWrap RefComponent={InputColorVariants} showButtons={false} />
	</>
);
