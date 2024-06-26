import type { DrawerProps, DrawerStates } from '../../../schema';
import { mixMembers } from 'stencil-awesome-test';
// import { showExpertSlot } from '../../../schema';
// import { KolButtonTag, KolLinkTag } from '../../../core/component-names';

export const getDrawerHtml = (props: DrawerProps): string => {
	const state = mixMembers<DrawerProps, DrawerStates>(
		{
			_label: '', // ⚠ required
			_open: false,
			_modal: false,
			_align: 'top',
		},
		props,
	);
	const isOpen = state._open;
	return `
		<kol-drawer class=\"drawer ${state._modal ? 'drawer--modal' : ''} ${isOpen ? 'drawer--open' : ''} kol-drawer\">
			<mock:shadow-root>
				<dialog class=\"drawer__dialog\">
					<div aria-label=\"${state._label}\" class=\"drawer__wrapper ${state._align ? `drawer__wrapper--${state._align}` : ''}\">
						<div class=\"drawer__content\">
							<slot></slot>
						</div>
					</div>
				</dialog>
			</mock:shadow-root>
		</kol-drawer>
	`;
};
