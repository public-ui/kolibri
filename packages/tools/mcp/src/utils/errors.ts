import type { z } from 'zod';

/**
 * Formatiert Validierungsfehler für KoliBri-Tools.
 * @param toolName - Name des Tools
 * @param error - Zod-Validierungsfehler
 * @param locale - Sprache für Fehlermeldungen
 * @returns Formatierte Fehlermeldung
 */
export function formatKolibriValidationError(toolName: string, error: z.ZodError, locale: 'en' | 'de' = 'en'): string {
	const base = error.issues
		.map((issue) => {
			const path = issue.path.length > 0 ? `${issue.path.join('.')}` : 'root';
			return `- ${path}: ${issue.message}`;
		})
		.join('\n');

	// Tool-spezifische Hilfestellungen
	switch (toolName) {
		case 'search_templates':
			return locale === 'de'
				? `${base}\n\n💡 **Tipp:** Verfügbare Filter:\n- \`type\`: "markdown" | "code" | "config"\n- \`templateType\`: "generic" | "react" | "theme"\n- \`repoId\`: Siehe \`list_template_types\`\n- \`tags\`: Siehe \`list_template_tags\``
				: `${base}\n\n💡 **Tip:** Available filters:\n- \`type\`: "markdown" | "code" | "config"\n- \`templateType\`: "generic" | "react" | "theme"\n- \`repoId\`: See \`list_template_types\`\n- \`tags\`: See \`list_template_tags\``;

		case 'fetch_template':
			return locale === 'de'
				? `${base}\n\n🔍 **Tipp:** Nutze \`search_templates\`, um gültige IDs zu finden:\n\`\`\`json\n{ "query": "button", "limit": 5 }\n\`\`\``
				: `${base}\n\n🔍 **Tip:** Use \`search_templates\` to find valid IDs:\n\`\`\`json\n{ "query": "button", "limit": 5 }\n\`\`\``;

		case 'search':
			return locale === 'de'
				? `${base}\n\n🔍 **Tipp:** Verfügbare \`kind\`-Werte: "doc", "sample", "scenario", "spec"`
				: `${base}\n\n🔍 **Tip:** Available \`kind\` values: "doc", "sample", "scenario", "spec"`;

		default:
			return locale === 'de'
				? `${base}\n\n💡 Nutze \`list_tools\`, um verfügbare Tools und ihre Parameter zu sehen.`
				: `${base}\n\n💡 Use \`list_tools\` to see available tools and their parameters.`;
	}
}
