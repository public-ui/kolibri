import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';
import type { CardFCProps } from '../card/component';
import { CardFC } from '../card/component';
import { DialogFC } from '../dialog/component';
import type { FunctionalComponentProps } from '../generic-types';
import type { DrawerApi } from './api';

const drawerBem = bem.forBlock('kol-drawer');
const BEM_CLASS_DRAWER__CONTENT = drawerBem('content');
const BEM_CLASS_DRAWER__DIALOG = drawerBem('dialog');

export type DrawerFCProps = FunctionalComponentProps<DrawerApi> & {
	/** The card's fully resolved `CardFC` props, assembled by the web component. */
	cardProps: CardFCProps;
};

/**
 * A drawer is a dialog whose contents slide in from one edge of the viewport, so it renders
 * `DialogFC` for the native `<dialog>` and `CardFC` for its heading, content area and close button.
 *
 * Between the two sits the wrapper: it carries the block's own element class and the edge and open
 * modifiers, and it is the element the themes animate. It stays a node of its own rather than
 * merging its class onto the card's `<article>` — themes reach the card through it
 * (`.kol-drawer__wrapper .kol-card`), which a merge would turn into a selector that no longer
 * matches.
 *
 * `children` rather than a `<slot />`: Stencil derives light-DOM slot relocation from the JSX in
 * the element file, so the element supplies its own slot.
 */
export const DrawerFC: FC<DrawerFCProps> = (props, children) => {
	const { align, cardProps, expanded, handleAnimationEnd, handleCancel, handleClose, headingId, label, modal, refDialog, refWrapper } = props;

	return (
		<DialogFC
			blockClass={BEM_CLASS_DRAWER__DIALOG}
			handleCancel={handleCancel}
			handleClose={handleClose}
			label={label}
			labelledBy={headingId}
			modal={modal}
			refDialog={refDialog}
		>
			<div class={drawerBem('wrapper', { [align]: true, 'is-closing': !expanded, open: expanded })} onAnimationEnd={handleAnimationEnd} ref={refWrapper}>
				<CardFC {...cardProps}>
					<div class={BEM_CLASS_DRAWER__CONTENT}>{children}</div>
				</CardFC>
			</div>
		</DialogFC>
	);
};
