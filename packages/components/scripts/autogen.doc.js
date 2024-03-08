#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { rimraf } = require('rimraf');
const exclude = /(@else)/;
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

/**
 * Common readme content modifications
 */
const modifyReadmeContent = (contents) =>
	contents
		/**
		 * Hack to remove background-color from the current component in the Mermaid chart, which has insufficient contrast.
		 * Might become obsolete when this ticket gets addressed: https://github.com/ionic-team/stencil/issues/2876
		 */
		.replace(/style (.*) fill:#f9f,stroke:#333,stroke-width:4px/, 'style $1 stroke:#333,stroke-width:4px');

/**
 * Readme content modifications only for the docs folder
 */
const modifyReadmeContentForDocsFolder = (contents) => contents.replace('style="color:red"', 'class="text-red-500"').replace(/ \\\| /g, '` \\| `');

rimraf('doc/*.md').then(() => {
	README_PATHS.forEach((readmePath) => {
		const name = reverseString(reverseString(path.dirname(readmePath)).replace(/(\/|\\).+/g, ''));
		const contents = fs.readFileSync(readmePath, 'utf-8');
		const contentsForComponentsReadme = modifyReadmeContent(contents);
		const contentsForDocsReadme = modifyReadmeContentForDocsFolder(contentsForComponentsReadme);

		fs.writeFileSync(readmePath, contentsForComponentsReadme, 'utf-8'); // Replace original Readme file
		fs.writeFileSync(`${DOC_FOLDER}/${name}.md`, contentsForDocsReadme, 'utf-8'); // Store Readme file in docs/ folder additionally

		console.log(`Autogen: Processed ${name}.md`);
	});
});
