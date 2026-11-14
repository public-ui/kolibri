import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import type { FunctionalComponentProps } from '../../../../internals/src/controller/generic-types';
import type { SkipNavApi } from '../../../../internals/src/controller/skip-nav/api';
import { bem } from '../../../../internals/src/schema/bem-registry';
import { LinkFC } from '../link/component';

const skipNavBem = bem.forBlock('kol-skip-nav');
const BEM_CLASS_SKIP_NAV = skipNavBem();
const BEM_CLASS_SKIP_NAV__LIST = skipNavBem('list');
const BEM_CLASS_SKIP_NAV__LIST_ITEM = skipNavBem('list-item');

export const SkipNavFC: FC<FunctionalComponentProps<SkipNavApi>> = ({ label, linkItems }) => {
	return (
		<nav class={BEM_CLASS_SKIP_NAV} aria-label={label}>
			<ul class={BEM_CLASS_SKIP_NAV__LIST}>
				{linkItems.map((item, index) => (
					<li class={BEM_CLASS_SKIP_NAV__LIST_ITEM} key={index}>
						<LinkFC {...item.fcProps}></LinkFC>
					</li>
				))}
			</ul>
		</nav>
	);
};
