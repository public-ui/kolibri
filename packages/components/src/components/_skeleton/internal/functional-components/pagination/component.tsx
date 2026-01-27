import type { FunctionalComponent as FC, JSX } from '@stencil/core';
import { Fragment, h } from '@stencil/core';

import { KolButtonWcTag, KolSelectWcTag } from '../../../../../core/component-names';
import { translate } from '../../../../../i18n';
import { nonce } from '../../../../../utils/dev.utils';
import type { FunctionalComponentProps } from '../generic-types';
import type { PaginationApi } from './api';

const leftDoubleArrowIcon = {
	left: 'kolicon-chevron-double-left',
};
const leftSingleArrow = {
	left: 'kolicon-chevron-left',
};
const rightSingleArrowIcon = {
	right: 'kolicon-chevron-right',
};
const rightDoubleArrowIcon = {
	right: 'kolicon-chevron-double-right',
};

const getUserLanguage = (): string => {
	const userLanguage = navigator.language || 'de-DE';
	return userLanguage.includes('-') ? userLanguage : `${userLanguage}-${userLanguage.toUpperCase()}`;
};
const NUMBER_FORMATTER = new Intl.NumberFormat(getUserLanguage(), {
	style: 'decimal',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
});

type PaginationFCProps = FunctionalComponentProps<PaginationApi> & {
	instanceId: string;
	translateEntriesPerSite: string;
	translatePage: string;
	translatePageBack: string;
	translatePageFirst: string;
	translatePageLast: string;
	translatePageNext: string;
};

const calcCount = (total: number, pageSize = 1): number => Math.ceil(total / pageSize);

const getPageStart = (page: number, pageSize: number): string => (page - 1) * pageSize + 1 + '';

const getPageEnd = (page: number, pageSize: number): string => page * pageSize + '';

const getUnselectedPageButton = (
	page: number,
	customClass: PaginationFCProps['customClass'],
	handleSelectPage: PaginationFCProps['handleSelectPage'],
	translatePage: string,
): JSX.Element => {
	const pageText = NUMBER_FORMATTER.format(page);
	const ariaDescription = `${translatePage} ${pageText}`;
	return (
		<li key={nonce()}>
			<KolButtonWcTag
				class="kol-pagination__button"
				_ariaDescription={ariaDescription}
				_customClass={customClass}
				_label={pageText}
				_on={{
					onClick: (event: Event) => {
						handleSelectPage(event, page);
					},
				}}
			></KolButtonWcTag>
		</li>
	);
};

const getSelectedPageButton = (page: number, customClass: PaginationFCProps['customClass'], translatePage: string): JSX.Element => {
	const pageText = NUMBER_FORMATTER.format(page);
	const ariaDescription = `${translatePage} ${pageText}`;
	return (
		<li key={nonce()}>
			<KolButtonWcTag
				aria-current="page"
				class="kol-pagination__button kol-pagination__button--selected selected"
				_ariaDescription={ariaDescription}
				_customClass={customClass}
				_disabled={true}
				_label={pageText}
			></KolButtonWcTag>
		</li>
	);
};

export const PaginationFC: FC<PaginationFCProps> = ({
	boundaryCount,
	customClass,
	hasButtons,
	instanceId,
	label,
	handleChangePageSize,
	handleGoBackward,
	handleGoForward,
	handleGoToEnd,
	handleGoToFirst,
	handleSelectPage,
	max,
	page,
	pageSize,
	pageSizeOptions,
	siblingCount,
	tooltipAlign,
	translateEntriesPerSite,
	translatePage,
	translatePageBack,
	translatePageFirst,
	translatePageLast,
	translatePageNext,
}): JSX.Element => {
	const count = calcCount(max, pageSize);
	let ellipsis = false;
	const pageButtons = Array.from(Array(count).keys())
		.map((index: number) => index + 1)
		.map((pageNumber: number) => {
			if (pageNumber <= boundaryCount || pageNumber > count - boundaryCount || (pageNumber >= page - siblingCount && pageNumber <= page + siblingCount)) {
				ellipsis = true;
				if (page === pageNumber) {
					return getSelectedPageButton(pageNumber, customClass, translatePage);
				}
				return getUnselectedPageButton(pageNumber, customClass, handleSelectPage, translatePage);
			}
			if (ellipsis) {
				ellipsis = false;
				return (
					<li key={nonce()}>
						<span class="kol-pagination__separator" aria-hidden="true"></span>
					</li>
				);
			}
			return null;
		});

	return (
		<Fragment>
			<span role="status" aria-live="polite">
				{translate('kol-table-visible-range', {
					placeholders: {
						start: getPageStart(page, pageSize),
						end: getPageEnd(page, pageSize),
						total: max.toString(),
					},
				})}
			</span>
			<nav class="kol-pagination__navigation" aria-label={label}>
				<ul class="kol-pagination__navigation-list">
					{hasButtons.first && (
						<li>
							<KolButtonWcTag
								class="kol-pagination__button kol-pagination__button--first"
								exportparts="icon"
								_customClass={customClass}
								_disabled={page <= 1}
								_icons={leftDoubleArrowIcon}
								_hideLabel
								_label={translatePageFirst}
								_on={{
									onClick: handleGoToFirst,
								}}
								_tooltipAlign={tooltipAlign}
							></KolButtonWcTag>
						</li>
					)}
					{hasButtons.previous && (
						<li>
							<KolButtonWcTag
								class="kol-pagination__button kol-pagination__button--previous"
								exportparts="icon"
								_customClass={customClass}
								_disabled={page <= 1}
								_icons={leftSingleArrow}
								_hideLabel
								_label={translatePageBack}
								_on={{
									onClick: handleGoBackward,
								}}
								_tooltipAlign={tooltipAlign}
							></KolButtonWcTag>
						</li>
					)}
					{pageButtons}
					{hasButtons.next && (
						<li>
							<KolButtonWcTag
								class="kol-pagination__button kol-pagination__button--next"
								exportparts="icon"
								_customClass={customClass}
								_disabled={count <= page}
								_icons={rightSingleArrowIcon}
								_hideLabel
								_label={translatePageNext}
								_on={{
									onClick: handleGoForward,
								}}
								_tooltipAlign={tooltipAlign}
							></KolButtonWcTag>
						</li>
					)}
					{hasButtons.last && (
						<li>
							<KolButtonWcTag
								class="kol-pagination__button kol-pagination__button--last"
								exportparts="icon"
								_customClass={customClass}
								_disabled={count <= page}
								_icons={rightDoubleArrowIcon}
								_hideLabel
								_label={translatePageLast}
								_on={{
									onClick: handleGoToEnd,
								}}
								_tooltipAlign={tooltipAlign}
							></KolButtonWcTag>
						</li>
					)}
				</ul>
			</nav>
			{pageSizeOptions.length > 0 && (
				<div class="page-size">
					<KolSelectWcTag
						class="kol-pagination__page-size-select"
						_id={`pagination-size-${instanceId}`}
						_label={translateEntriesPerSite}
						_options={pageSizeOptions}
						_on={{
							onChange: handleChangePageSize,
						}}
						_value={pageSize}
					/>
				</div>
			)}
		</Fragment>
	);
};
