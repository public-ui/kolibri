import { KolButton } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { useToasterService } from '../../hooks/useToasterService';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const ButtonAriaDescription: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>
					This story demonstrates buttons with ARIA descriptions. The aria-description attribute provides additional descriptive text for screen readers,
					helping users understand the button&apos;s purpose or action in more detail.
				</p>
			</SampleDescription>

			<div className="grid gap-8">
				<SampleBlock id="buttons-aria-description" heading="Buttons with and without ARIA Description">
					<div className="flex flex-wrap gap-4">
						<KolButton _label="Button without ARIA description" _on={dummyEventHandler} />
						<KolButton _label="Button with ARIA description" _ariaDescription="This button performs an important action" _on={dummyEventHandler} />
					</div>
				</SampleBlock>
			</div>
		</>
	);
};
