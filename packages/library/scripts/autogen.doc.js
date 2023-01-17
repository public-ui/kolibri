#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { rimrafSync } = require('rimraf');
const exclude = /(@else|symbol)/;
// const exclude = /(@else|font-awesome|icofont|leanup|symbol)/;
function filterMdFiles(dir) {
	let files = [];
	const dirPath = path.resolve(process.cwd(), dir);
	fs.readdirSync(dirPath).forEach((file) => {
		const fullPath = path.resolve(dir, file);
		if (fs.lstatSync(fullPath).isDirectory() && exclude.test(fullPath) === false) {
			files = files.concat(filterMdFiles(fullPath));
		} else if (path.extname(fullPath) === '.md') {
			files.push(fullPath);
		}
	});
	return files;
}

const DOC_FOLDER = 'doc';
const README_PATHS = filterMdFiles(path.relative(process.cwd(), 'src/components'));

try {
	fs.mkdirSync(DOC_FOLDER);
} catch (e) {}

const reverseString = (str) => {
	return str.split('').reverse().join('');
};

rimrafSync('doc/*.md');

README_PATHS.forEach((readmePath) => {
	const name = reverseString(reverseString(path.dirname(readmePath)).replace(/\/.+/g, ''));
	fs.writeFileSync(`${DOC_FOLDER}/${name}.md`, fs.readFileSync(readmePath, 'utf-8').replace('style="color:red"', 'class="text-red-500"'), 'utf-8');
});
