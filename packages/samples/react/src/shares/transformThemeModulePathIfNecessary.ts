/**
 * Transforms a path to a proper file URL format for module import usage on Windows systems.
 *
 * This function handles the conversion of paths that start with a single slash and include a
 * drive specification. It converts these paths to the proper format expected on Windows.
 *
 * @param {string} path - The path to transform (e.g., "/c/path/to/file")
 * @returns {string} The transformed path suitable for browser usage:
 *                  - On Windows: Returns path in format "/C:/path/to/file/" with uppercase drive letter
 *                  - On non-Windows platforms: Returns the original path unchanged
 *
 * @example
 * // Windows platform
 * transformUncPathIfNecessary("/c/users/documents/file.txt")
 * // Returns: "/C:/users/documents/file.txt"
 *
 * // Non-Windows platform
 * transformUncPathIfNecessary("/Users/documents/file.txt")
 * // Returns: "/Users/documents/file.txt" (unchanged)
 */
export function transformThemeModulePathIfNecessary(path: string): string {
	if (process.env.PLATFORM !== 'win32') {
		return path;
	}

	// Remove leading / and split by /
	const cleanPath = path.replace(/^\//, '');
	const parts = cleanPath.split('/');

	// Extract drive letter and convert to uppercase
	const driveLetter = parts[0].toUpperCase();

	// Reconstruct the path with proper format
	const pathParts = parts.slice(1);
	const remainingPath = pathParts.join('/');

	return `/${driveLetter}:/${remainingPath}`;
}
