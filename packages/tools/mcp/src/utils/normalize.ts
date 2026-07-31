/**
 * Normalisiert Argument-Objekte für KoliBri-Tools.
 * Füllt Defaults, konvertiert Aliase, bereinigt Eingaben.
 * @param toolName - Name des Tools
 * @param rawArgs - Roh-Argumente
 * @returns Normalisierte Argumente
 */
export function normalizeKolibriArgs(toolName: string, rawArgs: unknown): unknown {
	if (!rawArgs || typeof rawArgs !== 'object' || Array.isArray(rawArgs)) {
		return rawArgs;
	}

	const args = { ...(rawArgs as Record<string, unknown>) };

	// --- Tool-spezifische Normalisierungen ---
	switch (toolName) {
		// search_templates: Defaults für limit
		case 'search_templates':
			if (args.limit === undefined) {
				args.limit = 20;
			}
			if (args.type === 'all') {
				delete args.type; // "all" bedeutet kein Filter
			}
			break;

		// fetch_template: Default für includeCodeBlocks
		case 'fetch_template':
			if (args.includeCodeBlocks === undefined) {
				args.includeCodeBlocks = true;
			}
			break;

		// search: Defaults für limit/kind
		case 'search':
			if (args.limit === undefined) {
				args.limit = 10;
			}
			if (args.kind && !['doc', 'sample', 'scenario', 'spec'].includes(args.kind as string)) {
				delete args.kind; // Ungültiges kind ignorieren
			}
			break;
	}

	// --- Allgemeine Normalisierungen ---
	// Booleans: "true"/"false" → true/false
	for (const key in args) {
		if (args[key] === 'true') args[key] = true;
		if (args[key] === 'false') args[key] = false;
	}

	// Leere Strings → undefined
	for (const key in args) {
		if (args[key] === '') {
			args[key] = undefined;
		}
	}

	return args;
}
