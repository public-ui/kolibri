import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';

const GROUP_CLASSES = {
	'kol-combobox': bem.forBlock('kol-combobox')('group'),
	'kol-single-select': bem.forBlock('kol-single-select')('group'),
} as const;

export type ListboxGroupFCProps = {
	/** Block of the listbox field the group belongs to. */
	block: keyof typeof GROUP_CLASSES;
};

/** Groups the input of a listbox field with its clear button and its toggle. */
export const ListboxGroupFC: FC<ListboxGroupFCProps> = ({ block }, children) => <div class={GROUP_CLASSES[block]}>{children}</div>;
