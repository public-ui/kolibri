import React from 'react';
import { KolHeading, KolNav } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { LINKS, LINKS_WITHOUT_SUBMENU } from './links';

import type { FC } from 'react';
export const NavHorizontal: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolNav with horizontal alignment.</p>
		</SampleDescription>

		<section className="grid gap-8">
			<section className="grid gap-4">
				<KolHeading _level={2} _label="Navigation without submenu" />
				<KolNav _label="Main navigation" _links={LINKS_WITHOUT_SUBMENU} _orientation="horizontal" />
			</section>
			<section className="grid gap-4">
				<KolHeading _level={2} _label="Navigation with submenu" />
				<KolNav _label="Main navigation" _links={LINKS} _orientation="horizontal" />
			</section>
		</section>
	</>
);
