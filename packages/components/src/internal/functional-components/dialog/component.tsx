import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';
import type { ModalVariantPropType } from '../../../schema/props/variant/modal';
import clsx from '../../../utils/clsx';
import { BemRootNodeFC } from '../bem-root-node/component';
import type { FunctionalComponentProps } from '../generic-types';
import type { DialogApi } from './api';

const dialogBem = bem.forBlock('kol-dialog');
const modalBem = bem.forBlock('kol-modal');

export type DialogFCProps = Pick<FunctionalComponentProps<DialogApi>, 'class' | 'handleCancel' | 'handleClose' | 'label' | 'modal' | 'refDialog'> & {
	/**
	 * DOM id of the heading that labels the dialog. Without one the dialog falls back to
	 * `aria-label`, which is what the blank variant needs: it renders no heading.
	 */
	labelledBy?: string;
	/** Width of the dialog. Left unset, the dialog keeps its intrinsic size. */
	width?: string;
} & (
		| {
				/**
				 * Variant of a dialog that is the root of `kol-dialog`: the root carries the block `kol-dialog`,
				 * the deprecated `kol-modal` alias and the variant of both as an element-style suffix. Every
				 * theme addresses all four names.
				 */
				variant: ModalVariantPropType;
				elementClass?: never;
		  }
		| {
				/**
				 * Element class of a dialog inside another block, e.g. `kol-drawer__dialog`. Every theme styles
				 * it differently from `kol-dialog`, so it carries none of the dialog classes.
				 */
				elementClass: string;
				variant?: never;
		  }
	);

/**
 * The native `<dialog>` shell, shared by `kol-dialog`, the deprecated `kol-modal`, `kol-drawer` and
 * the settings menu of the table.
 *
 * It owns the element that provides `showModal()`, the top layer and the backdrop — and nothing
 * else. What the dialog contains is the consumer's composition, handed in as children: the dialog
 * renders its card or blank contents, the drawer its sliding wrapper around a card.
 *
 * `children` rather than a `<slot />`: Stencil derives light-DOM slot relocation from the JSX in the
 * element file, so each element supplies its own slot.
 */
export const DialogFC: FC<DialogFCProps> = (props, children) => {
	const { class: hostClass, elementClass, handleCancel, handleClose, label, labelledBy, modal, refDialog, variant, width } = props;

	if (variant !== undefined) {
		return (
			<BemRootNodeFC
				component="dialog"
				aria-label={labelledBy ? undefined : label}
				aria-labelledby={labelledBy}
				aria-modal={modal ? 'true' : 'false'}
				block="kol-dialog"
				class={clsx(modalBem(), dialogBem(variant), modalBem(variant), hostClass)}
				onCancel={handleCancel}
				onClose={handleClose}
				ref={refDialog}
				style={width ? { width } : undefined}
			>
				{children}
			</BemRootNodeFC>
		);
	}

	return (
		<dialog
			aria-label={labelledBy ? undefined : label}
			aria-labelledby={labelledBy}
			aria-modal={modal ? 'true' : 'false'}
			class={clsx(elementClass, hostClass)}
			onCancel={handleCancel}
			onClose={handleClose}
			ref={refDialog}
			style={width ? { width } : undefined}
		>
			{children}
		</dialog>
	);
};
