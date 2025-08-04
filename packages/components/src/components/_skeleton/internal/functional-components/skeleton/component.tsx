import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import type { CountProp } from '../../schema/props/count';
import type { LabelProp } from '../../schema/props/label';
import type { NameProp } from '../../schema/props/name';
import type { ShowProp } from '../../schema/props/show';
import { ClickButtonFC } from '../click-button/component';
import type { FunctionalComponentProps } from '../generic-types';

/**
 * Architectural hint for the typings
 *
 * Do not import Callbacks, Emitters, Refs, or State from
 * other components. Instead, define them here explicitly
 * and only if they are needed in this component.
 *
 * That makes it easier and possible to handle name collisions
 * and to keep the component self-contained.
 */

export type SkeletonCallbacks = {
	click: () => void;
};

export type SkeletonEmitters = {
	loaded: number;
};

export type SkeletonRefs = {
	button: HTMLButtonElement;
};

export type SkeletonMethods = {
	toggle: () => void;
};

export type SkeletonListeners = {
	keydown: KeyboardEvent;
};

export type SkeletonRenderProps = CountProp & NameProp;
export type SkeletonRenderStates = LabelProp & ShowProp;

type Props = FunctionalComponentProps<SkeletonRenderProps, SkeletonRenderStates, SkeletonCallbacks, SkeletonEmitters, SkeletonRefs>;

export const SkeletonFC: FC<Props> = ({ count, label, name, show, onLoaded, handleClick, refButton }) => {
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
