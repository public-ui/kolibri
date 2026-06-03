import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';
import type { FunctionalComponentProps } from '../generic-types';
import type { ClickButtonApi } from './api';

const clickButtonBem = bem.forBlock('kol-click-button');
const BEM_CLASS_CLICK_BUTTON = clickButtonBem();
const BEM_CLASS_CLICK_BUTTON__LABEL = clickButtonBem('label');

type ClickButtonFCProps = Pick<FunctionalComponentProps<ClickButtonApi>, 'handleClick' | 'label'> & {
	refButton: (element?: HTMLButtonElement) => void;
};

export const ClickButtonFC: FC<ClickButtonFCProps> = ({ label, handleClick, refButton }) => (
	<button class={BEM_CLASS_CLICK_BUTTON} ref={refButton} onClick={handleClick} onKeyDown={(event) => event.preventDefault()}>
		<span class={BEM_CLASS_CLICK_BUTTON__LABEL}>{label}</span>
	</button>
);
