import type { DrawerProps, DrawerStates } from '../../../schema';
import { mixMembers } from 'stencil-awesome-test';
// import { showExpertSlot } from '../../../schema';
// import { KolButtonTag, KolLinkTag } from '../../../core/component-names';

export const getDrawerHtml = (props: DrawerProps): string => {
	const state = mixMembers<DrawerProps, DrawerStates>(
		{
			_label: '', // ⚠ required
			_open: true
		},
		props,
	);

	return `
		<kol-drawer class=\"kol-drawer left\">
			<mock:shadow-root>
				<dialog ${state._open ? "open" : ""}>
					<div aria-label=\"Label\" class=\"drawer-wrapper\">
						<div class=\"drawer-content\">
							<slot></slot>
						</div>
					</div>
				</dialog>
			</mock:shadow-root>
		</kol-drawer>
	`;
};
