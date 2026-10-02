import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { KolButtonWcTag, KolSelectWcTag } from '../../../core/component-names';
import { translate } from '../../../i18n';
import { bem } from '../../../schema/bem-registry';
import { nonce } from '../../../utils/dev.utils';
import { BemRootNodeFC } from '../bem-root-node/component';
import type { FunctionalComponentProps } from '../generic-types';
import type { PaginationApi } from './api';
import { getPageCount, getPageItems, getVisibleRange } from './model';

const paginationBem = bem.forBlock('kol-pagination');

const leftDoubleArrowIcon = { left: 'kolicon-chevron-double-left' };
const leftSingleArrowIcon = { left: 'kolicon-chevron-left' };
const rightSingleArrowIcon = { right: 'kolicon-chevron-right' };
const rightDoubleArrowIcon = { right: 'kolicon-chevron-double-right' };

const userLanguage = ((language: string) => (language.includes('-') ? language : `${language}-${language.toUpperCase()}`))(navigator.language || 'de-DE');
const NUMBER_FORMATTER = new Intl.NumberFormat(userLanguage, {
	style: 'decimal',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
});

export type NavigationPosition = 'first' | 'last' | 'next' | 'previous';

export type PaginationFCProps = FunctionalComponentProps<PaginationApi> & {
	/**
	 * The `_on` objects of the navigation buttons. They keep their identity across renders, so a
	 * re-render of the pagination does not re-render the navigation buttons.
	 */
	navigationCallbacks: Record<NavigationPosition, { onClick: (event: Event) => void }>;
};

/**
 * The content of the pagination: the visible range, the navigation and the page size select. The page
 * and navigation buttons stay `kol-button-wc` and the select stays `kol-select-wc`, because the themes
 * select `.kol-pagination__button… .kol-button…` and `.kol-pagination__page-size-select
 * .kol-form-field-select` as ancestors.
 */
export const PaginationContentFC: FC<PaginationFCProps> = ({
	boundaryCount,
	customClass,
	handlePageClick,
	handlePageSizeChange,
	hasButtons,
	label,
	max,
	navigationCallbacks,
	page,
	pageSize,
	pageSizeOptions,
	siblingCount,
	tooltipAlign,
}) => {
	const count = getPageCount(max, pageSize);
	const { start, end } = getVisibleRange(page, pageSize, max);
	const navigationButton = (position: NavigationPosition, icons: Record<string, string>, buttonLabel: string, disabled: boolean) => (
		<li>
			<KolButtonWcTag
				class={paginationBem('button', { [position]: true })}
				_customClass={customClass}
				_disabled={disabled}
				_icons={icons}
				_hideLabel
				_label={buttonLabel}
				_on={navigationCallbacks[position]}
				_tooltipAlign={tooltipAlign}
			></KolButtonWcTag>
		</li>
	);
	const pageButton = (item: number, selected: boolean) => {
		const pageText = NUMBER_FORMATTER.format(item);
		const ariaDescription = `${translate('kol-page')} ${pageText}`;
		return (
			<li key={nonce()}>
				{selected ? (
					<KolButtonWcTag
						aria-current="page"
						class={`${paginationBem('button', { selected: true })} selected`}
						_ariaDescription={ariaDescription}
						_customClass={customClass}
						_label={pageText}
					></KolButtonWcTag>
				) : (
					<KolButtonWcTag
						class={paginationBem('button', { numbers: true })}
						_ariaDescription={ariaDescription}
						_customClass={customClass}
						_label={pageText}
						_on={{ onClick: (event: Event) => handlePageClick(event, item) }}
					></KolButtonWcTag>
				)}
			</li>
		);
	};

	return [
		<span role="status" aria-live="polite" class={paginationBem('entries')}>
			{translate('kol-table-visible-range', {
				placeholders: {
					start: NUMBER_FORMATTER.format(start),
					end: NUMBER_FORMATTER.format(end),
					total: NUMBER_FORMATTER.format(max),
				},
			})}
		</span>,
		<nav class={paginationBem('navigation')} aria-label={label}>
			<ul class={paginationBem('navigation-list')}>
				{hasButtons.first && navigationButton('first', leftDoubleArrowIcon, translate('kol-page-first'), page <= 1)}
				{hasButtons.previous && navigationButton('previous', leftSingleArrowIcon, translate('kol-page-back'), page <= 1)}
				{getPageItems(page, count, boundaryCount, siblingCount).map((item) =>
					item === null ? null : item === 'separator' ? (
						<li key={nonce()}>
							<span class={paginationBem('separator')} aria-hidden="true"></span>
						</li>
					) : (
						pageButton(item.page, item.selected)
					),
				)}
				{hasButtons.next && navigationButton('next', rightSingleArrowIcon, translate('kol-page-next'), count <= page)}
				{hasButtons.last && navigationButton('last', rightDoubleArrowIcon, translate('kol-page-last'), count <= page)}
			</ul>
		</nav>,
		pageSizeOptions?.length > 0 && (
			<div class="page-size">
				<KolSelectWcTag
					class={paginationBem('page-size-select')}
					_label={translate('kol-entries-per-site')}
					_options={pageSizeOptions}
					_on={{ onChange: handlePageSizeChange }}
					_value={pageSize}
				/>
			</div>
		),
	];
};

/** The pagination in its own root node, for `kol-pagination`. */
export const PaginationFC: FC<PaginationFCProps> = (props) => (
	<BemRootNodeFC block="kol-pagination">
		<PaginationContentFC {...props} />
	</BemRootNodeFC>
);
