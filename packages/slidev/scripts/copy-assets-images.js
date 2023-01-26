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
				const filename = path.basename(fullPath);
				const newPath = path.resolve(process.cwd(), 'dist/assets', filename);
				console.log(`${filename} copied`);
				fs.writeFileSync(newPath, fs.readFileSync(fullPath));
			}
		}
	});
	return files;
}

filterFiles(path.relative(process.cwd(), 'assets'), /\.(jpeg|jpg|png)$/);
