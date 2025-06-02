import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const loadJson = (path) => {
	return existsSync(path) ? JSON.parse(readFileSync(path, 'utf-8')) : [];
};

const current = loadJson('benchmark-result.json');
const baseline = loadJson('benchmark-baseline.json');

const rows = [];
let hasRegression = false;

for (const entry of current) {
	const prev = baseline.find((b) => b.name === entry.name);
	const now = entry.value;

	if (!prev) {
		rows.push({
			name: entry.name,
			current: now,
			baseline: null,
			percent: null,
			markdown: `| \`${entry.name}\` | ${now}ms | – | – | 🆕 |`,
		});
		continue;
	}

	const old = prev.value;
	const percent = ((now - old) / old) * 100;
	const diffStr = `${percent > 0 ? '+' : ''}${percent.toFixed(1)}%`;
	const emoji = percent > 5 ? '🔻' : percent < -5 ? '✅' : '➖';

	if (percent > 5) hasRegression = true;

	rows.push({
		name: entry.name,
		current: now,
		baseline: old,
		percent,
		markdown: `| \`${entry.name}\` | ${now}ms | ${old}ms | ${diffStr} | ${emoji} |`,
	});
}

const top5 = rows
	.filter((r) => r.percent !== null)
	.sort((a, b) => Math.abs(b.percent) - Math.abs(a.percent))
	.slice(0, 5);

const rest = rows.filter((r) => !top5.includes(r)).sort((a, b) => a.name.localeCompare(b.name));

let markdown = `## Hydration Benchmark Report (vs Baseline)\n\n`;

markdown += `### 📊 Top 5 Änderungen\n\n`;
markdown += `| Component | Current | Baseline | Δ% | Result |\n`;
markdown += `|-----------|---------|----------|-----|--------|\n`;
markdown += top5.map((r) => r.markdown).join('\n') + '\n\n';

markdown += `<details>\n<summary>📋 Alle Ergebnisse anzeigen</summary>\n\n`;
markdown += `| Component | Current | Baseline | Δ% | Result |\n`;
markdown += `|-----------|---------|----------|-----|--------|\n`;
markdown += rest.map((r) => r.markdown).join('\n') + '\n';
markdown += `</details>\n`;

writeFileSync('benchmark-report.md', markdown);

if (hasRegression) {
	console.error('❌ Performance regression detected.');
} else {
	console.log('✅ No significant regression.');
}
