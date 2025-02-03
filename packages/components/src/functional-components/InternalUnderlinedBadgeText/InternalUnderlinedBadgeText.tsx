import { Fragment, h, type FunctionalComponent as FC } from '@stencil/core';
import type { BadgeTextPropType } from '../../schema';

type InternalUnderlinedBadgeTextProps = {
	badgeText: BadgeTextPropType;
	label: string;
};

const KolInternalUnderlinedBadgeTextFc: FC<InternalUnderlinedBadgeTextProps> = ({ badgeText, label }) => {
	/* Prefer capitalization as defined in the badge Text, try uppercase/lowercase when there's no match. */
	const badgeTextAsString: string = badgeText;
	let [first, ...rest] = label.split(badgeTextAsString);
	if (rest.length === 0) {
		badgeText = badgeTextAsString.toUpperCase();
		[first, ...rest] = label.split(badgeTextAsString);
	}
	if (rest.length === 0) {
		badgeText = badgeTextAsString.toLowerCase();
		[first, ...rest] = label.split(badgeTextAsString);
	}
	return (
		<>
			{first}
			{rest.length ? (
				<>
					<u>{badgeText}</u>
					{rest.join(badgeTextAsString)}
				</>
			) : null}
		</>
	);
};

export default KolInternalUnderlinedBadgeTextFc;
