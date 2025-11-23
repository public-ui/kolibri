import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { SampleDescription } from '../SampleDescription';
import { SelectVariants } from './partials/variants';

export const SelectBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolSelect renders a select field. The sample shows KolSelect in a form context with all variations and states.</p>
		</SampleDescription>

		<FormWrap RefComponent={SelectVariants} showButtons={false} />
	</>
);
