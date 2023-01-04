#!/usr/bin/env node

const { minify } = require('html-minifier-terser');
const fs = require('fs');
const path = require('path');

var options = {};

function minifyFiles(dir) {
	const dirItems = fs.readdirSync(dir);
	dirItems.forEach((dirItem) => {
		const dirItemPath = path.resolve(dir, dirItem);
		const stats = fs.lstatSync(dirItemPath);
		if (stats.isFile() && /(htaccess|robots)/.test(dirItemPath) === false) {
			let code = fs.readFileSync(dirItemPath, { encoding: 'utf-8' });
			minify(code, options)
				.then((result) => {
					console.warn(`${dirItemPath} minified`);
					fs.writeFileSync(dirItemPath, result.replace(/\r?\n/g, ' ').replace(/(\t| {2,})/g, ' '), { encoding: 'utf-8' });
				})
				.catch(() => {
					console.warn(`${dirItemPath} NOT minified`);
				});
		} else if (stats.isDirectory()) {
			minifyFiles(dirItemPath);
		}
	});
}

minifyFiles(path.resolve(process.cwd(), 'build'));
