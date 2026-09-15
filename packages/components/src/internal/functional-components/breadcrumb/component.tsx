import type { FunctionalComponent as FC } from '@stencil/core';
import { Fragment, h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';
import type { FunctionalComponentProps } from '../generic-types';
import { IconFC } from '../icon/component';
import { LinkFC } from '../link/component';
import type { BreadcrumbApi } from './api';
import type { BreadcrumbLinkItem } from './link-item';

const breadcrumbBem = bem.forBlock('kol-breadcrumb');
const BEM_CLASS_BREADCRUMB = breadcrumbBem();
const BEM_CLASS_BREADCRUMB__ICON = breadcrumbBem('icon');
const BEM_CLASS_BREADCRUMB__LINK = breadcrumbBem('link');
const BEM_CLASS_BREADCRUMB__LIST = breadcrumbBem('list');
const BEM_CLASS_BREADCRUMB__LIST_ELEMENT = breadcrumbBem('list-element');
const BEM_CLASS_BREADCRUMB__LIST_ELEMENT_SPAN = breadcrumbBem('list-element-span');
const BEM_CLASS_BREADCRUMB__SEPARATOR = breadcrumbBem('separator');

/**
 * Historic literal from the predecessor's empty-state icon. Deliberately not a BEM element
 * class (single underscore) — kept byte-identical so descendant selectors keep matching.
 */
const CLASS_BREADCRUMB_EMPTY_STATE_ICON = 'kol-breadcrumb_icon';

/**
 * Renders one breadcrumb entry: all links except the last one are interactive `LinkFC`
 * instances (props orchestrated per entry by the web component — full link surface including
 * tooltip behavior, aria-current and click events), the last one is the current page span.
 */
const renderLink = (item: BreadcrumbLinkItem, index: number, lastIndex: number, showCurrentPage: boolean) => {
	const showSeparator = showCurrentPage ? index !== lastIndex : index < lastIndex - 1;

	if (index === lastIndex && !showCurrentPage) {
		return <Fragment></Fragment>;
	}

	const { link } = item;

	return (
		<li class={BEM_CLASS_BREADCRUMB__LIST_ELEMENT} key={index}>
			{index === lastIndex ? (
				<span class={BEM_CLASS_BREADCRUMB__LIST_ELEMENT_SPAN} aria-current="page">
					{link._hideLabel ? (
						<IconFC class={BEM_CLASS_BREADCRUMB__ICON} icons={typeof link._icons === 'string' ? link._icons : 'kolicon-link'} label={link._label} />
					) : (
						<>{link._label}</>
					)}
				</span>
			) : (
				<div class={BEM_CLASS_BREADCRUMB__LINK}>
					<LinkFC {...item.fcProps}></LinkFC>
				</div>
			)}
			{showSeparator && <IconFC class={BEM_CLASS_BREADCRUMB__SEPARATOR} icons="kolicon-chevron-right" label="" />}
		</li>
	);
};

export const BreadcrumbFC: FC<FunctionalComponentProps<BreadcrumbApi>> = ({ label, linkItems, showCurrentPage }) => {
	const lastIndex = linkItems.length - 1;

	return (
		<nav class={BEM_CLASS_BREADCRUMB} aria-label={label}>
			<ul class={BEM_CLASS_BREADCRUMB__LIST}>
				{linkItems.length === 0 && (
					<li>
						<IconFC class={CLASS_BREADCRUMB_EMPTY_STATE_ICON} icons="kolicon-house" label="" />…
					</li>
				)}
				{linkItems.map((item, index) => renderLink(item, index, lastIndex, showCurrentPage))}
			</ul>
		</nav>
	);
};
