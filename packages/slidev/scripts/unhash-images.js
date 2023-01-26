#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function filterFiles(dir, regExp) {
	let files = [];
	const dirPath = path.resolve(process.cwd(), dir);
	fs.readdirSync(dirPath).forEach((file) => {
		const fullPath = path.resolve(dir, file);
		if (fs.lstatSync(fullPath).isDirectory()) {
			files = files.concat(filterFiles(fullPath, regExp));
		} else {
			if (regExp.test(fullPath)) {
				console.log(fullPath);
				const filename = fullPath.replace(regExp, '$1');
				console.log(filename);
				fs.writeFileSync(filename, fs.readFileSync(fullPath, 'utf-8'), 'utf-8');
			}
		}
	});
	return files;
}

filterFiles(path.relative(process.cwd(), 'dist/assets'), /-[a-z0-9]+(\.(jpg|png))$/);
