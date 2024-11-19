import { Fragment, h, type FunctionalComponent as FC } from '@stencil/core';
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
			<span aria-hidden={hideExpertSlot ? 'true' : undefined} class="span-label" hidden={hideExpertSlot}>
				{children}
			</span>
			{isString(badgeText) && (
				<span class="badge-text-hint" aria-hidden="true">
					{badgeText}
				</span>
			)}
		</>
	);
};

export default KolSpanCoreHelperFc;
