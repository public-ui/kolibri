import { KolButton, KolHeading } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { useToasterService } from '../../hooks/useToasterService';
import { SampleDescription } from '../SampleDescription';

export const ButtonBaselined: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>
					This story demonstrates button baseline alignment. It shows multiple buttons with and without icons that are vertically aligned, useful for testing
					layout consistency.
				</p>
			</SampleDescription>

			<div className="grid gap-8">
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Vertically Aligned Buttons" />
					<div className="flex flex-wrap gap-2">
						<KolButton _label="Label-Text" _on={dummyEventHandler} />
						<KolButton _icons="fa-solid fa-face-smile" _label="Label-Text with Icon" _on={dummyEventHandler} />
					</div>
				</section>
			</div>
		</>
	);
};
