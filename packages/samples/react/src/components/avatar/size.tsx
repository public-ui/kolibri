import { KolAvatar } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const AvatarSize: FC = () => (
	<>
		<SampleDescription>
			<p>
				KolAvatar is <code>6.25rem</code> (100px at the default 16px root font-size) wide/tall by default and simply fills its host element, so it can be
				resized proportionally with plain CSS <code>width</code> and/or <code>height</code> (set through the <code>style</code> prop). Setting only{' '}
				<code>width</code> is the reliable way to size it below the default. If <code>width</code> and <code>height</code> are set to different values, the
				avatar stays square by using the larger of the two - it is centered on its host and may visually extend beyond it on the smaller axis. The
				initials&apos; font size always scales with the resulting size automatically.
			</p>
		</SampleDescription>

		<SampleBlock className="flex flex-wrap items-center gap-4" id="size" fitContent>
			<KolAvatar style={{ width: '30px' }} _label="Elke Mustermann" />
			<KolAvatar style={{ width: '30px', height: '45px' }} _label="Marianne" />
			<KolAvatar style={{ width: '60px', height: '30px' }} _color="#0000FF" _label="Christian" />
			<KolAvatar _src="assets/img_avatar.jpg" _label="Elke Mustermann" />
			<KolAvatar style={{ width: '150px' }} _src="assets/img_avatar.jpg" _label="Elke Mustermann" />
		</SampleBlock>
	</>
);
