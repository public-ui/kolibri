import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const loadJson = (path) => (existsSync(path) ? JSON.parse(readFileSync(path, 'utf-8')) : []);

const current = loadJson(`benchmark-result.json`);
const baseline = loadJson(`benchmark-baseline.json`);

const rounded = (time) => Math.round(time * 10) / 10;

const rows = [];
let hasRegression = false;

for (const entry of current) {
	const prev = baseline.find((b) => b.name === entry.name);
	const now = entry.p95;

	if (!prev) {
		rows.push({
			name: entry.name,
			current: now,
			baseline: null,
			percent: null,
			markdown: `| \`${entry.name}\` | ${rounded(now)}ms | – | – | 🆕 |`,
		});
		continue;
	}

	const old = prev.p95;
	const percent = ((now - old) / old) * 100;
	const diffStr = `${percent > 0 ? '+' : ''}${rounded(percent)}%`;
	const emoji = percent > 10 ? '🔻' : percent < -10 ? '✅' : '➖';

	if (percent > 10) hasRegression = true;

	rows.push({
		name: entry.name,
		current: now,
		baseline: old,
		percent,
		markdown: `| \`${entry.name}\` | ${rounded(now)}ms | ${rounded(old)}ms | ${diffStr} | ${emoji} |`,
	});
}

// Top 5 Tops (beste Verbesserungen)
const top5 = [...rows]
	.filter((r) => typeof r.percent === 'number' && r.percent < 0)
	.sort((a, b) => a.percent - b.percent)
	.slice(0, 5);

// Top 5 Flops (schlechteste Verschlechterungen)
const flop5 = [...rows]
	.filter((r) => typeof r.percent === 'number' && r.percent > 0)
	.sort((a, b) => b.percent - a.percent)
	.slice(0, 5);

// Alle alphabetisch sortierten Ergebnisse
const allSorted = [...rows].sort((a, b) => a.name.localeCompare(b.name));

let markdown = `## Hydration Benchmark Report (vs Baseline)\n\n`;

markdown += `### ✅ Top 5 Improvements (Best Speedups)\n\n`;
markdown += `| Component | Current | Baseline | Δ% | Result |\n`;
markdown += `|-----------|---------|----------|-----|--------|\n`;
markdown += top5.map((r) => r.markdown).join('\n') + '\n\n';

markdown += `### 🔻 Flop 5 Regressions (Worst Slowdowns)\n\n`;
markdown += `| Component | Current | Baseline | Δ% | Result |\n`;
markdown += `|-----------|---------|----------|-----|--------|\n`;
markdown += flop5.map((r) => r.markdown).join('\n') + '\n\n';

markdown += `<details>\n<summary>📋 Show all results</summary>\n\n`;
markdown += `| Component | Current | Baseline | Δ% | Result |\n`;
markdown += `|-----------|---------|----------|-----|--------|\n`;
markdown += allSorted.map((r) => r.markdown).join('\n') + '\n';
markdown += `</details>\n`;

writeFileSync(`benchmark-report.md`, markdown);

if (hasRegression) {
	console.warn(`❌ Performance regression detected.`);
} else {
	console.log(`✅ No significant regression.`);
}
