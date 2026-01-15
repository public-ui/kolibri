import { KolButton, KolHeading, KolLink } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { useToasterService } from '../../hooks/useToasterService';
import { SampleDescription } from '../SampleDescription';

export const ButtonAccessKey: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>
					This story demonstrates buttons with{' '}
					<KolLink _label="access keys" _href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey" _target="blank" />. Access keys
					allow users to trigger buttons using keyboard shortcuts.
				</p>
			</SampleDescription>

			<div className="grid gap-8">
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Buttons with Access Keys" />
					<div className="flex flex-wrap gap-4">
						<KolButton _label="With S access key" _accessKey="S" _on={dummyEventHandler} />
						<KolButton _label="Very small b" _accessKey="b" _on={dummyEventHandler} />
						<KolButton _label="Access key does not appear in label" _accessKey="x" _on={dummyEventHandler} />
					</div>
				</section>

				<section className="grid gap-4">
					<KolHeading _level={2} _label="Access Key with Hidden Label" />
					<div className="flex flex-wrap gap-4">
						<KolButton _label="access key without label" _hideLabel _accessKey="a" _icons="kolicon-cogwheel" _on={dummyEventHandler} />
					</div>
				</section>

				<section className="grid gap-4">
					<KolHeading _level={2} _label="Access Key with Inline Icons" />
					<div className="flex flex-wrap gap-4">
						<KolButton
							_label="with inline icons"
							_icons={{
								left: 'kolicon-cogwheel',
								right: 'kolicon-cogwheel',
							}}
							_accessKey="n"
							_on={dummyEventHandler}
						/>
					</div>
				</section>
			</div>
		</>
	);
};
