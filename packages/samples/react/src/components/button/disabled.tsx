import { KolButton, KolHeading } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { useToasterService } from '../../hooks/useToasterService';
import { SampleDescription } from '../SampleDescription';

export const ButtonDisabled: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>This story demonstrates the disabled state of buttons. Disabled buttons are not clickable and appear visually dimmed.</p>
			</SampleDescription>

			<div className="grid gap-8">
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Disabled Buttons" />
					<div className="flex flex-wrap gap-4">
						<KolButton _disabled _icons="fa-solid fa-house" _label="Primary" _variant="primary" _on={dummyEventHandler} />
						<KolButton _disabled _icons="fa-solid fa-heart" _label="Secondary" _variant="secondary" _on={dummyEventHandler} />
						<KolButton _disabled _icons="fa-solid fa-robot" _label="Tertiary" _variant="tertiary" _on={dummyEventHandler} />
						<KolButton _disabled _icons="fa-solid fa-robot" _label="Normal" _variant="normal" _on={dummyEventHandler} />
						<KolButton _disabled _icons="fa-solid fa-trash" _label="Danger" _variant="danger" _on={dummyEventHandler} />
						<KolButton _disabled _icons="fa-solid fa-smile" _label="Ghost" _variant="ghost" _on={dummyEventHandler} />
					</div>
				</section>

				<section className="grid gap-4">
					<KolHeading _level={2} _label="Comparison: Enabled vs Disabled" />
					<div className="flex flex-wrap gap-4">
						<KolButton _icons="fa-solid fa-house" _label="Enabled" _variant="primary" _on={dummyEventHandler} />
						<KolButton _disabled _icons="fa-solid fa-house" _label="Disabled" _variant="primary" _on={dummyEventHandler} />
					</div>
				</section>
			</div>
		</>
	);
};
