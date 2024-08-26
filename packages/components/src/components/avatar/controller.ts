const formatNameAsInitial = (name: string): string => {
	if (name.length === 0) {
		return '';
	}

	return name[0].toUpperCase();
};

export const formatLabelAsInitials = (label: string): string => {
	const names = label.split(/\s+/); // split by any whitespace characters
	const first = names.at(0);
	const last = names.at(-1);

	// names might consist of only one word
	if (names.length >= 2 && typeof first === 'string' && typeof last === 'string') {
		return `${formatNameAsInitial(first)}${formatNameAsInitial(last)}`;
	}

	return formatNameAsInitial(label);
};
