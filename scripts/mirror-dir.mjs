/**
 * Minimaler rsync-Ersatz (Node-only, keine Zusatzpakete – rsync fehlt im Playwright-Image).
 *
 * Spiegelt ein Verzeichnis rekursiv in ein anderes: kopiert neue/geänderte Dateien
 * (Vergleich über Größe + mtime) und löscht optional Dateien, die in der Quelle fehlen.
 *
 * Aufruf: node mirror-dir.mjs <src> <dst> [--exclude=name] … [--no-delete]
 */
import * as fs from 'node:fs';
import * as path from 'node:path';

const MTIME_TOLERANCE_MS = 2000; // Windows-Bind-Mounts liefern ungenaue mtimes

export function mirrorDir(src, dst, { excludes = [], deleteExtra = true } = {}) {
	const stats = { copied: 0, deleted: 0, skipped: 0 };
	const excludeSet = new Set(excludes);

	const walk = (relative) => {
		const srcPath = path.join(src, relative);
		const dstPath = path.join(dst, relative);

		fs.mkdirSync(dstPath, { recursive: true });

		const entries = fs.readdirSync(srcPath, { withFileTypes: true }).filter((entry) => !excludeSet.has(entry.name));
		const expected = new Set(entries.map((entry) => entry.name));

		if (deleteExtra && fs.existsSync(dstPath)) {
			for (const entry of fs.readdirSync(dstPath, { withFileTypes: true })) {
				if (expected.has(entry.name) || excludeSet.has(entry.name)) continue;
				fs.rmSync(path.join(dstPath, entry.name), { recursive: true, force: true });
				stats.deleted++;
			}
		}

		for (const entry of entries) {
			const childRelative = path.join(relative, entry.name);
			const from = path.join(src, childRelative);
			const to = path.join(dst, childRelative);

			if (entry.isDirectory()) {
				walk(childRelative);
				continue;
			}
			if (entry.isSymbolicLink()) {
				const target = fs.readlinkSync(from);
				if (fs.existsSync(to) || fs.lstatSync(to, { throwIfNoEntry: false })) fs.rmSync(to, { force: true });
				fs.symlinkSync(target, to);
				stats.copied++;
				continue;
			}
			if (!entry.isFile()) continue;

			const srcStat = fs.statSync(from);
			const dstStat = fs.statSync(to, { throwIfNoEntry: false });
			if (dstStat && dstStat.size === srcStat.size && Math.abs(dstStat.mtimeMs - srcStat.mtimeMs) <= MTIME_TOLERANCE_MS) {
				stats.skipped++;
				continue;
			}
			/* Vorher entfernen: das Überschreiben einer existierenden Datei scheitert auf
			   Docker-Desktop-Bind-Mounts (Windows) mit EPERM. */
			if (dstStat) fs.rmSync(to, { force: true });
			fs.copyFileSync(from, to);
			try {
				fs.utimesSync(to, srcStat.atime, srcStat.mtime);
			} catch {
				/* Nur eine Optimierung für den nächsten Lauf – nicht jedes Dateisystem erlaubt es. */
			}
			stats.copied++;
		}
	};

	walk('');
	return stats;
}

// Direktaufruf über die Kommandozeile (so wird das Skript im Container benutzt).
if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) {
	const args = process.argv.slice(2);
	const positional = args.filter((arg) => !arg.startsWith('--'));
	const excludes = args.filter((arg) => arg.startsWith('--exclude=')).map((arg) => arg.slice('--exclude='.length));
	const deleteExtra = !args.includes('--no-delete');

	if (positional.length !== 2) {
		console.error('Usage: node mirror-dir.mjs <src> <dst> [--exclude=name] … [--no-delete]');
		process.exit(1);
	}

	const [src, dst] = positional;
	const stats = mirrorDir(src, dst, { excludes, deleteExtra });
	console.log(`mirror ${src} → ${dst}: ${stats.copied} kopiert, ${stats.deleted} gelöscht, ${stats.skipped} unverändert`);
}
