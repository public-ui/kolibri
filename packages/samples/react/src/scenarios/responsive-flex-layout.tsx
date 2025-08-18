import type { FC } from 'react';
import React from 'react';

import { KolInputRange, KolNav, KolSelect } from '@public-ui/react';

import { SampleDescription } from '../components/SampleDescription';

const LINKS = [
	{ _label: 'Home', _href: '#home' },
	{ _label: 'Docs', _href: '#docs' },
];

const OPTIONS = [
	{ label: 'Option A', value: 'A' },
	{ label: 'Option B', value: 'B' },
];

export const ResponsiveFlexLayout: FC = () => (
	<>
		<SampleDescription>
			<p>
				This scenario demonstrates a responsive flex layout where a range input, navigation and select are placed side by side on wide screens and stacked on
				small screens.
			</p>
		</SampleDescription>
		<div className="flex flex-col items-center gap-4 md:flex-row md:justify-between w-full">
			<div className="flex flex-1 justify-center md:justify-start">
				<KolInputRange _label="Range" _min={0} _max={100} />
			</div>
			<div className="flex flex-1 justify-center">
				<KolNav _label="Main navigation" _links={LINKS} />
			</div>
			<div className="flex flex-1 justify-center md:justify-end">
				<KolSelect _label="Select" _options={OPTIONS} />
			</div>
		</div>
	</>
);
