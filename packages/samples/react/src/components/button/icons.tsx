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
								left: 'kolicon-chevron-left',
							}}
							_label="Icon Left"
							_on={dummyEventHandler}
						/>
						<KolButton
							_icons={{
								right: 'kolicon-chevron-right',
							}}
							_label="Icon Right"
							_on={dummyEventHandler}
						/>
						<KolButton
							_icons={{
								top: 'kolicon-chevron-up',
							}}
							_label="Icon Top"
							_on={dummyEventHandler}
						/>
						<KolButton
							_icons={{
								bottom: 'kolicon-chevron-down',
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
								left: 'kolicon-chevron-left',
								right: 'kolicon-chevron-right',
							}}
							_label="Left & Right"
							_on={dummyEventHandler}
						/>
						<KolButton
							_icons={{
								top: 'kolicon-chevron-up',
								bottom: 'kolicon-chevron-down',
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
									icon: 'kolicon-chevron-up',
								},
								bottom: 'kolicon-chevron-down',
								left: {
									icon: 'kolicon-chevron-left',
								},
								right: 'kolicon-chevron-right',
							}}
							_label="All Directions"
							_on={dummyEventHandler}
						/>
					</div>
				</section>

				<section className="grid gap-4">
					<KolHeading _level={2} _label="Simple Icon String" />
					<div className="flex flex-wrap gap-4">
						<KolButton _icons="fa-solid fa-house" _label="Home Icon" _on={dummyEventHandler} />
						<KolButton _icons="fa-solid fa-heart" _label="Heart Icon" _on={dummyEventHandler} />
						<KolButton _icons="fa-solid fa-trash" _label="Trash Icon" _on={dummyEventHandler} />
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
									icon: 'kolicon-house',
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
