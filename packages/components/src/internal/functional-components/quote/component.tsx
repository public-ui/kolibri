import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import type { FunctionalComponentProps } from '../../../../internals/src/controller/generic-types';
import { resolveFcProps } from '../../../../internals/src/controller/props-from-config';
import { quotePropsConfig, type QuoteApi } from '../../../../internals/src/controller/quote/api';
import { KolLinkTag } from '../../../../internals/src/core/component-names';
import { bem } from '../../../../internals/src/schema/bem-registry';

const quoteBem = bem.forBlock('kol-quote');
const BEM_CLASS_QUOTE__BLOCKQUOTE = quoteBem('blockquote');
const BEM_CLASS_QUOTE__CITE = quoteBem('cite');
const BEM_CLASS_QUOTE__FIGCAPTION = quoteBem('figcaption');
const BEM_CLASS_QUOTE__QUOTE = quoteBem('quote');

export const QuoteFC: FC<FunctionalComponentProps<QuoteApi>> = (props) => {
	const { href, label, quote, variant } = resolveFcProps(quotePropsConfig, props);
	const hasExpertSlot = quote === '';
	const BEM_CLASS_ROOT = quoteBem({ [variant]: true });
	return (
		<figure class={BEM_CLASS_ROOT}>
			{variant === 'block' ? (
				<blockquote class={BEM_CLASS_QUOTE__BLOCKQUOTE} cite={href}>
					{quote}
					<span aria-hidden={!hasExpertSlot ? 'true' : undefined} hidden={!hasExpertSlot}>
						<slot name="expert" />
					</span>
				</blockquote>
			) : (
				<q class={BEM_CLASS_QUOTE__QUOTE} cite={href}>
					{quote}
					<span aria-hidden={!hasExpertSlot ? 'true' : undefined} hidden={!hasExpertSlot}>
						<slot name="expert" />
					</span>
				</q>
			)}
			{!!label && (
				<figcaption class={BEM_CLASS_QUOTE__FIGCAPTION}>
					<cite class={BEM_CLASS_QUOTE__CITE}>
						<KolLinkTag _href={href} _label={label} _target="_blank" />
					</cite>
				</figcaption>
			)}
		</figure>
	);
};
