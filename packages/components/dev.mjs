#!/usr/bin/env node
// Watch mode for the components package.
//
// Besides starting Stencil this records the watcher's process id in `.watch.pid` and removes
// the file again on exit. The reason is that a full `build` of this package is destructive:
// `prebuild:light` runs `pnpm clear`, which deletes `dist`, `doc`, `www` and the generated
// adapter sources, and the production build afterwards writes readme files back into
// `src/components/**`. Both are fatal for a watcher that currently owns those directories: it
// loses the output it just produced and every following rebuild fails, because the deleted
// `assets/kolicons` breaks the sass import of every component. The presentation app reads this file in its
// `prestart` guard to skip the dependency build while a watcher is alive (see
// packages/samples/presentation/build-deps.mjs).
//
// The Stencil flags are the ones this task always used - the watcher's behaviour is unchanged.

import { spawn } from 'node:child_process';
import { rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { setTimeout } from 'node:timers';
import { fileURLToPath } from 'node:url';

const PID_FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), '.watch.pid');

writeFileSync(PID_FILE, String(process.pid), 'utf-8');

let cleanedUp = false;

function cleanUp() {
	if (cleanedUp) {
		return;
	}
	cleanedUp = true;
	try {
		rmSync(PID_FILE, { force: true });
	} catch {
		// An already removed file is fine - the shutdown must not fail because of it.
	}
}

// A shell is only needed on Windows, where the binary is a .cmd file that spawn cannot run on its
// own. Everywhere else the child is the Stencil process itself: it shares this process group, so a
// terminal's Ctrl+C reaches it directly and a forwarded signal is not swallowed by a shell.
const isWindows = process.platform === 'win32';

const stencil = spawn(isWindows ? 'stencil.cmd' : 'stencil', ['build', '--prod', '--watch'], {
	env: { ...process.env, NODE_ENV: 'development' },
	shell: isWindows,
	stdio: 'inherit',
});

stencil.on('exit', (code, signal) => {
	cleanUp();
	process.exit(signal ? 1 : (code ?? 0));
});

process.on('exit', cleanUp);

// Stencil only reacts to a signal of its own accord while it owns a TTY. Without one - a CI job, a
// wrapper script - a forwarded signal leaves it running, so it is forced down after this grace period.
const FORCE_KILL_DELAY = 5_000;

for (const signal of ['SIGINT', 'SIGTERM']) {
	process.on(signal, () => {
		// The pid file has to go even when only this process was signalled instead of the whole group.
		cleanUp();
		stencil.kill(signal);
		setTimeout(() => {
			stencil.kill('SIGKILL');
			process.exit(signal === 'SIGINT' ? 130 : 143);
		}, FORCE_KILL_DELAY);
	});
}
