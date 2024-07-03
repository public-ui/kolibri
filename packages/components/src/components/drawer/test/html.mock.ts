import type { DrawerProps, DrawerStates } from '../../../schema';
import { mixMembers } from 'stencil-awesome-test';

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
	const align = state._align;
	const isOpen = state._open;
	return `
		<kol-drawer class="drawer ${state._modal ? 'drawer--modal' : ''} kol-drawer">
			<mock:shadow-root>
				<dialog class="drawer__dialog">
					<div aria-label="${state._label}" class="drawer__wrapper drawer__wrapper--${align} ${isOpen ? 'drawer__wrapper--open' : 'is-closing'}">
						<div class="drawer__content">
							<slot></slot>
						</div>
					</div>
				</dialog>
			</mock:shadow-root>
		</kol-drawer>
	`;
};
