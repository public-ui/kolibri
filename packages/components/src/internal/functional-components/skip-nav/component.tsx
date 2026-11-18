import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';
import { BemRootNodeFC } from '../bem-root-node/component';
import type { FunctionalComponentProps } from '../generic-types';
import { LinkFC } from '../link/component';
import type { SkipNavApi } from './api';

const skipNavBem = bem.forBlock('kol-skip-nav');
const BEM_CLASS_SKIP_NAV__LIST = skipNavBem('list');
const BEM_CLASS_SKIP_NAV__LIST_ITEM = skipNavBem('list-item');

export const SkipNavFC: FC<FunctionalComponentProps<SkipNavApi>> = ({ label, linkItems }) => {
	return (
		<BemRootNodeFC component="nav" block="kol-skip-nav" aria-label={label}>
			<ul class={BEM_CLASS_SKIP_NAV__LIST}>
				{linkItems.map((item, index) => (
					<li class={BEM_CLASS_SKIP_NAV__LIST_ITEM} key={index}>
						<LinkFC {...item.fcProps}></LinkFC>
					</li>
				))}
			</ul>
		</BemRootNodeFC>
	);
};
