// https://github.com/nadeesha/ts-prune
module.exports = {
	/**
	 * src/index.ts: the export file for sub libraries
	 * build.config.ts: the config file for the unbuild tool
	 */
	ignore: '(build.config|index).ts',
	skip: 'dist',
};
