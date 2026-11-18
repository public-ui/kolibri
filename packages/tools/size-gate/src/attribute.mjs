import { SourceMapConsumer } from 'source-map';

/**
 * Attributes every byte of a generated file to the source its source map names for it. A mapping covers
 * the generated text up to the next mapping on the same line. Text without a mapping counts as `''`.
 * Returns a map of source path to UTF-8 bytes; the values add up to the byte length of the file.
 */
export async function attributeBytes(code, rawMap) {
	const mappings = [];
	await SourceMapConsumer.with(rawMap, null, (consumer) => {
		consumer.eachMapping(
			(mapping) => {
				mappings.push({ column: mapping.generatedColumn, line: mapping.generatedLine, source: mapping.source ?? '' });
			},
			null,
			SourceMapConsumer.GENERATED_ORDER,
		);
	});

	const totals = new Map();
	const add = (source, text) => {
		if (text.length > 0) {
			totals.set(source, (totals.get(source) ?? 0) + Buffer.byteLength(text));
		}
	};

	const lines = code.split('\n');
	let next = 0;
	for (let index = 0; index < lines.length; index++) {
		const line = lines[index];
		const lineNumber = index + 1;
		let cursor = 0;
		let current = '';
		while (next < mappings.length && mappings[next].line < lineNumber) {
			next++;
		}
		while (next < mappings.length && mappings[next].line === lineNumber) {
			const mapping = mappings[next];
			const column = Math.max(cursor, Math.min(mapping.column, line.length));
			add(current, line.slice(cursor, column));
			cursor = column;
			current = mapping.source;
			next++;
		}
		add(current, line.slice(cursor) + (index < lines.length - 1 ? '\n' : ''));
	}
	return totals;
}
