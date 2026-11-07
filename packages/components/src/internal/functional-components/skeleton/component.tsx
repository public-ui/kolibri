import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';
import { BemRootNodeFC } from '../bem-root-node/component';
import { ClickButtonFC } from '../click-button/component';
import type { FunctionalComponentProps } from '../generic-types';
import type { SkeletonApi } from './api';

const skeletonBem = bem.forBlock('kol-skeleton');
const BEM_CLASS_SKELETON__ACTIONS = skeletonBem('actions');
const BEM_CLASS_SKELETON__CONTAINER = skeletonBem('container');
const BEM_CLASS_SKELETON__COUNTER = skeletonBem('counter');
const BEM_CLASS_SKELETON__NAME = skeletonBem('name');

export const SkeletonFC: FC<FunctionalComponentProps<SkeletonApi>> = (props) => {
	const { count, label, name, show, handleClick, refButton } = props;
	const hasName = !!(show && name?.trim());
	return (
		<BemRootNodeFC
			block="kol-skeleton"
			modifiers={{
				'has-name': hasName,
				'is-hidden': !show,
			}}
		>
			<div class={BEM_CLASS_SKELETON__CONTAINER}>
				{hasName && <span class={BEM_CLASS_SKELETON__NAME}>{name}</span>}
				<div class={BEM_CLASS_SKELETON__COUNTER}>Count: {count}</div>
			</div>
			<div class={BEM_CLASS_SKELETON__ACTIONS}>
				<ClickButtonFC label={label} handleClick={handleClick} refButton={refButton} />
			</div>
		</BemRootNodeFC>
	);
};
