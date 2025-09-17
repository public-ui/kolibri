import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import { ClickButtonFC } from '../click-button/component';
import type { FunctionalComponentProps } from '../generic-types';
import type { SkeletonApi } from './api';

export const SkeletonFC: FC<FunctionalComponentProps<SkeletonApi>> = ({ count, label, name, show, onLoaded, handleClick, refButton }) => {
	setTimeout(() => {
		onLoaded.emit(100);
	}, 1000);
	return (
		<div>
			{show && <span>{name}</span>}
			<div>Count: {count}</div>
			<ClickButtonFC label={label} handleClick={handleClick} refButton={refButton} />
		</div>
	);
};
