import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import type { LabelPropType } from '../../schema/props/label';
import type { NamePropType } from '../../schema/props/name';
import type { ShowPropType } from '../../schema/props/show';
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

export type SkeletonState = {
	label: LabelPropType;
	name: NamePropType;
	show: ShowPropType;
};

type Props = FunctionalComponentProps<SkeletonState, SkeletonCallbacks, SkeletonEmitters, SkeletonRefs>;

export const SkeletonFC: FC<Props> = ({ label, name, show, onLoaded, handleClick, refButton }) => {
	setTimeout(() => {
		onLoaded.emit(100);
	}, 1000);
	return (
		<div>
			{show && <span>{name}</span>}
			<ClickButtonFC label={label} handleClick={handleClick} refButton={refButton} />
		</div>
	);
};
