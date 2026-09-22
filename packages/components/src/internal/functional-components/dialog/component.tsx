import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';
import clsx from '../../../utils/clsx';
import type { CardFCProps } from '../card/component';
import { CardFC } from '../card/component';
import type { FunctionalComponentProps } from '../generic-types';
import type { DialogApi } from './api';

const dialogBem = bem.forBlock('kol-dialog');
const modalBem = bem.forBlock('kol-modal');

type DialogFCProps = FunctionalComponentProps<DialogApi> & {
	/** The card variant's fully resolved `CardFC` props, assembled by the web component. */
	cardProps: CardFCProps;
};

/**
 * Root from `bem.forBlock`, not `BemRootNodeFC`: the dialog's root is the native `<dialog>` that
 * owns `showModal()`, the top layer and the backdrop, and `BemRootNodeFC` always renders a `<div>`.
 *
 * The root carries the block class of both `kol-dialog` and the deprecated `kol-modal`, plus the
 * variant as an element-style suffix. Every theme addresses those four class names, so they are
 * rendered verbatim.
 *
 * `children` rather than a `<slot />`: Stencil derives light-DOM slot relocation from the JSX in
 * the element file, so each element supplies its own slot.
 */
export const DialogFC: FC<DialogFCProps> = (props, children) => {
	const { cardProps, class: hostClass, handleCancel, handleClose, headingId, label, modal, refDialog, variant, width } = props;
	const isCard = variant === 'card';

	return (
		<dialog
			aria-label={isCard ? undefined : label}
			aria-labelledby={isCard ? headingId : undefined}
			aria-modal={modal ? 'true' : 'false'}
			class={clsx(dialogBem(), modalBem(), dialogBem(variant), modalBem(variant), hostClass)}
			onCancel={handleCancel}
			onClose={handleClose}
			ref={refDialog}
			style={{ width }}
		>
			{isCard ? <CardFC {...cardProps}>{children}</CardFC> : children}
		</dialog>
	);
};
