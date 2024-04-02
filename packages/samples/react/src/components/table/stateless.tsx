import type { FC } from 'react';
import React from 'react';
import { KolTableStateless } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const TableStateless: FC = () => (
	<>
		<SampleDescription>Direct usage of KolTableStateless</SampleDescription>

		<KolTableStateless />
	</>
);
