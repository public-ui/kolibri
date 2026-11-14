import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { createZip } from '../src/zip.js';

describe('createZip', () => {
	it('produces a deterministic store-only archive', () => {
		const entries = { 'b.txt': 'zwei', '$themes.json': '{"name":"Light"}', 'a.json': '{"x":1}' };
		assert.ok(createZip(entries).equals(createZip(entries)), 'gleiche Eingabe muss gleiche Bytes erzeugen');
	});

	it('starts with the local file header signature and ends with the EOCD signature', () => {
		const zip = createZip({ 'a.json': '{"x":1}' });
		assert.equal(zip.readUInt32LE(0), 0x04034b50);
		assert.equal(zip.readUInt32LE(zip.length - 22), 0x06054b50);
		assert.ok(zip.length > 22 + 30);
	});

	it('lists all entries when unzipped', async () => {
		const entries = { 'b.txt': 'zwei', '$themes.json': '{"name":"Light"}' };
		const zipPath = join(tmpdir(), `design-export-${Date.now()}.zip`);
		await writeFile(zipPath, createZip(entries));
		const listing = await promisify(execFile)('unzip', ['-l', zipPath]).catch((error: NodeJS.ErrnoException) => {
			if (error.code === 'ENOENT') {
				return null; // unzip fehlt in dieser Umgebung (z. B. Windows), Signaturtests decken das Format weiter ab
			}
			throw error;
		});
		if (listing === null) {
			return;
		}
		assert.ok(listing.stdout.includes('b.txt'));
		assert.ok(listing.stdout.includes('$themes.json'));
	});
});
