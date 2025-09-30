import { Fragment, h, type FunctionalComponent as FC } from '@stencil/core';
import clsx from 'clsx';
import { isString } from 'lodash-es';

import { showExpertSlot } from '../../schema';
import LabelHelper from './LabelHelper';

const KolSpanCoreHelperFc: FC<{ label: string; hideLabel?: boolean; badgeText?: string; hideExpertSlot?: boolean; allowMarkdown?: boolean }> = (
	{ hideLabel, label, badgeText, allowMarkdown },
	children,
) => {
	const hideExpertSlot = !showExpertSlot(label);

	return (
		<>
			{hideExpertSlot && <LabelHelper label={label} hideLabel={hideLabel} badgeText={badgeText} allowMarkdown={allowMarkdown} />}
			<span aria-hidden={hideExpertSlot ? 'true' : undefined} class={clsx('kol-span__label', { 'visually-hidden': hideExpertSlot })} hidden={hideExpertSlot}>
				{children}
			</span>
			{isString(badgeText) && badgeText.length > 0 && (
				<kbd class="badge-text-hint" aria-hidden="true">
					{badgeText}
				</kbd>
			)}
		</>
	);
};

export default KolSpanCoreHelperFc;
