#!/usr/bin/env node

import { exec } from 'child_process';
import path from 'path';
import { TaskRunner } from './runner/task-runner';
import semver from 'semver';
import { tasks } from './runner/tasks';
import { getPackageJsonVersion } from './shares/reuse';

exec('git status --porcelain', (err, stdout) => {
	if (err) {
		console.error(`exec error: ${err.message}`);
		return;
	}

	console.log(stdout);
	// if (stdout) {
	// 	throw new Error('There are uncommitted changes');
	// }

	const versionOfPublicUiKoliBriCli = getPackageJsonVersion(path.resolve(__dirname, '..', 'package.json'));
	const versionOfPublicUiComponents = getPackageJsonVersion(path.resolve(process.cwd(), 'node_modules/@public-ui/components/package.json'));

	const baseDir = process.argv[2];
	const runner = new TaskRunner(baseDir, versionOfPublicUiKoliBriCli, versionOfPublicUiComponents);
	runner.registerTasks(tasks);

	let summary = runner.printSummary();
	while (semver.lt(summary.nextVersion!, versionOfPublicUiKoliBriCli)) {
		runner.run();
		summary = runner.printSummary();
		console.log(`
done ${summary.done}`);
		console.log(`pending ${summary.pending}`);
		console.log(`total ${summary.total}`);
		console.log(`nextVersion ${summary.nextVersion}`);
		console.warn(`The project package.json must be updated to version ${summary.nextVersion} before the next run.`);
		runner.setProjectVersion(summary.nextVersion!);
	}

	runner.printSummary(true);

	console.log(`
After the code migration has gone through, the code formatting may no longer
be as desired. Therefore, please reformat your code afterwards if necessary.

The migration also upgrades the versions of @public-ui in the package.json.
For the new dependencies to be available, the installation must be run once
with the package manager (e.g. npm i). Afterwards, it may be that functions
or themes in newer major versions have changed or are no longer included.
This should be checked finally and corrected manually if necessary.
`);
});
