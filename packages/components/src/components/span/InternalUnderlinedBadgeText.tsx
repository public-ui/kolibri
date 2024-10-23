import { Fragment, h } from '@stencil/core';

type Props = {
	badgeText: string;
	label: string;
};
export const InternalUnderlinedBadgeText = ({ badgeText, label }: Props) => {
	/* Prefer capitalization as defined in the badge Text, try uppercase/lowercase when there's no match. */
	let [first, ...rest] = label.split(badgeText);
	if (rest.length === 0) {
		badgeText = badgeText.toUpperCase();
		[first, ...rest] = label.split(badgeText);
	}
	if (rest.length === 0) {
		badgeText = badgeText.toLowerCase();
		[first, ...rest] = label.split(badgeText);
	}
	return (
		<>
			{first}
			{rest.length ? (
				<>
					<u>{badgeText}</u>
					{rest.join(badgeText)}
				</>
			) : null}
		</>
	);
};
