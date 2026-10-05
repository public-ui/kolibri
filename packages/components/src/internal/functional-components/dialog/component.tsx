import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';
import type { ModalVariantPropType } from '../../../schema/props/variant/modal';
import clsx from '../../../utils/clsx';
import type { FunctionalComponentProps } from '../generic-types';
import type { DialogApi } from './api';

const dialogBem = bem.forBlock('kol-dialog');
const modalBem = bem.forBlock('kol-modal');

/**
 * The dialog's own block classes: `kol-dialog`, the deprecated `kol-modal` alias, and the variant
 * of both as an element-style suffix. Every theme addresses all four names, so they are rendered
 * verbatim.
 */
export const dialogBlockClass = (variant: ModalVariantPropType): string => clsx(dialogBem(), modalBem(), dialogBem(variant), modalBem(variant));

export type DialogFCProps = Pick<FunctionalComponentProps<DialogApi>, 'class' | 'handleCancel' | 'handleClose' | 'label' | 'modal' | 'refDialog'> & {
	/**
	 * Class names of the block this dialog belongs to. `kol-dialog` renders its own block, the
	 * deprecated `kol-modal` alias and the variant of both; `kol-drawer` renders its
	 * `kol-drawer__dialog` element class. Every theme styles the two differently — a drawer that
	 * carried the dialog classes would inherit the dialog's background, radius and backdrop — so
	 * neither is hard-coded here.
	 */
	blockClass: string;
	/**
	 * DOM id of the heading that labels the dialog. Without one the dialog falls back to
	 * `aria-label`, which is what the blank variant needs: it renders no heading.
	 */
	labelledBy?: string;
	/** Width of the dialog. Left unset, the dialog keeps its intrinsic size. */
	width?: string;
};

/**
 * The native `<dialog>` shell, shared by `kol-dialog`, the deprecated `kol-modal`, the transitional
 * `kol-dialog-wc` and `kol-drawer`.
 *
 * It owns the element that provides `showModal()`, the top layer and the backdrop — and nothing
 * else. What the dialog contains is the consumer's composition, handed in as children: the dialog
 * renders its card or blank contents, the drawer its sliding wrapper around a card.
 *
 * Root from the `<dialog>` itself, not `BemRootNodeFC`: that always renders a `<div>`, and only the
 * native element carries the dialog semantics.
 *
 * `children` rather than a `<slot />`: Stencil derives light-DOM slot relocation from the JSX in the
 * element file, so each element supplies its own slot.
 */
export const DialogFC: FC<DialogFCProps> = (props, children) => {
	const { blockClass, class: hostClass, handleCancel, handleClose, label, labelledBy, modal, refDialog, width } = props;

	return (
		<dialog
			aria-label={labelledBy ? undefined : label}
			aria-labelledby={labelledBy}
			aria-modal={modal ? 'true' : 'false'}
			class={clsx(blockClass, hostClass)}
			onCancel={handleCancel}
			onClose={handleClose}
			ref={refDialog}
			style={width ? { width } : undefined}
		>
			{children}
		</dialog>
	);
};
