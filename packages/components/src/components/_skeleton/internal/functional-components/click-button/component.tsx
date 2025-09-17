import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import type { FunctionalComponentProps } from '../generic-types';
import type { ClickButtonApi } from './api';

export const ClickButtonFC: FC<FunctionalComponentProps<ClickButtonApi>> = ({ label, handleClick, refButton }) => (
	<button ref={refButton} onClick={handleClick}>
		{label}
	</button>
);
