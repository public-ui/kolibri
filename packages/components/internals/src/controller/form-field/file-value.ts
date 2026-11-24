/** Returns the names of the files as the comma separated text `kol-input-file` shows, or `undefined` without a file. */
export function getFileNames(files?: ArrayLike<File> | null): string | undefined {
	if (!files?.length) {
		return undefined;
	}
	return Array.from(files)
		.map((file) => file.name)
		.join(', ');
}
