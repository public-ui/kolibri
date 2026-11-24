import type { FunctionalComponent as FC, VNode } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';
import type { PaginationPositionPropType } from '../../../schema/props';
import type { PaginationFCProps } from '../pagination/component';
import { PaginationFC } from '../pagination/component';

const tableStatefulBem = bem.forBlock('kol-table-stateful');

type TableStatefulFCProps = {
	/** The pagination below the table; omitted when the position excludes it. */
	paginationBottom?: PaginationFCProps;
	paginationPosition: PaginationPositionPropType;
	/** The pagination above the table; omitted when the position excludes it. */
	paginationTop?: PaginationFCProps;
};

const renderPagination = (props: PaginationFCProps | undefined, paginationPosition: PaginationPositionPropType): VNode[] =>
	props
		? [
				<div class={tableStatefulBem('pagination', { [paginationPosition]: true })}>
					<div class={tableStatefulBem('pagination-wrapper')}>
						<PaginationFC {...props} />
					</div>
				</div>,
			]
		: [];

/**
 * Renders the stateless table (`children`) between the optional paginations, directly in the shadow
 * root. Only the pagination elements use the block `kol-table-stateful`: its block class is on the host,
 * and a shadow DOM node with the block class itself would activate theme rules written for the host.
 */
export const TableStatefulFC: FC<TableStatefulFCProps> = ({ paginationBottom, paginationPosition, paginationTop }, children) => [
	...renderPagination(paginationTop, paginationPosition),
	...children,
	...renderPagination(paginationBottom, paginationPosition),
];
