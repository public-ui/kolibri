import { KolButton } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { useToasterService } from '../../hooks/useToasterService';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const ButtonWidth: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const ARGS = {
		className: 'w-8rem',
		_on: {
			onClick: dummyClickEventHandler,
		},
	};

	return (
		<>
			<SampleDescription>
				<p>This story demonstrates buttons with custom widths. You can control the button width using CSS classes.</p>
			</SampleDescription>

			<div className="grid gap-8">
				<SampleBlock id="fixed-width-buttons-8rem" heading="Fixed Width Buttons (8rem)">
					<div className="flex flex-wrap gap-4">
						<KolButton _label="Primary" _variant="primary" {...ARGS} />
						<KolButton _label="Secondary" _variant="secondary" {...ARGS} />
						<KolButton _label="Normal" _variant="normal" {...ARGS} />
						<KolButton _label="Danger" _variant="danger" {...ARGS} />
						<KolButton _label="Ghost" _variant="ghost" {...ARGS} />
					</div>
				</SampleBlock>

				<SampleBlock id="fixed-width-disabled-buttons" heading="Fixed Width Disabled Buttons (8rem)">
					<div className="flex flex-wrap gap-4">
						<KolButton _disabled _label="Primary" _variant="primary" {...ARGS} />
						<KolButton _disabled _label="Secondary" _variant="secondary" {...ARGS} />
						<KolButton _disabled _label="Normal" _variant="normal" {...ARGS} />
						<KolButton _disabled _label="Danger" _variant="danger" {...ARGS} />
						<KolButton _disabled _label="Ghost" _variant="ghost" {...ARGS} />
					</div>
				</SampleBlock>
			</div>
		</>
	);
};
