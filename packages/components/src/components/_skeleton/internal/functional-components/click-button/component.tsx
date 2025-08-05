import type { FunctionalComponent as FC } from '@stencil/core';
/** @jsxImportSource solid-js */
import h from 'solid-js/h';
import type { LabelProp } from '../../schema/props/label';
import type { FunctionalComponentProps } from '../generic-types';

export type ClickButtonCallbacks = {
	click: () => void;
};

export type ClickButtonRefs = {
	button: HTMLButtonElement;
};

export type ClickButtonEmitters = Record<never, never>;

export type ClickButtonRenderProps = LabelProp;
export type ClickButtonRenderStates = Record<never, never>;

type Props = FunctionalComponentProps<ClickButtonRenderProps, ClickButtonRenderStates, ClickButtonCallbacks, ClickButtonEmitters, ClickButtonRefs>;

export const ClickButtonFC: FC<Props> = ({ label, handleClick, refButton }) => (
	<button ref={refButton} onClick={handleClick}>
		{label}
	</button>
);
