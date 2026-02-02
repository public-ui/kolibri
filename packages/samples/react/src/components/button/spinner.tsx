import { KolButton, KolHeading } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { useToasterService } from '../../hooks/useToasterService';
import { SampleDescription } from '../SampleDescription';

export const ButtonSpinner: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>
					This story demonstrates icon-only buttons with an animated spinning loader icon. The animation is applied using CSS parts to target the icon element
					directly.
				</p>
			</SampleDescription>

			<div className="grid gap-8">
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Animated Spinner Icon via CSS Part" />
					<div className="flex flex-wrap gap-4">
						<KolButton
							className="spinner-button"
							_hideLabel
							_icons={{
								left: 'kolicon-cogwheel',
							}}
							_label="Loading"
							_variant="primary"
							_on={dummyEventHandler}
						/>
						<KolButton
							className="spinner-button spinner-slow"
							_hideLabel
							_icons={{
								left: 'kolicon-cogwheel',
							}}
							_label="Syncing"
							_variant="secondary"
							_on={dummyEventHandler}
						/>
						<KolButton
							className="spinner-button spinner-slower"
							_hideLabel
							_icons={{
								left: 'kolicon-cogwheel',
							}}
							_label="Processing"
							_variant="tertiary"
							_on={dummyEventHandler}
						/>
					</div>
				</section>

				<section className="grid gap-4">
					<KolHeading _level={2} _label="Spinner with Label" />
					<div className="flex flex-wrap gap-4">
						<KolButton
							className="spinner-button"
							_icons={{
								left: 'kolicon-cogwheel',
							}}
							_label="Loading..."
							_variant="primary"
							_on={dummyEventHandler}
						/>
						<KolButton
							className="spinner-button"
							_icons={{
								left: 'kolicon-cogwheel',
							}}
							_label="Syncing..."
							_variant="secondary"
							_on={dummyEventHandler}
						/>
					</div>
				</section>
			</div>

			<style>
				{`
					@keyframes spin {
						from {
							transform: rotate(0deg);
						}
						to {
							transform: rotate(360deg);
						}
					}

					/* Target the icon part inside the button */
					.spinner-button::part(icon) {
						animation: spin 1s linear infinite;
					}

					.spinner-slow::part(icon) {
						animation-duration: 1.5s;
					}

					.spinner-slower::part(icon) {
						animation-duration: 2s;
					}

					@media (prefers-reduced-motion) {
						.spinner-button::part(icon){
							animation-duration: 10s;
						}
					}
				`}
			</style>
		</>
	);
};
