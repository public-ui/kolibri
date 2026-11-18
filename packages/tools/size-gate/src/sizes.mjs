import { brotliCompressSync, constants, gzipSync } from 'node:zlib';

/**
 * Measures the raw, gzip (level 9) and brotli (quality 11) size in bytes, the compression a CDN typically serves.
 * `brotli: false` skips the slow brotli pass and reports 0.
 */
export function measure(content, { brotli = true } = {}) {
	const buffer = Buffer.isBuffer(content) ? content : Buffer.from(content);
	return {
		brotli: brotli ? brotliCompressSync(buffer, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } }).length : 0,
		gzip: gzipSync(buffer, { level: 9 }).length,
		raw: buffer.length,
	};
}

export function addSizes(a, b) {
	return { brotli: a.brotli + b.brotli, gzip: a.gzip + b.gzip, raw: a.raw + b.raw };
}

export const ZERO = Object.freeze({ brotli: 0, gzip: 0, raw: 0 });

/**
 * Distributes the compressed sizes of a whole file to a part of it in proportion to its raw bytes.
 * Compression works across module borders, so an exact compressed size per module does not exist.
 */
export function prorate(fileSizes, partRaw) {
	const share = fileSizes.raw === 0 ? 0 : partRaw / fileSizes.raw;
	return {
		brotli: Math.round(fileSizes.brotli * share),
		gzip: Math.round(fileSizes.gzip * share),
		raw: partRaw,
	};
}

export function formatBytes(bytes) {
	const sign = bytes < 0 ? '-' : '';
	const value = Math.abs(bytes);
	if (value < 1024) {
		return `${sign}${value} B`;
	}
	if (value < 1024 * 1024) {
		return `${sign}${(value / 1024).toFixed(1)} KB`;
	}
	return `${sign}${(value / 1024 / 1024).toFixed(2)} MB`;
}
