import { KolButton, KolLink } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { useToasterService } from '../../hooks/useToasterService';
import { SampleBlock } from '../SampleBlock';
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
				<SampleBlock id="buttons-access-keys" heading="Buttons with Access Keys" fitContent>
					<div className="flex flex-wrap gap-4">
						<KolButton _label="With S access key" _accessKey="S" _on={dummyEventHandler} />
						<KolButton _label="Very small b" _accessKey="b" _on={dummyEventHandler} />
						<KolButton _label="Access key does not appear in label" _accessKey="x" _on={dummyEventHandler} />
					</div>
				</SampleBlock>

				<SampleBlock id="access-key-hidden-label" heading="Access Key with Hidden Label" fitContent>
					<div className="flex flex-wrap gap-4">
						<KolButton _label="access key without label" _hideLabel _accessKey="a" _icons="kolicon-cogwheel" _on={dummyEventHandler} />
					</div>
				</SampleBlock>

				<SampleBlock id="access-key-inline-icons" heading="Access Key with Inline Icons" fitContent>
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
				</SampleBlock>
			</div>
		</>
	);
};
