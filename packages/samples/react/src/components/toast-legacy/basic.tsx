import React from 'react';
import { FC } from 'react';
import { KolToast } from '@public-ui/react';

export const ToastBasic: FC = () => (
	<div>
		<KolToast _label="Foo">Toast content</KolToast>
		<KolToast _label="Foo" _hasCloser>
			Toast content
		</KolToast>
	</div>
);
