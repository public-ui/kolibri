/**
 * Minimal ZIP writer (method `store`, no compression) for the Penpot token
 * bundle. Store-only keeps the writer dependency-free and the archive
 * deterministic: equal input files produce equal bytes.
 */
export function createZip(entries: Record<string, string>): Buffer {
	const encoder = new TextEncoder();
	const chunks: Buffer[] = [];
	const central: Buffer[] = [];
	let offset = 0;
	const names = Object.keys(entries).sort();
	for (const name of names) {
		const nameBytes = encoder.encode(name);
		const dataBytes = encoder.encode(entries[name]);
		const crc = crc32(dataBytes);
		const local = Buffer.alloc(30 + nameBytes.length);
		local.writeUInt32LE(0x04034b50, 0);
		local.writeUInt16LE(20, 4);
		local.writeUInt16LE(0, 6);
		local.writeUInt16LE(0, 8);
		local.writeUInt16LE(0, 10);
		local.writeUInt16LE(0, 12);
		local.writeUInt32LE(crc, 14);
		local.writeUInt32LE(dataBytes.length, 18);
		local.writeUInt32LE(dataBytes.length, 22);
		local.writeUInt16LE(nameBytes.length, 26);
		local.writeUInt16LE(0, 28);
		local.set(nameBytes, 30);
		chunks.push(local, Buffer.from(dataBytes));
		const entry = Buffer.alloc(46 + nameBytes.length);
		entry.writeUInt32LE(0x02014b50, 0);
		entry.writeUInt16LE(20, 4);
		entry.writeUInt16LE(20, 6);
		entry.writeUInt16LE(0, 8);
		entry.writeUInt16LE(0, 10);
		entry.writeUInt16LE(0, 12);
		entry.writeUInt16LE(0, 14);
		entry.writeUInt32LE(crc, 16);
		entry.writeUInt32LE(dataBytes.length, 20);
		entry.writeUInt32LE(dataBytes.length, 24);
		entry.writeUInt16LE(nameBytes.length, 28);
		entry.writeUInt32LE(0, 38);
		entry.writeUInt32LE(offset, 42);
		entry.set(nameBytes, 46);
		central.push(entry);
		offset += local.length + dataBytes.length;
	}
	const centralBuffer = Buffer.concat(central);
	const end = Buffer.alloc(22);
	end.writeUInt32LE(0x06054b50, 0);
	end.writeUInt16LE(names.length, 8);
	end.writeUInt16LE(names.length, 10);
	end.writeUInt32LE(centralBuffer.length, 12);
	end.writeUInt32LE(offset, 16);
	return Buffer.concat([...chunks, centralBuffer, end]);
}

const CRC_TABLE = (() => {
	const table = new Uint32Array(256);
	for (let i = 0; i < 256; i++) {
		let value = i;
		for (let bit = 0; bit < 8; bit++) {
			value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
		}
		table[i] = value >>> 0;
	}
	return table;
})();

function crc32(data: Uint8Array): number {
	let crc = 0xffffffff;
	for (const byte of data) {
		crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
	}
	return (crc ^ 0xffffffff) >>> 0;
}
