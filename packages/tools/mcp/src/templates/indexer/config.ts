/**
 * Konfiguration der zu indexierenden Template-Repos
 */
export interface TemplateRepoConfig {
	id: string; // Eindeutige ID für das Repo
	name: string; // Anzeigename
	owner: string; // GitHub Owner (z.B. "public-ui")
	repo: string; // Repo-Name (z.B. "templates")
	branch: string; // Standard-Branch
	description: string; // Beschreibung für Agents
	includePatterns: string[]; // Glob-Patterns für zu indexierende Dateien
	excludePatterns: string[]; // Glob-Patterns für auszuschließende Dateien
	type: 'generic' | 'react' | 'theme'; // Template-Typ für Filterung
	tags: string[]; // Tags für Kategorisierung
}

/**
 * Liste aller zu indexierenden Template-Repos
 */
export const TEMPLATE_REPOS: TemplateRepoConfig[] = [
	{
		id: 'public-ui-templates',
		name: 'KoliBri Generic Templates',
		owner: 'public-ui',
		repo: 'templates',
		branch: 'main',
		description: 'Generische KoliBri-Templates und Vorlagen für verschiedene Use Cases',
		includePatterns: ['**/*.md', 'src/**/*'],
		excludePatterns: ['**/node_modules/**', '**/dist/**', '**/.git/**', '*.lock'],
		type: 'generic',
		tags: ['template', 'generic', 'kolibri', 'starter'],
	},
	{
		id: 'public-ui-template-react',
		name: 'KoliBri React Templates',
		owner: 'public-ui',
		repo: 'template-react',
		branch: 'main',
		description: 'React-spezifische Templates mit KoliBri-Integration',
		includePatterns: ['**/*.md', 'src/**/*', '*.tsx', '*.ts'],
		excludePatterns: ['**/node_modules/**', '**/dist/**', '**/.git/**', '*.lock'],
		type: 'react',
		tags: ['template', 'react', 'typescript', 'kolibri'],
	},
	{
		id: 'public-ui-template-theme',
		name: 'KoliBri Theme Templates',
		owner: 'public-ui',
		repo: 'template-theme',
		branch: 'main',
		description: 'Thema-Vorlagen und Design-System-Konfigurationen',
		includePatterns: ['**/*.md', 'src/**/*', '*.css', '*.scss', '*.json'],
		excludePatterns: ['**/node_modules/**', '**/dist/**', '**/.git/**', '*.lock'],
		type: 'theme',
		tags: ['template', 'theme', 'design', 'css', 'kolibri'],
	},
];

/**
 * Typ für indexierte Template-Ressourcen
 */
export interface IndexedTemplateResource {
	id: string; // Eindeutige ID (z.B. "public-ui-templates:src/button/button.stories.md")
	repoId: string; // ID des Ursprungs-Repos
	path: string; // Relativer Pfad im Repo
	type: 'markdown' | 'code' | 'config'; // Ressourcen-Typ
	content: string; // Roh-Inhalt
	metadata: {
		name: string; // Name (aus Dateiname oder Frontmatter)
		description?: string; // Beschreibung (aus Frontmatter oder generiert)
		tags: string[]; // Tags (aus Repo + Frontmatter)
		templateType: string; // "generic" | "react" | "theme"
		language?: string; // Sprache für Code-Dateien
		dependencies?: string[]; // Abhängigkeiten (aus package.json oder Frontmatter)
		example?: string; // Beispiel-Code (falls vorhanden)
	};
	stats: {
		size: number; // Dateigröße in Bytes
		lines: number; // Zeilenanzahl
		lastModified: string; // Letztes Ändern (ISO-Format)
	};
}
