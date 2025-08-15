import type { FC } from 'react';
import React from 'react';
import { KolTableStateful, KolTableStateless } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

const DATA = [{ city: 'Berlin', country: 'Germany' }];

const HEADERS = {
	horizontal: [
		[
			{ key: 'city', label: 'City' },
			{ key: 'country', label: 'Country' },
		],
	],
	vertical: [],
};

const PROPS = {
	_data: DATA,
	_headers: HEADERS,
	_headerCells: HEADERS,
	_label: 'Label should always be filled',
	_minWidth: 'auto',
};

export const TableExternalCaption: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolTableStateless with an external caption referenced via aria-labelledby.</p>
		</SampleDescription>

		<section className="w-full">
			<span id="caption-ext">External table caption</span>
			<br />
			<KolTableStateless aria-labelledby="caption-ext" {...PROPS} />
			<KolTableStateful aria-labelledby="caption-ext" {...PROPS} />
			<hr aria-hidden="true" />
			<KolTableStateless {...PROPS} />
			<KolTableStateful {...PROPS} />
		</section>
	</>
);
