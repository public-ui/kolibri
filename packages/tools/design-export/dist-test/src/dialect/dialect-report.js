const RULES = {
	'kebab-case': 'nicht kebab-case',
	'no-attribute': 'kein Attribut dieses Namens',
	'unknown-value': 'Wert nicht im Prop-Typ',
	'unregistered-variant': 'Variante nur im Theme-CSS, nicht in der Registry',
};
/**
 * Markdown report of the dialect run: the design properties each block gets from its BEM modifiers,
 * and every modifier the registry has to change to follow the dialect.
 */
export function renderDialect(specs, findings, unread, withoutFc) {
	const lines = [
		'# BEM-Dialekt: Design-Properties und nötige Änderungen',
		'',
		'Generiert von `pnpm --filter @public-ui/design-export start:spec` aus `bem-registry.ts`, `custom-elements.json` und den Functional Components.',
		'',
		'## Design-Properties je Komponente',
		'',
		'| Block | Properties in Penpot und Figma |',
		'| --- | --- |',
		...specs
			.filter((spec) => spec.axes.length > 0)
			.map(
				(spec) =>
					`| \`${spec.block}\` | ${spec.axes
						.map((axis) => (axis.kind === 'state' ? `${axis.name} (Zustand)` : `${axis.name} = ${axis.values.map(String).join(' / ')}`))
						.join('; ')} |`,
			),
		'',
		'## Nötige Änderungen an der BEM-Registry',
		'',
		`${findings.length} Modifier folgen dem Dialekt noch nicht.`,
		'',
		'| Block | Modifier | Befund | Vorschlag |',
		'| --- | --- | --- | --- |',
		...findings
			.slice()
			.sort((a, b) => a.block.localeCompare(b.block) || a.modifier.localeCompare(b.modifier))
			.map((finding) => `| \`${finding.block}\` | \`${finding.modifier}\` | ${RULES[finding.rule]} | ${finding.suggestion} |`),
		'',
		'## Öffentliche Komponenten ohne eigenen Baum',
		'',
		'Ihr Tag ist kein Block mit eigener Functional Component; sie setzen sich aus anderen Blöcken zusammen (z. B. `kol-input-text` aus `kol-form-field`, `kol-input-container`). Für sie braucht die Registry eine Zuordnung Tag → Wurzelblock.',
		'',
		withoutFc.length > 0 ? withoutFc.map((tag) => `\`${tag}\``).join(', ') : '–',
		'',
		'## Nicht aus dem Code gelesen',
		'',
		'Ausdrücke in den Functional Components, die der Baum-Leser übersprungen hat (Spread-Props, berechnete Inhalte).',
		'',
		...Object.entries(unread)
			.sort(([a], [b]) => a.localeCompare(b))
			.map(([block, entries]) => `- \`${block}\`: ${entries.map((entry) => `\`${shorten(entry)}\``).join(', ')}`),
		'',
	];
	return `${lines.join('\n')}\n`;
}
function shorten(expression) {
	const flat = expression.replace(/\s+/g, ' ');
	return flat.length > 60 ? `${flat.slice(0, 57)}…` : flat;
}
