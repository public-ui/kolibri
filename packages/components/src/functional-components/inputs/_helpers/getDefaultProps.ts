export function getDefaultProps({
	ariaDescribedBy,
	ariaDetails,
	hideLabel,
	label,
}: {
	ariaDescribedBy?: string[];
	ariaDetails?: string;
	hideLabel?: boolean;
	label?: string;
}): {
	title: string;
	autoCapitalize: string;
	autoCorrect: string;
	'aria-describedby'?: string;
	'aria-details'?: string;
	'aria-label'?: string;
} {
	return {
		title: '',
		autoCapitalize: 'off',
		autoCorrect: 'off',
		'aria-describedby': ariaDescribedBy?.length ? ariaDescribedBy.join(' ') : undefined,
		'aria-details': ariaDetails,
		'aria-label': hideLabel && label ? label : undefined,
	};
}
