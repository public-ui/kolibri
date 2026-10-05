import type { FC } from 'react';
import React, { useRef } from 'react';

import { KolForm, KolInputPassword } from '@public-ui/react-v19';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const InputPasswordShowPassword: FC = () => {
	const passwordRef = useRef<HTMLKolInputPasswordElement>(null);

	return (
		<>
			<SampleDescription>
				<p>
					This sample shows KolInputPassword in the variant &quot;visibility-toggle&quot;. It features a button to toggle between a visible and hidden password
					input.
				</p>
			</SampleDescription>

			<SampleBlock id="show-password">
				<KolForm className="w-full">
					<KolInputPassword _placeholder="With 'Show password' button" _label="Password" ref={passwordRef} className="block" _visibilityToggle={true} />
					<KolInputPassword
						_placeholder="With 'Show password' button"
						_label="Password"
						ref={passwordRef}
						className="block"
						_visibilityToggle={true}
						_value="Password"
					/>
					<KolInputPassword
						_placeholder="With 'Show password' button and disabled"
						_label="Password"
						ref={passwordRef}
						className="block"
						_disabled
						_visibilityToggle={true}
					/>
				</KolForm>
			</SampleBlock>
		</>
	);
};
