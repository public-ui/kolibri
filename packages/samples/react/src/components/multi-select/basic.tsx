import React from 'react';
import type { FC } from 'react';

import { FormWrap } from '../FormWrap';
import { SampleDescription } from '../SampleDescription';
import { MultiSelectVariants } from './partials/variants';

export const MultiSelectBasic: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>MultiSelect allows searching and choosing zero or more options from a list.</p>
			</SampleDescription>

			<FormWrap RefComponent={MultiSelectVariants} showButtons={false} />
		</>
	);
};
