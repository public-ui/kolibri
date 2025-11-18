import { KolButton, KolHeading } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { useToasterService } from '../../hooks/useToasterService';
import { SampleDescription } from '../SampleDescription';

export const ButtonIcons: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>
					This story showcases buttons with icons in various positions and configurations. Icons can be placed on the left, right, top, bottom, or in multiple
					positions at once.
				</p>
			</SampleDescription>

			<div className="grid gap-8">
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Basic Icon Positions" />
					<div className="flex flex-wrap gap-4">
						<KolButton
							_icons={{
								left: 'codicon codicon-arrow-left',
							}}
							_label="Icon Left"
							_on={dummyEventHandler}
						/>
						<KolButton
							_icons={{
								right: 'codicon codicon-arrow-right',
							}}
							_label="Icon Right"
							_on={dummyEventHandler}
						/>
						<KolButton
							_icons={{
								top: 'codicon codicon-arrow-up',
							}}
							_label="Icon Top"
							_on={dummyEventHandler}
						/>
						<KolButton
							_icons={{
								bottom: 'codicon codicon-arrow-down',
							}}
							_label="Icon Bottom"
							_on={dummyEventHandler}
						/>
					</div>
				</section>

				<section className="grid gap-4">
					<KolHeading _level={2} _label="Multiple Icon Positions" />
					<div className="flex flex-wrap gap-4">
						<KolButton
							_icons={{
								left: 'codicon codicon-arrow-left',
								right: 'codicon codicon-arrow-right',
							}}
							_label="Left & Right"
							_on={dummyEventHandler}
						/>
						<KolButton
							_icons={{
								top: 'codicon codicon-arrow-up',
								bottom: 'codicon codicon-arrow-down',
							}}
							_label="Top & Bottom"
							_on={dummyEventHandler}
						/>
					</div>
				</section>

				<section className="grid gap-4">
					<KolHeading _level={2} _label="All Icon Positions" />
					<div className="flex flex-wrap gap-4">
						<KolButton
							_icons={{
								top: {
									style: {
										transform: 'rotate(45deg)',
									},
									icon: 'codicon codicon-arrow-up',
								},
								bottom: 'codicon codicon-arrow-down',
								left: {
									icon: 'codicon codicon-arrow-left',
								},
								right: 'codicon codicon-arrow-right',
							}}
							_label="All Directions"
							_on={dummyEventHandler}
						/>
					</div>
				</section>

				<section className="grid gap-4">
					<KolHeading _level={2} _label="Simple Icon String" />
					<div className="flex flex-wrap gap-4">
						<KolButton _icons="codicon codicon-home" _label="Home Icon" _on={dummyEventHandler} />
						<KolButton _icons="codicon codicon-heart" _label="Heart Icon" _on={dummyEventHandler} />
						<KolButton _icons="codicon codicon-trash" _label="Trash Icon" _on={dummyEventHandler} />
					</div>
				</section>

				<section className="grid gap-4">
					<KolHeading _level={2} _label="Large Icon on Top" />
					<div className="flex flex-wrap gap-4">
						<KolButton
							_icons={{
								top: {
									style: {
										'font-size': '400%',
									},
									icon: 'codicon codicon-home',
								},
							}}
							_label="Home"
							_on={dummyEventHandler}
						/>
					</div>
				</section>
			</div>
		</>
	);
};
