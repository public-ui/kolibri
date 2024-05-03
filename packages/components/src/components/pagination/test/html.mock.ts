import type { PaginationProps, PaginationStates } from '@public-ui/schema';
import { mixMembers } from 'stencil-awesome-test';
import { translate } from '../../../i18n';
import { JSX } from '@stencil/core';

export const getPaginationHtml = (props: PaginationProps): string => {
	const state = mixMembers<PaginationProps, PaginationStates>(
		{
			_boundaryCount: 1,
			_label: translate('kol-pagination'),
			_hasButtons: {
				first: true,
				last: true,
				next: true,
				previous: true,
			},
			_on: {
				onClick: () => null,
			},
			_page: 0,
			_pageSize: 1,
			_pageSizeOptions: [],
			_siblingCount: 1,
			_max: 0,
		},
		props,
	);

	function getUnselectedPageButton(page: number): JSX.Element {
		return `<li >
				<kol-button-wc
					exportparts="icon"
					${state._customClass ? `_customClass="${state._customClass}" ` : ''}
					_label=""
				>
					<span slot="expert">
						<span class="visually-hidden">${translate('kol-page')}</span> ${page}
					</span>
				</kol-button-wc>
			</li>`;
	}

	function getSelectedPageButton(page: number): JSX.Element {
		return `<li >
				<kol-button-wc class="selected" ${state._customClass ? `_customClass="${state._customClass}" ` : ''} _disabled="" _label="">
					<span slot="expert">
						<span class="visually-hidden">${translate('kol-page')}</span> ${page}
					</span>
				</kol-button-wc>
			</li>`;
	}

	const count = Math.ceil(state._max / state._pageSize ?? 1);
	if (count > 0) {
		if (state._page > count) {
			state._page = count;
		} else if (state._page < 1) {
			state._page = 1;
		}
	}
	let ellipsis = false;

	return `
<kol-pagination class="kol-pagination">
  <mock:shadow-root>
	     <nav aria-label="${props._label ? props._label : 'kol-pagination'}">
           <ul class="navigation-list">
					 ${
							state._hasButtons.first
								? `<li>
							<kol-button-wc
								class="first"
								exportparts="icon"
								${state._customClass ? `_customClass="${state._customClass}" ` : ''}
								${state._page <= 1 ? `_disabled="" ` : ''}
								_hideLabel=""
								_label="${translate('kol-page-first')}"
								${state._tooltipAlign ? `_tooltipalign="${state._tooltipAlign}" ` : ' _tooltipalign="top" '}
							></kol-button-wc>
						</li>`
								: ''
						}
					${
						state._hasButtons.previous
							? `<li>
							<kol-button-wc
								class="previous"
								exportparts="icon"
								${state._customClass ? `_customClass="${state._customClass}" ` : ''}
								${state._page <= 1 ? `_disabled="" ` : ''}
								_hideLabel=""
								_label="${translate('kol-page-back')}"
								${state._tooltipAlign ? `_tooltipalign="${state._tooltipAlign}" ` : ' _tooltipalign="top" '}
							></kol-button-wc>
						</li>`
							: ''
					}

             ${Array.from(Array(count).keys())
								.map((index: number) => index + 1)
								.map((page: number) => {
									if (
										page <= state._boundaryCount ||
										page > count - state._boundaryCount ||
										(page >= state._page - state._siblingCount && page <= state._page + state._siblingCount)
									) {
										ellipsis = true;
										if (state._page === page) {
											return getSelectedPageButton(page);
										} else {
											return getUnselectedPageButton(page);
										}
									} else if (ellipsis === true) {
										ellipsis = false;
										return `<li>
												<span class="separator" aria-hidden="true"></span>
											</li>`;
									} else {
										return null;
									}
								})
								.join('')}

								${
									state._hasButtons.next
										? `<li>
									<kol-button-wc
										class="next"
										exportparts="icon"
										${state._customClass ? `_customClass="${state._customClass}" ` : ''}
										${count <= state._page ? `_disabled="" ` : ''}
										_hideLabel=""
										_label="${translate('kol-page-next')}"
										${state._tooltipAlign ? `_tooltipalign="${state._tooltipAlign}" ` : ' _tooltipalign="top" '}
									></kol-button-wc>
								</li>`
										: ''
								}
							${
								state._hasButtons.last
									? `<li>
									<kol-button-wc
										class="last"
										exportparts="icon"
										${state._customClass ? `_customClass="${state._customClass}" ` : ''}
										${count <= state._page ? `_disabled="" ` : ''}
										_hideLabel=""
										_label="${translate('kol-page-last')}"
										${state._tooltipAlign ? `_tooltipalign="${state._tooltipAlign}" ` : ' _tooltipalign="top" '}
									></kol-button-wc>
								</li>`
									: ''
							}
           </ul>
        </nav>
  </mock:shadow-root>
</kol-pagination>`;
};
