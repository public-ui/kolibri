import { h } from '@stencil/core';

type Props = {
	accessKey: string;
	label: string;
};
export const InternalUnderlinedAccessKey = ({ accessKey, label }: Props) => {
	/* Prefer capitalization as defined in the access key, try uppercase/lowercase when there's no match. */
	let [first, ...rest] = label.split(accessKey);
	if (rest.length === 0) {
		accessKey = accessKey.toUpperCase();
		[first, ...rest] = label.split(accessKey);
	}
	if (rest.length === 0) {
		accessKey = accessKey.toLowerCase();
		[first, ...rest] = label.split(accessKey);
	}
	return (
		<span>
			{first}
			{rest.length ? <u>{accessKey}</u> : null}
			{rest.length ? rest.join(accessKey) : null}
		</span>
	);
};
