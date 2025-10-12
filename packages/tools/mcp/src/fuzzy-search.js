const TOKEN_SPLIT_REGEX = /[^\p{L}\p{N}]+/u;

function tokenize(value) {
	if (!value) {
		return [];
	}

	return String(value).toLowerCase().split(TOKEN_SPLIT_REGEX).filter(Boolean);
}

function collectFieldValues(entry) {
	const values = [entry.id, entry.group, entry.name, entry.title, entry.description];

	if (Array.isArray(entry.tags)) {
		values.push(...entry.tags);
	}

	if (Array.isArray(entry.keywords)) {
		values.push(...entry.keywords);
	}

	return values
		.map((value) => (value == null ? '' : String(value)))
		.filter((value) => value.length > 0)
		.map((value) => value.toLowerCase());
}

export function extractQueryTokens(query) {
	if (!query) {
		return [];
	}

	return String(query).trim().toLowerCase().split(TOKEN_SPLIT_REGEX).filter(Boolean);
}

function levenshteinDistance(a, b) {
	if (a === b) {
		return 0;
	}

	const aLength = a.length;
	const bLength = b.length;

	if (aLength === 0) {
		return bLength;
	}

	if (bLength === 0) {
		return aLength;
	}

	const previous = new Array(bLength + 1);
	const current = new Array(bLength + 1);

	for (let j = 0; j <= bLength; j += 1) {
		previous[j] = j;
	}

	for (let i = 1; i <= aLength; i += 1) {
		current[0] = i;
		const aCode = a.charCodeAt(i - 1);

		for (let j = 1; j <= bLength; j += 1) {
			const bCode = b.charCodeAt(j - 1);
			const substitutionCost = aCode === bCode ? 0 : 1;
			const insertion = current[j - 1] + 1;
			const deletion = previous[j] + 1;
			const substitution = previous[j - 1] + substitutionCost;
			current[j] = Math.min(insertion, deletion, substitution);
		}

		for (let j = 0; j <= bLength; j += 1) {
			previous[j] = current[j];
		}
	}

	return previous[bLength];
}

export function computeFuzzyScore(entry, queryTokens) {
	if (!Array.isArray(queryTokens) || queryTokens.length === 0) {
		return 0;
	}

	const fields = collectFieldValues(entry);
	if (fields.length === 0) {
		return Number.POSITIVE_INFINITY;
	}

	const fieldTokens = fields.flatMap((field) => tokenize(field));

	let score = 0;

	for (const queryToken of queryTokens) {
		if (fields.some((field) => field.includes(queryToken))) {
			continue;
		}

		if (fieldTokens.length === 0) {
			return Number.POSITIVE_INFINITY;
		}

		let bestDistance = Number.POSITIVE_INFINITY;
		for (const fieldToken of fieldTokens) {
			const distance = levenshteinDistance(queryToken, fieldToken);
			if (distance < bestDistance) {
				bestDistance = distance;
				if (bestDistance === 0) {
					break;
				}
			}
		}

		const maxDistance = Math.max(1, Math.floor(queryToken.length / 3));
		if (!Number.isFinite(bestDistance) || bestDistance > maxDistance) {
			return Number.POSITIVE_INFINITY;
		}

		score += bestDistance;
	}

	return score;
}
