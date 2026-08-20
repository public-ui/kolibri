import type { FC } from 'react';
import React, { useMemo } from 'react';

import { KolTableStateful } from '@public-ui/react-v19';

import { SampleDescription } from '../SampleDescription';
import { DATE_FORMATTER } from './formatter';
import type { Data } from './test-data';
import { DATA } from './test-data';

import type { KoliBriTableHeaders } from '@public-ui/components';
import { useSearchParams } from 'react-router';
import { fetchVariantData } from '../../shares/fetchVariantData';
import { getCustomThemes } from '../../shares/store';

const HEADERS: KoliBriTableHeaders = {
	horizontal: [
		[
			{ label: 'Order', key: 'order', width: 160 },
			{ label: 'Date', key: 'date', width: 160, render: (_el, _cell, tupel) => DATE_FORMATTER.format((tupel as unknown as Data).date) },
		],
	],
};

export const TableVariant: FC = () => {
	const [searchParams] = useSearchParams();
	const theme = searchParams.get('theme') ?? getCustomThemes()?.[0]?.key;
	const tableVariants = useMemo(() => (theme ? fetchVariantData(theme, 'tableVariants') : []), [theme]);

	return (
		<div className="w-full grid gap-14">
			<SampleDescription>
				<p>This sample shows KolTableStateful with different variants controlled by the theme.</p>
			</SampleDescription>

			<section className="w-full flex flex-col gap-14" data-visual-block="variants">
				{!Array.isArray(tableVariants) || tableVariants.length === 0 ? (
					<p>This theme has no variants for tables.</p>
				) : (
					tableVariants.map((element) => {
						return (
							<KolTableStateful
								_label={'Table with variant: ' + element}
								_data={DATA}
								_headers={HEADERS}
								_pagination={{
									_page: 1,
									_hasButtons: {
										first: false,
										next: true,
										last: false,
										previous: true,
									},
								}}
								_paginationPosition="bottom"
								_variant={element}
							></KolTableStateful>
						);
					})
				)}
			</section>
		</div>
	);
};
