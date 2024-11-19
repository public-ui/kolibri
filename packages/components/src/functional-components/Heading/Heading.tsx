import { h, type FunctionalComponent as FC } from '@stencil/core';
import clsx from 'clsx';
import type { JSXBase } from '@stencil/core/internal';
import type { HeadingLevel, HeadingVariantPropType } from '../../schema';

type HGroupProps = JSXBase.HTMLAttributes<HTMLElement>;

// Define a base type for common props
type BaseProps = JSXBase.HTMLAttributes<HTMLHeadingElement | HTMLElement> & {
	level?: HeadingLevel;
};

// Define a type for the main headline props
type HeadlineProps = BaseProps & {
	variant?: HeadingVariantPropType;
};

// Define a type for the secondary headline props
type SecondaryHeadlineProps = BaseProps;

// Define a type for the main Heading component props
export type HeadingProps = HeadlineProps & {
	secondaryHeadline?: string;
	HeadingGroupProps?: HGroupProps;
	SecondaryHeadlineProps?: JSXBase.HTMLAttributes<HTMLHeadingElement | HTMLElement>;
};

const MIN_HEADING_LEVEL = 1;
const MAX_HEADING_LEVEL = 6;

// Define a union type for valid headline tags
type HeadlineTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'strong';
type SubHeadlineTag = 'span' | HeadlineTag;

/**
 * Checks if the given level is a valid heading level.
 * @param level - The heading level to check.
 * @returns True if the level is valid, false otherwise.
 */
function isValidHeadingLevel(level: number): boolean {
	return level >= MIN_HEADING_LEVEL && level <= MAX_HEADING_LEVEL;
}

/**
 * Returns the appropriate headline tag based on the level.
 * If the level is invalid, returns 'strong'.
 * @param level - The heading level.
 * @returns The corresponding headline tag.
 */
export function getHeadlineTag(level: HeadingLevel | number): HeadlineTag {
	return isValidHeadingLevel(level) ? (`h${level}` as HeadlineTag) : 'strong';
}

/**
 * Returns the appropriate sub-headline tag based on the level.
 * If the level is 1, returns 'span', otherwise returns the headline tag.
 * @param level - The heading level.
 * @returns The corresponding sub-headline tag.
 */
export function getSubHeadlineTag(level: HeadingLevel | number): SubHeadlineTag {
	return level === 1 ? 'span' : getHeadlineTag(level);
}

/**
 * Functional component for rendering a headline.
 * @param props - The properties for the headline component.
 * @param children - The children to render inside the headline.
 * @returns A VNode representing the headline.
 */
const KolHeadlineFc: FC<HeadlineProps> = ({ class: classNames, level = MIN_HEADING_LEVEL, variant, ...other }, children) => {
	const HeadlineTag = getHeadlineTag(level);
	const finalVariant = variant || HeadlineTag;

	return (
		<HeadlineTag class={clsx('headline', `headline-${finalVariant}`, classNames)} {...other}>
			{children}
		</HeadlineTag>
	);
};

/**
 * Functional component for rendering a secondary headline.
 * @param props - The properties for the secondary headline component.
 * @param children - The children to render inside the secondary headline.
 * @returns A VNode representing the secondary headline.
 */
const KolSecondaryHeadlineFc: FC<SecondaryHeadlineProps> = ({ class: classNames, level = MIN_HEADING_LEVEL, ...other }, children) => {
	const HeadlineTag = getSubHeadlineTag(level + 1);

	return (
		<HeadlineTag class={clsx('secondary-headline', classNames)} {...other}>
			{children}
		</HeadlineTag>
	);
};

/**
 * Functional component for rendering a heading with an optional secondary headline.
 * @param props - The properties for the heading component.
 * @param children - The children to render inside the heading.
 * @returns A VNode representing the heading.
 */
const KolHeadingFc: FC<HeadingProps> = (
	{ secondaryHeadline, level = MIN_HEADING_LEVEL, class: classNames, HeadingGroupProps = {}, SecondaryHeadlineProps = {}, ...other },
	children,
) => {
	// The 'kol-heading-wc' class is retained for backward compatibility.
	// It must remain here until the SCSS/themes are updated accordingly.
	const deprecatedClassName = 'kol-heading-wc';

	const headlineProps: HeadlineProps = {
		level,
		...other,
	};

	if (!secondaryHeadline) {
		return (
			<KolHeadlineFc class={clsx(deprecatedClassName, classNames)} {...headlineProps}>
				{children}
			</KolHeadlineFc>
		);
	}

	const { class: groupClassNames, ...groupOthers } = HeadingGroupProps;
	const headlineGroupProps: HGroupProps = {
		class: clsx(deprecatedClassName, groupClassNames),
		...groupOthers,
	};

	return (
		<hgroup {...headlineGroupProps}>
			<KolHeadlineFc class={classNames} {...headlineProps}>
				{children}
			</KolHeadlineFc>
			<KolSecondaryHeadlineFc level={level} {...SecondaryHeadlineProps}>
				{secondaryHeadline}
			</KolSecondaryHeadlineFc>
		</hgroup>
	);
};

export default KolHeadingFc;
