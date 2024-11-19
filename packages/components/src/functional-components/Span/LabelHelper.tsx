import { h, type FunctionalComponent as FC } from '@stencil/core';
import clsx from 'clsx';
import { isString } from 'lodash-es';

import { md } from '../../utils/markdown';
import KolInternalUnderlinedBadgeTextFc from '../InternalUnderlinedBadgeText';

const LabelHelper: FC<{ label: string; hideLabel?: boolean; badgeText?: string; hideExpertSlot?: boolean; allowMarkdown?: boolean }> = ({
	label,
	hideLabel,
	allowMarkdown,
	badgeText,
}) => {
	if (hideLabel || !isString(label)) {
		return null;
	}

	const defaultClasses = 'span-label';

	if (allowMarkdown) {
		return <span class={clsx(defaultClasses, 'md')} innerHTML={md(label)} />;
	}

	if (badgeText) {
		return (
			<span class={clsx(defaultClasses)}>
				<KolInternalUnderlinedBadgeTextFc label={label} badgeText={badgeText} />
			</span>
		);
	}

	return <span class={clsx(defaultClasses)}>{label}</span>;
};

export default LabelHelper;
