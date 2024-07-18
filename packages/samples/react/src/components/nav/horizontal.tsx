import React from 'react';
import { KolNav } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { LINKS } from './links';

import type { FC } from 'react';
export const NavHorizontal: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolNav with horizontal alignment.</p>
		</SampleDescription>

		<KolNav _label="Main navigation" _links={LINKS} _orientation="horizontal" />
	</>
);
