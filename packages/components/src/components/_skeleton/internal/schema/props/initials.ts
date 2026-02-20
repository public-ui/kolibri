import { createPropDefinition, SimpleProp } from './helpers/factory';

const normalizeInitials = (value: unknown): string => {
	if (typeof value !== 'string') {
		throw new Error(`Invalid initials value: ${JSON.stringify(value)}`);
	}

	const names = value.split(/\s+/); // split by any whitespace characters
	const first = names[0];
	const last = names[names.length - 1];

	// names might consist of only one word
	if (names.length >= 2 && first && last) {
		return `${normalizeInitials(first)}${normalizeInitials(last)}`;
	}

	return normalizeInitials(value);
};

export type InitialsProp = SimpleProp<'initials', string>;
export const initialsProp = createPropDefinition<InitialsProp>(normalizeInitials, (v) => v.length > 0);
