#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const prettier = require('prettier');
const CleanCSS = require('clean-css');
const cleanCss = new CleanCSS({
	// https://github.com/clean-css/clean-css#formatting-options
	format: {
		breaks: {
			afterComment: true,
			afterProperty: true,
			afterRuleEnds: true,
		},
	},
	// https://github.com/clean-css/clean-css#inlining-options
	inline: false,
	// https://github.com/clean-css/clean-css#optimization-levels
	level: 2,
});

function filterCssFiles(dir) {
	let files = [];
	const dirPath = path.resolve(process.cwd(), dir);
	fs.readdirSync(dirPath).forEach((file) => {
		const fullPath = path.resolve(dir, file);
		if (fs.lstatSync(fullPath).isDirectory()) {
			files = files.concat(filterCssFiles(fullPath));
		} else if (path.extname(fullPath) === '.css') {
			files.push(fullPath);
		}
	});
	return files;
}

const DOC_FOLDER = 'css';
const PATHS = filterCssFiles(path.relative(process.cwd(), 'src/components'));

try {
	fs.mkdirSync(DOC_FOLDER);
} catch (e) {}

rimraf(`${DOC_FOLDER}/*.md`, () => {
	PATHS.forEach((filePath) => {
		const css = fs.readFileSync(filePath, 'utf8');

		// https://github.com/clean-css/clean-css#how-to-preserve-a-comment-block
		const preparedCss = css.replace(/\/\*+/g, '\n/*!');
		const minifiedCss = cleanCss.minify(preparedCss).styles;
		const revertedCss = minifiedCss.replace(/\/\*+!/g, '/*');
		const formattedCss = prettier.format(revertedCss, {
			parser: 'css',
			printWidth: 160,
			singleQuote: true,
			useTabs: true,
		});

		fs.writeFileSync(filePath, formattedCss);
	});
});
