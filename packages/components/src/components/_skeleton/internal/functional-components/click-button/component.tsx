import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import type { FunctionalComponentProps } from '../generic-types';
import { BEM_CLASS_CLICK_BUTTON, BEM_CLASS_CLICK_BUTTON__LABEL } from './bem';
import type { ClickButtonApi } from './api';

export const ClickButtonFC: FC<FunctionalComponentProps<ClickButtonApi>> = ({ label, handleClick, refButton }) => (
	<button class={BEM_CLASS_CLICK_BUTTON} ref={refButton} onClick={handleClick}>
		<span class={BEM_CLASS_CLICK_BUTTON__LABEL}>{label}</span>
	</button>
);
