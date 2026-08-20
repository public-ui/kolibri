import { KolButton } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { useToasterService } from '../../hooks/useToasterService';
import { SampleBlock } from '../SampleBlock';
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
				<SampleBlock id="basic-positions" heading="Basic Icon Positions">
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
				</SampleBlock>

				<SampleBlock id="multiple-positions" heading="Multiple Icon Positions">
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
				</SampleBlock>

				<SampleBlock id="all-positions" heading="All Icon Positions">
					<div className="flex flex-wrap gap-4">
						<KolButton
							_icons={{
								top: 'kolicon-chevron-up',
								bottom: 'kolicon-chevron-down',
								left: 'kolicon-chevron-left',
								right: 'kolicon-chevron-right',
							}}
							_label="All Directions"
							_on={dummyEventHandler}
						/>
					</div>
				</SampleBlock>

				<SampleBlock id="icon-string" heading="Simple Icon String">
					<div className="flex flex-wrap gap-4">
						<KolButton _icons="kolicon-house" _label="Home Icon" _on={dummyEventHandler} />
						<KolButton _icons="kolicon-kolibri" _label="Heart Icon" _on={dummyEventHandler} />
						<KolButton _icons="kolicon-alert-warning" _label="Trash Icon" _on={dummyEventHandler} />
					</div>
				</SampleBlock>

				<SampleBlock id="large-icon" heading="Large Icon on Top">
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
				</SampleBlock>
			</div>
		</>
	);
};
