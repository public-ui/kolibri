import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { ClickButtonFC } from '../click-button/component';
import type { FunctionalComponentProps } from '../generic-types';
import {
	BEM_CLASS_SKELETON__ACTIONS,
	BEM_CLASS_SKELETON__CONTAINER,
	BEM_CLASS_SKELETON__COUNTER,
	BEM_CLASS_SKELETON__NAME,
	genBemSkeleton as bem,
} from './bem';
import type { SkeletonApi } from './api';

export const SkeletonFC: FC<FunctionalComponentProps<SkeletonApi>> = ({ count, label, name, show, onLoaded, handleClick, refButton }) => {
	setTimeout(() => {
		onLoaded.emit(100);
	}, 1000);

	const hasName = !!(show && name?.trim());
	const BEM_CLASS_ROOT = bem('kol-skeleton', {
		'has-name': hasName,
		'is-hidden': !show,
	});
	return (
		<div class={BEM_CLASS_ROOT}>
			<div class={BEM_CLASS_SKELETON__CONTAINER}>
				{hasName && <span class={BEM_CLASS_SKELETON__NAME}>{name}</span>}
				<div class={BEM_CLASS_SKELETON__COUNTER}>Count: {count}</div>
			</div>
			<div class={BEM_CLASS_SKELETON__ACTIONS}>
				<ClickButtonFC label={label} handleClick={handleClick} refButton={refButton} />
			</div>
		</div>
	);
};
