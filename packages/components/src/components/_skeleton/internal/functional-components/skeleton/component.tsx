import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { ClickButtonFC } from '../click-button/component';
import type { FunctionalComponentProps } from '../generic-types';
import { bem } from '../../../../../schema/bem-registry';
import type { SkeletonApi } from './api';

const BEM_BLOCK_SKELETON = 'kol-skeleton';
const BEM_CLASS_SKELETON__ACTIONS = bem(BEM_BLOCK_SKELETON, 'actions');
const BEM_CLASS_SKELETON__CONTAINER = bem(BEM_BLOCK_SKELETON, 'container');
const BEM_CLASS_SKELETON__COUNTER = bem(BEM_BLOCK_SKELETON, 'counter');
const BEM_CLASS_SKELETON__NAME = bem(BEM_BLOCK_SKELETON, 'name');

export const SkeletonFC: FC<FunctionalComponentProps<SkeletonApi>> = ({ count, label, name, show, handleClick, refButton }) => {
	const hasName = !!(show && name?.trim());
	const BEM_CLASS_ROOT = bem(BEM_BLOCK_SKELETON, {
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
