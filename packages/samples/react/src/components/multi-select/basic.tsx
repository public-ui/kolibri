import type { FC } from 'react';
import React from 'react';
import { FormWrap } from '../FormWrap';
import { SampleDescription } from '../SampleDescription';
import { MultiSelectVariants } from './variants';

export const MultiSelectBasic: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>
					MultiSelect provides a select field for multiple values, supported by a search field. Selected values are displayed as badges that can be removed
					individually.
				</p>
			</SampleDescription>
			<FormWrap RefComponent={MultiSelectVariants} showButtons={false} />
		</>
	);
};
