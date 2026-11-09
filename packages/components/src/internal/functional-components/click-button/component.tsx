import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';
import { BemRootNodeFC } from '../bem-root-node/component';
import type { FunctionalComponentProps } from '../generic-types';
import type { ClickButtonApi } from './api';

const clickButtonBem = bem.forBlock('kol-click-button');
const BEM_CLASS_CLICK_BUTTON__LABEL = clickButtonBem('label');

/**
 * Renders a native `button` and leaves its keyboard behaviour (Enter, Space, Tab) untouched.
 */
export const ClickButtonFC: FC<FunctionalComponentProps<ClickButtonApi>> = ({ label, handleClick, refButton }) => (
	<BemRootNodeFC component="button" block="kol-click-button" ref={refButton} onClick={handleClick}>
		<span class={BEM_CLASS_CLICK_BUTTON__LABEL}>{label}</span>
	</BemRootNodeFC>
);
