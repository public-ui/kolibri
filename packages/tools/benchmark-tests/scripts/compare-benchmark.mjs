import { existsSync, readFileSync, writeFileSync } from 'fs';

const current = JSON.parse(readFileSync('benchmark-result.json', 'utf-8'));
const baseline = existsSync('benchmark-baseline.json') ? JSON.parse(readFileSync('benchmark-baseline.json', 'utf-8')) : [];

let hasRegression = false;

let markdown = `## Hydration Benchmark Report (vs Baseline)\n\n`;
markdown += `| Component | Current | Baseline | Δ% | Result |\n`;
markdown += `|-----------|---------|----------|-----|--------|\n`;

for (const entry of current) {
	const prev = baseline.find((b) => b.name === entry.name);
	const now = entry.value;

	if (!prev) {
		markdown += `| \`${entry.name}\` | ${now}ms | – | – | 🆕 |\n`;
		continue;
	}

	const old = prev.value;
	const percent = ((now - old) / old) * 100;
	const diffStr = `${percent > 0 ? '+' : ''}${percent.toFixed(1)}%`;
	const emoji = percent > 5 ? '🔻' : percent < -5 ? '✅' : '➖';

	if (percent > 5) hasRegression = true;

	markdown += `| \`${entry.name}\` | ${now}ms | ${old}ms | ${diffStr} | ${emoji} |\n`;
}

writeFileSync('benchmark-report.md', markdown);

if (hasRegression) {
	console.error('❌ Performance regression detected.');
	process.exit(1);
} else {
	console.log('✅ No significant regression.');
}
