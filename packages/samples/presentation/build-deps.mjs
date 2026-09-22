#!/usr/bin/env node
// Guard in front of the `prestart` dependency build.
//
// `pnpm start` builds every workspace dependency first so the dev server never serves a stale
// theme or component package. That is right for a standalone start and fatal next to a running
// watcher: the components build deletes `dist`, `doc`, `www` and the generated adapter sources
// (`pnpm clear`) and afterwards writes readme files back into `src/components/**`, which the
// watcher is watching. The watcher loses the output it just produced and every following rebuild
// fails, because the deleted `assets/kolicons` breaks the sass import of every component.
//
// The build is therefore skipped while a components watcher is alive - it records its process id
// in packages/components/.watch.pid - or when KOLIBRI_SKIP_DEPS_BUILD is set. `pnpm dev` and
// `pnpm serve` bypass this script altogether.

import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const COMPONENTS_WATCH_PID_FILE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../components/.watch.pid');

function runningWatcherPid() {
	let pid;
	try {
		pid = Number.parseInt(readFileSync(COMPONENTS_WATCH_PID_FILE, 'utf-8').trim(), 10);
	} catch {
		// No file means no watcher.
		return null;
	}
	if (!Number.isInteger(pid) || pid <= 0) {
		return null;
	}
	try {
		process.kill(pid, 0);
		return pid;
	} catch (error) {
		// ESRCH: the watcher is gone and left a stale file behind, so the build may run.
		// EPERM: the process exists but belongs to another user - still a live watcher.
		return error.code === 'EPERM' ? pid : null;
	}
}

if (process.env.KOLIBRI_SKIP_DEPS_BUILD) {
	console.log('[build-deps] KOLIBRI_SKIP_DEPS_BUILD is set - skipping the dependency build.');
	process.exit(0);
}

const watcherPid = runningWatcherPid();

if (watcherPid !== null) {
	console.log(`[build-deps] A components watcher (pid ${watcherPid}) owns its build output - skipping the dependency build.`);
	console.log('[build-deps] Building now would delete that output from under the watcher. Run `pnpm build:deps` once the watcher is stopped.');
	process.exit(0);
}

const build = spawn('pnpm', ['run', 'build:deps'], {
	shell: true,
	stdio: 'inherit',
});

build.on('exit', (code, signal) => {
	process.exit(signal ? 1 : (code ?? 0));
});
