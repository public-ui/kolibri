import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const loadJson = (path) => (existsSync(path) ? JSON.parse(readFileSync(path, 'utf-8')) : []);

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

const flop5 = rows
	.filter((r) => typeof r.percent === 'number' && r.percent > 0)
	.sort((a, b) => b.percent - a.percent)
	.slice(0, 5);

const rest = rows.filter((r) => !flop5.includes(r)).sort((a, b) => a.name.localeCompare(b.name));

let markdown = `## Hydration Benchmark Report (vs Baseline)\n\n`;

markdown += `### 📊 Flop 5 Regressions\n\n`;
markdown += `| Component | Current | Baseline | Δ% | Result |\n`;
markdown += `|-----------|---------|----------|-----|--------|\n`;
markdown += flop5.map((r) => r.markdown).join('\n') + '\n\n';

markdown += `<details>\n<summary>📋 Show all results</summary>\n\n`;
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
