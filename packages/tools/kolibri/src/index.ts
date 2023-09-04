#!/usr/bin/env node

import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { TaskRunner } from './runner/task-runner';
import { tasks } from './runner/tasks';

exec('git status --porcelain', (err, stdout) => {
	if (err) {
		console.error(`exec error: ${err.message}`);
		return;
	}

	console.log(stdout);
	// if (stdout) {
	// 	throw new Error('There are uncommitted changes');
	// }

	const packageJsonPath = path.resolve(process.cwd(), 'node_modules/@public-ui/components/package.json');
	console.log(packageJsonPath);
	if (!fs.existsSync(packageJsonPath)) {
		throw new Error('@public-ui/components not installed');
	}

	const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');

	let packageJson: Record<string, unknown>;
	try {
		packageJson = JSON.parse(packageJsonContent) as Record<string, unknown>;
	} catch (err) {
		throw new Error(`Error reading package.json: ${(err as Error).message}`);
	}
	const versionOfPublicUiComponents = packageJson.version as string;

	if (!versionOfPublicUiComponents) {
		throw new Error('Version of @public-ui/components not found');
	}

	const runner = new TaskRunner('test', versionOfPublicUiComponents);
	runner.registerTasks(tasks);
	runner.run();
	let summary = runner.printSummary();
	console.log(`
done ${summary.done}`);
	console.log(`pending ${summary.pending}`);
	console.log(`total ${summary.total}`);
	console.log(`nextVersion ${summary.nextVersion}`);

	console.warn(`Only update @public-ui/* to version smaller equal own version (CLI).`);

	runner.setVersion(summary.nextVersion!);
	console.log(`Update @public-ui/* to version ${summary.nextVersion} (npm i).`);
	runner.run();
	runner.printSummary();

	summary = runner.printSummary();
	console.log(`
done ${summary.done}`);
	console.log(`pending ${summary.pending}`);
	console.log(`total ${summary.total}`);
	console.log(`nextVersion ${summary.nextVersion}`);

	console.warn(`Only update @public-ui/* to version smaller equal own version (CLI).`);

	runner.setVersion(summary.nextVersion!);
	console.log(`Update @public-ui/* to version ${summary.nextVersion} (npm i).`);
	runner.run();
	runner.printSummary();

	console.warn(`At the end we update to version of the CLI and run npm i again.`);

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
