import { KolButton, KolHeading } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { useToasterService } from '../../hooks/useToasterService';
import { SampleDescription } from '../SampleDescription';

export const ButtonVariants: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>This story showcases all available button variants: primary, secondary, tertiary, normal, danger, and ghost.</p>
			</SampleDescription>

			<div className="grid gap-8">
				<section className="grid gap-4">
					<KolHeading _level={2} _label="All Button Variants" />
					<div className="flex flex-wrap gap-4">
						<KolButton _icons="kolicon-house" _label="Primary" _variant="primary" _on={dummyEventHandler} />
						<KolButton _icons="kolicon-kolibri" _label="Secondary" _variant="secondary" _on={dummyEventHandler} />
						<KolButton _icons="kolicon-cogwheel" _label="Tertiary" _variant="tertiary" _on={dummyEventHandler} />
						<KolButton _icons="kolicon-cogwheel" _label="Normal" _variant="normal" _on={dummyEventHandler} />
						<KolButton _icons="kolicon-alert-warning" _label="Danger" _variant="danger" _on={dummyEventHandler} />
						<KolButton _icons="kolicon-eye-closed" _label="Ghost" _variant="ghost" _on={dummyEventHandler} />
					</div>
				</section>
			</div>
		</>
	);
};
