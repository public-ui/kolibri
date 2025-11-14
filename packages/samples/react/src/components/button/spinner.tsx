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
				<p>This story demonstrates icon-only buttons with an animated spinning loader icon. The animation is specified in the icon property as style.</p>
			</SampleDescription>

			<div className="grid gap-8">
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Animated Spinner Icon" />
					<div className="flex flex-wrap gap-4">
						<KolButton
							_hideLabel
							_icons={{
								left: {
									style: {
										animation: 'spin 1s linear infinite',
										'@keyframes spin': {
											from: {
												transform: 'rotate(0deg)',
											},
											to: {
												transform: 'rotate(360deg)',
											},
										},
									},
									icon: 'codicon codicon-loading',
								},
							}}
							_label="Loading"
							_variant="primary"
							_on={dummyEventHandler}
						/>
						<KolButton
							_hideLabel
							_icons={{
								left: {
									style: {
										animation: 'spin 1s linear infinite',
									},
									icon: 'codicon codicon-sync',
								},
							}}
							_label="Syncing"
							_variant="secondary"
							_on={dummyEventHandler}
						/>
						<KolButton
							_hideLabel
							_icons={{
								left: {
									style: {
										animation: 'spin 1.5s linear infinite',
									},
									icon: 'codicon codicon-settings-gear',
								},
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
							_icons={{
								left: {
									style: {
										animation: 'spin 1s linear infinite',
									},
									icon: 'codicon codicon-loading',
								},
							}}
							_label="Loading..."
							_variant="primary"
							_on={dummyEventHandler}
						/>
						<KolButton
							_icons={{
								left: {
									style: {
										animation: 'spin 1s linear infinite',
									},
									icon: 'codicon codicon-sync',
								},
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
				`}
			</style>
		</>
	);
};
