const formatNameAsInitial = (name: string): string => {
	return name[0].toUpperCase();
};

export const formatLabelAsInitials = (label: string): string => {
	const names = label.split(/\s+/); // split by any whitespace characters
	const first = names.at(0);
	const last = names.at(-1);

	if (names.length >= 2 && first && last) {
		// names might consist of only one word
		return `${formatNameAsInitial(first)} ${formatNameAsInitial(last)}`;
	}

	return formatNameAsInitial(label);
};
