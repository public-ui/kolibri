import type { FunctionalComponent as FC, JSX } from '@stencil/core';
import { h } from '@stencil/core';

import { translate } from '../../../i18n';
import type { InternalButtonProps } from '../../../schema';
import { bem } from '../../../schema/bem-registry';
import { nonce } from '../../../utils/dev.utils';
import { BemRootNodeFC } from '../bem-root-node/component';
import { ButtonFC } from '../button/component';
import type { ButtonItemFcProps, ButtonItemRootAttributes } from '../button/item';
import type { FunctionalComponentProps } from '../generic-types';
import type { PaginationApi } from './api';
import { getPageCount, getPageItems, getVisibleRange } from './model';
import type { PageSizeSelectInput } from './page-size-select';

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
	/** `ButtonFC` props of the page or navigation button `key`; the pagination item keeps one button item per key. */
	getButtonFcProps: (key: string, props: InternalButtonProps, rootAttributes?: ButtonItemRootAttributes) => ButtonItemFcProps;
	/** The page size select; the pagination item keeps it while it is rendered. */
	renderPageSizeSelect: (input: Omit<PageSizeSelectInput, 'on'>) => JSX.Element;
};

/** The content of the pagination: the visible range, the navigation and the page size select. */
export const PaginationContentFC: FC<PaginationFCProps> = ({
	boundaryCount,
	customClass,
	getButtonFcProps,
	handlePageClick,
	hasButtons,
	label,
	max,
	navigationCallbacks,
	page,
	pageSize,
	pageSizeOptions,
	renderPageSizeSelect,
	siblingCount,
	tooltipAlign,
}) => {
	const count = getPageCount(max, pageSize);
	const { start, end } = getVisibleRange(page, pageSize, max);
	const navigationButton = (position: NavigationPosition, icons: Record<string, string>, buttonLabel: string, disabled: boolean) => (
		<li>
			<ButtonFC
				{...getButtonFcProps(
					`navigation-${position}`,
					{
						_customClass: customClass,
						_disabled: disabled,
						_icons: icons,
						_hideLabel: true,
						_label: buttonLabel,
						_on: navigationCallbacks[position],
						_tooltipAlign: tooltipAlign,
					},
					{ class: paginationBem('button', { [position]: true }) },
				)}
			/>
		</li>
	);
	const pageButton = (item: number, selected: boolean) => {
		const pageText = NUMBER_FORMATTER.format(item);
		const ariaDescription = `${translate('kol-page')} ${pageText}`;
		return (
			<li key={nonce()}>
				{selected ? (
					<ButtonFC
						{...getButtonFcProps(
							`page-${item}`,
							{ _ariaDescription: ariaDescription, _customClass: customClass, _label: pageText },
							{ 'aria-current': 'page', class: `${paginationBem('button', { selected: true })} selected` },
						)}
					/>
				) : (
					<ButtonFC
						{...getButtonFcProps(
							`page-${item}`,
							{
								_ariaDescription: ariaDescription,
								_customClass: customClass,
								_label: pageText,
								_on: { onClick: (event: Event) => handlePageClick(event, item) },
							},
							{ class: paginationBem('button', { numbers: true }) },
						)}
					/>
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
				<div class={paginationBem('page-size-select')}>
					{renderPageSizeSelect({ label: translate('kol-entries-per-site'), options: pageSizeOptions, value: pageSize })}
				</div>
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
