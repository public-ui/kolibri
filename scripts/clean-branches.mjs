#!/usr/bin/env node
import { execFileSync, execSync } from 'node:child_process';

try {
	// Get all merged branches
	const mergedBranches = execSync('git branch --merged', { encoding: 'utf8' });

	// Split by newline and filter
	const branches = mergedBranches
		.split('\n')
		.map((line) => line.trim())
		.filter((line) => line && !line.startsWith('*')) // Filter out current branch (marked with *)
		.filter((line) => {
			// Filter out common protected branches
			const protectedBranches = ['main', 'master', 'develop', 'development'];
			return !protectedBranches.includes(line);
		});

	if (branches.length === 0) {
		console.log('No merged branches to delete.');
		process.exit(0);
	}

	console.log('Merged branches to delete:');
	branches.forEach((branch) => console.log(`  - ${branch}`));

	// Delete each branch
	for (const branch of branches) {
		try {
			// Use execFileSync with array arguments to prevent command injection
			execFileSync('git', ['branch', '-D', branch], { stdio: 'inherit' });
		} catch (error) {
			console.error(`Failed to delete branch: ${branch}`);
		}
	}

	console.log('Done.');
} catch (error) {
	console.error('Error:', error.message);
	process.exit(1);
}
