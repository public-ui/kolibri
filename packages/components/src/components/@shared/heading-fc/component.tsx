import clsx from 'clsx';
import type { FunctionalComponent as FC, JSX, VNode } from '@stencil/core';
import { h } from '@stencil/core';
import type { HeadingProps, HeadingVariantPropType } from '../../../schema';

function renderHeadline(props: { label?: string; variant?: HeadingVariantPropType; level?: number; children?: VNode[] }) {
	const validHeadline = typeof props.level === 'number' && props.level > 0 && props.level <= 6;
	const HeadlineTag = validHeadline ? `h${props.level}` : 'strong';
	const variant = props.variant || HeadlineTag;

	return (
		<HeadlineTag
			class={clsx({
				headline: true,
				[`headline-${variant}`]: true,
			})}
		>
			{props.label}
			{props.children}
		</HeadlineTag>
	);
}

function renderSecondaryHeadline(headline?: string, level?: number): JSX.Element | null {
	if (!headline) {
		return null;
	}

	switch (level) {
		case 1: // if the headline is only strong
			return <span class="secondary-headline">{headline}</span>;
		case 2: // if the headline is h1
			return <h2 class="secondary-headline">{headline}</h2>;
		case 3: // if the headline is h2
			return <h3 class="secondary-headline">{headline}</h3>;
		case 4: // if the headline is h3
			return <h4 class="secondary-headline">{headline}</h4>;
		case 5: // if the headline is h4
			return <h5 class="secondary-headline">{headline}</h5>;
		case 6: // if the headline is h5
			return <h6 class="secondary-headline">{headline}</h6>;
		default: // if the headline is h6
			return <strong class="secondary-headline">{headline}</strong>;
	}
}

const KolHeadingFc: FC<HeadingProps> = ({ _secondaryHeadline, _label, _level = 1 }, children) => {
	return (
		<section class="kol-heading-wc" style={{ display: 'inline' }}>
			{_secondaryHeadline ? (
				<hgroup>
					{renderHeadline({ label: _label, level: _level, children })}
					{renderSecondaryHeadline(_secondaryHeadline, _level + 1)}
				</hgroup>
			) : (
				renderHeadline({ label: _label, level: _level, children })
			)}
		</section>
	);
};

export default KolHeadingFc;
