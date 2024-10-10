/* eslint-disable jsx-a11y/tabindex-no-positive */
import React from 'react';

import { KolButton } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';
import { useToasterService } from '../../hooks/useToasterService';

export const ButtonTabindex: FC = () => {
	const { buttonWithTextClickEventHandler } = useToasterService();

	const ARGS = {
		className: 'w-8rem',
		_on: {
			onClick: buttonWithTextClickEventHandler,
		},
	};

	return (
		<>
			<SampleDescription>
				<p>This sample shows KolButton with tabindexes.</p>
			</SampleDescription>

			<div className="grid gap-14">
				<div className="flex flex-wrap gap-4">
					<KolButton _label="Button 1, Tabindex 2" _variant="primary" tabIndex={2} {...ARGS} />
					<KolButton _label="Button 2, Tabindex 3" _variant="primary" tabIndex={3} {...ARGS} />
					<KolButton _label="Button 3, Tabindex 5" _variant="primary" tabIndex={5} {...ARGS} />
					<KolButton _label="Button 4, Tabindex 6" _variant="primary" tabIndex={6} {...ARGS} />
					<KolButton _label="Button 5, Tabindex 4" _variant="primary" tabIndex={4} {...ARGS} />
				</div>
			</div>
		</>
	);
};
